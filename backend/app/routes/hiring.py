from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import InterviewSession

import json

router = APIRouter()


@router.get("/api/recruiter-dashboard")
def recruiter_dashboard(
    db: Session = Depends(get_db)
):

    interviews = (

        db.query(
            InterviewSession
        )

        .order_by(
            InterviewSession.id.desc()
        )

        .all()
    )

    candidates = []

    for interview in interviews:

        score = (
            interview.overall_score
            or 0
        )

        if score >= 85:

            status = (
                "Highly Recommended"
            )

        elif score >= 70:

            status = (
                "Recommended"
            )

        else:

            status = (
                "Needs Improvement"
            )

        candidates.append({

            "name":
                f"Candidate {interview.id}",

            "role":
                interview.role,

            "score":
                score,

            "status":
                status,
        })

    return candidates