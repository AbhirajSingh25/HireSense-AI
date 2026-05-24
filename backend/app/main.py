from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session
from fastapi import Depends

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