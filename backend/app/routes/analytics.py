# backend/app/routes/analytics.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import InterviewSession

router = APIRouter()


@router.get("/analytics")
def analytics(
    db: Session = Depends(get_db)
):

    sessions = (

        db.query(
            InterviewSession
        )

        .order_by(
            InterviewSession.id.asc()
        )

        .all()
    )

    return [

        {
            "id":
                item.id,

            "score":
                item.overall_score,

            "role":
                item.role,

            "level":
                item.level,

            "created_at":
                str(item.created_at)
        }

        for item in sessions
    ]