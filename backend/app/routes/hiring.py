from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/hiring",
    tags=["Hiring"]
)


class HiringRequest(BaseModel):

    ats_score: int

    interview_score: int

    jd_match_score: int


@router.post("/probability")
async def calculate_hiring_probability(
    data: HiringRequest
):

    probability = int(

        (
            data.ats_score * 0.3 +

            data.interview_score * 0.4 +

            data.jd_match_score * 0.3
        )
    )

    verdict = "Strong Hire"

    if probability < 75:

        verdict = "Potential Hire"

    if probability < 60:

        verdict = "Needs Improvement"

    return {

        "probability":
            probability,

        "verdict":
            verdict
    }