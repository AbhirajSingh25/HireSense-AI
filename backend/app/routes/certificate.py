from fastapi import APIRouter
from fastapi.responses import FileResponse

from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

import os

router = APIRouter()


@router.get("/certificate/{candidate_name}/{score}")
def generate_certificate(
    candidate_name: str,
    score: int
):

    filename = (
        f"certificate_{candidate_name}.pdf"
    )

    c = canvas.Canvas(
        filename,
        pagesize=letter
    )

    c.setFont(
        "Helvetica-Bold",
        24
    )

    c.drawCentredString(
        300,
        700,
        "HireSense AI"
    )

    c.setFont(
        "Helvetica-Bold",
        20
    )

    c.drawCentredString(
        300,
        640,
        "Certificate of Achievement"
    )

    c.setFont(
        "Helvetica",
        16
    )

    c.drawCentredString(
        300,
        580,
        f"Awarded to {candidate_name}"
    )

    c.drawCentredString(
        300,
        540,
        f"Interview Score: {score}%"
    )

    c.drawCentredString(
        300,
        500,
        "Successfully completed AI Interview Evaluation"
    )

    c.save()

    return FileResponse(
        filename,
        media_type="application/pdf",
        filename=filename
    )