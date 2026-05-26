from fastapi import (
    APIRouter,
    Depends,
)

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.models.interview_model import Interview


router = APIRouter(
    prefix="/interviews",
    tags=["Interviews"]
)


@router.post("/save")
def save_interview(

    data: dict,

    db: Session = Depends(get_db)
):

    new_interview = Interview(

        user_id=data.get(
            "user_id"
        ),

        transcript=data.get(
            "transcript"
        ),

        confidence_score=data.get(
            "confidence_score"
        ),

        communication_score=data.get(
            "communication_score"
        ),

        words_per_minute=data.get(
            "words_per_minute"
        ),

        eye_contact_score=data.get(
            "eye_contact_score"
        ),

        attention_status=data.get(
            "attention_status"
        ),
    )

    db.add(
        new_interview
    )

    db.commit()

    db.refresh(
        new_interview
    )

    return {
        "message":
            "Interview saved"
    }


@router.get("/{user_id}")
def get_user_interviews(

    user_id: int,

    db: Session = Depends(get_db)
):

    interviews = (

        db.query(Interview)

        .filter(
            Interview.user_id == user_id
        )

        .all()
    )


    results = []


    for item in interviews:

        results.append({

            "id":
                item.id,

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