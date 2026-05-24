import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {

  Shield,

  Users,

  Brain,

  Activity,

  Database,

  Trophy,

} from "lucide-react";

import {
  getInterviewSessions,
} from "../services/api";


function AdminPanel() {

  const [
    sessions,
    setSessions,
  ] = useState<any[]>([]);


  useEffect(() => {

    loadData();

  }, []);


  async function loadData() {

    try {

      const data =
        await getInterviewSessions();

      setSessions(data);

    } catch (error) {

      console.error(error);
    }
  }


  const totalSessions =
    sessions.length;


  const avgScore =
    sessions.length > 0

      ? Math.floor(

          sessions.reduce(

            (
              acc,
              item
            ) => {

              const report =
                item.final_report;

              return (

                acc +

                (
                  report.confidence +
                  report.communication +
                  report.technical
                ) / 3
              );
            },

            0
          ) / sessions.length
        )

      : 0;


  const topRole =
    sessions.length > 0

      ? sessions[0].role

      : "Software Engineer";


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
                AI Admin Center
              </h1>

              <p
                className="
                  text-zinc-400
                  text-lg
                "
              >
                Enterprise intelligence operations dashboard
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
                  mb-1
                "
              >
                Platform Status
              </div>

              <div
                className="
                  text-4xl
                  font-bold
                  text-green-400
                "
              >
                ACTIVE
              </div>

            </div>

          </div>


          <div
            className="
              grid
              md:grid-cols-2
              xl:grid-cols-4
              gap-8
              mb-12
            "
          >

            <div
              className="
                bg-cyan-400/10
                border
                border-cyan-400/20
                rounded-3xl
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

                <Users
                  className="
                    text-cyan-400
                  "
                  size={34}
                />

                <div
                  className="
                    text-zinc-400
                  "
                >
                  Candidates
                </div>

              </div>

              <div
                className="
                  text-6xl
                  font-bold
                  text-cyan-400
                "
              >

                {totalSessions}

              </div>

            </div>


            <div
              className="
                bg-purple-400/10
                border
                border-purple-400/20
                rounded-3xl
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
                    text-purple-400
                  "
                  size={34}
                />

                <div
                  className="
                    text-zinc-400
                  "
                >
                  AI Score
                </div>

              </div>

              <div
                className="
                  text-6xl
                  font-bold
                  text-purple-400
                "
              >

                {avgScore}

              </div>

            </div>


            <div
              className="
                bg-green-400/10
                border
                border-green-400/20
                rounded-3xl
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

                <Activity
                  className="
                    text-green-400
                  "
                  size={34}
                />

                <div
                  className="
                    text-zinc-400
                  "
                >
                  Interviews
                </div>

              </div>

              <div
                className="
                  text-6xl
                  font-bold
                  text-green-400
                "
              >

                {totalSessions}

              </div>

            </div>


            <div
              className="
                bg-yellow-400/10
                border
                border-yellow-400/20
                rounded-3xl
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

                <Trophy
                  className="
                    text-yellow-400
                  "
                  size={34}
                />

                <div
                  className="
                    text-zinc-400
                  "
                >
                  Top Role
                </div>

              </div>

              <div
                className="
                  text-2xl
                  font-bold
                  text-yellow-400
                "
              >

                {topRole}

              </div>

            </div>

          </div>


          <div
            className="
              grid
              xl:grid-cols-2
              gap-10
            "
          >

            <div
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
                  items-center
                  gap-4
                  mb-8
                "
              >

                <Database
                  className="
                    text-cyan-400
                  "
                />

                <h2
                  className="
                    text-3xl
                    font-bold
                  "
                >
                  System Analytics
                </h2>

              </div>


              <div
                className="
                  space-y-6
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div
                    className="
                      text-zinc-400
                    "
                  >
                    AI Engine Status
                  </div>

                  <div
                    className="
                      text-green-400
                      font-bold
                    "
                  >
                    Operational
                  </div>

                </div>


                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div
                    className="
                      text-zinc-400
                    "
                  >
                    Recruiter Intelligence
                  </div>

                  <div
                    className="
                      text-cyan-400
                      font-bold
                    "
                  >
                    Active
                  </div>

                </div>


                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div
                    className="
                      text-zinc-400
                    "
                  >
                    Vision Analytics
                  </div>

                  <div
                    className="
                      text-purple-400
                      font-bold
                    "
                  >
                    Running
                  </div>

                </div>


                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div
                    className="
                      text-zinc-400
                    "
                  >
                    Voice Intelligence
                  </div>

                  <div
                    className="
                      text-yellow-400
                      font-bold
                    "
                  >
                    Active
                  </div>

                </div>

              </div>

            </div>


            <div
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
                  items-center
                  gap-4
                  mb-8
                "
              >

                <Shield
                  className="
                    text-cyan-400
                  "
                />

                <h2
                  className="
                    text-3xl
                    font-bold
                  "
                >
                  AI Governance
                </h2>

              </div>


              <div
                className="
                  space-y-5
                "
              >

                {
                  sessions.map(
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
                          rounded-2xl
                          p-5
                          flex
                          items-center
                          justify-between
                        "
                      >

                        <div>

                          <div
                            className="
                              font-bold
                              mb-1
                            "
                          >

                            Candidate
                            {" "}
                            {index + 1}

                          </div>

                          <div
                            className="
                              text-zinc-400
                              text-sm
                            "
                          >

                            {item.role}

                          </div>

                        </div>


                        <div
                          className="
                            text-green-400
                            font-bold
                          "
                        >
                          VERIFIED
                        </div>

                      </div>
                    )
                  )
                }

              </div>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default AdminPanel;