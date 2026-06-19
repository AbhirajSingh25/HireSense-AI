function AIOrb() {

  return (

    <div className="relative">

      <div
        className="
          absolute
          inset-0
          rounded-full
          bg-red-500/20
          blur-[60px]
          animate-pulse
        "
      />

      <div
        className="
          relative
          w-44
          h-44
          rounded-full
          border-[10px]
          border-red-500/40
          bg-gradient-to-br
          from-red-500/20
          to-black
          flex
          items-center
          justify-center
          shadow-[0_0_80px_rgba(255,0,0,0.25)]
        "
      >

        <div
          className="
            w-20
            h-20
            rounded-full
            bg-red-500
            animate-pulse
          "
        />

      </div>

    </div>
  );
}

export default AIOrb;