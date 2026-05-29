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
  Mic,
  Square,

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

  const [
    listening,
    setListening,
  ] = useState(false);

  const [
    recognition,
    setRecognition,
  ] = useState<any>(null);

  const [
    evaluations,
    setEvaluations,
  ] = useState<any[]>([]);

  const [
    currentEvaluation,
    setCurrentEvaluation,
  ] = useState<any>(null);


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


      setCurrentEvaluation(
        evaluation
      );


      setEvaluations((prev) => [

        ...prev,

        {

          question:
            currentQuestion,

          answer,

          evaluation,
        }
      ]);


      const followup =
        await generateFollowupQuestion(

          currentQuestion,

          answer,

          chatMessages
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
          await getFinalReport();

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


  function startVoiceAnswer() {

    const SpeechRecognition =

      (window as any)
        .SpeechRecognition ||

      (window as any)
        .webkitSpeechRecognition;


    if (!SpeechRecognition) {

      toast.error(
        "Speech recognition not supported"
      );

      return;
    }


    const recognitionInstance =
      new SpeechRecognition();

    recognitionInstance.lang =
      "en-US";

    recognitionInstance.continuous =
      true;

    recognitionInstance.interimResults =
      true;


    recognitionInstance.onstart = () => {

      setListening(true);
    };


    recognitionInstance.onend = () => {

      setListening(false);
    };


    recognitionInstance.onresult = (
      event: any
    ) => {

      let transcript = "";

      for (
        let i = 0;
        i < event.results.length;
        i++
      ) {

        transcript +=
          event.results[i][0]
            .transcript + " ";
      }

      setAnswer(
        transcript
      );
    };


    recognitionInstance.start();

    setRecognition(
      recognitionInstance
    );
  }


  function stopVoiceAnswer() {

    if (recognition) {

      recognition.stop();
    }

    setListening(false);
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
              Conversational voice AI interview experience
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

      </div>

    </MainLayout>
  );
}

export default MockInterview;