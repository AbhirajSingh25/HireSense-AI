type Props = {

  badge?: string;

  title: string;

  description?: string;
};


function PageHeader({

  badge,

  title,

  description,

}: Props) {

  return (

    <div
      className="
        mb-12
      "
    >

      {badge && (

        <div
          className="
            inline-flex
            items-center
            px-5
            py-2
            rounded-full
            border
            border-red-500/20
            bg-red-500/5
            text-red-400
            text-xs
            tracking-[0.35em]
            uppercase
            mb-6
          "
        >

          {badge}

        </div>

      )}


      <h1
        className="
          text-5xl
          md:text-6xl
          font-black
          leading-none
          mb-6
        "
      >
        {title}
      </h1>


      {description && (

        <p
          className="
            text-zinc-500
            text-lg
            md:text-xl
            max-w-4xl
            leading-relaxed
          "
        >

          {description}

        </p>

      )}

    </div>
  );
}

export default PageHeader;