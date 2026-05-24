import uuid
import httpx
from app.core.config import get_settings
from app.schemas import PaperRead, SearchResult


def _paper_id(item: dict) -> uuid.UUID:
    stable_key = item.get("doi") or item.get("url") or item.get("title") or str(item)
    return uuid.uuid5(uuid.NAMESPACE_URL, stable_key)


def _restore_openalex_abstract(inverted: dict | None) -> str | None:
    if not inverted:
        return None
    words = sorted(((pos, word) for word, positions in inverted.items() for pos in positions), key=lambda x: x[0])
    return " ".join(word for _, word in words)


def live_external_search(query: str, limit: int = 12) -> list[SearchResult]:
    settings = get_settings()
    papers: list[PaperRead] = []

    with httpx.Client(timeout=20) as client:
        openalex_params = {"search": query, "per-page": limit, "sort": "publication_date:desc"}
        if settings.openalex_email:
            openalex_params["mailto"] = settings.openalex_email
        try:
            response = client.get("https://api.openalex.org/works", params=openalex_params)
            if response.is_success:
                for item in response.json().get("results", []):
                    primary_location = item.get("primary_location") or {}
                    source = primary_location.get("source") or {}
                    doi = (item.get("doi") or "").replace("https://doi.org/", "").lower() or None
                    paper = PaperRead(
                        id=_paper_id({"doi": doi, "url": item.get("id"), "title": item.get("title")}),
                        title=item.get("title") or "Untitled",
                        abstract=_restore_openalex_abstract(item.get("abstract_inverted_index")),
                        doi=doi,
                        year=item.get("publication_year"),
                        source="OpenAlex",
                        journal=source.get("display_name"),
                        url=item.get("id"),
                        pdf_url=primary_location.get("landing_page_url"),
                        open_access=(item.get("open_access") or {}).get("is_oa", False),
                        citation_count=item.get("cited_by_count", 0),
                        metadata_json=item,
                    )
                    papers.append(paper)
        except httpx.HTTPError:
            pass

        if settings.core_api_key and len(papers) < limit:
            try:
                response = client.post(
                    "https://api.core.ac.uk/v3/search/works",
                    headers={"Authorization": f"Bearer {settings.core_api_key}"},
                    json={"q": query, "limit": limit - len(papers)},
                )
                if response.is_success:
                    for item in response.json().get("results", []):
                        doi = next((identifier.replace("https://doi.org/", "") for identifier in item.get("identifiers", []) if "doi.org" in identifier), None)
                        paper = PaperRead(
                            id=_paper_id({"doi": doi, "url": item.get("downloadUrl"), "title": item.get("title")}),
                            title=item.get("title") or "Untitled",
                            abstract=item.get("abstract"),
                            doi=doi.lower() if doi else None,
                            year=item.get("yearPublished"),
                            source="CORE",
                            journal=(item.get("journals") or [None])[0],
                            url=item.get("downloadUrl") or (item.get("sourceFulltextUrls") or [None])[0],
                            pdf_url=item.get("downloadUrl"),
                            open_access=bool(item.get("downloadUrl")),
                            citation_count=None,
                            metadata_json=item,
                        )
                        papers.append(paper)
            except httpx.HTTPError:
                pass

    return [
        SearchResult(
            paper=paper,
            relevance_score=round(max(0.1, 1 - (index * 0.04)), 4),
            ai_summary=(paper.abstract or "Abstract not available from live source.")[:260],
            match_reasons=["live external source fallback"],
        )
        for index, paper in enumerate(papers[:limit])
    ]
