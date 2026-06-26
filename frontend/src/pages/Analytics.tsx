import MainLayout from "../components/MainLayout";

import PageContainer from "../components/ui/PageContainer";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import {
  useEffect,
  useState,
} from "react";

import {
  getAnalytics,
} from "../services/api";
import {
  Brain,
  TrendingUp,
  Activity,
  ShieldCheck,
  BarChart3,
  Sparkles,
  Mic,
  Trophy,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
} from "recharts";


const performanceData = [

  {
    day: "Mon",
    score: 72,
  },

  {
    day: "Tue",
    score: 78,
  },

  {
    day: "Wed",
    score: 81,
  },

  {
    day: "Thu",
    score: 84,
  },

  {
    day: "Fri",
    score: 88,
  },

  {
    day: "Sat",
    score: 91,
  },

  {
    day: "Sun",
    score: 94,
  },
];


const radarData = [

  {
    subject: "Technical",
    A: 94,
  },

  {
    subject: "Communication",
    A: 88,
  },

  {
    subject: "Leadership",
    A: 82,
  },

  {
    subject: "Confidence",
    A: 91,
  },

  {
    subject: "Problem Solving",
    A: 93,
  },

  {
    subject: "Behavioral",
    A: 86,
  },
];


const growthData = [

  {
    month: "Jan",
    growth: 40,
  },

  {
    month: "Feb",
    growth: 52,
  },

  {
    month: "Mar",
    growth: 61,
  },

  {
    month: "Apr",
    growth: 73,
  },

  {
    month: "May",
    growth: 85,
  },

  {
    month: "Jun",
    growth: 94,
  },
];


function Analytics() {
const [
  analytics,
  setAnalytics,
] = useState<any>(null);

const [
  loading,
  setLoading,
] = useState(true);

useEffect(() => {

  loadAnalytics();

}, []);

async function loadAnalytics() {
if (loading) {

  return (

    <MainLayout>

      <div className="p-10">
        Loading Analytics...
      </div>

    </MainLayout>
  );
}
  try {

    const data =
      await getAnalytics();

    setAnalytics(data);

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);
  }
}
  return (

    <MainLayout>

      <PageContainer>

        <PageHeader
          badge="AI ANALYTICS ENGINE"
          title="Performance Intelligence"
          description="
            Analyze communication,
            recruiter compatibility,
            technical growth,
            behavioral intelligence,
            and AI-driven hiring performance.
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
            mb-6
          "
        >

          <Card className="p-6">

            <Brain
              className="
                text-red-400
                mb-5
              "
              size={30}
            />

            <h2
              className="
                text-4xl
                font-black
                mb-2
              "
            >
              {analytics?.stats?.overall || 0}%
            </h2>

            <p className="text-zinc-500">
              AI Recruiter Match
            </p>

          </Card>



          <Card className="p-6">

            <TrendingUp
              className="
                text-green-400
                mb-5
              "
              size={30}
            />

            <h2
              className="
                text-4xl
                font-black
                mb-2
              "
            >
              {
  analytics?.performance?.length || 0
}
            </h2>

            <p className="text-zinc-500">
              Interview Sessions
            </p>

          </Card>



          <Card className="p-6">

            <Mic
              className="
                text-cyan-400
                mb-5
              "
              size={30}
            />

            <h2
              className="
                text-4xl
                font-black
                mb-2
              "
            >
              {
  analytics?.stats?.communication || 0
}%
            </h2>

            <p className="text-zinc-500">
              Communication Score
            </p>

          </Card>



          <Card className="p-6">

            <ShieldCheck
              className="
                text-yellow-400
                mb-5
              "
              size={30}
            />

            <h2
              className="
                text-4xl
                font-black
                mb-2
              "
            >
              {
  analytics?.stats?.technical || 0
}%
            </h2>

            <p className="text-zinc-500">
              Technical Score
            </p>

          </Card>

        </div>



        {/* CHARTS */}

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-12
            gap-6
            mb-6
          "
        >

          {/* AREA CHART */}

          <div
            className="
              xl:col-span-8
            "
          >

            <Card className="p-6">

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
                    PERFORMANCE TRACKING
                  </p>

                  <h2
                    className="
                      text-2xl
                      font-black
                    "
                  >
                    Weekly AI Progress
                  </h2>

                </div>

                <Activity
                  className="
                    text-red-400
                  "
                />

              </div>



              <div className="h-[320px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <AreaChart data={
  analytics?.performance || []
}>

                    <defs>

                      <linearGradient
                        id="colorScore"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >

                        <stop
                          offset="5%"
                          stopColor="#ef4444"
                          stopOpacity={0.8}
                        />

                        <stop
                          offset="95%"
                          stopColor="#ef4444"
                          stopOpacity={0}
                        />

                      </linearGradient>

                    </defs>

                    <XAxis dataKey="day" />

                    <YAxis />

                    <Tooltip />

                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#ef4444"
                      fillOpacity={1}
                      fill="url(#colorScore)"
                    />

                  </AreaChart>

                </ResponsiveContainer>

              </div>

            </Card>

          </div>



          {/* RADAR */}

          <div
            className="
              xl:col-span-4
            "
          >

            <Card className="p-6">

              <div className="mb-5">

                <p
                  className="
                    text-cyan-400
                    uppercase
                    tracking-[0.25em]
                    text-xs
                    mb-2
                  "
                >
                  AI SKILL MATRIX
                </p>

                <h2
                  className="
                    text-2xl
                    font-black
                  "
                >
                  Recruiter Radar
                </h2>

              </div>



              <div className="h-[320px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <RadarChart data={
  analytics?.radar || []
}>

                    <PolarGrid />

                    <PolarAngleAxis
                      dataKey="subject"
                    />

                    <PolarRadiusAxis />

                    <Radar
                      dataKey="value"
                      stroke="#06b6d4"
                      fill="#06b6d4"
                      fillOpacity={0.6}
                    />

                  </RadarChart>

                </ResponsiveContainer>

              </div>

            </Card>

          </div>

        </div>



        {/* BOTTOM */}

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-12
            gap-6
          "
        >

          {/* GROWTH */}

          <div
            className="
              xl:col-span-8
            "
          >

            <Card className="p-6">

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
                      text-green-400
                      uppercase
                      tracking-[0.25em]
                      text-xs
                      mb-2
                    "
                  >
                    GROWTH ANALYTICS
                  </p>

                  <h2
                    className="
                      text-2xl
                      font-black
                    "
                  >
                    Interview Improvement Curve
                  </h2>

                </div>

                <TrendingUp
                  className="
                    text-green-400
                  "
                />

              </div>



              <div className="h-[320px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <LineChart data={
  analytics?.performance || []
}>

                    <XAxis dataKey="session" />

                    <YAxis />

                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#22c55e"
                      strokeWidth={4}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </Card>

          </div>



          {/* AI INSIGHTS */}

          <div
            className="
              xl:col-span-4
            "
          >

            <Card className="p-6">

              <div className="mb-5">

                <p
                  className="
                    text-yellow-400
                    uppercase
                    tracking-[0.25em]
                    text-xs
                    mb-2
                  "
                >
                  AI INSIGHTS
                </p>

                <h2
                  className="
                    text-2xl
                    font-black
                  "
                >
                  Recruiter Signals
                </h2>

              </div>



              <div className="space-y-4">

                {[
                  {
                    title:
                      "Technical Growth",
                    description:
                      "Strong architecture reasoning improvements detected.",
                    icon: Brain,
                    color: "text-red-400",
                  },

                  {
                    title:
                      "Communication Stability",
                    description:
                      "Speech pacing improved under pressure simulations.",
                    icon: Mic,
                    color: "text-cyan-400",
                  },

                  {
                    title:
                      "Recruiter Compatibility",
                    description:
                      "Behavioral patterns align with elite candidates.",
                    icon: Trophy,
                    color: "text-yellow-400",
                  },

                  {
                    title:
                      "AI Recommendation",
                    description:
                      "Recommended for advanced recruiter evaluations.",
                    icon: Sparkles,
                    color: "text-green-400",
                  },
                ].map((item) => {

                  const Icon = item.icon;

                  return (

                    <div
                      key={item.title}

                      className="
                        p-4
                        rounded-2xl
                        bg-[#0b0b0b]
                        border
                        border-white/5
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

                        <Icon
                          className={item.color}
                          size={18}
                        />

                        <h3
                          className="
                            font-bold
                          "
                        >
                          {item.title}
                        </h3>

                      </div>

                      <p
                        className="
                          text-zinc-500
                          text-sm
                          leading-relaxed
                        "
                      >
                        {item.description}
                      </p>

                    </div>

                  );
                })}

              </div>

            </Card>

          </div>

        </div>

      </PageContainer>

    </MainLayout>
  );
}

export default Analytics;