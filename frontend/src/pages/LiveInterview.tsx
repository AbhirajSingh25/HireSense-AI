import {
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import Card from "../components/ui/Card";

import Button from "../components/ui/Button";

import AIOrb from "../components/ui/AIOrb";

import TranscriptPanel from "../components/ui/TranscriptPanel";

import RealtimeFeedback from "../components/ui/RealtimeFeedback";

import {
  Mic,
  Brain,
  Sparkles,
} from "lucide-react";

import {
  aiEvaluate,
  getNextQuestion,
} from "../services/api";


function LiveInterview() {

  const [
    transcript,
    setTranscript,
  ] = useState("");

  const [
    listening,
    setListening,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    question,
    setQuestion,
  ] = useState(
    "Tell me about yourself."
  );

  const [
    aiFeedback,
    setAiFeedback,
  ] = useState("");

  const [
    confidence,
    setConfidence,
  ] = useState(72);

  const [
    communication,
    setCommunication,
  ] = useState(81);

  const [
    technical,
    setTechnical,
  ] = useState(68);


  async function startInterview() {

    const SpeechRecognition =
      (
        window as any
      ).SpeechRecognition ||

      (
        window as any
      ).webkitSpeechRecognition;


    if (!SpeechRecognition) {

      alert(
        "Speech recognition not supported"
      );

      return;
    }


    const recognition =
      new SpeechRecognition();

    recognition.continuous =
      true;

    recognition.interimResults =
      true;

    recognition.lang =
      "en-US";


    recognition.onstart = () => {

      setListening(true);
    };


    recognition.onresult = (
      event: any
    ) => {

      let finalTranscript = "";

      for (
        let i = 0;

        i < event.results.length;

        i++
      ) {

        finalTranscript +=
          event.results[i][0]
          .transcript;
      }

      setTranscript(
        finalTranscript
      );
    };


    recognition.start();
  }


  async function analyzeAnswer() {

    try {

      setLoading(true);


      const evaluation =

        await aiEvaluate(

          question,

          transcript
        );


      setAiFeedback(

        evaluation.feedback ||
        "Good response."
      );


      setConfidence(

        evaluation.confidence || 80
      );

      setCommunication(

        evaluation.communication || 82
      );

      setTechnical(

        evaluation.technical || 75
      );


      const nextQuestion =

        await getNextQuestion(

          "Frontend Developer",

          "Intermediate",

          question,

          transcript
        );


      setQuestion(

        nextQuestion.question ||
        "Explain React hooks."
      );

      setTranscript("");

    } catch (error) {

      console.error(error);

      alert(
        "AI analysis failed"
      );

    } finally {

      setLoading(false);
    }
  }


  return (

    <MainLayout>

      <div
        className="
          flex
          items-center
          justify-between
          mb-10
        "
      >

        <div>

          <h1
            className="
              text-6xl
              font-black
              mb-4
            "
          >
            Live AI Interview
          </h1>

          <p
            className="
              text-zinc-400
              text-xl
            "
          >
            Adaptive AI interview engine
          </p>

        </div>


        <div className="flex gap-4">

          <Button
            onClick={startInterview}
          >

            <Mic size={20} />

            {
              listening

                ? "Listening..."

                : "Start Recording"
            }

          </Button>


          <Button
            onClick={analyzeAnswer}
          >

            <Brain size={20} />

            {
              loading

                ? "Analyzing..."

                : "Analyze Answer"
            }

          </Button>

        </div>

      </div>


      <div
        className="
          grid
          xl:grid-cols-3
          gap-8
        "
      >

        <Card
          className="
            p-10
            flex
            items-center
            justify-center
          "
        >

          <AIOrb />

        </Card>


        <div
          className="
            xl:col-span-2
            space-y-8
          "
        >

          <Card className="p-8">

            <div
              className="
                flex
                items-center
                gap-3
                mb-5
              "
            >

              <Sparkles
                className="
                  text-cyan-400
                "
              />

              <h2
                className="
                  text-2xl
                  font-bold
                "
              >
                Current Question
              </h2>

            </div>


            <p
              className="
                text-2xl
                leading-relaxed
                text-zinc-200
              "
            >
              {question}
            </p>

          </Card>


          <TranscriptPanel
            transcript={transcript}
          />


          <RealtimeFeedback
            confidence={confidence}
            communication={communication}
            technical={technical}
          />


          <Card className="p-8">

            <div
              className="
                flex
                items-center
                gap-3
                mb-5
              "
            >

              <Brain
                className="
                  text-cyan-400
                "
              />

              <h2
                className="
                  text-2xl
                  font-bold
                "
              >
                AI Recruiter Feedback
              </h2>

            </div>


            <p
              className="
                text-zinc-300
                leading-loose
                text-lg
              "
            >
              {
                aiFeedback ||

                "AI feedback will appear here after analysis."
              }
            </p>

          </Card>

        </div>

      </div>

    </MainLayout>
  );
}

export default LiveInterview;