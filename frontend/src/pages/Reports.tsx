import MainLayout from "../components/MainLayout";

import Card from "../components/ui/Card";

import Button from "../components/ui/Button";

import {
  FileText,
  Download,
} from "lucide-react";

import {
  exportInterviewReport,
} from "../utils/exportReport";


function Reports() {

  const report = {

    confidence: 92,

    communication: 89,

    technical: 95,

    recommendation:
      "Highly Recommended",

    summary:
      "Candidate demonstrated excellent communication and strong technical depth during the AI interview session.",

    strengths: [

      "Excellent React knowledge",

      "Strong confidence",

      "Clear communication",

      "Good project explanation",
    ],

    improvements: [

      "Improve backend scalability knowledge",

      "Add more system design examples",
    ],
  };


  return (

    <MainLayout>

      <div className="mb-10">

        <h1
          className="
            text-6xl
            font-black
            mb-4
          "
        >
          AI Reports
        </h1>

        <p
          className="
            text-zinc-400
            text-xl
          "
        >
          Download recruiter-grade interview reports
        </p>

      </div>


      <Card className="p-10">

        <div
          className="
            flex
            items-center
            justify-between
            mb-10
          "
        >

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-cyan-500/10
                border
                border-cyan-500/20
                flex
                items-center
                justify-center
              "
            >

              <FileText
                size={40}
                className="
                  text-cyan-400
                "
              />

            </div>


            <div>

              <h2
                className="
                  text-3xl
                  font-bold
                  mb-2
                "
              >
                Frontend Developer Report
              </h2>

              <p
                className="
                  text-zinc-500
                "
              >
                AI-generated recruiter evaluation
              </p>

            </div>

          </div>


          <Button
            onClick={() =>
              exportInterviewReport(
                report
              )
            }
          >

            <Download size={20} />

            Download PDF

          </Button>

        </div>


        <div
          className="
            grid
            md:grid-cols-3
            gap-6
            mb-8
          "
        >

          {[
            {
              title:
                "Confidence",

              value:
                "92%",
            },

            {
              title:
                "Communication",

              value:
                "89%",
            },

            {
              title:
                "Technical",

              value:
                "95%",
            },
          ].map((item) => (

            <div
              key={item.title}
              className="
                p-6
                rounded-3xl
                bg-black/20
                border
                border-white/5
              "
            >

              <p
                className="
                  text-zinc-400
                  mb-3
                "
              >
                {item.title}
              </p>

              <h2
                className="
                  text-5xl
                  font-black
                  text-cyan-400
                "
              >
                {item.value}
              </h2>

            </div>
          ))}

        </div>


        <div
          className="
            p-8
            rounded-3xl
            bg-black/20
            border
            border-white/5
          "
        >

          <h2
            className="
              text-3xl
              font-bold
              mb-5
            "
          >
            AI Summary
          </h2>

          <p
            className="
              text-zinc-300
              leading-loose
              text-lg
            "
          >
            {report.summary}
          </p>

        </div>

      </Card>

    </MainLayout>
  );
}

export default Reports;