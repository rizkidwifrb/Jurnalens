import httpx


class CrossrefService:
    async def search(self, query: str, per_page: int = 25) -> list[dict]:
        async with httpx.AsyncClient(timeout=30) as client:
            data = (await client.get("https://api.crossref.org/works", params={"query": query, "rows": per_page, "sort": "published", "order": "desc"})).json()
        return [self.normalize(item) for item in data.get("message", {}).get("items", [])]

    def normalize(self, item: dict) -> dict:
        title = (item.get("title") or ["Untitled"])[0]
        date_parts = (item.get("published-print") or item.get("published-online") or item.get("created") or {}).get("date-parts", [[None]])[0]
        authors = [f"{a.get('given', '')} {a.get('family', '')}".strip() for a in item.get("author", [])]
        return {
            "title": title,
            "abstract": item.get("abstract"),
            "doi": (item.get("DOI") or "").lower() or None,
            "year": date_parts[0],
            "publication_date": "-".join(str(p) for p in date_parts) if date_parts[0] else None,
            "source": "Crossref",
            "journal": (item.get("container-title") or [None])[0],
            "url": item.get("URL"),
            "pdf_url": None,
            "open_access": False,
            "citation_count": item.get("is-referenced-by-count"),
            "authors": authors,
            "metadata_json": item,
        }
