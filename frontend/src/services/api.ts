const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000";


async function request(
  endpoint: string,
  options: RequestInit = {}
) {

  try {

    const response = await fetch(
      `${API_BASE_URL}${endpoint}`,
      {
        headers: {
          "Content-Type":
            "application/json",
        },

        ...options,
      }
    );

    if (!response.ok) {

      throw new Error(
        `API Error: ${response.status}`
      );
    }

    return response.json();

  } catch (error) {

    console.error(
      "API REQUEST FAILED:",
      error
    );

    throw error;
  }
}



/* =========================
   AUTH
========================= */

export async function signup(
  username: string,
  email: string,
  password: string
) {

  return request(
    "/auth/signup",
    {
      method: "POST",

      body: JSON.stringify({
        username,
        email,
        password,
      }),
    }
  );
}


export async function login(
  email: string,
  password: string
) {

  return request(
    "/auth/login",
    {
      method: "POST",

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );
}



/* =========================
   DASHBOARD
========================= */

export async function getDashboardStats() {

  return request(
    "/dashboard"
  );
}



/* =========================
   INTERVIEW
========================= */

export async function generateQuestions(
  role: string,
  level: string
) {

  return request(
    "/generate-questions",
    {
      method: "POST",

      body: JSON.stringify({
        role,
        level,
      }),
    }
  );
}


export async function aiEvaluate(
  question: string,
  answer: string
) {

  return request(
    "/evaluate-answer",
    {
      method: "POST",

      body: JSON.stringify({
        question,
        answer,
      }),
    }
  );
}


export async function generateFollowupQuestion(
  previous_question: string,
  answer: string,
  role: string,
  level: string
) {

  return request(
    "/followup-question",
    {
      method: "POST",

      body: JSON.stringify({
        previous_question,
        answer,
        role,
        level,
      }),
    }
  );
}


export async function getFinalReport() {

  return request(
    "/final-report"
  );
}


export async function saveInterview(
  data: any
) {

  return request(
    "/save-interview",
    {
      method: "POST",

      body: JSON.stringify(data),
    }
  );
}


export async function getInterviewHistory() {

  return request(
    "/interview-history"
  );
}


export async function getLeaderboard() {

  return request(
    "/leaderboard"
  );
}
export async function askAICopilot(
  message: string
) {

  return request(
    "/ai-copilot",
    {
      method: "POST",

      body: JSON.stringify({
        message,
      }),
    }
  );
}