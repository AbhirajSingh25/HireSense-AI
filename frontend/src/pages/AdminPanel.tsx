import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  getInterviewSessions,
} from "../services/api";


function AdminPanel() {

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
          Admin Panel
        </h1>


        <div
          className="
            grid
            gap-5
          "
        >

          {sessions.map((session) => (

            <div
              key={session.id}
              className="
                bg-white/5
                border
                border-white/10
                rounded-2xl
                p-5
              "
            >

              <h2
                className="
                  text-2xl
                  text-white
                  font-semibold
                  mb-2
                "
              >
                Interview #{session.id}
              </h2>

              <p
                className="
                  text-gray-400
                "
              >
                Confidence:
                {" "}
                {session.confidence_score}%
              </p>

            </div>
          ))}

        </div>

      </div>

    </MainLayout>
  );
}

export default AdminPanel;