import {
  Brain,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Zap,
} from "lucide-react";

function AIInsights() {

  const insights = [

    {
      icon: TrendingUp,
      title: "Confidence Increased",
      description:
        "Your communication confidence improved by 14% this week.",
      color:
        "text-green-400",
      bg:
        "bg-green-500/10",
    },

    {
      icon: Brain,
      title: "Technical Depth",
      description:
        "Strong system design reasoning detected in recent interviews.",
      color:
        "text-cyan-400",
      bg:
        "bg-cyan-500/10",
    },

    {
      icon: AlertTriangle,
      title: "Filler Words",
      description:
        "AI detected repetitive filler usage under pressure situations.",
      color:
        "text-yellow-400",
      bg:
        "bg-yellow-500/10",
    },

    {
      icon: ShieldCheck,
      title: "Recruiter Impression",
      description:
        "Your responses match high-performing candidate patterns.",
      color:
        "text-red-400",
      bg:
        "bg-red-500/10",
    },
  ];


  return (

    <div
      className="
        rounded-[32px]
        border
        border-red-500/10
        bg-[#070707]
        p-8
        h-full
      "
    >

      {/* HEADER */}

      <div
        className="
          flex
          items-center
          justify-between
          mb-10
        "
      >

        <div>

          <p
            className="
              text-red-400
              uppercase
              tracking-[0.3em]
              text-xs
              mb-3
            "
          >
            AI INSIGHTS
          </p>

          <h2
            className="
              text-4xl
              font-black
            "
          >
            Recruiter Intelligence
          </h2>

        </div>


        <div
          className="
            w-16
            h-16
            rounded-3xl
            bg-red-500/10
            border
            border-red-500/20
            flex
            items-center
            justify-center
          "
        >

          <Sparkles
            className="
              text-red-400
            "
          />

        </div>

      </div>



      {/* AI SCORE */}

      <div
        className="
          rounded-3xl
          border
          border-red-500/20
          bg-gradient-to-br
          from-red-500/10
          to-transparent
          p-7
          mb-8
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
                text-zinc-400
                mb-2
              "
            >
              AI Recruiter Score
            </p>

            <h1
              className="
                text-7xl
                font-black
                leading-none
              "
            >
              92
            </h1>

          </div>

          <div
            className="
              w-24
              h-24
              rounded-full
              border-[8px]
              border-red-500
              flex
              items-center
              justify-center
              shadow-[0_0_40px_rgba(255,0,0,0.25)]
            "
          >

            <Zap
              size={34}
              className="
                text-red-400
              "
            />

          </div>

        </div>

        <div
          className="
            flex
            items-center
            gap-3
            text-green-400
            font-semibold
          "
        >

          <TrendingUp size={18} />

          +11% improvement from last week

        </div>

      </div>



      {/* INSIGHTS */}

      <div className="space-y-5">

        {insights.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.title}
              className="
                border
                border-white/5
                rounded-3xl
                p-5
                bg-[#0b0b0b]
                hover:border-red-500/20
                transition-all
                duration-300
              "
            >

              <div
                className="
                  flex
                  gap-4
                "
              >

                <div
                  className={`
                    w-14
                    h-14
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    shrink-0
                    ${item.bg}
                  `}
                >

                  <Icon
                    className={item.color}
                  />

                </div>

                <div>

                  <h3
                    className="
                      text-lg
                      font-bold
                      mb-2
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      text-zinc-500
                      leading-relaxed
                    "
                  >
                    {item.description}
                  </p>

                </div>

              </div>

            </div>

          );
        })}

      </div>

    </div>
  );
}

export default AIInsights;