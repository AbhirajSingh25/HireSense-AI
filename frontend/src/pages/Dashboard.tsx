import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import MainLayout from "../components/MainLayout";

import {
  getDashboardStats,
} from "../services/api";

import {

  Brain,
  Trophy,
  BarChart3,
  Clock,
  ArrowRight,

} from "lucide-react";


function Dashboard() {

  const navigate =
    useNavigate();


  const [
    stats,
    setStats,
  ] = useState<any>(null);


  useEffect(() => {

    loadStats();

  }, []);


  async function loadStats() {

    try {

      const user =
        JSON.parse(
          localStorage.getItem("user") || "{}"
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


  const cards = [

    {
      title: "Confidence",
      value:
        `${stats?.confidence_score || 0}%`,
      icon:
        <Brain size={24} />,
      color:
        "from-cyan-500 to-blue-500",
    },

    {
      title: "Communication",
      value:
        `${stats?.communication_score || 0}%`,
      icon:
        <BarChart3 size={24} />,
      color:
        "from-green-500 to-emerald-500",
    },

    {
      title: "Eye Contact",
      value:
        `${stats?.eye_contact_score || 0}%`,
      icon:
        <Trophy size={24} />,
      color:
        "from-pink-500 to-purple-500",
    },

    {
      title: "Words / Min",
      value:
        stats?.words_per_minute || 0,
      icon:
        <Clock size={24} />,
      color:
        "from-orange-500 to-red-500",
    },
  ];


  return (

    <MainLayout>

      <div
        className="
          max-w-7xl
          mx-auto
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

            <h1
              className="
                text-4xl
                font-black
                text-white
                mb-2
              "
            >
              Dashboard
            </h1>

            <p
              className="
                text-gray-400
              "
            >
              AI Interview Analytics Overview
            </p>

          </div>


          <button
            onClick={() =>
              navigate(
                "/mock-interview"
              )
            }
            className="
              bg-cyan-400
              hover:bg-cyan-300
              text-black
              font-bold
              px-6
              py-4
              rounded-2xl
              flex
              items-center
              gap-3
              transition-all
            "
          >

            Start Interview

            <ArrowRight size={20} />

          </button>

        </div>


        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-6
            mb-10
          "
        >

          {cards.map((card) => (

            <div
              key={card.title}
              className={`
                bg-linear-to-br
                ${card.color}
                rounded-3xl
                p-6
                text-white
                shadow-xl
              `}
            >

              <div
                className="
                  flex
                  justify-between
                  items-start
                  mb-6
                "
              >

                <div
                  className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-white/20
                    flex
                    items-center
                    justify-center
                  "
                >

                  {card.icon}

                </div>

              </div>


              <h3
                className="
                  text-gray-100
                  mb-2
                "
              >
                {card.title}
              </h3>


              <p
                className="
                  text-4xl
                  font-black
                "
              >
                {card.value}
              </p>

            </div>
          ))}

        </div>


        <div
          className="
            grid
            lg:grid-cols-2
            gap-6
          "
        >

          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-6
            "
          >

            <h2
              className="
                text-2xl
                font-bold
                text-white
                mb-6
              "
            >
              Interview Summary
            </h2>


            <div
              className="
                space-y-5
              "
            >

              <div>

                <p
                  className="
                    text-gray-400
                    mb-2
                  "
                >
                  Attention Status
                </p>

                <div
                  className="
                    inline-flex
                    px-4
                    py-2
                    rounded-xl
                    bg-cyan-400
                    text-black
                    font-semibold
                  "
                >

                  {
                    stats?.attention_status ||
                    "Focused"
                  }

                </div>

              </div>


              <div>

                <p
                  className="
                    text-gray-400
                    mb-2
                  "
                >
                  Last Transcript
                </p>

                <p
                  className="
                    text-gray-300
                    leading-7
                  "
                >

                  {
                    stats?.transcript ||
                    "No interview completed yet."
                  }

                </p>

              </div>

            </div>

          </div>


          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-6
            "
          >

            <h2
              className="
                text-2xl
                font-bold
                text-white
                mb-6
              "
            >
              Quick Actions
            </h2>


            <div
              className="
                grid
                gap-4
              "
            >

              <button
                onClick={() =>
                  navigate("/history")
                }
                className="
                  bg-black/30
                  hover:bg-black/50
                  border
                  border-white/10
                  rounded-2xl
                  p-5
                  text-left
                  transition-all
                "
              >

                <h3
                  className="
                    text-white
                    font-semibold
                    mb-2
                  "
                >
                  Interview History
                </h3>

                <p
                  className="
                    text-gray-400
                  "
                >
                  Review previous interview sessions
                </p>

              </button>


              <button
                onClick={() =>
                  navigate("/reports")
                }
                className="
                  bg-black/30
                  hover:bg-black/50
                  border
                  border-white/10
                  rounded-2xl
                  p-5
                  text-left
                  transition-all
                "
              >

                <h3
                  className="
                    text-white
                    font-semibold
                    mb-2
                  "
                >
                  AI Reports
                </h3>

                <p
                  className="
                    text-gray-400
                  "
                >
                  Detailed AI performance reports
                </p>

              </button>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default Dashboard;