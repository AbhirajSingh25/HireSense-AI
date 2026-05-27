import {
  useEffect,
  useRef,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {

  Camera,
  Eye,
  Brain,

} from "lucide-react";


function VisionAnalysis() {

  const videoRef =
    useRef<HTMLVideoElement>(null);

  const [
    active,
    setActive,
  ] = useState(false);

  const [
    confidence,
    setConfidence,
  ] = useState(82);

  const [
    attention,
    setAttention,
  ] = useState("Focused");


  async function startCamera() {

    try {

      const stream =
        await navigator.mediaDevices.getUserMedia({

          video: true,
        });


      if (videoRef.current) {

        videoRef.current.srcObject =
          stream;
      }

      setActive(true);

    } catch (error) {

      console.error(error);
    }
  }


  useEffect(() => {

    let interval: any;

    if (active) {

      interval =
        setInterval(() => {

          const random =
            75 +
            Math.floor(
              Math.random() * 20
            );

          setConfidence(random);

          setAttention(

            random > 80

              ? "Focused"

              : "Distracted"
          );

        }, 3000);
    }

    return () =>
      clearInterval(interval);

  }, [active]);


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
            Vision Analysis
          </h1>

          <p
            className="
              text-gray-400
            "
          >
            AI-powered eye contact and attention tracking
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
              overflow-hidden
            "
          >

            <div
              className="
                p-5
                border-b
                border-white/10
                flex
                items-center
                justify-between
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <Camera
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
                  Live Camera
                </h2>

              </div>


              {!active && (

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
                  "
                >

                  Start

                </button>
              )}

            </div>


            <div
              className="
                bg-black
                aspect-video
                flex
                items-center
                justify-center
              "
            >

              <video
                ref={videoRef}
                autoPlay
                muted
                className="
                  w-full
                  h-full
                  object-cover
                "
              />

            </div>

          </div>


          <div
            className="
              grid
              gap-6
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
                  flex
                  items-center
                  gap-3
                  mb-5
                "
              >

                <Eye
                  className="
                    text-pink-400
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
                  Eye Contact
                </h2>

              </div>


              <div
                className="
                  h-4
                  bg-black/20
                  rounded-full
                  overflow-hidden
                  mb-4
                "
              >

                <div
                  style={{
                    width: `${confidence}%`
                  }}
                  className="
                    h-full
                    bg-pink-400
                    transition-all
                  "
                />

              </div>


              <div
                className="
                  flex
                  justify-between
                  items-center
                "
              >

                <span
                  className="
                    text-gray-400
                  "
                >
                  Confidence Level
                </span>

                <span
                  className="
                    text-3xl
                    font-black
                    text-white
                  "
                >
                  {confidence}%
                </span>

              </div>

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
                  Attention Status
                </h2>

              </div>


              <div
                className={`
                  inline-flex
                  px-5
                  py-3
                  rounded-2xl
                  font-bold

                  ${
                    attention === "Focused"

                      ? `
                        bg-green-400
                        text-black
                      `

                      : `
                        bg-orange-400
                        text-black
                      `
                  }
                `}
              >

                {attention}

              </div>

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

              <h2
                className="
                  text-2xl
                  font-bold
                  text-white
                  mb-5
                "
              >
                AI Feedback
              </h2>


              <p
                className="
                  text-gray-300
                  leading-8
                "
              >

                Maintain consistent eye contact and avoid looking away frequently during technical explanations. Strong facial engagement improves perceived confidence during interviews.

              </p>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default VisionAnalysis;