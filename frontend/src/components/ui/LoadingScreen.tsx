import {
  motion,
} from "framer-motion";

function LoadingScreen() {

  return (

    <div
      className="
        fixed
        inset-0
        bg-[#030712]
        flex
        items-center
        justify-center
        z-50
      "
    >

      <div
        className="
          flex
          flex-col
          items-center
        "
      >

        <motion.div

          animate={{
            rotate: 360,
          }}

          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}

          className="
            w-24
            h-24
            rounded-full
            border-4
            border-cyan-500/20
            border-t-cyan-400
            mb-8
          "
        />

        <h1
          className="
            text-4xl
            font-black
          "
        >

          HireSense

          <span
            className="
              text-cyan-400
            "
          >
            AI
          </span>

        </h1>

        <p
          className="
            text-zinc-500
            mt-3
          "
        >
          Initializing AI systems...
        </p>

      </div>

    </div>
  );
}

export default LoadingScreen;