import {
  useEffect,
  useRef,
  useState,
} from "react";

import * as faceapi from "face-api.js";

import MainLayout from "../components/MainLayout";

import toast from "react-hot-toast";

import {
  Camera,
  Video,
  VideoOff,
} from "lucide-react";


function LiveInterview() {

  const videoRef =
    useRef<HTMLVideoElement>(null);

  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  const [
    cameraOn,
    setCameraOn,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    attentionStatus,
    setAttentionStatus,
  ] = useState("Waiting");

  const [
    confidence,
    setConfidence,
  ] = useState(0);

  const [
    faceDetected,
    setFaceDetected,
  ] = useState(false);


  async function loadModels() {

    const MODEL_URL =
      "/models";

    await Promise.all([

      faceapi.nets
        .tinyFaceDetector
        .loadFromUri(MODEL_URL),

      faceapi.nets
        .faceLandmark68Net
        .loadFromUri(MODEL_URL),

      faceapi.nets
        .faceExpressionNet
        .loadFromUri(MODEL_URL),
    ]);

    console.log(
      "Face API models loaded"
    );
  }


  async function startCamera() {

    try {

      setLoading(true);

      await loadModels();


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

      setCameraOn(true);

      toast.success(
        "Camera started"
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Camera failed"
      );

    } finally {

      setLoading(false);
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

    setFaceDetected(false);

    setAttentionStatus(
      "Stopped"
    );
  }


  async function detectFace() {

    if (
      !videoRef.current
    ) return;


    const detections =

      await faceapi

        .detectAllFaces(

          videoRef.current,

          new faceapi
            .TinyFaceDetectorOptions()

        )

        .withFaceLandmarks()

        .withFaceExpressions();


    const canvas =
      canvasRef.current;

    if (
      !canvas
    ) return;


    const displaySize = {

      width:
        videoRef.current.width,

      height:
        videoRef.current.height,
    };


    faceapi.matchDimensions(
      canvas,
      displaySize
    );


    const resized =
      faceapi.resizeResults(

        detections,

        displaySize
      );


    const ctx =
      canvas.getContext("2d");

    if (!ctx) return;

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );


    faceapi.draw.drawDetections(
      canvas,
      resized
    );


    faceapi.draw.drawFaceLandmarks(
      canvas,
      resized
    );


    if (
      detections.length > 0
    ) {

      setFaceDetected(true);

      setAttentionStatus(
        "Focused"
      );

      const score = Math.min(

        95,

        70 + (
          detections.length * 10
        )
      );

      setConfidence(score);

    } else {

      setFaceDetected(false);

      setAttentionStatus(
        "Face Not Detected"
      );

      setConfidence(40);
    }
  }


  useEffect(() => {

    let interval: any;

    if (cameraOn) {

      interval = setInterval(() => {

        detectFace();

      }, 1200);
    }

    return () => {

      clearInterval(interval);
    };

  }, [cameraOn]);


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
            AI Vision Analysis
          </h1>

          <p
            className="
              text-gray-400
            "
          >
            Real-time face and attention tracking
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
                relative
                aspect-video
                bg-black
                rounded-2xl
                overflow-hidden
                mb-6
              "
            >

              {cameraOn ? (

                <>

                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    width={720}
                    height={560}
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />

                  <canvas
                    ref={canvasRef}
                    width={720}
                    height={560}
                    className="
                      absolute
                      top-0
                      left-0
                      w-full
                      h-full
                    "
                  />

                </>

              ) : (

                <div
                  className="
                    h-full
                    flex
                    items-center
                    justify-center
                    flex-col
                  "
                >

                  <Camera
                    size={70}
                    className="
                      text-gray-600
                      mb-4
                    "
                  />

                  <p
                    className="
                      text-gray-500
                    "
                  >
                    Camera inactive
                  </p>

                </div>
              )}

            </div>


            <div
              className="
                flex
                gap-4
              "
            >

              {!cameraOn ? (

                <button
                  onClick={
                    startCamera
                  }
                  disabled={loading}
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

                  <Video size={18} />

                  {
                    loading

                      ? "Loading..."

                      : "Start Camera"
                  }

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
                    px-6
                    py-4
                    rounded-2xl
                    flex
                    items-center
                    gap-3
                  "
                >

                  <VideoOff size={18} />

                  Stop Camera

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
                  mb-6
                "
              >
                AI Attention Metrics
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
                    Face Detection
                  </p>

                  <h3
                    className={`
                      text-2xl
                      font-black

                      ${
                        faceDetected

                          ? "text-green-400"

                          : "text-red-400"
                      }
                    `}
                  >

                    {
                      faceDetected

                        ? "Detected"

                        : "Missing"
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
                      text-cyan-400
                    "
                  >

                    {attentionStatus}

                  </h3>

                </div>


                <div
                  className="
                    col-span-2
                    bg-black/20
                    rounded-2xl
                    p-5
                  "
                >

                  <div
                    className="
                      flex
                      justify-between
                      mb-3
                    "
                  >

                    <p
                      className="
                        text-gray-400
                      "
                    >
                      Confidence Score
                    </p>

                    <p
                      className="
                        font-bold
                        text-white
                      "
                    >
                      {confidence}%
                    </p>

                  </div>


                  <div
                    className="
                      h-4
                      bg-white/10
                      rounded-full
                      overflow-hidden
                    "
                  >

                    <div
                      style={{
                        width:
                          `${confidence}%`
                      }}
                      className="
                        h-full
                        bg-cyan-400
                        transition-all
                      "
                    />

                  </div>

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