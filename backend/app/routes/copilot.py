from fastapi import APIRouter
from pydantic import BaseModel
from groq import Groq
from app.config import GROQ_API_KEY

router = APIRouter()

client = Groq(
    api_key=GROQ_API_KEY
)


class CopilotRequest(BaseModel):
    prompt: str


@router.post("/ai-copilot")
async def ai_copilot(
    data: CopilotRequest
):

    completion = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[

            {
                "role": "system",

                "content": """
You are HireSense AI.

You are an expert recruiter,
software engineer,
career coach,
interview mentor.

Help users prepare for:

- DSA
- System Design
- HR Interviews
- Behavioral Interviews
- Resume Reviews
- Career Guidance

Always provide practical,
recruiter-focused answers.
"""
            },

            {
                "role": "user",
                "content": data.prompt
            }
        ]
    )

    return {
        "response":
        completion.choices[0]
        .message.content
    }