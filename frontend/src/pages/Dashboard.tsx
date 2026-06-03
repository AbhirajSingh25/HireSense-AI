import MainLayout from "../components/MainLayout";

import Card from "../components/ui/Card";

import StatCard from "../components/ui/StatCard";

import PageHeader from "../components/ui/PageHeader";

import PerformanceChart from "../components/ui/PerformanceChart";

import InsightCard from "../components/ui/InsightCard";

import {
  Brain,
  Mic,
  Camera,
  Trophy,
} from "lucide-react";
import QuickAction from "../components/ui/QuickAction";

import {
  Video,
  FileText,
} from "lucide-react";

function Dashboard() {

  return (

    <MainLayout>

      


      <div
        className="
          grid
          xl:grid-cols-4
          md:grid-cols-2
          gap-6
          mb-8
        "
      >

        <StatCard
          title="Total Interviews"
          value="24"
          icon={Brain}
          change="+12%"
        />

        <StatCard
          title="Confidence"
          value="87%"
          icon={Mic}
          change="+8%"
        />

        <StatCard
          title="Communication"
          value="90%"
          icon={Camera}
          change="+5%"
        />

        <StatCard
          title="AI Rank"
          value="#12"
          icon={Trophy}
          change="Top 15%"
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
              Performance Overview
            </h2>

            <button
              className="
                px-5
                py-2
                rounded-2xl
                bg-black/30
                border
                border-white/10
              "
            >
              This Month
            </button>

          </div>

          <PerformanceChart />

        </Card>


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

          <div className="space-y-5">

            <InsightCard
              title="Strong Communication"
              description="Your speaking clarity improved significantly."
            />

            <InsightCard
              title="Technical Growth"
              description="Problem-solving speed increased this week."
            />

            <InsightCard
              title="Confidence Rising"
              description="Eye contact and posture improved."
            />

            <InsightCard
              title="Reduce Filler Words"
              description="Avoid repeated hesitation phrases."
            />

          </div>

        </Card>

      </div>

    </MainLayout>
  );
}
<div
  className="
    grid
    md:grid-cols-2
    gap-8
    mt-8
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
      Quick Actions
    </h2>

    <div className="space-y-5">

      <QuickAction
        icon={Brain}
        title="Mock Interview"
        description="Practice adaptive AI interviews."
      />

      <QuickAction
        icon={Video}
        title="Live Interview"
        description="Realtime webcam interview simulation."
      />

      <QuickAction
        icon={FileText}
        title="AI Reports"
        description="Download recruiter-grade reports."
      />

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
      Recent Interviews
    </h2>

    <div className="space-y-5">

      {[
        "Frontend Developer",
        "React Engineer",
        "AI Engineer",
      ].map((item, index) => (

        <div
          key={index}
          className="
            flex
            items-center
            justify-between
            p-5
            rounded-2xl
            bg-black/30
            border
            border-white/5
          "
        >

          <div>

            <h3
              className="
                text-xl
                font-bold
                mb-1
              "
            >
              {item}
            </h3>

            <p
              className="
                text-zinc-500
              "
            >
              Completed Interview
            </p>

          </div>

          <div
            className="
              text-cyan-400
              font-bold
              text-xl
            "
          >
            92%
          </div>

        </div>
      ))}

    </div>

  </Card>

</div>
export default Dashboard;