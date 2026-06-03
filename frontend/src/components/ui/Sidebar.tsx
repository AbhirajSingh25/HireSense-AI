// frontend/src/components/ui/Sidebar.tsx

import {
  LayoutDashboard,
  Brain,
  Video,
  Mic,
  BarChart3,
  Trophy,
  History,
  FileText,
  LogOut,
} from "lucide-react";

import {
  NavLink,
} from "react-router-dom";

import {
  useAuth,
} from "../../context/AuthContext";


const items = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Mock Interview",
    icon: Brain,
    path: "/mock-interview",
  },
  {
    name: "Live Interview",
    icon: Video,
    path: "/live-interview",
  },
  {
    name: "Speech Analysis",
    icon: Mic,
    path: "/speech-analysis",
  },
  {
    name: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },
  {
    name: "Reports",
    icon: FileText,
    path: "/reports",
  },
  {
    name: "History",
    icon: History,
    path: "/history",
  },
  {
    name: "Leaderboard",
    icon: Trophy,
    path: "/leaderboard",
  },
];


function Sidebar() {

  const auth =
    useAuth();


  return (

    <aside
      className="
        w-full
        lg:w-[300px]
        lg:h-screen
        bg-[#050816]
        border-r
        border-cyan-500/10
        flex
        flex-col
        justify-between
        p-6
        sticky
        top-0
      "
    >

      <div>

        <div className="mb-12">

          <h1
            className="
              text-4xl
              font-black
              tracking-tight
            "
          >

            HireSense

            <span
              className="
                text-cyan-400
              "
            >
              AI
            </span>

          </h1>

          <p
            className="
              text-zinc-500
              mt-2
            "
          >
            AI Interview Platform
          </p>

        </div>


        <div className="space-y-3">

          {items.map((item) => {

            const Icon =
              item.icon;

            return (

              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>

                  `
                  flex
                  items-center
                  gap-4
                  px-5
                  py-4
                  rounded-2xl
                  transition-all
                  duration-300
                  border

                  ${

                    isActive

                    ? `
                      bg-cyan-500/10
                      border-cyan-500/30
                      text-cyan-400
                      shadow-[0_0_30px_rgba(34,211,238,0.15)]
                    `

                    : `
                      border-transparent
                      text-zinc-400
                      hover:bg-white/5
                      hover:text-white
                    `
                  }
                  `
                }
              >

                <Icon size={22} />

                <span
                  className="
                    text-lg
                    font-medium
                  "
                >
                  {item.name}
                </span>

              </NavLink>
            );
          })}

        </div>

      </div>


      <button
        onClick={() => {

          auth.logout();

          window.location.href =
            "/login";
        }}

        className="
          flex
          items-center
          justify-center
          gap-3
          w-full
          py-4
          rounded-2xl
          bg-red-500/10
          border
          border-red-500/20
          text-red-400
          hover:bg-red-500/20
          transition-all
        "
      >

        <LogOut size={20} />

        Logout

      </button>

    </aside>
  );
}

export default Sidebar;