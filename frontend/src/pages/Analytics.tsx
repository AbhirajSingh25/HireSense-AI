import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  getDashboardStats,
} from "../services/api";

import {

  Brain,
  Eye,
  MessageSquare,
  Clock3,

} from "lucide-react";


function Analytics() {

  const [
    stats,
    setStats,
  ] = useState<any>(null);


  useEffect(() => {

    loadAnalytics();

  }, []);


  async function loadAnalytics() {

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


  const analyticsCards = [

    {
      title: "Confidence Score",
      value:
        `${stats?.confidence_score || 0}%`,
      icon:
        <Brain size={24} />,
      color:
        "text-cyan-400",
      bg:
        "bg-cyan-400/10",
    },

    {
      title: "Communication",
      value:
        `${stats?.communication_score || 0}%`,
      icon:
        <MessageSquare size={24} />,
      color:
        "text-green-400",
      bg:
        "bg-green-400/10",
    },

    {
      title: "Eye Contact",
      value:
        `${stats?.eye_contact_score || 0}%`,
      icon:
        <Eye size={24} />,
      color:
        "text-pink-400",
      bg:
        "bg-pink-400/10",
    },

    {
      title: "Words Per Minute",
      value:
        stats?.words_per_minute || 0,
      icon:
        <Clock3 size={24} />,
      color:
        "text-orange-400",
      bg:
        "bg-orange-400/10",
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
            mb-10
          "
        >

          <h1
            className="
              text-4xl
              font-black
              text-white
              mb-3
            "
          >
            AI Analytics
          </h1>

          <p
            className="
              text-gray-400
            "
          >
            Advanced AI interview performance insights
          </p>

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

          {analyticsCards.map((card) => (

            <div
              key={card.title}
              className="
                bg-white/5
                border
                border-white/10
                rounded-3xl
                p-6
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
                  mb-6
                  ${card.bg}
                  ${card.color}
                `}
              >

                {card.icon}

              </div>


              <p
                className="
                  text-gray-400
                  mb-2
                "
              >
                {card.title}
              </p>


              <h2
                className="
                  text-4xl
                  font-black
                  text-white
                "
              >
                {card.value}
              </h2>

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
              Performance Summary
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

                  <span
                    className="
                      text-gray-400
                    "
                  >
                    Confidence
                  </span>

                  <span
                    className="
                      text-white
                    "
                  >
                    {
                      stats?.confidence_score || 0
                    }%
                  </span>

                </div>

                <div
                  className="
                    h-3
                    bg-black/20
                    rounded-full
                    overflow-hidden
                  "
                >

                  <div
                    style={{
                      width: `${
                        stats?.confidence_score || 0
                      }%`
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

                  <span
                    className="
                      text-gray-400
                    "
                  >
                    Communication
                  </span>

                  <span
                    className="
                      text-white
                    "
                  >
                    {
                      stats?.communication_score || 0
                    }%
                  </span>

                </div>

                <div
                  className="
                    h-3
                    bg-black/20
                    rounded-full
                    overflow-hidden
                  "
                >

                  <div
                    style={{
                      width: `${
                        stats?.communication_score || 0
                      }%`
                    }}
                    className="
                      h-full
                      bg-green-400
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

                  <span
                    className="
                      text-gray-400
                    "
                  >
                    Eye Contact
                  </span>

                  <span
                    className="
                      text-white
                    "
                  >
                    {
                      stats?.eye_contact_score || 0
                    }%
                  </span>

                </div>

                <div
                  className="
                    h-3
                    bg-black/20
                    rounded-full
                    overflow-hidden
                  "
                >

                  <div
                    style={{
                      width: `${
                        stats?.eye_contact_score || 0
                      }%`
                    }}
                    className="
                      h-full
                      bg-pink-400
                    "
                  />

                </div>

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
              AI Feedback
            </h2>


            <div
              className="
                bg-black/20
                rounded-2xl
                p-5
              "
            >

              <p
                className="
                  text-gray-300
                  leading-8
                "
              >

                Your communication clarity is strong and your confidence levels are above average. Continue improving structured answers and maintain consistent eye contact during technical discussions.

              </p>

            </div>


            <div
              className="
                mt-6
                grid
                gap-4
              "
            >

              <div
                className="
                  bg-cyan-400/10
                  border
                  border-cyan-400/20
                  rounded-2xl
                  p-4
                "
              >

                <h3
                  className="
                    text-cyan-400
                    font-semibold
                    mb-2
                  "
                >
                  Strong Area
                </h3>

                <p
                  className="
                    text-gray-300
                  "
                >
                  Communication clarity and speaking confidence
                </p>

              </div>


              <div
                className="
                  bg-orange-400/10
                  border
                  border-orange-400/20
                  rounded-2xl
                  p-4
                "
              >

                <h3
                  className="
                    text-orange-400
                    font-semibold
                    mb-2
                  "
                >
                  Improvement Area
                </h3>

                <p
                  className="
                    text-gray-300
                  "
                >
                  Maintain concise answers in technical rounds
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default Analytics;