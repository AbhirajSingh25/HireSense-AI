from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Text,
    DateTime,
)

from sqlalchemy.sql import func

from .database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    username = Column(
        String,
        nullable=False
    )

    email = Column(
        String,
        unique=True,
        nullable=False
    )

    password = Column(
        String,
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )


class InterviewSession(Base):

    __tablename__ = "interview_sessions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        nullable=False
    )

    role = Column(
        String,
        default="General"
    )

    transcript = Column(
        Text
    )

    confidence_score = Column(
        Float,
        default=0
    )

    communication_score = Column(
        Float,
        default=0
    )

    words_per_minute = Column(
        Float,
        default=0
    )

    eye_contact_score = Column(
        Float,
        default=0
    )

    technical_score = Column(
        Float,
        default=0
    )

    attention_status = Column(
        String,
        default="Focused"
    )

    ai_feedback = Column(
        Text,
        default=""
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )