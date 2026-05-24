from sqlalchemy.orm import Session
from app.models import Paper
from app.services.groq_service import GroqService


class LiteratureReviewService:
    def __init__(self):
        self.llm = GroqService()

    def run(self, db: Session, paper_ids: list, task: str) -> str:
        papers = db.query(Paper).filter(Paper.id.in_(paper_ids)).all() if paper_ids else []
        context = [{"title": p.title, "abstract": p.abstract, "year": p.year, "doi": p.doi} for p in papers]
        return self.llm.complete(task, context)
