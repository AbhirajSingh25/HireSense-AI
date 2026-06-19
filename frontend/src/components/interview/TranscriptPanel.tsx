type Props = {

  transcript: string;
};

function TranscriptPanel({

  transcript,
}: Props) {

  return (

    <div
      className="
        rounded-[32px]
        border
        border-red-500/10
        bg-[#070707]
        p-7
        h-[350px]
        overflow-y-auto
      "
    >

      <div className="mb-6">

        <p
          className="
            text-red-400
            uppercase
            tracking-[0.3em]
            text-xs
            mb-3
          "
        >
          LIVE TRANSCRIPT
        </p>

        <h2
          className="
            text-3xl
            font-black
          "
        >
          Speech Recognition
        </h2>

      </div>


      <div
        className="
          text-zinc-300
          leading-loose
          text-lg
        "
      >

        {
          transcript ||

          "Your real-time interview transcript will appear here as you speak during the AI interview session."
        }

      </div>

    </div>
  );
}

export default TranscriptPanel;