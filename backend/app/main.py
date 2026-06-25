from fastapi import (
    FastAPI,
    Depends,
    Body,
)
from app.routes.analytics import (
    router as analytics_router
)
from app.routes.history import (
    router as history_router
)
from app.routes.recruiter import (
    router as recruiter_router
)
from app.routes.recruiter import (
    router as recruiter_router
)
from app.routes.dashboard import router as dashboard_router
from app.routes.resume import router as resume_router
from fastapi.middleware.cors import (
    CORSMiddleware,
)
from dotenv import load_dotenv

load_dotenv()
from sqlalchemy.orm import Session
from app.routes.hiring import (
    router as hiring_router
)
from pydantic import BaseModel

from app.database import (
    Base,
    engine,
    get_db,
)

from app.models import (
    User,
    InterviewSession,
)

from app.security import (
    hash_password,
    verify_password,
    create_access_token,
)

from app.routes.copilot import (
    router as copilot_router,
)

from app.routes.interview import (
    router as interview_router,
)

import random


app = FastAPI()


# =========================
# DATABASE
# =========================

Base.metadata.create_all(
    bind=engine
)


# =========================
# MIDDLEWARE
# =========================

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*"
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# ROUTERS
# =========================

app.include_router(
    copilot_router,
    prefix="/api",
    tags=["AI Copilot"],
)
app.include_router(
    resume_router,
    prefix="/api",
    tags=["Resume"]
)
app.include_router(
    interview_router,
    prefix="/api/interview",
    tags=["Interview"],
)

app.include_router(
    hiring_router
)
app.include_router(
    history_router
)
app.include_router(
    analytics_router
)
app.include_router(
    recruiter_router
)
app.include_router(
    recruiter_router
)
app.include_router(dashboard_router)
# =========================
# REQUEST MODELS
# =========================

class SignupRequest(BaseModel):

    username: str
    email: str
    password: str


class LoginRequest(BaseModel):

    email: str
    password: str


class InterviewRequest(BaseModel):

    role: str
    level: str


class EvaluationRequest(BaseModel):

    question: str
    answer: str


class NextQuestionRequest(BaseModel):

    role: str
    level: str
    previous_question: str
    previous_answer: str


class SaveInterviewRequest(BaseModel):

    role: str
    level: str
    questions: list
    answers: list
    evaluations: list
    final_report: dict


# =========================
# ROOT
# =========================

@app.get("/")
def home():

    return {
        "message": "HireSense AI Backend Running"
    }


# =========================
# AUTH
# =========================

@app.post("/auth/signup")
def signup(
    data: SignupRequest,
    db: Session = Depends(get_db),
):

    existing_user = db.query(User).filter(
        User.email == data.email
    ).first()

    if existing_user:

        return {
            "detail": "User already exists"
        }

    hashed_password = hash_password(
        data.password
    )

    user = User(
        username=data.username,
        email=data.email,
        password=hashed_password,
    )

    db.add(user)

    db.commit()

    db.refresh(user)

    token = create_access_token({
        "sub": user.email
    })

    return {
        "message": "Signup successful",
        "token": token,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
        }
    }


@app.post("/auth/login")
def login(
    data: LoginRequest,
    db: Session = Depends(get_db),
):

    user = db.query(User).filter(
        User.email == data.email
    ).first()

    if not user:

        return {
            "detail": "Invalid email"
        }

    valid_password = verify_password(
        data.password,
        user.password
    )

    if not valid_password:

        return {
            "detail": "Invalid password"
        }

    token = create_access_token({
        "sub": user.email
    })

    return {
        "message": "Login successful",
        "token": token,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
        }
    }

@app.get("/health")
def health():
    return {
        "status": "ok"
    }
# =========================
# INTERVIEW
# =========================

@app.post("/generate-questions")
def generate_questions(
    data: InterviewRequest
):

    questions = [

        f"Tell me about yourself as a {data.role}.",

        f"Why do you want this {data.role} role?",

        "Explain a challenging project you worked on.",

        "How do you solve difficult technical problems?",

        "Where do you see yourself in 5 years?",
    ]

    return {
        "questions": questions
    }





# =========================
# DASHBOARD
# =========================

@app.get("/dashboard")
def dashboard():

    return {
        "total_interviews": 24,
        "avg_confidence": 87,
        "communication": 90,
        "ai_rank": 12,
    }


@app.get("/leaderboard")
def leaderboard():

    return [

        {
            "name": "Alex",
            "score": 96,
        },

        {
            "name": "Sarah",
            "score": 94,
        },

        {
            "name": "John",
            "score": 91,
        },
    ]


# =========================
# SAVE INTERVIEW
# =========================




# =========================
# AI COPILOT
# =========================

