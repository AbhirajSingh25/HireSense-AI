from fastapi import (
    FastAPI,
    Depends,
    HTTPException,
)

from fastapi.middleware.cors import (
    CORSMiddleware,
)

from sqlalchemy.orm import (
    Session,
)

from passlib.context import (
    CryptContext,
)

from jose import jwt

from groq import Groq

from dotenv import load_dotenv

from datetime import (
    datetime,
    timedelta,
)
from pydantic import BaseModel


import os
import json

from .database import (
    Base,
    engine,
    get_db,
)

from .models import (
    User,
    InterviewSession,
)

from .schemas import (

    SignupRequest,
    LoginRequest,
    QuestionRequest,
    AnswerRequest,
    SpeechRequest,
    InterviewSessionRequest,
)

from .services.interview_ai import (
    generate_question,
    evaluate_interview_answer,
)


load_dotenv()


GROQ_API_KEY = os.getenv(
    "GROQ_API_KEY"
)

SECRET_KEY = os.getenv(
    "SECRET_KEY"
)

ALGORITHM = "HS256"


groq_client = Groq(
    api_key=GROQ_API_KEY
)


pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


app = FastAPI()


app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

from .models import InterviewSession


InterviewSession.__table__.drop(
    engine,
    checkfirst=True
)
Base.metadata.create_all(
    bind=engine
)


@app.get("/")
def root():

    return {

        "message":
            "HireSense AI Backend Running"
    }


def create_token(data: dict):

    payload = data.copy()

    payload["exp"] = (

        datetime.utcnow() +

        timedelta(days=7)
    )

    return jwt.encode(

        payload,

        SECRET_KEY,

        algorithm=ALGORITHM
    )
class InterviewRequest(BaseModel):

    transcript: str
@app.post("/ai-interview-feedback")

def ai_interview_feedback(

    data: InterviewRequest
):

    try:

        client = Groq(

            api_key=os.getenv(
                "GROQ_API_KEY"
            )
        )


        prompt = f"""

        Analyze this interview transcript.

        Give:
        1. Communication score
        2. Confidence score
        3. Technical score
        4. Short AI feedback
        5. Improvement suggestions

        Transcript:
        {data.transcript}

        """


        completion = client.chat.completions.create(

            model="llama3-70b-8192",

            messages=[

                {
                    "role": "user",

                    "content": prompt
                }
            ]
        )


        return {

            "success": True,

            "feedback":

            completion.choices[0]
            .message.content
        }

    except Exception as e:

        return {

            "success": False,

            "error": str(e)
        }

@app.post("/auth/signup")
def signup(

    data: SignupRequest,

    db: Session = Depends(get_db)
):

    existing_user = (

        db.query(User)

        .filter(
            User.email == data.email
        )

        .first()
    )

    if existing_user:

        raise HTTPException(

            status_code=400,

            detail="Email already exists"
        )


    hashed_password = (

        pwd_context.hash(
            data.password
        )
    )


    user = User(

        username=data.username,

        email=data.email,

        password=hashed_password,
    )


    db.add(user)

    db.commit()

    db.refresh(user)


    token = create_token({

        "user_id": user.id
    })


    return {

        "message":
            "Signup successful",

        "token": token,

        "user": {

            "id": user.id,

            "username":
                user.username,

            "email":
                user.email,
        }
    }


@app.post("/auth/login")
def login(

    data: LoginRequest,

    db: Session = Depends(get_db)
):

    user = (

        db.query(User)

        .filter(
            User.email == data.email
        )

        .first()
    )

    if not user:

        raise HTTPException(

            status_code=401,

            detail="Invalid email"
        )


    valid_password = (

        pwd_context.verify(

            data.password,

            user.password
        )
    )

    if not valid_password:

        raise HTTPException(

            status_code=401,

            detail="Invalid password"
        )


    token = create_token({

        "user_id": user.id
    })


    return {

        "message":
            "Login successful",

        "token": token,

        "user": {

            "id": user.id,

            "username":
                user.username,

            "email":
                user.email,
        }
    }


@app.post("/generate-questions")
async def generate_questions(
    data: QuestionRequest
):

    prompt = f"""

Generate 5 realistic interview questions
for a {data.role} role.

Requirements:
- concise
- technical
- realistic
- industry-level

Return only questions.
"""


    completion = (

        groq_client.chat
        .completions.create(

            model=
            "llama-3.3-70b-versatile",

            messages=[

                {
                    "role": "system",

                    "content":
                        "You are an expert technical interviewer."
                },

                {
                    "role": "user",

                    "content": prompt
                }
            ],

            temperature=0.7,
        )
    )


    content = (

        completion
        .choices[0]
        .message.content
    )


    questions = [

        q.strip("- ").strip()

        for q in content.split("\n")

        if q.strip()
    ]


    return {
        "questions": questions
    }


@app.post("/evaluate-answer")
async def evaluate_answer_route(
    data: AnswerRequest
):

    evaluation = evaluate_interview_answer(

        data.question,

        data.answer,
    )

    return evaluation


@app.post("/generate-followup")
async def generate_followup(
    data: AnswerRequest
):

    history_text = "\n".join(

        [
            f"{msg['role']}: {msg['content']}"

            for msg in data.history
        ]
    )


    prompt = f"""

You are a senior technical interviewer.

Conversation History:
{history_text}

Current Question:
{data.question}

Candidate Answer:
{data.answer}

Generate ONE intelligent follow-up question.
"""


    completion = (

        groq_client.chat
        .completions.create(

            model=
            "llama-3.3-70b-versatile",

            messages=[

                {
                    "role": "system",

                    "content":
                        "You are an expert AI interviewer."
                },

                {
                    "role": "user",

                    "content": prompt
                }
            ],

            temperature=0.8,
        )
    )


    followup = (

        completion
        .choices[0]
        .message.content
        .strip()
    )


    return {
        "question": followup
    }


@app.post("/speech-analysis")
async def speech_analysis(
    data: dict
):

    transcript = data.get(
        "transcript",
        ""
    )

    if not transcript:

        return {

            "confidence": 0,

            "clarity": 0,

            "filler_words": 0,

            "speaking_speed": 0,

            "feedback":
                "No transcript provided."
        }


    words = transcript.split()


    filler_words_list = [

        "um",
        "uh",
        "like",
        "basically",
        "actually",
        "you know",
        "sort of",
        "kind of",
        "hmm",
        "okay",
    ]


    filler_count = sum(

        transcript.lower().count(word)

        for word in filler_words_list
    )


    confidence = max(
        50,
        95 - filler_count * 4
    )


    clarity = min(
        95,
        60 + len(words) // 2
    )


    speaking_speed = min(
        180,
        len(words) * 2
    )


    feedback = []


    if filler_count > 3:

        feedback.append(
            "Reduce filler words."
        )


    if len(words) < 20:

        feedback.append(
            "Try giving more detailed answers."
        )


    if clarity > 80:

        feedback.append(
            "Strong communication clarity."
        )


    if not feedback:

        feedback.append(
            "Good speaking performance."
        )


    return {

        "confidence":
            confidence,

        "clarity":
            clarity,

        "filler_words":
            filler_count,

        "speaking_speed":
            speaking_speed,

        "feedback":
            " ".join(feedback),
    }


@app.post("/vision-analysis")
async def vision_analysis(
    data: dict
):

    face_detected = True

    eye_contact = 84

    attention_score = 88

    confidence_score = 81

    return {

        "face_detected":
            face_detected,

        "eye_contact":
            eye_contact,

        "attention_score":
            attention_score,

        "confidence_score":
            confidence_score,

        "feedback":
            "Good eye contact and attention maintained."
    }


@app.post("/live-interview-analysis")
async def live_interview_analysis(

    data: SpeechRequest
):

    return {

        "confidence_score": 87,

        "communication_score": 90,

        "words_per_minute": 118,

        "attention_status":
            "Focused",

        "feedback":
            "Strong communication and technical articulation detected.",
    }


@app.post("/save-interview")
def save_interview(

    data: InterviewSessionRequest,

    db: Session = Depends(get_db)
):

    session = InterviewSession(

        user_id=data.user_id,

        role=data.role,

        transcript=data.transcript,

        confidence_score=
            data.confidence_score,

        communication_score=
            data.communication_score,

        words_per_minute=
            data.words_per_minute,

        eye_contact_score=
            data.eye_contact_score,

        technical_score=
            data.technical_score,

        attention_status=
            data.attention_status,

        ai_feedback=
            data.ai_feedback,
    )


    db.add(session)

    db.commit()

    db.refresh(session)


    return {

        "message":
            "Interview saved successfully"
    }


@app.get("/history/{user_id}")
def get_history(

    user_id: int,

    db: Session = Depends(get_db)
):

    sessions = (

        db.query(InterviewSession)

        .filter(
            InterviewSession.user_id
            == user_id
        )

        .all()
    )

    return sessions


@app.get("/leaderboard")
def leaderboard(
    db: Session = Depends(get_db)
):

    sessions = (

        db.query(InterviewSession)

        .order_by(
            InterviewSession
            .confidence_score.desc()
        )

        .limit(10)

        .all()
    )

    return sessions


@app.get("/dashboard/{user_id}")
def dashboard(

    user_id: int,

    db: Session = Depends(get_db)
):

    sessions = (

        db.query(InterviewSession)

        .filter(
            InterviewSession.user_id
            == user_id
        )

        .all()
    )


    total = len(sessions)


    avg_confidence = 0

    avg_communication = 0


    if total > 0:

        avg_confidence = round(

            sum(

                s.confidence_score

                for s in sessions

            ) / total,

            2
        )


        avg_communication = round(

            sum(

                s.communication_score

                for s in sessions

            ) / total,

            2
        )


    return {

        "total_interviews":
            total,

        "average_confidence":
            avg_confidence,

        "average_communication":
            avg_communication,
    }


@app.post("/final-report")
def final_report():

    return {

        "confidence_score": 87,

        "communication_score": 90,

        "words_per_minute": 115,

        "eye_contact_score": 92,

        "attention_status":
            "Focused",
    }


@app.post("/generate-report")
async def generate_report(
    data: dict
):

    return {

        "overall_score": 87,

        "technical_score": 85,

        "communication_score": 90,

        "confidence_score": 84,

        "summary":
            "Strong overall interview performance with good communication and technical understanding.",

        "strengths": [

            "Clear communication",

            "Good technical articulation",

            "Professional response structure",
        ],

        "weaknesses": [

            "Needs deeper system design explanations",
        ],

        "recommendations": [

            "Practice concise technical explanations",

            "Improve advanced problem-solving depth",

            "Reduce filler words",
        ]
    }


@app.post("/ai/start-interview")
async def start_interview(data: dict):

    role = data.get("role")

    level = data.get("level")

    question = generate_question(
        role,
        level,
    )

    return {
        "question": question
    }


@app.post("/ai/next-question")
async def next_question(data: dict):

    role = data.get("role")

    level = data.get("level")

    previous_question = data.get(
        "previous_question"
    )

    previous_answer = data.get(
        "previous_answer"
    )

    question = generate_question(

        role,
        level,

        previous_answer,
        previous_question,
    )

    return {
        "question": question
    }


@app.post("/ai/evaluate")
async def ai_evaluate(data: dict):

    question = data.get(
        "question"
    )

    answer = data.get(
        "answer"
    )

    evaluation = evaluate_interview_answer(
        question,
        answer,
    )

    return {
        "evaluation": evaluation
    }
@app.get("/recruiter-analytics")
def recruiter_analytics():

    return {

        "top_candidates": [

            {
                "name": "John",
                "score": 94,
            },

            {
                "name": "Sarah",
                "score": 92,
            },
        ],

        "average_confidence": 86,

        "average_communication": 89,

        "total_interviews": 124,
    }
@app.get("/health")
def health():

    return {
        "status": "ok"
    }