from fastapi import APIRouter
from pydantic import BaseModel
from groq import Groq
from app.config import GROQ_API_KEY
import json


router = APIRouter()

client = Groq(
    api_key=GROQ_API_KEY
)


# =========================
# REQUEST MODELS
# =========================

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


# =========================
# EVALUATE ANSWER
# =========================

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
  "feedback": "Detailed feedback here"
}
"""
            },

            {
                "role": "user",

                "content":
                f"""
Question:
{data.question}

Answer:
{data.answer}
"""
            }
        ]
    )

    result = json.loads(
        completion.choices[0]
        .message.content
    )

    return result


# =========================
# FOLLOWUP QUESTION
# =========================

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
Generate ONE recruiter followup question.

The question must be based on the
candidate answer.

Return ONLY the question.
"""
            },

            {
                "role": "user",

                "content":
                f"""
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
        completion.choices[0]
        .message.content
    }


# =========================
# FINAL REPORT
# =========================

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

Analyze the complete interview.

Provide:

1. Overall Score
2. Communication Score
3. Technical Score
4. Confidence Score
5. Strengths
6. Weaknesses
7. Hiring Recommendation
8. Recruiter Verdict

Return a professional report.
"""
            },

            {
                "role": "user",

                "content":
                f"""
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

    return {
        "report":
        completion.choices[0]
        .message.content
    }


# =========================
# SAVE INTERVIEW
# =========================

@router.post("/save-interview")
async def save_interview(
    data: InterviewSaveRequest
):

    return {

        "success": True,

        "message":
            "Interview session saved successfully."
    }