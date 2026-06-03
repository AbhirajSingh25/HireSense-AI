// frontend/src/pages/VisionAnalysis.tsx

import {
  useEffect,
  useRef,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import Card from "../components/ui/Card";

import Button from "../components/ui/Button";

import {
  Camera,
  Eye,
  Brain,
} from "lucide-react";

import {
  analyzeVision,
} from "../services/api";


function VisionAnalysis() {

  const videoRef =
    useRef<HTMLVideoElement>(null);

  const [
    started,
    setStarted,
  ] = useState(false);

  const [
    results,
    setResults,
  ] = useState<any>(null);

  const [
    loading,
    setLoading,
  ] = useState(false);


  async function startCamera() {

    try {

      const stream =

        await navigator
        .mediaDevices
        .getUserMedia({

          video: true,
        });

      if (videoRef.current) {

        videoRef.current.srcObject =
          stream;
      }

      setStarted(true);

    } catch (error) {

      console.error(error);

      alert(
        "Camera access denied"
      );
    }
  }


  async function handleAnalyze() {

    try {

      setLoading(true);

      const data =

        await analyzeVision();

      setResults(data);

    } catch (error) {

      console.error(error);

      alert(
        "Vision analysis failed"
      );

    } finally {

      setLoading(false);
    }
  }


  useEffect(() => {

    startCamera();

  }, []);


  return (

    <MainLayout>

      <div className="mb-10">

        <h1
          className="
            text-6xl
            font-black
            mb-4
          "
        >
          Vision Analytics
        </h1>

        <p
          className="
            text-zinc-400
            text-xl
          "
        >
          AI-powered eye contact
          and attention analysis
        </p>

      </div>


      <div
        className="
          grid
          xl:grid-cols-2
          gap-8
        "
      >

        <Card className="p-6">

          <video
            ref={videoRef}
            autoPlay
            muted
            className="
              w-full
              h-[500px]
              object-cover
              rounded-3xl
              bg-black
            "
          />

        </Card>


        <div className="space-y-8">

          <Card className="p-8">

            <h2
              className="
                text-3xl
                font-bold
                mb-8
              "
            >
              AI Vision Controls
            </h2>

            <div className="space-y-4">

              <Button
                onClick={startCamera}
                className="w-full"
              >

                <Camera size={20} />

                Start Camera

              </Button>

              <Button
                onClick={handleAnalyze}
                className="w-full"
              >

                <Brain size={20} />

                {
                  loading

                    ? "Analyzing..."

                    : "Analyze Vision"
                }

              </Button>

            </div>

          </Card>


          {
            results && (

              <Card className="p-8">

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    mb-8
                  "
                >

                  <Eye
                    className="
                      text-cyan-400
                    "
                  />

                  <h2
                    className="
                      text-3xl
                      font-bold
                    "
                  >
                    Vision Results
                  </h2>

                </div>


                <div className="space-y-5">

                  <div
                    className="
                      p-5
                      rounded-2xl
                      bg-black/30
                    "
                  >

                    <p
                      className="
                        text-zinc-400
                        mb-2
                      "
                    >
                      Eye Contact
                    </p>

                    <h2
                      className="
                        text-5xl
                        font-black
                        text-cyan-400
                      "
                    >
                      {
                        results.eye_contact
                      }%
                    </h2>

                  </div>


                  <div
                    className="
                      p-5
                      rounded-2xl
                      bg-black/30
                    "
                  >

                    <p
                      className="
                        text-zinc-400
                        mb-2
                      "
                    >
                      Attention Score
                    </p>

                    <h2
                      className="
                        text-5xl
                        font-black
                        text-green-400
                      "
                    >
                      {
                        results.attention_score
                      }%
                    </h2>

                  </div>


                  <div
                    className="
                      p-5
                      rounded-2xl
                      bg-black/30
                    "
                  >

                    <p
                      className="
                        text-zinc-300
                        leading-relaxed
                      "
                    >
                      {
                        results.feedback
                      }
                    </p>

                  </div>

                </div>

              </Card>
            )
          }

        </div>

      </div>

    </MainLayout>
  );
}

export default VisionAnalysis;