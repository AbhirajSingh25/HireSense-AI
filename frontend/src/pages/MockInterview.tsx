import {
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {

  startInterview,
  getNextQuestion,
  evaluateAnswer,

} from "../services/api";

import {
  Brain,
  Send,
} from "lucide-react";


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
    currentQuestion,
    setCurrentQuestion,
  ] = useState("");

  const [
    answer,
    setAnswer,
  ] = useState("");

  const [
    feedback,
    setFeedback,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    started,
    setStarted,
  ] = useState(false);


  async function handleStart() {

    try {

      setLoading(true);

      const data =
        await startInterview(
          role,
          level
        );

      setCurrentQuestion(
        data.question
      );

      setStarted(true);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }


  async function handleSubmit() {

    if (!answer) return;

    try {

      setLoading(true);

      const evaluation =

        await evaluateAnswer(

          currentQuestion,
          answer
        );


      setFeedback(
        evaluation.evaluation
      );


      const nextQuestion =

        await getNextQuestion(

          role,
          level,

          currentQuestion,

          answer
        );


      setTimeout(() => {

        setCurrentQuestion(

          nextQuestion.question
        );

        setAnswer("");

      }, 1500);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }


  return (

    <MainLayout>

      <div
        className="
          max-w-5xl
          mx-auto
        "
      >

        <div
          className="
            mb-10
          "
        >

          <h1
            className="
              text-5xl
              font-black
              text-white
              mb-3
            "
          >
            AI Mock Interview
          </h1>

          <p
            className="
              text-gray-400
              text-lg
            "
          >
            Adaptive AI-powered interview simulation
          </p>

        </div>


        {!started ? (

          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-8
            "
          >

            <div
              className="
                grid
                md:grid-cols-2
                gap-6
                mb-8
              "
            >

              <div>

                <label
                  className="
                    block
                    text-gray-400
                    mb-3
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
                    bg-[#111827]
                    border
                    border-white/10
                    rounded-2xl
                    p-5
                    text-white
                  "
                />

              </div>


              <div>

                <label
                  className="
                    block
                    text-gray-400
                    mb-3
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
                    bg-[#111827]
                    border
                    border-white/10
                    rounded-2xl
                    p-5
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


            <button
              onClick={handleStart}
              disabled={loading}
              className="
                bg-cyan-400
                hover:bg-cyan-300
                text-black
                font-bold
                py-5
                px-8
                rounded-2xl
                flex
                items-center
                gap-3
              "
            >

              <Brain size={22} />

              {
                loading

                  ? "Starting..."

                  : "Start AI Interview"
              }

            </button>

          </div>

        ) : (

          <div
            className="
              space-y-6
            "
          >

            <div
              className="
                bg-white/5
                border
                border-white/10
                rounded-3xl
                p-8
              "
            >

              <p
                className="
                  text-cyan-400
                  text-sm
                  mb-4
                "
              >
                AI INTERVIEWER
              </p>

              <h2
                className="
                  text-2xl
                  leading-10
                "
              >
                {currentQuestion}
              </h2>

            </div>


            <div
              className="
                bg-white/5
                border
                border-white/10
                rounded-3xl
                p-8
              "
            >

              <textarea
                value={answer}
                onChange={(e) =>
                  setAnswer(
                    e.target.value
                  )
                }
                rows={8}
                placeholder="Write your answer here..."
                className="
                  w-full
                  bg-[#111827]
                  border
                  border-white/10
                  rounded-2xl
                  p-5
                  text-white
                  resize-none
                  outline-none
                "
              />


              <button
                onClick={handleSubmit}
                disabled={loading}
                className="
                  mt-6
                  bg-cyan-400
                  hover:bg-cyan-300
                  text-black
                  font-bold
                  py-4
                  px-7
                  rounded-2xl
                  flex
                  items-center
                  gap-3
                "
              >

                <Send size={18} />

                {
                  loading

                    ? "Analyzing..."

                    : "Submit Answer"
                }

              </button>

            </div>


            {feedback && (

              <div
                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-3xl
                  p-8
                "
              >

                <p
                  className="
                    text-green-400
                    text-sm
                    mb-4
                  "
                >
                  AI FEEDBACK
                </p>

                <div
                  className="
                    text-gray-300
                    leading-8
                    whitespace-pre-wrap
                  "
                >
                  {feedback}
                </div>

              </div>
            )}

          </div>
        )}

      </div>

    </MainLayout>
  );
}

export default MockInterview;