import {
  ReactNode,
  useState,
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
  Trophy,
  BarChart3,
  History,
  Menu,
  X,
  LogOut,
  Mic,
  Camera,
} from "lucide-react";

type Props = {
  children: ReactNode;
};

function MainLayout({
  children,
}: Props) {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  const user = JSON.parse(
    localStorage.getItem(
      "user"
    ) || "{}"
  );

  function logout() {

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "token"
    );

    navigate("/login");
  }

  const navItems = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon:
        <LayoutDashboard size={20} />,
    },

    {
      name: "Mock Interview",
      path: "/mock-interview",
      icon:
        <Brain size={20} />,
    },

    {
      name: "History",
      path: "/history",
      icon:
        <History size={20} />,
    },

    {
      name: "Reports",
      path: "/reports",
      icon:
        <FileText size={20} />,
    },

    {
      name: "Speech Analysis",
      path: "/speech-analysis",
      icon:
        <Mic size={20} />,
    },

    {
      name: "Vision Analysis",
      path: "/vision-analysis",
      icon:
        <Camera size={20} />,
    },

    {
      name: "Analytics",
      path: "/analytics",
      icon:
        <BarChart3 size={20} />,
    },

    {
      name: "Leaderboard",
      path: "/leaderboard",
      icon:
        <Trophy size={20} />,
    },
  ];

  return (

    <div
      className="
        min-h-screen
        bg-[#050816]
        text-white
        flex
      "
    >

      {mobileOpen && (

        <div
          className="
            fixed
            inset-0
            bg-black/70
            z-40
            md:hidden
          "
          onClick={() =>
            setMobileOpen(false)
          }
        />
      )}

      <aside
        className={`
          fixed
          md:static
          z-50
          top-0
          left-0
          h-screen
          w-65
          bg-[#0b1120]
          border-r
          border-white/10
          p-6
          transition-all
          duration-300

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >

        <div
          className="
            flex
            items-center
            justify-between
            mb-10
          "
        >

          <div>

            <h1
              className="
                text-2xl
                font-black
                text-cyan-400
              "
            >
              HireSense
            </h1>

            <p
              className="
                text-xs
                text-gray-500
                mt-1
              "
            >
              AI Interview Platform
            </p>

          </div>

          <button
            className="
              md:hidden
            "
            onClick={() =>
              setMobileOpen(false)
            }
          >

            <X size={22} />

          </button>

        </div>

        <div
          className="
            bg-white/5
            border
            border-white/10
            rounded-2xl
            p-4
            mb-8
          "
        >

          <p
            className="
              text-gray-400
              text-sm
            "
          >
            Logged in as
          </p>

          <h3
            className="
              text-lg
              font-bold
              mt-1
            "
          >
            {
              user?.username || "User"
            }
          </h3>

          <p
            className="
              text-xs
              text-gray-500
              mt-1
              break-all
            "
          >
            {
              user?.email || ""
            }
          </p>

        </div>

        <div
          className="
            space-y-3
          "
        >

          {navItems.map((item) => (

            <Link
              key={item.path}
              to={item.path}
              onClick={() =>
                setMobileOpen(false)
              }
              className={`
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                transition-all

                ${
                  location.pathname ===
                  item.path

                    ? `
                      bg-cyan-400
                      text-black
                      font-semibold
                    `

                    : `
                      hover:bg-white/10
                    `
                }
              `}
            >

              {item.icon}

              {item.name}

            </Link>
          ))}

        </div>

        <button
          onClick={logout}
          className="
            absolute
            bottom-6
            left-6
            right-6
            flex
            items-center
            justify-center
            gap-2
            bg-red-500
            hover:bg-red-400
            py-3
            rounded-xl
            font-semibold
            transition-all
          "
        >

          <LogOut size={18} />

          Logout

        </button>

      </aside>

      <main
        className="
          flex-1
          min-h-screen
        "
      >

        <header
          className="
            h-16
            border-b
            border-white/10
            bg-black/20
            backdrop-blur-xl
            flex
            items-center
            justify-between
            px-5
            md:px-8
            sticky
            top-0
            z-30
          "
        >

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            <button
              className="
                md:hidden
              "
              onClick={() =>
                setMobileOpen(true)
              }
            >

              <Menu size={24} />

            </button>

            <h2
              className="
                text-lg
                md:text-2xl
                font-bold
              "
            >
              AI Interview Platform
            </h2>

          </div>

          <div
            className="
              w-10
              h-10
              rounded-full
              bg-cyan-400
              flex
              items-center
              justify-center
              text-black
              font-bold
              uppercase
            "
          >
            {
              user?.username
                ?.charAt(0) || "A"
            }
          </div>

        </header>

        <div
          className="
            p-5
            md:p-8
          "
        >

          {children}

        </div>

      </main>

    </div>
  );
}

export default MainLayout;