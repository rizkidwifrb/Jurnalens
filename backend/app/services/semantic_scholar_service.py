import httpx
from app.core.config import get_settings


class SemanticScholarService:
    async def search(self, query: str, per_page: int = 25) -> list[dict]:
        headers = {}
        if get_settings().semantic_scholar_api_key:
            headers["x-api-key"] = get_settings().semantic_scholar_api_key
        params = {"query": query, "limit": per_page, "fields": "title,abstract,authors,year,venue,url,openAccessPdf,citationCount,externalIds"}
        async with httpx.AsyncClient(timeout=30, headers=headers) as client:
            data = (await client.get("https://api.semanticscholar.org/graph/v1/paper/search", params=params)).json()
        return [self.normalize(item) for item in data.get("data", [])]

    def normalize(self, item: dict) -> dict:
        external = item.get("externalIds") or {}
        return {
            "title": item.get("title") or "Untitled",
            "abstract": item.get("abstract"),
            "doi": (external.get("DOI") or "").lower() or None,
            "year": item.get("year"),
            "publication_date": None,
            "source": "Semantic Scholar",
            "journal": item.get("venue"),
            "url": item.get("url"),
            "pdf_url": (item.get("openAccessPdf") or {}).get("url"),
            "open_access": bool(item.get("openAccessPdf")),
            "citation_count": item.get("citationCount"),
            "authors": [a.get("name") for a in item.get("authors", [])],
            "metadata_json": item,
        }
