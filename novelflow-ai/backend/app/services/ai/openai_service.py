"""OpenAI GPT服务."""
from typing import Dict, List, Optional, Any
from openai import AsyncOpenAI
from app.core.config import settings
from app.schemas.ai import AIResponse


class OpenAIService:
    """OpenAI GPT API服务."""

    def __init__(self):
        """初始化OpenAI服务."""
        if not settings.OPENAI_API_KEY:
            raise ValueError("OPENAI_API_KEY not configured")

        self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
        self.default_model = "gpt-4-turbo-preview"
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
            messages = []
            if system_prompt:
                messages.append({"role": "system", "content": system_prompt})
            messages.append({"role": "user", "content": prompt})

            # 调用OpenAI API
            response_format_type = {"type": "json_object"} if response_format == "json" else None

            response = await self.client.chat.completions.create(
                model=model or self.default_model,
                messages=messages,
                temperature=temperature or self.default_temperature,
                max_tokens=max_tokens or self.default_max_tokens,
                response_format=response_format_type,
            )

            # 提取响应文本
            text = response.choices[0].message.content or ""

            # 如果要求JSON格式，尝试解析
            structured_data = None
            if response_format == "json":
                try:
                    import json

                    structured_data = json.loads(text)
                except json.JSONDecodeError:
                    pass

            return AIResponse(
                text=text,
                structured_data=structured_data,
                suggested_actions=None,
                metadata={
                    "model": model or self.default_model,
                    "provider": "openai",
                    "usage": {
                        "input_tokens": response.usage.prompt_tokens,
                        "output_tokens": response.usage.completion_tokens,
                    },
                },
            )

        except Exception as e:
            raise Exception(f"OpenAI API error: {str(e)}")

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
            # 构建消息
            api_messages = []
            if system_prompt:
                api_messages.append({"role": "system", "content": system_prompt})
            api_messages.extend(messages)

            # 调用OpenAI API
            response = await self.client.chat.completions.create(
                model=model or self.default_model,
                messages=api_messages,
                temperature=temperature or self.default_temperature,
                max_tokens=max_tokens or self.default_max_tokens,
            )

            # 提取响应文本
            text = response.choices[0].message.content or ""

            return AIResponse(
                text=text,
                structured_data=None,
                suggested_actions=None,
                metadata={
                    "model": model or self.default_model,
                    "provider": "openai",
                    "usage": {
                        "input_tokens": response.usage.prompt_tokens,
                        "output_tokens": response.usage.completion_tokens,
                    },
                },
            )

        except Exception as e:
            raise Exception(f"OpenAI API error: {str(e)}")

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
            # 构建消息
            messages = []
            if system_prompt:
                messages.append({"role": "system", "content": system_prompt})
            messages.append({"role": "user", "content": prompt})

            # 调用OpenAI流式API
            stream = await self.client.chat.completions.create(
                model=model or self.default_model,
                messages=messages,
                temperature=temperature or self.default_temperature,
                max_tokens=max_tokens or self.default_max_tokens,
                stream=True,
            )

            async for chunk in stream:
                if chunk.choices[0].delta.content:
                    yield chunk.choices[0].delta.content

        except Exception as e:
            raise Exception(f"OpenAI streaming error: {str(e)}")
