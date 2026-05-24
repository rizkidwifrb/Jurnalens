# Jurnalens

A local-first academic research platform inspired by Perplexity, Semantic Scholar, and Google Scholar-style workflows, without scraping Google Scholar.

## What Is Included

- Next.js 15, TypeScript, TailwindCSS, shadcn-style components, Framer Motion, Lucide, React Flow.
- FastAPI backend with modular routes and services.
- PostgreSQL schema for users, papers, authors, citations, embeddings, bookmarks, search history, topics, notifications, PDFs, chunks, and AI outputs.
- Free academic ingestion from OpenAlex, arXiv, Crossref, plus optional Semantic Scholar and CORE API keys.
- Hybrid retrieval with OpenSearch BM25 and Qdrant vector search.
- Local embeddings with `BAAI/bge-small-en-v1.5` via sentence-transformers.
- OpenRouter service layer for grounded research assistant output.
- PDF upload, PyMuPDF extraction, chunking, vector indexing, and page-aware PDF chat.
- Recommendation, graph, citation export, Celery worker, Celery beat scheduler, Docker Compose.

## Free Local Requirements

The app is designed to run without paid APIs for academic search ingestion. OpenRouter requires a key for AI generation. Without `OPENROUTER_API_KEY`, the backend still runs and returns a clear configuration message for AI endpoints.

Semantic Scholar and CORE keys are optional. OpenAlex, Crossref, and arXiv work without paid credentials.

## Quick Start

1. Install Docker Desktop.
2. Copy env files:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

3. Start everything:

```bash
docker compose up --build
```

4. Open:

- Frontend: http://localhost:3000
- Backend docs: http://localhost:8000/docs
- OpenSearch: http://localhost:9200
- Qdrant: http://localhost:6333/dashboard

## Manual Development

Backend:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Root workspace commands are also available:

```bash
npm install
npm run dev
npm run build
```

## Vercel Deployment

This repository uses a Next.js frontend in `frontend/` and a FastAPI backend in `backend/`.

Recommended Vercel settings for the frontend:

- Framework preset: Next.js
- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: Next.js default
- Install command: `npm install`

Environment variables for the Vercel frontend:

```bash
NEXT_PUBLIC_API_URL=https://your-backend-domain.example.com/api
NEXT_PUBLIC_APP_NAME=Jurnalens
```

The FastAPI backend needs production services for PostgreSQL, Redis, OpenSearch, and Qdrant. Deploy it to a backend-capable host, then add the backend domain to `NEXT_PUBLIC_API_URL` and `CORS_ORIGINS`.

Backend production environment variables:

```bash
DATABASE_URL=postgresql+psycopg://user:password@host:5432/database
REDIS_URL=redis://host:6379/0
OPENSEARCH_URL=https://your-opensearch-host.example.com
QDRANT_URL=https://your-qdrant-host.example.com
OPENROUTER_API_KEY=your-openrouter-key
JWT_SECRET_KEY=your-long-random-secret
OPENALEX_EMAIL=you@example.com
SEMANTIC_SCHOLAR_API_KEY=
CORE_API_KEY=your-core-key
EMBEDDING_MODEL_NAME=BAAI/bge-small-en-v1.5
CORS_ORIGINS=http://localhost:3000,https://your-vercel-app.vercel.app
```

After setting backend variables, check external API access:

```bash
curl https://your-backend-domain.example.com/api/admin/external-health
```

## Ingestion Commands

Manual keyword/topic ingestion:

```bash
curl -X POST http://localhost:8000/api/admin/ingest/keyword -H "Content-Type: application/json" -d "{\"query\":\"student mental health prediction\",\"limit\":25}"
```

Worker:

```bash
celery -A app.workers.celery_app worker -l info
```

Scheduler:

```bash
celery -A app.workers.celery_app beat -l info
```

Reindex OpenSearch:

```bash
curl -X POST http://localhost:8000/api/admin/reindex
```

Health check:

```bash
curl http://localhost:8000/api/admin/health
```

## API Overview

Auth: `/auth/register`, `/auth/login`, `/auth/me`

Search: `/search`, `/search/semantic`, `/search/hybrid`, `/papers/{id}`, `/papers/{id}/related`, `/papers/{id}/citations`, `/papers/{id}/graph`

AI: `/ai/summarize`, `/ai/explain-simple`, `/ai/compare`, `/ai/literature-review`, `/ai/research-gap`, `/ai/methodology`, `/ai/novelty-score`, `/ai/research-roadmap`

PDF: `/pdf/upload`, `/pdf`, `/pdf/{id}`, `/pdf/{id}/chat`, `/pdf/{id}/summarize`, `/pdf/{id}/extract-methodology`

Bookmarks: `/bookmarks/{paper_id}`, `/bookmarks`

Recommendations: `/recommendations`, `/trending`, `/topics/{id}/follow`, `/authors/{id}/follow`, `/notifications`

Export: `/export/paper/{id}/apa`, `/export/paper/{id}/ieee`, `/export/paper/{id}/bibtex`, `/export/literature-review`

Admin: `/admin/ingest/topic`, `/admin/ingest/keyword`, `/admin/reindex`, `/admin/regenerate-embeddings`, `/admin/health`

## Troubleshooting

- Docker not found: install Docker Desktop and restart the terminal.
- OpenSearch exits: allocate at least 4 GB memory to Docker Desktop.
- First embedding call is slow: sentence-transformers downloads `BAAI/bge-small-en-v1.5` once.
- AI output says OpenRouter is not configured: set `OPENROUTER_API_KEY` in `backend/.env`.
- Semantic Scholar rate limits: leave the API key empty for MVP or add an optional free key.
- Empty search results: run ingestion first, then retry search.

## Reset

```bash
docker compose down -v
docker compose up --build
```
