from fastapi import (
    APIRouter,
    Depends,
)

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.models.interview_model import Interview


router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get("/{user_id}")
def get_analytics(

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


    for index, item in enumerate(interviews):

        results.append({

            "session":
                f"Interview {index + 1}",

            "confidence":
                item.confidence_score,

            "communication":
                item.communication_score,

            "eye_contact":
                item.eye_contact_score,
        })


    return results