from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.dependencies import (
    get_db
)

from app.models.interview_model import (
    Interview
)


router = APIRouter(
    prefix="/interviews",
    tags=["Interviews"]
)


@router.get("/{user_id}")
def get_user_interviews(

    user_id: int,

    db: Session = Depends(get_db)
):

    interviews = db.query(
        Interview
    ).filter(

        Interview.user_id == user_id

    ).all()


    results = []


    for item in interviews:

        results.append({

            "id":
                item.id,

            "user_id":
                item.user_id,

            "transcript":
                item.transcript,

            "confidence_score":
                item.confidence_score,

            "communication_score":
                item.communication_score,

            "words_per_minute":
                item.words_per_minute,

            "eye_contact_score":
                item.eye_contact_score,

            "attention_status":
                item.attention_status,
        })


    return results