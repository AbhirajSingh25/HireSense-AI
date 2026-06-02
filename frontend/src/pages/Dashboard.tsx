import MainLayout from "../components/MainLayout";

import PageHeader from "../components/ui/PageHeader.tsx";

import StatCard from "../components/ui/StatCard.tsx";

import Card from "../components/ui/Card.tsx";

import {
  Brain,
  Mic,
  Camera,
  Trophy,
} from "lucide-react";


function Dashboard() {

  return (

    <MainLayout>

      <PageHeader

        title="Welcome Back"

        subtitle="AI Interview Intelligence Dashboard"
      />


      {/* STATS */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
          mb-8
        "
      >

        <StatCard
          title="Confidence"
          value="87%"
          icon={Brain}
          color="cyan"
        />

        <StatCard
          title="Communication"
          value="91%"
          icon={Mic}
          color="green"
        />

        <StatCard
          title="Eye Contact"
          value="84%"
          icon={Camera}
          color="purple"
        />

        <StatCard
          title="Global Rank"
          value="#12"
          icon={Trophy}
          color="orange"
        />

      </div>


      {/* MAIN GRID */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-8
        "
      >

        {/* LEFT */}

        <div
          className="
            xl:col-span-2
            space-y-8
          "
        >

          <Card className="p-8">

            <h2
              className="
                text-3xl
                font-bold
                mb-8
              "
            >
              Performance Overview
            </h2>


            <div
              className="
                h-[320px]
                rounded-3xl
                bg-black/40
                border
                border-white/5
                flex
                items-center
                justify-center
                text-zinc-500
              "
            >

              Realtime AI Analytics Graph

            </div>

          </Card>


          <Card className="p-8">

            <div
              className="
                flex
                items-center
                justify-between
                mb-8
              "
            >

              <h2
                className="
                  text-3xl
                  font-bold
                "
              >
                Recent Interviews
              </h2>


              <button
                className="
                  px-5
                  py-2
                  rounded-xl
                  bg-cyan-400
                  text-black
                  font-bold
                "
              >
                View All
              </button>

            </div>


            <div className="space-y-4">

              {[1, 2, 3].map((item) => (

                <div
                  key={item}
                  className="
                    p-5
                    rounded-2xl
                    border
                    border-white/5
                    bg-black/30
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div>

                    <h3
                      className="
                        font-bold
                        text-lg
                      "
                    >
                      Frontend Interview
                    </h3>

                    <p
                      className="
                        text-zinc-500
                      "
                    >
                      AI Communication Round
                    </p>

                  </div>


                  <div
                    className="
                      text-right
                    "
                  >

                    <p
                      className="
                        text-cyan-400
                        font-black
                        text-2xl
                      "
                    >
                      91%
                    </p>

                    <p
                      className="
                        text-zinc-500
                        text-sm
                      "
                    >
                      Score
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </Card>

        </div>


        {/* RIGHT */}

        <div className="space-y-8">

          <Card className="p-8">

            <h2
              className="
                text-3xl
                font-bold
                mb-8
              "
            >
              AI Insights
            </h2>


            <div className="space-y-4">

              {[
                "Communication improved significantly",
                "Strong confidence growth",
                "Technical articulation improving",
                "Maintain better eye contact",
              ].map((item) => (

                <div
                  key={item}
                  className="
                    p-5
                    rounded-2xl
                    bg-black/40
                    border
                    border-white/5
                  "
                >

                  <p
                    className="
                      text-zinc-300
                    "
                  >
                    {item}
                  </p>

                </div>
              ))}

            </div>

          </Card>


          <Card className="p-8">

            <h2
              className="
                text-3xl
                font-bold
                mb-8
              "
            >
              Quick Actions
            </h2>


            <div className="space-y-4">

              {[
                "Start Mock Interview",
                "Analyze Resume",
                "Speech Analysis",
                "View Reports",
              ].map((item) => (

                <button
                  key={item}
                  className="
                    w-full
                    p-5
                    rounded-2xl
                    bg-cyan-400
                    hover:bg-cyan-300
                    text-black
                    font-bold
                    transition-all
                  "
                >

                  {item}

                </button>
              ))}

            </div>

          </Card>

        </div>

      </div>

    </MainLayout>
  );
}

export default Dashboard;