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


  async function handleSignup() {

    try {

      if (

        !username ||
        !email ||
        !password
      ) {

        toast.error(
          "Please fill all fields"
        );

        return;
      }


      toast.loading(
        "Creating account...",
        {
          id: "signup",
        }
      );


      const data =

        await signup(

          username,
          email,
          password
        );


      if (
        data?.id
      ) {

        toast.success(
          "Signup successful",
          {
            id: "signup",
          }
        );

        navigate("/login");

      } else {

        toast.error(

          typeof data?.message ===
          "string"

            ? data.message

            : "Signup failed",

          {
            id: "signup",
          }
        );
      }

    } catch (error) {

      console.error(error);

      toast.error(
        "Signup failed",
        {
          id: "signup",
        }
      );
    }
  }


  return (

    <div
      className="
        min-h-screen
        bg-black
        text-white
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
        "
      >

        <h1
          className="
            text-5xl
            font-black
            mb-10
          "
        >
          Create Account
        </h1>


        <div
          className="
            space-y-6
          "
        >

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
              bg-black/30
              border
              border-white/10
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
              bg-black/30
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
              bg-black/30
              border
              border-white/10
            "
          />


          <button
            onClick={
              handleSignup
            }
            className="
              w-full
              bg-cyan-400
              hover:bg-cyan-300
              text-black
              font-bold
              py-5
              rounded-2xl
            "
          >

            Sign Up

          </button>

        </div>

      </div>

    </div>
  );
}

export default Signup;