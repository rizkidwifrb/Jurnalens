from fastapi import APIRouter
from app.api import admin, ai, auth, bookmarks, export, pdf, recommendations, search

api_router = APIRouter(prefix="/api")
api_router.include_router(auth.router)
api_router.include_router(search.router)
api_router.include_router(ai.router)
api_router.include_router(pdf.router)
api_router.include_router(bookmarks.router)
api_router.include_router(recommendations.router)
api_router.include_router(export.router)
api_router.include_router(admin.router)
