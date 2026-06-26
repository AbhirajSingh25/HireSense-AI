import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  Trophy,
  Flame,
  Crown,
  Target,
} from "lucide-react";

import {
  getAchievements,
} from "../services/api";


const achievementIcons: any = {

  "First Interview":
    Trophy,

  "Practice Warrior":
    Flame,

  "Strong Candidate":
    Target,

  "Interview Master":
    Crown,
};


function Achievements() {

  const [
    achievements,
    setAchievements,
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);


  useEffect(() => {

    loadAchievements();

  }, []);


  async function loadAchievements() {

    try {

      const data =
        await getAchievements();

      setAchievements(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }


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
                Real achievements earned from interview performance
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
                Unlocked
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


          {
            loading ? (

              <div
                className="
                  text-zinc-400
                  text-xl
                "
              >
                Loading achievements...
              </div>

            ) : (

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

                        achievementIcons[
                          item.title
                        ] || Trophy;

                      return (

                        <div
                          key={index}
                          className="
                            border
                            border-cyan-400/20
                            bg-cyan-400/5
                            rounded-3xl
                            p-8
                          "
                        >

                          <div
                            className="
                              flex
                              justify-between
                              items-center
                              mb-8
                            "
                          >

                            <div
                              className="
                                w-20
                                h-20
                                rounded-3xl
                                bg-cyan-400/10
                                flex
                                items-center
                                justify-center
                              "
                            >

                              <Icon
                                className="
                                  text-cyan-400
                                "
                                size={38}
                              />

                            </div>

                            <span
                              className="
                                text-green-400
                                text-sm
                              "
                            >
                              UNLOCKED
                            </span>

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
                            "
                          >
                            Achievement earned through interview performance.
                                                    </p>

                        </div>

                      );
                    }
                  )
                }

              </div>

            )
          }

        </div>

      </div>

    </MainLayout>

  );
}

export default Achievements;