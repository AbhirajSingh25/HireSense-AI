import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  useAuth,
} from "../context/AuthContext";

import {
  getAnalytics,
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

  const {
    user,
  } = useAuth();


  const [
    analytics,
    setAnalytics,
  ] = useState<any[]>([]);


  useEffect(() => {

    async function loadAnalytics() {

      if (!user?.id) return;

      try {

        const data =

          await getAnalytics(
            user.id
          );

        setAnalytics(data);

      } catch (error) {

        console.error(error);
      }
    }

    loadAnalytics();

  }, [user]);


  return (

    <MainLayout>

      <div
        className="
          min-h-screen
          text-white
          p-10
        "
      >

        <div className="mb-12">

          <h1
            className="
              text-6xl
              font-black
              mb-4
            "
          >
            Analytics
          </h1>

          <p
            className="
              text-zinc-400
              text-xl
            "
          >
            Real interview performance trends
          </p>

        </div>


        <div
          className="
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-10
          "
        >

          <div
            className="
              h-[500px]
            "
          >

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart
                data={analytics}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="session"
                />

                <YAxis />

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

                <Line
                  type="monotone"
                  dataKey="eye_contact"
                  stroke="#f472b6"
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