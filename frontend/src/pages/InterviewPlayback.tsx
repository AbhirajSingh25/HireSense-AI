import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {

  PlayCircle,

  Clock3,

  Brain,

  MessageSquare,

} from "lucide-react";

import {
  getInterviewSessions,
} from "../services/api";


function InterviewPlayback() {

  const [
    sessions,
    setSessions,
  ] = useState<any[]>([]);

  const [
    selected,
    setSelected,
  ] = useState<any>(null);


  useEffect(() => {

    loadSessions();

  }, []);


  async function loadSessions() {

    try {

      const data =
        await getInterviewSessions();

      setSessions(data);

      if (data.length > 0) {

        setSelected(data[0]);
      }

    } catch (error) {

      console.error(error);
    }
  }


  function parseData(
    data: any
  ) {

    if (!data) {

      return [];
    }

    if (
      Array.isArray(data)
    ) {

      return data;
    }

    try {

      return JSON.parse(data);

    } catch {

      return [];
    }
  }


  return (

    <MainLayout>

      <div
        className="
          min-h-screen
          text-white
          px-10
          py-12
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
            grid
            xl:grid-cols-3
            gap-10
          "
        >

          <div
            className="
              xl:col-span-1
            "
          >

            <h1
              className="
                text-5xl
                font-bold
                mb-4
              "
            >
              Interview Playback
            </h1>

            <p
              className="
                text-zinc-400
                mb-10
              "
            >
              AI candidate session replay system
            </p>


            <div
              className="
                space-y-5
              "
            >

              {
                sessions.map(
                  (
                    item,
                    index
                  ) => (

                    <button
                      key={index}
                      onClick={() =>
                        setSelected(item)
                      }
                      className="
                        w-full
                        text-left
                        bg-white/5
                        border
                        border-white/10
                        hover:border-cyan-400/30
                        rounded-3xl
                        p-6
                        transition-all
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          mb-4
                        "
                      >

                        <div
                          className="
                            text-2xl
                            font-bold
                          "
                        >

                          Session
                          {" "}
                          {index + 1}

                        </div>

                        <PlayCircle
                          className="
                            text-cyan-400
                          "
                        />

                      </div>


                      <div
                        className="
                          text-zinc-400
                          mb-2
                        "
                      >

                        {item.role}

                      </div>


                      <div
                        className="
                          text-sm
                          text-zinc-500
                        "
                      >

                        {item.level}

                      </div>

                    </button>
                  )
                )
              }

            </div>

          </div>


          <div
            className="
              xl:col-span-2
            "
          >

            {
              selected && (

                <>

                  <div
                    className="
                      grid
                      md:grid-cols-3
                      gap-6
                      mb-10
                    "
                  >

                    <div
                      className="
                        bg-cyan-400/10
                        border
                        border-cyan-400/20
                        rounded-3xl
                        p-6
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                          mb-4
                        "
                      >

                        <Brain
                          className="
                            text-cyan-400
                          "
                        />

                        <div
                          className="
                            text-zinc-400
                          "
                        >
                          Confidence
                        </div>

                      </div>

                      <div
                        className="
                          text-5xl
                          font-bold
                          text-cyan-400
                        "
                      >

                        {
                          selected.final_report
                            .confidence
                        }%

                      </div>

                    </div>


                    <div
                      className="
                        bg-purple-400/10
                        border
                        border-purple-400/20
                        rounded-3xl
                        p-6
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                          mb-4
                        "
                      >

                        <MessageSquare
                          className="
                            text-purple-400
                          "
                        />

                        <div
                          className="
                            text-zinc-400
                          "
                        >
                          Communication
                        </div>

                      </div>

                      <div
                        className="
                          text-5xl
                          font-bold
                          text-purple-400
                        "
                      >

                        {
                          selected.final_report
                            .communication
                        }%

                      </div>

                    </div>


                    <div
                      className="
                        bg-yellow-400/10
                        border
                        border-yellow-400/20
                        rounded-3xl
                        p-6
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                          mb-4
                        "
                      >

                        <Clock3
                          className="
                            text-yellow-400
                          "
                        />

                        <div
                          className="
                            text-zinc-400
                          "
                        >
                          Technical
                        </div>

                      </div>

                      <div
                        className="
                          text-5xl
                          font-bold
                          text-yellow-400
                        "
                      >

                        {
                          selected.final_report
                            .technical
                        }%

                      </div>

                    </div>

                  </div>


                  <div
                    className="
                      bg-white/5
                      border
                      border-white/10
                      rounded-3xl
                      p-8
                    "
                  >

                    <h2
                      className="
                        text-4xl
                        font-bold
                        mb-10
                      "
                    >
                      Session Timeline
                    </h2>


                    <div
                      className="
                        space-y-8
                      "
                    >

                      {
                        parseData(
                          selected.questions
                        ).map(
                          (
                            question: string,
                            idx: number
                          ) => (

                            <div
                              key={idx}
                              className="
                                border-l-2
                                border-cyan-400/30
                                pl-8
                                relative
                              "
                            >

                              <div
                                className="
                                  absolute
                                  -left-[10px]
                                  top-1
                                  w-4
                                  h-4
                                  rounded-full
                                  bg-cyan-400
                                "
                              />


                              <div
                                className="
                                  text-cyan-400
                                  text-sm
                                  mb-2
                                "
                              >

                                Question
                                {" "}
                                {idx + 1}

                              </div>


                              <div
                                className="
                                  text-2xl
                                  font-semibold
                                  mb-5
                                "
                              >

                                {question}

                              </div>


                              <div
                                className="
                                  bg-white/5
                                  border
                                  border-white/10
                                  rounded-2xl
                                  p-5
                                "
                              >

                                <div
                                  className="
                                    text-zinc-400
                                    mb-3
                                  "
                                >
                                  Candidate Response
                                </div>

                                <div
                                  className="
                                    text-zinc-200
                                    leading-8
                                  "
                                >

                                  {
                                    parseData(
                                      selected.answers
                                    )[idx]
                                  }

                                </div>

                              </div>

                            </div>
                          )
                        )
                      }

                    </div>

                  </div>

                </>
              )
            }

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default InterviewPlayback;