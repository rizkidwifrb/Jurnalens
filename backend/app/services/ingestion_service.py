import uuid
from datetime import date
from sqlalchemy.orm import Session
from app.core.config import get_settings
from app.models import Author, Embedding, Paper, PaperAuthor
from app.services.embedding_service import EmbeddingService
from app.services.opensearch_service import OpenSearchService
from app.services.qdrant_service import QdrantService
from app.utils.deduplication import find_duplicate_paper
from app.utils.text_cleaning import clean_text


class IngestionService:
    def __init__(self):
        self.embeddings = EmbeddingService()
        self.qdrant = QdrantService()
        self.search = OpenSearchService()

    def upsert_paper(self, db: Session, item: dict) -> Paper:
        duplicate = find_duplicate_paper(db, item["title"], item.get("doi"))
        if duplicate:
            return duplicate
        pub_date = None
        if item.get("publication_date"):
            try:
                pub_date = date.fromisoformat(str(item["publication_date"])[:10])
            except ValueError:
                pub_date = None
        paper = Paper(
            title=clean_text(item["title"]),
            abstract=clean_text(item.get("abstract")),
            doi=item.get("doi"),
            year=item.get("year"),
            publication_date=pub_date,
            source=item.get("source"),
            journal=item.get("journal"),
            url=item.get("url"),
            pdf_url=item.get("pdf_url"),
            open_access=item.get("open_access") or False,
            citation_count=item.get("citation_count") or 0,
            metadata_json=item.get("metadata_json"),
        )
        db.add(paper)
        db.flush()
        for order, name in enumerate([a for a in item.get("authors", []) if a]):
            author = db.query(Author).filter(Author.name == name).first() or Author(name=name)
            db.add(author)
            db.flush()
            db.add(PaperAuthor(paper_id=paper.id, author_id=author.id, author_order=order))
        self.index_paper(db, paper)
        db.commit()
        return paper

    def index_paper(self, db: Session, paper: Paper) -> None:
        text = f"{paper.title}\n{paper.abstract or ''}"
        vector = self.embeddings.embed_one(text)
        vector_id = str(uuid.uuid4())
        self.qdrant.upsert(vector_id, vector, {"paper_id": str(paper.id), "title": paper.title})
        db.add(Embedding(paper_id=paper.id, vector_id=vector_id, model=get_settings().embedding_model_name))
        self.search.index_paper(str(paper.id), {
            "title": paper.title,
            "abstract": paper.abstract,
            "authors": [pa.author.name for pa in paper.authors],
            "year": paper.year,
            "journal": paper.journal,
            "source": paper.source,
            "open_access": paper.open_access,
            "citation_count": paper.citation_count,
        })

    def reindex_all(self, db: Session) -> int:
        papers = db.query(Paper).all()
        for paper in papers:
            self.search.index_paper(str(paper.id), {
                "title": paper.title,
                "abstract": paper.abstract,
                "authors": [pa.author.name for pa in paper.authors],
                "year": paper.year,
                "journal": paper.journal,
                "source": paper.source,
                "open_access": paper.open_access,
                "citation_count": paper.citation_count,
            })
        return len(papers)
