"""Chapter entity model."""
from datetime import datetime
from typing import Optional
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Enum
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
import uuid
from app.models.entity.base import Base


class Chapter(Base):
    """Chapter model."""

    __tablename__ = "chapters"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=False)
    chapter_number = Column(Integer, nullable=False)
    title = Column(String(200))
    synopsis = Column(Text)
    word_count = Column(Integer, default=0)
    status = Column(
        Enum("planned", "drafting", "completed", name="chapter_status"),
        default="planned",
    )
    target_word_count = Column(Integer)
    act_number = Column(Integer)  # Which act (1, 2, or 3)
    sequence_in_act = Column(Integer)  # Sequence within the act
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )
    blueprint = Column(JSONB)  # Scene blueprint

    # Relationships
    project = relationship("Project", back_populates="chapters")
    scenes = relationship("Scene", back_populates="chapter", cascade="all, delete-orphan")

    def to_dict(self) -> dict:
        """Convert to dictionary."""
        return {
            "id": str(self.id),
            "project_id": str(self.project_id),
            "chapter_number": self.chapter_number,
            "title": self.title,
            "synopsis": self.synopsis,
            "word_count": self.word_count,
            "status": self.status,
            "target_word_count": self.target_word_count,
            "act_number": self.act_number,
            "sequence_in_act": self.sequence_in_act,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "blueprint": self.blueprint,
        }
