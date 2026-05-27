from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import random


app = FastAPI()


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
# DATABASE MOCK
# =========================

users_db = []

interviews_db = []


# =========================
# MODELS
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


# =========================
# ROOT
# =========================

@app.get("/")
async def root():

    return {
        "message": "HireSense AI Backend Running"
    }


# =========================
# AUTH
# =========================

@app.post("/auth/signup")
async def signup(
    data: SignupRequest
):

    new_user = {
        "id": len(users_db) + 1,
        "username": data.username,
        "email": data.email,
        "password": data.password,
    }

    users_db.append(new_user)

    return {
        "id": new_user["id"],
        "username": new_user["username"],
        "email": new_user["email"],
    }


@app.post("/auth/login")
async def login(
    data: LoginRequest
):

    for user in users_db:

        if (
            user["email"] == data.email
            and
            user["password"] == data.password
        ):

            return {
                "message": "Login successful",
                "user": {
                    "id": user["id"],
                    "username": user["username"],
                    "email": user["email"],
                },
                "token": "fake-jwt-token",
            }

    return {
        "message": "Invalid credentials"
    }


# =========================
# DASHBOARD
# =========================

@app.get("/dashboard/{user_id}")
async def get_dashboard_stats(
    user_id: int
):

    if interviews_db:

        latest = interviews_db[-1]

        return latest

    return {
        "confidence_score": 0,
        "communication_score": 0,
        "words_per_minute": 0,
        "eye_contact_score": 0,
        "attention_status": "No Data",
        "transcript": "",
    }


# =========================
# SAVE INTERVIEW
# =========================

@app.post("/save-interview")
async def save_interview(
    data: InterviewSaveRequest
):

    new_interview = {
        "id": len(interviews_db) + 1,
        **data.dict(),
    }

    interviews_db.append(new_interview)

    return {
        "message": "Interview saved",
        "data": new_interview,
    }


# =========================
# HISTORY
# =========================

@app.get("/history/{user_id}")
async def get_history(
    user_id: int
):

    return interviews_db


# =========================
# REPORTS
# =========================

@app.get("/reports/{user_id}")
async def get_reports(
    user_id: int
):

    return interviews_db


# =========================
# LEADERBOARD
# =========================

@app.get("/leaderboard")
async def get_leaderboard():

    leaderboard = sorted(

        interviews_db,

        key=lambda x:
        x["confidence_score"],

        reverse=True,
    )

    return leaderboard


# =========================
# QUESTION GENERATION
# =========================

@app.post("/generate-questions")
async def generate_questions(
    data: QuestionRequest
):

    role = data.role


    question_bank = {

        "Frontend Developer": [

            "Explain React hooks.",

            "What is Virtual DOM?",

            "Difference between props and state?",

            "Explain useEffect lifecycle.",
        ],

        "Backend Developer": [

            "Explain REST APIs.",

            "What is JWT authentication?",

            "Difference between SQL and NoSQL?",

            "Explain database indexing.",
        ],

        "AI Engineer": [

            "Explain machine learning.",

            "Difference between AI and ML?",

            "What is overfitting?",

            "Explain neural networks.",
        ],

        "Data Analyst": [

            "Explain data cleaning.",

            "What is data visualization?",

            "Difference between mean and median?",

            "Explain SQL joins.",
        ],
    }


    questions = question_bank.get(

        role,

        [
            "Tell me about yourself.",
            "Why should we hire you?",
        ]
    )


    return {
        "questions": questions
    }


# =========================
# ANSWER EVALUATION
# =========================

@app.post("/evaluate-answer")
async def evaluate_answer(
    data: AnswerRequest
):

    score = random.randint(70, 95)

    return {

        "score": score,

        "feedback":
            "Good answer with decent technical clarity.",
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

        "attention_status": "Focused",
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


# =========================
# LIVE INTERVIEW ANALYSIS
# =========================

@app.post("/live-interview-analysis")
async def live_interview_analysis(
    data: LiveInterviewRequest
):

    transcript = data.transcript

    role = data.role


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
            transcript.lower().count(
                filler
            )
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


    attention_status = (

        "Focused"

        if filler_count < 6

        else "Distracted"
    )


    feedback = f"""

Role Evaluated:
{role}

Communication quality is good.
Try keeping answers concise and structured.
Reduce filler words for stronger technical delivery.

"""


    return {

        "role":
            role,

        "confidence_score":
            confidence_score,

        "communication_score":
            communication_score,

        "attention_status":
            attention_status,

        "words_per_minute":
            max(
                90,
                min(
                    160,
                    total_words // 2
                )
            ),

        "feedback":
            feedback.strip(),
    }