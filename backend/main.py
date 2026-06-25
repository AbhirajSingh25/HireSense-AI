import json
import random

from datetime import datetime

from fastapi import (
    FastAPI,
    Depends,
    HTTPException
)

from fastapi.middleware.cors import (
    CORSMiddleware
)

from sqlalchemy.orm import Session

from pydantic import BaseModel

from database.database import (
    Base,
    engine,
    get_db
)

from database.models import (
    User,
    InterviewSession
)

app = FastAPI()

Base.metadata.create_all(
    bind=engine
)

app.add_middleware(

    CORSMiddleware,

    allow_origins=[

        "http://localhost:5173",

        "https://hire-sense-ai-gamma.vercel.app",

        "*"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
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


class FollowupRequest(BaseModel):

    previous_question: str

    answer: str

    role: str

    level: str


class SaveInterviewRequest(BaseModel):

    role: str

    level: str

    questions: list = []

    answers: list = []

    evaluations: list = []

    final_report: dict = {}


# =========================
# ROOT
# =========================

@app.get("/")
def home():

    return {

        "message":
        "HireSense AI Backend Running"
    }


# =========================
# AUTH
# =========================

@app.post("/auth/signup")
def signup(

    data: SignupRequest,

    db: Session = Depends(get_db)
):

    existing = db.query(User).filter(
        User.email == data.email
    ).first()

    if existing:

        raise HTTPException(

            status_code=400,

            detail="User already exists"
        )

    user = User(

        username=data.username,

        email=data.email,

        password=data.password
    )

    db.add(user)

    db.commit()

    db.refresh(user)

    return {

        "message":
        "Signup successful",

        "token":
        "fake-jwt-token",

        "user": {

            "id": user.id,

            "username":
            user.username,

            "email":
            user.email
        }
    }


@app.post("/auth/login")
def login(

    data: LoginRequest,

    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == data.email
    ).first()

    if not user:

        raise HTTPException(

            status_code=404,

            detail="Invalid email"
        )

    if user.password != data.password:

        raise HTTPException(

            status_code=401,

            detail="Invalid password"
        )

    return {

        "message":
        "Login successful",

        "token":
        "fake-jwt-token",

        "user": {

            "id": user.id,

            "username":
            user.username,

            "email":
            user.email
        }
    }


# =========================
# QUESTION GENERATION
# =========================

@app.get("/generate-questions")
def generate_questions(

    role: str,

    level: str
):

    questions = [

        f"Tell me about yourself as a {role}.",

        f"Why are you interested in {role}?",

        "Explain a difficult project you worked on.",

        "What are your biggest strengths?",

        "How do you solve technical problems?"
    ]

    return {

        "questions":
        questions
    }


@app.post("/followup-question")
def followup_question(

    data: FollowupRequest
):

    followups = [

        "Can you explain that in more detail?",

        "What challenges did you face?",

        "How would you improve that solution?",

        "What did you learn from that experience?",

        "How did your team respond?"
    ]

    return {

        "question":
        random.choice(followups)
    }


# =========================
# AI EVALUATION
# =========================

@app.post("/evaluate-answer")
def evaluate_answer(

    data: EvaluationRequest
):

    confidence = random.randint(75, 95)

    communication = random.randint(75, 95)

    technical = random.randint(70, 95)

    overall = round(

        (
            confidence
            +
            communication
            +
            technical
        ) / 3
    )

    return {

        "overall_score":
        overall,

        "confidence":
        confidence,

        "communication":
        communication,

        "technical":
        technical,

        "feedback":
        "Strong answer with good communication and technical clarity."
    }


# =========================
# REPORT GENERATION
# =========================

@app.post("/generate-report")
def generate_report():

    return {

        "overall_score": 88,

        "communication": 90,

        "technical": 85,

        "confidence": 87,

        "summary":
        "Excellent interview performance."
    }


@app.get("/final-report")
def final_report():

    return {

        "overall_score": 88,

        "communication": 90,

        "technical": 85,

        "confidence": 87
    }


# =========================
# SAVE INTERVIEW
# =========================

@app.post("/save-interview")
def save_interview(

    data: SaveInterviewRequest,

    db: Session = Depends(get_db)
):

    try:

        session = InterviewSession(

            role=data.role,

            level=data.level,

            questions=json.dumps(
                data.questions
            ),

            answers=json.dumps(
                data.answers
            ),

            evaluations=json.dumps(
                data.evaluations
            ),

            final_report=json.dumps(
                data.final_report
            ),

            created_at=str(
                datetime.utcnow()
            )
        )

        db.add(session)

        db.commit()

        db.refresh(session)

        return {

            "success": True,

            "message":
            "Interview saved successfully"
        }

    except Exception as error:

        return {

            "success": False,

            "error":
            str(error)
        }


# =========================
# INTERVIEW HISTORY
# =========================

@app.get("/interview-history")
def interview_history(

    db: Session = Depends(get_db)
):

    sessions = db.query(
        InterviewSession
    ).all()

    results = []

    for session in sessions:

        results.append({

            "id":
            session.id,

            "role":
            session.role,

            "level":
            session.level,

            "questions":
            json.loads(session.questions),

            "answers":
            json.loads(session.answers),

            "evaluations":
            json.loads(session.evaluations),

            "final_report":
            json.loads(session.final_report),

            "created_at":
            session.created_at
        })

    return results


# =========================
# LEADERBOARD
# =========================

@app.get("/leaderboard")
def leaderboard(

    db: Session = Depends(get_db)
):

    sessions = db.query(
        InterviewSession
    ).all()

    leaderboard_data = []

    for session in sessions:

        try:

            report = json.loads(
                session.final_report
            )

            score = (

                report.get(
                    "confidence",
                    0
                )

                +

                report.get(
                    "communication",
                    0
                )

                +

                report.get(
                    "technical",
                    0
                )

            ) / 3

            leaderboard_data.append({

                "role":
                session.role,

                "score":
                round(score, 2),

                "created_at":
                session.created_at
            })

        except:

            pass

    leaderboard_data.sort(

        key=lambda x:
        x["score"],

        reverse=True
    )

    return leaderboard_data[:10]


# =========================
# SPEECH ANALYSIS
# =========================

@app.post("/analyze-speech")
def analyze_speech(

    data: dict
):

    transcript = data.get(
        "transcript",
        ""
    )

    filler_words = [

        "um",
        "uh",
        "like",
        "basically"
    ]

    filler_count = sum(

        transcript.lower().count(word)

        for word in filler_words
    )

    confidence = max(

        50,

        100 - filler_count * 5
    )

    return {

        "confidence":
        confidence,

        "clarity":
        88,

        "filler_words":
        filler_count,

        "pace":
        "Good"
    }


# =========================
# VISION ANALYSIS
# =========================

@app.post("/analyze-vision")
def analyze_vision():

    return {

        "eye_contact": 87,

        "posture": 85,

        "engagement": 90
    }


# =========================
# DASHBOARD
# =========================

@app.get("/dashboard")
def dashboard():

    return {

        "total_interviews": 24,

        "confidence": 87,

        "communication": 90,

        "technical": 85
    }
for route in app.routes:
    print(route.path)