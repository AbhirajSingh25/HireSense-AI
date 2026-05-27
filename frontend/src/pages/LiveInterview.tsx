import {
  useEffect,
  useRef,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

const transcriptSamples = [
  "Hello, thank you for giving me this opportunity.",
  "I recently completed my B.Tech in Computer Science.",
  "I enjoy building AI-powered applications.",
  "My strengths include problem solving and adaptability.",
  "I have experience with FastAPI, React and AI systems.",
];

function LiveInterview() {

  const videoRef =
    useRef<HTMLVideoElement | null>(null);

  const intervalRef =
    useRef<number | null>(null);

  const timerRef =
    useRef<number | null>(null);

  const [cameraOn, setCameraOn] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [transcript, setTranscript] =
    useState("");

  const [seconds, setSeconds] =
    useState(0);

  const [confidenceScore, setConfidenceScore] =
    useState(82);

  const [eyeContactScore, setEyeContactScore] =
    useState(88);

  const [communicationScore, setCommunicationScore] =
    useState(79);

  const [sessionStatus, setSessionStatus] =
    useState("Waiting");

  const formatTime = (
    totalSeconds: number
  ) => {

    const mins =
      Math.floor(totalSeconds / 60);

    const secs =
      totalSeconds % 60;

    return `${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const startTranscriptSimulation = () => {

    let index = 0;

    intervalRef.current =
      window.setInterval(() => {

        if (
          index <
          transcriptSamples.length
        ) {

          setTranscript((prev) =>
            prev +
            " " +
            transcriptSamples[index]
          );

          setConfidenceScore(
            Math.floor(
              75 + Math.random() * 20
            )
          );

          setEyeContactScore(
            Math.floor(
              70 + Math.random() * 25
            )
          );

          setCommunicationScore(
            Math.floor(
              72 + Math.random() * 20
            )
          );

          index++;

        } else {

          if (intervalRef.current) {

            clearInterval(
              intervalRef.current
            );
          }

          setSessionStatus(
            "Interview Completed"
          );
        }

      }, 3000);
  };

  const startTimer = () => {

    timerRef.current =
      window.setInterval(() => {

        setSeconds(
          (prev) => prev + 1
        );

      }, 1000);
  };

  const startCamera = async () => {

    try {

      setLoading(true);

      setSessionStatus(
        "Initializing AI"
      );

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

      if (videoRef.current) {

        videoRef.current.srcObject =
          stream;
      }

      setCameraOn(true);

      setSessionStatus(
        "AI Interview Active"
      );

      startTranscriptSimulation();

      startTimer();

    } catch (error) {

      console.error(error);

      alert(
        "Unable to access webcam."
      );

      setSessionStatus(
        "Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  const stopCamera = () => {

    const stream =
      videoRef.current?.srcObject as MediaStream;

    if (stream) {

      stream
        .getTracks()
        .forEach((track) =>
          track.stop()
        );
    }

    if (intervalRef.current) {

      clearInterval(
        intervalRef.current
      );
    }

    if (timerRef.current) {

      clearInterval(
        timerRef.current
      );
    }

    setCameraOn(false);

    setSessionStatus(
      "Interview Ended"
    );
  };

  useEffect(() => {

    return () => {

      stopCamera();
    };

  }, []);

  return (
    <MainLayout>

      <div className="min-h-screen bg-[#050816] text-white px-8 py-10">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-5xl font-bold text-cyan-400">
              Live AI Interview
            </h1>

            <p className="text-gray-400 mt-3">
              Real-time multimodal AI interview session
            </p>

          </div>

          <div className="flex items-center gap-5">

            <div className="px-6 py-3 rounded-2xl bg-white/5 border border-cyan-500/20">

              <p className="text-sm text-gray-400">
                Session Timer
              </p>

              <p className="text-2xl font-bold text-cyan-400 mt-1">
                {formatTime(seconds)}
              </p>

            </div>

            <div className="px-6 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">

              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />

              <span className="text-red-400 font-bold">
                REC
              </span>

            </div>

          </div>

        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-12">

          <div className="lg:col-span-2 space-y-8">

            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden h-125 relative flex items-center justify-center">

              {!cameraOn && (

                <div className="text-center">

                  <p className="text-2xl text-gray-400">
                    Camera Offline
                  </p>

                  <p className="mt-3 text-gray-500">
                    Start AI interview session
                  </p>

                </div>

              )}

              <video
                ref={videoRef}
                autoPlay
                muted
                className={`w-full h-full object-cover ${
                  cameraOn
                    ? "block"
                    : "hidden"
                }`}
              />

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

              <div className="flex items-center justify-between">

                <h2 className="text-3xl font-bold text-cyan-400">
                  Live Transcript
                </h2>

                <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">

                  {sessionStatus}

                </div>

              </div>

              <p className="mt-8 text-lg leading-8 text-gray-300 min-h-40">

                {transcript ||
                  "Waiting for interview..."}

              </p>

            </div>

          </div>

          <div className="space-y-6">

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

              <h2 className="text-2xl font-bold text-cyan-400">
                Live AI Metrics
              </h2>

              <div className="space-y-6 mt-8">

                <div>

                  <div className="flex justify-between">

                    <span>
                      Confidence
                    </span>

                    <span className="text-cyan-400">
                      {confidenceScore}%
                    </span>

                  </div>

                  <div className="w-full h-3 bg-white/10 rounded-full mt-2">

                    <div
                      className="h-full bg-cyan-400 rounded-full"
                      style={{
                        width: `${confidenceScore}%`,
                      }}
                    />

                  </div>

                </div>

                <div>

                  <div className="flex justify-between">

                    <span>
                      Eye Contact
                    </span>

                    <span className="text-purple-400">
                      {eyeContactScore}%
                    </span>

                  </div>

                  <div className="w-full h-3 bg-white/10 rounded-full mt-2">

                    <div
                      className="h-full bg-purple-400 rounded-full"
                      style={{
                        width: `${eyeContactScore}%`,
                      }}
                    />

                  </div>

                </div>

                <div>

                  <div className="flex justify-between">

                    <span>
                      Communication
                    </span>

                    <span className="text-pink-400">
                      {communicationScore}%
                    </span>

                  </div>

                  <div className="w-full h-3 bg-white/10 rounded-full mt-2">

                    <div
                      className="h-full bg-pink-400 rounded-full"
                      style={{
                        width: `${communicationScore}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

              <h2 className="text-2xl font-bold text-cyan-400">
                Controls
              </h2>

              <div className="space-y-4 mt-8">

                {!cameraOn ? (

                  <button
                    onClick={startCamera}
                    disabled={loading}
                    className="w-full py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition font-bold"
                  >
                    {loading
                      ? "Starting..."
                      : "Start Interview"}
                  </button>

                ) : (

                  <button
                    onClick={stopCamera}
                    className="w-full py-4 rounded-2xl bg-red-500 hover:bg-red-400 transition font-bold"
                  >
                    End Interview
                  </button>

                )}

              </div>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

              <h2 className="text-2xl font-bold text-cyan-400">
                AI Suggestions
              </h2>

              <div className="space-y-4 mt-8">

                <div className="bg-white/5 rounded-2xl p-4">
                  Maintain eye contact
                </div>

                <div className="bg-white/5 rounded-2xl p-4">
                  Speak confidently
                </div>

                <div className="bg-white/5 rounded-2xl p-4">
                  Keep responses structured
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default LiveInterview;