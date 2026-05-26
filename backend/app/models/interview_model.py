from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    ForeignKey,
)

from sqlalchemy.orm import relationship

from app.db.database import Base


class Interview(Base):

    __tablename__ = "interviews"


    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    transcript = Column(
        String,
        nullable=True,
    )

    confidence_score = Column(
        Float,
        default=0,
    )

    communication_score = Column(
        Float,
        default=0,
    )

    words_per_minute = Column(
        Float,
        default=0,
    )

    eye_contact_score = Column(
        Float,
        default=0,
    )

    attention_status = Column(
        String,
        default="Focused",
    )


    user = relationship(
        "User",
        back_populates="interviews"
    )