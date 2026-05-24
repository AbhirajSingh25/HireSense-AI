import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  getInterviewSessions,
} from "../services/api";


function RecruiterDashboard() {

  const [
    sessions,
    setSessions,
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);


  useEffect(() => {

    loadCandidates();

  }, []);


  async function loadCandidates() {

    try {

      const data =
        await getInterviewSessions();

      setSessions(data);

    } catch (error) {

      console.error(error);
    }

    setLoading(false);
  }


  return (

    <MainLayout>

      <div
        className="
          min-h-screen
          text-white
          px-10
          py-12
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
              mb-12
            "
          >

            <div>

              <h1
                className="
                  text-6xl
                  font-bold
                  mb-4
                "
              >
                Recruiter Intelligence
              </h1>

              <p
                className="
                  text-zinc-400
                  text-lg
                "
              >
                AI candidate monitoring and hiring analytics
              </p>

            </div>


            <div
              className="
                bg-cyan-400/10
                border
                border-cyan-400/20
                px-6
                py-4
                rounded-2xl
              "
            >

              <div
                className="
                  text-zinc-400
                  text-sm
                "
              >
                Active Candidates
              </div>

              <div
                className="
                  text-4xl
                  font-bold
                  text-cyan-400
                "
              >

                {sessions.length}

              </div>

            </div>

          </div>


          {loading ? (

            <div
              className="
                text-zinc-400
              "
            >
              Loading recruiter analytics...
            </div>

          ) : (

            <div
              className="
                space-y-8
              "
            >

              {sessions.map(
                (
                  session,
                  index
                ) => {

                  const report =
                    session.final_report;

                  return (

                    <div
                      key={session.id}
                      className="
                        bg-white/5
                        border
                        border-white/10
                        rounded-3xl
                        p-8
                      "
                    >

                      <div
                        className="
                          flex
                          flex-col
                          xl:flex-row
                          xl:items-center
                          xl:justify-between
                          gap-8
                        "
                      >

                        <div>

                          <div
                            className="
                              flex
                              items-center
                              gap-5
                              mb-5
                            "
                          >

                            <div
                              className="
                                w-16
                                h-16
                                rounded-2xl
                                bg-cyan-400
                                flex
                                items-center
                                justify-center
                                text-black
                                font-bold
                                text-2xl
                              "
                            >

                              {index + 1}

                            </div>


                            <div>

                              <div
                                className="
                                  text-3xl
                                  font-bold
                                "
                              >

                                Candidate Interview

                              </div>

                              <div
                                className="
                                  text-zinc-400
                                  mt-1
                                "
                              >

                                {session.role}
                                {" • "}
                                {session.level}

                              </div>

                            </div>

                          </div>


                          <div
                            className="
                              flex
                              flex-wrap
                              gap-4
                            "
                          >

                            <div
                              className="
                                bg-cyan-400/10
                                border
                                border-cyan-400/20
                                px-4
                                py-2
                                rounded-2xl
                                text-cyan-300
                              "
                            >

                              Confidence:
                              {" "}
                              {
                                report?.confidence
                              }%

                            </div>


                            <div
                              className="
                                bg-green-400/10
                                border
                                border-green-400/20
                                px-4
                                py-2
                                rounded-2xl
                                text-green-300
                              "
                            >

                              Communication:
                              {" "}
                              {
                                report?.communication
                              }%

                            </div>


                            <div
                              className="
                                bg-purple-400/10
                                border
                                border-purple-400/20
                                px-4
                                py-2
                                rounded-2xl
                                text-purple-300
                              "
                            >

                              Technical:
                              {" "}
                              {
                                report?.technical
                              }%

                            </div>

                          </div>

                        </div>


                        <div
                          className="
                            min-w-[280px]
                          "
                        >

                          <div
                            className="
                              bg-white/5
                              rounded-3xl
                              p-6
                            "
                          >

                            <div
                              className="
                                text-zinc-400
                                mb-3
                              "
                            >
                              AI Hiring Recommendation
                            </div>

                            <div
                              className="
                                text-3xl
                                font-bold
                                text-yellow-400
                                mb-6
                              "
                            >

                              {
                                report?.recommendation
                              }

                            </div>


                            <div
                              className="
                                text-zinc-300
                                leading-7
                              "
                            >

                              {
                                report?.summary
                              }

                            </div>

                          </div>

                        </div>

                      </div>


                      <div
                        className="
                          mt-8
                          grid
                          lg:grid-cols-2
                          gap-8
                        "
                      >

                        <div>

                          <div
                            className="
                              text-2xl
                              font-bold
                              mb-5
                            "
                          >
                            Candidate Strengths
                          </div>

                          <div
                            className="
                              flex
                              flex-wrap
                              gap-4
                            "
                          >

                            {
                              report?.strengths?.map(
                                (
                                  item: string,
                                  idx: number
                                ) => (

                                  <div
                                    key={idx}
                                    className="
                                      bg-cyan-400/10
                                      border
                                      border-cyan-400/20
                                      text-cyan-300
                                      px-5
                                      py-3
                                      rounded-2xl
                                    "
                                  >

                                    {item}

                                  </div>
                                )
                              )
                            }

                          </div>

                        </div>


                        <div>

                          <div
                            className="
                              text-2xl
                              font-bold
                              mb-5
                            "
                          >
                            Improvement Areas
                          </div>

                          <div
                            className="
                              flex
                              flex-wrap
                              gap-4
                            "
                          >

                            {
                              report?.improvements?.map(
                                (
                                  item: string,
                                  idx: number
                                ) => (

                                  <div
                                    key={idx}
                                    className="
                                      bg-red-500/10
                                      border
                                      border-red-500/20
                                      text-red-300
                                      px-5
                                      py-3
                                      rounded-2xl
                                    "
                                  >

                                    {item}

                                  </div>
                                )
                              )
                            }

                          </div>

                        </div>

                      </div>


                      <div
                        className="
                          mt-8
                          flex
                          gap-4
                        "
                      >

                        <button
                          className="
                            bg-green-500
                            hover:bg-green-400
                            text-white
                            px-6
                            py-3
                            rounded-2xl
                            font-semibold
                            transition-all
                          "
                        >

                          Shortlist Candidate

                        </button>


                        <button
                          className="
                            bg-yellow-500
                            hover:bg-yellow-400
                            text-black
                            px-6
                            py-3
                            rounded-2xl
                            font-semibold
                            transition-all
                          "
                        >

                          Schedule Next Round

                        </button>


                        <button
                          className="
                            bg-red-500/10
                            hover:bg-red-500/20
                            border
                            border-red-500/20
                            text-red-300
                            px-6
                            py-3
                            rounded-2xl
                            font-semibold
                            transition-all
                          "
                        >

                          Reject

                        </button>

                      </div>

                    </div>
                  );
                }
              )}

            </div>
          )}

        </div>

      </div>

    </MainLayout>
  );
}

export default RecruiterDashboard;