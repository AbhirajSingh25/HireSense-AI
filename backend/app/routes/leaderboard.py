from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import InterviewSession

router = APIRouter()


@router.get("/leaderboard")
def leaderboard(
    db: Session = Depends(get_db)
):

    interviews = (

        db.query(
            InterviewSession
        )

        .order_by(
            InterviewSession.overall_score.desc()
        )

        .all()
    )

    result = []

    rank = 1

    for item in interviews:

        result.append({

            "rank":
                rank,

            "name":
                f"Candidate {item.id}",

            "role":
                item.role,

            "score":
                item.overall_score,
        })

        rank += 1

    return result