import {
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  Upload,
  Mic,
  Brain,
} from "lucide-react";

import {
  analyzeSpeech as analyzeSpeechAPI,
} from "../services/api";


function SpeechAnalysis() {

  const [
    transcript,
    setTranscript,
  ] = useState("");

  const [
    analysis,
    setAnalysis,
  ] = useState<any>(null);


  async function analyzeSpeech() {

  try {

    const data =
      await analyzeSpeechAPI(
        transcript
      );

    setAnalysis(data);

  } catch (error) {

    console.error(error);
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
            Analyze communication quality and speaking clarity
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

              <Mic size={28} />

            </div>


            <div>

              <h2
                className="
                  text-2xl
                  font-bold
                  text-white
                "
              >
                Speech Transcript
              </h2>

              <p
                className="
                  text-gray-400
                "
              >
                Paste interview answer transcript
              </p>

            </div>

          </div>


          <textarea
            value={transcript}
            onChange={(e) =>
              setTranscript(
                e.target.value
              )
            }
            rows={10}
            placeholder="Paste your interview answer transcript..."
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
              analyzeSpeech
            }
            disabled={!transcript}
            className="
              bg-cyan-400
              hover:bg-cyan-300
              disabled:opacity-50
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

            <Upload size={20} />

            Analyze Speech

          </button>

        </div>


        {analysis && (

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
                  Total Words
                </p>

                <h3
                  className="
                    text-4xl
                    font-black
                    text-white
                  "
                >
                  {
                    analysis.words
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
                  Filler Words
                </p>

                <h3
                  className="
                    text-4xl
                    font-black
                    text-orange-400
                  "
                >
                  {
                    analysis.fillerCount
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
                  WPM
                </p>

                <h3
                  className="
                    text-4xl
                    font-black
                    text-cyan-400
                  "
                >
                  {
                    analysis.wpm
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
                  Confidence
                </p>

                <h3
                  className="
                    text-4xl
                    font-black
                    text-green-400
                  "
                >
                  {
                    analysis.confidence
                  }%
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
                  analysis.feedback
                }

              </p>

            </div>

          </div>
        )}

      </div>

    </MainLayout>
  );
}

export default SpeechAnalysis;