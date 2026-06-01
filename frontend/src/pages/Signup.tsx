import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  signup,
} from "../services/api";


function Signup() {

  const navigate =
    useNavigate();


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


  async function handleSignup() {

    try {

      setLoading(true);


      const response =

        await signup(

          username,

          email,

          password
        );


      if (
        response?.token &&
        response?.user
      ) {

        localStorage.setItem(

          "token",

          response.token
        );


        localStorage.setItem(

          "user",

          JSON.stringify(
            response.user
          )
        );


        toast.success(
          "Signup successful"
        );


        navigate(
          "/dashboard"
        );

      } else {

        toast.error(
          "Signup failed"
        );
      }

    } catch (error: any) {

      console.error(error);

      try {

        const parsed =
          JSON.parse(
            error.message
          );

        toast.error(

          parsed.detail ||

          "Signup failed"
        );

      } catch {

        toast.error(

          error.message ||

          "Signup failed"
        );
      }

    } finally {

      setLoading(false);
    }
  }


  return (

    <div
      className="
        min-h-screen
        bg-black
        flex
        items-center
        justify-center
        px-6
      "
    >

      <div
        className="
          w-full
          max-w-xl
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-10
          backdrop-blur-xl
        "
      >

        <h1
          className="
            text-white
            text-5xl
            font-black
            mb-3
          "
        >
          Create Account
        </h1>


        <p
          className="
            text-gray-400
            mb-10
          "
        >
          Start your AI interview journey
        </p>


        <div className="space-y-6">

          <input

            type="text"

            placeholder="Username"

            value={username}

            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }

            className="
              w-full
              p-5
              rounded-2xl
              bg-black
              border
              border-white/10
              text-white
              outline-none
              focus:border-cyan-400
            "
          />


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
              bg-black
              border
              border-white/10
              text-white
              outline-none
              focus:border-cyan-400
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
              bg-black
              border
              border-white/10
              text-white
              outline-none
              focus:border-cyan-400
            "
          />


          <button

            onClick={
              handleSignup
            }

            disabled={loading}

            className="
              w-full
              bg-cyan-400
              hover:bg-cyan-300
              disabled:opacity-50
              text-black
              font-bold
              py-5
              rounded-2xl
              transition-all
              duration-300
            "
          >

            {
              loading

                ? "Creating Account..."

                : "Create Account"
            }

          </button>

        </div>

      </div>

    </div>
  );
}

export default Signup;