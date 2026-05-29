import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  getInterviewSessions,
} from "../services/api";

import {

  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,

} from "recharts";


function Analytics() {

  const [
    sessions,
    setSessions,
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);


  useEffect(() => {

    fetchAnalytics();

  }, []);


  async function fetchAnalytics() {

    try {

      const user = JSON.parse(

        localStorage.getItem(
          "user"
        ) || "{}"
      );


      const data =

        await getInterviewSessions(
          user.id
        );


      setSessions(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }


  const chartData =
    sessions.map((
      item,
      index
    ) => ({

      name:
        `Interview ${index + 1}`,

      confidence:
        item.confidence_score,

      communication:
        item.communication_score,

      eyeContact:
        item.eye_contact_score,

      wpm:
        item.words_per_minute,
    }));


  const averageConfidence =

    sessions.length

      ? Math.round(

          sessions.reduce(

            (
              acc,
              curr
            ) =>

              acc +
              curr.confidence_score,

            0
          ) / sessions.length
        )

      : 0;


  const averageCommunication =

    sessions.length

      ? Math.round(

          sessions.reduce(

            (
              acc,
              curr
            ) =>

              acc +
              curr.communication_score,

            0
          ) / sessions.length
        )

      : 0;


  return (

    <MainLayout>

      <div
        className="
          max-w-7xl
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
            AI Analytics Dashboard
          </h1>

          <p
            className="
              text-gray-400
            "
          >
            Performance insights and interview intelligence
          </p>

        </div>


        {loading ? (

          <div
            className="
              text-gray-400
            "
          >
            Loading analytics...
          </div>

        ) : (

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
                  bg-white/5
                  border
                  border-white/10
                  rounded-3xl
                  p-6
                "
              >

                <p
                  className="
                    text-gray-400
                    mb-3
                  "
                >
                  Interviews
                </p>

                <h2
                  className="
                    text-5xl
                    font-black
                    text-cyan-400
                  "
                >
                  {
                    sessions.length
                  }
                </h2>

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

                <p
                  className="
                    text-gray-400
                    mb-3
                  "
                >
                  Avg Confidence
                </p>

                <h2
                  className="
                    text-5xl
                    font-black
                    text-green-400
                  "
                >
                  {
                    averageConfidence
                  }%
                </h2>

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

                <p
                  className="
                    text-gray-400
                    mb-3
                  "
                >
                  Avg Communication
                </p>

                <h2
                  className="
                    text-5xl
                    font-black
                    text-orange-400
                  "
                >
                  {
                    averageCommunication
                  }%
                </h2>

              </div>

            </div>


            <div
              className="
                grid
                lg:grid-cols-2
                gap-8
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

                <h2
                  className="
                    text-2xl
                    font-bold
                    mb-6
                  "
                >
                  Confidence Trend
                </h2>

                <div
                  className="
                    h-87.5
                  "
                >

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <LineChart
                      data={chartData}
                    >

                      <CartesianGrid
                        strokeDasharray="3 3"
                      />

                      <XAxis dataKey="name" />

                      <YAxis />

                      <Tooltip />

                      <Line
                        type="monotone"
                        dataKey="confidence"
                        stroke="#22d3ee"
                        strokeWidth={3}
                      />

                    </LineChart>

                  </ResponsiveContainer>

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

                <h2
                  className="
                    text-2xl
                    font-bold
                    mb-6
                  "
                >
                  Communication Metrics
                </h2>

                <div
                  className="
                    h-87.5
                  "
                >

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <BarChart
                      data={chartData}
                    >

                      <CartesianGrid
                        strokeDasharray="3 3"
                      />

                      <XAxis dataKey="name" />

                      <YAxis />

                      <Tooltip />

                      <Bar
                        dataKey="communication"
                        fill="#4ade80"
                      />

                    </BarChart>

                  </ResponsiveContainer>

                </div>

              </div>

            </div>


            <div
              className="
                mt-8
                bg-white/5
                border
                border-white/10
                rounded-3xl
                p-6
              "
            >

              <h2
                className="
                  text-2xl
                  font-bold
                  mb-6
                "
              >
                AI Insights
              </h2>


              <div
                className="
                  space-y-5
                  text-gray-300
                  leading-8
                "
              >

                <p>
                  • Confidence levels are
                  improving across sessions.
                </p>

                <p>
                  • Communication clarity
                  remains consistently strong.
                </p>

                <p>
                  • AI detected improving
                  interview stability and
                  reduced hesitation.
                </p>

                <p>
                  • Candidate shows strong
                  technical articulation
                  potential.
                </p>

              </div>

            </div>

          </>
        )}

      </div>

    </MainLayout>
  );
}

export default Analytics;