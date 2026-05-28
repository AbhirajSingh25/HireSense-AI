import os
import re

from groq import Groq

from dotenv import load_dotenv

from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

from sqlalchemy.orm import Session

from .database import (
    SessionLocal,
    engine,
    Base
)

from .models import (
    User,
    Interview
)


# =========================
# APP
# =========================

app = FastAPI()

Base.metadata.create_all(
    bind=engine
)


# =========================
# ENV
# =========================

load_dotenv()

groq_client = Groq(

    api_key=os.getenv(
        "GROQ_API_KEY"
    )
)


# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# =========================
# DATABASE SESSION
# =========================

def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()


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


class InterviewSaveRequest(BaseModel):

    user_id: int

    transcript: str

    confidence_score: int

    communication_score: int

    words_per_minute: int

    eye_contact_score: int

    attention_status: str


class SpeechRequest(BaseModel):

    transcript: str


class LiveInterviewRequest(BaseModel):

    transcript: str

    role: str


class QuestionRequest(BaseModel):

    role: str


class AnswerRequest(BaseModel):

    question: str

    answer: str

    history: list = []


# =========================
# ROOT
# =========================

@app.get("/")
async def root():

    return {

        "message":
            "HireSense AI Backend Running"
    }


# =========================
# AUTH
# =========================

@app.post("/auth/signup")
async def signup(
    data: SignupRequest
):

    db = SessionLocal()


    existing_user = (

        db.query(User)

        .filter(
            User.email == data.email
        )

        .first()
    )


    if existing_user:

        return {
            "message":
                "User already exists"
        }


    new_user = User(

        username=data.username,

        email=data.email,

        password=data.password
    )


    db.add(new_user)

    db.commit()

    db.refresh(new_user)


    return {

        "id":
            new_user.id,

        "username":
            new_user.username,

        "email":
            new_user.email,
    }


@app.post("/auth/login")
async def login(
    data: LoginRequest
):

    db = SessionLocal()


    user = (

        db.query(User)

        .filter(
            User.email == data.email
        )

        .first()
    )


    if (

        not user

        or

        user.password != data.password
    ):

        return {
            "message":
                "Invalid credentials"
        }


    return {

        "message":
            "Login successful",

        "user": {

            "id":
                user.id,

            "username":
                user.username,

            "email":
                user.email,
        },

        "token":
            "fake-jwt-token",
    }


# =========================
# DASHBOARD
# =========================

@app.get("/dashboard/{user_id}")
async def get_dashboard(
    user_id: int
):

    db = SessionLocal()


    latest = (

        db.query(Interview)

        .filter(
            Interview.user_id == user_id
        )

        .order_by(
            Interview.id.desc()
        )

        .first()
    )


    if not latest:

        return {

            "confidence_score": 0,

            "communication_score": 0,

            "words_per_minute": 0,

            "eye_contact_score": 0,

            "attention_status":
                "No Data",

            "transcript": "",
        }


    return {

        "confidence_score":
            latest.confidence_score,

        "communication_score":
            latest.communication_score,

        "words_per_minute":
            latest.words_per_minute,

        "eye_contact_score":
            latest.eye_contact_score,

        "attention_status":
            latest.attention_status,

        "transcript":
            latest.transcript,
    }


# =========================
# SAVE INTERVIEW
# =========================

@app.post("/save-interview")
async def save_interview(
    data: InterviewSaveRequest
):

    db = SessionLocal()


    interview = Interview(

        user_id=data.user_id,

        transcript=data.transcript,

        confidence_score=
            data.confidence_score,

        communication_score=
            data.communication_score,

        words_per_minute=
            data.words_per_minute,

        eye_contact_score=
            data.eye_contact_score,

        attention_status=
            data.attention_status,
    )


    db.add(interview)

    db.commit()

    db.refresh(interview)


    return {
        "message":
            "Interview saved"
    }


# =========================
# HISTORY
# =========================

@app.get("/history/{user_id}")
async def get_history(
    user_id: int
):

    db = SessionLocal()


    interviews = (

        db.query(Interview)

        .filter(
            Interview.user_id == user_id
        )

        .all()
    )


    return interviews


# =========================
# LEADERBOARD
# =========================

@app.get("/leaderboard")
async def get_leaderboard():

    db = SessionLocal()


    interviews = (

        db.query(Interview)

        .order_by(
            Interview.confidence_score.desc()
        )

        .all()
    )


    return interviews


# =========================
# QUESTION GENERATION
# =========================

@app.post("/generate-questions")
async def generate_questions(
    data: QuestionRequest
):

    role = data.role


    prompt = f"""

Generate 5 realistic interview questions
for a {role} role.

Rules:
- concise
- professional
- technical
- beginner to intermediate
- return plain list only

"""


    completion = groq_client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[

            {
                "role": "user",
                "content": prompt,
            }
        ],

        temperature=0.7,
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


# =========================
# FOLLOWUP QUESTIONS
# =========================

@app.post("/generate-followup")
async def generate_followup(
    data: AnswerRequest
):

    history_text = "\n".join(

        [
            f"{msg['role']}: {msg['content']}"

            for msg in data.history
        ]
    )


    prompt = f"""

You are an advanced AI interviewer.

Interview Conversation:
{history_text}

Current Question:
{data.question}

Candidate Answer:
{data.answer}

Generate ONE smart follow-up question.

Rules:
- conversational
- concise
- technical
- adaptive
- non repetitive

Return only the question.

"""


    completion = groq_client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[

            {
                "role": "user",
                "content": prompt,
            }
        ],

        temperature=0.7,
    )


    followup = (

        completion
        .choices[0]
        .message.content
        .strip()
    )


    return {
        "question": followup
    }


# =========================
# ANSWER EVALUATION
# =========================

@app.post("/evaluate-answer")
async def evaluate_answer(
    data: AnswerRequest
):

    prompt = f"""

You are an AI interview evaluator.

Question:
{data.question}

Candidate Answer:
{data.answer}

Evaluate professionally.

Return:
1. Score out of 100
2. Feedback
3. Strengths
4. Improvements

Keep concise.

"""


    completion = groq_client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[

            {
                "role": "user",
                "content": prompt,
            }
        ],

        temperature=0.5,
    )


    feedback = (

        completion
        .choices[0]
        .message.content
    )


    score_match = re.search(
        r'(\d{1,3})',
        feedback
    )


    score = (

        int(score_match.group(1))

        if score_match

        else 80
    )


    return {

        "score": score,

        "feedback": feedback,
    }


# =========================
# FINAL REPORT
# =========================

@app.post("/final-report")
async def final_report():

    return {

        "confidence_score": 85,

        "communication_score": 88,

        "words_per_minute": 120,

        "eye_contact_score": 90,

        "attention_status":
            "Focused",
    }


# =========================
# SPEECH ANALYSIS
# =========================

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

            transcript
            .lower()
            .count(filler)
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
            "Speech analyzed successfully",
    }


# =========================
# LIVE INTERVIEW ANALYSIS
# =========================

@app.post("/live-interview-analysis")
async def live_interview_analysis(
    data: LiveInterviewRequest
):

    transcript = data.transcript

    words = transcript.split()

    total_words = len(words)


    filler_words = [

        "um",
        "uh",
        "like",
        "basically",
    ]


    filler_count = 0


    for filler in filler_words:

        filler_count += (

            transcript
            .lower()
            .count(filler)
        )


    confidence_score = max(
        55,
        100 - (filler_count * 4)
    )


    communication_score = min(
        95,
        70 + (
            total_words // 10
        )
    )


    return {

        "role":
            data.role,

        "confidence_score":
            confidence_score,

        "communication_score":
            communication_score,

        "attention_status":
            "Focused",

        "words_per_minute":
            max(
                90,
                min(
                    160,
                    total_words // 2
                )
            ),

        "feedback":
            "Communication quality is good.",
    }