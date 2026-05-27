import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  getFinalReport,
} from "../services/api";


function Certificate() {

  const [
    report,
    setReport,
  ] = useState<any>(null);


  useEffect(() => {

    loadCertificate();

  }, []);


  async function loadCertificate() {

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
          Certificate
        </h1>


        <div
          className="
            bg-linear-to-r
            from-cyan-500
            to-blue-500
            rounded-3xl
            p-10
            text-black
          "
        >

          <h2
            className="
              text-3xl
              font-black
              mb-4
            "
          >
            AI Interview Completion
          </h2>

          <p
            className="
              text-xl
            "
          >
            Confidence:
            {" "}
            {
              report?.confidence_score || 0
            }%
          </p>

        </div>

      </div>

    </MainLayout>
  );
}

export default Certificate;