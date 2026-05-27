from fastapi import APIRouter

from sqlalchemy.orm import Session

from sqlalchemy import func

from app.db.database import SessionLocal

from app.models.interview_model import Interview

from app.models.user_model import User


router = APIRouter(
    prefix="/leaderboard",
    tags=["Leaderboard"]
)


@router.get("/")
def leaderboard():

    db: Session = SessionLocal()


    results = (

        db.query(

            User.username,

            func.avg(
                Interview.confidence_score
            ).label(
                "avg_confidence"
            ),

            func.avg(
                Interview.communication_score
            ).label(
                "avg_communication"
            ),

            func.count(
                Interview.id
            ).label(
                "total_interviews"
            ),
        )

        .join(
            Interview,
            Interview.user_id == User.id
        )

        .group_by(
            User.username
        )

        .order_by(

            func.avg(
                Interview.communication_score
            ).desc()
        )

        .all()
    )


    return [

        {

            "username":
                item.username,

            "avg_confidence":
                round(
                    item.avg_confidence,
                    1
                ),

            "avg_communication":
                round(
                    item.avg_communication,
                    1
                ),

            "total_interviews":
                item.total_interviews,
        }

        for item in results
    ]