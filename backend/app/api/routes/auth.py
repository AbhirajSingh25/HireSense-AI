from fastapi import APIRouter

from pydantic import BaseModel

from sqlalchemy.orm import Session

from fastapi import Depends

from app.db.dependencies import get_db

from app.models.user_model import User


router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


class SignupRequest(BaseModel):

    username: str
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

    existing_user = (

        db.query(User)

        .filter(
            User.email == data.email
        )

        .first()
    )

    if existing_user:

        return {
            "message":
                "User already exists"
        }


    new_user = User(

        username=data.username,

        email=data.email,

        password=data.password,
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {

        "id":
            new_user.id,

        "username":
            new_user.username,

        "email":
            new_user.email,
    }


@router.post("/login")
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

        return {
            "message":
                "User not found"
        }


    if user.password != data.password:

        return {
            "message":
                "Invalid password"
        }


    return {

        "id":
            user.id,

        "username":
            user.username,

        "email":
            user.email,
    }