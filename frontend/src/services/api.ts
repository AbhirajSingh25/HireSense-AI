const API_URL =

  import.meta.env.VITE_API_URL ||

  "http://127.0.0.1:8000";


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

  role: string,
  level: string,
  resumeAnalysis: string
) {

  const response =

    await fetch(

      `${API_URL}/generate-questions?role=${role}&level=${level}&resume=${resumeAnalysis}`
    );

  return response.json();
}


export async function evaluateAnswer(
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
          answer,
        }),
      }
    );

  return response.json();
}


export async function generateFollowupQuestion(

  question: string,
  answer: string,
  role: string,
  level: string
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

          question,
          answer,
          role,
          level,
        }),
      }
    );

  return response.json();
}


export async function getFinalReport() {

  const response =

    await fetch(

      `${API_URL}/final-report`
    );

  return response.json();
}


export async function saveInterview(
  data: any
) {

  const response =

    await fetch(

      `${API_URL}/interviews/save`,

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