const API_BASE_URL =

  import.meta.env
    .VITE_API_BASE_URL ||

  "http://127.0.0.1:8000";


async function request(

  endpoint: string,

  options: RequestInit = {}
) {

  const response = await fetch(

    `${API_BASE_URL}${endpoint}`,

    {
      headers: {

        "Content-Type":
          "application/json",

        ...options.headers,
      },

      ...options,
    }
  );

  let data: any = null;

  try {

    data =
      await response.json();

  } catch {

    data = null;
  }

  if (!response.ok) {

    throw new Error(

      data?.detail ||

      data?.message ||

      "API request failed"
    );
  }

  return data;
}


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


export async function generateQuestions(
  role: string
) {

  return request(

    `/generate-questions?role=${role}&level=Intermediate`
  );
}


export async function startInterview(

  role: string,

  level: string
) {

  return request(

    `/generate-questions?role=${role}&level=${level}`
  );
}


export async function getNextQuestion(

  role: string,

  level: string,

  previousQuestion: string,

  previousAnswer: string
) {

  return {

    question:
      "Can you explain that further?"
  };
}


export async function evaluateAnswer(

  question: string,

  answer: string,

  history: any[] = []
) {

  return request(

    "/evaluate-answer",

    {
      method: "POST",

      body: JSON.stringify({

        question,
        answer,
        history,
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


export async function generateFollowup(

  question: string,

  answer: string,

  history: any[]
) {

  return request(

    "/followup-question",

    {
      method: "POST",

      body: JSON.stringify({

        previous_question:
          question,

        answer,

        role:
          "Frontend Developer",

        level:
          "Intermediate",
      }),
    }
  );
}


export async function analyzeSpeech(
  transcript: string
) {

  return {

    clarity: 88,
    confidence: 84,
    pace: 79,
    filler_words: 6,
    transcript,
  };
}


export async function analyzeVision() {

  return {

    eye_contact: 87,
    posture: 82,
    confidence: 90,
    attention: 85,
  };
}


export async function analyzeLiveInterview(
  transcript: string
) {

  return {

    score: 88,
    feedback:
      "Good communication and confidence",
    transcript,
  };
}


export async function generateFinalReport(
  data?: any
) {

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

  return [

    {
      name: "John",
      score: 96,
    },

    {
      name: "Sarah",
      score: 92,
    },

    {
      name: "Alex",
      score: 88,
    },
  ];
}


export async function getDashboard() {

  return {

    confidence: 87,
    communication: 90,
    technical: 85,
    interviews: 24,
  };
}
export async function getFinalReport(
  data?: any
) {

  return generateFinalReport(
    data
  );
}


export async function getInterviewSessions(
  userId?: number
) {

  return getInterviewHistory();
}