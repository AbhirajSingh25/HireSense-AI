import {
  useState,
} from "react";

import MainLayout from "../components/MainLayout";
import PageContainer from "../components/ui/PageContainer";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";

import {
  askAICopilot,
} from "../services/api";

import {
  Brain,
  Sparkles,
  Send,
  Mic,
  ShieldCheck,
  Bot,
  User,
} from "lucide-react";


function AICopilot() {

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    messages,
    setMessages,
  ] = useState([

    {
      role: "assistant",

      content:
        "Hello Abhiraj. I am your AI Interview Copilot. Ask me technical, behavioral, recruiter, resume, or interview-related questions.",
    },

    {
      role: "user",

      content:
        "How should I answer scalability interview questions?",
    },

    {
      role: "assistant",

      content:
        "Focus on architecture decisions, bottleneck identification, caching, load balancing, horizontal scaling, and tradeoff explanations.",
    },
  ]);


  async function handleSend() {

    if (!message.trim()) {
      return;
    }

    const userMessage = {

      role: "user",

      content: message,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    const currentMessage = message;

    setMessage("");

    setLoading(true);

    try {

      const response =
        await askAICopilot(
          currentMessage
        );

      const aiMessage = {

        role: "assistant",

        content:
          response.reply,
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

    } catch (error) {

      console.error(error);

      setMessages((prev) => [

        ...prev,

        {
          role: "assistant",

          content:
            "AI Copilot failed to respond.",
        },
      ]);

    } finally {

      setLoading(false);
    }
  }


  return (

    <MainLayout>

      <PageContainer>

        <PageHeader
          badge="AI COPILOT ENGINE"
          title="Recruiter Intelligence Assistant"
          description="
            AI-powered interview copilot
            for technical preparation,
            recruiter coaching,
            behavioral intelligence,
            and realtime interview guidance.
          "
        />



        {/* TOP CARDS */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-5
            mb-6
          "
        >

          <Card className="p-6">

            <Brain
              className="
                text-red-400
                mb-5
              "
              size={30}
            />

            <h2
              className="
                text-4xl
                font-black
                mb-2
              "
            >
              GPT-4
            </h2>

            <p className="text-zinc-500">
              AI Intelligence Engine
            </p>

          </Card>



          <Card className="p-6">

            <Sparkles
              className="
                text-cyan-400
                mb-5
              "
              size={30}
            />

            <h2
              className="
                text-4xl
                font-black
                mb-2
              "
            >
              LIVE
            </h2>

            <p className="text-zinc-500">
              Realtime Coaching
            </p>

          </Card>



          <Card className="p-6">

            <ShieldCheck
              className="
                text-green-400
                mb-5
              "
              size={30}
            />

            <h2
              className="
                text-4xl
                font-black
                mb-2
              "
            >
              91%
            </h2>

            <p className="text-zinc-500">
              Recruiter Accuracy
            </p>

          </Card>



          <Card className="p-6">

            <Bot
              className="
                text-yellow-400
                mb-5
              "
              size={30}
            />

            <h2
              className="
                text-4xl
                font-black
                mb-2
              "
            >
              24/7
            </h2>

            <p className="text-zinc-500">
              AI Availability
            </p>

          </Card>

        </div>



        {/* MAIN */}

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-12
            gap-6
          "
        >

          {/* CHAT */}

          <div
            className="
              xl:col-span-8
            "
          >

            <Card
              className="
                overflow-hidden
                p-0
              "
            >

              {/* HEADER */}

              <div
                className="
                  border-b
                  border-white/5
                  p-6
                  flex
                  items-center
                  justify-between
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >

                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-red-500/10
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <Brain
                      className="
                        text-red-400
                      "
                    />

                  </div>

                  <div>

                    <h2
                      className="
                        text-2xl
                        font-black
                        mb-1
                      "
                    >
                      AI Interview Copilot
                    </h2>

                    <p className="text-zinc-500">
                      Recruiter-grade intelligence assistant
                    </p>

                  </div>

                </div>



                <div
                  className="
                    px-4
                    py-2
                    rounded-xl
                    bg-green-500/10
                    border
                    border-green-500/20
                    text-green-400
                    text-sm
                    font-semibold
                  "
                >
                  ONLINE
                </div>

              </div>



              {/* CHAT AREA */}

              <div
                className="
                  p-6
                  h-[420px]
                  overflow-y-auto
                  space-y-5
                "
              >

                {messages.map((msg, index) => (

                  <div
                    key={index}

                    className={`
                      flex
                      ${
                        msg.role === "assistant"
                          ? "justify-start"
                          : "justify-end"
                      }
                    `}
                  >

                    <div
                      className={`
                        max-w-[85%]
                        rounded-3xl
                        p-5
                        border

                        ${
                          msg.role === "assistant"

                            ? `
                              bg-[#0b0b0b]
                              border-red-500/10
                            `

                            : `
                              bg-red-500
                              border-red-400
                            `
                        }
                      `}
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          mb-3
                        "
                      >

                        {
                          msg.role === "assistant"

                            ? (
                              <Brain
                                className="
                                  text-red-400
                                "
                                size={16}
                              />
                            )

                            : (
                              <User
                                size={16}
                              />
                            )
                        }

                        <span
                          className="
                            text-sm
                            font-semibold
                          "
                        >

                          {
                            msg.role === "assistant"
                              ? "AI Copilot"
                              : "You"
                          }

                        </span>

                      </div>

                      <p
                        className="
                          leading-relaxed
                        "
                      >
                        {msg.content}
                      </p>

                    </div>

                  </div>

                ))}



                {loading && (

                  <div
                    className="
                      text-zinc-500
                      text-sm
                    "
                  >
                    AI Copilot thinking...
                  </div>

                )}

              </div>



              {/* INPUT */}

              <div
                className="
                  border-t
                  border-white/5
                  p-5
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <input
                    value={message}

                    onChange={(e) =>
                      setMessage(
                        e.target.value
                      )
                    }

                    onKeyDown={(e) => {

                      if (
                        e.key === "Enter"
                      ) {
                        handleSend();
                      }
                    }}

                    placeholder="
                      Ask AI about interviews,
                      DSA,
                      system design,
                      HR rounds...
                    "

                    className="
                      flex-1
                      h-14
                      rounded-2xl
                      bg-[#0b0b0b]
                      border
                      border-white/10
                      px-5
                      text-white
                      outline-none
                    "
                  />



                  <button
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-cyan-500
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <Mic size={20} />

                  </button>



                  <button
                    onClick={handleSend}

                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-red-500
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <Send size={20} />

                  </button>

                </div>

              </div>

            </Card>

          </div>



          {/* RIGHT PANEL */}

          <div
            className="
              xl:col-span-4
              space-y-5
            "
          >

            <Card className="p-6">

              <div className="mb-6">

                <p
                  className="
                    text-red-400
                    uppercase
                    tracking-[0.25em]
                    text-xs
                    mb-2
                  "
                >
                  AI CAPABILITIES
                </p>

                <h2
                  className="
                    text-2xl
                    font-black
                  "
                >
                  Intelligence Modules
                </h2>

              </div>



              <div className="space-y-4">

                {[
                  "Technical Interview Coaching",
                  "Behavioral Intelligence",
                  "System Design Guidance",
                  "Recruiter Expectations",
                  "Resume Optimization",
                  "Realtime Communication Analysis",
                ].map((item) => (

                  <div
                    key={item}

                    className="
                      p-4
                      rounded-2xl
                      bg-[#0b0b0b]
                      border
                      border-white/5
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <Sparkles
                      className="
                        text-red-400
                      "
                      size={18}
                    />

                    <span className="text-sm">
                      {item}
                    </span>

                  </div>

                ))}

              </div>

            </Card>



            <Card className="p-6">

              <div className="mb-6">

                <p
                  className="
                    text-green-400
                    uppercase
                    tracking-[0.25em]
                    text-xs
                    mb-2
                  "
                >
                  SYSTEM STATUS
                </p>

                <h2
                  className="
                    text-2xl
                    font-black
                  "
                >
                  AI Monitoring
                </h2>

              </div>



              <div className="space-y-4">

                {[
                  {
                    title: "AI Engine",
                    value: "Active",
                    color: "text-green-400",
                  },

                  {
                    title: "Voice Intelligence",
                    value: "Ready",
                    color: "text-cyan-400",
                  },

                  {
                    title: "Recruiter Analysis",
                    value: "Running",
                    color: "text-red-400",
                  },

                  {
                    title: "Latency",
                    value: "142ms",
                    color: "text-yellow-400",
                  },
                ].map((item) => (

                  <div
                    key={item.title}

                    className="
                      flex
                      items-center
                      justify-between
                      p-4
                      rounded-2xl
                      bg-[#0b0b0b]
                      border
                      border-white/5
                    "
                  >

                    <span className="text-zinc-400">
                      {item.title}
                    </span>

                    <span
                      className={`
                        font-bold
                        ${item.color}
                      `}
                    >
                      {item.value}
                    </span>

                  </div>

                ))}

              </div>

            </Card>

          </div>

        </div>

      </PageContainer>

    </MainLayout>
  );
}

export default AICopilot;