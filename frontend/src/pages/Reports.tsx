import MainLayout from "../components/MainLayout";

import PageContainer from "../components/ui/PageContainer";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";

import {
  FileText,
  Brain,
  Trophy,
  Download,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";


function Reports() {

  const reports = [

    {
      company: "Google",
      role: "Software Engineer",
      score: 94,
      status: "Excellent",
    },

    {
      company: "Microsoft",
      role: "Frontend Engineer",
      score: 91,
      status: "Strong",
    },

    {
      company: "Amazon",
      role: "Backend Developer",
      score: 88,
      status: "Recommended",
    },

    {
      company: "OpenAI",
      role: "AI Engineer",
      score: 96,
      status: "Elite",
    },
  ];


  return (

    <MainLayout>

      <PageContainer>

        <PageHeader
          badge="AI REPORT SYSTEM"
          title="Interview Intelligence Reports"
          description="
            Analyze recruiter evaluations,
            AI-generated interview insights,
            communication intelligence,
            and technical performance summaries.
          "
        />



        {/* TOP STATS */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-5
            mb-6
          "
        >

          <Card className="p-6">

            <FileText
              className="
                text-red-400
                mb-5
              "
              size={30}
            />

            <h2
              className="
                text-4xl
                font-black
                mb-2
              "
            >
              24
            </h2>

            <p className="text-zinc-500">
              Reports Generated
            </p>

          </Card>



          <Card className="p-6">

            <Brain
              className="
                text-cyan-400
                mb-5
              "
              size={30}
            />

            <h2
              className="
                text-4xl
                font-black
                mb-2
              "
            >
              91%
            </h2>

            <p className="text-zinc-500">
              AI Accuracy
            </p>

          </Card>



          <Card className="p-6">

            <TrendingUp
              className="
                text-green-400
                mb-5
              "
              size={30}
            />

            <h2
              className="
                text-4xl
                font-black
                mb-2
              "
            >
              +18%
            </h2>

            <p className="text-zinc-500">
              Performance Growth
            </p>

          </Card>



          <Card className="p-6">

            <ShieldCheck
              className="
                text-yellow-400
                mb-5
              "
              size={30}
            />

            <h2
              className="
                text-4xl
                font-black
                mb-2
              "
            >
              Elite
            </h2>

            <p className="text-zinc-500">
              Candidate Tier
            </p>

          </Card>

        </div>



        {/* MAIN */}

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-12
            gap-6
          "
        >

          {/* LEFT */}

          <div
            className="
              xl:col-span-8
            "
          >

            <Card className="p-6">

              <div
                className="
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  md:justify-between
                  gap-4
                  mb-6
                "
              >

                <div>

                  <p
                    className="
                      text-red-400
                      uppercase
                      tracking-[0.25em]
                      text-xs
                      mb-2
                    "
                  >
                    GENERATED REPORTS
                  </p>

                  <h2
                    className="
                      text-3xl
                      font-black
                    "
                  >
                    AI Interview Reports
                  </h2>

                </div>



                <button
                  className="
                    h-12
                    px-5
                    rounded-2xl
                    bg-red-500/10
                    border
                    border-red-500/20
                    hover:bg-red-500/20
                    transition-all
                    duration-300
                    flex
                    items-center
                    gap-3
                    font-semibold
                  "
                >

                  <Download size={18} />

                  Export Reports

                </button>

              </div>



              <div className="space-y-4">

                {reports.map((report) => (

                  <div
                    key={report.company}

                    className="
                      p-5
                      rounded-3xl
                      bg-[#0b0b0b]
                      border
                      border-white/5
                      hover:border-red-500/20
                      transition-all
                      duration-300
                    "
                  >

                    <div
                      className="
                        flex
                        flex-col
                        xl:flex-row
                        xl:items-center
                        xl:justify-between
                        gap-5
                      "
                    >

                      <div>

                        <h3
                          className="
                            text-xl
                            font-black
                            mb-2
                          "
                        >
                          {report.company}
                        </h3>

                        <p
                          className="
                            text-zinc-500
                          "
                        >
                          {report.role}
                        </p>

                      </div>



                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          gap-3
                        "
                      >

                        <div
                          className="
                            px-4
                            py-2
                            rounded-xl
                            bg-green-500/10
                            text-green-400
                            font-bold
                            text-sm
                          "
                        >
                          {report.score}% Score
                        </div>



                        <div
                          className="
                            px-4
                            py-2
                            rounded-xl
                            bg-cyan-500/10
                            text-cyan-400
                            font-bold
                            text-sm
                          "
                        >
                          {report.status}
                        </div>



                        <button
                          className="
                            h-11
                            px-4
                            rounded-xl
                            bg-white/5
                            border
                            border-white/10
                            hover:border-red-500/20
                            transition-all
                            duration-300
                            flex
                            items-center
                            gap-2
                            text-sm
                            font-semibold
                          "
                        >

                          <Sparkles size={16} />

                          View Report

                        </button>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </Card>

          </div>



          {/* RIGHT */}

          <div
            className="
              xl:col-span-4
              space-y-5
            "
          >

            <Card className="p-6">

              <div className="mb-5">

                <p
                  className="
                    text-cyan-400
                    uppercase
                    tracking-[0.25em]
                    text-xs
                    mb-2
                  "
                >
                  AI INSIGHTS
                </p>

                <h2
                  className="
                    text-2xl
                    font-black
                  "
                >
                  Recruiter Intelligence
                </h2>

              </div>



              <div className="space-y-4">

                {[
                  "Strong communication patterns detected",
                  "Excellent recruiter compatibility",
                  "High technical reasoning score",
                  "Behavioral responses highly structured",
                  "Recommended for advanced interviews",
                ].map((item) => (

                  <div
                    key={item}

                    className="
                      p-4
                      rounded-2xl
                      bg-[#0b0b0b]
                      border
                      border-white/5
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <CheckCircle2
                      className="
                        text-green-400
                      "
                      size={18}
                    />

                    <span
                      className="
                        text-sm
                        text-zinc-300
                      "
                    >
                      {item}
                    </span>

                  </div>

                ))}

              </div>

            </Card>



            <Card className="p-6">

              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-6
                "
              >

                <div>

                  <p
                    className="
                      text-yellow-400
                      uppercase
                      tracking-[0.25em]
                      text-xs
                      mb-2
                    "
                  >
                    AI STATUS
                  </p>

                  <h2
                    className="
                      text-2xl
                      font-black
                    "
                  >
                    Report Engine
                  </h2>

                </div>

                <Trophy
                  className="
                    text-yellow-400
                  "
                />

              </div>



              <div
                className="
                  flex
                  items-center
                  justify-center
                "
              >

                <div
                  className="
                    w-40
                    h-40
                    rounded-full
                    border-[12px]
                    border-red-500
                    flex
                    items-center
                    justify-center
                    shadow-[0_0_40px_rgba(255,0,0,0.15)]
                  "
                >

                  <div className="text-center">

                    <h1
                      className="
                        text-4xl
                        font-black
                        mb-1
                      "
                    >
                      LIVE
                    </h1>

                    <p className="text-zinc-500 text-sm">
                      AI Analysis
                    </p>

                  </div>

                </div>

              </div>

            </Card>

          </div>

        </div>

      </PageContainer>

    </MainLayout>
  );
}

export default Reports;