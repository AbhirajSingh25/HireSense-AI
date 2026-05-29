import {
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import toast from "react-hot-toast";

import {
  Mic,
  Square,
} from "lucide-react";

import {
  analyzeSpeech,
} from "../services/api";


function SpeechAnalysis() {

  const [
    transcript,
    setTranscript,
  ] = useState("");

  const [
    listening,
    setListening,
  ] = useState(false);

  const [
    recognition,
    setRecognition,
  ] = useState<any>(null);

  const [
    analysis,
    setAnalysis,
  ] = useState<any>(null);

  const [
    loading,
    setLoading,
  ] = useState(false);


  function startListening() {

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

    recognitionInstance.continuous =
      true;

    recognitionInstance.interimResults =
      true;

    recognitionInstance.lang =
      "en-US";


    recognitionInstance.onstart =
      () => {

      setListening(true);
    };


    recognitionInstance.onend =
      () => {

      setListening(false);
    };


    recognitionInstance.onresult =
      (event: any) => {

      let finalTranscript = "";

      for (
        let i = 0;
        i < event.results.length;
        i++
      ) {

        finalTranscript +=

          event.results[i][0]
            .transcript + " ";
      }

      setTranscript(
        finalTranscript
      );
    };


    recognitionInstance.start();

    setRecognition(
      recognitionInstance
    );
  }


  function stopListening() {

    if (recognition) {

      recognition.stop();
    }

    setListening(false);
  }


  async function analyze() {

    try {

      setLoading(true);

      const result =
        await analyzeSpeech(
          transcript
        );

      setAnalysis(result);

      toast.success(
        "Speech analyzed"
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Analysis failed"
      );

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
              text-4xl
              font-black
              text-white
              mb-3
            "
          >
            AI Speech Analysis
          </h1>

          <p
            className="
              text-gray-400
            "
          >
            Analyze communication and speaking confidence
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
              p-6
            "
          >

            <textarea
              value={transcript}
              onChange={(e) =>
                setTranscript(
                  e.target.value
                )
              }
              rows={12}
              placeholder="Speak or type interview response..."
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


            <div
              className="
                flex
                flex-wrap
                gap-4
              "
            >

              {!listening ? (

                <button
                  onClick={
                    startListening
                  }
                  className="
                    bg-cyan-400
                    hover:bg-cyan-300
                    text-black
                    font-bold
                    px-5
                    py-3
                    rounded-2xl
                    flex
                    items-center
                    gap-3
                  "
                >

                  <Mic size={18} />

                  Start Recording

                </button>

              ) : (

                <button
                  onClick={
                    stopListening
                  }
                  className="
                    bg-red-400
                    hover:bg-red-300
                    text-black
                    font-bold
                    px-5
                    py-3
                    rounded-2xl
                    flex
                    items-center
                    gap-3
                  "
                >

                  <Square size={18} />

                  Stop Recording

                </button>
              )}


              <button
                onClick={analyze}
                disabled={
                  loading ||
                  !transcript
                }
                className="
                  bg-green-400
                  hover:bg-green-300
                  disabled:opacity-50
                  text-black
                  font-bold
                  px-5
                  py-3
                  rounded-2xl
                "
              >

                {
                  loading

                    ? "Analyzing..."

                    : "Analyze Speech"
                }

              </button>

            </div>

          </div>


          {analysis && (

            <div
              className="
                bg-white/5
                border
                border-white/10
                rounded-3xl
                p-6
              "
            >

              <h2
                className="
                  text-2xl
                  font-bold
                  mb-6
                "
              >
                AI Communication Report
              </h2>


              <div
                className="
                  grid
                  grid-cols-2
                  gap-5
                  mb-6
                "
              >

                <div
                  className="
                    bg-black/20
                    rounded-2xl
                    p-5
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
                      analysis
                        ?.confidence_score
                    }%
                  </h3>

                </div>


                <div
                  className="
                    bg-black/20
                    rounded-2xl
                    p-5
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
                      analysis
                        ?.communication_score
                    }%
                  </h3>

                </div>


                <div
                  className="
                    bg-black/20
                    rounded-2xl
                    p-5
                  "
                >

                  <p
                    className="
                      text-gray-400
                      mb-2
                    "
                  >
                    Words
                  </p>

                  <h3
                    className="
                      text-4xl
                      font-black
                      text-orange-400
                    "
                  >
                    {
                      analysis
                        ?.total_words
                    }
                  </h3>

                </div>


                <div
                  className="
                    bg-black/20
                    rounded-2xl
                    p-5
                  "
                >

                  <p
                    className="
                      text-gray-400
                      mb-2
                    "
                  >
                    Filler Words
                  </p>

                  <h3
                    className="
                      text-4xl
                      font-black
                      text-pink-400
                    "
                  >
                    {
                      analysis
                        ?.filler_words
                    }
                  </h3>

                </div>

              </div>


              <div
                className="
                  bg-black/20
                  rounded-2xl
                  p-5
                "
              >

                <h3
                  className="
                    text-xl
                    font-bold
                    mb-4
                  "
                >
                  AI Feedback
                </h3>

                <div
                  className="
                    text-gray-300
                    leading-8
                    whitespace-pre-wrap
                  "
                >

                  {
                    analysis
                      ?.feedback
                  }

                </div>

              </div>

            </div>
          )}

        </div>

      </div>

    </MainLayout>
  );
}

export default SpeechAnalysis;