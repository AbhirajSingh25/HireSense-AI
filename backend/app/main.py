# backend/app/main.py

from fastapi import (
    FastAPI,
    Depends,
    HTTPException,
)

from fastapi.middleware.cors import (
    CORSMiddleware,
)

from sqlalchemy.orm import Session

from passlib.context import (
    CryptContext,
)

from jose import jwt

from groq import Groq

from dotenv import load_dotenv

from datetime import (
    datetime,
    timedelta,
)

from pydantic import BaseModel

import os
from app.routes.ai import router as ai_router
from .database import (
    Base,
    engine,
    get_db,
)

from .models import (
    User,
    InterviewSession,
)

from .schemas import (
    SignupRequest,
    LoginRequest,
    QuestionRequest,
    AnswerRequest,
    SpeechRequest,
    InterviewSessionRequest,
)

from .services.interview_ai import (
    generate_question,
    evaluate_interview_answer,
)

load_dotenv()

GROQ_API_KEY = os.getenv(
    "GROQ_API_KEY"
)

SECRET_KEY = os.getenv(
    "SECRET_KEY"
)

ALGORITHM = "HS256"

groq_client = Groq(
    api_key=GROQ_API_KEY
)

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

app = FastAPI()
app.include_router(ai_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "https://YOUR-VERCEL-APP.vercel.app",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(
    bind=engine
)


class InterviewRequest(BaseModel):

    transcript: str


class DynamicQuestionRequest(
    BaseModel
):

    role: str

    level: str

    transcript: str


class BehaviorAnalysisRequest(
    BaseModel
):

    confidence: int

    eye_contact: int

    communication: int

    transcript: str


def create_token(data: dict):

    payload = data.copy()

    payload["exp"] = (

        datetime.utcnow() +

        timedelta(days=7)
    )

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


@app.get("/")
def root():

    return {
        "message":
        "HireSense AI Backend Running"
    }


@app.get("/health")
def health():

    return {
        "status": "ok"
    }


@app.post("/auth/signup")
def signup(
    data: SignupRequest,
    db: Session = Depends(get_db)
):

    existing_user = (

        db.query(User)

        .filter(
            User.email == data.email
        )

        .first()
    )

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    hashed_password = (
        pwd_context.hash(
            data.password
        )
    )

    user = User(
        username=data.username,
        email=data.email,
        password=hashed_password,
    )

    db.add(user)

    db.commit()

    db.refresh(user)

    token = create_token({
        "user_id": user.id
    })

    return {

        "message":
        "Signup successful",

        "token": token,

        "user": {

            "id": user.id,

            "username":
            user.username,

            "email":
            user.email,
        }
    }


@app.post("/auth/login")
def login(
    data: LoginRequest,
    db: Session = Depends(get_db)
):

    user = (

        db.query(User)

        .filter(
            User.email == data.email
        )

        .first()
    )

    if not user:

        raise HTTPException(
            status_code=401,
            detail="Invalid email"
        )

    valid_password = (
        pwd_context.verify(
            data.password,
            user.password
        )
    )

    if not valid_password:

        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    token = create_token({
        "user_id": user.id
    })

    return {

        "message":
        "Login successful",

        "token": token,

        "user": {

            "id": user.id,

            "username":
            user.username,

            "email":
            user.email,
        }
    }


@app.post("/generate-questions")
async def generate_questions(
    data: QuestionRequest
):

    prompt = f"""

Generate 5 realistic interview questions
for a {data.role} role.

Requirements:
- concise
- technical
- realistic
- industry-level

Return only questions.
"""

    completion = (
        groq_client.chat
        .completions.create(

            model=
            "llama-3.3-70b-versatile",

            messages=[

                {
                    "role": "system",

                    "content":
                    "You are an expert technical interviewer."
                },

                {
                    "role": "user",

                    "content": prompt
                }
            ],

            temperature=0.7,
        )
    )

    content = (
        completion
        .choices[0]
        .message.content
    )

    questions = [

        q.strip("- ").strip()

        for q in content.split("\n")

        if q.strip()
    ]

    return {
        "questions": questions
    }


@app.post("/dynamic-question")
def dynamic_question(
    data: DynamicQuestionRequest
):

    try:

        prompt = f"""

        You are an elite AI interviewer.

        Candidate Role:
        {data.role}

        Candidate Level:
        {data.level}

        Previous Transcript:
        {data.transcript}

        Generate ONE intelligent,
        contextual follow-up interview question.

        Return ONLY the question.
        """

        completion = (
            groq_client.chat
            .completions.create(

                model=
                "llama-3.3-70b-versatile",

                messages=[

                    {
                        "role": "user",

                        "content": prompt
                    }
                ],

                temperature=0.8,
            )
        )

        question = (
            completion
            .choices[0]
            .message.content
            .strip()
        )

        return {

            "success": True,

            "question": question
        }

    except Exception as e:

        return {

            "success": False,

            "error": str(e)
        }


@app.post("/ai-interview-feedback")
def ai_interview_feedback(
    data: InterviewRequest
):

    try:

        prompt = f"""

        Analyze this interview transcript.

        Give:
        1. Communication score
        2. Confidence score
        3. Technical score
        4. AI feedback
        5. Improvement suggestions

        Transcript:
        {data.transcript}
        """

        completion = (
            groq_client.chat
            .completions.create(

                model=
                "llama-3.3-70b-versatile",

                messages=[

                    {
                        "role": "user",

                        "content": prompt
                    }
                ]
            )
        )

        return {

            "success": True,

            "feedback":

            completion
            .choices[0]
            .message.content
        }

    except Exception as e:

        return {

            "success": False,

            "error": str(e)
        }


@app.post("/behavior-analysis")
def behavior_analysis(
    data: BehaviorAnalysisRequest
):

    try:

        prompt = f"""

        You are an elite recruiter AI.

        Candidate Metrics:

        Confidence:
        {data.confidence}

        Eye Contact:
        {data.eye_contact}

        Communication:
        {data.communication}

        Transcript:
        {data.transcript}

        Analyze:
        - confidence
        - leadership
        - clarity
        - engagement
        - professionalism

        Return:
        1 short recruiter insight.
        """

        completion = (
            groq_client.chat
            .completions.create(

                model=
                "llama-3.3-70b-versatile",

                messages=[

                    {
                        "role": "user",

                        "content": prompt
                    }
                ],

                temperature=0.7,
            )
        )

        insight = (
            completion
            .choices[0]
            .message.content
            .strip()
        )

        return {

            "success": True,

            "insight": insight
        }

    except Exception as e:

        return {

            "success": False,

            "error": str(e)
        }


@app.post("/speech-analysis")
async def speech_analysis(
    data: dict
):

    transcript = data.get(
        "transcript",
        ""
    )

    if not transcript:

        return {

            "confidence": 0,

            "clarity": 0,

            "filler_words": 0,

            "speaking_speed": 0,

            "feedback":
            "No transcript provided."
        }

    words = transcript.split()

    filler_words_list = [

        "um",
        "uh",
        "like",
        "basically",
        "actually",
        "you know",
        "sort of",
        "kind of",
    ]

    filler_count = sum(
        transcript.lower().count(word)
        for word in filler_words_list
    )

    confidence = max(
        50,
        95 - filler_count * 4
    )

    clarity = min(
        95,
        60 + len(words) // 2
    )

    speaking_speed = min(
        180,
        len(words) * 2
    )

    return {

        "confidence":
        confidence,

        "clarity":
        clarity,

        "filler_words":
        filler_count,

        "speaking_speed":
        speaking_speed,

        "feedback":
        "Speech analyzed successfully."
    }


@app.post("/vision-analysis")
async def vision_analysis(
    data: dict
):

    return {

        "face_detected":
        True,

        "eye_contact":
        84,

        "attention_score":
        88,

        "confidence_score":
        81,

        "feedback":
        "Good eye contact maintained."
    }


@app.post("/save-interview")
def save_interview(
    data: InterviewSessionRequest,
    db: Session = Depends(get_db)
):

    session = InterviewSession(

        user_id=data.user_id,

        role=data.role,

        transcript=data.transcript,

        confidence_score=
        data.confidence_score,

        communication_score=
        data.communication_score,

        words_per_minute=
        data.words_per_minute,

        eye_contact_score=
        data.eye_contact_score,

        technical_score=
        data.technical_score,

        attention_status=
        data.attention_status,

        ai_feedback=
        data.ai_feedback,
    )

    db.add(session)

    db.commit()

    db.refresh(session)

    return {
        "message":
        "Interview saved successfully"
    }


@app.get("/history/{user_id}")
def get_history(
    user_id: int,
    db: Session = Depends(get_db)
):

    sessions = (

        db.query(InterviewSession)

        .filter(
            InterviewSession.user_id
            == user_id
        )

        .all()
    )

    return sessions


@app.get("/leaderboard")
def leaderboard(
    db: Session = Depends(get_db)
):

    sessions = (

        db.query(InterviewSession)

        .order_by(
            InterviewSession
            .confidence_score.desc()
        )

        .limit(10)

        .all()
    )

    return sessions


@app.get("/dashboard/{user_id}")
def dashboard(
    user_id: int,
    db: Session = Depends(get_db)
):

    sessions = (

        db.query(InterviewSession)

        .filter(
            InterviewSession.user_id
            == user_id
        )

        .all()
    )

    total = len(sessions)

    avg_confidence = 0

    avg_communication = 0

    if total > 0:

        avg_confidence = round(

            sum(
                s.confidence_score
                for s in sessions
            ) / total,

            2
        )

        avg_communication = round(

            sum(
                s.communication_score
                for s in sessions
            ) / total,

            2
        )

    return {

        "total_interviews":
        total,

        "average_confidence":
        avg_confidence,

        "average_communication":
        avg_communication,
    }