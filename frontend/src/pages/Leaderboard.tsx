import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  Trophy,
  Crown,
  Medal,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  getInterviewSessions,
} from "../services/api";


function Leaderboard() {

  const [
    leaderboard,
    setLeaderboard,
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);


  useEffect(() => {

    loadLeaderboard();

  }, []);


  async function loadLeaderboard() {

    try {

      const data =
        await getInterviewSessions();


      const ranked =
        data.map(
          (
            item: any
          ) => {

            const overallScore =
              (

                item.confidence_score +

                item.communication_score +

                item.eye_contact_score

              ) / 3;


            return {

              ...item,

              overallScore:
                overallScore.toFixed(1),
            };
          }
        );


      ranked.sort(

        (
          a: any,
          b: any
        ) =>

          Number(
            b.overallScore
          ) -

          Number(
            a.overallScore
          )
      );


      setLeaderboard(
        ranked
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }


  if (loading) {

    return (

      <MainLayout>

        <div
          className="
            text-white
            p-10
          "
        >

          Loading leaderboard...

        </div>

      </MainLayout>
    );
  }


  return (

    <MainLayout>

      <div
        className="
          min-h-screen
          text-white
          p-10
        "
      >

        <div className="mb-14">

          <div
            className="
              flex
              items-center
              gap-5
              mb-4
            "
          >

            <Trophy
              className="
                text-yellow-400
              "
              size={56}
            />

            <h1
              className="
                text-7xl
                font-black
              "
            >
              AI Leaderboard
            </h1>

          </div>


          <p
            className="
              text-zinc-400
              text-2xl
            "
          >
            Ranked interview performance analytics
          </p>

        </div>


        <div
          className="
            space-y-8
          "
        >

          {
            leaderboard.map(
              (
                user,
                index
              ) => {

                const isTop =
                  index === 0;

                const isSecond =
                  index === 1;

                const isThird =
                  index === 2;


                return (

                  <motion.div

                    key={index}

                    initial={{
                      opacity: 0,
                      y: 20,
                    }}

                    animate={{
                      opacity: 1,
                      y: 0,
                    }}

                    transition={{
                      delay:
                        index * 0.08,
                    }}

                    className={`
                      rounded-3xl
                      p-8
                      border
                      flex
                      items-center
                      justify-between

                      ${
                        isTop

                          ? "bg-yellow-400/10 border-yellow-400/20"

                          : isSecond

                          ? "bg-zinc-400/10 border-zinc-400/20"

                          : isThird

                          ? "bg-orange-400/10 border-orange-400/20"

                          : "bg-white/5 border-white/10"
                      }
                    `}
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-6
                      "
                    >

                      <div
                        className="
                          text-5xl
                          font-black
                          w-20
                        "
                      >

                        #
                        {index + 1}

                      </div>


                      <div>

                        <div
                          className="
                            flex
                            items-center
                            gap-3
                            mb-3
                          "
                        >

                          {
                            isTop && (

                              <Crown
                                className="
                                  text-yellow-400
                                "
                              />
                            )
                          }

                          {
                            (
                              isSecond ||

                              isThird
                            ) && (

                              <Medal
                                className="
                                  text-zinc-300
                                "
                              />
                            )
                          }


                          <div
                            className="
                              text-3xl
                              font-bold
                            "
                          >

                            Interview #
                            {user.id}

                          </div>

                        </div>


                        <div
                          className="
                            text-zinc-400
                          "
                        >

                          {
                            user.attention_status
                          }

                        </div>

                      </div>

                    </div>


                    <div
                      className="
                        grid
                        grid-cols-4
                        gap-10
                        text-center
                      "
                    >

                      <div>

                        <div
                          className="
                            text-zinc-400
                            mb-2
                          "
                        >
                          Confidence
                        </div>

                        <div
                          className="
                            text-3xl
                            font-black
                            text-cyan-400
                          "
                        >

                          {
                            user.confidence_score
                          }

                        </div>

                      </div>


                      <div>

                        <div
                          className="
                            text-zinc-400
                            mb-2
                          "
                        >
                          Communication
                        </div>

                        <div
                          className="
                            text-3xl
                            font-black
                            text-purple-400
                          "
                        >

                          {
                            user.communication_score
                          }

                        </div>

                      </div>


                      <div>

                        <div
                          className="
                            text-zinc-400
                            mb-2
                          "
                        >
                          Eye Contact
                        </div>

                        <div
                          className="
                            text-3xl
                            font-black
                            text-green-400
                          "
                        >

                          {
                            user.eye_contact_score
                          }

                        </div>

                      </div>


                      <div>

                        <div
                          className="
                            text-zinc-400
                            mb-2
                          "
                        >
                          Overall
                        </div>

                        <div
                          className="
                            text-4xl
                            font-black
                            text-yellow-400
                          "
                        >

                          {
                            user.overallScore
                          }

                        </div>

                      </div>

                    </div>

                  </motion.div>
                );
              }
            )
          }

        </div>

      </div>

    </MainLayout>
  );
}

export default Leaderboard;