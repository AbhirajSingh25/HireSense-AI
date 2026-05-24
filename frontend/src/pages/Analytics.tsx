import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  motion,
} from "framer-motion";

import {
  Activity,
  Brain,
  Mic,
  Eye,
} from "lucide-react";

import {
  getInterviewSessions,
} from "../services/api";

import {
  useAuth,
} from "../context/AuthContext";


function Analytics() {

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

      loadAnalytics();
    }

  }, [user]);


  async function loadAnalytics() {

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


  const averageEyeContact =

    interviews.length > 0

      ? Math.round(

          interviews.reduce(

            (
              acc,
              item
            ) =>

              acc +

              (
                item.eye_contact_score ||
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

          Loading analytics...

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
            AI Analytics
          </h1>

          <p
            className="
              text-zinc-400
              text-2xl
            "
          >
            Real interview intelligence metrics
          </p>

        </div>


        <div
          className="
            grid
            md:grid-cols-2
            gap-8
            mb-12
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
              p-10
            "
          >

            <Brain
              className="
                text-cyan-400
                mb-6
              "
              size={50}
            />

            <div
              className="
                text-zinc-400
                mb-4
              "
            >
              Average Confidence
            </div>

            <div
              className="
                text-7xl
                font-black
                mb-4
              "
            >

              {
                averageConfidence
              }

            </div>

            <div
              className="
                w-full
                h-4
                bg-black/30
                rounded-full
                overflow-hidden
              "
            >

              <div
                className="
                  h-full
                  bg-cyan-400
                "
                style={{
                  width:
                    `${averageConfidence}%`,
                }}
              />

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
              p-10
            "
          >

            <Activity
              className="
                text-purple-400
                mb-6
              "
              size={50}
            />

            <div
              className="
                text-zinc-400
                mb-4
              "
            >
              Communication
            </div>

            <div
              className="
                text-7xl
                font-black
                mb-4
              "
            >

              {
                averageCommunication
              }

            </div>

            <div
              className="
                w-full
                h-4
                bg-black/30
                rounded-full
                overflow-hidden
              "
            >

              <div
                className="
                  h-full
                  bg-purple-400
                "
                style={{
                  width:
                    `${averageCommunication}%`,
                }}
              />

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
              p-10
            "
          >

            <Mic
              className="
                text-green-400
                mb-6
              "
              size={50}
            />

            <div
              className="
                text-zinc-400
                mb-4
              "
            >
              Speaking Speed
            </div>

            <div
              className="
                text-7xl
                font-black
                mb-4
              "
            >

              {
                averageWPM
              }

            </div>

            <div
              className="
                text-zinc-400
              "
            >
              Words Per Minute
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
              p-10
            "
          >

            <Eye
              className="
                text-yellow-400
                mb-6
              "
              size={50}
            />

            <div
              className="
                text-zinc-400
                mb-4
              "
            >
              Eye Contact
            </div>

            <div
              className="
                text-7xl
                font-black
                mb-4
              "
            >

              {
                averageEyeContact
              }

            </div>

            <div
              className="
                w-full
                h-4
                bg-black/30
                rounded-full
                overflow-hidden
              "
            >

              <div
                className="
                  h-full
                  bg-yellow-400
                "
                style={{
                  width:
                    `${averageEyeContact}%`,
                }}
              />

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
            Performance Summary
          </h2>


          <div
            className="
              text-zinc-300
              leading-10
              text-xl
            "
          >

            You have completed

            <span
              className="
                text-cyan-400
                font-bold
              "
            >
              {" "}
              {interviews.length}{" "}
            </span>

            AI interviews with an average confidence
            score of

            <span
              className="
                text-purple-400
                font-bold
              "
            >
              {" "}
              {averageConfidence}%{" "}
            </span>

            and communication rating of

            <span
              className="
                text-green-400
                font-bold
              "
            >
              {" "}
              {averageCommunication}%.
            </span>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default Analytics;