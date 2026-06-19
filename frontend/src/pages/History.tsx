import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import Card from "../components/ui/Card";

import {
  getInterviewHistory,
} from "../services/api";


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

      const data =
        await getInterviewHistory();

      setInterviews(data);

    } catch (error) {

      console.error(error);
    }
  }


  return (

    <MainLayout>

      <div className="max-w-7xl mx-auto">

        <h1
          className="
            text-6xl
            font-black
            mb-10
          "
        >
          Interview History
        </h1>


        <div className="space-y-6">

          {interviews.map((item, index) => (

            <Card
              key={index}
              className="p-8"
            >

              <div className="flex justify-between">

                <div>

                  <h2
                    className="
                      text-3xl
                      font-bold
                      mb-3
                    "
                  >
                    {item.role}
                  </h2>

                  <p className="text-zinc-500">
                    {item.level}
                  </p>

                </div>


                <div className="text-right">

                  <p
                    className="
                      text-4xl
                      font-black
                      text-red-400
                    "
                  >
                    {

                      item.final_report
                        ?.confidence || 0

                    }%
                  </p>

                  <p className="text-zinc-500">
                    Confidence
                  </p>

                </div>

              </div>

            </Card>
          ))}

        </div>

      </div>

    </MainLayout>
  );
}

export default History;