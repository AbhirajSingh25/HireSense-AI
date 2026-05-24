import {
  Sparkles,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import PremiumButton from "./PremiumButton";

function EmptyState({
  title,
  description,
  buttonText,
}: {
  title: string;
  description: string;
  buttonText: string;
}) {

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/4 backdrop-blur-2xl p-10 sm:p-14 text-center"
    >

      <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center">

        <div className="w-20 h-20 rounded-[28px] bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">

          <Sparkles
            size={36}
            className="text-cyan-300"
          />

        </div>

        <h2 className="text-3xl font-bold text-white mt-8">

          {title}

        </h2>

        <p className="text-gray-400 text-lg leading-8 mt-6 max-w-2xl">

          {description}

        </p>

        <PremiumButton className="mt-10">

          {buttonText}

        </PremiumButton>

      </div>

    </motion.div>
  );
}

export default EmptyState;