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
        `API Error ${response.status}`
      );
    }

    return response.json();

  } catch (error) {

    console.error(
      "API Error:",
      error
    );

    throw error;
  }
}

/* ====================================
   AUTH
==================================== */

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

/* ====================================
   DASHBOARD
==================================== */

export async function getDashboardStats() {
  return request(
    "/dashboard"
  );
}

/* ====================================
   INTERVIEW
==================================== */

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
    "/api/interview/evaluate-answer",
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
  question: string,
  answer: string,
  role: string,
  level: string
) {
  return request(
    "/api/interview/generate-followup",
    {
      method: "POST",
      body: JSON.stringify({
        question,
        answer,
        role,
        level,
      }),
    }
  );
}

export async function generateInterviewReport(
  data: {
    role: string;
    level: string;
    questions: string[];
    answers: string[];
    evaluations: any[];
  }
) {
  return request(
    "/api/interview/generate-report",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

export async function saveInterview(
  data: {
    role: string;
    level: string;
    questions: string[];
    answers: string[];
    evaluations: any[];
  }
) {
  return request(
    "/api/interview/save-interview",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

export async function getInterviewHistory() {
  return request(
    "/api/interview/history"
  );
}

/* ====================================
   SPEECH AI
==================================== */

export async function analyzeSpeech(
  formData: FormData
) {
  const response = await fetch(
    `${API_BASE_URL}/speech/analyze`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(
      "Speech analysis failed"
    );
  }

  return response.json();
}

/* ====================================
   VISION AI
==================================== */

export async function analyzeVision(
  formData: FormData
) {
  const response = await fetch(
    `${API_BASE_URL}/vision/analyze`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(
      "Vision analysis failed"
    );
  }

  return response.json();
}

/* ====================================
   LEADERBOARD
==================================== */

export async function getLeaderboard() {
  return request(
    "/leaderboard"
  );
}

/* ====================================
   AI COPILOT
==================================== */

export async function askAICopilot(
  message: string
) {
  return request(
    "/api/ai-copilot",
    {
      method: "POST",
      body: JSON.stringify({
        message,
      }),
    }
  );
}
export async function getFinalReport() {
  return request("/final-report");
}

export async function getInterviewSessions() {
  return request(
    "/api/interview/history"
  );
}
export async function getInterviewSession(
  id: string
) {
  return request(
    `/api/interview/session/${id}`
  );
}

export async function getLatestReport() {
  return request(
    "/api/interview/latest-report"
  );
}

