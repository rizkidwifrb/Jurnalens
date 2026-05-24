import feedparser
import httpx


class ArxivService:
    async def search(self, query: str, per_page: int = 25) -> list[dict]:
        url = "http://export.arxiv.org/api/query"
        params = {"search_query": f"all:{query}", "start": 0, "max_results": per_page, "sortBy": "submittedDate", "sortOrder": "descending"}
        async with httpx.AsyncClient(timeout=30) as client:
            text = (await client.get(url, params=params)).text
        feed = feedparser.parse(text)
        return [self.normalize(entry) for entry in feed.entries]

    def normalize(self, entry: dict) -> dict:
        year = int(entry.published[:4]) if getattr(entry, "published", None) else None
        pdf = next((l.href for l in entry.links if getattr(l, "type", "") == "application/pdf"), None)
        return {
            "title": entry.title,
            "abstract": entry.summary,
            "doi": getattr(entry, "arxiv_doi", None),
            "year": year,
            "publication_date": getattr(entry, "published", None),
            "source": "arXiv",
            "journal": "arXiv",
            "url": entry.link,
            "pdf_url": pdf,
            "open_access": True,
            "citation_count": None,
            "authors": [a.name for a in getattr(entry, "authors", [])],
            "metadata_json": dict(entry),
        }
