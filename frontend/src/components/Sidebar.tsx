import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  Mic,
  BarChart3,
  FileText,
  Trophy,
  Users,
  Brain,
  PlayCircle,
  Settings,
  LogOut,
} from "lucide-react";


const navItems = [

  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
{
  label: "Resume Analyzer",
  path: "/resume-analyzer",
  icon: FileText,
},
  {
    label: "Live Interview",
    path: "/live-interview",
    icon: Mic,
  },

  {
    label: "Practice",
    path: "/practice",
    icon: PlayCircle,
  },

  {
    label: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },

  {
    label: "Reports",
    path: "/reports",
    icon: FileText,
  },

  {
    label: "Leaderboard",
    path: "/leaderboard",
    icon: Trophy,
  },

  {
    label: "Recruiter",
    path: "/recruiter",
    icon: Users,
  },

  {
    label: "AI Copilot",
    path: "/copilot",
    icon: Brain,
  },

  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];


function Sidebar() {

  const navigate =
    useNavigate();


  function handleLogout() {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/login");
  }


  return (

    <aside
  className="
    w-[250px]
    min-h-screen
    bg-[#050505]
    border-r
    border-white/5
    flex
    flex-col
    sticky
    top-0
  "
>

      {/* TOP */}

      <div className="flex-1">

        {/* LOGO */}

        <div
          className="
            px-5
            py-6
            border-b
            border-white/5
          "
        >

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            <div
              className="
                w-14
                h-14
                rounded-3xl
                bg-gradient-to-br
                from-red-500
                to-red-900
                flex
                items-center
                justify-center
                text-white
                font-black
                text-2xl
                shadow-[0_0_30px_rgba(255,0,0,0.35)]
              "
            >
              H
            </div>



            <div>

              <h1
                className="
                  text-2xl
                  font-black
                  text-white
                  leading-none
                "
              >
                HireSense
              </h1>

              <p
                className="
                  text-zinc-500
                  mt-1
                "
              >
                AI Interview OS
              </p>

            </div>

          </div>

        </div>



        {/* NAVIGATION */}

        <div
          className="
            flex-1
            px-4
            py-6
          "
        >

          <nav className="space-y-2">

            {navItems.map((item) => {

              const Icon =
                item.icon;

              return (

                <NavLink
                  key={item.path}

                  to={item.path}

                  className={({

                    isActive,

                  }) => `

                    flex
                    items-center
                    gap-3
                    px-4
                    h-12
                    rounded-2xl
                    transition-all
                    duration-300
                    font-semibold

                    ${
                      isActive

                        ? `
                          bg-red-500/10
                          border
                          border-red-500/20
                          text-white
                        `

                        : `
                          text-zinc-500
                          hover:bg-white/5
                          hover:text-white
                        `
                    }
                  `}
                >

                  <Icon size={20} />

                  <span>
                    {item.label}
                  </span>

                </NavLink>

              );
            })}

          </nav>

        </div>

      </div>



      {/* LOGOUT */}

      <div
        className="
          p-4
          border-t
          border-white/5
        "
      >

        <button
          onClick={handleLogout}

          className="
            w-full
            h-12
            rounded-2xl
            bg-white/5
            hover:bg-red-500/10
            border
            border-white/10
            hover:border-red-500/20
            transition-all
            duration-300
            flex
            items-center
            gap-4
            px-5
            text-zinc-400
            hover:text-white
            font-semibold
          "
        >

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;