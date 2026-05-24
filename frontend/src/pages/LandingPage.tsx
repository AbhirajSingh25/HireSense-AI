import {
  Link,
} from "react-router-dom";

import {

  Brain,

  FileText,

  Mic,

  Camera,

  BarChart3,

  Sparkles,

} from "lucide-react";


function LandingPage() {

  const features = [

    {
      icon: Brain,
      title: "AI Interview Engine",
      description:
        "Dynamic recruiter-style interviews powered by Groq AI.",
    },

    {
      icon: FileText,
      title: "Resume Intelligence",
      description:
        "ATS scoring, skill extraction, and recruiter analysis.",
    },

    {
      icon: Mic,
      title: "Voice Analytics",
      description:
        "Speech pace, filler words, and communication insights.",
    },

    {
      icon: Camera,
      title: "Face Analytics",
      description:
        "Live face detection and attention monitoring.",
    },

    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description:
        "Performance tracking and interview history.",
    },

    {
      icon: Sparkles,
      title: "AI Reports",
      description:
        "Professional recruiter-style evaluation reports.",
    },
  ];


  return (

    <div
      className="
        min-h-screen
        bg-black
        text-white
      "
    >

      <section
        className="
          px-8
          py-28
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
            text-center
          "
        >

          <div
            className="
              inline-flex
              items-center
              gap-3
              bg-cyan-400/10
              border
              border-cyan-400/20
              rounded-full
              px-6
              py-3
              mb-8
            "
          >

            <Sparkles
              className="
                text-cyan-400
              "
            />

            <span
              className="
                text-cyan-300
              "
            >
              AI-Powered Career Intelligence Platform
            </span>

          </div>


          <h1
            className="
              text-7xl
              md:text-8xl
              font-black
              leading-tight
              mb-8
            "
          >

            HireSense AI

          </h1>


          <p
            className="
              text-zinc-400
              text-2xl
              max-w-4xl
              mx-auto
              leading-relaxed
              mb-14
            "
          >

            Multimodal AI interview platform featuring
            recruiter intelligence, resume analysis,
            voice analytics, and real-time interview evaluation.

          </p>


          <div
            className="
              flex
              flex-wrap
              justify-center
              gap-6
            "
          >

            <Link
              to="/login"
              className="
                bg-cyan-400
                hover:bg-cyan-300
                text-black
                font-bold
                px-10
                py-5
                rounded-2xl
                text-lg
              "
            >

              Launch Platform

            </Link>


            <a
              href="https://github.com/AbhirajSingh25/HireSense-AI"
              target="_blank"
              className="
                border
                border-white/10
                hover:border-white/20
                bg-white/5
                px-10
                py-5
                rounded-2xl
                text-lg
              "
            >

              GitHub Repository

            </a>

          </div>

        </div>

      </section>


      <section
        className="
          px-8
          pb-28
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
          "
        >

          <div
            className="
              grid
              md:grid-cols-2
              xl:grid-cols-3
              gap-8
            "
          >

            {
              features.map(
                (
                  feature,
                  index
                ) => {

                  const Icon =
                    feature.icon;

                  return (

                    <div
                      key={index}
                      className="
                        bg-white/5
                        border
                        border-white/10
                        rounded-3xl
                        p-8
                        hover:border-cyan-400/30
                        transition-all
                      "
                    >

                      <div
                        className="
                          w-16
                          h-16
                          rounded-2xl
                          bg-cyan-400/10
                          flex
                          items-center
                          justify-center
                          mb-6
                        "
                      >

                        <Icon
                          className="
                            text-cyan-400
                          "
                          size={32}
                        />

                      </div>


                      <h3
                        className="
                          text-2xl
                          font-bold
                          mb-4
                        "
                      >

                        {
                          feature.title
                        }

                      </h3>


                      <p
                        className="
                          text-zinc-400
                          leading-8
                        "
                      >

                        {
                          feature.description
                        }

                      </p>

                    </div>
                  );
                }
              )
            }

          </div>

        </div>

      </section>


      <section
        className="
          px-8
          pb-32
        "
      >

        <div
          className="
            max-w-5xl
            mx-auto
            bg-gradient-to-r
            from-cyan-400/10
            to-purple-400/10
            border
            border-white/10
            rounded-[40px]
            p-16
            text-center
          "
        >

          <h2
            className="
              text-5xl
              font-black
              mb-8
            "
          >

            Built for Modern AI Interviews

          </h2>


          <p
            className="
              text-zinc-300
              text-xl
              leading-relaxed
              mb-12
            "
          >

            HireSense AI combines multimodal intelligence,
            recruiter evaluation systems, and AI-powered
            analytics into a single interview preparation platform.

          </p>


          <Link
            to="/signup"
            className="
              inline-block
              bg-white
              text-black
              font-bold
              px-12
              py-5
              rounded-2xl
              text-lg
            "
          >

            Get Started

          </Link>

        </div>

      </section>

    </div>
  );
}

export default LandingPage;