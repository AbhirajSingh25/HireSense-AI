from fastapi import (
    FastAPI,
    Depends,
    Body,
)
from app.routes.resume import router as resume_router
from fastapi.middleware.cors import (
    CORSMiddleware,
)
from dotenv import load_dotenv

load_dotenv()
from sqlalchemy.orm import Session

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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
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


@app.post("/evaluate-answer")
def evaluate_answer(
    data: EvaluationRequest
):

    score = random.randint(75, 95)

    return {
        "score": score,
        "confidence": random.randint(80, 95),
        "communication": random.randint(78, 96),
        "technical": random.randint(76, 97),
        "feedback":
            "Strong response with good communication and technical clarity.",
    }


@app.post("/followup-question")
def next_question(
    data: NextQuestionRequest
):

    next_questions = [

        "Explain your biggest strength.",

        "Describe a time you handled pressure.",

        "How do you approach debugging?",

        "Tell me about leadership experience.",

        "Explain a difficult technical decision.",
    ]

    return {
        "question": random.choice(next_questions)
    }


# =========================
# REPORTS
# =========================

@app.post("/generate-report")
def generate_report():

    return {
        "overall_score": 88,
        "communication": 90,
        "technical": 85,
        "confidence": 87,
        "summary": "Excellent interview performance.",
    }


@app.get("/final-report")
def final_report():

    return {
        "overall_score": 88,
        "communication": 90,
        "technical": 85,
        "confidence": 87,
        "summary": "Excellent interview performance.",
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

@app.post("/save-interview")
def save_interview(
    data: SaveInterviewRequest,
    db: Session = Depends(get_db),
):

    session = InterviewSession(

        role=data.role,

        level=data.level,

        question=data.questions[0]
        if data.questions else "",

        answer=data.answers[0]
        if data.answers else "",

        feedback=data.evaluations[0].get(
            "feedback",
            "",
        ) if data.evaluations else "",

        confidence=data.evaluations[0].get(
            "confidence",
            0,
        ) if data.evaluations else 0,

        communication=data.evaluations[0].get(
            "communication",
            0,
        ) if data.evaluations else 0,

        technical=data.evaluations[0].get(
            "technical",
            0,
        ) if data.evaluations else 0,
    )

    db.add(session)

    db.commit()

    db.refresh(session)

    return {
        "message": "Interview saved successfully",
        "session_id": session.id,
    }


@app.get("/interview-history")
def get_interview_history(
    db: Session = Depends(get_db),
):

    interviews = db.query(
        InterviewSession
    ).all()

    return interviews


# =========================
# AI COPILOT
# =========================

@app.post("/ai-copilot")
def ai_copilot(
    data: dict = Body(...)
):

    message = data.get(
        "message",
        ""
    ).lower()


    if (
        "hi" in message
        or "hello" in message
        or "hey" in message
    ):

        reply = (
            "Hello. I am your AI Interview Copilot. "
            "Ask me about technical interviews, "
            "system design, behavioral preparation, "
            "resume reviews, or recruiter expectations."
        )


    elif "scalability" in message:

        reply = (
            "Focus on load balancing, "
            "caching, horizontal scaling, "
            "database optimization, "
            "and architecture tradeoffs."
        )


    elif "system design" in message:

        reply = (
            "Discuss scalability, APIs, "
            "microservices, databases, "
            "caching, and fault tolerance."
        )


    elif "behavioral" in message:

        reply = (
            "Use the STAR method: "
            "Situation, Task, Action, Result."
        )


    elif "resume" in message:

        reply = (
            "Focus on measurable impact, "
            "technical depth, "
            "projects, and achievements."
        )


    else:

        reply = (
            "AI Copilot recommends focusing on "
            "clear communication, "
            "technical reasoning, "
            "and structured problem solving."
        )


    return {
        "reply": reply
    }