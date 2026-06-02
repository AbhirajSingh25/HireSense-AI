import {
  LayoutDashboard,
  Mic,
  Camera,
  BarChart3,
  Trophy,
  FileText,
  History,
  LogOut,
} from "lucide-react";

import {
  Link,
  useLocation,
} from "react-router-dom";

const items = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Mock Interview",
    icon: Mic,
    path: "/mock-interview",
  },
  {
    name: "Vision Analysis",
    icon: Camera,
    path: "/vision-analysis",
  },
  {
    name: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },
  {
    name: "Leaderboard",
    icon: Trophy,
    path: "/leaderboard",
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
];

function Sidebar() {
  const location =
    useLocation();

  return (
    <div
      className="
        w-[280px]
        min-h-screen
        bg-black
        border-r
        border-white/5
        flex
        flex-col
        justify-between
        px-5
        py-6
      "
    >
      <div>
        <div className="mb-10">
          <h1
            className="
              text-3xl
              font-black
              text-white
            "
          >
            HireSense
            <span className="text-cyan-400">
              AI
            </span>
          </h1>

          <p className="text-zinc-500 text-sm">
            AI Interview Platform
          </p>
        </div>

        <div className="space-y-2">
          {items.map((item) => {
            const Icon =
              item.icon;

            const active =
              location.pathname ===
              item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex
                  items-center
                  gap-4
                  px-5
                  py-4
                  rounded-2xl
                  transition-all
                  duration-300
                  ${
                    active
                      ? "bg-cyan-400 text-black font-bold"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <Icon size={20} />

                <span>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <button
        className="
          w-full
          bg-red-500
          hover:bg-red-400
          py-4
          rounded-2xl
          font-bold
          flex
          items-center
          justify-center
          gap-2
          transition-all
        "
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}

export default Sidebar;