import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  getInterviewSessions,
} from "../services/api";


function InterviewPlayback() {

  const [
    sessions,
    setSessions,
  ] = useState<any[]>([]);


  useEffect(() => {

    loadSessions();

  }, []);


  async function loadSessions() {

    try {

      const user =
        JSON.parse(
          localStorage.getItem("user") || "{}"
        );


      const data =
        await getInterviewSessions(
          user.id || 1
        );


      setSessions(data);

    } catch (error) {

      console.error(error);
    }
  }


  return (

    <MainLayout>

      <div>

        <h1
          className="
            text-4xl
            font-bold
            text-white
            mb-8
          "
        >
          Interview Playback
        </h1>


        <div
          className="
            space-y-6
          "
        >

          {sessions.map((session) => (

            <div
              key={session.id}
              className="
                bg-white/5
                border
                border-white/10
                rounded-2xl
                p-6
              "
            >

              <h2
                className="
                  text-2xl
                  font-semibold
                  text-white
                  mb-3
                "
              >
                Session #{session.id}
              </h2>

              <p
                className="
                  text-gray-300
                  leading-7
                "
              >
                {session.transcript}
              </p>

            </div>
          ))}

        </div>

      </div>

    </MainLayout>
  );
}

export default InterviewPlayback;