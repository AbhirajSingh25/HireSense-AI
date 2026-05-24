import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {

  Brain,

  ShieldCheck,

  AlertTriangle,

  BadgeCheck,

} from "lucide-react";

import {
  getInterviewSessions,
} from "../services/api";

import {
  generateRecruiterInsights,
} from "../utils/recruiterInsights";


function RecruiterInsights() {

  const [
    insights,
    setInsights,
  ] = useState<any[]>([]);


  useEffect(() => {

    loadInsights();

  }, []);


  async function loadInsights() {

    try {

      const data =
        await getInterviewSessions();

      const processed =
        data.map(
          (item: any) => {

            const aiInsight =

              generateRecruiterInsights(
                item.final_report
              );

            return {

              ...item,

              aiInsight,
            };
          }
        );

      setInsights(
        processed
      );

    } catch (error) {

      console.error(error);
    }
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
              mb-14
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
                Recruiter AI Insights
              </h1>

              <p
                className="
                  text-zinc-400
                  text-lg
                "
              >
                Enterprise hiring intelligence engine
              </p>

            </div>


            <div
              className="
                bg-cyan-400/10
                border
                border-cyan-400/20
                rounded-3xl
                px-8
                py-5
              "
            >

              <div
                className="
                  text-zinc-400
                  text-sm
                "
              >
                AI Candidates Reviewed
              </div>

              <div
                className="
                  text-5xl
                  font-bold
                  text-cyan-400
                "
              >

                {insights.length}

              </div>

            </div>

          </div>


          <div
            className="
              space-y-8
            "
          >

            {
              insights.map(
                (
                  item,
                  index
                ) => (

                  <div
                    key={index}
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
                        gap-10
                      "
                    >

                      <div>

                        <div
                          className="
                            text-4xl
                            font-bold
                            mb-4
                          "
                        >

                          Candidate
                          {" "}
                          {index + 1}

                        </div>

                        <div
                          className="
                            text-zinc-400
                            text-lg
                          "
                        >

                          {item.role}
                          {" • "}
                          {item.level}

                        </div>

                      </div>


                      <div
                        className="
                          grid
                          md:grid-cols-2
                          xl:grid-cols-4
                          gap-5
                        "
                      >

                        <div
                          className="
                            bg-cyan-400/10
                            border
                            border-cyan-400/20
                            rounded-2xl
                            p-5
                          "
                        >

                          <div
                            className="
                              flex
                              items-center
                              gap-3
                              mb-3
                            "
                          >

                            <Brain
                              className="
                                text-cyan-400
                              "
                            />

                            <div
                              className="
                                text-zinc-400
                              "
                            >
                              Employability
                            </div>

                          </div>

                          <div
                            className="
                              text-4xl
                              font-bold
                              text-cyan-400
                            "
                          >

                            {
                              item.aiInsight
                                .employabilityScore
                            }

                          </div>

                        </div>


                        <div
                          className="
                            bg-green-400/10
                            border
                            border-green-400/20
                            rounded-2xl
                            p-5
                          "
                        >

                          <div
                            className="
                              flex
                              items-center
                              gap-3
                              mb-3
                            "
                          >

                            <BadgeCheck
                              className="
                                text-green-400
                              "
                            />

                            <div
                              className="
                                text-zinc-400
                              "
                            >
                              Hiring Status
                            </div>

                          </div>

                          <div
                            className="
                              text-xl
                              font-bold
                              text-green-400
                            "
                          >

                            {
                              item.aiInsight
                                .hiring
                            }

                          </div>

                        </div>


                        <div
                          className="
                            bg-purple-400/10
                            border
                            border-purple-400/20
                            rounded-2xl
                            p-5
                          "
                        >

                          <div
                            className="
                              flex
                              items-center
                              gap-3
                              mb-3
                            "
                          >

                            <ShieldCheck
                              className="
                                text-purple-400
                              "
                            />

                            <div
                              className="
                                text-zinc-400
                              "
                            >
                              Strengths
                            </div>

                          </div>

                          <div
                            className="
                              space-y-2
                              text-sm
                              text-purple-300
                            "
                          >

                            {
                              item.aiInsight
                                .strengths
                                .map(
                                  (
                                    strength: string,
                                    idx: number
                                  ) => (

                                    <div
                                      key={idx}
                                    >

                                      • {strength}

                                    </div>
                                  )
                                )
                            }

                          </div>

                        </div>


                        <div
                          className="
                            bg-red-400/10
                            border
                            border-red-400/20
                            rounded-2xl
                            p-5
                          "
                        >

                          <div
                            className="
                              flex
                              items-center
                              gap-3
                              mb-3
                            "
                          >

                            <AlertTriangle
                              className="
                                text-red-400
                              "
                            />

                            <div
                              className="
                                text-zinc-400
                              "
                            >
                              Weaknesses
                            </div>

                          </div>

                          <div
                            className="
                              space-y-2
                              text-sm
                              text-red-300
                            "
                          >

                            {
                              item.aiInsight
                                .weaknesses
                                .map(
                                  (
                                    weakness: string,
                                    idx: number
                                  ) => (

                                    <div
                                      key={idx}
                                    >

                                      • {weakness}

                                    </div>
                                  )
                                )
                            }

                          </div>

                        </div>

                      </div>

                    </div>

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

export default RecruiterInsights;