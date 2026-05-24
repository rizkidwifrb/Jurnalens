import asyncio
from app.core.database import SessionLocal
from app.services.arxiv_service import ArxivService
from app.services.crossref_service import CrossrefService
from app.services.core_service import CoreService
from app.services.ingestion_service import IngestionService
from app.services.openalex_service import OpenAlexService
from app.services.semantic_scholar_service import SemanticScholarService
from app.workers.celery_app import celery_app


async def _fetch_all(query: str, limit: int) -> list[dict]:
    services = [OpenAlexService(), ArxivService(), CrossrefService(), SemanticScholarService(), CoreService()]
    results = await asyncio.gather(*(service.search(query, limit) for service in services), return_exceptions=True)
    papers: list[dict] = []
    for result in results:
        if isinstance(result, list):
            papers.extend(result)
    return papers


@celery_app.task(name="app.workers.ingestion_tasks.ingest_keyword_task")
def ingest_keyword_task(query: str, limit: int = 25) -> dict:
    db = SessionLocal()
    created = 0
    try:
        papers = asyncio.run(_fetch_all(query, limit))
        service = IngestionService()
        for item in papers:
            before = item.get("title")
            if before:
                service.upsert_paper(db, item)
                created += 1
        return {"query": query, "seen": len(papers), "processed": created}
    finally:
        db.close()


@celery_app.task(name="app.workers.ingestion_tasks.ingest_scheduled_topics")
def ingest_scheduled_topics() -> list[dict]:
    topics = ["student mental health prediction", "large language models education", "depression detection NLP"]
    return [ingest_keyword_task(topic, 15) for topic in topics]
