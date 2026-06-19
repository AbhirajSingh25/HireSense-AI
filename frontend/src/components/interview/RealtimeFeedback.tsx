import {
  Brain,
  TrendingUp,
  Mic,
} from "lucide-react";


function RealtimeFeedback() {

  const feedback = [

    {
      icon: Brain,
      title: "Technical Depth",
      value: "Excellent",
      color: "text-red-400",
    },

    {
      icon: Mic,
      title: "Communication",
      value: "Strong",
      color: "text-cyan-400",
    },

    {
      icon: TrendingUp,
      title: "Confidence",
      value: "91%",
      color: "text-green-400",
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
      "
    >

      <div className="mb-8">

        <p
          className="
            text-red-400
            uppercase
            tracking-[0.3em]
            text-xs
            mb-2
          "
        >
          LIVE AI FEEDBACK
        </p>

        <h2
          className="
            text-3xl
            font-black
          "
        >
          Recruiter Analysis
        </h2>

      </div>



      <div className="space-y-5">

        {feedback.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.title}
              className="
                p-5
                rounded-3xl
                bg-[#0b0b0b]
                border
                border-white/5
                flex
                items-center
                justify-between
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >

                <Icon
                  className={item.color}
                />

                <span className="text-lg">
                  {item.title}
                </span>

              </div>

              <span
                className={`
                  font-bold
                  ${item.color}
                `}
              >
                {item.value}
              </span>

            </div>

          );
        })}

      </div>

    </div>
  );
}

export default RealtimeFeedback;