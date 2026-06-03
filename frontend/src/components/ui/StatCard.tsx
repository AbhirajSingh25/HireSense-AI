import {
  LucideIcon,
} from "lucide-react";

interface Props {

  title: string;

  value: string;

  icon: LucideIcon;

  change?: string;
}

function StatCard({

  title,

  value,

  icon: Icon,

  change,
}: Props) {

  return (

    <div
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/5
        bg-gradient-to-b
        from-[#111827]
        to-[#0b1120]
        p-7
        transition-all
        duration-300
        hover:border-cyan-500/30
        hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]
      "
    >

      <div
        className="
          absolute
          top-0
          right-0
          w-40
          h-40
          bg-cyan-500/10
          blur-3xl
        "
      />


      <div
        className="
          relative
          z-10
        "
      >

        <div
          className="
            w-16
            h-16
            rounded-2xl
            bg-cyan-500/10
            border
            border-cyan-500/20
            flex
            items-center
            justify-center
            mb-6
          "
        >

          <Icon
            size={30}
            className="
              text-cyan-400
            "
          />

        </div>


        <p
          className="
            text-zinc-400
            mb-3
            text-lg
          "
        >
          {title}
        </p>


        <h2
          className="
            text-5xl
            font-black
            mb-4
          "
        >
          {value}
        </h2>


        {
          change && (

            <div
              className="
                inline-flex
                items-center
                rounded-full
                bg-cyan-500/10
                border
                border-cyan-500/20
                px-4
                py-2
                text-sm
                font-semibold
                text-cyan-400
              "
            >
              {change}
            </div>
          )
        }

      </div>

    </div>
  );
}

export default StatCard;