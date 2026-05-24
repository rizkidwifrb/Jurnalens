from celery import Celery
from celery.schedules import crontab
from app.core.config import get_settings

settings = get_settings()
celery_app = Celery("research_engine", broker=settings.redis_url, backend=settings.redis_url)
celery_app.conf.timezone = "UTC"
celery_app.conf.beat_schedule = {
    "ingest-default-topics-every-30-minutes": {
        "task": "app.workers.ingestion_tasks.ingest_scheduled_topics",
        "schedule": crontab(minute="*/30"),
    }
}
