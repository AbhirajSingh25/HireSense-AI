import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import MainLayout from "../components/MainLayout";

import {
  getInterviewSession,
} from "../services/api";

function InterviewPlayback() {

  const { id } = useParams();

  const [
    session,
    setSession,
  ] = useState<any>(null);

  useEffect(() => {

    loadSession();

  }, []);

  async function loadSession() {

    try {

      const data =
        await getInterviewSession(
          id || ""
        );

      setSession(data);

    } catch (error) {

      console.error(error);
    }
  }

  if (!session) {

    return (

      <MainLayout>

        <div className="p-10">

          Loading Session...

        </div>

      </MainLayout>
    );
  }

  return (

    <MainLayout>

      <div className="max-w-6xl mx-auto">

        <h1
          className="
            text-5xl
            font-black
            mb-10
          "
        >
          Interview Playback
        </h1>

        <div
          className="
            bg-zinc-900
            border
            border-zinc-800
            rounded-3xl
            p-8
          "
        >

          <h2
            className="
              text-3xl
              font-bold
              mb-2
            "
          >
            {session.role}
          </h2>

          <p
            className="
              text-zinc-400
              mb-8
            "
          >
            {session.level}
          </p>

          <div
            className="
              space-y-8
            "
          >

            {
              session.questions?.map(
                (
                  q: string,
                  index: number
                ) => (

                  <div
                    key={index}
                    className="
                      border-b
                      border-zinc-800
                      pb-6
                    "
                  >

                    <h3
                      className="
                        text-cyan-400
                        font-bold
                        mb-2
                      "
                    >
                      Question {index + 1}
                    </h3>

                    <p
                      className="
                        mb-4
                      "
                    >
                      {q}
                    </p>

                    <h3
                      className="
                        text-green-400
                        font-bold
                        mb-2
                      "
                    >
                      Candidate Answer
                    </h3>

                    <p>
                      {
                        session.answers[
                          index
                        ]
                      }
                    </p>

                  </div>
                )
              )
            }

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default InterviewPlayback;