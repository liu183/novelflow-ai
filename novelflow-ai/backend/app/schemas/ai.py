"""AI related schemas."""
from typing import Optional, List, Any, Dict
from pydantic import BaseModel, Field
from uuid import UUID


class AIMessage(BaseModel):
    """AI message schema."""

    role: str = Field(..., pattern="^(user|assistant|system)$")
    content: str
    ai_role: Optional[str] = None  # Specific AI role (inspiration_collector, etc.)
    metadata: Optional[Dict[str, Any]] = None
    structured_data: Optional[Dict[str, Any]] = None


class ConversationRequest(BaseModel):
    """Conversation request schema."""

    ai_role: Optional[str] = None
    message: str


class ConversationResponse(BaseModel):
    """Conversation response schema."""

    conversation_id: UUID
    message: AIMessage
    suggested_actions: Optional[List[Dict[str, Any]]] = None


class AIRequest(BaseModel):
    """Base AI request schema."""

    project_id: UUID
    prompt: str
    temperature: Optional[float] = Field(None, ge=0, le=2)
    max_tokens: Optional[int] = Field(None, gt=0, le=8000)
    model: Optional[str] = None


class AIResponse(BaseModel):
    """AI response schema."""

    text: str
    structured_data: Optional[Dict[str, Any]] = None
    suggested_actions: Optional[List[Dict[str, Any]]] = None
    metadata: Dict[str, Any]


class GenerateContentRequest(BaseModel):
    """Content generation request."""

    project_id: UUID
    content_type: str  # scene, dialogue, character, etc.
    context: Dict[str, Any]
    options: Optional[Dict[str, Any]] = None


class OptimizeContentRequest(BaseModel):
    """Content optimization request."""

    content: str
    optimization_type: str  # show_not_tell, rhythm, imagery, dialogue, etc.
    context: Optional[Dict[str, Any]] = None


class QualityAnalysisRequest(BaseModel):
    """Quality analysis request."""

    project_id: Optional[UUID] = None
    content_type: str  # structure, character, plot, writing, full
    entity_id: Optional[UUID] = None


class QualityIssue(BaseModel):
    """Quality issue schema."""

    type: str
    severity: str  # critical, important, optional
    location: Optional[str] = None
    description: str
    suggestion: str


class QualityScore(BaseModel):
    """Quality score schema."""

    structure: int = Field(..., ge=0, le=100)
    character: int = Field(..., ge=0, le=100)
    plot: int = Field(..., ge=0, le=100)
    writing: int = Field(..., ge=0, le=100)
    total: int = Field(..., ge=0, le=100)


class QualityAnalysisResponse(BaseModel):
    """Quality analysis response."""

    scores: QualityScore
    issues: List[QualityIssue]
    suggestions: List[str]
    analyzed_at: str
