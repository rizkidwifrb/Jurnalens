from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, ConfigDict, EmailStr, Field


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserCreate(BaseModel):
    name: str = Field(min_length=2, max_length=255)
    email: EmailStr
    password: str = Field(min_length=8)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)


class UserRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    name: str
    email: EmailStr
    avatar_url: str | None = None
    created_at: datetime


class PaperRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    title: str
    abstract: str | None = None
    doi: str | None = None
    year: int | None = None
    source: str | None = None
    journal: str | None = None
    url: str | None = None
    pdf_url: str | None = None
    open_access: bool = False
    citation_count: int | None = 0
    metadata_json: dict | None = None


class SearchFilters(BaseModel):
    year_from: int | None = None
    year_to: int | None = None
    author: str | None = None
    journal: str | None = None
    min_citations: int | None = None
    open_access_only: bool = False
    topic: str | None = None
    paper_type: str | None = None
    source_database: str | None = None


class SearchRequest(BaseModel):
    query: str
    filters: SearchFilters = Field(default_factory=SearchFilters)
    limit: int = Field(default=12, ge=1, le=50)


class SearchResult(BaseModel):
    paper: PaperRead
    relevance_score: float
    ai_summary: str | None = None
    match_reasons: list[str] = []


class SearchResponse(BaseModel):
    query: str
    results: list[SearchResult]
    answer: str | None = None
    citations: list[dict] = []
    next_questions: list[str] = []


class AiPaperRequest(BaseModel):
    paper_ids: list[UUID] = []
    question: str | None = None
    query: str | None = None


class PdfChatRequest(BaseModel):
    question: str


class ExportLiteratureReviewRequest(BaseModel):
    title: str
    content: str
    format: str = "markdown"
