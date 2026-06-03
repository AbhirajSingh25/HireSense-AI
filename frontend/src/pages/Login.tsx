import {
  useState,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";
import LoadingScreen from "../components/ui/LoadingScreen";
import toast from "react-hot-toast";

import {
  login,
} from "../services/api";

import {
  useAuth,
} from "../context/AuthContext";


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

if (loading) {

  return <LoadingScreen />;
}
  async function handleLogin(
    e: any
  ) {

    e.preventDefault();

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

        response.token ||

        response.access_token;


      const user =

        response.user || {

          email,
        };


      if (token) {

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
          "Login successful"
        );


        navigate(
          "/dashboard"
        );

      } else {

        toast.error(

          response.detail ||

          "Login failed"
        );
      }

    } catch (error: any) {

      console.error(error);


      toast.error(

        error.message ||

        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  }


  return (

    <div
      className="
        min-h-screen
        bg-[#050816]
        flex
        items-center
        justify-center
        px-5
      "
    >

      <form
        onSubmit={handleLogin}
        className="
          w-full
          max-w-md
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-8
          backdrop-blur-xl
          shadow-2xl
        "
      >

        <h1
          className="
            text-4xl
            font-black
            text-white
            mb-3
          "
        >
          HireSense AI
        </h1>


        <p
          className="
            text-gray-400
            mb-8
          "
        >
          AI-powered interview intelligence
        </p>


        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="
            w-full
            p-4
            rounded-2xl
            bg-[#111827]
            border
            border-white/10
            text-white
            mb-5
            outline-none
            focus:border-cyan-400
          "
          required
        />


        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="
            w-full
            p-4
            rounded-2xl
            bg-[#111827]
            border
            border-white/10
            text-white
            mb-6
            outline-none
            focus:border-cyan-400
          "
          required
        />


        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            bg-cyan-400
            hover:bg-cyan-300
            disabled:opacity-50
            text-black
            font-bold
            py-4
            rounded-2xl
            transition-all
            duration-300
          "
        >

          {
            loading

              ? "Signing in..."

              : "Login"
          }

        </button>


        <p
          className="
            text-gray-400
            mt-6
            text-center
          "
        >

          Don't have an account?

          {" "}

          <Link
            to="/signup"
            className="
              text-cyan-400
              hover:text-cyan-300
            "
          >
            Signup
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Login;