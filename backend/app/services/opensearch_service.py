from opensearchpy import OpenSearch
from app.core.config import get_settings


class OpenSearchService:
    def __init__(self, index: str = "papers"):
        self.index = index
        self.client = OpenSearch(get_settings().opensearch_url, verify_certs=False)

    def ensure_index(self) -> None:
        if self.client.indices.exists(self.index):
            return
        self.client.indices.create(self.index, body={
            "settings": {"index": {"number_of_shards": 1, "number_of_replicas": 0}},
            "mappings": {"properties": {
                "title": {"type": "text"},
                "abstract": {"type": "text"},
                "authors": {"type": "text"},
                "year": {"type": "integer"},
                "journal": {"type": "keyword"},
                "source": {"type": "keyword"},
                "open_access": {"type": "boolean"},
                "citation_count": {"type": "integer"},
            }},
        })

    def index_paper(self, paper_id: str, document: dict) -> None:
        self.ensure_index()
        self.client.index(index=self.index, id=paper_id, body=document, refresh=False)

    def search(self, query: str, limit: int = 20, filters: dict | None = None) -> list[dict]:
        self.ensure_index()
        must = [{"multi_match": {"query": query, "fields": ["title^4", "abstract^2", "authors"]}}]
        filter_clauses = filters or []
        body = {"query": {"bool": {"must": must, "filter": filter_clauses}}, "size": limit}
        result = self.client.search(index=self.index, body=body)
        return [{"id": hit["_id"], "score": hit["_score"], "source": hit["_source"]} for hit in result["hits"]["hits"]]
