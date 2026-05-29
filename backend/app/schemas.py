from pydantic import BaseModel

from typing import List


class SignupRequest(BaseModel):

    username: str
    email: str
    password: str


class LoginRequest(BaseModel):

    email: str
    password: str


class QuestionRequest(BaseModel):

    role: str


class AnswerRequest(BaseModel):

    question: str
    answer: str
    history: List[dict] = []


class SpeechRequest(BaseModel):

    transcript: str


class InterviewSessionRequest(BaseModel):

    user_id: int

    role: str

    transcript: str

    confidence_score: float

    communication_score: float

    words_per_minute: float

    eye_contact_score: float

    technical_score: float = 80

    attention_status: str

    ai_feedback: str = ""