from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float

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
        unique=True
    )

    email = Column(
        String,
        unique=True
    )

    password = Column(
        String
    )


class Interview(Base):

    __tablename__ = "interviews"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer
    )

    transcript = Column(
        String
    )

    confidence_score = Column(
        Float
    )

    communication_score = Column(
        Float
    )

    words_per_minute = Column(
        Float
    )

    eye_contact_score = Column(
        Float
    )

    attention_status = Column(
        String
    )