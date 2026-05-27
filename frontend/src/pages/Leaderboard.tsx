import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  Trophy,
} from "lucide-react";

import {
  getLeaderboard,
} from "../services/api";


function Leaderboard() {

  const [
    users,
    setUsers,
  ] = useState<any[]>([]);


  useEffect(() => {

    async function loadLeaderboard() {

      try {

        const data =
          await getLeaderboard();

        setUsers(data);

      } catch (error) {

        console.error(error);
      }
    }

    loadLeaderboard();

  }, []);


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

          <h1
            className="
              text-4xl
              font-bold
              text-white
              mb-3
            "
          >
            Leaderboard
          </h1>

          <p
            className="
              text-gray-400
            "
          >
            Top interview performers
          </p>

        </div>


        <div
          className="
            space-y-5
          "
        >

          {users.map(

            (
              user,
              index
            ) => (

            <div
              key={user.username}
              className="
                bg-white/5
                border
                border-white/10
                rounded-2xl
                p-6
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-6
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-5
                "
              >

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-yellow-400
                    text-black
                    font-black
                    flex
                    items-center
                    justify-center
                    text-xl
                  "
                >

                  {index + 1}

                </div>


                <div>

                  <h2
                    className="
                      text-2xl
                      font-bold
                      text-white
                    "
                  >
                    {user.username}
                  </h2>

                  <p
                    className="
                      text-gray-400
                    "
                  >
                    {
                      user.total_interviews
                    }
                    {" "}
                    interviews completed
                  </p>

                </div>

              </div>


              <div
                className="
                  flex
                  flex-wrap
                  gap-4
                "
              >

                <div
                  className="
                    bg-black/30
                    rounded-xl
                    px-5
                    py-3
                  "
                >

                  <p
                    className="
                      text-sm
                      text-gray-400
                    "
                  >
                    Confidence
                  </p>

                  <h3
                    className="
                      text-xl
                      font-bold
                      text-cyan-400
                    "
                  >
                    {
                      user.avg_confidence
                    }%
                  </h3>

                </div>


                <div
                  className="
                    bg-black/30
                    rounded-xl
                    px-5
                    py-3
                  "
                >

                  <p
                    className="
                      text-sm
                      text-gray-400
                    "
                  >
                    Communication
                  </p>

                  <h3
                    className="
                      text-xl
                      font-bold
                      text-green-400
                    "
                  >
                    {
                      user.avg_communication
                    }%
                  </h3>

                </div>


                <div
                  className="
                    bg-black/30
                    rounded-xl
                    px-5
                    py-3
                    flex
                    items-center
                    gap-2
                  "
                >

                  <Trophy
                    size={20}
                    className="
                      text-yellow-400
                    "
                  />

                  <span
                    className="
                      text-white
                      font-semibold
                    "
                  >
                    Rank #
                    {index + 1}
                  </span>

                </div>

              </div>

            </div>
          ))}


          {!users.length && (

            <div
              className="
                text-center
                text-gray-400
                py-20
              "
            >

              No leaderboard data yet

            </div>
          )}

        </div>

      </div>

    </MainLayout>
  );
}

export default Leaderboard;