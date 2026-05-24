from sqlalchemy.orm import Session
from app.models import Paper
from app.utils.citation_formatter import apa, bibtex, ieee


class CitationService:
    def format(self, db: Session, paper_id, style: str) -> str:
        paper = db.get(Paper, paper_id)
        if not paper:
            return "Not available"
        return {"apa": apa, "ieee": ieee, "bibtex": bibtex}[style](paper)
