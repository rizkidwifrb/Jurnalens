import httpx
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.core.config import get_settings
from app.core.database import get_db
from app.services.ingestion_service import IngestionService
from app.workers.ingestion_tasks import ingest_keyword_task

router = APIRouter(prefix="/admin", tags=["admin"])


class IngestRequest(BaseModel):
    query: str
    limit: int = 25


@router.post("/ingest/topic")
@router.post("/ingest/keyword")
def ingest(payload: IngestRequest):
    task = ingest_keyword_task.delay(payload.query, payload.limit)
    return {"task_id": task.id, "status": "queued"}


@router.post("/reindex")
def reindex(db: Session = Depends(get_db)):
    return {"indexed": IngestionService().reindex_all(db)}


@router.post("/regenerate-embeddings")
def regenerate_embeddings():
    return {"status": "queued manually via worker command", "command": "celery -A app.workers.celery_app worker -l info"}


@router.get("/health")
def health():
    return {"api": "ok", "postgres": "configured", "redis": "configured", "opensearch": "configured", "qdrant": "configured"}


@router.get("/external-health")
async def external_health():
    settings = get_settings()
    checks = {
        "openalex": {"configured": bool(settings.openalex_email), "ok": False},
        "core": {"configured": bool(settings.core_api_key), "ok": False},
        "openrouter": {"configured": bool(settings.openrouter_api_key), "ok": False},
    }

    async with httpx.AsyncClient(timeout=15) as client:
        try:
            response = await client.get(
                "https://api.openalex.org/works",
                params={"search": "machine learning", "per-page": 1, **({"mailto": settings.openalex_email} if settings.openalex_email else {})},
            )
            checks["openalex"].update({"ok": response.is_success, "status_code": response.status_code})
        except httpx.HTTPError as exc:
            checks["openalex"]["error"] = exc.__class__.__name__

        if settings.core_api_key:
            try:
                response = await client.post(
                    "https://api.core.ac.uk/v3/search/works",
                    headers={"Authorization": f"Bearer {settings.core_api_key}"},
                    json={"q": "machine learning", "limit": 1},
                )
                checks["core"].update({"ok": response.is_success, "status_code": response.status_code})
            except httpx.HTTPError as exc:
                checks["core"]["error"] = exc.__class__.__name__

        if settings.openrouter_api_key:
            try:
                response = await client.get(
                    "https://openrouter.ai/api/v1/models",
                    headers={"Authorization": f"Bearer {settings.openrouter_api_key}"},
                )
                checks["openrouter"].update({"ok": response.is_success, "status_code": response.status_code})
            except httpx.HTTPError as exc:
                checks["openrouter"]["error"] = exc.__class__.__name__

    return checks
