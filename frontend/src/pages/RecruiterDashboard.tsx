import MainLayout from "../components/MainLayout";

import PageContainer from "../components/ui/PageContainer";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import {
  useEffect,
  useState,
} from "react";

import {
  getRecruiterDashboard,
  getRecruiterInsights,
} from "../services/api";
import {
  Users,
  Brain,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  Trophy,
  Search,
  Activity,
  CheckCircle2,
} from "lucide-react";


function RecruiterDashboard() {

  const [
  candidates,
  setCandidates,
] = useState<any[]>([]);
const totalCandidates =
  candidates.length;
const [
  insights,
  setInsights,
] = useState<any>(null);
const averageScore =
  candidates.length
    ? Math.round(
        candidates.reduce(
          (
            sum,
            candidate
          ) =>
            sum +
            candidate.score,
          0
        ) /
          candidates.length
      )
    : 0;

const recommendedCandidates =
  candidates.filter(
    (candidate) =>
      candidate.score >= 70
  ).length;

const topCandidate =
  candidates.length
    ? Math.max(
        ...candidates.map(
          (candidate) =>
            candidate.score
        )
      )
    : 0;
useEffect(() => {

  loadCandidates();

}, []);

async function loadCandidates() {

  try {

    const candidateData =
      await getRecruiterDashboard();

    setCandidates(
      candidateData
    );

    const insightsData =
      await getRecruiterInsights();

    setInsights(
      insightsData
    );

  } catch (error) {

    console.error(error);
  }
}


  return (

    <MainLayout>

      <PageContainer>

        <PageHeader
          badge="RECRUITER AI SYSTEM"
          title="Recruiter Intelligence Dashboard"
          description="
            Analyze candidate performance,
            recruiter compatibility,
            behavioral intelligence,
            technical evaluations,
            and AI-driven hiring signals.
          "
        />



        {/* STATS */}

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

            <Users
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
              {totalCandidates}
            </h2>

            <p className="text-zinc-500">
              Active Candidates
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
              {averageScore}%
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
              {recommendedCandidates}
            </h2>

            <p className="text-zinc-500">
              Recommended
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
              {topCandidate}%
            </h2>

            <p className="text-zinc-500">
              Top Score
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
                    CANDIDATE ANALYSIS
                  </p>

                  <h2
                    className="
                      text-3xl
                      font-black
                    "
                  >
                    AI Candidate Rankings
                  </h2>

                </div>



                <button
                  className="
                    h-12
                    px-5
                    rounded-2xl
                    bg-red-500
                    hover:bg-red-400
                    transition-all
                    duration-300
                    flex
                    items-center
                    gap-3
                    font-bold
                  "
                >

                  <Search size={18} />

                  Search Candidates

                </button>

              </div>



              {/* CANDIDATES */}

              <div className="space-y-4">

                {candidates.map((candidate) => (

                  <div
                    key={candidate.name}

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

                      {/* LEFT */}

                      <div
                        className="
                          flex
                          items-center
                          gap-4
                        "
                      >

                        <div
                          className="
                            w-16
                            h-16
                            rounded-2xl
                            bg-red-500/10
                            flex
                            items-center
                            justify-center
                            text-xl
                            font-black
                            text-red-400
                          "
                        >

                          {candidate.name.charAt(0)}

                        </div>



                        <div>

                          <h3
                            className="
                              text-xl
                              font-black
                              mb-1
                            "
                          >
                            {candidate.name}
                          </h3>

                          <p
                            className="
                              text-zinc-500
                            "
                          >
                            {candidate.role}
                          </p>

                        </div>

                      </div>



                      {/* RIGHT */}

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
                          {candidate.score}% Match
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
                          {candidate.status}
                        </div>



                        <button
                          className="
                            h-12
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
                            font-semibold
                            text-sm
                          "
                        >

                          <Sparkles size={16} />

                          Analyze

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

            {/* AI INSIGHTS */}

            <Card className="p-6">

              <div className="mb-6">

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
                  Hiring Intelligence
                </h2>

              </div>



              <div className="space-y-4">

                <div
                  className="
                    p-4
                    rounded-2xl
                    bg-[#0b0b0b]
                    border
                    border-red-500/10
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      mb-3
                    "
                  >

                    <Brain
                      className="
                        text-red-400
                      "
                    />

                    <h3
                      className="
                        text-lg
                        font-bold
                      "
                    >
                      Technical Intelligence
                    </h3>

                  </div>

                  <p
                    className="
                      text-zinc-500
                      leading-relaxed
                      text-sm
                    "
                  >
                    {
  insights?.technical
}
                  </p>

                </div>



                <div
                  className="
                    p-4
                    rounded-2xl
                    bg-[#0b0b0b]
                    border
                    border-green-500/10
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      mb-3
                    "
                  >

                    <Trophy
                      className="
                        text-green-400
                      "
                    />

                    <h3
                      className="
                        text-lg
                        font-bold
                      "
                    >
                      Recruiter Match
                    </h3>

                  </div>

                  <p
                    className="
                      text-zinc-500
                      leading-relaxed
                      text-sm
                    "
                  >
{
  insights?.communication
}
                  </p>

                </div>



                <div
                  className="
                    p-4
                    rounded-2xl
                    bg-[#0b0b0b]
                    border
                    border-yellow-500/10
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      mb-3
                    "
                  >

                    <Activity
                      className="
                        text-yellow-400
                      "
                    />

                    <h3
                      className="
                        text-lg
                        font-bold
                      "
                    >
                      AI Monitoring
                    </h3>

                  </div>

                  <p
                    className="
                      text-zinc-500
                      leading-relaxed
                      text-sm
                    "
                  >
                    {
  insights?.recommendation
}
                  </p>

                </div>

              </div>

            </Card>



            {/* STATUS */}

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
                      text-green-400
                      uppercase
                      tracking-[0.25em]
                      text-xs
                      mb-2
                    "
                  >
                    AI SYSTEM STATUS
                  </p>

                  <h2
                    className="
                      text-2xl
                      font-black
                    "
                  >
                    Recruiter Engine
                  </h2>

                </div>


                <CheckCircle2
                  className="
                    text-green-400
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
                    border-green-500
                    flex
                    items-center
                    justify-center
                    shadow-[0_0_50px_rgba(34,197,94,0.15)]
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
                      AI Monitoring
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

export default RecruiterDashboard;