import httpx
from app.core.config import get_settings


class OpenAlexService:
    base_url = "https://api.openalex.org/works"

    async def search(self, query: str, per_page: int = 25) -> list[dict]:
        params = {"search": query, "per-page": per_page, "sort": "publication_date:desc"}
        if get_settings().openalex_email:
            params["mailto"] = get_settings().openalex_email
        async with httpx.AsyncClient(timeout=30) as client:
            data = (await client.get(self.base_url, params=params)).json()
        return [self.normalize(item) for item in data.get("results", [])]

    def normalize(self, item: dict) -> dict:
        authorships = item.get("authorships", [])
        return {
            "title": item.get("title") or "Untitled",
            "abstract": item.get("abstract_inverted_index") and self._restore_abstract(item["abstract_inverted_index"]),
            "doi": (item.get("doi") or "").replace("https://doi.org/", "").lower() or None,
            "year": item.get("publication_year"),
            "publication_date": item.get("publication_date"),
            "source": "OpenAlex",
            "journal": ((item.get("primary_location") or {}).get("source") or {}).get("display_name"),
            "url": item.get("id"),
            "pdf_url": ((item.get("primary_location") or {}).get("landing_page_url")),
            "open_access": (item.get("open_access") or {}).get("is_oa", False),
            "citation_count": item.get("cited_by_count", 0),
            "authors": [a.get("author", {}).get("display_name") for a in authorships if a.get("author")],
            "metadata_json": item,
        }

    def _restore_abstract(self, inverted: dict) -> str:
        words = sorted(((pos, word) for word, positions in inverted.items() for pos in positions), key=lambda x: x[0])
        return " ".join(word for _, word in words)
