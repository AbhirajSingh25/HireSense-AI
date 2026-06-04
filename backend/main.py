import json

from datetime import datetime

from fastapi import (
    FastAPI,
    Depends,
    HTTPException
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

from database.models import (
    User,
    InterviewSession
)


app = FastAPI()


Base.metadata.create_all(
    bind=engine
)


app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

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


@app.post("/auth/signup")
def signup(

    data: dict,

    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == data["email"]
    ).first()

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    user = User(

        username=data["username"],

        email=data["email"],

        password=data["password"]
    )

    db.add(user)

    db.commit()

    db.refresh(user)

    return {

        "message":
            "Signup successful",

        "user_id":
            user.id
    }


@app.post("/auth/login")
def login(

    data: dict,

    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == data["email"]
    ).first()

    if not user:

        raise HTTPException(
            status_code=404,
            detail="Invalid email"
        )

    if user.password != data["password"]:

        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    return {

        "message":
            "Login successful",

        "token":
            "demo-token",

        "user": {

            "id":
                user.id,

            "username":
                user.username,

            "email":
                user.email
        }
    }


@app.get("/generate-questions")
def generate_questions(

    role: str,

    level: str
):

    return {

        "questions": [

            f"Tell me about yourself as a {role}",

            "Explain React hooks",

            "What is useEffect?",

            "Explain API integration",

            "Describe a difficult project"
        ]
    }


@app.post("/evaluate-answer")
def evaluate_answer(
    data: dict
):

    return {

        "score": 85,

        "feedback":
            "Strong answer with good clarity"
    }


@app.get("/final-report")
def final_report():

    return {

        "overall_score": 88,

        "communication": 90,

        "technical": 85,

        "confidence": 87
    }


@app.post("/followup-question")
def followup_question(
    data: dict
):

    return {

        "question":
            "Can you explain that in more detail?"
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

    return sessions