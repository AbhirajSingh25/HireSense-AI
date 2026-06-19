import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

function GlassCard({
  children,
  className = "",
}: Props) {

  return (

    <div
      className={`
        relative
        overflow-hidden
        rounded-[36px]
        border
        border-white/10
        bg-gradient-to-br
        from-white/[0.03]
        to-white/[0.01]
        backdrop-blur-xl
        shadow-[0_0_50px_rgba(255,0,0,0.08)]
        ${className}
      `}
    >

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top,rgba(255,0,0,0.12),transparent_55%)]
          pointer-events-none
        "
      />

      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
}

export default GlassCard;