from fastapi import APIRouter
from fastapi import Depends

from pydantic import BaseModel

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.models.user_model import User


router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


class SignupRequest(BaseModel):

    name: str
    email: str
    password: str


class LoginRequest(BaseModel):

    email: str
    password: str


@router.post("/signup")
def signup(

    data: SignupRequest,

    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(

        User.email == data.email

    ).first()


    if existing_user:

        return {

            "success": False,

            "message":
                "User already exists"
        }


    user = User(

        name=data.name,

        email=data.email,

        password=data.password
    )

    db.add(user)

    db.commit()

    db.refresh(user)

    return {

        "success": True,

        "message":
            "Signup successful",

        "user": {

            "id":
                user.id,

            "name":
                user.name,

            "email":
                user.email,
        }
    }


@router.post("/login")
def login(

    data: LoginRequest,

    db: Session = Depends(get_db)
):

    user = db.query(User).filter(

        User.email == data.email,

        User.password == data.password

    ).first()


    if not user:

        return {

            "success": False,

            "message":
                "Invalid credentials"
        }


    return {

        "success": True,

        "message":
            "Login successful",

        "user": {

            "id":
                user.id,

            "name":
                user.name,

            "email":
                user.email,
        }
    }