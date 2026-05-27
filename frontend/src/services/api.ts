const API_BASE_URL =
  import.meta.env.VITE_API_URL;


export async function signup(

  username: string,
  email: string,
  password: string

) {

  const response =
    await fetch(

      `${API_BASE_URL}/auth/signup`,

      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({

          username,
          email,
          password,
        }),
      }
    );

  return response.json();
}


export async function login(

  email: string,
  password: string

) {

  const response =
    await fetch(

      `${API_BASE_URL}/auth/login`,

      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({

          email,
          password,
        }),
      }
    );

  return response.json();
}


export async function generateQuestions(
  role: string
) {

  const response =
    await fetch(

      `${API_BASE_URL}/generate-questions?role=${role}`
    );

  return response.json();
}


export async function evaluateAnswer(

  question: string,
  answer: string

) {

  const response =
    await fetch(

      `${API_BASE_URL}/evaluate-answer`,

      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({

          question,
          answer,
        }),
      }
    );

  return response.json();
}


export async function getFinalReport(
  p0: {}
) {

  const response =
    await fetch(

      `${API_BASE_URL}/final-report`
    );

  return response.json();
}


export async function saveInterview(
  data: any
) {

  const response =
    await fetch(

      `${API_BASE_URL}/save-interview`,

      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(data),
      }
    );

  return response.json();
}


export async function getHistory(
  userId: number
) {

  const response =
    await fetch(

      `${API_BASE_URL}/interviews/${userId}`
    );

  return response.json();
}


export async function getInterviewSessions(
  userId: number
) {

  const response =
    await fetch(

      `${API_BASE_URL}/interviews/${userId}`
    );

  return response.json();
}


export async function getDashboardStats(
  userId: number
) {

  const response =
    await fetch(

      `${API_BASE_URL}/dashboard/${userId}`
    );

  return response.json();
}


export async function getLeaderboard() {

  const response =
    await fetch(

      `${API_BASE_URL}/leaderboard/`
    );

  return response.json();
}
export async function analyzeSpeech(
  transcript: string
) {

  const response =
    await fetch(

      `${API_BASE_URL}/speech-analysis`,

      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          transcript,
        }),
      }
    );

  return response.json();
}