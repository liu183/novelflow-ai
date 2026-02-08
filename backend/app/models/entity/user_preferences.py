"""User preferences entity model."""
from datetime import datetime
from typing import Optional
from sqlalchemy import Column, String, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB, ARRAY
from sqlalchemy.orm import relationship
import uuid
from app.models.entity.base import Base


class UserPreferences(Base):
    """User preferences model."""

    __tablename__ = "user_preferences"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, unique=True)
    writing_style = Column(JSONB)  # Writing style preferences
    ai_model_preference = Column(String(50))  # Preferred AI model
    favorite_templates = Column(ARRAY(UUID(as_uuid=True)))  # Favorite template IDs
    custom_commands = Column(JSONB)  # Custom command definitions
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    # Relationships
    user = relationship("User", back_populates="user_preferences")

    def to_dict(self) -> dict:
        """Convert to dictionary."""
        return {
            "id": str(self.id),
            "user_id": str(self.user_id),
            "writing_style": self.writing_style,
            "ai_model_preference": self.ai_model_preference,
            "favorite_templates": [str(t) for t in self.favorite_templates] if self.favorite_templates else [],
            "custom_commands": self.custom_commands,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
