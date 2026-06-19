import {
  useState,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  login,
} from "../services/api";

import {
  useAuth,
} from "../context/AuthContext";

import LoadingScreen from "../components/ui/LoadingScreen";

import {
  Brain,
  Sparkles,
  ShieldCheck,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";


function Login() {

  const navigate =
    useNavigate();

  const auth =
    useAuth();


  const [
    email,
    setEmail,
  ] = useState("");


  const [
    password,
    setPassword,
  ] = useState("");


  const [
    loading,
    setLoading,
  ] = useState(false);


  async function handleLogin(
    e: React.FormEvent
  ) {

    e.preventDefault();

    if (
      !email ||
      !password
    ) {

      toast.error(
        "Please fill all fields"
      );

      return;
    }

    try {

      setLoading(true);

      const response =
        await login(
          email,
          password
        );

      console.log(
        "LOGIN RESPONSE:",
        response
      );

      const token =

        response?.token ||

        response?.access_token ||

        "demo-token";


      const user =

        response?.user || {

          email,
          username:
            email.split("@")[0],
        };


      if (!token) {

        toast.error(
          "Invalid credentials"
        );

        return;
      }

      auth.login(
        user,
        token
      );

      localStorage.setItem(
        "token",
        token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      toast.success(
        "Login successful 🚀"
      );

      setTimeout(() => {

        window.location.href =
          "/dashboard";

      }, 700);

    } catch (error: any) {

      console.error(error);

      toast.error(

        error?.response?.data?.detail ||

        error?.message ||

        "Login failed"
      );

    } finally {

      setLoading(false);
    }
  }


  if (loading) {

    return <LoadingScreen />;
  }


  return (

    <div
      className="
        min-h-screen
        bg-black
        relative
        overflow-hidden
        flex
        items-center
        justify-center
        px-6
      "
    >

      {/* BACKGROUND */}

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top_left,rgba(255,0,0,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,0,0,0.15),transparent_30%)]
        "
      />

      <div
        className="
          absolute
          top-[-180px]
          left-[-120px]
          w-[420px]
          h-[420px]
          rounded-full
          bg-red-600/20
          blur-[120px]
        "
      />

      <div
        className="
          absolute
          bottom-[-180px]
          right-[-120px]
          w-[420px]
          h-[420px]
          rounded-full
          bg-red-700/20
          blur-[140px]
        "
      />



      {/* CARD */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-[520px]
          rounded-[38px]
          border
          border-red-500/20
          bg-[#070707]/95
          backdrop-blur-2xl
          overflow-hidden
          shadow-[0_0_90px_rgba(255,0,0,0.12)]
        "
      >

        {/* TOP BORDER */}

        <div
          className="
            h-[4px]
            w-full
            bg-gradient-to-r
            from-red-900
            via-red-500
            to-red-900
          "
        />


        <div className="p-10">


          {/* HEADER */}

          <div className="mb-10">

            <div
              className="
                flex
                items-center
                gap-5
                mb-8
              "
            >

              <div
                className="
                  w-20
                  h-20
                  rounded-3xl
                  bg-gradient-to-br
                  from-red-500
                  to-red-900
                  flex
                  items-center
                  justify-center
                  shadow-[0_0_50px_rgba(255,0,0,0.35)]
                "
              >

                <Brain
                  size={38}
                  className="text-white"
                />

              </div>

              <div>

                <h1
                  className="
                    text-6xl
                    font-black
                    text-white
                    tracking-tight
                    leading-none
                  "
                >
                  HireSense
                </h1>

                <p
                  className="
                    text-zinc-500
                    mt-3
                    text-lg
                  "
                >
                  AI Interview Intelligence
                </p>

              </div>

            </div>



            {/* INFO BOX */}

            <div
              className="
                border
                border-red-500/20
                bg-red-500/5
                rounded-3xl
                p-5
                flex
                items-start
                gap-4
              "
            >

              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-red-500/10
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >

                <ShieldCheck
                  className="
                    text-red-400
                  "
                />

              </div>

              <div>

                <h3
                  className="
                    text-white
                    font-semibold
                    mb-1
                  "
                >
                  Enterprise-grade AI platform
                </h3>

                <p
                  className="
                    text-zinc-400
                    text-sm
                    leading-relaxed
                  "
                >
                  Real-time recruiter analytics,
                  live interview intelligence,
                  speech analysis, AI scoring,
                  and advanced hiring insights.
                </p>

              </div>

            </div>

          </div>



          {/* FORM */}

          <form
            onSubmit={handleLogin}
            className="
              space-y-6
            "
          >

            {/* EMAIL */}

            <div>

              <label
                className="
                  block
                  text-zinc-400
                  text-sm
                  mb-3
                  font-medium
                "
              >
                Email Address
              </label>

              <div
                className="
                  relative
                "
              >

                <Mail
                  size={20}
                  className="
                    absolute
                    left-5
                    top-1/2
                    -translate-y-1/2
                    text-zinc-500
                  "
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    h-16
                    rounded-2xl
                    bg-[#111827]
                    border
                    border-white/10
                    pl-14
                    pr-5
                    text-white
                    outline-none
                    transition-all
                    duration-300
                    focus:border-red-500
                    focus:bg-[#161f33]
                    focus:shadow-[0_0_30px_rgba(255,0,0,0.15)]
                  "
                  required
                />

              </div>

            </div>



            {/* PASSWORD */}

            <div>

              <label
                className="
                  block
                  text-zinc-400
                  text-sm
                  mb-3
                  font-medium
                "
              >
                Password
              </label>

              <div
                className="
                  relative
                "
              >

                <Lock
                  size={20}
                  className="
                    absolute
                    left-5
                    top-1/2
                    -translate-y-1/2
                    text-zinc-500
                  "
                />

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    h-16
                    rounded-2xl
                    bg-[#111827]
                    border
                    border-white/10
                    pl-14
                    pr-5
                    text-white
                    outline-none
                    transition-all
                    duration-300
                    focus:border-red-500
                    focus:bg-[#161f33]
                    focus:shadow-[0_0_30px_rgba(255,0,0,0.15)]
                  "
                  required
                />

              </div>

            </div>



            {/* LOGIN BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                h-16
                rounded-2xl
                bg-gradient-to-r
                from-red-700
                via-red-600
                to-red-500
                hover:scale-[1.02]
                active:scale-[0.98]
                transition-all
                duration-300
                font-bold
                text-lg
                shadow-[0_0_40px_rgba(255,0,0,0.25)]
                flex
                items-center
                justify-center
                gap-3
                disabled:opacity-50
              "
            >

              <Sparkles size={20} />

              {
                loading
                  ? "Authenticating..."
                  : "Login to Dashboard"
              }

              <ArrowRight size={18} />

            </button>

          </form>



          {/* FOOTER */}

          <div
            className="
              mt-8
              pt-6
              border-t
              border-white/5
              text-center
            "
          >

            <p
              className="
                text-zinc-500
              "
            >

              Don’t have an account?

              {" "}

              <Link
                to="/signup"
                className="
                  text-red-400
                  hover:text-red-300
                  font-semibold
                  transition-colors
                "
              >
                Create Account
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;