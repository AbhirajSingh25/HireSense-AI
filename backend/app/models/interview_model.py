from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import ForeignKey

from app.db.database import Base


class Interview(Base):

    __tablename__ = "interviews"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    transcript = Column(
        String,
        nullable=False
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

    attention_status = Column(
        String,
        default="Focused"
    )