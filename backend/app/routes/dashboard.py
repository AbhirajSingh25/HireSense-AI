from fastapi import APIRouter
from sqlalchemy.orm import Session
from fastapi import Depends

from app.database import get_db
from app.models import InterviewSession

router = APIRouter()

@router.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db)
):

    interviews = db.query(
        InterviewSession
    ).all()

    total = len(interviews)

    if total == 0:

        return {

            "total_interviews": 0,

            "avg_confidence": 0,

            "communication": 0,

            "ai_rank": 0,
        }

    return {

        "total_interviews":
            total,

        "avg_confidence":
            88,

        "communication":
            91,

        "ai_rank":
            max(
                1,
                100-total
            ),
    }
@router.get("/achievements")
def achievements(
    db: Session = Depends(get_db)
):

    interviews = (
        db.query(
            InterviewSession
        ).all()
    )

    total = len(interviews)

    best_score = max(
        [
            i.overall_score or 0
            for i in interviews
        ],
        default=0
    )

    achievements = []

    if total >= 1:

        achievements.append({
            "title": "First Interview",
            "unlocked": True
        })

    if total >= 5:

        achievements.append({
            "title": "Practice Warrior",
            "unlocked": True
        })

    if best_score >= 80:

        achievements.append({
            "title": "Strong Candidate",
            "unlocked": True
        })

    if best_score >= 90:

        achievements.append({
            "title": "Interview Master",
            "unlocked": True
        })

    return achievements