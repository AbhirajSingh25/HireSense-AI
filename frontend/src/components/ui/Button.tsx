import { ButtonHTMLAttributes } from "react";

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function Button({
  children,
  className = "",
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={`
        px-6
        py-3
        rounded-2xl
        bg-cyan-400
        hover:bg-cyan-300
        text-black
        font-bold
        transition-all
        duration-300
        hover:scale-[1.02]
        active:scale-[0.98]
        shadow-lg
        shadow-cyan-500/20
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;