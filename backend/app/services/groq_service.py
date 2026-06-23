from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

client = Groq(
    api_key=os.getenv(
        "GROQ_API_KEY"
    )
)


def ask_copilot(
    message: str
):

    try:

        response = client.chat.completions.create(

            model="llama-3.3-70b-versatile",

            messages=[

                {
                    "role": "system",

                    "content": """
You are HireSense AI.

You are an expert interview coach.

Help candidates with:

- Technical Interviews
- Behavioral Interviews
- Resume Reviews
- System Design
- Recruiter Expectations
- Career Guidance

Provide concise and actionable answers.
"""
                },

                {
                    "role": "user",
                    "content": message
                }
            ]
        )

        return (
            response
            .choices[0]
            .message
            .content
        )

    except Exception as e:

        print(
            "GROQ ERROR:",
            str(e)
        )

        return (
            "Unable to contact AI service."
        )