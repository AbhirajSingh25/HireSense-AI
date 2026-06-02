import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string;
  icon: LucideIcon;
  color?: string;
}

function StatCard({
  title,
  value,
  icon: Icon,
  color = "cyan",
}: Props) {

  return (

    <div
      className="
        bg-[#101010]
        border
        border-white/5
        rounded-3xl
        p-6
      "
    >

      <div
        className={`
          w-14
          h-14
          rounded-2xl
          bg-${color}-400/20
          flex
          items-center
          justify-center
          mb-6
        `}
      >

        <Icon
          size={28}
          className={`
            text-${color}-400
          `}
        />

      </div>


      <p
        className="
          text-zinc-400
          text-sm
          mb-2
        "
      >
        {title}
      </p>


      <h2
        className="
          text-5xl
          font-black
          text-white
        "
      >
        {value}
      </h2>

    </div>
  );
}

export default StatCard;