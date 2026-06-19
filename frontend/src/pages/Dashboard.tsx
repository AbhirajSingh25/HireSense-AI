import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import ActivityTimeline from "../components/dashboard/ActivityTimeline";
import AIInsights from "../components/dashboard/AIInsights";
import PerformanceRadar from "../components/dashboard/PerformanceRadar";
import StatCard from "../components/dashboard/StatCard";

import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";

import {
  Trophy,
  Brain,
  Mic,
  BarChart3,
  Sparkles,
  Target,
  Flame,
  FileText,
  Clock,
  Activity,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import {
  getDashboardStats,
} from "../services/api";

import {
  useNavigate,
} from "react-router-dom";


function Dashboard() {

  const navigate = useNavigate();

  const [
    stats,
    setStats,
  ] = useState({

    total_interviews: 0,

    avg_confidence: 0,

    communication: 0,

    ai_rank: 0,
  });


  const [
    loading,
    setLoading,
  ] = useState(true);


  useEffect(() => {

    async function fetchStats() {

      try {

        const data =
          await getDashboardStats();

        setStats(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    }

    fetchStats();

  }, []);



  if (loading) {

    return (

      <MainLayout>

        <div
          className="
            h-[60vh]
            flex
            items-center
            justify-center
            text-2xl
            font-black
            text-white
          "
        >

          Loading Dashboard...

        </div>

      </MainLayout>
    );
  }



  const progressData = [

    {
      title: "Communication",
      value: 82,
      color: "bg-cyan-400",
    },

    {
      title: "Technical Depth",
      value: 93,
      color: "bg-red-500",
    },

    {
      title: "Confidence",
      value: 88,
      color: "bg-green-400",
    },

    {
      title: "Problem Solving",
      value: 90,
      color: "bg-yellow-400",
    },
  ];



  const highlights = [

    {
      icon: Target,
      title: "Strong Technical Answers",
      subtitle: "Top 8% performer ranking",
      color: "text-red-400",
    },

    {
      icon: Flame,
      title: "12 Day Streak",
      subtitle: "Consistent interview practice",
      color: "text-orange-400",
    },

    {
      icon: Clock,
      title: "Avg Session Time",
      subtitle: "34 minutes average",
      color: "text-cyan-400",
    },

    {
      icon: ShieldCheck,
      title: "AI Recruiter Approved",
      subtitle: "Strong communication intelligence",
      color: "text-green-400",
    },
  ];



  return (

    <MainLayout>

      <div
        className="
          w-full
          max-w-[1600px]
          mx-auto
          pb-10
          space-y-6
        "
      >

        <PageHeader
          badge="AI PERFORMANCE SYSTEM"
          title="AI Career Dashboard"
          description="
            Monitor recruiter analytics,
            communication intelligence,
            technical performance,
            and AI-driven hiring insights.
          "
        />



        {/* STATS */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-5
          "
        >

          <StatCard
            title="Interviews"
            value={String(stats.total_interviews)}
            subtitle="Completed this month"
            icon={Trophy}
            growth="+12%"
          />

          <StatCard
            title="AI Confidence"
            value={`${stats.avg_confidence}%`}
            subtitle="Recruiter score"
            icon={Brain}
            growth="+8%"
          />

          <StatCard
            title="Communication"
            value={`${stats.communication}%`}
            subtitle="Speech analysis"
            icon={Mic}
            growth="+6%"
          />

          <StatCard
            title="AI Rank"
            value={`#${stats.ai_rank}`}
            subtitle="Global ranking"
            icon={BarChart3}
            growth="+14%"
          />

        </div>



        {/* HIGHLIGHTS */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-5
          "
        >

          {highlights.map((item) => {

            const Icon = item.icon;

            return (

              <Card
                key={item.title}
                className="
                  p-5
                  flex
                  items-start
                  gap-4
                  border
                  border-white/5
                  bg-white/[0.02]
                "
              >

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-white/[0.03]
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >

                  <Icon
                    className={item.color}
                    size={24}
                  />

                </div>

                <div>

                  <h3
                    className="
                      text-lg
                      font-bold
                      mb-1
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      text-sm
                      text-zinc-400
                    "
                  >
                    {item.subtitle}
                  </p>

                </div>

              </Card>

            );
          })}

        </div>



        {/* ANALYTICS */}

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-12
            gap-6
            items-start
          "
        >

          {/* LEFT */}

          <div
            className="
              xl:col-span-8
            "
          >

            <Card
              className="
                p-5
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-5
                "
              >

                <div>

                  <p
                    className="
                      text-red-400
                      uppercase
                      tracking-[0.25em]
                      text-xs
                      mb-2
                    "
                  >
                    PERFORMANCE ANALYTICS
                  </p>

                  <h2
                    className="
                      text-3xl
                      font-black
                    "
                  >
                    AI Skill Breakdown
                  </h2>

                </div>

                <Activity
                  className="
                    text-red-400
                    w-7
                    h-7
                  "
                />

              </div>



              <div
                className="
                  h-[320px]
                "
              >

                <PerformanceRadar
                  confidence={stats.avg_confidence}
                  communication={stats.communication}
                  technical={93}
                  problemSolving={90}
                  leadership={84}
                />

              </div>

            </Card>

          </div>



          {/* RIGHT */}

          <div
            className="
              xl:col-span-4
            "
          >

            <AIInsights />

          </div>

        </div>



        {/* TIMELINE + QUICK ACTIONS */}

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-12
            gap-6
            items-start
          "
        >

          {/* TIMELINE */}

          <div
            className="
              xl:col-span-8
              space-y-6
            "
          >

            {/* PROGRESS */}

            <Card
              className="
                p-5
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

                <div>

                  <p
                    className="
                      text-cyan-400
                      uppercase
                      tracking-[0.25em]
                      text-xs
                      mb-2
                    "
                  >
                    AI PROGRESS
                  </p>

                  <h2
                    className="
                      text-3xl
                      font-black
                    "
                  >
                    AI Progress Timeline
                  </h2>

                </div>

                <Sparkles
                  className="
                    text-red-400
                    w-7
                    h-7
                  "
                />

              </div>



              <div className="space-y-6">

                {progressData.map((item) => (

                  <div key={item.title}>

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        mb-3
                      "
                    >

                      <span
                        className="
                          text-lg
                          font-semibold
                        "
                      >
                        {item.title}
                      </span>

                      <span
                        className="
                          font-black
                          text-lg
                        "
                      >
                        {item.value}%
                      </span>

                    </div>



                    <div
                      className="
                        h-3
                        rounded-full
                        bg-white/5
                        overflow-hidden
                      "
                    >

                      <div
                        className={`
                          h-full
                          rounded-full
                          ${item.color}
                        `}
                        style={{
                          width: `${item.value}%`,
                        }}
                      />

                    </div>

                  </div>

                ))}

              </div>

            </Card>



            {/* ACTIVITY */}

            <Card
              className="
                p-5
              "
            >

              <div className="mb-6">

                <p
                  className="
                    text-cyan-400
                    uppercase
                    tracking-[0.25em]
                    text-xs
                    mb-2
                  "
                >
                  RECENT ACTIVITY
                </p>

                <h2
                  className="
                    text-3xl
                    font-black
                  "
                >
                  Activity Timeline
                </h2>

              </div>

              <ActivityTimeline />

            </Card>

          </div>



          {/* QUICK ACTIONS */}

          <div
            className="
              xl:col-span-4
            "
          >

            <div
              className="
                grid
                grid-cols-2
                gap-4
              "
            >

              {[
                {
                  title: "Start AI Interview",
                  icon: Brain,
                  action: () => navigate("/live-interview"),
                },

                {
                  title: "Practice Mode",
                  icon: Mic,
                  action: () => navigate("/practice"),
                },

                {
                  title: "Analytics",
                  icon: BarChart3,
                  action: () => navigate("/analytics"),
                },

                {
                  title: "Resume Analyzer",
                  icon: FileText,
                  action: () => navigate("/resume-analyzer"),
                },

                {
                  title: "Leaderboard",
                  icon: Trophy,
                  action: () => navigate("/leaderboard"),
                },
              ].map((item) => {

                const Icon = item.icon;

                return (

                  <button
                    key={item.title}

                    onClick={item.action}

                    className="
                      rounded-[28px]
                      border
                      border-white/5
                      bg-[#070707]
                      p-5
                      text-left
                      transition-all
                      duration-300
                      hover:border-red-500/20
                      hover:-translate-y-1
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

                      <div
                        className="
                          w-14
                          h-14
                          rounded-2xl
                          bg-white/[0.03]
                          flex
                          items-center
                          justify-center
                        "
                      >

                        <Icon size={24} />

                      </div>

                      <ArrowRight
                        className="
                          text-zinc-600
                        "
                      />

                    </div>



                    <div>

                      <h3
                        className="
                          text-2xl
                          font-black
                          leading-tight
                          mb-3
                        "
                      >
                        {item.title}
                      </h3>

                      <p
                        className="
                          text-sm
                          text-zinc-500
                          leading-relaxed
                        "
                      >
                        AI-powered recruiter intelligence and performance analysis.
                      </p>

                    </div>

                  </button>

                );
              })}

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default Dashboard;