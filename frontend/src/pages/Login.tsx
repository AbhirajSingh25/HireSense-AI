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


      if (
        response.token
      ) {

        auth.login(

          response.user,

          response.token
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

    } catch (error) {

      console.error(error);

      toast.error(
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
          "
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
          "
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