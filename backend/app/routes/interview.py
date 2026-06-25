from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from groq import Groq

from app.config import GROQ_API_KEY
from app.database import get_db
from app.models import InterviewSession

import json

router = APIRouter()

client = Groq(
    api_key=GROQ_API_KEY
)


# ==================================================
# REQUEST MODELS
# ==================================================

class EvaluationRequest(BaseModel):
    question: str
    answer: str


class FollowupRequest(BaseModel):
    question: str
    answer: str
    role: str
    level: str


class InterviewSaveRequest(BaseModel):
    role: str
    level: str
    questions: list
    answers: list
    evaluations: list


# ==================================================
# EVALUATE ANSWER
# ==================================================

@router.post("/evaluate-answer")
async def evaluate_answer(
    data: EvaluationRequest
):

    completion = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[

            {
                "role": "system",

                "content": """
Return ONLY JSON.

{
    "confidence":85,
    "communication":90,
    "technical":88,
    "overall_score":87,
    "strengths":["Strong explanation"],
    "improvements":["Add examples"],
    "feedback":"Detailed feedback"
}
"""
            },

            {
                "role": "user",

                "content": f"""
Question:
{data.question}

Answer:
{data.answer}
"""
            }
        ]
    )

    try:

        return json.loads(
            completion.choices[0].message.content
        )

    except Exception:

        return {

            "confidence": 75,

            "communication": 75,

            "technical": 75,

            "overall_score": 75,

            "strengths": [],

            "improvements": [],

            "feedback":
                completion.choices[0].message.content,
        }


# ==================================================
# FOLLOWUP QUESTION
# ==================================================

@router.post("/generate-followup")
async def generate_followup(
    data: FollowupRequest
):

    completion = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[

            {
                "role": "system",

                "content": """
Generate ONE interview follow-up question.

Return ONLY the question.
"""
            },

            {
                "role": "user",

                "content": f"""
Role:
{data.role}

Level:
{data.level}

Question:
{data.question}

Answer:
{data.answer}
"""
            }
        ]
    )

    return {

        "question":

            completion
            .choices[0]
            .message
            .content
            .strip()
    }


# ==================================================
# GENERATE FINAL REPORT
# ==================================================

@router.post("/generate-report")
async def generate_report(
    data: InterviewSaveRequest
):

    completion = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[

            {
                "role": "system",

                "content": """
Return ONLY JSON.

{
    "overall_score":88,
    "communication":90,
    "technical":85,
    "confidence":87,
    "strengths":["Strong backend"],
    "weaknesses":["Cloud exposure"],
    "recommendation":"Proceed",
    "verdict":"Strong Candidate"
}
"""
            },

            {
                "role": "user",

                "content": f"""
Role:
{data.role}

Level:
{data.level}

Questions:
{data.questions}

Answers:
{data.answers}

Evaluations:
{data.evaluations}
"""
            }
        ]
    )

    try:

        return json.loads(
            completion.choices[0].message.content
        )

    except Exception:

        return {

            "overall_score": 80,

            "communication": 80,

            "technical": 80,

            "confidence": 80,

            "strengths": [],

            "weaknesses": [],

            "recommendation":
                "Review Required",

            "verdict":
                "Unable To Generate"
        }


# ==================================================
# SAVE INTERVIEW
# ==================================================

@router.post("/save-interview")
async def save_interview(
    data: InterviewSaveRequest,
    db: Session = Depends(get_db)
):

    scores = [

        item.get(
            "overall_score",
            0
        )

        for item in data.evaluations
    ]

    overall_score = (

        int(
            sum(scores)
            / len(scores)
        )

        if scores

        else 0
    )

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

        final_report="Pending",

        overall_score=overall_score,
    )

    db.add(session)

    db.commit()

    db.refresh(session)

    return {

        "success": True,

        "session_id":
            session.id,

        "overall_score":
            overall_score
    }


# ==================================================
# INTERVIEW HISTORY
# ==================================================

@router.get("/history")
async def get_history(
    db: Session = Depends(get_db)
):

    interviews = (

        db.query(
            InterviewSession
        )

        .order_by(
            InterviewSession.id.desc()
        )

        .all()
    )

    return interviews


# ==================================================
# LATEST REPORT
# ==================================================

@router.get("/latest-report")
async def latest_report(
    db: Session = Depends(get_db)
):

    session = (

        db.query(
            InterviewSession
        )

        .order_by(
            InterviewSession.id.desc()
        )

        .first()
    )

    if not session:

        return None

    return {

        "id":
            session.id,

        "role":
            session.role,

        "level":
            session.level,

        "overall_score":
            session.overall_score,

        "questions":
            json.loads(
                session.questions
            ),

        "answers":
            json.loads(
                session.answers
            ),

        "evaluations":
            json.loads(
                session.evaluations
            ),

        "created_at":
            str(
                session.created_at
            )
    }


# ==================================================
# SESSION DETAILS
# ==================================================

@router.get("/session/{session_id}")
async def get_session(
    session_id: int,
    db: Session = Depends(get_db)
):

    session = (

        db.query(
            InterviewSession
        )

        .filter(
            InterviewSession.id == session_id
        )

        .first()
    )

    if not session:

        return {
            "error":
                "Session not found"
        }

    return {

        "id":
            session.id,

        "role":
            session.role,

        "level":
            session.level,

        "overall_score":
            session.overall_score,

        "questions":
            json.loads(
                session.questions
            ),

        "answers":
            json.loads(
                session.answers
            ),

        "evaluations":
            json.loads(
                session.evaluations
            ),

        "created_at":
            str(
                session.created_at
            )
    }