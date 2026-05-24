import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {

  Award,

  Download,

  ShieldCheck,

} from "lucide-react";

import {
  getInterviewSessions,
} from "../services/api";


function Certificate() {

  const [
    latestSession,
    setLatestSession,
  ] = useState<any>(null);


  useEffect(() => {

    loadLatest();

  }, []);


  async function loadLatest() {

    try {

      const data =
        await getInterviewSessions();

      if (
        data &&
        data.length > 0
      ) {

        setLatestSession(
          data[data.length - 1]
        );
      }

    } catch (error) {

      console.error(error);
    }
  }


  function downloadCertificate() {

    window.print();
  }


  return (

    <MainLayout>

      <div
        className="
          min-h-screen
          text-white
          px-10
          py-12
          flex
          items-center
          justify-center
        "
      >

        {
          latestSession && (

            <div
              className="
                max-w-5xl
                w-full
                bg-linear-to-br
                from-cyan-500/10
                to-purple-500/10
                border
                border-cyan-400/20
                rounded-[40px]
                p-14
                relative
                overflow-hidden
              "
            >

              <div
                className="
                  absolute
                  top-0
                  right-0
                  w-72
                  h-72
                  bg-cyan-400/10
                  blur-3xl
                  rounded-full
                "
              />


              <div
                className="
                  relative
                  z-10
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-center
                    mb-10
                  "
                >

                  <div
                    className="
                      w-28
                      h-28
                      rounded-full
                      bg-cyan-400/10
                      border
                      border-cyan-400/20
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <Award
                      className="
                        text-cyan-400
                      "
                      size={55}
                    />

                  </div>

                </div>


                <div
                  className="
                    text-center
                  "
                >

                  <div
                    className="
                      text-zinc-400
                      tracking-[8px]
                      text-sm
                      mb-4
                    "
                  >
                    AI INTERVIEW CERTIFICATION
                  </div>


                  <h1
                    className="
                      text-7xl
                      font-bold
                      mb-8
                    "
                  >
                    Certificate
                  </h1>


                  <p
                    className="
                      text-zinc-400
                      text-xl
                      mb-10
                    "
                  >
                    This certifies successful completion of the
                    AI-powered interview intelligence assessment.
                  </p>


                  <div
                    className="
                      text-5xl
                      font-bold
                      text-cyan-400
                      mb-10
                    "
                  >
                    Abhiraj Singh Sengar
                  </div>


                  <div
                    className="
                      grid
                      md:grid-cols-3
                      gap-6
                      mb-14
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
                          text-zinc-400
                          mb-2
                        "
                      >
                        Confidence
                      </div>

                      <div
                        className="
                          text-4xl
                          font-bold
                          text-cyan-400
                        "
                      >

                        {
                          latestSession
                            .final_report
                            .confidence
                        }%

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
                          text-zinc-400
                          mb-2
                        "
                      >
                        Communication
                      </div>

                      <div
                        className="
                          text-4xl
                          font-bold
                          text-green-400
                        "
                      >

                        {
                          latestSession
                            .final_report
                            .communication
                        }%

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
                          text-zinc-400
                          mb-2
                        "
                      >
                        Technical
                      </div>

                      <div
                        className="
                          text-4xl
                          font-bold
                          text-purple-400
                        "
                      >

                        {
                          latestSession
                            .final_report
                            .technical
                        }%

                      </div>

                    </div>

                  </div>


                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      gap-4
                      text-cyan-300
                      mb-12
                    "
                  >

                    <ShieldCheck />

                    Verified by HireSense AI Intelligence Engine

                  </div>


                  <button
                    onClick={
                      downloadCertificate
                    }
                    className="
                      bg-cyan-400
                      hover:bg-cyan-300
                      text-black
                      font-bold
                      px-10
                      py-5
                      rounded-2xl
                      inline-flex
                      items-center
                      gap-4
                      text-lg
                    "
                  >

                    <Download />

                    Download Certificate

                  </button>

                </div>

              </div>

            </div>
          )
        }

      </div>

    </MainLayout>
  );
}

export default Certificate;