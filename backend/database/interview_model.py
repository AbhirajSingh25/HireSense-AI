from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text

from database.database import Base


class InterviewSession(Base):

    __tablename__ = "interview_sessions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    role = Column(
        String
    )

    level = Column(
        String
    )

    questions = Column(
        Text
    )

    answers = Column(
        Text
    )

    evaluations = Column(
        Text
    )

    final_report = Column(
        Text
    )

    created_at = Column(
        String
    )