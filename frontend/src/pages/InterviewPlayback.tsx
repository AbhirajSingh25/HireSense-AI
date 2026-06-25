import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import MainLayout from "../components/MainLayout";

import Card from "../components/ui/Card";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000";

function InterviewPlayback() {

  const { id } = useParams();

  const [
    session,
    setSession,
  ] = useState<any>(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    loadSession();

  }, [id]);

  async function loadSession() {

    try {

      const response = await fetch(
        `${API_BASE_URL}/api/interview/session/${id}`
      );

      const data =
        await response.json();

      setSession(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }

  if (loading) {

    return (

      <MainLayout>

        <div className="p-10">
          Loading Session...
        </div>

      </MainLayout>
    );
  }

  if (!session) {

    return (

      <MainLayout>

        <div className="p-10">
          Session Not Found
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
            mb-8
          "
        >
          Interview Playback
        </h1>

        <Card className="p-6 mb-6">

          <h2 className="text-2xl font-bold">
            {session.role}
          </h2>

          <p className="text-zinc-500">
            {session.level}
          </p>

          <p className="mt-4">
            Overall Score:
            {" "}
            {session.overall_score}
          </p>

        </Card>

        <div className="space-y-6">

          {
            session.questions?.map(
              (
                question: string,
                index: number
              ) => {

                const answer =
                  session.answers?.[index];

                const evaluation =
                  session.evaluations?.[index];

                return (

                  <Card
                    key={index}
                    className="p-6"
                  >

                    <h3
                      className="
                        text-xl
                        font-bold
                        mb-4
                      "
                    >
                      Q{index + 1}: {question}
                    </h3>

                    <p
                      className="
                        text-zinc-300
                        mb-4
                      "
                    >
                      {answer}
                    </p>

                    <div
                      className="
                        grid
                        md:grid-cols-3
                        gap-4
                        mb-4
                      "
                    >

                      <div>
                        Confidence:
                        {" "}
                        {evaluation?.confidence}
                      </div>

                      <div>
                        Communication:
                        {" "}
                        {evaluation?.communication}
                      </div>

                      <div>
                        Technical:
                        {" "}
                        {evaluation?.technical}
                      </div>

                    </div>

                    <p
                      className="
                        text-green-400
                      "
                    >
                      {evaluation?.feedback}
                    </p>

                  </Card>
                );
              }
            )
          }

        </div>

      </div>

    </MainLayout>
  );
}

export default InterviewPlayback;