import os

from groq import Groq

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import random


app = FastAPI()

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

    print(users_db)

    for user in users_db:

        if (
            user["email"].strip().lower()

            ==

            data.email.strip().lower()

            and

            user["password"].strip()

            ==

            data.password.strip()
        ):

            return {

                "message":
                    "Login successful",

                "user": {

                    "id":
                        user["id"],

                    "username":
                        user["username"],

                    "email":
                        user["email"],
                },

                "token":
                    "fake-jwt-token",
            }

    return {
        "message":
            "Invalid credentials"
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


    prompt = f"""

Generate 5 realistic interview questions
for a {role} role.

Rules:
- concise
- professional
- technical
- mix beginner and intermediate
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


@app.post("/generate-followup")
async def generate_followup(
    data: AnswerRequest
):

    prompt = f"""

You are an AI interviewer.

Previous Question:
{data.question}

Candidate Answer:
{data.answer}

Generate ONE intelligent follow-up interview question.

Rules:
- professional
- concise
- relevant to answer
- conversational
- technical if needed

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

Evaluate the answer professionally.

Return:
1. Score out of 100
2. Short feedback
3. Strengths
4. Improvements

Keep response concise.

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


    import re

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