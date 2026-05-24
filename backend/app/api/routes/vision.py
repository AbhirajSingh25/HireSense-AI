import os

from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File

from app.services.vision_service import (
    analyze_eye_contact
)

router = APIRouter(
    prefix="/vision",
    tags=["Computer Vision"]
)

UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)


@router.post("/analyze")
async def analyze_vision(
    image: UploadFile = File(...)
):

    file_path = os.path.join(
        UPLOAD_DIR,
        image.filename
    )

    with open(file_path, "wb") as buffer:

        buffer.write(
            await image.read()
        )

    analysis = analyze_eye_contact(
        file_path
    )

    return analysis