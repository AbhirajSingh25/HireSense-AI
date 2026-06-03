import {
  motion,
} from "framer-motion";

function AIOrb() {

  return (

    <div
      className="
        relative
        flex
        items-center
        justify-center
      "
    >

      <motion.div

        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 1, 0.5],
        }}

        transition={{
          duration: 3,
          repeat: Infinity,
        }}

        className="
          absolute
          w-72
          h-72
          rounded-full
          bg-cyan-500/20
          blur-3xl
        "
      />


      <motion.div

        animate={{
          rotate: 360,
        }}

        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}

        className="
          w-48
          h-48
          rounded-full
          border-[6px]
          border-cyan-500/30
          border-t-cyan-400
        "
      />


      <div
        className="
          absolute
          text-6xl
        "
      >
        🤖
      </div>

    </div>
  );
}

export default AIOrb;