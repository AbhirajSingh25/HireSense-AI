import MainLayout from "../components/MainLayout";
import PageContainer from "../components/ui/PageContainer";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";

import {
  Brain,
  Sparkles,
  Mic,
  Trophy,
  Play,
  Clock3,
  ShieldCheck,
  Zap,
  Target,
} from "lucide-react";


function PracticeMode() {

  const practiceModes = [

    {
      title: "Technical Interview",
      description:
        "Practice DSA, system design, backend, frontend, and AI engineering interviews.",
      icon: Brain,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },

    {
      title: "Behavioral Round",
      description:
        "Train communication, leadership, confidence, and STAR methodology.",
      icon: Mic,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },

    {
      title: "HR Simulation",
      description:
        "AI-powered recruiter questioning and personality evaluation.",
      icon: ShieldCheck,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },

    {
      title: "Rapid Fire Practice",
      description:
        "Fast-paced interview mode with realtime AI pressure simulation.",
      icon: Zap,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
  ];


  return (

    <MainLayout>
<PageContainer>
      <div
        className="
          w-full
          max-w-[1800px]
          mx-auto
          pb-24
        "
      >

        <PageHeader
          badge="AI PRACTICE ENGINE"
          title="Interview Practice Mode"
          description="
            Practice technical interviews,
            behavioral communication,
            recruiter interactions,
            realtime AI coaching,
            and performance simulations.
          "
        />



        {/* TOP STATS */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-6
            mb-10
          "
        >

          <Card className="p-7">

            <Brain
              className="
                text-red-400
                mb-6
              "
              size={34}
            />

            <h2
              className="
                text-5xl
                font-black
                mb-3
              "
            >
              124
            </h2>

            <p className="text-zinc-500">
              Practice Sessions
            </p>

          </Card>



          <Card className="p-7">

            <Target
              className="
                text-cyan-400
                mb-6
              "
              size={34}
            />

            <h2
              className="
                text-5xl
                font-black
                mb-3
              "
            >
              91%
            </h2>

            <p className="text-zinc-500">
              AI Accuracy
            </p>

          </Card>



          <Card className="p-7">

            <Clock3
              className="
                text-green-400
                mb-6
              "
              size={34}
            />

            <h2
              className="
                text-5xl
                font-black
                mb-3
              "
            >
              38m
            </h2>

            <p className="text-zinc-500">
              Avg Practice Time
            </p>

          </Card>



          <Card className="p-7">

            <Trophy
              className="
                text-yellow-400
                mb-6
              "
              size={34}
            />

            <h2
              className="
                text-5xl
                font-black
                mb-3
              "
            >
              Elite
            </h2>

            <p className="text-zinc-500">
              Candidate Tier
            </p>

          </Card>

        </div>



        {/* PRACTICE MODES */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
            mb-10
          "
        >

          {practiceModes.map((mode) => {

            const Icon = mode.icon;

            return (

              <Card
                key={mode.title}
                className="
                  p-8
                  hover:border-red-500/20
                  transition-all
                  duration-300
                "
              >

                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-6
                    mb-8
                  "
                >

                  <div
                    className={`
                      w-20
                      h-20
                      rounded-3xl
                      flex
                      items-center
                      justify-center
                      ${mode.bg}
                    `}
                  >

                    <Icon
                      className={mode.color}
                      size={36}
                    />

                  </div>



                  <Sparkles
                    className="
                      text-zinc-700
                    "
                  />

                </div>



                <h2
                  className="
                    text-3xl
                    font-black
                    mb-4
                  "
                >
                  {mode.title}
                </h2>

                <p
                  className="
                    text-zinc-500
                    leading-relaxed
                    text-lg
                    mb-8
                  "
                >
                  {mode.description}
                </p>



                <button
                  className="
                    h-14
                    px-6
                    rounded-2xl
                    bg-red-500
                    hover:bg-red-400
                    transition-all
                    duration-300
                    flex
                    items-center
                    gap-3
                    font-bold
                  "
                >

                  <Play size={20} />

                  Start Practice

                </button>

              </Card>

            );
          })}

        </div>



        {/* AI PRACTICE INSIGHTS */}

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-12
            gap-6
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
                p-8
              "
            >

              <div className="mb-10">

                <p
                  className="
                    text-red-400
                    uppercase
                    tracking-[0.3em]
                    text-xs
                    mb-3
                  "
                >
                  AI PERFORMANCE INSIGHTS
                </p>

                <h2
                  className="
                    text-4xl
                    font-black
                  "
                >
                  Practice Intelligence
                </h2>

              </div>



              <div className="space-y-6">

                {[
                  {
                    title:
                      "Technical Growth",

                    description:
                      "AI detected significant improvements in architecture reasoning and optimization explanations.",

                    color:
                      "text-red-400",
                  },

                  {
                    title:
                      "Communication Stability",

                    description:
                      "Speech pacing and communication confidence improved during high-pressure simulations.",

                    color:
                      "text-cyan-400",
                  },

                  {
                    title:
                      "Recruiter Compatibility",

                    description:
                      "Behavioral responses align closely with recruiter-preferred candidate patterns.",

                    color:
                      "text-green-400",
                  },
                ].map((item) => (

                  <div
                    key={item.title}

                    className="
                      p-6
                      rounded-3xl
                      bg-[#0b0b0b]
                      border
                      border-white/5
                    "
                  >

                    <h3
                      className={`
                        text-2xl
                        font-black
                        mb-4
                        ${item.color}
                      `}
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        text-zinc-500
                        leading-relaxed
                        text-lg
                      "
                    >
                      {item.description}
                    </p>

                  </div>

                ))}

              </div>

            </Card>

          </div>



          {/* RIGHT */}

          <div
            className="
              xl:col-span-4
            "
          >

            <Card
              className="
                p-8
              "
            >

              <div className="mb-10">

                <p
                  className="
                    text-yellow-400
                    uppercase
                    tracking-[0.3em]
                    text-xs
                    mb-3
                  "
                >
                  AI SCORE
                </p>

                <h2
                  className="
                    text-4xl
                    font-black
                  "
                >
                  Practice Rating
                </h2>

              </div>



              <div
                className="
                  flex
                  items-center
                  justify-center
                  mb-10
                "
              >

                <div
                  className="
                    w-56
                    h-56
                    rounded-full
                    border-[16px]
                    border-red-500
                    flex
                    items-center
                    justify-center
                    shadow-[0_0_80px_rgba(255,0,0,0.18)]
                  "
                >

                  <div className="text-center">

                    <h1
                      className="
                        text-7xl
                        font-black
                        mb-2
                      "
                    >
                      92
                    </h1>

                    <p className="text-zinc-500">
                      AI Score
                    </p>

                  </div>

                </div>

              </div>



              <div className="space-y-5">

                <div
                  className="
                    flex
                    justify-between
                  "
                >

                  <span className="text-zinc-500">
                    Technical Depth
                  </span>

                  <span className="text-red-400">
                    94%
                  </span>

                </div>



                <div
                  className="
                    flex
                    justify-between
                  "
                >

                  <span className="text-zinc-500">
                    Communication
                  </span>

                  <span className="text-cyan-400">
                    88%
                  </span>

                </div>



                <div
                  className="
                    flex
                    justify-between
                  "
                >

                  <span className="text-zinc-500">
                    Recruiter Match
                  </span>

                  <span className="text-green-400">
                    91%
                  </span>

                </div>

              </div>

            </Card>

          </div>

        </div>

      </div>
</PageContainer>
    </MainLayout>
  );
}

export default PracticeMode;