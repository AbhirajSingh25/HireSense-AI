import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  getInterviewSessions,
} from "../services/api";


function Reports() {

  const [
    reports,
    setReports,
  ] = useState<any[]>([]);


  useEffect(() => {

    async function loadReports() {

      try {

        const user =
          JSON.parse(

            localStorage.getItem(
              "user"
            ) || "{}"
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

    loadReports();

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
            Interview Reports
          </h1>

          <p
            className="
              text-gray-400
            "
          >
            Detailed AI interview performance reports
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
                  p-6
                  border-b
                  border-white/10
                  flex
                  justify-between
                  items-center
                "
              >

                <div>

                  <h2
                    className="
                      text-2xl
                      font-bold
                      text-white
                    "
                  >
                    Interview Report #
                    {report.id}
                  </h2>

                  <p
                    className="
                      text-gray-400
                      mt-1
                    "
                  >
                    AI-generated interview analysis
                  </p>

                </div>


                <div
                  className="
                    px-4
                    py-2
                    rounded-xl
                    bg-cyan-400
                    text-black
                    font-semibold
                  "
                >

                  {
                    report.attention_status
                  }

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
                    md:grid-cols-4
                    gap-5
                    mb-8
                  "
                >

                  <div
                    className="
                      bg-black/30
                      rounded-2xl
                      p-5
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
                        text-3xl
                        font-bold
                        text-cyan-400
                      "
                    >
                      {
                        report.confidence_score
                      }%
                    </h3>

                  </div>


                  <div
                    className="
                      bg-black/30
                      rounded-2xl
                      p-5
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
                        text-3xl
                        font-bold
                        text-green-400
                      "
                    >
                      {
                        report.communication_score
                      }%
                    </h3>

                  </div>


                  <div
                    className="
                      bg-black/30
                      rounded-2xl
                      p-5
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
                        text-3xl
                        font-bold
                        text-orange-400
                      "
                    >
                      {
                        report.words_per_minute
                      }
                    </h3>

                  </div>


                  <div
                    className="
                      bg-black/30
                      rounded-2xl
                      p-5
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
                        text-3xl
                        font-bold
                        text-pink-400
                      "
                    >
                      {
                        report.eye_contact_score
                      }%
                    </h3>

                  </div>

                </div>


                <div
                  className="
                    bg-black/20
                    rounded-2xl
                    p-6
                  "
                >

                  <h3
                    className="
                      text-xl
                      font-semibold
                      text-white
                      mb-4
                    "
                  >
                    Transcript
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
                text-gray-400
                py-20
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