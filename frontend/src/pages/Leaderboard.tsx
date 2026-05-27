import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  getLeaderboard,
} from "../services/api";

import {

  Trophy,
  Medal,
  Crown,

} from "lucide-react";


function Leaderboard() {

  const [
    leaders,
    setLeaders,
  ] = useState<any[]>([]);


  useEffect(() => {

    loadLeaderboard();

  }, []);


  async function loadLeaderboard() {

    try {

      const data =
        await getLeaderboard();

      setLeaders(data);

    } catch (error) {

      console.error(error);
    }
  }


  function getRankIcon(
    rank: number
  ) {

    if (rank === 1) {

      return (
        <Crown
          className="
            text-yellow-400
          "
          size={24}
        />
      );
    }

    if (rank === 2) {

      return (
        <Medal
          className="
            text-gray-300
          "
          size={24}
        />
      );
    }

    if (rank === 3) {

      return (
        <Medal
          className="
            text-orange-400
          "
          size={24}
        />
      );
    }

    return (

      <div
        className="
          w-8
          h-8
          rounded-full
          bg-white/10
          flex
          items-center
          justify-center
          text-sm
          font-bold
        "
      >
        {rank}
      </div>
    );
  }


  return (

    <MainLayout>

      <div
        className="
          max-w-6xl
          mx-auto
        "
      >

        <div
          className="
            mb-10
          "
        >

          <div
            className="
              flex
              items-center
              gap-4
              mb-3
            "
          >

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-yellow-400
                text-black
                flex
                items-center
                justify-center
              "
            >

              <Trophy size={28} />

            </div>


            <div>

              <h1
                className="
                  text-4xl
                  font-black
                  text-white
                "
              >
                Leaderboard
              </h1>

              <p
                className="
                  text-gray-400
                "
              >
                Top AI interview performers
              </p>

            </div>

          </div>

        </div>


        <div
          className="
            grid
            gap-5
          "
        >

          {leaders.map((
            user,
            index
          ) => (

            <div
              key={index}
              className={`
                rounded-3xl
                p-6
                border
                transition-all

                ${
                  index === 0

                    ? `
                      bg-linear-to-r
                      from-yellow-500/20
                      to-orange-500/20
                      border-yellow-400/30
                    `

                    : `
                      bg-white/5
                      border-white/10
                    `
                }
              `}
            >

              <div
                className="
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  md:justify-between
                  gap-5
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-5
                  "
                >

                  {getRankIcon(
                    index + 1
                  )}


                  <div>

                    <h2
                      className="
                        text-2xl
                        font-bold
                        text-white
                        mb-1
                      "
                    >
                      {
                        user.username ||
                        `User ${index + 1}`
                      }
                    </h2>

                    <p
                      className="
                        text-gray-400
                      "
                    >
                      AI Interview Candidate
                    </p>

                  </div>

                </div>


                <div
                  className="
                    grid
                    grid-cols-2
                    md:grid-cols-4
                    gap-4
                  "
                >

                  <div
                    className="
                      bg-black/20
                      rounded-2xl
                      px-5
                      py-4
                    "
                  >

                    <p
                      className="
                        text-gray-400
                        text-sm
                        mb-2
                      "
                    >
                      Confidence
                    </p>

                    <h3
                      className="
                        text-2xl
                        font-bold
                        text-cyan-400
                      "
                    >
                      {
                        user.confidence_score || 0
                      }%
                    </h3>

                  </div>


                  <div
                    className="
                      bg-black/20
                      rounded-2xl
                      px-5
                      py-4
                    "
                  >

                    <p
                      className="
                        text-gray-400
                        text-sm
                        mb-2
                      "
                    >
                      Communication
                    </p>

                    <h3
                      className="
                        text-2xl
                        font-bold
                        text-green-400
                      "
                    >
                      {
                        user.communication_score || 0
                      }%
                    </h3>

                  </div>


                  <div
                    className="
                      bg-black/20
                      rounded-2xl
                      px-5
                      py-4
                    "
                  >

                    <p
                      className="
                        text-gray-400
                        text-sm
                        mb-2
                      "
                    >
                      Eye Contact
                    </p>

                    <h3
                      className="
                        text-2xl
                        font-bold
                        text-pink-400
                      "
                    >
                      {
                        user.eye_contact_score || 0
                      }%
                    </h3>

                  </div>


                  <div
                    className="
                      bg-black/20
                      rounded-2xl
                      px-5
                      py-4
                    "
                  >

                    <p
                      className="
                        text-gray-400
                        text-sm
                        mb-2
                      "
                    >
                      WPM
                    </p>

                    <h3
                      className="
                        text-2xl
                        font-bold
                        text-orange-400
                      "
                    >
                      {
                        user.words_per_minute || 0
                      }
                    </h3>

                  </div>

                </div>

              </div>

            </div>
          ))}


          {!leaders.length && (

            <div
              className="
                text-center
                py-20
                text-gray-400
              "
            >

              No leaderboard data available

            </div>
          )}

        </div>

      </div>

    </MainLayout>
  );
}

export default Leaderboard;