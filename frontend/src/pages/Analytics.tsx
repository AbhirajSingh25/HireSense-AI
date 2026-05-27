import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  getHistory,
} from "../services/api";

import {

  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,

} from "recharts";


function Analytics() {

  const [
    data,
    setData,
  ] = useState<any[]>([]);


  useEffect(() => {

    async function loadAnalytics() {

      try {

        const user =
          JSON.parse(

            localStorage.getItem(
              "user"
            ) || "{}"
          );


        const history =
          await getHistory(
            user.id || 1
          );


        const formatted =
          history.map(
            (
              item: any,
              index: number
            ) => ({

              name:
                `#${index + 1}`,

              confidence:
                item.confidence_score,

              communication:
                item.communication_score,
            })
          );


        setData(formatted);

      } catch (error) {

        console.error(error);
      }
    }

    loadAnalytics();

  }, []);


  const avgConfidence =
    data.length

      ? (
          data.reduce(

            (
              acc,
              item
            ) =>

              acc +
              item.confidence,

            0
          ) / data.length
        ).toFixed(1)

      : 0;


  const avgCommunication =
    data.length

      ? (
          data.reduce(

            (
              acc,
              item
            ) =>

              acc +
              item.communication,

            0
          ) / data.length
        ).toFixed(1)

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
              font-bold
              text-white
              mb-3
            "
          >
            Analytics
          </h1>

          <p
            className="
              text-gray-400
            "
          >
            Real interview performance insights
          </p>

        </div>


        <div
          className="
            grid
            grid-cols-1
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
              rounded-2xl
              p-6
            "
          >

            <p
              className="
                text-gray-400
                mb-2
              "
            >
              Total Interviews
            </p>

            <h2
              className="
                text-4xl
                font-bold
                text-cyan-400
              "
            >
              {data.length}
            </h2>

          </div>


          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-2xl
              p-6
            "
          >

            <p
              className="
                text-gray-400
                mb-2
              "
            >
              Avg Confidence
            </p>

            <h2
              className="
                text-4xl
                font-bold
                text-green-400
              "
            >
              {avgConfidence}%
            </h2>

          </div>


          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-2xl
              p-6
            "
          >

            <p
              className="
                text-gray-400
                mb-2
              "
            >
              Avg Communication
            </p>

            <h2
              className="
                text-4xl
                font-bold
                text-pink-400
              "
            >
              {avgCommunication}%
            </h2>

          </div>

        </div>


        <div
          className="
            bg-white/5
            border
            border-white/10
            rounded-2xl
            p-6
          "
        >

          <h2
            className="
              text-2xl
              font-bold
              text-white
              mb-8
            "
          >
            Performance Trend
          </h2>


          <div
            className="
              w-full
              h-100
            "
          >

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart
                data={data}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#333"
                />

                <XAxis
                  dataKey="name"
                  stroke="#aaa"
                />

                <YAxis
                  stroke="#aaa"
                />

                <Tooltip />


                <Line
                  type="monotone"
                  dataKey="confidence"
                  stroke="#22d3ee"
                  strokeWidth={3}
                />


                <Line
                  type="monotone"
                  dataKey="communication"
                  stroke="#4ade80"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default Analytics;