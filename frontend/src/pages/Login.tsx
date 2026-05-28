import {
  useState,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  login,
} from "../services/api";


function Login() {

  const navigate =
    useNavigate();

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");


  async function handleLogin(
    e: any
  ) {

    e.preventDefault();

    setError("");

    try {

      const data =
        await login(
          email,
          password
        );

      console.log(data);

      if (
        data.message ===
        "Login successful"
      ) {

        localStorage.setItem(

          "user",

          JSON.stringify(
            data.user
          )
        );

        localStorage.setItem(
          "token",
          data.token
        );

        navigate("/dashboard");

      } else {

        setError(
          "Invalid credentials"
        );
      }

    } catch (error) {

      console.error(error);

      setError(
        "Login failed"
      );
    }
  }


  return (

    <div
      className="
        min-h-screen
        bg-[#020817]
        flex
        items-center
        justify-center
        px-4
      "
    >

      <form
        onSubmit={
          handleLogin
        }
        className="
          bg-[#0f172a]
          border
          border-white/10
          rounded-3xl
          p-10
          w-full
          max-w-md
        "
      >

        <h1
          className="
            text-5xl
            font-black
            text-white
            text-center
            mb-3
          "
        >
          Welcome Back
        </h1>

        <p
          className="
            text-gray-400
            text-center
            mb-10
          "
        >
          Login to HireSense AI
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
            p-5
            rounded-2xl
            bg-gray-200
            mb-5
            outline-none
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
            p-5
            rounded-2xl
            bg-[#020817]
            border
            border-white/10
            text-white
            mb-5
            outline-none
          "
          required
        />


        {error && (

          <p
            className="
              text-red-400
              mb-5
            "
          >
            {error}
          </p>
        )}


        <button
          type="submit"
          className="
            w-full
            bg-cyan-400
            hover:bg-cyan-300
            text-black
            font-bold
            py-5
            rounded-2xl
            transition
          "
        >

          Login

        </button>


        <p
          className="
            text-center
            text-gray-400
            mt-8
          "
        >

          Don't have an account?{" "}

          <Link
            to="/signup"
            className="
              text-cyan-400
              font-semibold
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