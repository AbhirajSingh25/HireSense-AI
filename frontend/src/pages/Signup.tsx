import {
  useState,
} from "react";

import {
  useNavigate,
  Link,
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


  async function handleSignup(
    e: any
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

      console.log(
        response
      );

      toast.success(
        "Account created successfully"
      );

      navigate("/login");

    } catch (error: any) {

      console.error(error);

      toast.error(
        error.message ||
        "Signup failed"
      );

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

      <form
        onSubmit={handleSignup}
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
            mb-3
          "
        >
          Create Account
        </h1>

        <p
          className="
            text-zinc-400
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
            required
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
            required
            className="
              w-full
              p-5
              rounded-2xl
              bg-[#dfe3ec]
              text-black
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
              py-5
              rounded-2xl
            "
          >

            {
              loading
                ? "Creating..."
                : "Create Account"
            }

          </button>

        </div>


        <p
          className="
            text-zinc-400
            mt-8
            text-center
          "
        >

          Already have an account?

          {" "}

          <Link
            to="/login"
            className="
              text-cyan-400
            "
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Signup;