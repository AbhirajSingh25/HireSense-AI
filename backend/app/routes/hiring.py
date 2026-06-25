from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class HiringRequest(BaseModel):

    confidence: int

    communication: int

    technical: int


@router.post("/api/hiring-probability")
def hiring_probability(
    data: HiringRequest
):

    probability = int(

        (
            data.confidence * 0.30
            +
            data.communication * 0.30
            +
            data.technical * 0.40
        )
    )

    if probability >= 85:

        verdict = "Highly Recommended"

    elif probability >= 70:

        verdict = "Recommended"

    elif probability >= 50:

        verdict = "Potential"

    else:

        verdict = "Needs Improvement"

    return {

        "probability":
            probability,

        "verdict":
            verdict,
    }