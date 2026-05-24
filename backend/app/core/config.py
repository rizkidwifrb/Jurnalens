from functools import lru_cache
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "AI Academic Research Engine"
    api_prefix: str = "/api"
    database_url: str = "postgresql+psycopg://research:research@postgres:5432/research"
    redis_url: str = "redis://redis:6379/0"
    opensearch_url: str = "http://opensearch:9200"
    qdrant_url: str = "http://qdrant:6333"
    openrouter_api_key: str | None = None
    jwt_secret_key: str = Field(default="change-me-locally")
    access_token_expire_minutes: int = 60 * 24
    openalex_email: str | None = None
    semantic_scholar_api_key: str | None = None
    core_api_key: str | None = None
    embedding_model_name: str = "BAAI/bge-small-en-v1.5"
    cors_origins: str = "http://localhost:3000,http://127.0.0.1:3000"
    upload_dir: str = "uploads"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
