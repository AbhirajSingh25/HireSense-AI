from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime,
)

from datetime import datetime

from app.database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    username = Column(
        String,
        unique=True
    )

    email = Column(
        String,
        unique=True
    )

    password = Column(
        String
    )


class InterviewSession(Base):

    __tablename__ = "interview_sessions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    role = Column(String)

    level = Column(String)

    questions = Column(Text)

    answers = Column(Text)

    evaluations = Column(Text)

    final_report = Column(Text)

    overall_score = Column(Integer)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )