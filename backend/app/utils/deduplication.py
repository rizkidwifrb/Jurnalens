from difflib import SequenceMatcher
from sqlalchemy.orm import Session
from app.models import Paper
from app.utils.text_cleaning import normalize_title


def find_duplicate_paper(db: Session, title: str, doi: str | None = None) -> Paper | None:
    if doi:
        match = db.query(Paper).filter(Paper.doi == doi.lower()).first()
        if match:
            return match
    normalized = normalize_title(title)
    candidates = db.query(Paper).filter(Paper.title.ilike(f"%{title[:32]}%")).limit(20).all()
    for candidate in candidates:
        if normalize_title(candidate.title) == normalized:
            return candidate
        if SequenceMatcher(None, normalize_title(candidate.title), normalized).ratio() > 0.94:
            return candidate
    return None
