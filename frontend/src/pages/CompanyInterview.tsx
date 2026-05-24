import {
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

const companyData: any = {

  Google: {

    focus:
      "DSA + Problem Solving",

    questions: [

      "Explain time complexity of binary search.",

      "Design a scalable search engine.",

      "What is memoization?",

      "Explain distributed systems.",

      "How would you optimize a large-scale application?",
    ],
  },

  Amazon: {

    focus:
      "Leadership Principles",

    questions: [

      "Tell me about a difficult situation you handled.",

      "Explain customer obsession.",

      "Describe ownership experience.",

      "How do you prioritize tasks?",

      "Describe a project failure.",
    ],
  },

  Microsoft: {

    focus:
      "System Design + Collaboration",

    questions: [

      "Design a cloud storage platform.",

      "Explain API versioning.",

      "Describe teamwork challenges.",

      "How does Azure scaling work?",

      "Explain object-oriented design.",
    ],
  },

  TCS: {

    focus:
      "Fundamentals + Communication",

    questions: [

      "Explain DBMS basics.",

      "Difference between C and Java?",

      "Explain SDLC.",

      "What is normalization?",

      "Tell me about yourself.",
    ],
  },

  Infosys: {

    focus:
      "Aptitude + Technical Basics",

    questions: [

      "Explain OOP concepts.",

      "Difference between stack and queue?",

      "What is SDLC?",

      "Explain arrays and linked lists.",

      "Describe teamwork experience.",
    ],
  },

  Deloitte: {

    focus:
      "Business + Analytics",

    questions: [

      "Explain data analytics workflow.",

      "How do you solve business problems?",

      "Describe dashboard creation.",

      "What is data visualization?",

      "How do you communicate technical insights?",
    ],
  },

  "JP Morgan": {

    focus:
      "Finance + Engineering",

    questions: [

      "Explain secure transaction systems.",

      "What is multithreading?",

      "Describe banking software challenges.",

      "Explain REST API security.",

      "How do you handle production bugs?",
    ],
  },
};

function CompanyInterview() {

  const [company, setCompany] =
    useState("Google");

  const selected =
    companyData[company];

  return (
    <MainLayout>

      <div className="min-h-screen bg-[#050816] text-white px-8 py-10">

        <h1 className="text-5xl font-bold text-cyan-400">
          Company Interview Mode
        </h1>

        <p className="text-gray-400 mt-3">
          Practice company-specific AI interviews
        </p>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mt-12">

          <h2 className="text-2xl font-bold text-cyan-400">
            Select Company
          </h2>

          <select
            value={company}
            onChange={(e) =>
              setCompany(
                e.target.value
              )
            }
            className="mt-6 bg-[#0b1120] border border-white/10 rounded-2xl px-6 py-4 outline-none text-white w-full max-w-md"
          >

            {Object.keys(
              companyData
            ).map((item) => (

              <option
                key={item}
                value={item}
              >

                {item}

              </option>

            ))}

          </select>

        </div>

        <div className="bg-white/5 border border-cyan-500/20 rounded-3xl p-8 mt-12">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-3xl font-bold text-cyan-400">

                {company} Interview Focus

              </h2>

              <p className="text-gray-400 mt-3">

                {selected.focus}

              </p>

            </div>

            <div className="px-5 py-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">

              AI Company Mode

            </div>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">

          {selected.questions.map(
            (
              question: string,
              index: number
            ) => (

              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-3xl p-8"
              >

                <div className="flex items-center justify-between">

                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">

                    {index + 1}

                  </div>

                  <div className="px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-300 text-sm">

                    {company}

                  </div>

                </div>

                <p className="text-xl leading-8 mt-8">

                  {question}

                </p>

              </div>

            )
          )}

        </div>

      </div>

    </MainLayout>
  );
}

export default CompanyInterview;