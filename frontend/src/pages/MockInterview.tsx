// frontend/src/pages/MockInterview.tsx

import {
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import Card from "../components/ui/Card";

import Button from "../components/ui/Button";

import {
  Brain,
  Sparkles,
} from "lucide-react";

import {
  generateQuestions,
} from "../services/api";


function MockInterview() {

  const [
    role,
    setRole,
  ] = useState(
    "Frontend Developer"
  );

  const [
    level,
    setLevel,
  ] = useState(
    "Intermediate"
  );

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    questions,
    setQuestions,
  ] = useState<string[]>([]);


  async function handleStart() {

    try {

      setLoading(true);

      const response =

        await generateQuestions(
          role
        );

      setQuestions(
        response.questions || []
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to start interview"
      );

    } finally {

      setLoading(false);
    }
  }


  return (

    <MainLayout>

      <div className="mb-10">

        <h1
          className="
            text-6xl
            font-black
            leading-none
            mb-4
          "
        >
          AI Mock
          <br />
          Interview
        </h1>

        <p
          className="
            text-zinc-400
            text-xl
          "
        >
          Adaptive AI-powered interview simulation
        </p>

      </div>


      <Card
        className="
          p-10
          max-w-4xl
        "
      >

        <div
          className="
            grid
            md:grid-cols-2
            gap-8
            mb-10
          "
        >

          <div>

            <label
              className="
                block
                text-zinc-400
                mb-4
              "
            >
              Job Role
            </label>

            <input
              value={role}
              onChange={(e) =>
                setRole(
                  e.target.value
                )
              }
              className="
                w-full
                p-5
                rounded-3xl
                bg-[#0f172a]
                border
                border-cyan-500/20
                outline-none
                text-white
              "
            />

          </div>


          <div>

            <label
              className="
                block
                text-zinc-400
                mb-4
              "
            >
              Experience Level
            </label>

            <select
              value={level}
              onChange={(e) =>
                setLevel(
                  e.target.value
                )
              }
              className="
                w-full
                p-5
                rounded-3xl
                bg-[#0f172a]
                border
                border-cyan-500/20
                outline-none
                text-white
              "
            >

              <option>
                Beginner
              </option>

              <option>
                Intermediate
              </option>

              <option>
                Advanced
              </option>

            </select>

          </div>

        </div>


        <Button
          onClick={handleStart}
        >

          <Brain size={20} />

          {
            loading

              ? "Starting..."

              : "Start Interview"
          }

        </Button>

      </Card>


      {
        questions.length > 0 && (

          <div className="mt-10">

            <Card className="p-10">

              <div
                className="
                  flex
                  items-center
                  gap-3
                  mb-8
                "
              >

                <Sparkles
                  className="
                    text-cyan-400
                  "
                />

                <h2
                  className="
                    text-4xl
                    font-black
                  "
                >
                  AI Questions
                </h2>

              </div>


              <div className="space-y-5">

                {questions.map(
                  (question, index) => (

                    <div
                      key={index}
                      className="
                        p-6
                        rounded-3xl
                        bg-black/30
                        border
                        border-white/5
                      "
                    >

                      <p
                        className="
                          text-lg
                          text-zinc-200
                          leading-relaxed
                        "
                      >
                        <span
                          className="
                            text-cyan-400
                            font-bold
                          "
                        >
                          Q{index + 1}.
                        </span>

                        {" "}

                        {question}

                      </p>

                    </div>
                  )
                )}

              </div>

            </Card>

          </div>
        )
      }

    </MainLayout>
  );
}

export default MockInterview;