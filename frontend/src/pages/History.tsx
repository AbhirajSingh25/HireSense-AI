import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  Clock,
  Brain,
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


function History() {

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

      fetchHistory();
    }

  }, [user]);


  async function fetchHistory() {

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


  if (loading) {

    return (

      <MainLayout>

        <div
          className="
            text-white
            p-10
          "
        >

          Loading history...

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

        <div className="mb-12">

          <h1
            className="
              text-7xl
              font-black
              mb-4
            "
          >
            Interview History
          </h1>

          <p
            className="
              text-zinc-400
              text-2xl
            "
          >
            Your saved AI interview sessions
          </p>

        </div>


        <div
          className="
            space-y-8
          "
        >

          {
            interviews.map(
              (
                item,
                index
              ) => (

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

                  className="
                    bg-white/5
                    border
                    border-white/10
                    rounded-3xl
                    p-8
                  "
                >

                  <div
                    className="
                      flex
                      justify-between
                      items-center
                      mb-6
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-4
                      "
                    >

                      <Brain
                        className="
                          text-cyan-400
                        "
                        size={36}
                      />

                      <div>

                        <h2
                          className="
                            text-3xl
                            font-bold
                          "
                        >

                          Interview #
                          {item.id}

                        </h2>

                        <div
                          className="
                            text-zinc-400
                            mt-2
                          "
                        >

                          {
                            item.attention_status
                          }

                        </div>

                      </div>

                    </div>


                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        text-zinc-400
                      "
                    >

                      <Clock />

                      Completed

                    </div>

                  </div>


                  <div
                    className="
                      grid
                      md:grid-cols-4
                      gap-6
                      mb-8
                    "
                  >

                    <div
                      className="
                        bg-cyan-400/10
                        rounded-2xl
                        p-5
                      "
                    >

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
                          text-4xl
                          font-black
                          text-cyan-400
                        "
                      >

                        {
                          item.confidence_score
                        }

                      </div>

                    </div>


                    <div
                      className="
                        bg-purple-400/10
                        rounded-2xl
                        p-5
                      "
                    >

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
                          text-4xl
                          font-black
                          text-purple-400
                        "
                      >

                        {
                          item.communication_score
                        }

                      </div>

                    </div>


                    <div
                      className="
                        bg-green-400/10
                        rounded-2xl
                        p-5
                      "
                    >

                      <div
                        className="
                          text-zinc-400
                          mb-2
                        "
                      >
                        WPM
                      </div>

                      <div
                        className="
                          text-4xl
                          font-black
                          text-green-400
                        "
                      >

                        {
                          item.words_per_minute
                        }

                      </div>

                    </div>


                    <div
                      className="
                        bg-yellow-400/10
                        rounded-2xl
                        p-5
                      "
                    >

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
                          text-4xl
                          font-black
                          text-yellow-400
                        "
                      >

                        {
                          item.eye_contact_score
                        }

                      </div>

                    </div>

                  </div>


                  <div
                    className="
                      bg-black/30
                      rounded-2xl
                      p-6
                      text-zinc-300
                      leading-8
                    "
                  >

                    {
                      item.transcript
                    }

                  </div>

                </motion.div>
              )
            )
          }

        </div>

      </div>

    </MainLayout>
  );
}

export default History;