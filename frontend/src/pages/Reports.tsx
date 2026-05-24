import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  FileText,
  Brain,
  Eye,
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


function Reports() {

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

      loadReports();
    }

  }, [user]);


  async function loadReports() {

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

          Loading reports...

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
            Recruiter Reports
          </h1>

          <p
            className="
              text-zinc-400
              text-2xl
            "
          >
            AI-generated interview intelligence reports
          </p>

        </div>


        <div
          className="
            space-y-10
          "
        >

          {
            interviews
              .slice()
              .reverse()
              .map(
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
                        index * 0.05,
                    }}

                    className="
                      bg-white/5
                      border
                      border-white/10
                      rounded-3xl
                      p-10
                    "
                  >

                    <div
                      className="
                        flex
                        justify-between
                        items-center
                        mb-10
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-5
                        "
                      >

                        <FileText
                          className="
                            text-cyan-400
                          "
                          size={42}
                        />

                        <div>

                          <h2
                            className="
                              text-4xl
                              font-bold
                            "
                          >

                            Interview Report #
                            {item.id}

                          </h2>

                          <div
                            className="
                              text-zinc-400
                              mt-2
                            "
                          >

                            Attention Status:
                            {" "}
                            {item.attention_status}

                          </div>

                        </div>

                      </div>


                      <div
                        className="
                          bg-cyan-400/10
                          text-cyan-400
                          px-5
                          py-3
                          rounded-2xl
                          font-bold
                        "
                      >

                        AI Evaluated

                      </div>

                    </div>


                    <div
                      className="
                        grid
                        md:grid-cols-3
                        gap-8
                        mb-10
                      "
                    >

                      <div
                        className="
                          bg-cyan-400/10
                          rounded-3xl
                          p-8
                        "
                      >

                        <Brain
                          className="
                            text-cyan-400
                            mb-5
                          "
                          size={38}
                        />

                        <div
                          className="
                            text-zinc-400
                            mb-3
                          "
                        >
                          Confidence
                        </div>

                        <div
                          className="
                            text-6xl
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
                          rounded-3xl
                          p-8
                        "
                      >

                        <Mic
                          className="
                            text-purple-400
                            mb-5
                          "
                          size={38}
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
                          bg-yellow-400/10
                          rounded-3xl
                          p-8
                        "
                      >

                        <Eye
                          className="
                            text-yellow-400
                            mb-5
                          "
                          size={38}
                        />

                        <div
                          className="
                            text-zinc-400
                            mb-3
                          "
                        >
                          Eye Contact
                        </div>

                        <div
                          className="
                            text-6xl
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
                        rounded-3xl
                        p-8
                        mb-8
                      "
                    >

                      <div
                        className="
                          text-2xl
                          font-bold
                          mb-5
                        "
                      >
                        Transcript
                      </div>

                      <div
                        className="
                          text-zinc-300
                          leading-9
                        "
                      >

                        {
                          item.transcript
                        }

                      </div>

                    </div>


                    <div
                      className="
                        bg-green-400/10
                        border
                        border-green-400/20
                        rounded-3xl
                        p-8
                      "
                    >

                      <div
                        className="
                          text-2xl
                          font-bold
                          text-green-400
                          mb-4
                        "
                      >
                        Recruiter AI Summary
                      </div>

                      <div
                        className="
                          text-zinc-300
                          leading-9
                        "
                      >

                        Candidate demonstrated

                        <span
                          className="
                            text-cyan-400
                            font-bold
                          "
                        >
                          {" "}
                          {
                            item.communication_score > 80

                              ? "strong"

                              : "moderate"
                          }{" "}
                        </span>

                        communication skills with

                        <span
                          className="
                            text-purple-400
                            font-bold
                          "
                        >
                          {" "}
                          {
                            item.confidence_score > 80

                              ? "high"

                              : "average"
                          }{" "}
                        </span>

                        confidence levels during the interview.
                        Attention tracking and speaking metrics
                        indicate stable engagement throughout
                        the session.

                      </div>

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

export default Reports;