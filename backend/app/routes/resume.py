from fastapi import APIRouter, UploadFile, File
import fitz

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
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
        (len(found_skills) /
         len(COMMON_SKILLS)) * 100
    )

    return {

        "ats_score": ats_score,

        "skills": found_skills,

        "missing_skills": missing_skills,

        "strengths": [

            "Technical keywords detected",

            "Resume successfully parsed",

            "Skills identified"
        ],

        "weaknesses": [

            "Missing important keywords"
        ],

        "suggestions": [

            "Add measurable achievements",

            "Add missing technical skills",

            "Use ATS-friendly formatting"
        ],

        "resume_text":
            text[:3000]
    }