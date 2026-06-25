import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  getLatestReport,
  getHiringProbability,
} from "../services/api";

function HiringProbability() {

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    result,
    setResult,
  ] = useState<any>(null);

  const [
    report,
    setReport,
  ] = useState<any>(null);

  useEffect(() => {

    loadProbability();

  }, []);

  async function loadProbability() {

    try {

      const latestReport =
        await getLatestReport();

      setReport(
        latestReport
      );

      const evaluation =
        latestReport
          ?.evaluations?.[0];

      if (!evaluation) {

        setLoading(false);

        return;
      }

      const probabilityResult =
        await getHiringProbability(

          evaluation.confidence || 0,

          evaluation.communication || 0,

          evaluation.technical || 0
        );

      setResult(
        probabilityResult
      );

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
            max-w-5xl
            mx-auto
            text-white
          "
        >
          Loading...
        </div>

      </MainLayout>
    );
  }

  if (!report || !result) {

    return (

      <MainLayout>

        <div
          className="
            max-w-5xl
            mx-auto
            text-white
          "
        >
          No Interview Data Found
        </div>

      </MainLayout>
    );
  }

  return (

    <MainLayout>

      <div
        className="
          max-w-5xl
          mx-auto
        "
      >

        <h1
          className="
            text-6xl
            font-black
            mb-10
          "
        >
          Hiring Probability
        </h1>

        <div
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
              text-center
              mb-10
            "
          >

            <h2
              className="
                text-8xl
                font-black
                text-red-400
              "
            >
              {result.probability}%
            </h2>

            <p
              className="
                text-2xl
                text-zinc-400
                mt-4
              "
            >
              Selection Probability
            </p>

          </div>

          <div
            className="
              grid
              md:grid-cols-2
              gap-8
            "
          >

            <div>

              <h3
                className="
                  text-2xl
                  font-bold
                  mb-4
                "
              >
                Interview Summary
              </h3>

              <p>
                Role:
                {" "}
                {report.role}
              </p>

              <p>
                Level:
                {" "}
                {report.level}
              </p>

              <p>
                Score:
                {" "}
                {report.overall_score}
              </p>

            </div>

            <div>

              <h3
                className="
                  text-2xl
                  font-bold
                  mb-4
                "
              >
                AI Verdict
              </h3>

              <p
                className="
                  text-green-400
                  text-xl
                "
              >
                {result.verdict}
              </p>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default HiringProbability;