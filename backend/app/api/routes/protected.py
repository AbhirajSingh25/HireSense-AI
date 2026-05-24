from fastapi import APIRouter
from fastapi import Depends

from app.core.auth import get_current_user

router = APIRouter(
    prefix="/protected",
    tags=["Protected"]
)


@router.get("/profile")
def profile(
    current_user=Depends(get_current_user)
):

    return {
        "message": "Protected route accessed",
        "user": current_user
    }