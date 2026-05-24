import {

  ResponsiveContainer,

  LineChart,

  Line,

  XAxis,

  YAxis,

  Tooltip,

  CartesianGrid,

} from "recharts";


const data = [

  {
    day: "Mon",
    score: 68,
  },

  {
    day: "Tue",
    score: 74,
  },

  {
    day: "Wed",
    score: 79,
  },

  {
    day: "Thu",
    score: 82,
  },

  {
    day: "Fri",
    score: 88,
  },

  {
    day: "Sat",
    score: 91,
  },

  {
    day: "Sun",
    score: 92,
  },
];


function PerformanceChart() {

  return (

    <div
      className="
        bg-white/5
        border
        border-white/10
        rounded-3xl
        p-8
        h-[420px]
      "
    >

      <h2
        className="
          text-3xl
          font-bold
          text-white
          mb-8
        "
      >

        Weekly Performance

      </h2>


      <ResponsiveContainer
        width="100%"
        height="80%"
      >

        <LineChart
          data={data}
        >

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#222"
          />

          <XAxis
            dataKey="day"
            stroke="#888"
          />

          <YAxis
            stroke="#888"
          />

          <Tooltip />

          <Line

            type="monotone"

            dataKey="score"

            stroke="#22d3ee"

            strokeWidth={4}

            dot={{
              r: 6,
            }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default PerformanceChart;