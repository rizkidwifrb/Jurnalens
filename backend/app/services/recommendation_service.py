from sqlalchemy import desc
from sqlalchemy.orm import Session
from app.models import Bookmark, Paper, SearchHistory, User


class RecommendationService:
    def recommendations(self, db: Session, user: User, limit: int = 12) -> list[dict]:
        searches = db.query(SearchHistory).filter(SearchHistory.user_id == user.id).order_by(desc(SearchHistory.created_at)).limit(5).all()
        bookmarks = db.query(Bookmark).filter(Bookmark.user_id == user.id).all()
        terms = " ".join(s.query for s in searches)
        query = db.query(Paper)
        if terms:
            for term in terms.split()[:8]:
                query = query.filter(Paper.abstract.ilike(f"%{term}%") | Paper.title.ilike(f"%{term}%"))
        papers = query.order_by(desc(Paper.citation_count), desc(Paper.year)).limit(limit).all()
        reason = "Recommended because of your recent searches and bookmarks." if searches or bookmarks else "Recommended from recent, high-impact local papers."
        return [{"paper": p, "reason": reason} for p in papers]

    def trending(self, db: Session, limit: int = 10) -> list[Paper]:
        return db.query(Paper).order_by(desc(Paper.citation_count), desc(Paper.year)).limit(limit).all()
