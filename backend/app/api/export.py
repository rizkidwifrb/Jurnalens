from uuid import UUID
from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas import ExportLiteratureReviewRequest
from app.services.citation_service import CitationService

router = APIRouter(prefix="/export", tags=["export"])


@router.get("/paper/{paper_id}/apa")
def apa(paper_id: UUID, db: Session = Depends(get_db)):
    return Response(CitationService().format(db, paper_id, "apa"), media_type="text/plain")


@router.get("/paper/{paper_id}/ieee")
def ieee(paper_id: UUID, db: Session = Depends(get_db)):
    return Response(CitationService().format(db, paper_id, "ieee"), media_type="text/plain")


@router.get("/paper/{paper_id}/bibtex")
def bibtex(paper_id: UUID, db: Session = Depends(get_db)):
    return Response(CitationService().format(db, paper_id, "bibtex"), media_type="text/plain")


@router.post("/literature-review")
def literature_review(payload: ExportLiteratureReviewRequest):
    return Response(f"# {payload.title}\n\n{payload.content}\n", media_type="text/markdown")
