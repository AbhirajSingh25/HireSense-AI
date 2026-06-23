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