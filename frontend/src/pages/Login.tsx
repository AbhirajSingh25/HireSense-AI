import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

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


  async function handleLogin() {

    try {

      const data =
        await login(
          email,
          password
        );


      console.log(data);


      if (
        data?.access_token ||

        data?.token ||

        data?.id
      ) {

        localStorage.setItem(
          "user",
          JSON.stringify(data)
        );

        toast.success(
          "Login successful"
        );

        navigate("/dashboard");

      } else {

        toast.error(
          data?.detail ||

          data?.message ||

          "Login failed"
        );
      }

    } catch (error) {

      console.error(error);

      toast.error(
        "Login failed"
      );
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
        "
      >

        <h1
          className="
            text-white
            text-5xl
            font-black
            mb-10
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
              bg-black
              border
              border-white/10
              text-white
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
            "
          />


          <button
            onClick={
              handleLogin
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

            Login

          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;