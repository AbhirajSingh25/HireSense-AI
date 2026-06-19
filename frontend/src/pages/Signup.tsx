import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  signup,
} from "../services/api";

import {
  useAuth,
} from "../context/AuthContext";

import LoadingScreen from "../components/ui/LoadingScreen";

import {
  Brain,
  Sparkles,
  ShieldCheck,
} from "lucide-react";


function Signup() {

  const navigate =
    useNavigate();

  const auth =
    useAuth();


  const [
    username,
    setUsername,
  ] = useState("");


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


  async function handleSignup(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      const response =
        await signup(
          username,
          email,
          password
        );

      const token =
        response?.token ||
        "demo-token";

      const user =
        response?.user || {

          username,
          email,
        };

      localStorage.setItem(
        "token",
        token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      auth.login(
        user,
        token
      );

      toast.success(
        "Account created successfully 🚀"
      );

      setTimeout(() => {

        navigate("/dashboard");

      }, 800);

    } catch (error: any) {

      console.error(error);

      toast.error(

        error?.message ||

        "Signup failed"
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

      {/* GLOW */}

      <div
        className="
          absolute
          top-[-220px]
          left-[-180px]
          w-[500px]
          h-[500px]
          bg-red-500/20
          blur-[140px]
          rounded-full
        "
      />

      <div
        className="
          absolute
          bottom-[-240px]
          right-[-200px]
          w-[500px]
          h-[500px]
          bg-red-700/20
          blur-[160px]
          rounded-full
        "
      />



      {/* CARD */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-md
          rounded-[36px]
          border
          border-red-500/20
          bg-[#050505]
          p-10
          shadow-[0_0_80px_rgba(255,0,0,0.08)]
        "
      >

        {/* HEADER */}

        <div className="mb-10">

          <div
            className="
              flex
              items-center
              gap-4
              mb-8
            "
          >

            <div
              className="
                w-16
                h-16
                rounded-2xl
                bg-gradient-to-br
                from-red-500
                to-red-900
                flex
                items-center
                justify-center
                shadow-[0_0_40px_rgba(255,0,0,0.4)]
              "
            >

              <Brain size={30} />

            </div>



            <div>

              <h1
                className="
                  text-5xl
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
                  mt-2
                "
              >
                AI Interview Intelligence
              </p>

            </div>

          </div>



          <div
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-red-500/20
              bg-red-500/5
              px-5
              py-4
            "
          >

            <ShieldCheck
              className="
                text-red-400
              "
            />

            <p
              className="
                text-zinc-300
                text-sm
                leading-relaxed
              "
            >
              Create your recruiter-grade AI interview
              profile and unlock realtime intelligence.
            </p>

          </div>

        </div>



        {/* FORM */}

        <form
          onSubmit={handleSignup}
          className="space-y-5"
        >

          {/* USERNAME */}

          <div>

            <label
              className="
                block
                text-zinc-400
                mb-3
                text-sm
              "
            >
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              className="
                w-full
                h-16
                rounded-2xl
                bg-[#0b0b0b]
                border
                border-white/10
                px-5
                text-white
                outline-none
                transition-all
                focus:border-red-500
                focus:shadow-[0_0_25px_rgba(255,0,0,0.15)]
              "
              required
            />

          </div>



          {/* EMAIL */}

          <div>

            <label
              className="
                block
                text-zinc-400
                mb-3
                text-sm
              "
            >
              Email Address
            </label>

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
                bg-[#0b0b0b]
                border
                border-white/10
                px-5
                text-white
                outline-none
                transition-all
                focus:border-red-500
                focus:shadow-[0_0_25px_rgba(255,0,0,0.15)]
              "
              required
            />

          </div>



          {/* PASSWORD */}

          <div>

            <label
              className="
                block
                text-zinc-400
                mb-3
                text-sm
              "
            >
              Password
            </label>

            <input
              type="password"
              placeholder="Create password"
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
                bg-[#0b0b0b]
                border
                border-white/10
                px-5
                text-white
                outline-none
                transition-all
                focus:border-red-500
                focus:shadow-[0_0_25px_rgba(255,0,0,0.15)]
              "
              required
            />

          </div>



          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              h-16
              rounded-2xl
              bg-gradient-to-r
              from-red-600
              to-red-500
              hover:scale-[1.02]
              active:scale-[0.98]
              transition-all
              duration-300
              font-bold
              text-lg
              shadow-[0_0_40px_rgba(255,0,0,0.3)]
              mt-6
            "
          >

            <div
              className="
                flex
                items-center
                justify-center
                gap-3
              "
            >

              <Sparkles size={20} />

              {
                loading
                  ? "Creating Account..."
                  : "Create Account"
              }

            </div>

          </button>

        </form>



        {/* FOOTER */}

        <div
          className="
            mt-8
            text-center
          "
        >

          <p className="text-zinc-500">

            Already have an account?

            {" "}

            <Link
              to="/login"
              className="
                text-red-400
                hover:text-red-300
                font-semibold
              "
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;