import { motion } from "framer-motion";

interface Props {

  children: React.ReactNode;

  className?: string;
}

function Card({

  children,

  className = "",
}: Props) {

  return (

    <motion.div

      whileHover={{
        y: -4,
      }}

      transition={{
        duration: 0.25,
      }}

      className={`
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/5
        bg-gradient-to-b
        from-[#0f172a]
        to-[#020617]
        backdrop-blur-xl
        shadow-[0_0_40px_rgba(0,0,0,0.4)]
        ${className}
      `}
    >

      <div
        className="
          absolute
          top-0
          left-0
          w-full
          h-full
          bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_60%)]
          pointer-events-none
        "
      />

      <div className="relative z-10">

        {children}

      </div>

    </motion.div>
  );
}

export default Card;