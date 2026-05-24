import {
  useNavigate,
} from "react-router-dom";

import {
  getUser,
  logoutUser,
} from "../store/authStore";


function Topbar() {

  const navigate =
    useNavigate();

  const user =
    getUser();


  function handleLogout() {

    logoutUser();

    navigate(
      "/login"
    );
  }


  return (

    <div
      className="
        fixed
        top-0
        left-24
        right-0
        h-24
        bg-[#050816]/90
        backdrop-blur-xl
        border-b
        border-cyan-500/10
        flex
        items-center
        justify-between
        px-10
        z-40
      "
    >

      <div>

        <h1
          className="
            text-2xl
            font-bold
            text-white
          "
        >
          HireSense AI
        </h1>

        <div
          className="
            text-zinc-400
            text-sm
            mt-1
          "
        >
          AI Recruitment Intelligence Platform
        </div>

      </div>


      <div
        className="
          flex
          items-center
          gap-6
        "
      >

        <div
          className="
            flex
            items-center
            gap-3
            bg-green-500/10
            border
            border-green-500/20
            px-4
            py-2
            rounded-2xl
          "
        >

          <div
            className="
              w-3
              h-3
              rounded-full
              bg-green-400
            "
          />

          <div
            className="
              text-green-300
              text-sm
              font-medium
            "
          >
            AI Systems Active
          </div>

        </div>


        <div
          className="
            flex
            items-center
            gap-4
          "
        >

          <div
            className="
              text-right
            "
          >

            <div
              className="
                text-white
                font-semibold
              "
            >

              {
                user?.name ||
                "Candidate"
              }

            </div>

            <div
              className="
                text-zinc-400
                text-sm
              "
            >

              {
                user?.email ||
                "user@hiresense.ai"
              }

            </div>

          </div>


          <div
            className="
              w-12
              h-12
              rounded-2xl
              bg-cyan-400
              flex
              items-center
              justify-center
              text-black
              font-bold
              text-lg
            "
          >

            {
              user?.name
                ?.charAt(0)
                ?.toUpperCase()
              || "U"
            }

          </div>


          <button
            onClick={
              handleLogout
            }
            className="
              bg-red-500/10
              hover:bg-red-500/20
              border
              border-red-500/20
              text-red-300
              px-5
              py-3
              rounded-2xl
              transition-all
            "
          >

            Logout

          </button>

        </div>

      </div>

    </div>
  );
}

export default Topbar;