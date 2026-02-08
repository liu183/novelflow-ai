"""AI服务管理器."""
from typing import Optional, Dict, List, Any
from app.services.ai.anthropic_service import AnthropicService
from app.services.ai.openai_service import OpenAIService
from app.core.config import settings
from app.schemas.ai import AIResponse


class AIServiceManager:
    """AI服务管理器，统一管理不同的AI提供商."""

    def __init__(self):
        """初始化AI服务管理器."""
        self.services = {}
        self._init_services()

    def _init_services(self):
        """初始化可用的AI服务."""
        provider = settings.AI_PROVIDER.lower()

        if provider in ["anthropic", "both"]:
            if settings.ANTHROPIC_API_KEY:
                self.services["anthropic"] = AnthropicService()

        if provider in ["openai", "both"]:
            if settings.OPENAI_API_KEY:
                self.services["openai"] = OpenAIService()

        if not self.services:
            raise ValueError("No AI service available. Please configure API keys.")

    def get_service(self, provider: Optional[str] = None):
        """获取AI服务.

        Args:
            provider: 服务提供商（anthropic/openai）

        Returns:
            AI服务实例

        Raises:
            ValueError: 如果服务不可用
        """
        if not provider:
            # 使用第一个可用的服务
            provider = next(iter(self.services.keys()))

        if provider not in self.services:
            raise ValueError(f"AI service '{provider}' not available")

        return self.services[provider]

    async def complete(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None,
        model: Optional[str] = None,
        provider: Optional[str] = None,
        response_format: Optional[str] = None,
    ) -> AIResponse:
        """完成文本生成.

        Args:
            prompt: 用户提示词
            system_prompt: 系统提示词
            temperature: 温度参数
            max_tokens: 最大token数
            model: 模型名称
            provider: 服务提供商
            response_format: 响应格式

        Returns:
            AI响应对象
        """
        service = self.get_service(provider)
        return await service.complete(
            prompt=prompt,
            system_prompt=system_prompt,
            temperature=temperature,
            max_tokens=max_tokens,
            model=model,
            response_format=response_format,
        )

    async def chat(
        self,
        messages: List[Dict[str, str]],
        system_prompt: Optional[str] = None,
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None,
        model: Optional[str] = None,
        provider: Optional[str] = None,
    ) -> AIResponse:
        """对话模式.

        Args:
            messages: 消息历史
            system_prompt: 系统提示词
            temperature: 温度参数
            max_tokens: 最大token数
            model: 模型名称
            provider: 服务提供商

        Returns:
            AI响应对象
        """
        service = self.get_service(provider)
        return await service.chat(
            messages=messages,
            system_prompt=system_prompt,
            temperature=temperature,
            max_tokens=max_tokens,
            model=model,
        )

    async def stream_complete(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None,
        model: Optional[str] = None,
        provider: Optional[str] = None,
    ):
        """流式完成文本生成.

        Args:
            prompt: 用户提示词
            system_prompt: 系统提示词
            temperature: 温度参数
            max_tokens: 最大token数
            model: 模型名称
            provider: 服务提供商

        Yields:
            文本片段
        """
        service = self.get_service(provider)
        async for chunk in service.stream_complete(
            prompt=prompt,
            system_prompt=system_prompt,
            temperature=temperature,
            max_tokens=max_tokens,
            model=model,
        ):
            yield chunk


# 全局AI服务管理器实例
ai_manager = AIServiceManager()
