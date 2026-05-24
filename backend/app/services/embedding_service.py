from functools import lru_cache
from app.core.config import get_settings


@lru_cache
def _model():
    from sentence_transformers import SentenceTransformer
    return SentenceTransformer(get_settings().embedding_model_name)


class EmbeddingService:
    def embed(self, texts: list[str]) -> list[list[float]]:
        if not texts:
            return []
        vectors = _model().encode(texts, normalize_embeddings=True)
        return [vector.tolist() for vector in vectors]

    def embed_one(self, text: str) -> list[float]:
        return self.embed([text])[0]
