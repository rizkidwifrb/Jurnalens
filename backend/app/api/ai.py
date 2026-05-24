from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas import AiPaperRequest
from app.services.literature_review_service import LiteratureReviewService

router = APIRouter(prefix="/ai", tags=["ai"])


def _run(db: Session, payload: AiPaperRequest, task: str):
    return {"content": LiteratureReviewService().run(db, payload.paper_ids, task), "confidence": "Medium when papers include abstracts; lower when metadata is sparse."}


@router.post("/summarize")
def summarize(payload: AiPaperRequest, db: Session = Depends(get_db)):
    return _run(db, payload, "Summarize the selected paper(s) with citations.")


@router.post("/explain-simple")
def explain_simple(payload: AiPaperRequest, db: Session = Depends(get_db)):
    return _run(db, payload, "Explain like I am 15: simple summary, problem, why it matters, method, result meaning, analogy, and limitations.")


@router.post("/compare")
def compare(payload: AiPaperRequest, db: Session = Depends(get_db)):
    return _run(db, payload, "Compare the selected papers by goal, method, dataset, results, limitations, novelty, and citations.")


@router.post("/literature-review")
def literature_review(payload: AiPaperRequest, db: Session = Depends(get_db)):
    return _run(db, payload, "Generate a structured literature review grounded only in the selected papers.")


@router.post("/research-gap")
def research_gap(payload: AiPaperRequest, db: Session = Depends(get_db)):
    return _run(db, payload, "Detect research gaps and justify them using cited paper evidence.")


@router.post("/methodology")
def methodology(payload: AiPaperRequest, db: Session = Depends(get_db)):
    return _run(db, payload, "Extract methodology, variables, datasets, instruments, and analysis techniques.")


@router.post("/novelty-score")
def novelty(payload: AiPaperRequest, db: Session = Depends(get_db)):
    return _run(db, payload, "Assess novelty with a transparent score and supporting citations.")


@router.post("/research-roadmap")
def roadmap(payload: AiPaperRequest, db: Session = Depends(get_db)):
    return _run(db, payload, "Suggest next research questions, thesis titles, and a research roadmap.")
