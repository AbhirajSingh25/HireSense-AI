import MainLayout from "../components/MainLayout";

import Card from "../components/ui/Card";

import AnalyticsCard from "../components/ui/AnalyticsCard";

import PerformanceChart from "../components/ui/PerformanceChart";

import {
  Brain,
  Trophy,
  Clock,
  Target,
} from "lucide-react";


function Analytics() {

  return (

    <MainLayout>

      <div className="mb-10">

        <h1
          className="
            text-6xl
            font-black
            mb-4
          "
        >
          AI Analytics
        </h1>

        <p
          className="
            text-zinc-400
            text-xl
          "
        >
          Realtime interview intelligence dashboard
        </p>

      </div>


      <div
        className="
          grid
          xl:grid-cols-4
          md:grid-cols-2
          gap-6
          mb-8
        "
      >

        <AnalyticsCard
          title="Total Interviews"
          value={128}
          color="text-cyan-400"
        />

        <AnalyticsCard
          title="Average Score"
          value={91}
          suffix="%"
          color="text-green-400"
        />

        <AnalyticsCard
          title="AI Confidence"
          value={87}
          suffix="%"
          color="text-purple-400"
        />

        <AnalyticsCard
          title="Hiring Potential"
          value={94}
          suffix="%"
          color="text-orange-400"
        />

      </div>


      <div
        className="
          grid
          xl:grid-cols-3
          gap-8
        "
      >

        <Card
          className="
            xl:col-span-2
            p-8
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
              mb-8
            "
          >

            <Brain
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
              Performance Trends
            </h2>

          </div>

          <PerformanceChart />

        </Card>


        <Card className="p-8">

          <div
            className="
              flex
              items-center
              gap-3
              mb-8
            "
          >

            <Target
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
              Recruiter Insights
            </h2>

          </div>


          <div className="space-y-5">

            {[
              {
                title:
                  "Communication",

                score: "92%",
              },

              {
                title:
                  "Technical Depth",

                score: "88%",
              },

              {
                title:
                  "Leadership",

                score: "84%",
              },

              {
                title:
                  "Confidence",

                score: "95%",
              },
            ].map((item) => (

              <div
                key={item.title}
                className="
                  p-5
                  rounded-2xl
                  bg-black/30
                  border
                  border-white/5
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >

                  <span
                    className="
                      text-lg
                    "
                  >
                    {item.title}
                  </span>

                  <span
                    className="
                      text-cyan-400
                      font-bold
                    "
                  >
                    {item.score}
                  </span>

                </div>

              </div>
            ))}

          </div>

        </Card>

      </div>


      <div
        className="
          grid
          xl:grid-cols-3
          gap-8
          mt-8
        "
      >

        <Card className="p-8">

          <div
            className="
              flex
              items-center
              gap-3
              mb-6
            "
          >

            <Clock
              className="
                text-cyan-400
              "
            />

            <h2
              className="
                text-2xl
                font-bold
              "
            >
              Interview Time
            </h2>

          </div>

          <h1
            className="
              text-6xl
              font-black
              text-cyan-400
            "
          >
            42h
          </h1>

        </Card>


        <Card className="p-8">

          <div
            className="
              flex
              items-center
              gap-3
              mb-6
            "
          >

            <Trophy
              className="
                text-yellow-400
              "
            />

            <h2
              className="
                text-2xl
                font-bold
              "
            >
              Global Rank
            </h2>

          </div>

          <h1
            className="
              text-6xl
              font-black
              text-yellow-400
            "
          >
            #12
          </h1>

        </Card>


        <Card className="p-8">

          <div
            className="
              flex
              items-center
              gap-3
              mb-6
            "
          >

            <Brain
              className="
                text-purple-400
              "
            />

            <h2
              className="
                text-2xl
                font-bold
              "
            >
              AI Accuracy
            </h2>

          </div>

          <h1
            className="
              text-6xl
              font-black
              text-purple-400
            "
          >
            98%
          </h1>

        </Card>

      </div>

    </MainLayout>
  );
}

export default Analytics;