import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  getInterviewSessions,
} from "../services/api";


function Certificate() {

  const [
    sessions,
    setSessions,
  ] = useState<any[]>([]);


  useEffect(() => {

    loadData();

  }, []);


  async function loadData() {

    try {

      const user =
        JSON.parse(
          localStorage.getItem("user") || "{}"
        );


      const data =
        await getInterviewSessions(
          user.id || 1
        );


      setSessions(data);

    } catch (error) {

      console.error(error);
    }
  }


  return (

    <MainLayout>

      <div>

        <h1
          className="
            text-4xl
            font-bold
            text-white
            mb-8
          "
        >
          Certificates
        </h1>


        <div
          className="
            grid
            md:grid-cols-2
            gap-6
          "
        >

          {sessions.map((session) => (

            <div
              key={session.id}
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
                  text-2xl
                  font-bold
                  text-white
                  mb-4
                "
              >
                AI Interview Certificate
              </h2>

              <p
                className="
                  text-gray-300
                  mb-2
                "
              >
                Confidence:
                {" "}
                {session.confidence_score}%
              </p>

              <p
                className="
                  text-gray-300
                "
              >
                Communication:
                {" "}
                {session.communication_score}%
              </p>

            </div>
          ))}

        </div>

      </div>

    </MainLayout>
  );
}

export default Certificate;