import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  getFinalReport,
} from "../services/api";


function RecruiterDashboard() {

  const [
    report,
    setReport,
  ] = useState<any>(null);


  useEffect(() => {

    loadDashboard();

  }, []);


  async function loadDashboard() {

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
          Recruiter Dashboard
        </h1>


        <div
          className="
            grid
            md:grid-cols-3
            gap-6
          "
        >

          <div
            className="
              bg-white/5
              p-6
              rounded-2xl
            "
          >

            <h2
              className="
                text-gray-400
                mb-2
              "
            >
              Confidence
            </h2>

            <p
              className="
                text-4xl
                font-bold
                text-cyan-400
              "
            >
              {
                report?.confidence_score || 0
              }%
            </p>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default RecruiterDashboard;