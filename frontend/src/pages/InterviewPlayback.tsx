import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  getFinalReport,
} from "../services/api";


function InterviewPlayback() {

  const [
    report,
    setReport,
  ] = useState<any>(null);


  useEffect(() => {

    loadPlayback();

  }, []);


  async function loadPlayback() {

    try {

      const data =
        await getFinalReport();

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
          Interview Playback
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

          <p
            className="
              text-gray-300
              leading-8
            "
          >
            {
              report?.transcript ||
              "No transcript"
            }
          </p>

        </div>

      </div>

    </MainLayout>
  );
}

export default InterviewPlayback;