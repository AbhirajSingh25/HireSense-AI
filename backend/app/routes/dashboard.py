from fastapi import APIRouter
from sqlalchemy.orm import Session
from fastapi import Depends

from app.database import get_db
from app.models import InterviewSession

import json

router = APIRouter()


@router.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db)
):

    interviews = (
        db.query(
            InterviewSession
        ).all()
    )

    total = len(interviews)

    if total == 0:

        return {

            "total_interviews": 0,

            "avg_confidence": 0,

            "communication": 0,

            "ai_rank": 0,
        }

    confidence_scores = []
    communication_scores = []

    for interview in interviews:

        try:

            evaluations = json.loads(
                interview.evaluations
            )

            for evaluation in evaluations:

                confidence_scores.append(

                    evaluation.get(
                        "confidence",
                        0
                    )
                )

                communication_scores.append(

                    evaluation.get(
                        "communication",
                        0
                    )
                )

        except Exception:

            pass

    avg_confidence = (

        int(
            sum(confidence_scores)
            / len(confidence_scores)
        )

        if confidence_scores

        else 0
    )

    avg_communication = (

        int(
            sum(communication_scores)
            / len(communication_scores)
        )

        if communication_scores

        else 0
    )

    return {

        "total_interviews":
            total,

        "avg_confidence":
            avg_confidence,

        "communication":
            avg_communication,

        "ai_rank":
            max(
                1,
                100 - total
            ),
    }


@router.get("/achievements")
def achievements(
    db: Session = Depends(get_db)
):

    interviews = (
        db.query(
            InterviewSession
        ).all()
    )

    total = len(interviews)

    best_score = max(
        [
            i.overall_score or 0
            for i in interviews
        ],
        default=0
    )

    achievements = []

    if total >= 1:

        achievements.append({

            "title":
                "First Interview",

            "unlocked":
                True
        })

    if total >= 5:

        achievements.append({

            "title":
                "Practice Warrior",

            "unlocked":
                True
        })

    if best_score >= 80:

        achievements.append({

            "title":
                "Strong Candidate",

            "unlocked":
                True
        })

    if best_score >= 90:

        achievements.append({

            "title":
                "Interview Master",

            "unlocked":
                True
        })

    return achievements


@router.get("/recruiter-insights")
def recruiter_insights(
    db: Session = Depends(get_db)
):

    interviews = (
        db.query(
            InterviewSession
        ).all()
    )

    total = len(interviews)

    if total == 0:

        return {

            "technical":
                "No interview data available.",

            "communication":
                "No interview data available.",

            "recommendation":
                "Conduct interviews first."
        }

    average_score = int(

        sum(
            [
                i.overall_score or 0
                for i in interviews
            ]
        )

        / total
    )

    if average_score >= 85:

        recommendation = (
            "Candidates are performing exceptionally well."
        )

    elif average_score >= 70:

        recommendation = (
            "Candidates are interview ready."
        )

    else:

        recommendation = (
            "Candidates need additional preparation."
        )

    return {

        "technical":
            f"Average technical performance score is {average_score}%",

        "communication":
            "Communication skills are derived from real interview evaluations.",

        "recommendation":
            recommendation,
    }
@router.get("/analytics")
def analytics(
    db: Session = Depends(get_db)
):

    interviews = (

        db.query(
            InterviewSession
        )

        .order_by(
            InterviewSession.created_at.asc()
        )

        .all()
    )

    performance = []

    confidence_scores = []
    communication_scores = []
    technical_scores = []

    for interview in interviews:

        confidence = 0
        communication = 0
        technical = 0

        try:

            evaluations = json.loads(
                interview.evaluations
            )

            if evaluations:

                confidence = int(

                    sum(
                        e.get(
                            "confidence",
                            0
                        )
                        for e in evaluations
                    )

                    / len(evaluations)
                )

                communication = int(

                    sum(
                        e.get(
                            "communication",
                            0
                        )
                        for e in evaluations
                    )

                    / len(evaluations)
                )

                technical = int(

                    sum(
                        e.get(
                            "technical",
                            0
                        )
                        for e in evaluations
                    )

                    / len(evaluations)
                )

        except Exception:
            pass

        confidence_scores.append(
            confidence
        )

        communication_scores.append(
            communication
        )

        technical_scores.append(
            technical
        )

        performance.append({

            "session":
                f"S{interview.id}",

            "score":
                interview.overall_score
                or 0
        })

    avg_confidence = (

        int(
            sum(confidence_scores)
            / len(confidence_scores)
        )

        if confidence_scores
        else 0
    )

    avg_communication = (

        int(
            sum(communication_scores)
            / len(communication_scores)
        )

        if communication_scores
        else 0
    )

    avg_technical = (

        int(
            sum(technical_scores)
            / len(technical_scores)
        )

        if technical_scores
        else 0
    )

    avg_score = (

        int(
            sum(
                [
                    i.overall_score or 0
                    for i in interviews
                ]
            )
            / len(interviews)
        )

        if interviews
        else 0
    )

    return {

        "performance":
            performance,

        "radar": [

            {
                "subject":
                    "Technical",

                "value":
                    avg_technical,
            },

            {
                "subject":
                    "Communication",

                "value":
                    avg_communication,
            },

            {
                "subject":
                    "Confidence",

                "value":
                    avg_confidence,
            },
        ],

        "stats": {

            "overall":
                avg_score,

            "confidence":
                avg_confidence,

            "communication":
                avg_communication,

            "technical":
                avg_technical,
        }
    }