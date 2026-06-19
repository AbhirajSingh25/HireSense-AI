import MainLayout from "../components/MainLayout";

import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";

import {
  Trophy,
  Crown,
  Medal,
  Brain,
  TrendingUp,
  ShieldCheck,
  Sparkles,
} from "lucide-react";


function Leaderboard() {

  const users = [

    {
      rank: 1,
      name: "Sarah Chen",
      score: 98,
      role: "AI Engineer",
      badge: "Elite",
    },

    {
      rank: 2,
      name: "Michael Lee",
      score: 95,
      role: "Frontend Engineer",
      badge: "Expert",
    },

    {
      rank: 3,
      name: "Alex Johnson",
      score: 93,
      role: "Backend Developer",
      badge: "Advanced",
    },

    {
      rank: 4,
      name: "Abhiraj Singh",
      score: 92,
      role: "Software Engineer",
      badge: "High Potential",
    },

    {
      rank: 5,
      name: "Emma Watson",
      score: 90,
      role: "Full Stack Engineer",
      badge: "Strong Match",
    },
  ];


  return (

    <MainLayout>

      <div
        className="
          w-full
          max-w-[1700px]
          mx-auto
          pb-24
        "
      >

        <PageHeader
          badge="GLOBAL AI RANKINGS"
          title="Recruiter Intelligence Leaderboard"
          description="
            Compare interview intelligence,
            recruiter compatibility,
            communication performance,
            and AI-driven rankings across candidates.
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
              #4
            </h2>

            <p className="text-zinc-500">
              Your Current Rank
            </p>

          </Card>



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
              92%
            </h2>

            <p className="text-zinc-500">
              AI Recruiter Score
            </p>

          </Card>



          <Card className="p-7">

            <TrendingUp
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
              +14%
            </h2>

            <p className="text-zinc-500">
              Weekly Improvement
            </p>

          </Card>



          <Card className="p-7">

            <ShieldCheck
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
              Elite
            </h2>

            <p className="text-zinc-500">
              Recruiter Tier
            </p>

          </Card>

        </div>



        {/* LEADERBOARD */}

        <Card
          className="
            p-8
          "
        >

          <div
            className="
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-5
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
                GLOBAL RANKINGS
              </p>

              <h2
                className="
                  text-4xl
                  font-black
                "
              >
                AI Candidate Rankings
              </h2>

            </div>



            <div
              className="
                px-5
                py-3
                rounded-2xl
                bg-green-500/10
                border
                border-green-500/20
                text-green-400
                font-semibold
              "
            >
              Live Recruiter Data
            </div>

          </div>



          <div className="space-y-5">

            {users.map((user) => (

              <div
                key={user.rank}

                className="
                  p-6
                  rounded-3xl
                  bg-[#0b0b0b]
                  border
                  border-white/5
                  hover:border-red-500/20
                  transition-all
                  duration-300
                "
              >

                <div
                  className="
                    flex
                    flex-col
                    xl:flex-row
                    xl:items-center
                    xl:justify-between
                    gap-6
                  "
                >

                  {/* LEFT */}

                  <div
                    className="
                      flex
                      items-center
                      gap-5
                    "
                  >

                    {/* RANK */}

                    <div
                      className={`
                        w-20
                        h-20
                        rounded-3xl
                        flex
                        items-center
                        justify-center
                        font-black
                        text-2xl

                        ${
                          user.rank === 1
                            ? "bg-yellow-500/10 text-yellow-400"

                            : user.rank === 2
                            ? "bg-zinc-500/10 text-zinc-300"

                            : user.rank === 3
                            ? "bg-orange-500/10 text-orange-400"

                            : "bg-red-500/10 text-red-400"
                        }
                      `}
                    >

                      #{user.rank}

                    </div>



                    {/* USER */}

                    <div>

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                          mb-2
                        "
                      >

                        <h3
                          className="
                            text-2xl
                            font-black
                          "
                        >
                          {user.name}
                        </h3>

                        {
                          user.rank === 1 && (

                            <Crown
                              className="
                                text-yellow-400
                              "
                            />

                          )
                        }

                        {
                          user.rank <= 3 && (

                            <Medal
                              className="
                                text-red-400
                              "
                            />

                          )
                        }

                      </div>

                      <p
                        className="
                          text-zinc-500
                        "
                      >
                        {user.role}
                      </p>

                    </div>

                  </div>



                  {/* RIGHT */}

                  <div
                    className="
                      flex
                      flex-wrap
                      items-center
                      gap-4
                    "
                  >

                    <div
                      className="
                        px-5
                        py-3
                        rounded-2xl
                        bg-green-500/10
                        text-green-400
                        font-bold
                      "
                    >
                      {user.score}% Match
                    </div>



                    <div
                      className="
                        px-5
                        py-3
                        rounded-2xl
                        bg-red-500/10
                        text-red-400
                        font-bold
                      "
                    >
                      {user.badge}
                    </div>



                    <button
                      className="
                        h-14
                        px-5
                        rounded-2xl
                        bg-white/5
                        border
                        border-white/10
                        hover:border-red-500/20
                        transition-all
                        duration-300
                        flex
                        items-center
                        gap-3
                        font-semibold
                      "
                    >

                      <Sparkles size={18} />

                      View Profile

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </Card>

      </div>

    </MainLayout>
  );
}

export default Leaderboard;