from fastapi import APIRouter
from pydantic import BaseModel
from random import randint


router = APIRouter()


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


@router.post("/evaluate-answer")
async def evaluate_answer(
    data: EvaluationRequest
):

    answer_length = len(data.answer.split())


    confidence = min(
        98,
        max(65, answer_length // 2)
    )

    communication = randint(80, 95)

    technical = randint(78, 96)


    feedback = (
        "Good communication clarity and structured response. "
        "Try adding more measurable technical achievements "
        "and deeper system-level reasoning."
    )


    return {

        "confidence": confidence,

        "communication": communication,

        "technical": technical,

        "feedback": feedback,
    }


@router.post("/generate-followup")
async def generate_followup(
    data: FollowupRequest
):

    followups = [

        "Explain a difficult production bug you solved recently.",

        "Describe a scalable system you designed.",

        "How would you optimize a slow API endpoint?",

        "Tell me about a challenging team conflict.",

        "How do you handle system failures in production?",

        "Explain your database optimization strategy.",
    ]


    return {

        "question":
            followups[
                randint(
                    0,
                    len(followups) - 1
                )
            ]
    }


@router.post("/save-interview")
async def save_interview(
    data: InterviewSaveRequest
):

    return {

        "success": True,

        "message":
            "Interview session saved successfully."
    }