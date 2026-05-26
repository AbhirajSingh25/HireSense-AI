const API_URL =

  import.meta.env.VITE_API_URL ||

  "https://hiresense-ai-3jl0.onrender.com";



export async function signup(

  username: string,
  email: string,
  password: string
) {

  const response =

    await fetch(

      `${API_URL}/auth/signup`,

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

      `${API_URL}/auth/login`,

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

      `${API_URL}/generate-questions?role=${role}`
    );

  return response.json();
}



export async function evaluateAnswer(
  question: string,
  answer: string
) {

  const response =

    await fetch(

      `${API_URL}/evaluate-answer`,

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



export async function generateFollowupQuestion(
  answer: string
) {

  const response =

    await fetch(

      `${API_URL}/followup-question`,

      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({

          answer,
        }),
      }
    );

  return response.json();
}



export async function getFinalReport(
  data: any
) {

  const response =

    await fetch(

      `${API_URL}/final-report`,

      {
        method: "GET",
      }
    );

  return response.json();
}



export async function saveInterview(
  data: any
) {

  const response =

    await fetch(

      `${API_URL}/save-interview`,

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

      `${API_URL}/interviews/${userId}`
    );

  return response.json();
}



export async function getHistory(
  userId: number
) {

  const response =

    await fetch(

      `${API_URL}/interviews/${userId}`
    );

  return response.json();
}



export async function getDashboardStats(
  userId: number
) {

  const response =

    await fetch(

      `${API_URL}/dashboard/${userId}`
    );

  return response.json();
}



export async function getAnalytics(
  userId: number
) {

  const response =

    await fetch(

      `${API_URL}/analytics/${userId}`
    );

  return response.json();
}