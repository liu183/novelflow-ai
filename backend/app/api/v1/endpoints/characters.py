"""角色相关API端点."""
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.character import CharacterCreate, CharacterUpdate, CharacterResponse
from app.services.database import get_db


router = APIRouter()


@router.post("/", response_model=CharacterResponse, status_code=status.HTTP_201_CREATED)
async def create_character(
    character_data: CharacterCreate,
    project_id: str,
    db: AsyncSession = Depends(get_db),
):
    """创建新角色."""
    # TODO: 实现角色创建逻辑
    pass


@router.get("/", response_model=List[CharacterResponse])
async def list_characters(
    project_id: str,
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db),
):
    """获取项目的角色列表."""
    # TODO: 实现角色列表查询逻辑
    pass


@router.get("/{character_id}", response_model=CharacterResponse)
async def get_character(
    character_id: str,
    db: AsyncSession = Depends(get_db),
):
    """获取角色详情."""
    # TODO: 实现角色查询逻辑
    pass


@router.put("/{character_id}", response_model=CharacterResponse)
async def update_character(
    character_id: str,
    character_data: CharacterUpdate,
    db: AsyncSession = Depends(get_db),
):
    """更新角色."""
    # TODO: 实现角色更新逻辑
    pass


@router.delete("/{character_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_character(
    character_id: str,
    db: AsyncSession = Depends(get_db),
):
    """删除角色."""
    # TODO: 实现角色删除逻辑
    pass


@router.post("/{character_id}/make-3d")
async def make_character_3d(
    character_id: str,
    db: AsyncSession = Depends(get_db),
):
    """让角色立体化（应用7要素）."""
    # TODO: 实现角色立体化逻辑
    # 1. 获取角色基本信息
    # 2. 调用AI角色塑造师
    # 3. 更新角色档案
    pass
