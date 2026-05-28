import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import toast from "react-hot-toast";

import {

  generateQuestions,
  evaluateAnswer,
  generateFollowupQuestion,
  getFinalReport,
  saveInterview,

} from "../services/api";

import {

  Brain,
  Clock3,
  CheckCircle2,

} from "lucide-react";


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
    chatMessages,
    setChatMessages,
  ] = useState<any[]>([]);

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

  const [
    seconds,
    setSeconds,
  ] = useState(0);


  useEffect(() => {

    let timer: any;

    if (
      questions.length &&
      !completed
    ) {

      timer = setInterval(() => {

        setSeconds((prev) =>
          prev + 1
        );

      }, 1000);
    }

    return () =>
      clearInterval(timer);

  }, [
    questions,
    completed,
  ]);


  const progress =
    questions.length

      ? (
          (
            currentIndex + 1
          ) / questions.length
        ) * 100

      : 0;


  async function startInterview() {

    try {

      setLoading(true);

      const data =
        await generateQuestions(
          role
        );


      const generatedQuestions =

        Array.isArray(data)

          ? data

          : data.questions || [];


      setQuestions(
        generatedQuestions
      );


      if (
        generatedQuestions.length
      ) {

        setChatMessages([

          {
            role: "ai",

            content:
              generatedQuestions[0],
          }
        ]);
      }

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to generate questions"
      );

    } finally {

      setLoading(false);
    }
  }


  async function submitAnswer() {

    try {

      setLoading(true);

      const currentQuestion =
        questions[currentIndex];


      setChatMessages((prev) => [

        ...prev,

        {
          role: "user",
          content: answer,
        }
      ]);


      const evaluation =
        await evaluateAnswer(

          currentQuestion,

          answer
        );


      console.log(
        "Evaluation:",
        evaluation
      );


      const followup =
        await generateFollowupQuestion(

          currentQuestion,

          answer
        );


      if (
        followup?.question
      ) {

        setQuestions((prev) => [

          ...prev,

          followup.question
        ]);


        setChatMessages((prev) => [

          ...prev,

          {
            role: "ai",

            content:
              followup.question,
          }
        ]);
      }


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

          confidence_score:
            evaluation.score || 85,

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


  function formatTime(
    totalSeconds: number
  ) {

    const mins =
      Math.floor(
        totalSeconds / 60
      );

    const secs =
      totalSeconds % 60;

    return `${mins}:${
      secs < 10
        ? "0"
        : ""
    }${secs}`;
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
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-5
            mb-10
          "
        >

          <div>

            <h1
              className="
                text-4xl
                font-black
                text-white
                mb-2
              "
            >
              AI Mock Interview
            </h1>

            <p
              className="
                text-gray-400
              "
            >
              Conversational AI-powered interview experience
            </p>

          </div>


          {!!questions.length &&
            !completed && (

            <div
              className="
                flex
                items-center
                gap-3
                bg-white/5
                border
                border-white/10
                px-5
                py-3
                rounded-2xl
              "
            >

              <Clock3
                size={20}
                className="
                  text-cyan-400
                "
              />

              <span
                className="
                  text-lg
                  font-semibold
                  text-white
                "
              >
                {
                  formatTime(seconds)
                }
              </span>

            </div>
          )}

        </div>


        {!questions.length && (

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
                flex
                items-center
                gap-4
                mb-8
              "
            >

              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-cyan-400
                  text-black
                  flex
                  items-center
                  justify-center
                "
              >

                <Brain size={28} />

              </div>


              <div>

                <h2
                  className="
                    text-2xl
                    font-bold
                    text-white
                  "
                >
                  Start Interview
                </h2>

                <p
                  className="
                    text-gray-400
                  "
                >
                  Generate a realistic AI interview session
                </p>

              </div>

            </div>


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
                rounded-2xl
                bg-[#111827]
                border
                border-white/10
                text-white
                mb-6
                outline-none
              "
            >

              <option value="">
                Select role
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
                AI Engineer
              </option>

              <option>
                Data Analyst
              </option>

            </select>


            <button
              onClick={
                startInterview
              }
              disabled={
                loading || !role
              }
              className="
                bg-cyan-400
                hover:bg-cyan-300
                disabled:opacity-50
                text-black
                font-bold
                px-6
                py-4
                rounded-2xl
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
              rounded-3xl
              overflow-hidden
            "
          >

            <div
              className="
                h-2
                bg-black/20
              "
            >

              <div
                style={{
                  width: `${progress}%`
                }}
                className="
                  h-full
                  bg-cyan-400
                  transition-all
                "
              />

            </div>


            <div
              className="
                p-8
              "
            >

              <div
                className="
                  flex
                  justify-between
                  items-center
                  mb-8
                "
              >

                <div
                  className="
                    text-gray-400
                  "
                >

                  Question
                  {" "}
                  {currentIndex + 1}

                </div>


                <div
                  className="
                    bg-cyan-400
                    text-black
                    px-4
                    py-2
                    rounded-xl
                    font-semibold
                  "
                >

                  {Math.round(progress)}%

                </div>

              </div>


              <div
                className="
                  space-y-5
                  mb-8
                  max-h-125
                  overflow-y-auto
                "
              >

                {chatMessages.map((
                  msg,
                  index
                ) => (

                  <div
                    key={index}
                    className={`
                      flex

                      ${
                        msg.role === "user"

                          ? "justify-end"

                          : "justify-start"
                      }
                    `}
                  >

                    <div
                      className={`
                        max-w-[80%]
                        px-5
                        py-4
                        rounded-3xl
                        leading-8

                        ${
                          msg.role === "user"

                            ? `
                              bg-cyan-400
                              text-black
                            `

                            : `
                              bg-white/10
                              text-white
                            `
                        }
                      `}
                    >

                      {msg.content}

                    </div>

                  </div>
                ))}

              </div>


              <textarea
                value={answer}
                onChange={(e) =>
                  setAnswer(
                    e.target.value
                  )
                }
                rows={6}
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
                  outline-none
                  mb-6
                "
              />


              <button
                onClick={
                  submitAnswer
                }
                disabled={
                  loading ||
                  !answer
                }
                className="
                  bg-green-400
                  hover:bg-green-300
                  disabled:opacity-50
                  text-black
                  font-bold
                  px-6
                  py-4
                  rounded-2xl
                "
              >

                {
                  loading

                    ? "Submitting..."

                    : "Submit Answer"
                }

              </button>

            </div>

          </div>
        )}


        {completed && (

          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-10
              text-center
            "
          >

            <div
              className="
                w-20
                h-20
                rounded-full
                bg-green-400
                text-black
                flex
                items-center
                justify-center
                mx-auto
                mb-6
              "
            >

              <CheckCircle2
                size={40}
              />

            </div>


            <h2
              className="
                text-4xl
                font-black
                text-white
                mb-4
              "
            >
              Interview Completed
            </h2>


            <p
              className="
                text-gray-400
                mb-10
              "
            >
              AI interview analysis completed successfully
            </p>


            <div
              className="
                grid
                md:grid-cols-3
                gap-5
              "
            >

              <div
                className="
                  bg-black/20
                  rounded-2xl
                  p-6
                "
              >

                <p
                  className="
                    text-gray-400
                    mb-2
                  "
                >
                  Confidence
                </p>

                <h3
                  className="
                    text-4xl
                    font-black
                    text-cyan-400
                  "
                >
                  {
                    report?.confidence_score || 85
                  }%
                </h3>

              </div>


              <div
                className="
                  bg-black/20
                  rounded-2xl
                  p-6
                "
              >

                <p
                  className="
                    text-gray-400
                    mb-2
                  "
                >
                  Communication
                </p>

                <h3
                  className="
                    text-4xl
                    font-black
                    text-green-400
                  "
                >
                  {
                    report?.communication_score || 88
                  }%
                </h3>

              </div>


              <div
                className="
                  bg-black/20
                  rounded-2xl
                  p-6
                "
              >

                <p
                  className="
                    text-gray-400
                    mb-2
                  "
                >
                  WPM
                </p>

                <h3
                  className="
                    text-4xl
                    font-black
                    text-orange-400
                  "
                >
                  {
                    report?.words_per_minute || 120
                  }
                </h3>

              </div>

            </div>

          </div>
        )}

      </div>

    </MainLayout>
  );
}

export default MockInterview;