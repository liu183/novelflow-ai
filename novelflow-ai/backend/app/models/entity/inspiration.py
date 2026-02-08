"""Inspiration entity model."""
from datetime import datetime
from typing import List, Optional
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Enum, Text
from sqlalchemy.dialects.postgresql import UUID, JSONB, ARRAY
from sqlalchemy.orm import relationship
import uuid
from app.models.entity.base import Base


class Inspiration(Base):
    """Inspiration model."""

    __tablename__ = "inspirations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    content = Column(Text, nullable=False)
    category = Column(
        Enum(
            "has_head_tail",
            "has_tail_only",
            "no_head_no_tail",
            name="inspiration_category",
        ),
        default="no_head_no_tail",
    )
    tags = Column(ARRAY(String))
    status = Column(
        Enum("raw", "developed", "used", name="inspiration_status"),
        default="raw",
    )
    created_at = Column(DateTime, default=datetime.utcnow)
    metadata = Column(JSONB)  # Inspiration-related metadata

    # Relationships
    project = relationship("Project", back_populates="inspirations")

    def to_dict(self) -> dict:
        """Convert to dictionary."""
        return {
            "id": str(self.id),
            "project_id": str(self.project_id),
            "user_id": str(self.user_id),
            "content": self.content,
            "category": self.category,
            "tags": self.tags or [],
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "metadata": self.metadata,
        }
