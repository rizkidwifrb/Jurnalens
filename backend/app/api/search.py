from uuid import UUID
import logging
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.api.deps import get_optional_user
from app.core.database import get_db
from app.models import Paper
from app.schemas import PaperRead, SearchFilters, SearchRequest, SearchResponse
from app.services.graph_service import GraphService
from app.services.hybrid_search_service import HybridSearchService
from app.services.live_search_service import live_external_search

logger = logging.getLogger(__name__)
router = APIRouter(tags=["search"])


@router.get("/search", response_model=list[PaperRead])
def basic_search(q: str = Query(""), db: Session = Depends(get_db)):
    return db.query(Paper).filter(Paper.title.ilike(f"%{q}%")).limit(20).all()


@router.post("/search/semantic", response_model=SearchResponse)
@router.post("/search/hybrid", response_model=SearchResponse)
def hybrid(payload: SearchRequest, db: Session = Depends(get_db), user=Depends(get_optional_user)):
    try:
        results, answer, citations, next_questions = HybridSearchService().search(db, payload.query, payload.filters, payload.limit, user)
    except Exception as exc:
        logger.exception("Hybrid search failed")
        results = live_external_search(payload.query, payload.limit)
        return SearchResponse(
            query=payload.query,
            results=results,
            answer=(
                "Local search index is temporarily unavailable, so these results were fetched live from academic sources. "
                "Check Railway DATABASE_URL, OpenSearch, Qdrant, and migrations for full hybrid retrieval. Confidence: Medium."
            ),
            citations=[{"index": i + 1, "paper_id": str(result.paper.id), "title": result.paper.title, "doi": result.paper.doi or "Not available"} for i, result in enumerate(results[:5])],
            next_questions=[
                f"What are the key papers about {payload.query}?",
                f"What methods are commonly used for {payload.query}?",
                f"What research gaps remain for {payload.query}?",
            ],
        )
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
