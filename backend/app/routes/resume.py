import json

from fastapi import (
    APIRouter,
    UploadFile,
    File,
)

from pydantic import BaseModel

from groq import Groq

from app.config import GROQ_API_KEY

import fitz


router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)


client = Groq(
    api_key=GROQ_API_KEY
)


COMMON_SKILLS = [
    "python",
    "java",
    "sql",
    "react",
    "javascript",
    "typescript",
    "aws",
    "docker",
    "kubernetes",
    "git",
    "machine learning",
    "fastapi",
]


# ==================================================
# RESUME ANALYZER
# ==================================================

@router.post("/analyze")
async def analyze_resume(
    file: UploadFile = File(...)
):

    contents = await file.read()

    pdf = fitz.open(
        stream=contents,
        filetype="pdf"
    )

    text = ""

    for page in pdf:
        text += page.get_text()

    lower_text = text.lower()

    found_skills = []
    missing_skills = []

    for skill in COMMON_SKILLS:

        if skill in lower_text:
            found_skills.append(skill)

        else:
            missing_skills.append(skill)

    ats_score = int(
        (
            len(found_skills)
            / len(COMMON_SKILLS)
        ) * 100
    )

    completion = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[

            {
                "role": "system",

                "content": """
You are a senior technical recruiter.

Return ONLY valid JSON.

{
    "strengths": [
        "Strong backend development"
    ],

    "weaknesses": [
        "Limited cloud exposure"
    ],

    "verdict":
        "Strong Candidate",

    "readiness":
        85,

    "recommended_roles": [
        "Backend Developer",
        "Software Engineer"
    ]
}

Return ONLY JSON.
No markdown.
No explanations.
No code blocks.
"""
            },

            {
                "role": "user",
                "content": text[:6000]
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

        ai_review = json.loads(
            raw_response
        )

    except Exception:

        ai_review = {

            "strengths": [],

            "weaknesses": [],

            "verdict":
                "Unable to Generate",

            "readiness":
                0,

            "recommended_roles": [],
        }

    return {

        "ats_score":
            ats_score,

        "skills":
            found_skills,

        "missing_skills":
            missing_skills,

        "strengths":
            ai_review.get(
                "strengths",
                []
            ),

        "weaknesses":
            ai_review.get(
                "weaknesses",
                []
            ),

        "verdict":
            ai_review.get(
                "verdict",
                ""
            ),

        "readiness":
            ai_review.get(
                "readiness",
                0
            ),

        "recommended_roles":
            ai_review.get(
                "recommended_roles",
                []
            ),

        "resume_text":
            text[:3000]
    }


# ==================================================
# JD MATCHER
# ==================================================

class JDMatchRequest(BaseModel):

    resume_text: str

    job_description: str


@router.post("/match-jd")
async def match_job_description(
    data: JDMatchRequest
):

    completion = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[

            {
                "role": "system",

                "content": """
You are a senior recruiter.

Compare resume with job description.

Return:

1. Match Percentage
2. Missing Skills
3. Strengths
4. Weaknesses
5. Hiring Recommendation
6. Interview Readiness

Keep response concise.
"""
            },

            {
                "role": "user",

                "content": f"""
Resume:

{data.resume_text}


Job Description:

{data.job_description}
"""
            }
        ]
    )

    return {

        "analysis":
            completion
            .choices[0]
            .message
            .content
    }