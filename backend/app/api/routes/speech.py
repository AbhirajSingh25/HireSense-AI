import os

from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import Depends

from sqlalchemy.orm import Session

from app.services.speech_service import analyze_speech

from app.db.dependencies import get_db

from app.models.interview_model import Interview

router = APIRouter(
    prefix="/speech",
    tags=["Speech Analysis"]
)

UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)


@router.post("/analyze")
async def analyze_audio(
    audio: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    file_path = os.path.join(
        UPLOAD_DIR,
        audio.filename
    )

    with open(file_path, "wb") as buffer:

        buffer.write(
            await audio.read()
        )

    analysis = analyze_speech(file_path)

    interview = Interview(
        transcript=analysis["transcript"],
        confidence_score=analysis[
            "confidence_score"
        ],
        communication_score=analysis[
            "communication_score"
        ],
        words_per_minute=analysis[
            "words_per_minute"
        ],
        eye_contact_score=0,
        attention_status="Pending",
    )

    db.add(interview)

    db.commit()

    db.refresh(interview)

    analysis["interview_id"] = (
        interview.id
    )

    return analysis