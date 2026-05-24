import type {
  ReactNode,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  Brain,
  FileText,
  History,
  BarChart3,
  Trophy,
  LogOut,
} from "lucide-react";

import {
  useAuth,
} from "../context/AuthContext";


interface MainLayoutProps {

  children: ReactNode;
}


function MainLayout({

  children,

}: MainLayoutProps) {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const {
    logout,
  } = useAuth();


  const menuItems = [

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
      name: "Resume Analyzer",
      icon: FileText,
      path: "/resume-analyzer",
    },

    {
      name: "History",
      icon: History,
      path: "/history",
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
  ];


  return (

    <div
      className="
        min-h-screen
        bg-black
        flex
        text-white
      "
    >

      <aside
        className="
          w-72
          bg-white/5
          border-r
          border-white/10
          flex
          flex-col
          justify-between
          p-6
        "
      >

        <div>

          <div className="mb-12">

            <h1
              className="
                text-4xl
                font-black
                text-cyan-400
              "
            >
              HireSense AI
            </h1>

            <p
              className="
                text-zinc-400
                mt-2
              "
            >
              AI Interview Platform
            </p>

          </div>


          <nav
            className="
              space-y-3
            "
          >

            {
              menuItems.map(
                (
                  item,
                  index
                ) => {

                  const Icon =
                    item.icon;

                  const active =
                    location.pathname ===
                    item.path;


                  return (

                    <Link
                      key={index}
                      to={item.path}
                      className={`
                        flex
                        items-center
                        gap-4
                        px-5
                        py-4
                        rounded-2xl
                        transition-all

                        ${
                          active

                            ? "bg-cyan-400 text-black font-bold"

                            : "hover:bg-white/10 text-zinc-300"
                        }
                      `}
                    >

                      <Icon
                        size={24}
                      />

                      <span
                        className="
                          text-lg
                        "
                      >

                        {item.name}

                      </span>

                    </Link>
                  );
                }
              )
            }

          </nav>

        </div>


        <button
          onClick={() => {

            logout();

            navigate("/login");
          }}
          className="
            flex
            items-center
            gap-4
            px-5
            py-4
            rounded-2xl
            bg-red-500/20
            hover:bg-red-500/30
            text-red-400
            transition-all
          "
        >

          <LogOut
            size={24}
          />

          <span
            className="
              text-lg
              font-semibold
            "
          >
            Logout
          </span>

        </button>

      </aside>


      <main
        className="
          flex-1
          overflow-y-auto
        "
      >

        {children}

      </main>

    </div>
  );
}

export default MainLayout;