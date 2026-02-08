"""Anthropic Claude AI服务."""
import asyncio
from typing import Dict, List, Optional, Any
import anthropic
from app.core.config import settings
from app.schemas.ai import AIResponse


class AnthropicService:
    """Anthropic Claude API服务."""

    def __init__(self):
        """初始化Anthropic服务."""
        if not settings.ANTHROPIC_API_KEY:
            raise ValueError("ANTHROPIC_API_KEY not configured")

        self.client = anthropic.AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)
        self.default_model = settings.DEFAULT_MODEL
        self.default_temperature = settings.DEFAULT_TEMPERATURE
        self.default_max_tokens = settings.DEFAULT_MAX_TOKENS

    async def complete(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None,
        model: Optional[str] = None,
        response_format: Optional[str] = None,  # "text" or "json"
    ) -> AIResponse:
        """完成文本生成.

        Args:
            prompt: 用户提示词
            system_prompt: 系统提示词
            temperature: 温度参数
            max_tokens: 最大token数
            model: 模型名称
            response_format: 响应格式

        Returns:
            AI响应对象
        """
        try:
            # 构建消息
            messages = [{"role": "user", "content": prompt}]

            # 调用Claude API
            response = await self.client.messages.create(
                model=model or self.default_model,
                max_tokens=max_tokens or self.default_max_tokens,
                temperature=temperature or self.default_temperature,
                system=system_prompt,
                messages=messages,
            )

            # 提取响应文本
            text = response.content[0].text

            # 如果要求JSON格式，尝试解析
            structured_data = None
            if response_format == "json":
                try:
                    import json

                    structured_data = json.loads(text)
                except json.JSONDecodeError:
                    pass  # 如果不是有效JSON，保持为文本

            return AIResponse(
                text=text,
                structured_data=structured_data,
                suggested_actions=None,
                metadata={
                    "model": model or self.default_model,
                    "provider": "anthropic",
                    "usage": {
                        "input_tokens": response.usage.input_tokens,
                        "output_tokens": response.usage.output_tokens,
                    },
                },
            )

        except Exception as e:
            raise Exception(f"Anthropic API error: {str(e)}")

    async def chat(
        self,
        messages: List[Dict[str, str]],
        system_prompt: Optional[str] = None,
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None,
        model: Optional[str] = None,
    ) -> AIResponse:
        """对话模式.

        Args:
            messages: 消息历史
            system_prompt: 系统提示词
            temperature: 温度参数
            max_tokens: 最大token数
            model: 模型名称

        Returns:
            AI响应对象
        """
        try:
            # 调用Claude API
            response = await self.client.messages.create(
                model=model or self.default_model,
                max_tokens=max_tokens or self.default_max_tokens,
                temperature=temperature or self.default_temperature,
                system=system_prompt,
                messages=messages,
            )

            # 提取响应文本
            text = response.content[0].text

            return AIResponse(
                text=text,
                structured_data=None,
                suggested_actions=None,
                metadata={
                    "model": model or self.default_model,
                    "provider": "anthropic",
                    "usage": {
                        "input_tokens": response.usage.input_tokens,
                        "output_tokens": response.usage.output_tokens,
                    },
                },
            )

        except Exception as e:
            raise Exception(f"Anthropic API error: {str(e)}")

    async def stream_complete(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None,
        model: Optional[str] = None,
    ):
        """流式完成文本生成.

        Args:
            prompt: 用户提示词
            system_prompt: 系统提示词
            temperature: 温度参数
            max_tokens: 最大token数
            model: 模型名称

        Yields:
            文本片段
        """
        try:
            messages = [{"role": "user", "content": prompt}]

            async with self.client.messages.stream(
                model=model or self.default_model,
                max_tokens=max_tokens or self.default_max_tokens,
                temperature=temperature or self.default_temperature,
                system=system_prompt,
                messages=messages,
            ) as stream:
                async for text in stream.text_stream:
                    yield text

        except Exception as e:
            raise Exception(f"Anthropic streaming error: {str(e)}")
