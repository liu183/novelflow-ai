"""FastAPI主应用."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1 import api_router
import uvicorn


def create_app() -> FastAPI:
    """创建FastAPI应用实例."""
    app = FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION,
        description="AI-powered novel creation platform",
        docs_url="/api/docs",
        redoc_url="/api/redoc",
    )

    # 配置CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # 注册路由
    app.include_router(api_router, prefix=settings.API_V1_PREFIX)

    # 健康检查
    @app.get("/health")
    async def health_check():
        """健康检查端点."""
        return {"status": "healthy", "version": settings.APP_VERSION}

    @app.get("/")
    async def root():
        """根路径."""
        return {
            "message": "Welcome to NovelFlow AI",
            "version": settings.APP_VERSION,
            "docs": "/api/docs",
        }

    return app


app = create_app()


if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
    )
