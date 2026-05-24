import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  Brain,
  Trophy,
  BarChart3,
  Mic,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  getInterviewSessions,
} from "../services/api";

import {
  useAuth,
} from "../context/AuthContext";


function Dashboard() {

  const {
    user,
  } = useAuth();


  const [
    interviews,
    setInterviews,
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);


  useEffect(() => {

    if (user?.id) {

      loadDashboard();
    }

  }, [user]);


  async function loadDashboard() {

    try {

      const data =
        await getInterviewSessions(
          user!.id
        );

      setInterviews(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }


  const totalInterviews =
    interviews.length;


  const averageConfidence =

    interviews.length > 0

      ? Math.round(

          interviews.reduce(

            (
              acc,
              item
            ) =>

              acc +

              (
                item.confidence_score ||
                0
              ),

            0
          ) /

          interviews.length
        )

      : 0;


  const averageCommunication =

    interviews.length > 0

      ? Math.round(

          interviews.reduce(

            (
              acc,
              item
            ) =>

              acc +

              (
                item.communication_score ||
                0
              ),

            0
          ) /

          interviews.length
        )

      : 0;


  const averageWPM =

    interviews.length > 0

      ? Math.round(

          interviews.reduce(

            (
              acc,
              item
            ) =>

              acc +

              (
                item.words_per_minute ||
                0
              ),

            0
          ) /

          interviews.length
        )

      : 0;


  if (loading) {

    return (

      <MainLayout>

        <div
          className="
            text-white
            p-10
          "
        >

          Loading dashboard...

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

          <h1
            className="
              text-7xl
              font-black
              mb-4
            "
          >
            AI Analytics Dashboard
          </h1>

          <p
            className="
              text-zinc-400
              text-2xl
            "
          >
            Real-time interview intelligence
          </p>

        </div>


        <div
          className="
            grid
            md:grid-cols-4
            gap-8
            mb-14
          "
        >

          <motion.div

            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            className="
              bg-cyan-400/10
              border
              border-cyan-400/20
              rounded-3xl
              p-8
            "
          >

            <Brain
              className="
                text-cyan-400
                mb-6
              "
              size={42}
            />

            <div
              className="
                text-zinc-400
                mb-3
              "
            >
              Total Interviews
            </div>

            <div
              className="
                text-6xl
                font-black
              "
            >

              {
                totalInterviews
              }

            </div>

          </motion.div>


          <motion.div

            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: 0.1,
            }}

            className="
              bg-purple-400/10
              border
              border-purple-400/20
              rounded-3xl
              p-8
            "
          >

            <Trophy
              className="
                text-purple-400
                mb-6
              "
              size={42}
            />

            <div
              className="
                text-zinc-400
                mb-3
              "
            >
              Confidence Score
            </div>

            <div
              className="
                text-6xl
                font-black
              "
            >

              {
                averageConfidence
              }

            </div>

          </motion.div>


          <motion.div

            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: 0.2,
            }}

            className="
              bg-green-400/10
              border
              border-green-400/20
              rounded-3xl
              p-8
            "
          >

            <BarChart3
              className="
                text-green-400
                mb-6
              "
              size={42}
            />

            <div
              className="
                text-zinc-400
                mb-3
              "
            >
              Communication
            </div>

            <div
              className="
                text-6xl
                font-black
              "
            >

              {
                averageCommunication
              }

            </div>

          </motion.div>


          <motion.div

            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: 0.3,
            }}

            className="
              bg-yellow-400/10
              border
              border-yellow-400/20
              rounded-3xl
              p-8
            "
          >

            <Mic
              className="
                text-yellow-400
                mb-6
              "
              size={42}
            />

            <div
              className="
                text-zinc-400
                mb-3
              "
            >
              Average WPM
            </div>

            <div
              className="
                text-6xl
                font-black
              "
            >

              {
                averageWPM
              }

            </div>

          </motion.div>

        </div>


        <div
          className="
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-10
          "
        >

          <h2
            className="
              text-4xl
              font-bold
              mb-8
            "
          >
            Recent Interviews
          </h2>


          <div
            className="
              space-y-6
            "
          >

            {
              interviews
                .slice()
                .reverse()
                .slice(0, 5)
                .map(
                  (
                    item,
                    index
                  ) => (

                    <motion.div

                      key={index}

                      initial={{
                        opacity: 0,
                        x: -20,
                      }}

                      animate={{
                        opacity: 1,
                        x: 0,
                      }}

                      transition={{
                        delay:
                          index * 0.05,
                      }}

                      className="
                        bg-black/30
                        rounded-2xl
                        p-6
                        border
                        border-white/5
                      "
                    >

                      <div
                        className="
                          flex
                          justify-between
                          items-center
                          mb-4
                        "
                      >

                        <div
                          className="
                            text-2xl
                            font-bold
                          "
                        >

                          Interview #
                          {item.id}

                        </div>


                        <div
                          className="
                            text-cyan-400
                            font-bold
                          "
                        >

                          {
                            item.confidence_score
                          }
                          %

                        </div>

                      </div>


                      <div
                        className="
                          text-zinc-400
                          leading-7
                        "
                      >

                        {
                          item.transcript
                            ?.slice(0, 180)
                        }

                        ...

                      </div>

                    </motion.div>
                  )
                )
            }

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default Dashboard;