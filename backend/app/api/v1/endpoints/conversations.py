"""对话相关API端点."""
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.conversation import (
    ConversationCreate,
    ConversationResponse,
    MessageAdd,
)
from app.services.database import get_db


router = APIRouter()


@router.post("/", response_model=ConversationResponse, status_code=status.HTTP_201_CREATED)
async def create_conversation(
    project_id: str,
    conversation_data: ConversationCreate,
    db: AsyncSession = Depends(get_db),
):
    """创建新对话."""
    # TODO: 实现对话创建逻辑
    pass


@router.get("/", response_model=List[ConversationResponse])
async def list_conversations(
    project_id: str,
    skip: int = 0,
    limit: int = 50,
    db: AsyncSession = Depends(get_db),
):
    """获取项目的对话列表."""
    # TODO: 实现对话列表查询逻辑
    pass


@router.get("/{conversation_id}", response_model=ConversationResponse)
async def get_conversation(
    conversation_id: str,
    db: AsyncSession = Depends(get_db),
):
    """获取对话详情."""
    # TODO: 实现对话查询逻辑
    pass


@router.post("/{conversation_id}/messages")
async def add_message(
    conversation_id: str,
    message_data: MessageAdd,
    db: AsyncSession = Depends(get_db),
):
    """添加消息到对话."""
    # TODO: 实现添加消息逻辑
    # 1. 获取对话
    # 2. 添加用户消息
    # 3. 调用AI生成响应
    # 4. 添加AI消息
    # 5. 返回AI响应
    pass


@router.post("/{conversation_id}/switch-role")
async def switch_ai_role(
    conversation_id: str,
    new_role: str,
    db: AsyncSession = Depends(get_db),
):
    """切换对话的AI角色."""
    # TODO: 实现切换AI角色逻辑
    pass
