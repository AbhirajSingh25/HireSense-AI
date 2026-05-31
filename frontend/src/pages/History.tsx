import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  getInterviewSessions,
} from "../services/api";

import {

  Brain,
  Clock3,
  Eye,
  MessageSquare,

} from "lucide-react";


function History() {

  const [
    interviews,
    setInterviews,
  ] = useState<any[]>([]);


  useEffect(() => {

    loadHistory();

  }, []);


  async function loadHistory() {

    try {

      const user =
        JSON.parse(
          localStorage.getItem("user") || "{}"
        );


      const data =
        await getInterviewSessions(
          user.id || 1
        );


      setInterviews(data);

    } catch (error) {

      console.error(error);
    }
  }


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
            Interview History
          </h1>

          <p
            className="
              text-gray-400
            "
          >
            Review your previous interview sessions
          </p>

        </div>


        <div
          className="
            grid
            gap-6
          "
        >

          {interviews.map((item) => (

            <div
              key={item.id}
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
                  flex-col
                  lg:flex-row
                  lg:items-center
                  lg:justify-between
                  gap-5
                  mb-6
                "
              >

                <div>

                  <h2
                    className="
                      text-2xl
                      font-bold
                      text-white
                      mb-2
                    "
                  >
                    Interview #
                    {item.id}
                  </h2>

                  <div
                    className="
                      inline-flex
                      px-4
                      py-2
                      rounded-xl
                      bg-cyan-400
                      text-black
                      font-semibold
                    "
                  >

                    {
                      item.attention_status
                    }

                  </div>

                </div>


                <div
                  className="
                    grid
                    grid-cols-2
                    md:grid-cols-4
                    gap-4
                  "
                >

                  <div
                    className="
                      bg-black/20
                      rounded-2xl
                      px-5
                      py-4
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        mb-2
                      "
                    >

                      <Brain
                        size={18}
                        className="
                          text-cyan-400
                        "
                      />

                      <span
                        className="
                          text-gray-400
                          text-sm
                        "
                      >
                        Confidence
                      </span>

                    </div>

                    <h3
                      className="
                        text-2xl
                        font-bold
                        text-white
                      "
                    >
                      {
                        item.confidence_score
                      }%
                    </h3>

                  </div>


                  <div
                    className="
                      bg-black/20
                      rounded-2xl
                      px-5
                      py-4
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        mb-2
                      "
                    >

                      <MessageSquare
                        size={18}
                        className="
                          text-green-400
                        "
                      />

                      <span
                        className="
                          text-gray-400
                          text-sm
                        "
                      >
                        Communication
                      </span>

                    </div>

                    <h3
                      className="
                        text-2xl
                        font-bold
                        text-white
                      "
                    >
                      {
                        item.communication_score
                      }%
                    </h3>

                  </div>


                  <div
                    className="
                      bg-black/20
                      rounded-2xl
                      px-5
                      py-4
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        mb-2
                      "
                    >

                      <Clock3
                        size={18}
                        className="
                          text-orange-400
                        "
                      />

                      <span
                        className="
                          text-gray-400
                          text-sm
                        "
                      >
                        WPM
                      </span>

                    </div>

                    <h3
                      className="
                        text-2xl
                        font-bold
                        text-white
                      "
                    >
                      {
                        item.words_per_minute
                      }
                    </h3>

                  </div>


                  <div
                    className="
                      bg-black/20
                      rounded-2xl
                      px-5
                      py-4
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        mb-2
                      "
                    >

                      <Eye
                        size={18}
                        className="
                          text-pink-400
                        "
                      />

                      <span
                        className="
                          text-gray-400
                          text-sm
                        "
                      >
                        Eye Contact
                      </span>

                    </div>

                    <h3
                      className="
                        text-2xl
                        font-bold
                        text-white
                      "
                    >
                      {
                        item.eye_contact_score
                      }%
                    </h3>

                  </div>

                </div>

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
                    mb-3
                  "
                >
                  Transcript
                </p>

                <p
                  className="
                    text-gray-300
                    leading-8
                  "
                >

                  {
                    item.transcript
                  }

                </p>

              </div>

            </div>
          ))}


          {!interviews.length && (

            <div
              className="
                text-center
                py-20
                text-gray-400
              "
            >

              No interview history found

            </div>
          )}

        </div>

      </div>

    </MainLayout>
  );
}

export default History;