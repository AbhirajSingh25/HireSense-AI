import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  getInterviewSessions,
} from "../services/api";


function RecruiterInsights() {

  const [
    candidates,
    setCandidates,
  ] = useState<any[]>([]);


  useEffect(() => {

    loadInsights();

  }, []);


  async function loadInsights() {

    try {

      const user =
        JSON.parse(
          localStorage.getItem("user") || "{}"
        );


      const data =
        await getInterviewSessions(
          user.id || 1
        );


      setCandidates(data);

    } catch (error) {

      console.error(error);
    }
  }


  return (

    <MainLayout>

      <div>

        <h1
          className="
            text-4xl
            font-bold
            text-white
            mb-8
          "
        >
          Recruiter Insights
        </h1>


        <div
          className="
            space-y-6
          "
        >

          {candidates.map((candidate) => (

            <div
              key={candidate.id}
              className="
                bg-white/5
                border
                border-white/10
                rounded-2xl
                p-6
              "
            >

              <h2
                className="
                  text-2xl
                  font-semibold
                  text-white
                  mb-4
                "
              >
                Candidate #{candidate.id}
              </h2>


              <div
                className="
                  grid
                  md:grid-cols-3
                  gap-4
                "
              >

                <div
                  className="
                    bg-black/20
                    rounded-xl
                    p-4
                  "
                >

                  <p
                    className="
                      text-gray-400
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
                    {candidate.confidence_score}%
                  </h3>

                </div>


                <div
                  className="
                    bg-black/20
                    rounded-xl
                    p-4
                  "
                >

                  <p
                    className="
                      text-gray-400
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
                    {candidate.communication_score}%
                  </h3>

                </div>


                <div
                  className="
                    bg-black/20
                    rounded-xl
                    p-4
                  "
                >

                  <p
                    className="
                      text-gray-400
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
                    {candidate.words_per_minute}
                  </h3>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </MainLayout>
  );
}

export default RecruiterInsights;