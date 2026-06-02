import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

function Card({
  children,
  className = "",
}: Props) {

  return (

    <div
      className={`
        bg-[#101010]
        border
        border-white/5
        rounded-3xl
        shadow-2xl
        backdrop-blur-xl
        ${className}
      `}
    >

      {children}

    </div>
  );
}

export default Card;