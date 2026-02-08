"""Project entity model."""
from datetime import datetime
from typing import Optional
from sqlalchemy import Column, Integer, String, DateTime, Enum, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
import uuid
from app.models.entity.base import Base


class Project(Base):
    """Project model."""

    __tablename__ = "projects"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    title = Column(String(200), nullable=False)
    genre = Column(String(50))
    target_word_count = Column(Integer)
    current_word_count = Column(Integer, default=0)
    status = Column(
        Enum("planning", "writing", "editing", "completed", name="project_status"),
        default="planning",
    )
    structure_type = Column(String(50))  # three_act, hero_journey, etc.
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    settings = Column(JSONB)  # Project-specific settings

    # Relationships
    user = relationship("User", back_populates="projects")
    inspirations = relationship("Inspiration", back_populates="project", cascade="all, delete-orphan")
    characters = relationship("Character", back_populates="project", cascade="all, delete-orphan")
    chapters = relationship("Chapter", back_populates="project", cascade="all, delete-orphan")
    conversations = relationship("Conversation", back_populates="project", cascade="all, delete-orphan")

    def to_dict(self) -> dict:
        """Convert to dictionary."""
        return {
            "id": str(self.id),
            "user_id": str(self.user_id),
            "title": self.title,
            "genre": self.genre,
            "target_word_count": self.target_word_count,
            "current_word_count": self.current_word_count,
            "status": self.status,
            "structure_type": self.structure_type,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "settings": self.settings,
        }
