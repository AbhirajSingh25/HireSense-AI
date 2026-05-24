import json

from datetime import datetime

from fastapi import (
    FastAPI,
    Depends,
    UploadFile,
    File
)

from fastapi.middleware.cors import (
    CORSMiddleware
)

from sqlalchemy.orm import Session

from database.database import (
    Base,
    engine,
    get_db
)

from database.interview_model import (
    InterviewSession
)

from services.ai_service import (

    generate_interview_questions,

    evaluate_answer,

    generate_final_report,

    generate_followup_question
)

from services.resume_service import (

    extract_resume_text,

    analyze_resume_text
)


app = FastAPI()


Base.metadata.create_all(
    bind=engine
)


app.add_middleware(

    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


@app.get("/")
def home():

    return {

        "message":
            "HireSense AI Backend Running"
    }


@app.get("/generate-questions")
def generate_questions(

    role: str,

    level: str,

    resume_analysis: str = ""
):

    questions = generate_interview_questions(

        role,

        level,

        resume_analysis
    )

    return questions


@app.post("/evaluate-answer")
def evaluate(
    data: dict
):

    result = evaluate_answer(
        data["answer"]
    )

    return result


@app.get("/final-report")
def final_report():

    report = generate_final_report()

    return report


@app.post("/followup-question")
def followup_question(
    data: dict
):

    question = generate_followup_question(

        data["previous_question"],

        data["answer"],

        data["role"],

        data["level"]
    )

    return {

        "question": question
    }


@app.post("/save-interview")
def save_interview(

    data: dict,

    db: Session = Depends(get_db)
):

    session = InterviewSession(

        role=data["role"],

        level=data["level"],

        questions=json.dumps(
            data["questions"]
        ),

        answers=json.dumps(
            data["answers"]
        ),

        evaluations=json.dumps(
            data["evaluations"]
        ),

        final_report=json.dumps(
            data["final_report"]
        ),

        created_at=str(
            datetime.utcnow()
        )
    )

    db.add(session)

    db.commit()

    db.refresh(session)

    return {

        "message":
            "Interview saved"
    }


@app.get("/interview-history")
def interview_history(
    db: Session = Depends(get_db)
):

    sessions = db.query(
        InterviewSession
    ).all()

    results = []

    for session in sessions:

        results.append({

            "id":
                session.id,

            "role":
                session.role,

            "level":
                session.level,

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
                session.created_at,

            "final_report":
                json.loads(
                    session.final_report
                )
        })

    return results


@app.post("/analyze-resume")
async def analyze_resume(
    file: UploadFile = File(...)
):

    try:

        extracted_text = extract_resume_text(
            file
        )

        analysis = analyze_resume_text(
            extracted_text
        )

        return {

            "resume_text":
                extracted_text,

            "analysis":
                analysis
        }

    except Exception as error:

        return {

            "error":
                str(error)
        }