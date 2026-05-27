import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  getHistory,
} from "../services/api";


function History() {

  const [
    interviews,
    setInterviews,
  ] = useState<any[]>([]);


  useEffect(() => {

    async function loadHistory() {

      try {

        const user =
          JSON.parse(

            localStorage.getItem(
              "user"
            ) || "{}"
          );


        const data =
          await getHistory(
            user.id || 1
          );


        setInterviews(data);

      } catch (error) {

        console.error(error);
      }
    }

    loadHistory();

  }, []);


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
              font-bold
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
            Your previous interview sessions
          </p>

        </div>


        <div
          className="
            space-y-6
          "
        >

          {interviews.map((item) => (

            <div
              key={item.id}
              className="
                bg-white/5
                border
                border-white/10
                rounded-2xl
                p-6
              "
            >

              <div
                className="
                  flex
                  justify-between
                  items-center
                  mb-4
                "
              >

                <h2
                  className="
                    text-2xl
                    font-semibold
                    text-white
                  "
                >
                  Interview #
                  {item.id}
                </h2>


                <div
                  className="
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
                  mb-6
                "
              >

                <div
                  className="
                    bg-black/30
                    rounded-xl
                    p-4
                  "
                >

                  <p
                    className="
                      text-gray-400
                      text-sm
                      mb-1
                    "
                  >
                    Confidence
                  </p>

                  <h3
                    className="
                      text-2xl
                      font-bold
                      text-cyan-400
                    "
                  >
                    {
                      item.confidence_score
                    }%
                  </h3>

                </div>


                <div
                  className="
                    bg-black/30
                    rounded-xl
                    p-4
                  "
                >

                  <p
                    className="
                      text-gray-400
                      text-sm
                      mb-1
                    "
                  >
                    Communication
                  </p>

                  <h3
                    className="
                      text-2xl
                      font-bold
                      text-green-400
                    "
                  >
                    {
                      item.communication_score
                    }%
                  </h3>

                </div>


                <div
                  className="
                    bg-black/30
                    rounded-xl
                    p-4
                  "
                >

                  <p
                    className="
                      text-gray-400
                      text-sm
                      mb-1
                    "
                  >
                    WPM
                  </p>

                  <h3
                    className="
                      text-2xl
                      font-bold
                      text-orange-400
                    "
                  >
                    {
                      item.words_per_minute
                    }
                  </h3>

                </div>


                <div
                  className="
                    bg-black/30
                    rounded-xl
                    p-4
                  "
                >

                  <p
                    className="
                      text-gray-400
                      text-sm
                      mb-1
                    "
                  >
                    Eye Contact
                  </p>

                  <h3
                    className="
                      text-2xl
                      font-bold
                      text-pink-400
                    "
                  >
                    {
                      item.eye_contact_score
                    }%
                  </h3>

                </div>

              </div>


              <div
                className="
                  bg-black/20
                  rounded-xl
                  p-5
                "
              >

                <p
                  className="
                    text-gray-400
                    text-sm
                    mb-2
                  "
                >
                  Transcript
                </p>

                <p
                  className="
                    text-gray-300
                    leading-7
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
                text-gray-400
                py-20
              "
            >

              No interviews found

            </div>
          )}

        </div>

      </div>

    </MainLayout>
  );
}

export default History;