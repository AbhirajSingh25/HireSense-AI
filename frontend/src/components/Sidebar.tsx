import {
  NavLink,
} from "react-router-dom";

import {

  LayoutDashboard,

  Mic,

  BarChart3,

  FileText,

  History,

  FileSearch,

  Users,

  Trophy,

  Award,

  Brain,

  PlayCircle,

  ShieldCheck,

  Settings,

} from "lucide-react";


const navItems = [

  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    label: "Mock Interview",
    path: "/mock",
    icon: Mic,
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
    label: "History",
    path: "/history",
    icon: History,
  },

  {
    label: "Resume AI",
    path: "/resume-analyzer",
    icon: FileSearch,
  },

  {
    label: "Recruiter",
    path: "/recruiter",
    icon: Users,
  },

  {
    label: "Recruiter AI",
    path: "/recruiter-insights",
    icon: Brain,
  },

  {
    label: "Playback",
    path: "/playback",
    icon: PlayCircle,
  },

  {
    label: "Leaderboard",
    path: "/leaderboard",
    icon: Trophy,
  },

  {
    label: "Achievements",
    path: "/achievements",
    icon: Award,
  },

  {
    label: "Certificate",
    path: "/certificate",
    icon: ShieldCheck,
  },

  {
    label: "Admin",
    path: "/admin",
    icon: Settings,
  },
];


function Sidebar() {

  return (

    <aside
      className="
        fixed
        left-0
        top-0
        z-50
        w-24
        h-screen
        bg-[#050816]
        border-r
        border-cyan-500/10
        flex
        flex-col
        items-center
        py-6
        overflow-y-auto
        scrollbar-thin
        scrollbar-thumb-cyan-500/30
      "
    >

      <div
        className="
          w-14
          h-14
          rounded-3xl
          bg-cyan-500/10
          border
          border-cyan-400/20
          flex
          items-center
          justify-center
          text-cyan-400
          text-3xl
          font-bold
          mb-8
          shrink-0
        "
      >
        H
      </div>


      <nav
        className="
          flex
          flex-col
          items-center
          gap-4
          pb-8
        "
      >

        {navItems.map(
          (item) => {

            const Icon =
              item.icon;

            return (

              <div
                key={item.path}
                className="
                  relative
                  group
                  shrink-0
                "
              >

                <NavLink
                  to={item.path}
                  className={({

                    isActive,

                  }) => `

                    w-14
                    h-14
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-300

                    ${

                      isActive

                        ? `

                          bg-cyan-400
                          text-black
                          shadow-[0_0_30px_rgba(34,211,238,0.45)]

                        `

                        : `

                          bg-white/5
                          text-zinc-400
                          hover:bg-cyan-500/10
                          hover:text-cyan-300

                        `
                    }
                  `}
                >

                  <Icon
                    size={22}
                  />

                </NavLink>


                <div
                  className="
                    absolute
                    left-20
                    top-1/2
                    -translate-y-1/2
                    whitespace-nowrap
                    px-3
                    py-2
                    rounded-xl
                    bg-zinc-900
                    border
                    border-cyan-400/20
                    text-sm
                    text-white
                    opacity-0
                    pointer-events-none
                    group-hover:opacity-100
                    transition-all
                    duration-200
                  "
                >

                  {item.label}

                </div>

              </div>
            );
          }
        )}

      </nav>

    </aside>
  );
}

export default Sidebar;