import {
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import toast from "react-hot-toast";

import {

  generateQuestions,
  evaluateAnswer,
  getFinalReport,
  saveInterview,

} from "../services/api";


function MockInterview() {

  const [
    role,
    setRole,
  ] = useState("");

  const [
    questions,
    setQuestions,
  ] = useState<string[]>([]);

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0);

  const [
    answer,
    setAnswer,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    completed,
    setCompleted,
  ] = useState(false);

  const [
    report,
    setReport,
  ] = useState<any>(null);


  async function startInterview() {

    try {

      setLoading(true);

      const data =
        await generateQuestions(
          role
        );


      if (
        Array.isArray(data)
      ) {

        setQuestions(data);

      } else {

        setQuestions(
          data.questions || []
        );
      }

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to start interview"
      );

    } finally {

      setLoading(false);
    }
  }


  async function submitAnswer() {

    try {

      setLoading(true);

      await evaluateAnswer(

        questions[currentIndex],

        answer
      );


      if (

        currentIndex <
        questions.length - 1

      ) {

        setCurrentIndex(
          currentIndex + 1
        );

        setAnswer("");

      } else {

        const finalData =
  await getFinalReport({});

        setReport(finalData);

        setCompleted(true);


        const user =
          JSON.parse(

            localStorage.getItem(
              "user"
            ) || "{}"
          );


        await saveInterview({

          user_id:
            user.id,

          transcript:
            answer,

          confidence_score: 85,

          communication_score: 88,

          words_per_minute: 120,

          eye_contact_score: 90,

          attention_status:
            "Focused",
        });


        toast.success(
          "Interview completed"
        );
      }

    } catch (error) {

      console.error(error);

      toast.error(
        "Submission failed"
      );

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
              text-4xl
              font-bold
              text-white
              mb-3
            "
          >
            Mock Interview
          </h1>

          <p
            className="
              text-gray-400
            "
          >
            Practice AI-generated interview questions
          </p>

        </div>


        {!questions.length && (

          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-2xl
              p-8
            "
          >

            <label
              className="
                block
                mb-3
                text-sm
                text-gray-400
              "
            >
              Select Role
            </label>


            <select
              value={role}
              onChange={(e) =>
                setRole(
                  e.target.value
                )
              }
              className="
                w-full
                p-4
                rounded-xl
                bg-[#111827]
                border
                border-white/10
                text-white
                mb-6
              "
            >

              <option value="">
                Choose role
              </option>

              <option>
                Frontend Developer
              </option>

              <option>
                Backend Developer
              </option>

              <option>
                Full Stack Developer
              </option>

              <option>
                Data Analyst
              </option>

              <option>
                AI Engineer
              </option>

            </select>


            <button
              onClick={
                startInterview
              }
              disabled={
                loading
              }
              className="
                bg-cyan-400
                hover:bg-cyan-300
                text-black
                font-semibold
                px-6
                py-3
                rounded-xl
              "
            >

              {
                loading

                  ? "Generating..."

                  : "Start Interview"
              }

            </button>

          </div>
        )}


        {!!questions.length &&
          !completed && (

          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-2xl
              p-8
            "
          >

            <div
              className="
                flex
                justify-between
                mb-6
                text-sm
                text-gray-400
              "
            >

              <span>
                Question {
                  currentIndex + 1
                }
                /
                {
                  questions.length
                }
              </span>

            </div>


            <div
              className="
                text-2xl
                font-semibold
                text-white
                mb-8
              "
            >

              {
                questions[
                  currentIndex
                ]
              }

            </div>


            <textarea
              value={answer}
              onChange={(e) =>
                setAnswer(
                  e.target.value
                )
              }
              rows={8}
              placeholder="Type your answer..."
              className="
                w-full
                p-5
                rounded-2xl
                bg-[#111827]
                border
                border-white/10
                text-white
                resize-none
                mb-6
              "
            />


            <button
              onClick={
                submitAnswer
              }
              disabled={loading}
              className="
                bg-green-400
                hover:bg-green-300
                text-black
                font-semibold
                px-6
                py-3
                rounded-xl
              "
            >

              {
                loading

                  ? "Submitting..."

                  : "Submit Answer"
              }

            </button>

          </div>
        )}


        {completed && (

          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-2xl
              p-8
            "
          >

            <h2
              className="
                text-3xl
                font-bold
                text-white
                mb-6
              "
            >
              Final Report
            </h2>


            <pre
              className="
                whitespace-pre-wrap
                text-gray-300
                leading-8
              "
            >

              {
                JSON.stringify(
                  report,
                  null,
                  2
                )
              }

            </pre>

          </div>
        )}

      </div>

    </MainLayout>
  );
}

export default MockInterview;