import {
  useState,
  useRef,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  analyzeLiveInterview,
} from "../services/api";

import {

  Mic,
  Brain,
  Square,

} from "lucide-react";


declare global {

  interface Window {

    webkitSpeechRecognition: any;
  }
}


function LiveInterview() {

  const [
    transcript,
    setTranscript,
  ] = useState("");

  const [
    role,
    setRole,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    listening,
    setListening,
  ] = useState(false);

  const [
    result,
    setResult,
  ] = useState<any>(null);


  const recognitionRef =
    useRef<any>(null);


  function startListening() {

    const SpeechRecognition =
  (window as any)
    .SpeechRecognition ||

  window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

      alert(
        "Speech recognition not supported in this browser"
      );

      return;
    }


    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.continuous = true;

    recognition.interimResults = true;


    recognition.onstart = () => {

      setListening(true);
    };


    recognition.onend = () => {

      setListening(false);
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
            .transcript + " ";
      }

      setTranscript(
        finalTranscript
      );
    };


    recognition.start();

    recognitionRef.current =
      recognition;
  }


  function stopListening() {

    if (
      recognitionRef.current
    ) {

      recognitionRef.current.stop();
    }

    setListening(false);
  }


  async function handleAnalyze() {

    try {

      setLoading(true);

      const data =
        await analyzeLiveInterview(

          transcript,
          role
        );

      setResult(data);

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
              text-4xl
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
            "
          >
            Real-time microphone interview analysis
          </p>

        </div>


        <div
          className="
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-8
            mb-8
          "
        >

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
              AI Engineer
            </option>

            <option>
              Data Analyst
            </option>

          </select>


          <div
            className="
              flex
              flex-wrap
              gap-4
              mb-6
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
                  px-6
                  py-4
                  rounded-2xl
                  flex
                  items-center
                  gap-3
                "
              >

                <Mic size={20} />

                Start Mic

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
                  px-6
                  py-4
                  rounded-2xl
                  flex
                  items-center
                  gap-3
                "
              >

                <Square size={18} />

                Stop Mic

              </button>
            )}


            <button
              onClick={
                handleAnalyze
              }
              disabled={
                loading ||
                !transcript ||
                !role
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

                  ? "Analyzing..."

                  : "Analyze Interview"
              }

            </button>

          </div>


          <textarea
            value={transcript}
            onChange={(e) =>
              setTranscript(
                e.target.value
              )
            }
            rows={10}
            placeholder="Live transcript will appear here..."
            className="
              w-full
              p-5
              rounded-2xl
              bg-[#111827]
              border
              border-white/10
              text-white
              resize-none
            "
          />

        </div>


        {result && (

          <div
            className="
              grid
              gap-6
            "
          >

            <div
              className="
                grid
                md:grid-cols-4
                gap-5
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
                    result.confidence_score
                  }%
                </h3>

              </div>


              <div
                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-3xl
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
                    result.communication_score
                  }%
                </h3>

              </div>


              <div
                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-3xl
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
                    result.words_per_minute
                  }
                </h3>

              </div>


              <div
                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-3xl
                  p-6
                "
              >

                <p
                  className="
                    text-gray-400
                    mb-2
                  "
                >
                  Attention
                </p>

                <h3
                  className="
                    text-2xl
                    font-black
                    text-pink-400
                  "
                >
                  {
                    result.attention_status
                  }
                </h3>

              </div>

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
                  size={24}
                />

                <h2
                  className="
                    text-2xl
                    font-bold
                    text-white
                  "
                >
                  AI Feedback
                </h2>

              </div>


              <p
                className="
                  text-gray-300
                  leading-8
                "
              >

                {
                  result.feedback
                }

              </p>

            </div>

          </div>
        )}

      </div>

    </MainLayout>
  );
}

export default LiveInterview;