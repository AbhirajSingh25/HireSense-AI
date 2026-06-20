from fastapi import APIRouter, UploadFile, File
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
You are an expert technical recruiter.

Analyze this resume and provide:

1. ATS Score (0-100)

2. Strengths

3. Weaknesses

4. Missing Skills

5. Recruiter Verdict

6. Interview Readiness Score

Keep the response structured and professional.
"""
            },

            {
                "role": "user",
                "content": text[:6000]
            }

        ]
    )

    ai_review = (
        completion
        .choices[0]
        .message
        .content
    )

    return {

        "ats_score": ats_score,

        "skills": found_skills,

        "missing_skills": missing_skills,

        "ai_review": ai_review,

        "resume_text": text[:3000]
    }
from pydantic import BaseModel


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

Compare the resume against the job description.

Return:

1. Match Percentage

2. Missing Skills

3. Strengths

4. Weaknesses

5. Hiring Recommendation

6. Interview Readiness

Keep it concise.
"""
            },

            {
                "role": "user",

                "content":
                f"""
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
        completion.choices[0].message.content
    }