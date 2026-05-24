from uuid import UUID
from sqlalchemy.orm import Session
from app.models import Paper, SearchHistory, User
from app.schemas import SearchFilters, SearchResult
from app.services.embedding_service import EmbeddingService
from app.services.groq_service import GroqService
from app.services.opensearch_service import OpenSearchService
from app.services.qdrant_service import QdrantService


class HybridSearchService:
    def __init__(self):
        self.embeddings = EmbeddingService()
        self.opensearch = OpenSearchService()
        self.qdrant = QdrantService()
        self.llm = GroqService()

    def _filters_to_sql(self, query, filters: SearchFilters):
        if filters.year_from:
            query = query.filter(Paper.year >= filters.year_from)
        if filters.year_to:
            query = query.filter(Paper.year <= filters.year_to)
        if filters.journal:
            query = query.filter(Paper.journal.ilike(f"%{filters.journal}%"))
        if filters.min_citations is not None:
            query = query.filter(Paper.citation_count >= filters.min_citations)
        if filters.open_access_only:
            query = query.filter(Paper.open_access.is_(True))
        if filters.source_database:
            query = query.filter(Paper.source == filters.source_database)
        return query

    def search(self, db: Session, query: str, filters: SearchFilters, limit: int, user: User | None = None) -> tuple[list[SearchResult], str, list[dict], list[str]]:
        if user:
            db.add(SearchHistory(user_id=user.id, query=query, filters_json=filters.model_dump()))
            db.commit()
        bm25_hits = self.opensearch.search(query, limit=limit * 2)
        vector = self.embeddings.embed_one(query)
        vector_hits = self.qdrant.search(vector, limit=limit * 2)
        scores: dict[str, float] = {}
        reasons: dict[str, list[str]] = {}
        for rank, hit in enumerate(bm25_hits):
            scores[hit["id"]] = scores.get(hit["id"], 0) + (1 / (rank + 1)) * 0.55
            reasons.setdefault(hit["id"], []).append("BM25 keyword match")
        for rank, hit in enumerate(vector_hits):
            paper_id = hit["payload"].get("paper_id")
            if paper_id:
                scores[paper_id] = scores.get(paper_id, 0) + float(hit["score"]) * 0.45 + (1 / (rank + 1)) * 0.05
                reasons.setdefault(paper_id, []).append("semantic vector similarity")
        if not scores:
            fallback = self._filters_to_sql(db.query(Paper).filter(Paper.title.ilike(f"%{query}%")), filters).limit(limit).all()
            scores = {str(p.id): 0.1 for p in fallback}
        ordered_ids = sorted(scores, key=scores.get, reverse=True)
        papers = self._filters_to_sql(db.query(Paper).filter(Paper.id.in_([UUID(i) for i in ordered_ids])), filters).all()
        by_id = {str(p.id): p for p in papers}
        results = [
            SearchResult(paper=by_id[pid], relevance_score=round(scores[pid], 4), ai_summary=(by_id[pid].abstract or "Not available")[:260], match_reasons=reasons.get(pid, []))
            for pid in ordered_ids if pid in by_id
        ][:limit]
        context = [r.paper.model_dump() if hasattr(r.paper, "model_dump") else {
            "title": r.paper.title, "abstract": r.paper.abstract, "year": r.paper.year
        } for r in results[:5]]
        answer = self.llm.complete(f"Answer this academic search query and cite the most relevant papers: {query}", context)
        citations = [{"index": i + 1, "paper_id": str(r.paper.id), "title": r.paper.title, "doi": r.paper.doi or "Not available"} for i, r in enumerate(results[:5])]
        next_questions = [
            f"What methods are most common in {query}?",
            f"What research gaps remain for {query}?",
            f"Which recent papers should I read next about {query}?",
        ]
        return results, answer, citations, next_questions
