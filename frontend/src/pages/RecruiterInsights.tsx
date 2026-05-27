import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  getFinalReport,
} from "../services/api";


function RecruiterInsights() {

  const [
    report,
    setReport,
  ] = useState<any>(null);


  useEffect(() => {

    loadInsights();

  }, []);


  async function loadInsights() {

    try {

      const data =
        await getFinalReport({});

      setReport(data);

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
            bg-white/5
            border
            border-white/10
            rounded-2xl
            p-6
          "
        >

          <div
            className="
              grid
              md:grid-cols-3
              gap-5
            "
          >

            <div>

              <p
                className="
                  text-gray-400
                "
              >
                Communication
              </p>

              <h2
                className="
                  text-4xl
                  font-bold
                  text-green-400
                "
              >
                {
                  report?.communication_score || 0
                }%
              </h2>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default RecruiterInsights;