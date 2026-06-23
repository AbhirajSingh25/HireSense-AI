from fastapi import (
    APIRouter,
    Depends,
)

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
# ANSWER EVALUATION
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
You are a senior technical interviewer.

Evaluate the candidate answer.

Return ONLY valid JSON.

{
    "confidence": 85,
    "communication": 90,
    "technical": 88,
    "overall_score": 87,

    "strengths": [
        "Clear explanation"
    ],

    "improvements": [
        "Add more technical depth"
    ],

    "feedback":
        "Detailed recruiter feedback"
}

Return JSON only.
No markdown.
No explanations.
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

    raw_response = (
        completion
        .choices[0]
        .message
        .content
    )

    try:

        result = json.loads(
            raw_response
        )

        return result

    except Exception:

        return {

            "confidence": 75,

            "communication": 75,

            "technical": 75,

            "overall_score": 75,

            "strengths": [],

            "improvements": [],

            "feedback":
                raw_response,
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
You are a senior interviewer.

Generate ONE intelligent follow-up question.

The follow-up should depend on:

- previous question
- candidate answer
- role
- experience level

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
# FINAL REPORT
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
You are a senior recruiter.

Generate a final interview report.

Return ONLY valid JSON.

{
    "overall_score": 88,

    "communication": 90,

    "technical": 85,

    "confidence": 87,

    "strengths": [
        "Strong backend knowledge"
    ],

    "weaknesses": [
        "Limited cloud exposure"
    ],

    "recommendation":
        "Proceed to next round",

    "verdict":
        "Strong Candidate"
}

Return JSON only.
No markdown.
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

    raw_response = (
        completion
        .choices[0]
        .message
        .content
    )

    try:

        report = json.loads(
            raw_response
        )

        return report

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
                "Unable to Generate"
        }


# ==================================================
# SAVE INTERVIEW
# ==================================================

@router.post("/save-interview")
async def save_interview(
    data: InterviewSaveRequest,
    db: Session = Depends(get_db)
):

    overall_score = 0

    if data.evaluations:

        scores = []

        for item in data.evaluations:

            score = item.get(
                "overall_score",
                0
            )

            scores.append(score)

        if scores:

            overall_score = int(
                sum(scores)
                / len(scores)
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