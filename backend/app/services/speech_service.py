import whisper

import librosa

model = whisper.load_model(
    "tiny"
)


def analyze_speech(
    audio_path: str
):

    result = model.transcribe(
        audio_path,
        fp16=False
    )

    transcript = result["text"]

    y, sr = librosa.load(
        audio_path
    )

    duration_minutes = (
        len(y) / sr
    ) / 60

    word_count = len(
        transcript.split()
    )

    words_per_minute = (
        round(
            word_count /
            duration_minutes
        )
        if duration_minutes > 0
        else 0
    )

    confidence_score = min(
        95,
        70 + word_count // 2
    )

    communication_score = min(
        95,
        65 + word_count // 3
    )

    feedback = []

    if confidence_score > 85:

        feedback.append(
            "Excellent confidence level."
        )

    else:

        feedback.append(
            "Work on speaking confidently."
        )

    if words_per_minute > 160:

        pace_rating = "Fast"

        feedback.append(
            "Try slowing down slightly."
        )

    elif words_per_minute < 100:

        pace_rating = "Slow"

        feedback.append(
            "Try speaking more fluently."
        )

    else:

        pace_rating = "Balanced"

        feedback.append(
            "Good speaking pace."
        )

    return {
        "transcript": transcript,
        "confidence_score":
            confidence_score,
        "communication_score":
            communication_score,
        "words_per_minute":
            words_per_minute,
        "pace_rating":
            pace_rating,
        "feedback":
            feedback,
    }