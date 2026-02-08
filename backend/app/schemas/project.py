"""Project schemas."""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from uuid import UUID


class ProjectBase(BaseModel):
    """Base project schema."""

    title: str = Field(..., min_length=1, max_length=200)
    genre: Optional[str] = Field(None, max_length=50)
    target_word_count: Optional[int] = Field(None, gt=0)
    structure_type: Optional[str] = Field(None, max_length=50)


class ProjectCreate(ProjectBase):
    """Project creation schema."""

    pass


class ProjectUpdate(BaseModel):
    """Project update schema."""

    title: Optional[str] = Field(None, min_length=1, max_length=200)
    genre: Optional[str] = Field(None, max_length=50)
    target_word_count: Optional[int] = Field(None, gt=0)
    status: Optional[str] = Field(None, pattern="^(planning|writing|editing|completed)$")
    structure_type: Optional[str] = Field(None, max_length=50)
    settings: Optional[dict] = None


class ProjectInDB(ProjectBase):
    """Project schema as stored in database."""

    id: UUID
    user_id: UUID
    current_word_count: int = 0
    status: str = "planning"
    created_at: datetime
    updated_at: datetime
    settings: Optional[dict] = None

    class Config:
        from_attributes = True


class ProjectResponse(ProjectInDB):
    """Project response schema."""

    pass


class ProjectOverview(BaseModel):
    """Project overview with statistics."""

    project: ProjectResponse
    statistics: dict
    recent_activity: list
