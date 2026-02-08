"""项目相关API端点."""
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.project import (
    ProjectCreate,
    ProjectUpdate,
    ProjectResponse,
    ProjectOverview,
)
from app.models.entity.project import Project
from app.services.database import get_db


router = APIRouter()


@router.post("/", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
async def create_project(
    project_data: ProjectCreate,
    db: AsyncSession = Depends(get_db),
):
    """创建新项目."""
    # TODO: 实现项目创建逻辑
    # 1. 验证用户权限
    # 2. 创建项目记录
    # 3. 返回项目信息
    pass


@router.get("/", response_model=List[ProjectResponse])
async def list_projects(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db),
):
    """获取项目列表."""
    # TODO: 实现项目列表查询逻辑
    pass


@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(
    project_id: str,
    db: AsyncSession = Depends(get_db),
):
    """获取项目详情."""
    # TODO: 实现项目查询逻辑
    pass


@router.put("/{project_id}", response_model=ProjectResponse)
async def update_project(
    project_id: str,
    project_data: ProjectUpdate,
    db: AsyncSession = Depends(get_db),
):
    """更新项目."""
    # TODO: 实现项目更新逻辑
    pass


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(
    project_id: str,
    db: AsyncSession = Depends(get_db),
):
    """删除项目."""
    # TODO: 实现项目删除逻辑
    pass


@router.get("/{project_id}/overview", response_model=ProjectOverview)
async def get_project_overview(
    project_id: str,
    db: AsyncSession = Depends(get_db),
):
    """获取项目概览（含统计信息）."""
    # TODO: 实现项目概览逻辑
    # 1. 获取项目基本信息
    # 2. 统计字数、章节数等
    # 3. 获取最近活动
    # 4. 返回概览数据
    pass
