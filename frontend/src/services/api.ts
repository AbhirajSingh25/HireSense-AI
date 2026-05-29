const API_BASE_URL =
  "https://hiresense-ai-3jl0.onrender.com";


function getAuthHeaders() {

  const token =
    localStorage.getItem(
      "token"
    );

  return {

    "Content-Type":
      "application/json",

    Authorization:
      `Bearer ${token}`,
  };
}


export async function signup(
  data: any
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

        body: JSON.stringify(
          data
        ),
      }
    );

  return response.json();
}


export async function login(
  data: any
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

        body: JSON.stringify(
          data
        ),
      }
    );

  return response.json();
}


export async function getDashboard(
  userId: number
) {

  const response =
    await fetch(

      `${API_BASE_URL}/dashboard/${userId}`,

      {
        headers:
          getAuthHeaders(),
      }
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

        headers:
          getAuthHeaders(),

        body: JSON.stringify(
          data
        ),
      }
    );

  return response.json();
}


export async function getHistory(
  userId: number
) {

  const response =
    await fetch(

      `${API_BASE_URL}/history/${userId}`,

      {
        headers:
          getAuthHeaders(),
      }
    );

  return response.json();
}


export async function getLeaderboard() {

  const response =
    await fetch(

      `${API_BASE_URL}/leaderboard`,

      {
        headers:
          getAuthHeaders(),
      }
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

        headers:
          getAuthHeaders(),

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

        headers:
          getAuthHeaders(),

        body: JSON.stringify({

          question,
          answer,
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

        headers:
          getAuthHeaders(),

        body: JSON.stringify({

          question,
          answer,
          history,
        }),
      }
    );

  return response.json();
}


export async function getFinalReport() {

  const response =
    await fetch(

      `${API_BASE_URL}/final-report`,

      {
        method: "POST",

        headers:
          getAuthHeaders(),
      }
    );

  return response.json();
}


export async function speechAnalysis(
  transcript: string
) {

  const response =
    await fetch(

      `${API_BASE_URL}/speech-analysis`,

      {
        method: "POST",

        headers:
          getAuthHeaders(),

        body: JSON.stringify({
          transcript,
        }),
      }
    );

  return response.json();
}


export async function liveInterviewAnalysis(

  transcript: string,

  role: string

) {

  const response =
    await fetch(

      `${API_BASE_URL}/live-interview-analysis`,

      {
        method: "POST",

        headers:
          getAuthHeaders(),

        body: JSON.stringify({

          transcript,
          role,
        }),
      }
    );

  return response.json();
}