function VoiceWaveform() {

  const bars = Array.from(
    { length: 40 },
    (_, i) => i
  );

  return (

    <div
      className="
        flex
        items-end
        gap-1
        h-20
      "
    >

      {bars.map((bar) => (

        <div
          key={bar}
          className="
            w-2
            rounded-full
            bg-red-500
            animate-pulse
          "
          style={{
            height: `${20 + Math.random() * 60}px`,
            animationDelay: `${bar * 0.05}s`,
          }}
        />

      ))}

    </div>
  );
}

export default VoiceWaveform;