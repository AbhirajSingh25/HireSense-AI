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


  const data =
    await response.json();


  return data;
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


  const data =
    await response.json();


  return data;
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


export async function getAnalytics(
  userId: number
) {

  const response =

    await fetch(

      `${API_URL}/analytics/${userId}`
    );

  return response.json();
}