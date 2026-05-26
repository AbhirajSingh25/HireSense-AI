import {
  useState,
  useRef,
} from "react";

import toast from "react-hot-toast";

import MainLayout from "../components/MainLayout";

import {
  Mic,
  Sparkles,
  Square,
} from "lucide-react";

import {
  generateQuestions,
  evaluateAnswer,
  generateFollowupQuestion,
  getFinalReport,
  saveInterview,
} from "../services/api";

import VoiceInsights from "../components/VoiceInsights";

import {
  analyzeSpeech,
} from "../utils/voiceAnalysis";

import {
  useAuth,
} from "../context/AuthContext";


declare global {

  interface Window {

    webkitSpeechRecognition: any;
  }
}


function MockInterview() {

  const {
    user,
  } = useAuth();


  const [
    role,
    setRole,
  ] = useState("");

  const [
    level,
    setLevel,
  ] = useState("");

  const [
    resumeAnalysis,
    setResumeAnalysis,
  ] = useState("");

  const [
    questions,
    setQuestions,
  ] = useState<string[]>([]);

  const [
    currentQuestion,
    setCurrentQuestion,
  ] = useState(0);

  const [
    answer,
    setAnswer,
  ] = useState("");

  const [
    answers,
    setAnswers,
  ] = useState<string[]>([]);

  const [
    evaluations,
    setEvaluations,
  ] = useState<any[]>([]);

  const [
    interviewStarted,
    setInterviewStarted,
  ] = useState(false);

  const [
    finalReport,
    setFinalReport,
  ] = useState<any>(null);

  const [
    recording,
    setRecording,
  ] = useState(false);

  const [
    voiceAnalysis,
    setVoiceAnalysis,
  ] = useState<any>(null);


  const recognitionRef =
    useRef<any>(null);

  const startTimeRef =
    useRef<number>(0);


  async function startInterview() {

    try {

      toast.loading(
        "Generating AI interview...",
        {
          id: "interview",
        }
      );

      const data =
        await generateQuestions(
          role,
          level,
          resumeAnalysis
        );

      setQuestions(data);

      setInterviewStarted(true);

      toast.success(
        "Interview started",
        {
          id: "interview",
        }
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to generate interview",
        {
          id: "interview",
        }
      );
    }
  }


  function startVoiceRecording() {

    const SpeechRecognition =
      window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

      toast.error(
        "Speech recognition not supported"
      );

      return;
    }


    const recognition =
      new SpeechRecognition();

    recognition.continuous = true;

    recognition.interimResults = true;

    recognition.lang = "en-US";


    let transcript = "";


    recognition.onstart = () => {

      setRecording(true);

      startTimeRef.current =
        Date.now();
    };


    recognition.onresult = (
      event: any
    ) => {

      transcript = "";

      for (
        let i = 0;
        i < event.results.length;
        i++
      ) {

        transcript +=
          event.results[i][0]
            .transcript;
      }

      setAnswer(
        transcript
      );
    };


    recognition.onend = () => {

      setRecording(false);

      const duration =
        (
          Date.now() -
          startTimeRef.current
        ) / 1000;


      const analysis =
        analyzeSpeech(
          transcript,
          duration
        );

      setVoiceAnalysis(
        analysis
      );
    };


    recognition.start();

    recognitionRef.current =
      recognition;
  }


  function stopVoiceRecording() {

    if (
      recognitionRef.current
    ) {

      recognitionRef.current.stop();
    }
  }


  async function saveInterviewSession(

    transcript: string,

    report: any
  ) {

    try {

      await saveInterview({

        user_id: user.id,

        transcript,

        confidence_score:
          voiceAnalysis
            ?.confidence || 85,

        communication_score:
          report?.communication || 88,

        words_per_minute:
          voiceAnalysis
            ?.wordsPerMinute || 120,

        eye_contact_score:
          90,

        attention_status:
          "Focused",
      });

      console.log(
        "Interview saved"
      );

    } catch (error) {

      console.error(
        "Save failed",
        error
      );
    }
  }


  async function submitAnswer() {

    try {

      toast.loading(
        "Evaluating answer...",
        {
          id: "evaluation",
        }
      );

      const evaluation =
        await evaluateAnswer(
          answer
        );

      const updatedAnswers = [
        ...answers,
        answer,
      ];

      const updatedEvaluations = [
        ...evaluations,
        evaluation,
      ];

      setAnswers(
        updatedAnswers
      );

      setEvaluations(
        updatedEvaluations
      );


      if (
        currentQuestion <
        questions.length - 1
      ) {

        const followup =
          await generateFollowupQuestion(

            questions[
              currentQuestion
            ],

            answer,

            role,

            level
          );

        setQuestions([

          ...questions,

          followup.question,
        ]);

        setCurrentQuestion(
          currentQuestion + 1
        );

        setAnswer("");

        toast.success(
          "Answer evaluated",
          {
            id: "evaluation",
          }
        );

      } else {

        const report =
          await getFinalReport();

        setFinalReport(
          report
        );

        await saveInterviewSession(

          updatedAnswers.join(" "),

          report
        );

        toast.success(
          "Interview completed",
          {
            id: "evaluation",
          }
        );
      }

    } catch (error) {

      console.error(error);

      toast.error(
        "Evaluation failed",
        {
          id: "evaluation",
        }
      );
    }
  }


  return (

    <MainLayout>

      <div
        className="
          min-h-screen
          text-white
          px-10
          py-12
        "
      >

        <div
          className="
            max-w-5xl
            mx-auto
          "
        >

          <div className="mb-12">

            <h1
              className="
                text-6xl
                font-bold
                mb-4
              "
            >
              AI Mock Interview
            </h1>

            <p
              className="
                text-zinc-400
                text-lg
              "
            >
              Multimodal AI recruiter simulation
            </p>

          </div>


          {
            !interviewStarted && (

              <div
                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-3xl
                  p-10
                  space-y-6
                "
              >

                <input
                  value={role}
                  onChange={(e) =>
                    setRole(
                      e.target.value
                    )
                  }
                  placeholder="Role"
                  className="
                    w-full
                    p-5
                    rounded-2xl
                    bg-black/30
                    border
                    border-white/10
                  "
                />


                <input
                  value={level}
                  onChange={(e) =>
                    setLevel(
                      e.target.value
                    )
                  }
                  placeholder="Level"
                  className="
                    w-full
                    p-5
                    rounded-2xl
                    bg-black/30
                    border
                    border-white/10
                  "
                />


                <textarea
                  rows={6}
                  value={resumeAnalysis}
                  onChange={(e) =>
                    setResumeAnalysis(
                      e.target.value
                    )
                  }
                  placeholder="Paste resume analysis..."
                  className="
                    w-full
                    p-5
                    rounded-2xl
                    bg-black/30
                    border
                    border-white/10
                  "
                />


                <button
                  onClick={
                    startInterview
                  }
                  className="
                    bg-cyan-400
                    text-black
                    font-bold
                    px-8
                    py-4
                    rounded-2xl
                    inline-flex
                    items-center
                    gap-3
                  "
                >

                  <Sparkles />

                  Start Interview

                </button>

              </div>
            )
          }


          {
            interviewStarted &&
            !finalReport && (

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
                    text-3xl
                    mb-8
                  "
                >

                  {
                    questions[
                      currentQuestion
                    ]
                  }

                </div>


                <textarea
                  rows={8}
                  value={answer}
                  onChange={(e) =>
                    setAnswer(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    p-5
                    rounded-2xl
                    bg-black/30
                    border
                    border-white/10
                    mb-8
                  "
                />


                <div
                  className="
                    flex
                    gap-5
                    mb-8
                  "
                >

                  {
                    !recording ? (

                      <button
                        onClick={
                          startVoiceRecording
                        }
                        className="
                          bg-cyan-400
                          text-black
                          px-8
                          py-4
                          rounded-2xl
                          font-bold
                          inline-flex
                          items-center
                          gap-3
                        "
                      >

                        <Mic />

                        Record

                      </button>

                    ) : (

                      <button
                        onClick={
                          stopVoiceRecording
                        }
                        className="
                          bg-red-500
                          text-white
                          px-8
                          py-4
                          rounded-2xl
                          font-bold
                          inline-flex
                          items-center
                          gap-3
                        "
                      >

                        <Square />

                        Stop

                      </button>
                    )
                  }


                  <button
                    onClick={
                      submitAnswer
                    }
                    className="
                      bg-green-400
                      text-black
                      px-8
                      py-4
                      rounded-2xl
                      font-bold
                    "
                  >

                    Submit Answer

                  </button>

                </div>


                <VoiceInsights
                  analysis={
                    voiceAnalysis
                  }
                />

              </div>
            )
          }


          {
            finalReport && (

              <div
                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-3xl
                  p-10
                "
              >

                <h2
                  className="
                    text-5xl
                    font-bold
                    mb-8
                  "
                >
                  Final Report
                </h2>


                <div
                  className="
                    grid
                    md:grid-cols-3
                    gap-6
                  "
                >

                  <div
                    className="
                      bg-cyan-400/10
                      rounded-2xl
                      p-6
                    "
                  >

                    <div
                      className="
                        text-zinc-400
                        mb-3
                      "
                    >
                      Confidence
                    </div>

                    <div
                      className="
                        text-5xl
                        font-bold
                        text-cyan-400
                      "
                    >

                      {
                        finalReport
                          .confidence
                      }

                    </div>

                  </div>


                  <div
                    className="
                      bg-purple-400/10
                      rounded-2xl
                      p-6
                    "
                  >

                    <div
                      className="
                        text-zinc-400
                        mb-3
                      "
                    >
                      Communication
                    </div>

                    <div
                      className="
                        text-5xl
                        font-bold
                        text-purple-400
                      "
                    >

                      {
                        finalReport
                          .communication
                      }

                    </div>

                  </div>


                  <div
                    className="
                      bg-green-400/10
                      rounded-2xl
                      p-6
                    "
                  >

                    <div
                      className="
                        text-zinc-400
                        mb-3
                      "
                    >
                      Technical
                    </div>

                    <div
                      className="
                        text-5xl
                        font-bold
                        text-green-400
                      "
                    >

                      {
                        finalReport
                          .technical
                      }

                    </div>

                  </div>

                </div>

              </div>
            )
          }

        </div>

      </div>

    </MainLayout>
  );
}

export default MockInterview;