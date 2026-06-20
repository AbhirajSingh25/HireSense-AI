import { useState } from "react";

import MainLayout from "../components/MainLayout";

function HiringProbability() {

  const [
    ats,
    setAts
  ] = useState("");

  const [
    interview,
    setInterview
  ] = useState("");

  const [
    jd,
    setJd
  ] = useState("");

  const [
    result,
    setResult
  ] = useState<any>(null);

  async function calculate() {

    const response =
      await fetch(

        "http://127.0.0.1:8000/hiring/probability",

        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            ats_score:
              Number(ats),

            interview_score:
              Number(interview),

            jd_match_score:
              Number(jd),
          }),
        }
      );

    const data =
      await response.json();

    setResult(data);
  }

  return (

    <MainLayout>

      <div className="max-w-5xl mx-auto">

        <h1
          className="
            text-6xl
            font-black
            mb-10
          "
        >
          Hiring Probability
        </h1>

        <div className="space-y-4">

          <input
            placeholder="ATS Score"
            value={ats}
            onChange={(e)=>
              setAts(
                e.target.value
              )
            }
          />

          <input
            placeholder="Interview Score"
            value={interview}
            onChange={(e)=>
              setInterview(
                e.target.value
              )
            }
          />

          <input
            placeholder="JD Match Score"
            value={jd}
            onChange={(e)=>
              setJd(
                e.target.value
              )
            }
          />

          <button
            onClick={calculate}
          >
            Calculate
          </button>

        </div>

        {result && (

          <div className="mt-10">

            <h2>
              {result.probability}%
            </h2>

            <p>
              {result.verdict}
            </p>

          </div>

        )}

      </div>

    </MainLayout>
  );
}

export default HiringProbability;