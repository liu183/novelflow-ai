"""Inspiration schemas."""
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field
from uuid import UUID


class InspirationBase(BaseModel):
    """Base inspiration schema."""

    content: str = Field(..., min_length=1)
    tags: Optional[List[str]] = Field(default_factory=list)
    metadata: Optional[dict] = None


class InspirationCreate(InspirationBase):
    """Inspiration creation schema."""

    category: Optional[str] = Field(
        None, pattern="^(has_head_tail|has_tail_only|no_head_no_tail)$"
    )


class InspirationUpdate(BaseModel):
    """Inspiration update schema."""

    content: Optional[str] = Field(None, min_length=1)
    category: Optional[str] = Field(None, pattern="^(has_head_tail|has_tail_only|no_head_no_tail)$")
    tags: Optional[List[str]] = None
    status: Optional[str] = Field(None, pattern="^(raw|developed|used)$")
    metadata: Optional[dict] = None


class InspirationInDB(InspirationBase):
    """Inspiration schema as stored in database."""

    id: UUID
    project_id: UUID
    user_id: UUID
    category: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class InspirationResponse(InspirationInDB):
    """Inspiration response schema."""

    pass


class ConflictOption(BaseModel):
    """Conflict option schema."""

    type: str
    routine_element: str
    abnormal_element: str
    goal: str
    obstacle: str
    inescapable: str


class ExpandedInspiration(BaseModel):
    """Expanded inspiration schema."""

    analysis: dict
    conflict_options: List[ConflictOption]
    perspectives: List[str]
    core_questions: dict
    next_steps: dict


class InspirationDevelopResponse(BaseModel):
    """Inspiration development response."""

    inspiration: InspirationResponse
    expanded: ExpandedInspiration
