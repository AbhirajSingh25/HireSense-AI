import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {

  Brain,
  Trophy,
  Activity,
  Sparkles,

} from "lucide-react";

import {
  getDashboardStats,
} from "../services/api";


function Dashboard() {

  const [
    stats,
    setStats,
  ] = useState<any>(null);


  useEffect(() => {

    async function loadStats() {

      try {

        const user =
          JSON.parse(

            localStorage.getItem(
              "user"
            ) || "{}"
          );


        const data =
          await getDashboardStats(
            user.id || 1
          );

        setStats(data);

      } catch (error) {

        console.error(error);
      }
    }

    loadStats();

  }, []);


  const cards = [

    {
      title:
        "Total Interviews",

      value:
        stats?.total_interviews || 0,

      icon:
        <Brain size={34} />,

      color:
        "from-cyan-500 to-blue-500",
    },

    {
      title:
        "Confidence",

      value:
        stats?.average_confidence || 0,

      icon:
        <Sparkles size={34} />,

      color:
        "from-pink-500 to-purple-500",
    },

    {
      title:
        "Communication",

      value:
        stats?.average_communication || 0,

      icon:
        <Activity size={34} />,

      color:
        "from-green-500 to-emerald-500",
    },

    {
      title:
        "Latest Score",

      value:
        stats?.latest_score || 0,

      icon:
        <Trophy size={34} />,

      color:
        "from-orange-500 to-yellow-500",
    },
  ];


  return (

    <MainLayout>

      <div>

        <div
          className="
            mb-10
          "
        >

          <h1
            className="
              text-6xl
              font-black
              text-white
              mb-4
            "
          >
            Dashboard
          </h1>

          <p
            className="
              text-gray-400
              text-lg
            "
          >
            Welcome back to your AI interview workspace
          </p>

        </div>


        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-8
          "
        >

          {cards.map((card) => (

            <div
              key={card.title}
              className="
                relative
                overflow-hidden
                rounded-3xl
                p-px
                bg-linear-to-br
                from-white/20
                to-white/5
              "
            >

              <div
                className="
                  bg-[#0b1120]
                  rounded-3xl
                  p-8
                  h-full
                "
              >

                <div
                  className={`
                    w-16
                    h-16
                    rounded-2xl
                    bg-linear-to-br
                    ${card.color}

                    flex
                    items-center
                    justify-center
                    mb-6
                  `}
                >

                  {card.icon}

                </div>


                <p
                  className="
                    text-gray-400
                    mb-3
                    text-lg
                  "
                >
                  {card.title}
                </p>


                <h2
                  className="
                    text-5xl
                    font-black
                    text-white
                  "
                >
                  {card.value}
                </h2>

              </div>

            </div>
          ))}

        </div>


        <div
          className="
            mt-12
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-8
          "
        >

          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-8
            "
          >

            <h2
              className="
                text-3xl
                font-bold
                mb-6
              "
            >
              Performance Overview
            </h2>

            <div
              className="
                space-y-5
              "
            >

              <div>

                <div
                  className="
                    flex
                    justify-between
                    mb-2
                  "
                >

                  <span>
                    Confidence
                  </span>

                  <span>
                    {
                      stats?.average_confidence || 0
                    }%
                  </span>

                </div>

                <div
                  className="
                    h-3
                    rounded-full
                    bg-white/10
                    overflow-hidden
                  "
                >

                  <div
                    style={{
                      width: `${stats?.average_confidence || 0}%`
                    }}
                    className="
                      h-full
                      bg-cyan-400
                    "
                  />

                </div>

              </div>


              <div>

                <div
                  className="
                    flex
                    justify-between
                    mb-2
                  "
                >

                  <span>
                    Communication
                  </span>

                  <span>
                    {
                      stats?.average_communication || 0
                    }%
                  </span>

                </div>

                <div
                  className="
                    h-3
                    rounded-full
                    bg-white/10
                    overflow-hidden
                  "
                >

                  <div
                    style={{
                      width: `${stats?.average_communication || 0}%`
                    }}
                    className="
                      h-full
                      bg-green-400
                    "
                  />

                </div>

              </div>

            </div>

          </div>


          <div
            className="
              bg-linear-to-br
              from-cyan-500
              to-blue-600
              rounded-3xl
              p-8
              text-black
            "
          >

            <h2
              className="
                text-4xl
                font-black
                mb-4
              "
            >
              AI Interview Ready
            </h2>

            <p
              className="
                text-lg
                mb-8
              "
            >
              Continue improving your interview performance with real-time AI feedback and analytics.
            </p>


            <button
              className="
                bg-black
                text-white
                px-8
                py-4
                rounded-2xl
                font-bold
              "
            >
              Start New Interview
            </button>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default Dashboard;