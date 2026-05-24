import httpx
from app.core.config import get_settings


class CoreService:
    async def search(self, query: str, per_page: int = 25) -> list[dict]:
        settings = get_settings()
        if not settings.core_api_key:
            return []
        headers = {"Authorization": f"Bearer {settings.core_api_key}"}
        payload = {"q": query, "limit": per_page}
        async with httpx.AsyncClient(timeout=30, headers=headers) as client:
            data = (await client.post("https://api.core.ac.uk/v3/search/works", json=payload)).json()
        return [self.normalize(item) for item in data.get("results", [])]

    def normalize(self, item: dict) -> dict:
        doi = next((identifier.replace("https://doi.org/", "") for identifier in item.get("identifiers", []) if "doi.org" in identifier), None)
        return {
            "title": item.get("title") or "Untitled",
            "abstract": item.get("abstract"),
            "doi": doi.lower() if doi else None,
            "year": item.get("yearPublished"),
            "publication_date": None,
            "source": "CORE",
            "journal": (item.get("journals") or [None])[0],
            "url": item.get("downloadUrl") or item.get("sourceFulltextUrls", [None])[0],
            "pdf_url": item.get("downloadUrl"),
            "open_access": bool(item.get("downloadUrl")),
            "citation_count": None,
            "authors": [a.get("name") for a in item.get("authors", []) if a.get("name")],
            "metadata_json": item,
        }
