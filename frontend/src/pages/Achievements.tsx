import MainLayout from "../components/MainLayout";

import {

  Trophy,

  Star,

  Brain,

  Flame,

  Crown,

  Target,

} from "lucide-react";


const achievements = [

  {

    title:
      "Interview Starter",

    description:
      "Completed first AI interview",

    icon: Trophy,

    color:
      "text-yellow-400",

    bg:
      "bg-yellow-400/10",

    border:
      "border-yellow-400/20",
  },

  {

    title:
      "Communication Expert",

    description:
      "Scored above 90% communication",

    icon: Star,

    color:
      "text-cyan-400",

    bg:
      "bg-cyan-400/10",

    border:
      "border-cyan-400/20",
  },

  {

    title:
      "AI Problem Solver",

    description:
      "Achieved strong technical score",

    icon: Brain,

    color:
      "text-purple-400",

    bg:
      "bg-purple-400/10",

    border:
      "border-purple-400/20",
  },

  {

    title:
      "Consistency Streak",

    description:
      "Completed multiple interview sessions",

    icon: Flame,

    color:
      "text-orange-400",

    bg:
      "bg-orange-400/10",

    border:
      "border-orange-400/20",
  },

  {

    title:
      "Elite Candidate",

    description:
      "Reached top leaderboard ranking",

    icon: Crown,

    color:
      "text-pink-400",

    bg:
      "bg-pink-400/10",

    border:
      "border-pink-400/20",
  },

  {

    title:
      "Precision Performer",

    description:
      "Maintained high confidence score",

    icon: Target,

    color:
      "text-green-400",

    bg:
      "bg-green-400/10",

    border:
      "border-green-400/20",
  },
];


function Achievements() {

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
                AI Achievements
              </h1>

              <p
                className="
                  text-zinc-400
                  text-lg
                "
              >
                Candidate progression and milestone intelligence
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
                "
              >
                Total Badges
              </div>

              <div
                className="
                  text-5xl
                  font-bold
                  text-cyan-400
                "
              >

                {achievements.length}

              </div>

            </div>

          </div>


          <div
            className="
              grid
              md:grid-cols-2
              xl:grid-cols-3
              gap-8
            "
          >

            {
              achievements.map(
                (
                  item,
                  index
                ) => {

                  const Icon =
                    item.icon;

                  return (

                    <div
                      key={index}
                      className={`

                        ${item.bg}
                        ${item.border}

                        border
                        rounded-3xl
                        p-8
                        transition-all
                        hover:scale-[1.02]
                      `}
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
                          className={`

                            ${item.bg}

                            w-20
                            h-20
                            rounded-3xl
                            flex
                            items-center
                            justify-center
                          `}
                        >

                          <Icon
                            className={
                              item.color
                            }
                            size={38}
                          />

                        </div>


                        <div
                          className="
                            text-zinc-500
                            text-sm
                          "
                        >
                          UNLOCKED
                        </div>

                      </div>


                      <h2
                        className="
                          text-3xl
                          font-bold
                          mb-4
                        "
                      >

                        {item.title}

                      </h2>


                      <p
                        className="
                          text-zinc-400
                          leading-7
                        "
                      >

                        {
                          item.description
                        }

                      </p>

                    </div>
                  );
                }
              )
            }

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default Achievements;