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


      const response =
        await fetch(

          `${API_URL}/resume/analyze`,

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


              <div
                className="
                  whitespace-pre-wrap
                  text-zinc-300
                  leading-9
                  text-lg
                "
              >

                {
                  typeof result ===
                  "string"

                    ? result

                    : JSON.stringify(
                        result,
                        null,
                        2
                      )
                }

              </div>

            </div>
          )
        }

      </div>

    </MainLayout>
  );
}

export default ResumeAnalyzer;