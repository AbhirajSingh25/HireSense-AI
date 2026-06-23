import {
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  FileText,
  Upload,
} from "lucide-react";

import toast from "react-hot-toast";


const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000";


function ResumeAnalyzer() {

  const [
    file,
    setFile,
  ] = useState<File | null>(
    null
  );
const [
  jobDescription,
  setJobDescription,
] = useState("");
const [
  jdResult,
  setJdResult,
] = useState("");
  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    result,
    setResult,
  ] = useState<any>(null);


  async function analyzeResume() {

    if (!file) {

      toast.error(
        "Please upload a resume"
      );

      return;
    }


    try {

      setLoading(true);

      toast.loading(
        "Analyzing resume...",
        {
          id: "resume",
        }
      );


      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );


      const response = await fetch(
  `${API_URL}/api/resume/analyze`,

          {
            method: "POST",

            body: formData,
          }
        );


      if (!response.ok) {

        throw new Error(
          "Resume analysis failed"
        );
      }


      const data =
        await response.json();

      setResult(data);


      toast.success(
        "Resume analyzed successfully",
        {
          id: "resume",
        }
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Resume analysis failed",
        {
          id: "resume",
        }
      );

    } finally {

      setLoading(false);
    }
  }
async function matchJobDescription() {

  if (
    !result?.resume_text
  ) {

    toast.error(
      "Analyze resume first"
    );

    return;
  }

  try {

    const response =
      await fetch(

        `${API_URL}/api/resume/match-jd`,

        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            resume_text:
              result.resume_text,

            job_description:
              jobDescription,
          }),
        }
      );

    const data =
      await response.json();

    setJdResult(
      data.analysis
    );

  } catch (error) {

    console.error(error);

    toast.error(
      "JD Match failed"
    );
  }
}

  return (

    <MainLayout>

      <div
        className="
          min-h-screen
          text-white
          p-10
        "
      >

        <div className="mb-14">

          <h1
            className="
              text-7xl
              font-black
              mb-4
            "
          >
            Resume Analyzer
          </h1>

          <p
            className="
              text-zinc-400
              text-2xl
            "
          >
            AI-powered recruiter resume analysis
          </p>

        </div>


        <div
          className="
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-10
            mb-10
          "
        >

          <div
            className="
              border-2
              border-dashed
              border-cyan-400/30
              rounded-3xl
              p-14
              text-center
            "
          >

            <Upload
              className="
                mx-auto
                mb-6
                text-cyan-400
              "
              size={64}
            />


            <h2
              className="
                text-3xl
                font-bold
                mb-4
              "
            >
              Upload Resume
            </h2>


            <p
              className="
                text-zinc-400
                mb-8
              "
            >
              PDF or DOCX supported
            </p>


            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => {

                if (
                  e.target.files &&
                  e.target.files[0]
                ) {

                  setFile(
                    e.target.files[0]
                  );
                }
              }}
              className="
                mb-8
                block
                mx-auto
              "
            />


            {
              file && (

                <div
                  className="
                    text-cyan-400
                    mb-6
                  "
                >

                  Selected:
                  {" "}
                  {file.name}

                </div>
              )
            }


            <button
              onClick={
                analyzeResume
              }
              disabled={loading}
              className="
                bg-cyan-400
                hover:bg-cyan-300
                text-black
                font-bold
                px-8
                py-4
                rounded-2xl
                disabled:opacity-50
              "
            >

              {
                loading
                  ? "Analyzing..."
                  : "Analyze Resume"
              }

            </button>

          </div>

        </div>


        {
          result && (

            <div
              className="
                bg-white/5
                border
                border-white/10
                rounded-3xl
                p-10
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-4
                  mb-8
                "
              >

                <FileText
                  className="
                    text-cyan-400
                  "
                  size={40}
                />

                <h2
                  className="
                    text-4xl
                    font-bold
                  "
                >
                  Analysis Result
                </h2>

              </div>


              <div className="space-y-8">

  {/* ATS SCORE */}

  <div
  className="
    grid
    md:grid-cols-3
    gap-6
    mb-10
  "
>

  <div
    className="
      p-8
      rounded-3xl
      bg-cyan-500/10
      border
      border-cyan-500/20
    "
  >

    <p className="text-zinc-400 mb-3">
      ATS SCORE
    </p>

    <h1
  className="
    text-7xl
    font-black
    text-cyan-400
    leading-none
  "
>
      {result.ats_score}%
    </h1>

  </div>

  <div
    className="
      p-8
      rounded-3xl
      bg-green-500/10
      border
      border-green-500/20
    "
  >

    <p className="text-zinc-400 mb-3">
      SKILLS FOUND
    </p>

    <h1
  className="
    text-7xl
    font-black
    text-cyan-400
    leading-none
  "
>
      {result.skills?.length}
    </h1>

  </div>

  <div
    className="
      p-8
      rounded-3xl
      bg-red-500/10
      border
      border-red-500/20
    "
  >

    <p className="text-zinc-400 mb-3">
      MISSING SKILLS
    </p>

    <h1
  className="
    text-7xl
    font-black
    text-red-400
    leading-none
  "
>
      {result.missing_skills?.length}
    </h1>

  </div>

</div>



  {/* SKILLS */}

  <div>

    <h3
      className="
        text-2xl
        font-bold
        mb-4
      "
    >
      Skills Found
    </h3>

    <div
      className="
        flex
        flex-wrap
        gap-3
      "
    >

      {result.skills?.map(
        (skill: string) => (

          <span
            key={skill}
            className="
              px-4
              py-2
              rounded-xl
              bg-green-500/10
              border
              border-green-500/20
              text-green-400
            "
          >
            {skill}
          </span>

        )
      )}

    </div>

  </div>



  {/* MISSING */}

  <div>

    <h3
      className="
        text-2xl
        font-bold
        mb-4
      "
    >
      Missing Skills
    </h3>

    <div
      className="
        flex
        flex-wrap
        gap-3
      "
    >

      {result.missing_skills?.map(
        (skill: string) => (

          <span
            key={skill}
            className="
              px-4
              py-2
              rounded-xl
              bg-red-500/10
              border
              border-red-500/20
              text-red-400
            "
          >
            {skill}
          </span>

        )
      )}

    </div>

  </div>



  {/* SUGGESTIONS */}

  {/* AI RECRUITER REVIEW */}
<div
  className="
    mt-10
    p-8
    rounded-3xl
    bg-white/5
    border
    border-white/10
  "
>

  <h2
    className="
      text-3xl
      font-black
      mb-6
    "
  >
    Job Description Matcher
  </h2>

  <textarea
    value={jobDescription}
    onChange={(e) =>
      setJobDescription(
        e.target.value
      )
    }
    placeholder="
Paste Job Description Here
"
    className="
      w-full
      h-48
      bg-black/40
      border
      border-zinc-800
      rounded-2xl
      p-4
      mb-6
    "
  />

  <button
    onClick={
      matchJobDescription
    }
    className="
      bg-red-500
      hover:bg-red-400
      px-8
      py-3
      rounded-2xl
      font-bold
    "
  >
    Match Resume
  </button>

  {jdResult && (

    <div
      className="
        mt-8
        whitespace-pre-wrap
        text-zinc-300
        leading-8
      "
    >
      {jdResult}
    </div>

  )}

</div>
{/* AI INSIGHTS */}

<div className="mt-10">

  <h2
    className="
      text-4xl
      font-black
      mb-8
    "
  >
    Recruiter Insights
  </h2>

  <div
    className="
      grid
      lg:grid-cols-3
      gap-6
      mb-8
    "
  >

    {/* READINESS */}

    <div
      className="
        rounded-3xl
        p-8
        bg-cyan-500/10
        border
        border-cyan-500/20
      "
    >

      <p className="text-zinc-400 mb-3">
        INTERVIEW READINESS
      </p>

      <h1
  className="
    text-7xl
    font-black
    text-cyan-400
    leading-none
  "
>
        {result.readiness}%
      </h1>

    </div>

    {/* VERDICT */}

    <div
      className="
        rounded-3xl
        p-8
        bg-green-500/10
        border
        border-green-500/20
      "
    >

      <p className="text-zinc-400 mb-3">
        RECRUITER VERDICT
      </p>

      <h2
        className="
          text-2xl
          font-bold
          text-green-400
        "
      >
        {result.verdict}
      </h2>

    </div>

    {/* RECOMMENDED ROLES */}

    <div
      className="
        rounded-3xl
        p-8
        bg-purple-500/10
        border
        border-purple-500/20
      "
    >

      <p className="text-zinc-400 mb-3">
        RECOMMENDED ROLES
      </p>

      <p
        className="
          text-purple-400
          font-semibold
        "
      >
        {result.recommended_roles?.length}
        {" "}Roles
      </p>

    </div>

  </div>



  {/* STRENGTHS */}

  <div className="mb-10">

    <h3
      className="
        text-3xl
        font-bold
        mb-6
      "
    >
      Strengths
    </h3>

    <div
  className="
    grid
    md:grid-cols-2
    gap-4
  "
>

      {result.strengths?.map(
        (
          item: string,
          index: number
        ) => (

          <div
            key={index}
            className="
              p-5
              rounded-2xl
              bg-green-500/10
              border
              border-green-500/20
            "
          >

            <p
              className="
                text-green-400
                font-medium
              "
            >
              ✓ {item}
            </p>

          </div>

        )
      )}

    </div>

  </div>



  {/* WEAKNESSES */}

  <div className="mb-10">

    <h3
      className="
        text-3xl
        font-bold
        mb-6
      "
    >
      Areas To Improve
    </h3>

    <div
  className="
    grid
    md:grid-cols-2
    gap-4
  "
>

      {result.weaknesses?.map(
        (
          item: string,
          index: number
        ) => (

          <div
            key={index}
            className="
              p-5
              rounded-2xl
              bg-red-500/10
              border
              border-red-500/20
            "
          >

            <p
              className="
                text-red-400
                font-medium
              "
            >
              ⚠ {item}
            </p>

          </div>

        )
      )}

    </div>

  </div>



  {/* RECOMMENDED ROLES */}

  <div>

    <h3
      className="
        text-3xl
        font-bold
        mb-6
      "
    >
      Recommended Roles
    </h3>

    <div
      className="
        flex
        flex-wrap
        gap-4
      "
    >

      {result.recommended_roles?.map(
        (
          role: string,
          index: number
        ) => (

          <div
            key={index}
            className="
              px-5
              py-3
              rounded-2xl
              bg-red-500/10
border-red-500/20
text-red-400
              font-semibold
            "
          >
            {role}
          </div>

        )
      )}

    </div>

  </div>

</div>

</div>

            </div>
          )
        }

      </div>

    </MainLayout>
  );
}

export default ResumeAnalyzer;