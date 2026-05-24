import cv2


face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades +
    "haarcascade_frontalface_default.xml"
)


def analyze_eye_contact(image_path: str):

    image = cv2.imread(image_path)

    if image is None:

        return {
            "face_detected": False,
            "eye_contact_score": 0,
            "attention_status": "Invalid Image"
        }

    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    faces = face_cascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(30, 30)
    )

    if len(faces) == 0:

        return {
            "face_detected": False,
            "eye_contact_score": 0,
            "attention_status": "No Face Detected"
        }

    face_detected = True

    face_size = faces[0][2] * faces[0][3]

    eye_contact_score = min(
        100,
        round(face_size / 100)
    )

    if eye_contact_score > 75:

        attention_status = "Excellent Attention"

    elif eye_contact_score > 50:

        attention_status = "Moderate Attention"

    else:

        attention_status = "Poor Attention"

    return {
        "face_detected": face_detected,
        "eye_contact_score": eye_contact_score,
        "attention_status": attention_status
    }