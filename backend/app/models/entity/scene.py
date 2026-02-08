"""Scene entity model."""
from datetime import datetime
from typing import Optional
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB, ARRAY
from sqlalchemy.orm import relationship
import uuid
from app.models.entity.base import Base


class Scene(Base):
    """Scene model."""

    __tablename__ = "scenes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    chapter_id = Column(UUID(as_uuid=True), ForeignKey("chapters.id"), nullable=False)
    scene_number = Column(Integer, nullable=False)
    title = Column(String(200))
    content = Column(Text)
    word_count = Column(Integer)
    beats = Column(JSONB)  # Beat data
    location = Column(String(100))
    characters = Column(ARRAY(UUID(as_uuid=True)))  # Characters involved
    mood = Column(String(50))  # Mood/tone of the scene
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    # Relationships
    chapter = relationship("Chapter", back_populates="scenes")

    def to_dict(self) -> dict:
        """Convert to dictionary."""
        return {
            "id": str(self.id),
            "chapter_id": str(self.chapter_id),
            "scene_number": self.scene_number,
            "title": self.title,
            "content": self.content,
            "word_count": self.word_count,
            "beats": self.beats,
            "location": self.location,
            "characters": [str(c) for c in self.characters] if self.characters else [],
            "mood": self.mood,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
