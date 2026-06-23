from fastapi import APIRouter
from sqlalchemy.orm import Session
from fastapi import Depends

from app.database import get_db
from app.models import InterviewSession

router = APIRouter()

@router.get("/interview-history")
def get_history(
    db: Session = Depends(get_db)
):

    interviews = db.query(
        InterviewSession
    ).order_by(
        InterviewSession.id.desc()
    ).all()

    return interviews