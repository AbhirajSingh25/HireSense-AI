import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  getInterviewSessions,
} from "../services/api";


function RecruiterDashboard() {

  const [
    candidates,
    setCandidates,
  ] = useState<any[]>([]);


  useEffect(() => {

    loadCandidates();

  }, []);


  async function loadCandidates() {

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
          Recruiter Dashboard
        </h1>


        <div
          className="
            grid
            md:grid-cols-2
            gap-6
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
                  space-y-2
                  text-gray-300
                "
              >

                <p>
                  Confidence:
                  {" "}
                  {candidate.confidence_score}%
                </p>

                <p>
                  Communication:
                  {" "}
                  {candidate.communication_score}%
                </p>

                <p>
                  WPM:
                  {" "}
                  {candidate.words_per_minute}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </MainLayout>
  );
}

export default RecruiterDashboard;