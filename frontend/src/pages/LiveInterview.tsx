import {
  useEffect,
  useRef,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import toast from "react-hot-toast";

import {
  Camera,
  Mic,
  MicOff,
  Video,
  VideoOff,
} from "lucide-react";

import {
  analyzeLiveInterview,
} from "../services/api";


function LiveInterview() {

  const videoRef =
    useRef<HTMLVideoElement>(null);

  const [
    cameraOn,
    setCameraOn,
  ] = useState(false);

  const [
    micOn,
    setMicOn,
  ] = useState(false);

  const [
    transcript,
    setTranscript,
  ] = useState("");

  const [
    role,
    setRole,
  ] = useState(
    "Frontend Developer"
  );

  const [
    analysis,
    setAnalysis,
  ] = useState<any>(null);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    recognition,
    setRecognition,
  ] = useState<any>(null);


  async function startCamera() {

    try {

      const stream =

        await navigator
          .mediaDevices
          .getUserMedia({

            video: true,
            audio: true,
          });


      if (videoRef.current) {

        videoRef.current.srcObject =
          stream;
      }

      setCameraOn(true);

      toast.success(
        "Camera started"
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Camera access denied"
      );
    }
  }


  function stopCamera() {

    const stream: any =
      videoRef.current?.srcObject;

    if (stream) {

      stream
        .getTracks()
        .forEach((track: any) =>
          track.stop()
        );
    }

    setCameraOn(false);
  }


  function startVoice() {

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

      setMicOn(true);
    };


    recognitionInstance.onend =
      () => {

      setMicOn(false);
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


  function stopVoice() {

    if (recognition) {

      recognition.stop();
    }

    setMicOn(false);
  }


  async function analyzeInterview() {

    try {

      setLoading(true);

      const result =

        await analyzeLiveInterview(

          transcript,

          role
        );

      setAnalysis(result);

      toast.success(
        "Analysis completed"
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


  useEffect(() => {

    return () => {

      stopCamera();

      stopVoice();
    };

  }, []);


  return (

    <MainLayout>

      <div
        className="
          max-w-7xl
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
            Real-time camera and voice interview analysis
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

            <div
              className="
                aspect-video
                bg-black
                rounded-2xl
                overflow-hidden
                mb-6
                flex
                items-center
                justify-center
              "
            >

              {cameraOn ? (

                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />

              ) : (

                <div
                  className="
                    text-center
                  "
                >

                  <Camera
                    size={70}
                    className="
                      text-gray-600
                      mx-auto
                      mb-4
                    "
                  />

                  <p
                    className="
                      text-gray-500
                    "
                  >
                    Camera not started
                  </p>

                </div>
              )}

            </div>


            <div
              className="
                flex
                flex-wrap
                gap-4
              "
            >

              {!cameraOn ? (

                <button
                  onClick={
                    startCamera
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
                    gap-2
                  "
                >

                  <Video size={18} />

                  Start Camera

                </button>

              ) : (

                <button
                  onClick={
                    stopCamera
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
                    gap-2
                  "
                >

                  <VideoOff size={18} />

                  Stop Camera

                </button>
              )}


              {!micOn ? (

                <button
                  onClick={
                    startVoice
                  }
                  className="
                    bg-green-400
                    hover:bg-green-300
                    text-black
                    font-bold
                    px-5
                    py-3
                    rounded-2xl
                    flex
                    items-center
                    gap-2
                  "
                >

                  <Mic size={18} />

                  Start Mic

                </button>

              ) : (

                <button
                  onClick={
                    stopVoice
                  }
                  className="
                    bg-orange-400
                    hover:bg-orange-300
                    text-black
                    font-bold
                    px-5
                    py-3
                    rounded-2xl
                    flex
                    items-center
                    gap-2
                  "
                >

                  <MicOff size={18} />

                  Stop Mic

                </button>
              )}

            </div>

          </div>


          <div
            className="
              space-y-6
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

              <h2
                className="
                  text-2xl
                  font-bold
                  mb-5
                "
              >
                Interview Settings
              </h2>


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
                  mb-5
                  outline-none
                "
              >

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

              </select>


              <textarea
                value={transcript}
                onChange={(e) =>
                  setTranscript(
                    e.target.value
                  )
                }
                rows={8}
                placeholder="Live transcript appears here..."
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
                  mb-5
                "
              />


              <button
                onClick={
                  analyzeInterview
                }
                disabled={
                  loading ||
                  !transcript
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

                    ? "Analyzing..."

                    : "Analyze Interview"
                }

              </button>

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
                  AI Analysis
                </h2>


                <div
                  className="
                    grid
                    grid-cols-2
                    gap-5
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
                        analysis
                          ?.words_per_minute
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
                        analysis
                          ?.attention_status
                      }
                    </h3>

                  </div>

                </div>


                <div
                  className="
                    mt-6
                    bg-black/20
                    rounded-2xl
                    p-5
                  "
                >

                  <h3
                    className="
                      font-bold
                      mb-3
                    "
                  >
                    AI Feedback
                  </h3>

                  <p
                    className="
                      text-gray-300
                      leading-8
                    "
                  >
                    {
                      analysis
                        ?.feedback
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