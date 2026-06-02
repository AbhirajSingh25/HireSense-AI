interface Props {
  title: string;
  subtitle?: string;
}

function PageHeader({
  title,
  subtitle,
}: Props) {

  return (

    <div className="mb-10">

      <h1
        className="
          text-6xl
          font-black
          text-white
          leading-tight
        "
      >
        {title}
      </h1>

      {subtitle && (

        <p
          className="
            text-zinc-500
            text-lg
            mt-3
          "
        >
          {subtitle}
        </p>

      )}

    </div>
  );
}

export default PageHeader;