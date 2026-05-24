from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, PointStruct, VectorParams
from app.core.config import get_settings


class QdrantService:
    def __init__(self, collection: str = "papers"):
        self.collection = collection
        self.client = QdrantClient(url=get_settings().qdrant_url)

    def ensure_collection(self, size: int = 384) -> None:
        collections = [c.name for c in self.client.get_collections().collections]
        if self.collection not in collections:
            self.client.create_collection(
                collection_name=self.collection,
                vectors_config=VectorParams(size=size, distance=Distance.COSINE),
            )

    def upsert(self, vector_id: str, vector: list[float], payload: dict) -> None:
        self.ensure_collection(len(vector))
        self.client.upsert(self.collection, [PointStruct(id=vector_id, vector=vector, payload=payload)])

    def search(self, vector: list[float], limit: int = 20, filters: dict | None = None) -> list[dict]:
        self.ensure_collection(len(vector))
        hits = self.client.search(self.collection, query_vector=vector, limit=limit, query_filter=filters)
        return [{"id": str(hit.id), "score": hit.score, "payload": hit.payload or {}} for hit in hits]
