import uuid
from pathlib import Path
import fitz
from sqlalchemy.orm import Session
from app.core.config import get_settings
from app.models import PdfChunk, PdfDocument
from app.services.embedding_service import EmbeddingService
from app.services.groq_service import GroqService
from app.services.qdrant_service import QdrantService
from app.utils.chunking import chunk_text


class PdfService:
    def __init__(self):
        self.embeddings = EmbeddingService()
        self.qdrant = QdrantService("pdf_chunks")
        self.llm = GroqService()

    def ingest(self, db: Session, user_id, upload_file) -> PdfDocument:
        upload_dir = Path(get_settings().upload_dir)
        upload_dir.mkdir(parents=True, exist_ok=True)
        path = upload_dir / f"{uuid.uuid4()}_{upload_file.filename}"
        path.write_bytes(upload_file.file.read())
        doc = fitz.open(path)
        pdf = PdfDocument(user_id=user_id, title=Path(upload_file.filename).stem, filename=upload_file.filename, file_path=str(path), metadata_json=doc.metadata)
        db.add(pdf)
        db.flush()
        chunk_index = 0
        for page_index, page in enumerate(doc, start=1):
            for text in chunk_text(page.get_text("text")):
                vector = self.embeddings.embed_one(text)
                vector_id = str(uuid.uuid4())
                self.qdrant.upsert(vector_id, vector, {"pdf_id": str(pdf.id), "page": page_index, "chunk_index": chunk_index})
                db.add(PdfChunk(pdf_document_id=pdf.id, chunk_index=chunk_index, page_number=page_index, text=text, vector_id=vector_id))
                chunk_index += 1
        db.commit()
        return pdf

    def chat(self, db: Session, pdf_id, question: str) -> dict:
        vector = self.embeddings.embed_one(question)
        hits = self.qdrant.search(vector, limit=5)
        vector_ids = [h["id"] for h in hits]
        chunks = db.query(PdfChunk).filter(PdfChunk.pdf_document_id == pdf_id, PdfChunk.vector_id.in_(vector_ids)).all()
        context = [{"title": f"Page {c.page_number}, chunk {c.chunk_index}", "abstract": c.text, "year": "Not available"} for c in chunks]
        answer = self.llm.complete(f"Answer this PDF question with page citations: {question}", context)
        return {"answer": answer, "citations": [{"page": c.page_number, "chunk_index": c.chunk_index, "preview": c.text[:220]} for c in chunks]}
