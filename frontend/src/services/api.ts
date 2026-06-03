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

  Authorization:
    `Bearer ${
      localStorage.getItem(
        "token"
      ) || ""
    }`,

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

      data?.error ||

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

    "/generate-questions",

    {
      method: "POST",

      body: JSON.stringify({
        role,
      }),
    }
  );
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


export async function generateFollowup(

  question: string,

  answer: string,

  history: any[]
) {

  return request(

    "/generate-followup",

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


export async function startInterview(

  role: string,

  level: string
) {

  return request(

    "/ai/start-interview",

    {
      method: "POST",

      body: JSON.stringify({

        role,
        level,
      }),
    }
  );
}


export async function getNextQuestion(

  role: string,

  level: string,

  previousQuestion: string,

  previousAnswer: string
) {

  return request(

    "/ai/next-question",

    {
      method: "POST",

      body: JSON.stringify({

        role,
        level,

        previous_question:
          previousQuestion,

        previous_answer:
          previousAnswer,
      }),
    }
  );
}


export async function aiEvaluate(

  question: string,

  answer: string
) {

  return request(

    "/ai/evaluate",

    {
      method: "POST",

      body: JSON.stringify({

        question,
        answer,
      }),
    }
  );
}


export async function analyzeSpeech(
  transcript: string
) {

  return request(

    "/speech-analysis",

    {
      method: "POST",

      body: JSON.stringify({
        transcript,
      }),
    }
  );
}


export async function analyzeVision(
  imageData: any = {}
) {

  return request(

    "/vision-analysis",

    {
      method: "POST",

      body: JSON.stringify(
        imageData
      ),
    }
  );
}


export async function analyzeLiveInterview(
  transcript: string
) {

  return request(

    "/live-interview-analysis",

    {
      method: "POST",

      body: JSON.stringify({
        transcript,
      }),
    }
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


export async function getInterviewSessions(
  userId: number
) {

  return request(
    `/history/${userId}`
  );
}


export async function getLeaderboard() {

  return request(
    "/leaderboard"
  );
}


export async function getDashboard(
  userId: number
) {

  return request(
    `/dashboard/${userId}`
  );
}


export async function getFinalReport(
  data?: any
) {

  return request(

    "/final-report",

    {
      method: "POST",

      body: JSON.stringify(
        data || {}
      ),
    }
  );
}


export async function
getAIInterviewFeedback(

  transcript: string
) {

  return request(

    "/ai-interview-feedback",

    {
      method: "POST",

      body: JSON.stringify({

        transcript,
      }),
    }
  );
}


export async function generateFinalReport(
  data: any
) {

  return request(

    "/generate-report",

    {
      method: "POST",

      body: JSON.stringify(data),
    }
  );
}
export async function
generateDynamicQuestion(

  role: string,

  level: string,

  transcript: string
) {

  return request(

    "/dynamic-question",

    {
      method: "POST",

      body: JSON.stringify({

        role,
        level,
        transcript,
      }),
    }
  );
}
export async function
analyzeBehavior(

  confidence: number,

  eye_contact: number,

  communication: number,

  transcript: string
) {

  return request(

    "/behavior-analysis",

    {
      method: "POST",

      body: JSON.stringify({

        confidence,

        eye_contact,

        communication,

        transcript,
      }),
    }
  );
}
