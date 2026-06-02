import {
  useEffect,
  useRef,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import Card from "../components/ui/Card";

import Button from "../components/ui/Button";

import {
  Mic,
  Camera,
  Timer,
  Brain,
  Save,
} from "lucide-react";

import {
  getAIInterviewFeedback,
  analyzeSpeech,
  saveInterview,
} from "../services/api";


function LiveInterview() {

  const videoRef =
    useRef<HTMLVideoElement>(null);


  const [
    transcript,
    setTranscript,
  ] = useState("");


  const [
    listening,
    setListening,
  ] = useState(false);


  const [
    seconds,
    setSeconds,
  ] = useState(0);


  const [
    loading,
    setLoading,
  ] = useState(false);


  const [
    aiFeedback,
    setAiFeedback,
  ] = useState<string[]>([]);


  const [
    scores,
    setScores,
  ] = useState({

    confidence: 0,

    communication: 0,

    technical: 0,

    filler_words: 0,
  });


  useEffect(() => {

    let interval: any;

    if (listening) {

      interval = setInterval(() => {

        setSeconds(
          (prev) => prev + 1
        );

      }, 1000);
    }

    return () =>
      clearInterval(interval);

  }, [listening]);


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

    } catch (error) {

      console.error(error);
    }
  }


  function startSpeechRecognition() {

    const SpeechRecognition =

      (window as any)
        .webkitSpeechRecognition ||

      (window as any)
        .SpeechRecognition;


    if (!SpeechRecognition) {

      alert(
        "Speech recognition not supported"
      );

      return;
    }


    const recognition =
      new SpeechRecognition();


    recognition.continuous =
      true;

    recognition.interimResults =
      true;


    recognition.onresult =
      (event: any) => {

        let text = "";

        for (

          let i = 0;

          i < event.results.length;

          i++
        ) {

          text +=

            event.results[i][0]
            .transcript + " ";
        }

        setTranscript(text);
      };


    recognition.start();

    setListening(true);
  }


  function formatTime(
    total: number
  ) {

    const mins =
      Math.floor(total / 60);

    const secs =
      total % 60;

    return `${mins}:${
      secs < 10
        ? "0"
        : ""
    }${secs}`;
  }


  async function analyzeInterview() {

    try {

      setLoading(true);


      const speechData =

        await analyzeSpeech(
          transcript
        );


      const aiData =

        await getAIInterviewFeedback(
          transcript
        );


      setScores({

        confidence:
          speechData.confidence,

        communication:
          speechData.clarity,

        technical: 84,

        filler_words:
          speechData.filler_words,
      });


      setAiFeedback([

        aiData.feedback
      ]);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }


  async function handleSaveInterview() {

    try {

      const user = JSON.parse(

        localStorage.getItem(
          "user"
        ) || "{}"
      );


      await saveInterview({

        user_id: user.id,

        role: "AI Interview",

        transcript,

        confidence_score:
          scores.confidence,

        communication_score:
          scores.communication,

        words_per_minute: 120,

        eye_contact_score: 86,

        technical_score:
          scores.technical,

        attention_status:
          "Focused",

        ai_feedback:
          aiFeedback.join("\n"),
      });


      alert(
        "Interview saved successfully"
      );

    } catch (error) {

      console.error(error);
    }
  }


  return (

    <MainLayout>

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
            "
          >
            Live AI Interview
          </h1>

          <p
            className="
              text-zinc-500
              mt-2
            "
          >
            Realtime AI Interview Intelligence
          </p>

        </div>


        <div
          className="
            flex
            items-center
            gap-3

            bg-[#101010]
            border
            border-white/5

            px-5
            py-3

            rounded-2xl
          "
        >

          <Timer size={20} />

          <span
            className="
              text-2xl
              font-bold
            "
          >
            {formatTime(seconds)}
          </span>

        </div>

      </div>


      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-8
        "
      >

        <div
          className="
            xl:col-span-2
            space-y-8
          "
        >

          <Card className="p-5">

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


          <Card className="p-8">

            <div
              className="
                flex
                items-center
                gap-3
                mb-6
              "
            >

              <Mic
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
                Live Transcript
              </h2>

            </div>


            <div
              className="
                h-[220px]
                overflow-y-auto
                bg-black/30
                border
                border-white/5
                rounded-2xl
                p-5
                text-zinc-300
                leading-relaxed
              "
            >

              {
                transcript ||

                "Speech transcript will appear here..."
              }

            </div>

          </Card>

        </div>


        <div className="space-y-8">

          <Card className="p-8">

            <h2
              className="
                text-3xl
                font-bold
                mb-8
              "
            >
              Controls
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
                onClick={
                  startSpeechRecognition
                }
                className="w-full"
              >

                <Mic size={20} />

                Start Listening

              </Button>


              <Button
                onClick={analyzeInterview}
                className="w-full"
              >

                <Brain size={20} />

                {
                  loading
                    ? "Analyzing..."
                    : "Analyze Interview"
                }

              </Button>


              <Button
                onClick={
                  handleSaveInterview
                }
                className="
                  w-full
                  bg-green-500
                  hover:bg-green-400
                "
              >

                <Save size={20} />

                Save Interview

              </Button>

            </div>

          </Card>


          <Card className="p-8">

            <h2
              className="
                text-3xl
                font-bold
                mb-8
              "
            >
              AI Feedback
            </h2>


            <div className="space-y-4">

              {aiFeedback.map(
                (item, index) => (

                  <div
                    key={index}
                    className="
                      p-4
                      rounded-2xl
                      bg-black/30
                      border
                      border-white/5
                    "
                  >

                    <p
                      className="
                        text-zinc-300
                        whitespace-pre-wrap
                      "
                    >
                      {item}
                    </p>

                  </div>
                )
              )}

            </div>

          </Card>


          <Card className="p-8">

            <h2
              className="
                text-3xl
                font-bold
                mb-8
              "
            >
              Live Scores
            </h2>


            <div className="space-y-6">

              {[
                {
                  label:
                    "Confidence",
                  value:
                    scores.confidence,
                },

                {
                  label:
                    "Communication",
                  value:
                    scores.communication,
                },

                {
                  label:
                    "Technical",
                  value:
                    scores.technical,
                },
              ].map((item) => (

                <div key={item.label}>

                  <div
                    className="
                      flex
                      justify-between
                      mb-2
                    "
                  >

                    <span>
                      {item.label}
                    </span>

                    <span
                      className="
                        text-cyan-400
                        font-bold
                      "
                    >
                      {item.value}%
                    </span>

                  </div>


                  <div
                    className="
                      w-full
                      h-3
                      bg-black
                      rounded-full
                      overflow-hidden
                    "
                  >

                    <div
                      className="
                        h-full
                        bg-cyan-400
                        rounded-full
                      "
                      style={{
                        width:
                          `${item.value}%`,
                      }}
                    />

                  </div>

                </div>
              ))}

            </div>

          </Card>

        </div>

      </div>

    </MainLayout>
  );
}

export default LiveInterview;