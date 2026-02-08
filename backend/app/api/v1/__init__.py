"""API v1 路由."""
from fastapi import APIRouter
from app.api.v1.endpoints import (
    projects,
    inspirations,
    characters,
    ai,
    conversations,
)


api_router = APIRouter()

# 注册各模块路由
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
api_router.include_router(inspirations.router, prefix="/inspirations", tags=["inspirations"])
api_router.include_router(characters.router, prefix="/characters", tags=["characters"])
api_router.include_router(ai.router, prefix="/ai", tags=["ai"])
api_router.include_router(conversations.router, prefix="/conversations", tags=["conversations"])
