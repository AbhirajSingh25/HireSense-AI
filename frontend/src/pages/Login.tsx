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
    loading,
    setLoading,
  ] = useState(false);


  const [
    error,
    setError,
  ] = useState("");


  async function handleLogin(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setLoading(true);

    setError("");


    try {

      const data =
        await login(
          email,
          password
        );


      if (
        data?.id
      ) {

        localStorage.setItem(

          "user",

          JSON.stringify(data)
        );


        navigate(
          "/dashboard"
        );

      } else {

        setError(
          "Invalid credentials"
        );
      }

    } catch (err) {

      setError(
        "Login failed"
      );

      console.error(err);

    } finally {

      setLoading(false);
    }
  }


  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-[#050816]
        px-6
      "
    >

      <div
        className="
          w-full
          max-w-md
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-8
          backdrop-blur-xl
        "
      >

        <h1
          className="
            text-4xl
            font-black
            text-white
            mb-3
            text-center
          "
        >
          Welcome Back
        </h1>


        <p
          className="
            text-gray-400
            text-center
            mb-8
          "
        >
          Login to HireSense AI
        </p>


        <form
          onSubmit={handleLogin}
          className="
            space-y-5
          "
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
            className="
              w-full
              p-4
              rounded-2xl
              bg-black/30
              border
              border-white/10
              text-white
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
            required
            className="
              w-full
              p-4
              rounded-2xl
              bg-black/30
              border
              border-white/10
              text-white
              outline-none
            "
          />


          {error && (

            <div
              className="
                text-red-400
                text-sm
              "
            >
              {error}
            </div>
          )}


          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-cyan-400
              hover:bg-cyan-300
              text-black
              font-bold
              py-4
              rounded-2xl
              transition-all
            "
          >

            {loading

              ? "Logging in..."

              : "Login"}
          </button>

        </form>


        <p
          className="
            text-gray-400
            text-center
            mt-6
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

      </div>

    </div>
  );
}

export default Login;