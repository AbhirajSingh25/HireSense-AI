function GlowOrb() {

  return (

    <>
      <div
        className="
          fixed
          top-[-200px]
          right-[-100px]
          w-[500px]
          h-[500px]
          rounded-full
          bg-cyan-500/10
          blur-[120px]
          pointer-events-none
          z-0
        "
      />

      <div
        className="
          fixed
          bottom-[-200px]
          left-[-100px]
          w-[400px]
          h-[400px]
          rounded-full
          bg-blue-500/10
          blur-[120px]
          pointer-events-none
          z-0
        "
      />
    </>
  );
}

export default GlowOrb;