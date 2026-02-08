"""AI相关API端点."""
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from app.schemas.ai import (
    ConversationRequest,
    ConversationResponse,
    GenerateContentRequest,
    OptimizeContentRequest,
    QualityAnalysisResponse,
)
from app.services.ai.ai_manager import ai_manager
from app.ai.roles import get_ai_role
from app.ai.templates import PromptTemplateManager


router = APIRouter()
template_manager = PromptTemplateManager()


@router.post("/chat", response_model=ConversationResponse)
async def ai_chat(request: ConversationRequest):
    """AI对话接口."""
    try:
        # 获取AI角色
        ai_role_id = request.ai_role or "inspiration_collector"
        ai_role = get_ai_role(ai_role_id)

        if not ai_role:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"AI role '{ai_role_id}' not found",
            )

        # 调用AI服务
        response = await ai_manager.chat(
            messages=[{"role": "user", "content": request.message}],
            system_prompt=ai_role.system_prompt,
            temperature=ai_role.temperature,
            max_tokens=ai_role.max_tokens,
        )

        # 返回响应
        return ConversationResponse(
            conversation_id=None,  # TODO: 创建或获取对话ID
            message={
                "role": "assistant",
                "content": response.text,
                "ai_role": ai_role_id,
                "metadata": response.metadata,
            },
            suggested_actions=response.suggested_actions,
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


@router.post("/generate/inspiration-expansion")
async def generate_inspiration_expansion(request: GenerateContentRequest):
    """生成灵感扩展."""
    try:
        # 填充提示词模板
        prompt = template_manager.fill_template(
            "inspiration_development",
            request.context,
        )

        # 添加项目上下文
        # TODO: 从数据库获取项目信息并添加上下文

        # 调用AI服务
        response = await ai_manager.complete(
            prompt=prompt,
            response_format="json",
        )

        return {
            "text": response.text,
            "structured_data": response.structured_data,
            "metadata": response.metadata,
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


@router.post("/generate/conflict-design")
async def generate_conflict_design(request: GenerateContentRequest):
    """生成冲突方案."""
    try:
        # TODO: 实现冲突设计生成逻辑
        pass

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


@router.post("/generate/character-profile")
async def generate_character_profile(request: GenerateContentRequest):
    """生成角色档案."""
    try:
        # 填充提示词模板
        prompt = template_manager.fill_template(
            "character_profile",
            request.context,
        )

        # 调用AI服务
        response = await ai_manager.complete(
            prompt=prompt,
            response_format="json",
        )

        return {
            "text": response.text,
            "structured_data": response.structured_data,
            "metadata": response.metadata,
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


@router.post("/generate/scene-content")
async def generate_scene_content(request: GenerateContentRequest):
    """生成场景内容."""
    try:
        # TODO: 实现场景内容生成逻辑
        pass

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


@router.post("/optimize/show-not-tell")
async def optimize_show_not_tell(request: OptimizeContentRequest):
    """优化：展示而非讲述."""
    try:
        prompt = f"""
# 任务：将以下文本转换为"展示而非讲述"

## 原始文本
{request.content}

## 要求
1. 不要直接说情绪或状态
2. 用具体动作、表情、环境细节来展示
3. 调动五感（视觉、听觉、触觉、嗅觉、味觉）
4. 每个细节都有目的
5. 保持原文的核心信息

## 输出
直接输出优化后的文本，不要解释。
        """

        response = await ai_manager.complete(prompt=prompt)

        return {
            "original": request.content,
            "optimized": response.text,
            "metadata": response.metadata,
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


@router.post("/optimize/dialogue")
async def optimize_dialogue(request: OptimizeContentRequest):
    """优化对话."""
    try:
        # 填充对话优化模板
        variables = {
            "original_dialogue": request.content,
            "character_info": request.context.get("character_info", ""),
            "scene_goal": request.context.get("scene_goal", ""),
            "optimization_focus": request.context.get("optimization_focus", "all"),
        }

        prompt = template_manager.fill_template("dialogue_optimize", variables)

        response = await ai_manager.complete(prompt=prompt)

        return {
            "original": request.content,
            "optimized": response.text,
            "metadata": response.metadata,
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


@router.post("/analyze/quality", response_model=QualityAnalysisResponse)
async def analyze_quality(request: QualityAnalysisRequest):
    """质量分析."""
    try:
        # TODO: 实现质量分析逻辑
        # 1. 获取项目或内容
        # 2. 使用AI质检员角色
        # 3. 返回诊断报告
        pass

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )
