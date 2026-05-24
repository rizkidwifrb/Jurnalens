from uuid import UUID
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.deps import get_current_user
from app.core.database import get_db
from app.models import Bookmark, Paper

router = APIRouter(prefix="/bookmarks", tags=["bookmarks"])


@router.post("/{paper_id}")
def add(paper_id: UUID, db: Session = Depends(get_db), user=Depends(get_current_user)):
    existing = db.query(Bookmark).filter(Bookmark.user_id == user.id, Bookmark.paper_id == paper_id).first()
    if not existing:
        db.add(Bookmark(user_id=user.id, paper_id=paper_id))
        db.commit()
    return {"status": "bookmarked"}


@router.delete("/{paper_id}")
def remove(paper_id: UUID, db: Session = Depends(get_db), user=Depends(get_current_user)):
    db.query(Bookmark).filter(Bookmark.user_id == user.id, Bookmark.paper_id == paper_id).delete()
    db.commit()
    return {"status": "removed"}


@router.get("")
def list_bookmarks(db: Session = Depends(get_db), user=Depends(get_current_user)):
    ids = [b.paper_id for b in db.query(Bookmark).filter(Bookmark.user_id == user.id).all()]
    return db.query(Paper).filter(Paper.id.in_(ids)).all()
