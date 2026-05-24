from uuid import UUID
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.deps import get_current_user
from app.core.database import get_db
from app.models import Notification
from app.services.recommendation_service import RecommendationService

router = APIRouter(tags=["recommendations"])


@router.get("/recommendations")
def recommendations(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return RecommendationService().recommendations(db, user)


@router.get("/trending")
def trending(db: Session = Depends(get_db)):
    return RecommendationService().trending(db)


@router.post("/topics/{topic_id}/follow")
def follow_topic(topic_id: UUID):
    return {"status": "followed", "topic_id": topic_id}


@router.post("/authors/{author_id}/follow")
def follow_author(author_id: UUID):
    return {"status": "followed", "author_id": author_id}


@router.get("/notifications")
def notifications(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(Notification).filter(Notification.user_id == user.id).all()
