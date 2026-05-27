import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  getInterviewSessions,
} from "../services/api";

import {

  Brain,
  MessageSquare,
  Eye,
  Clock3,
  BadgeCheck,
  AlertTriangle,

} from "lucide-react";


function Reports() {

  const [
    reports,
    setReports,
  ] = useState<any[]>([]);


  useEffect(() => {

    loadReports();

  }, []);


  async function loadReports() {

    try {

      const user =
        JSON.parse(
          localStorage.getItem("user") || "{}"
        );


      const data =
        await getInterviewSessions(
          user.id || 1
        );


      setReports(data);

    } catch (error) {

      console.error(error);
    }
  }


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
            AI Interview Reports
          </h1>

          <p
            className="
              text-gray-400
            "
          >
            Detailed AI-generated interview performance analysis
          </p>

        </div>


        <div
          className="
            space-y-8
          "
        >

          {reports.map((report) => (

            <div
              key={report.id}
              className="
                bg-white/5
                border
                border-white/10
                rounded-3xl
                overflow-hidden
              "
            >

              <div
                className="
                  bg-linear-to-r
                  from-cyan-500/20
                  to-blue-500/20
                  border-b
                  border-white/10
                  p-6
                "
              >

                <div
                  className="
                    flex
                    flex-col
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                    gap-5
                  "
                >

                  <div>

                    <h2
                      className="
                        text-3xl
                        font-black
                        text-white
                        mb-2
                      "
                    >
                      Interview Report #
                      {report.id}
                    </h2>

                    <p
                      className="
                        text-gray-300
                      "
                    >
                      AI-generated candidate evaluation
                    </p>

                  </div>


                  <div
                    className="
                      inline-flex
                      px-5
                      py-3
                      rounded-2xl
                      bg-cyan-400
                      text-black
                      font-bold
                    "
                  >

                    {
                      report.attention_status
                    }

                  </div>

                </div>

              </div>


              <div
                className="
                  p-6
                "
              >

                <div
                  className="
                    grid
                    grid-cols-2
                    xl:grid-cols-4
                    gap-5
                    mb-8
                  "
                >

                  <div
                    className="
                      bg-black/20
                      rounded-2xl
                      p-5
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        mb-4
                      "
                    >

                      <Brain
                        className="
                          text-cyan-400
                        "
                        size={22}
                      />

                      <span
                        className="
                          text-gray-400
                        "
                      >
                        Confidence
                      </span>

                    </div>

                    <h3
                      className="
                        text-4xl
                        font-black
                        text-white
                      "
                    >
                      {
                        report.confidence_score
                      }%
                    </h3>

                  </div>


                  <div
                    className="
                      bg-black/20
                      rounded-2xl
                      p-5
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        mb-4
                      "
                    >

                      <MessageSquare
                        className="
                          text-green-400
                        "
                        size={22}
                      />

                      <span
                        className="
                          text-gray-400
                        "
                      >
                        Communication
                      </span>

                    </div>

                    <h3
                      className="
                        text-4xl
                        font-black
                        text-white
                      "
                    >
                      {
                        report.communication_score
                      }%
                    </h3>

                  </div>


                  <div
                    className="
                      bg-black/20
                      rounded-2xl
                      p-5
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        mb-4
                      "
                    >

                      <Eye
                        className="
                          text-pink-400
                        "
                        size={22}
                      />

                      <span
                        className="
                          text-gray-400
                        "
                      >
                        Eye Contact
                      </span>

                    </div>

                    <h3
                      className="
                        text-4xl
                        font-black
                        text-white
                      "
                    >
                      {
                        report.eye_contact_score
                      }%
                    </h3>

                  </div>


                  <div
                    className="
                      bg-black/20
                      rounded-2xl
                      p-5
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        mb-4
                      "
                    >

                      <Clock3
                        className="
                          text-orange-400
                        "
                        size={22}
                      />

                      <span
                        className="
                          text-gray-400
                        "
                      >
                        WPM
                      </span>

                    </div>

                    <h3
                      className="
                        text-4xl
                        font-black
                        text-white
                      "
                    >
                      {
                        report.words_per_minute
                      }
                    </h3>

                  </div>

                </div>


                <div
                  className="
                    grid
                    lg:grid-cols-2
                    gap-6
                    mb-8
                  "
                >

                  <div
                    className="
                      bg-green-400/10
                      border
                      border-green-400/20
                      rounded-3xl
                      p-6
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        mb-5
                      "
                    >

                      <BadgeCheck
                        className="
                          text-green-400
                        "
                        size={24}
                      />

                      <h3
                        className="
                          text-2xl
                          font-bold
                          text-white
                        "
                      >
                        Strengths
                      </h3>

                    </div>


                    <ul
                      className="
                        space-y-3
                        text-gray-300
                      "
                    >

                      <li>
                        • Strong communication clarity
                      </li>

                      <li>
                        • Good confidence level
                      </li>

                      <li>
                        • Maintained attention during interview
                      </li>

                    </ul>

                  </div>


                  <div
                    className="
                      bg-orange-400/10
                      border
                      border-orange-400/20
                      rounded-3xl
                      p-6
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        mb-5
                      "
                    >

                      <AlertTriangle
                        className="
                          text-orange-400
                        "
                        size={24}
                      />

                      <h3
                        className="
                          text-2xl
                          font-bold
                          text-white
                        "
                      >
                        Improvements
                      </h3>

                    </div>


                    <ul
                      className="
                        space-y-3
                        text-gray-300
                      "
                    >

                      <li>
                        • Improve technical depth
                      </li>

                      <li>
                        • Use more concise answers
                      </li>

                      <li>
                        • Maintain steady pacing
                      </li>

                    </ul>

                  </div>

                </div>


                <div
                  className="
                    bg-black/20
                    rounded-3xl
                    p-6
                  "
                >

                  <h3
                    className="
                      text-2xl
                      font-bold
                      text-white
                      mb-5
                    "
                  >
                    Interview Transcript
                  </h3>

                  <p
                    className="
                      text-gray-300
                      leading-8
                    "
                  >

                    {
                      report.transcript
                    }

                  </p>

                </div>

              </div>

            </div>
          ))}


          {!reports.length && (

            <div
              className="
                text-center
                py-20
                text-gray-400
              "
            >

              No reports available

            </div>
          )}

        </div>

      </div>

    </MainLayout>
  );
}

export default Reports;