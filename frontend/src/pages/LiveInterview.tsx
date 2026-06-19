import MainLayout from "../components/MainLayout";

import {
  Mic,
  Brain,
  Sparkles,
  Clock3,
  Video,
  MicOff,
  Play,
} from "lucide-react";

import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";


function LiveInterview() {

  return (

    <MainLayout>

      <div
        className="
          w-full
          max-w-[1600px]
          mx-auto
          space-y-6
          pb-10
        "
      >

        <PageHeader
          badge="LIVE AI INTERVIEW"
          title="Recruiter Simulation Engine"
          description="
            Real-time AI interview environment
            with adaptive questioning,
            speech intelligence,
            recruiter analytics,
            and behavioral analysis.
          "
        />



        {/* MAIN GRID */}

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
              space-y-5
            "
          >

            {/* INTERVIEW */}

            <Card
              className="
                p-4
                overflow-hidden
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-4
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
                    LIVE SESSION
                  </p>

                  <h2
                    className="
                      text-2xl
                      font-black
                    "
                  >
                    AI Interview Camera
                  </h2>

                </div>



                <div
                  className="
                    px-4
                    py-2
                    rounded-full
                    bg-green-500/10
                    border
                    border-green-500/20
                    text-green-400
                    font-semibold
                    text-sm
                  "
                >
                  ● LIVE
                </div>

              </div>



              <div
  className="
    rounded-[32px]
    border
    border-white/5
    bg-[#050505]
    relative
    overflow-hidden
    px-8
    py-8
    min-h-[620px]
  "
>

                {/* GLOW */}

                <div
                  className="
                    absolute
                    w-[260px]
                    h-[260px]
                    rounded-full
                    bg-red-500/20
                    blur-[100px]
                  "
                />



                {/* TOP BADGES */}

                <div
                  className="
                    absolute
                    top-5
                    left-5
                  "
                >

                  <div
                    className="
                      px-4
                      py-2
                      rounded-2xl
                      bg-black/60
                      border
                      border-white/10
                      text-sm
                    "
                  >
                    GPT-4 Recruiter Intelligence
                  </div>

                </div>



                <div
                  className="
                    absolute
                    top-5
                    right-5
                    px-4
                    py-2
                    rounded-2xl
                    bg-green-500/10
                    border
                    border-green-500/20
                    text-green-400
                    text-sm
                    font-semibold
                  "
                >
                  SESSION ACTIVE
                </div>


{/* CENTER CONTENT */}

<div
  className="
    relative
    z-10
    flex
    flex-col
    items-center
    mt-16
  "
>

  {/* AI CORE */}

  <div
    className="
      w-28
      h-28
      rounded-full
      border-[8px]
      border-red-500/30
      flex
      items-center
      justify-center
      mb-8
    "
  >
    <div
      className="
        w-12
        h-12
        rounded-full
        bg-red-500
      "
    />
  </div>

  {/* TITLE */}

  <h1
    className="
      text-5xl
      font-black
      text-center
      mb-6
    "
  >
    AI Recruiter Listening
  </h1>

  {/* QUESTION */}

  <p
    className="
      text-zinc-400
      text-center
      max-w-3xl
      leading-relaxed
      text-lg
      mb-16
    "
  >
    Explain a challenging engineering
    problem you solved and how you optimized
    scalability, architecture performance,
    and system reliability.
  </p>

  {/* WAVEFORM */}

  <div
    className="
      flex
      items-end
      gap-2
      h-24
      mb-12
    "
  >
    {Array.from({ length: 28 }).map((_, index) => (
      <div
        key={index}
        className="
          w-2
          rounded-full
          bg-gradient-to-t
          from-red-600
          to-red-300
          animate-pulse
        "
        style={{
          height: `${20 + Math.random() * 55}px`,
          animationDelay: `${index * 0.05}s`,
        }}
      />
    ))}
  </div>

  {/* CONTROLS */}

  <div
    className="
      flex
      items-center
      gap-5
    "
  >

    <button
      className="
        w-14
        h-14
        rounded-full
        bg-red-500
        flex
        items-center
        justify-center
      "
    >
      <Mic size={22} />
    </button>

    <button
      className="
        w-20
        h-20
        rounded-full
        bg-white
        text-black
        flex
        items-center
        justify-center
      "
    >
      <Play size={30} />
    </button>

    <button
      className="
        w-14
        h-14
        rounded-full
        bg-cyan-500
        flex
        items-center
        justify-center
      "
    >
      <Video size={22} />
    </button>

    <button
      className="
        w-14
        h-14
        rounded-full
        bg-white/5
        border
        border-red-500/20
        text-red-400
        flex
        items-center
        justify-center
      "
    >
      <MicOff size={22} />
    </button>

  </div>

</div>
              </div>  

            </Card>



            {/* STATS */}

            <div
              className="
                grid
                grid-cols-2
                xl:grid-cols-4
                gap-5
              "
            >

              {[
                {
                  icon: Clock3,
                  value: "34m",
                  label: "Avg Session Duration",
                  color: "text-red-400",
                },

                {
                  icon: Brain,
                  value: "91%",
                  label: "AI Recruiter Match",
                  color: "text-cyan-400",
                },

                {
                  icon: Mic,
                  value: "88%",
                  label: "Communication Clarity",
                  color: "text-green-400",
                },

                {
                  icon: Sparkles,
                  value: "LIVE",
                  label: "Real-Time Intelligence",
                  color: "text-yellow-400",
                },
              ].map((item) => {

                const Icon = item.icon;

                return (

                  <Card
                    key={item.label}
                    className="p-5"
                  >

                    <Icon
                      className={`${item.color} mb-4`}
                      size={24}
                    />

                    <h2
                      className="
                        text-4xl
                        font-black
                        mb-2
                      "
                    >
                      {item.value}
                    </h2>

                    <p
                      className="
                        text-sm
                        text-zinc-500
                      "
                    >
                      {item.label}
                    </p>

                  </Card>

                );
              })}

            </div>

          </div>



          {/* RIGHT */}

          <div
            className="
              xl:col-span-4
              space-y-5
            "
          >

            {/* STATUS */}

            <Card className="p-5">

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
                  AI STATUS
                </p>

                <h2
                  className="
                    text-2xl
                    font-black
                  "
                >
                  Recruiter Intelligence
                </h2>

              </div>



              <div className="space-y-3">

                {[
                  {
                    label: "AI Evaluation",
                    status: "Active",
                    color: "text-green-400",
                  },

                  {
                    label: "Speech Tracking",
                    status: "Running",
                    color: "text-cyan-400",
                  },

                  {
                    label: "Recruiter AI",
                    status: "Ready",
                    color: "text-red-400",
                  },
                ].map((item) => (

                  <div
                    key={item.label}
                    className="
                      h-14
                      rounded-2xl
                      border
                      border-white/5
                      bg-[#0a0a0a]
                      px-5
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <span className="font-medium">
                      {item.label}
                    </span>

                    <span
                      className={`
                        font-bold
                        ${item.color}
                      `}
                    >
                      {item.status}
                    </span>

                  </div>

                ))}

              </div>

            </Card>



            {/* FEEDBACK */}

            <Card className="p-5">

              <div className="mb-5">

                <p
                  className="
                    text-red-400
                    uppercase
                    tracking-[0.25em]
                    text-xs
                    mb-2
                  "
                >
                  LIVE AI FEEDBACK
                </p>

                <h2
                  className="
                    text-2xl
                    font-black
                  "
                >
                  Recruiter Analysis
                </h2>

              </div>



              <div className="space-y-3">

                {[
                  {
                    label: "Technical Depth",
                    value: "Excellent",
                    color: "text-red-400",
                  },

                  {
                    label: "Communication",
                    value: "Strong",
                    color: "text-cyan-400",
                  },

                  {
                    label: "Confidence",
                    value: "91%",
                    color: "text-green-400",
                  },
                ].map((item) => (

                  <div
                    key={item.label}
                    className="
                      h-16
                      rounded-2xl
                      border
                      border-white/5
                      bg-[#0a0a0a]
                      px-5
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <span
                      className="
                        font-semibold
                      "
                    >
                      {item.label}
                    </span>

                    <span
                      className={`
                        font-black
                        ${item.color}
                      `}
                    >
                      {item.value}
                    </span>

                  </div>

                ))}

              </div>

            </Card>



            {/* TRANSCRIPT */}

            <Card className="p-5">

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
                    LIVE TRANSCRIPT
                  </p>

                  <h2
                    className="
                      text-2xl
                      font-black
                    "
                  >
                    AI Listening
                  </h2>

                </div>

                <Sparkles
                  className="
                    text-red-400
                  "
                />

              </div>



              <div
                className="
                  rounded-2xl
                  border
                  border-white/5
                  bg-[#0a0a0a]
                  p-5
                  text-sm
                  text-zinc-500
                  leading-relaxed
                  min-h-[150px]
                "
              >
                Live transcript will appear here during AI interview sessions. Speech intelligence, filler-word analysis, confidence detection, and recruiter observations will update in real time.
              </div>

            </Card>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default LiveInterview;