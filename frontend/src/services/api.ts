const API_BASE_URL =
  "https://hiresense-ai-3jl0.onrender.com";


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


export async function getDashboard(
  userId: number
) {

  const response =
    await fetch(

      `${API_BASE_URL}/dashboard/${userId}`
    );

  return response.json();
}


export async function getDashboardStats(
  userId: number
) {

  return getDashboard(userId);
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


export async function getInterviewSessions(
  userId: number
) {

  const response =
    await fetch(

      `${API_BASE_URL}/history/${userId}`
    );

  return response.json();
}


export async function getHistory(
  userId: number
) {

  return getInterviewSessions(
    userId
  );
}


export async function getLeaderboard() {

  const response =
    await fetch(

      `${API_BASE_URL}/leaderboard`
    );

  return response.json();
}


export async function generateQuestions(
  role: string
) {

  const response =
    await fetch(

      `${API_BASE_URL}/generate-questions`,

      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          role,
        }),
      }
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
  _data?: any
) {

  const response =
    await fetch(

      `${API_BASE_URL}/final-report`,

      {
        method: "POST",
      }
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


export async function analyzeLiveInterview(

  transcript: string,
  role: string

) {

  const response =
    await fetch(

      `${API_BASE_URL}/live-interview-analysis`,

      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({

          transcript,
          role,
        }),
      }
    );

  return response.json();
}
export async function generateFollowupQuestion(

  question: string,
  answer: string,
  history: any[]

) {

  const response =
    await fetch(

      `${API_BASE_URL}/generate-followup`,

      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({

          question,
          answer,
          history,
        }),
      }
    );

  return response.json();
}