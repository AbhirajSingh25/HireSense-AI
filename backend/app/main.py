from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes.dashboard import router as dashboard_router
from app.api.routes.analytics import router as analytics_router
from sqlalchemy.orm import Session
from fastapi import Depends
from app.api.routes.leaderboard import router as leaderboard_router
from app.api.routes.dashboard import router as dashboard_router
from app.db.database import (
    Base,
    engine,
)

from app.db.dependencies import (
    get_db,
)

from app.models.interview_model import (
    Interview,
)

from app.api.routes.auth import (
    router as auth_router,
)

from app.api.routes.interview import (
    router as interview_router,
)


Base.metadata.create_all(
    bind=engine
)


app = FastAPI()
app.include_router(
    dashboard_router
)

app.include_router(
    dashboard_router
)

app.include_router(
    leaderboard_router
)

app.include_router(
    analytics_router
)
app.add_middleware(

    CORSMiddleware,

    allow_origins=[
        "*"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


app.include_router(
    auth_router
)

app.include_router(
    interview_router
)
from pydantic import BaseModel


class SpeechRequest(BaseModel):

    transcript: str


@app.post("/speech-analysis")
async def speech_analysis(
    data: SpeechRequest
):

    transcript = data.transcript


    words = transcript.split()

    total_words = len(words)


    filler_words = [

        "um",
        "uh",
        "like",
        "basically",
        "you know",
    ]


    filler_count = 0


    for filler in filler_words:

        filler_count += (
            transcript.lower().count(
                filler
            )
        )


    wpm = max(
        80,
        min(
            160,
            total_words // 2
        )
    )


    confidence_score = max(
        50,
        100 - (filler_count * 5)
    )


    if filler_count <= 3:

        feedback = (
            "Excellent speaking clarity with strong communication confidence."
        )

    elif filler_count <= 7:

        feedback = (
            "Good communication skills but reduce filler words for more polished answers."
        )

    else:

        feedback = (
            "Practice reducing filler words and improve pacing during technical explanations."
        )


    return {

        "total_words":
            total_words,

        "filler_words":
            filler_count,

        "words_per_minute":
            wpm,

        "confidence_score":
            confidence_score,

        "feedback":
            feedback,
    }

@app.get("/")
def root():

    return {
        "message":
            "HireSense Backend Running"
    }


@app.post("/save-interview")
def save_interview(

    data: dict,

    db: Session = Depends(get_db)
):

    interview = Interview(

        user_id=data.get(
            "user_id"
        ),

        transcript=data.get(
            "transcript",
            ""
        ),

        confidence_score=data.get(
            "confidence_score",
            0
        ),

        communication_score=data.get(
            "communication_score",
            0
        ),

        words_per_minute=data.get(
            "words_per_minute",
            0
        ),

        eye_contact_score=data.get(
            "eye_contact_score",
            0
        ),

        attention_status=data.get(
            "attention_status",
            "Focused"
        ),
    )

    db.add(interview)

    db.commit()

    db.refresh(interview)

    return {

        "message":
            "Interview saved",

        "id":
            interview.id,
    }