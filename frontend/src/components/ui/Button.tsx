import {
  motion,
} from "framer-motion";

interface Props {

  children: React.ReactNode;

  onClick?: () => void;

  className?: string;
}

function Button({

  children,

  onClick,

  className = "",
}: Props) {

  return (

    <motion.button

      whileHover={{
        scale: 1.03,
      }}

      whileTap={{
        scale: 0.98,
      }}

      onClick={onClick}

      className={`
        relative
        overflow-hidden
        px-7
        py-4
        rounded-2xl
        bg-cyan-500
        text-black
        font-bold
        flex
        items-center
        justify-center
        gap-3
        shadow-[0_0_30px_rgba(34,211,238,0.35)]
        transition-all
        duration-300
        hover:shadow-[0_0_50px_rgba(34,211,238,0.5)]
        ${className}
      `}
    >

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-white/20
          to-transparent
          opacity-0
          hover:opacity-100
          transition-all
        "
      />

      <span className="relative z-10">

        {children}

      </span>

    </motion.button>
  );
}

export default Button;