from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database import get_db
from app.models import InterviewSession

import json

router = APIRouter()


@router.get("/interview-history")
def get_history(
    db: Session = Depends(get_db)
):

    interviews = (
        db.query(InterviewSession)
        .order_by(
            InterviewSession.id.desc()
        )
        .all()
    )

    results = []

    for interview in interviews:

        communication = 0
        technical = 0
        confidence = 0

        try:

            evaluations = json.loads(
                interview.evaluations
            )

            if (
                evaluations
                and len(evaluations) > 0
            ):

                latest = evaluations[-1]

                communication = latest.get(
                    "communication",
                    0
                )

                technical = latest.get(
                    "technical",
                    0
                )

                confidence = latest.get(
                    "confidence",
                    0
                )

        except Exception:
            pass

        results.append({

            "id":
                interview.id,

            "role":
                interview.role,

            "level":
                interview.level,

            "overall_score":
                interview.overall_score,

            "communication":
                communication,

            "technical":
                technical,

            "confidence":
                confidence,

            "created_at":
                interview.created_at,

            "final_report":
                interview.final_report,
        })

    return results