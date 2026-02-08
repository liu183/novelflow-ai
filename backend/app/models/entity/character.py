"""Character entity model."""
from datetime import datetime
from typing import Optional
from sqlalchemy import Column, String, ForeignKey, DateTime, Enum, Integer
from sqlalchemy.dialects.postgresql import UUID, JSONB, ARRAY
from sqlalchemy.orm import relationship
import uuid
from app.models.entity.base import Base


class Character(Base):
    """Character model."""

    __tablename__ = "characters"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=False)
    name = Column(String(100), nullable=False)
    role_type = Column(
        Enum(
            "protagonist",
            "antagonist",
            "supporting",
            "minor",
            name="character_role_type",
        ),
        default="supporting",
    )
    profile = Column(JSONB)  # Complete character profile (7 elements, etc.)
    relationships = Column(JSONB)  # Relationships with other characters
    arc_data = Column(JSONB)  # Character arc data
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    # Relationships
    project = relationship("Project", back_populates="characters")

    def to_dict(self) -> dict:
        """Convert to dictionary."""
        return {
            "id": str(self.id),
            "project_id": str(self.project_id),
            "name": self.name,
            "role_type": self.role_type,
            "profile": self.profile,
            "relationships": self.relationships,
            "arc_data": self.arc_data,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
