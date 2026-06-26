import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  downloadCertificate,
  getLatestReport,
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
        await getLatestReport();

      setReport(data);

    } catch (error) {

      console.error(error);
    }
  }

  if (!report) {

    return (

      <MainLayout>

        <div className="p-10 text-white">

          Loading Certificate...

        </div>

      </MainLayout>
    );
  }

  return (

    <MainLayout>

      <div className="max-w-5xl mx-auto p-10">

        <h1
          className="
            text-5xl
            font-black
            text-white
            mb-8
          "
        >
          Certificate
        </h1>

        <div
          className="
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            rounded-3xl
            p-10
            text-black
          "
        >

          <h2
            className="
              text-4xl
              font-black
              mb-6
            "
          >
            HireSense AI
          </h2>

          <p className="text-xl mb-3">
            Candidate:
            {" "}
            Abhiraj Singh
          </p>

          <p className="text-xl mb-3">
            Role:
            {" "}
            {report.role}
          </p>

          <p className="text-xl mb-3">
            Level:
            {" "}
            {report.level}
          </p>

          <p className="text-xl mb-6">
            Score:
            {" "}
            {report.overall_score}%
          </p>

          <button
            onClick={() =>
              downloadCertificate(
                "Abhiraj Singh",
                report.overall_score
              )
            }
            className="
              bg-black
              text-white
              px-6
              py-3
              rounded-xl
              font-bold
            "
          >
            Download PDF Certificate
          </button>

        </div>

      </div>

    </MainLayout>
  );
}

export default Certificate;