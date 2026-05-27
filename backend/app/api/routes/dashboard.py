from fastapi import APIRouter

from sqlalchemy.orm import Session

from app.db.database import SessionLocal

from app.models.interview_model import Interview


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/{user_id}")
def get_dashboard_stats(
    user_id: int
):

    db: Session = SessionLocal()

    interviews = (

        db.query(Interview)

        .filter(
            Interview.user_id == user_id
        )

        .all()
    )


    total_interviews = len(interviews)


    if total_interviews == 0:

        return {

            "total_interviews": 0,

            "average_confidence": 0,

            "average_communication": 0,

            "latest_score": 0,
        }


    average_confidence = sum(

        i.confidence_score
        for i in interviews

    ) / total_interviews


    average_communication = sum(

        i.communication_score
        for i in interviews

    ) / total_interviews


    latest_score = (
        interviews[-1]
        .communication_score
    )


    return {

        "total_interviews":
            total_interviews,

        "average_confidence":
            round(
                average_confidence,
                2
            ),

        "average_communication":
            round(
                average_communication,
                2
            ),

        "latest_score":
            latest_score,
    }