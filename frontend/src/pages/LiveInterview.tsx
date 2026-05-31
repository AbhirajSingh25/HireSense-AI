import {
  useEffect,
  useRef,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  analyzeLiveInterview,
} from "../services/api";

import {

  Mic,
  MicOff,
  Brain,

} from "lucide-react";


declare global {

  interface Window {

    SpeechRecognition: any;

    webkitSpeechRecognition: any;
  }
}


function LiveInterview() {

  const [
    listening,
    setListening,
  ] = useState(false);

  const [
    transcript,
    setTranscript,
  ] = useState("");

  const [
    aiFeedback,
    setAiFeedback,
  ] = useState<any>(null);

  const [
    loading,
    setLoading,
  ] = useState(false);


  const recognitionRef =
    useRef<any>(null);


  useEffect(() => {

    const SpeechRecognition =

      window.SpeechRecognition ||

      window.webkitSpeechRecognition;


    if (!SpeechRecognition)
      return;


    const recognition =
      new SpeechRecognition();


    recognition.continuous =
      true;

    recognition.interimResults =
      true;

    recognition.lang =
      "en-US";


    recognition.onresult = (
      event: any
    ) => {

      let finalTranscript =
        "";


      for (

        let i = 0;

        i <
        event.results.length;

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


    recognitionRef.current =
      recognition;

  }, []);


  async function startListening() {

    if (
      recognitionRef.current
    ) {

      recognitionRef
        .current
        .start();

      setListening(true);
    }
  }


  function stopListening() {

    if (
      recognitionRef.current
    ) {

      recognitionRef
        .current
        .stop();

      setListening(false);
    }
  }


  async function analyzeInterview() {

    try {

      setLoading(true);

      const response =

        await analyzeLiveInterview(
          transcript
        );


      setAiFeedback(response);

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
          max-w-6xl
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
            Live AI Interview
          </h1>

          <p
            className="
              text-gray-400
              text-lg
            "
          >
            Realtime voice interview analysis
          </p>

        </div>


        <div
          className="
            grid
            lg:grid-cols-2
            gap-8
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

            <div
              className="
                flex
                items-center
                justify-between
                mb-8
              "
            >

              <h2
                className="
                  text-2xl
                  font-bold
                "
              >
                Live Transcript
              </h2>


              <button

                onClick={
                  listening

                    ? stopListening

                    : startListening
                }

                className={`
                  flex
                  items-center
                  gap-3
                  px-6
                  py-4
                  rounded-2xl
                  font-bold

                  ${
                    listening

                      ? `
                        bg-red-500
                        text-white
                      `

                      : `
                        bg-cyan-400
                        text-black
                      `
                  }
                `}
              >

                {
                  listening

                    ? (
                      <MicOff
                        size={20}
                      />
                    )

                    : (
                      <Mic
                        size={20}
                      />
                    )
                }

                {
                  listening

                    ? "Stop"

                    : "Start"
                }

              </button>

            </div>


            <div
              className="
                min-h-100
                bg-[#111827]
                border
                border-white/10
                rounded-3xl
                p-6
                text-gray-300
                leading-9
              "
            >

              {
                transcript ||

                "Your realtime transcript will appear here..."
              }

            </div>


            <button
              onClick={
                analyzeInterview
              }
              disabled={
                loading ||
                !transcript
              }
              className="
                mt-6
                bg-cyan-400
                hover:bg-cyan-300
                text-black
                px-7
                py-4
                rounded-2xl
                font-bold
                flex
                items-center
                gap-3
              "
            >

              <Brain size={20} />

              {
                loading

                  ? "Analyzing..."

                  : "Analyze Interview"
              }

            </button>

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

            <h2
              className="
                text-2xl
                font-bold
                mb-8
              "
            >
              AI Feedback
            </h2>


            {!aiFeedback ? (

              <div
                className="
                  h-100
                  flex
                  items-center
                  justify-center
                  text-gray-500
                "
              >

                AI analysis will appear here

              </div>

            ) : (

              <div
                className="
                  space-y-6
                "
              >

                <div
                  className="
                    bg-[#111827]
                    border
                    border-white/10
                    rounded-2xl
                    p-5
                  "
                >

                  <p
                    className="
                      text-gray-400
                      mb-3
                    "
                  >
                    Confidence
                  </p>

                  <h3
                    className="
                      text-4xl
                      font-bold
                      text-cyan-400
                    "
                  >
                    {
                      aiFeedback
                        ?.confidence || 0
                    }
                    %
                  </h3>

                </div>


                <div
                  className="
                    bg-[#111827]
                    border
                    border-white/10
                    rounded-2xl
                    p-5
                  "
                >

                  <p
                    className="
                      text-gray-400
                      mb-3
                    "
                  >
                    Communication
                  </p>

                  <h3
                    className="
                      text-4xl
                      font-bold
                      text-cyan-400
                    "
                  >
                    {
                      aiFeedback
                        ?.communication || 0
                    }
                    %
                  </h3>

                </div>


                <div
                  className="
                    bg-[#111827]
                    border
                    border-white/10
                    rounded-2xl
                    p-5
                  "
                >

                  <p
                    className="
                      text-gray-400
                      mb-3
                    "
                  >
                    AI Feedback
                  </p>

                  <p
                    className="
                      text-gray-300
                      leading-8
                    "
                  >
                    {
                      aiFeedback
                        ?.feedback ||
                      "No feedback yet."
                    }
                  </p>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default LiveInterview;