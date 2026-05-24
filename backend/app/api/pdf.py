from uuid import UUID
from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.orm import Session
from app.api.deps import get_current_user
from app.core.database import get_db
from app.models import PdfDocument
from app.schemas import PdfChatRequest
from app.services.pdf_service import PdfService

router = APIRouter(prefix="/pdf", tags=["pdf"])


@router.post("/upload")
def upload(file: UploadFile = File(...), db: Session = Depends(get_db), user=Depends(get_current_user)):
    pdf = PdfService().ingest(db, user.id, file)
    return {"id": pdf.id, "title": pdf.title, "filename": pdf.filename}


@router.get("")
def library(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(PdfDocument).filter(PdfDocument.user_id == user.id).all()


@router.get("/{pdf_id}")
def detail(pdf_id: UUID, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(PdfDocument).filter(PdfDocument.id == pdf_id, PdfDocument.user_id == user.id).first()


@router.post("/{pdf_id}/chat")
def chat(pdf_id: UUID, payload: PdfChatRequest, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return PdfService().chat(db, pdf_id, payload.question)


@router.post("/{pdf_id}/summarize")
def summarize(pdf_id: UUID, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return PdfService().chat(db, pdf_id, "Summarize this PDF with page-aware citations.")


@router.post("/{pdf_id}/extract-methodology")
def methodology(pdf_id: UUID, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return PdfService().chat(db, pdf_id, "Extract methodology, variables, dataset, and limitations.")
