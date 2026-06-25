from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import InterviewSession

router = APIRouter()


@router.get("/recruiter-dashboard")
def recruiter_dashboard(
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

    for item in interviews:

        score = item.overall_score

        if score >= 90:
            status = "Elite Candidate"

        elif score >= 80:
            status = "Strong Match"

        elif score >= 70:
            status = "High Potential"

        else:
            status = "Needs Improvement"

        result.append({

            "id":
                item.id,

            "name":
                f"Candidate {item.id}",

            "role":
                item.role,

            "score":
                score,

            "status":
                status,
        })

    return result