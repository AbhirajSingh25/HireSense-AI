import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  useAuth,
} from "../context/AuthContext";


const API_URL =
  import.meta.env.VITE_API_URL;


function Login() {

  const navigate =
    useNavigate();

  const { login } =
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

    try {

      setLoading(true);

      const response =
        await fetch(

          `${API_URL}/auth/login`,

          {
            method: "POST",

            headers: {

              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              email,
              password,
            }),
          }
        );


      const data =
        await response.json();


      if (!data.success) {

        toast.error(
          data.message ||
          "Login failed"
        );

        return;
      }


      login(
        data.user
      );

      toast.success(
        "Login successful"
      );

      navigate(
        "/dashboard"
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Login failed"
      );

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
        bg-black
        text-white
        px-6
      "
    >

      <form
        onSubmit={
          handleLogin
        }
        className="
          w-full
          max-w-md
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-10
        "
      >

        <h1
          className="
            text-5xl
            font-black
            mb-10
            text-center
          "
        >
          Login
        </h1>


        <div className="space-y-6">

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
              bg-black/40
              border
              border-white/10
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
              p-5
              rounded-2xl
              bg-black/40
              border
              border-white/10
            "
          />


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
              disabled:opacity-50
            "
          >

            {
              loading

                ? "Logging in..."

                : "Login"
            }

          </button>

        </div>

      </form>

    </div>
  );
}

export default Login;