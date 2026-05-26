from fastapi import (
    APIRouter,
    Depends,
)

from sqlalchemy.orm import Session

from sqlalchemy import func

from app.db.dependencies import get_db

from app.models.interview_model import Interview


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/{user_id}")
def get_dashboard_stats(

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


    total_interviews = len(
        interviews
    )


    avg_confidence = 0
    avg_communication = 0
    avg_eye_contact = 0


    if total_interviews > 0:

        avg_confidence = round(

            sum(
                i.confidence_score
                for i in interviews
            )

            / total_interviews,

            1
        )


        avg_communication = round(

            sum(
                i.communication_score
                for i in interviews
            )

            / total_interviews,

            1
        )


        avg_eye_contact = round(

            sum(
                i.eye_contact_score
                for i in interviews
            )

            / total_interviews,

            1
        )


    return {

        "total_interviews":
            total_interviews,

        "avg_confidence":
            avg_confidence,

        "avg_communication":
            avg_communication,

        "avg_eye_contact":
            avg_eye_contact,
    }