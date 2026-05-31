import {
  useEffect,
  useRef,
  useState,
} from "react";

import Webcam from "react-webcam";

import RecordRTC from "recordrtc";

import MainLayout from "../components/MainLayout";

import {

  analyzeSpeech,
  analyzeVision,
  saveInterview,

} from "../services/api";

import {

  Mic,
  Camera,
  Brain,
  Video,
  Download,
  Timer,
  Activity,

} from "lucide-react";


declare global {

  interface Window {

    SpeechRecognition: any;

    webkitSpeechRecognition: any;
  }
}


function LiveInterview() {

  const webcamRef =
    useRef<any>(null);

  const recognitionRef =
    useRef<any>(null);

  const recorderRef =
    useRef<any>(null);


  const [
    transcript,
    setTranscript,
  ] = useState("");

  const [
    listening,
    setListening,
  ] = useState(false);

  const [
    recording,
    setRecording,
  ] = useState(false);

  const [
    recordedUrl,
    setRecordedUrl,
  ] = useState("");

  const [
    speechData,
    setSpeechData,
  ] = useState<any>(null);

  const [
    visionData,
    setVisionData,
  ] = useState<any>(null);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    seconds,
    setSeconds,
  ] = useState(0);

  const [
    overallScore,
    setOverallScore,
  ] = useState<number | null>(
    null
  );


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


  useEffect(() => {

    let interval: any;


    if (listening) {

      interval = setInterval(
        () => {

          setSeconds(
            (prev) => prev + 1
          );

        },
        1000
      );
    }


    return () =>
      clearInterval(interval);

  }, [listening]);


  function formatTime(
    totalSeconds: number
  ) {

    const mins = Math.floor(
      totalSeconds / 60
    );

    const secs =
      totalSeconds % 60;


    return `${mins}:${
      secs < 10
        ? `0${secs}`
        : secs
    }`;
  }


  async function startInterview() {

    if (
      recognitionRef.current
    ) {

      recognitionRef
        .current
        .start();

      setListening(true);
    }
  }


  function stopInterview() {

    if (
      recognitionRef.current
    ) {

      recognitionRef
        .current
        .stop();

      setListening(false);
    }
  }


  async function startRecording() {

    const stream =

      await navigator
        .mediaDevices
        .getUserMedia({

          audio: true,
          video: true,
        });


    const recorder =
      new RecordRTC(
        stream,
        {
          type: "video",
        }
      );


    recorder.startRecording();

    recorderRef.current =
      recorder;

    setRecording(true);
  }


  async function stopRecording() {

    recorderRef.current.stopRecording(
      () => {

        const blob =
          recorderRef
            .current
            .getBlob();

        const url =
          URL.createObjectURL(
            blob
          );

        setRecordedUrl(url);
      }
    );

    setRecording(false);
  }


  async function analyze() {

    try {

      setLoading(true);


      const speech =
        await analyzeSpeech(
          transcript
        );


      const vision =
        await analyzeVision({
          active: true,
        });


      setSpeechData(
        speech
      );

      setVisionData(
        vision
      );


      const finalScore =
        Math.round(

          (
            speech.confidence +

            speech.clarity +

            vision.eye_contact +

            vision.confidence_score
          ) / 4
        );


      setOverallScore(
        finalScore
      );


      const user = JSON.parse(

        localStorage.getItem(
          "user"
        ) || "{}"
      );


      await saveInterview({

        user_id:
          user.id || 1,

        role:
          "Live Interview",

        transcript,

        confidence_score:
          speech.confidence,

        communication_score:
          speech.clarity,

        words_per_minute:
          speech.speaking_speed,

        eye_contact_score:
          vision.eye_contact,

        technical_score:
          finalScore,

        attention_status:
          "Focused",

        ai_feedback:
          speech.feedback,
      });

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
          max-w-7xl
          mx-auto
        "
      >

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
              Realtime speech and webcam intelligence
            </p>

          </div>


          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              px-6
              py-5
              flex
              items-center
              gap-4
            "
          >

            <Timer
              className="
                text-cyan-400
              "
            />

            <div>

              <p
                className="
                  text-gray-400
                  text-sm
                "
              >
                Interview Time
              </p>

              <h2
                className="
                  text-2xl
                  font-bold
                "
              >
                {
                  formatTime(
                    seconds
                  )
                }
              </h2>

            </div>

          </div>

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
              space-y-6
            "
          >

            <div
              className="
                relative
                bg-white/5
                border
                border-white/10
                rounded-3xl
                overflow-hidden
              "
            >

              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                className="
                  w-full
                  rounded-3xl
                "
              />


              <div
                className="
                  absolute
                  top-4
                  left-4
                  bg-black/60
                  backdrop-blur-xl
                  px-4
                  py-2
                  rounded-full
                  flex
                  items-center
                  gap-2
                "
              >

                <Activity
                  size={16}
                  className="
                    text-green-400
                  "
                />

                <span
                  className="
                    text-sm
                  "
                >
                  Live
                </span>

              </div>

            </div>


            <div
              className="
                grid
                grid-cols-3
                gap-4
              "
            >

              <button

                onClick={
                  listening

                    ? stopInterview

                    : startInterview
                }

                className={`
                  py-5
                  rounded-2xl
                  font-bold
                  flex
                  items-center
                  justify-center
                  gap-3

                  transition-all
                  duration-300

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

                <Mic size={20} />

                {
                  listening

                    ? "Stop"

                    : "Start"
                }

              </button>


              <button

                onClick={
                  recording

                    ? stopRecording

                    : startRecording
                }

                className="
                  py-5
                  rounded-2xl
                  font-bold
                  flex
                  items-center
                  justify-center
                  gap-3
                  bg-purple-500
                  text-white
                "
              >

                <Video size={20} />

                {
                  recording

                    ? "Stop"

                    : "Record"
                }

              </button>


              <button

                onClick={analyze}

                disabled={loading}

                className="
                  py-5
                  rounded-2xl
                  bg-white/10
                  text-white
                  font-bold
                  flex
                  items-center
                  justify-center
                  gap-3
                "
              >

                <Brain size={20} />

                {
                  loading

                    ? "..."

                    : "Analyze"
                }

              </button>

            </div>


            <div
              className="
                bg-white/5
                border
                border-white/10
                rounded-3xl
                p-6
                min-h-65
              "
            >

              <p
                className="
                  text-gray-400
                  mb-4
                "
              >
                Live Transcript
              </p>

              <p
                className="
                  text-gray-200
                  leading-9
                "
              >

                {
                  transcript ||

                  "Transcript will appear here..."
                }

              </p>

            </div>


            {
              recordedUrl && (

                <div
                  className="
                    bg-white/5
                    border
                    border-white/10
                    rounded-3xl
                    p-5
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      mb-5
                    "
                  >

                    <h2
                      className="
                        text-xl
                        font-bold
                      "
                    >
                      Interview Recording
                    </h2>


                    <a
                      href={recordedUrl}
                      download
                      className="
                        flex
                        items-center
                        gap-2
                        text-cyan-400
                      "
                    >

                      <Download
                        size={18}
                      />

                      Download

                    </a>

                  </div>


                  <video

                    src={recordedUrl}

                    controls

                    className="
                      w-full
                      rounded-2xl
                    "
                  />

                </div>
              )
            }

          </div>


          <div
            className="
              space-y-6
            "
          >

            {
              overallScore !== null && (

                <div
                  className="
                    bg-linear-to-r
                    from-cyan-500/20
                    to-blue-500/20
                    border
                    border-cyan-400/30
                    rounded-3xl
                    p-8
                  "
                >

                  <p
                    className="
                      text-gray-300
                      mb-3
                    "
                  >
                    Overall AI Score
                  </p>

                  <h1
                    className="
                      text-7xl
                      font-black
                      text-cyan-400
                    "
                  >
                    {overallScore}
                  </h1>

                </div>
              )
            }


            <AnalysisCard
              title="Speech Intelligence"
              icon={<Brain className="text-cyan-400" />}
              data={speechData}
              metrics={[

                {
                  label: "Confidence",
                  value:
                    speechData?.confidence,
                },

                {
                  label: "Clarity",
                  value:
                    speechData?.clarity,
                },

                {
                  label: "Speaking Speed",
                  value:
                    speechData?.speaking_speed,
                },

                {
                  label: "Filler Words",
                  value:
                    speechData?.filler_words,
                },
              ]}
            />


            <AnalysisCard
              title="Vision Intelligence"
              icon={<Camera className="text-cyan-400" />}
              data={visionData}
              metrics={[

                {
                  label: "Eye Contact",
                  value:
                    visionData?.eye_contact,
                },

                {
                  label: "Attention",
                  value:
                    visionData?.attention_score,
                },

                {
                  label: "Confidence",
                  value:
                    visionData?.confidence_score,
                },
              ]}
            />

          </div>

        </div>

      </div>

    </MainLayout>
  );
}


function AnalysisCard({

  title,
  icon,
  data,
  metrics,

}: any) {

  return (

    <div
      className="
        bg-white/5
        border
        border-white/10
        rounded-3xl
        p-7
      "
    >

      <div
        className="
          flex
          items-center
          gap-3
          mb-6
        "
      >

        {icon}

        <h2
          className="
            text-2xl
            font-bold
          "
        >
          {title}
        </h2>

      </div>


      {!data ? (

        <p
          className="
            text-gray-500
          "
        >
          No analysis yet
        </p>

      ) : (

        <div
          className="
            space-y-5
          "
        >

          {metrics.map(
            (
              metric: any,
              index: number
            ) => (

              <Metric
                key={index}
                label={metric.label}
                value={metric.value}
              />
            )
          )}


          <div>

            <p
              className="
                text-gray-400
                mb-3
              "
            >
              Feedback
            </p>

            <p
              className="
                text-gray-200
                leading-8
              "
            >
              {data.feedback}
            </p>

          </div>

        </div>
      )}

    </div>
  );
}


function Metric({

  label,
  value,

}: any) {

  return (

    <div>

      <div
        className="
          flex
          items-center
          justify-between
          mb-2
        "
      >

        <p
          className="
            text-gray-400
          "
        >
          {label}
        </p>

        <p
          className="
            text-cyan-400
            font-bold
          "
        >
          {value}
        </p>

      </div>


      <div
        className="
          w-full
          h-3
          rounded-full
          bg-white/10
          overflow-hidden
        "
      >

        <div
          className="
            h-full
            bg-cyan-400
            transition-all
            duration-500
          "
          style={{
            width: `${value}%`
          }}
        />

      </div>

    </div>
  );
}

export default LiveInterview;