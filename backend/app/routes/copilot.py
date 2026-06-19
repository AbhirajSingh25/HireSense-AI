from fastapi import APIRouter
from pydantic import BaseModel


router = APIRouter()


class CopilotRequest(BaseModel):

    prompt: str


@router.post("/ai-copilot")
async def ai_copilot(
    data: CopilotRequest
):

    prompt = data.prompt.lower()


    if "dsa" in prompt:

        response = (
            "Focus on arrays, binary search, recursion, "
            "dynamic programming, trees, and graphs. "
            "Practice LeetCode medium problems consistently."
        )


    elif "resume" in prompt:

        response = (
            "Your resume should prioritize measurable impact, "
            "production-grade projects, scalable systems, "
            "and recruiter-friendly formatting."
        )


    elif "system design" in prompt:

        response = (
            "Start with requirements, traffic estimation, "
            "database selection, scaling strategy, caching, "
            "load balancing, and failure handling."
        )


    elif "interview" in prompt:

        response = (
            "Structure answers using STAR format, "
            "speak clearly, explain tradeoffs, "
            "and communicate your decision-making process."
        )


    else:

        response = (
            "HireSense AI recommends focusing on "
            "communication clarity, technical depth, "
            "problem-solving, and confidence during interviews."
        )


    return {

        "response": response
    }