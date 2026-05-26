import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  Brain,
  Trophy,
  Activity,
  Eye,
} from "lucide-react";

import {
  getDashboardStats,
} from "../services/api";

import {
  useAuth,
} from "../context/AuthContext";


function Dashboard() {

  const {
    user,
  } = useAuth();


  const [
    stats,
    setStats,
  ] = useState<any>(null);


  useEffect(() => {

    async function loadStats() {

      if (!user?.id) return;

      try {

        const data =

          await getDashboardStats(
            user.id
          );

        setStats(data);

      } catch (error) {

        console.error(error);
      }
    }

    loadStats();

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
            Dashboard
          </h1>

          <p
            className="
              text-zinc-400
              text-xl
            "
          >
            Real-time AI interview analytics
          </p>

        </div>


        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-8
          "
        >

          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-8
            "
          >

            <Brain
              className="
                text-cyan-400
                mb-6
              "
              size={40}
            />

            <h2
              className="
                text-zinc-400
                mb-3
              "
            >
              Total Interviews
            </h2>

            <div
              className="
                text-5xl
                font-black
              "
            >
              {
                stats?.total_interviews || 0
              }
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

            <Trophy
              className="
                text-yellow-400
                mb-6
              "
              size={40}
            />

            <h2
              className="
                text-zinc-400
                mb-3
              "
            >
              Confidence Score
            </h2>

            <div
              className="
                text-5xl
                font-black
              "
            >
              {
                stats?.avg_confidence || 0
              }
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

            <Activity
              className="
                text-green-400
                mb-6
              "
              size={40}
            />

            <h2
              className="
                text-zinc-400
                mb-3
              "
            >
              Communication
            </h2>

            <div
              className="
                text-5xl
                font-black
              "
            >
              {
                stats?.avg_communication || 0
              }
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

            <Eye
              className="
                text-pink-400
                mb-6
              "
              size={40}
            />

            <h2
              className="
                text-zinc-400
                mb-3
              "
            >
              Eye Contact
            </h2>

            <div
              className="
                text-5xl
                font-black
              "
            >
              {
                stats?.avg_eye_contact || 0
              }
            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default Dashboard;