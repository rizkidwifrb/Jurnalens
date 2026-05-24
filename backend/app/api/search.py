from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.api.deps import get_optional_user
from app.core.database import get_db
from app.models import Paper
from app.schemas import PaperRead, SearchFilters, SearchRequest, SearchResponse
from app.services.graph_service import GraphService
from app.services.hybrid_search_service import HybridSearchService

router = APIRouter(tags=["search"])


@router.get("/search", response_model=list[PaperRead])
def basic_search(q: str = Query(""), db: Session = Depends(get_db)):
    return db.query(Paper).filter(Paper.title.ilike(f"%{q}%")).limit(20).all()


@router.post("/search/semantic", response_model=SearchResponse)
@router.post("/search/hybrid", response_model=SearchResponse)
def hybrid(payload: SearchRequest, db: Session = Depends(get_db), user=Depends(get_optional_user)):
    results, answer, citations, next_questions = HybridSearchService().search(db, payload.query, payload.filters, payload.limit, user)
    return SearchResponse(query=payload.query, results=results, answer=answer, citations=citations, next_questions=next_questions)


@router.get("/papers/{paper_id}", response_model=PaperRead)
def paper_detail(paper_id: UUID, db: Session = Depends(get_db)):
    paper = db.get(Paper, paper_id)
    if not paper:
        raise HTTPException(status_code=404, detail="Paper not found")
    return paper


@router.get("/papers/{paper_id}/related")
def related(paper_id: UUID, db: Session = Depends(get_db)):
    paper = db.get(Paper, paper_id)
    if not paper:
        raise HTTPException(status_code=404, detail="Paper not found")
    return db.query(Paper).filter(Paper.id != paper_id, Paper.journal == paper.journal).limit(10).all()


@router.get("/papers/{paper_id}/citations")
def citations(paper_id: UUID):
    return {"paper_id": str(paper_id), "references": [], "cited_by": [], "note": "Partial citation graph: populate from source metadata when available."}


@router.get("/papers/{paper_id}/graph")
def graph(paper_id: UUID, db: Session = Depends(get_db)):
    return GraphService().paper_graph(db, paper_id)
