import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import Card from "../components/ui/Card";

import {
  Clock,
  Brain,
} from "lucide-react";

import {
  getInterviewSessions,
} from "../services/api";


function InterviewHistory() {

  const [
    sessions,
    setSessions,
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);


  useEffect(() => {

    loadSessions();

  }, []);


  async function loadSessions() {

    try {

      const data =
        await getInterviewSessions();

      setSessions(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }


  return (

    <MainLayout>

      <div
        className="
          max-w-7xl
          mx-auto
        "
      >

        <div className="mb-10">

          <h1
            className="
              text-6xl
              font-black
              mb-4
            "
          >
            Interview History
          </h1>

          <p
            className="
              text-zinc-500
              text-xl
            "
          >
            Review your previous interview sessions
          </p>

        </div>


        {
          loading

          ? (

            <div
              className="
                text-zinc-400
                text-xl
              "
            >
              Loading sessions...
            </div>

          ) : (

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-6
              "
            >

              {
                sessions.map(
                  (
                    session,
                    index
                  ) => (

                    <Card
                      key={index}
                      className="
                        p-8
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          mb-6
                        "
                      >

                        <Brain
                          className="
                            text-red-400
                          "
                          size={32}
                        />

                        <span
                          className="
                            text-sm
                            text-zinc-500
                          "
                        >
                          Session
                        </span>

                      </div>


                      <h2
                        className="
                          text-2xl
                          font-bold
                          mb-3
                        "
                      >
                        {
                          session.role ||
                          "Frontend Developer"
                        }
                      </h2>


                      <p
                        className="
                          text-zinc-500
                          mb-6
                        "
                      >
                        {
                          session.level ||
                          "Intermediate"
                        }
                      </p>


                      <div
                        className="
                          flex
                          items-center
                          gap-3
                          text-zinc-400
                        "
                      >

                        <Clock size={18} />

                        {
                          session.created_at ||

                          "Recently"
                        }

                      </div>

                    </Card>
                  )
                )
              }

            </div>
          )
        }

      </div>

    </MainLayout>
  );
}

export default InterviewHistory;