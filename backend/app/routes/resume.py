from fastapi import APIRouter, UploadFile, File
import fitz  # PyMuPDF

router = APIRouter()

@router.post("/analyze-resume")
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

    return {
        "success": True,
        "text": text[:5000]
    }