import MainLayout from "../components/MainLayout";

import PageLayout from "../components/PageLayout";

function Profile() {

  const history =
    JSON.parse(
      localStorage.getItem(
        "hiresense-history"
      ) || "[]"
    );

  const totalInterviews =
    history.length;

  const averageConfidence =
    totalInterviews > 0
      ? Math.round(
          history.reduce(
            (
              acc: number,
              item: any
            ) =>
              acc +
              item.confidence,
            0
          ) / totalInterviews
        )
      : 0;

  const bestScore =
    totalInterviews > 0
      ? Math.max(
          ...history.map(
            (item: any) =>
              item.confidence
          )
        )
      : 0;

  return (
    <MainLayout>

      <PageLayout
        title="Profile"
        subtitle="Candidate overview and AI interview performance summary"
      >

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-10">

            <div className="flex items-center gap-6 flex-wrap">

              <div className="w-28 h-28 rounded-[28px] bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-5xl font-bold">

                A

              </div>

              <div>

                <h2 className="text-4xl font-bold text-white">

                  Abhiraj Singh

                </h2>

                <p className="text-gray-400 mt-3 text-lg">

                  AI Interview Candidate

                </p>

                <div className="inline-flex mt-6 px-5 py-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-semibold">

                  Advanced Candidate

                </div>

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">

              <div className="rounded-2xl bg-white/5 border border-white/5 p-6">

                <p className="text-gray-400">
                  Interviews
                </p>

                <h3 className="text-4xl font-bold text-cyan-400 mt-4">

                  {totalInterviews}

                </h3>

              </div>

              <div className="rounded-2xl bg-white/5 border border-white/5 p-6">

                <p className="text-gray-400">
                  Best Score
                </p>

                <h3 className="text-4xl font-bold text-green-400 mt-4">

                  {bestScore}%

                </h3>

              </div>

              <div className="rounded-2xl bg-white/5 border border-white/5 p-6">

                <p className="text-gray-400">
                  Confidence
                </p>

                <h3 className="text-4xl font-bold text-purple-400 mt-4">

                  {averageConfidence}%

                </h3>

              </div>

            </div>

          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8">

            <h3 className="text-2xl font-bold text-white">

              AI Summary

            </h3>

            <div className="space-y-5 mt-8">

              <div className="rounded-2xl bg-white/5 border border-white/5 p-5">

                Communication quality improving consistently.

              </div>

              <div className="rounded-2xl bg-white/5 border border-white/5 p-5">

                Strong recruiter confidence indicators detected.

              </div>

              <div className="rounded-2xl bg-white/5 border border-white/5 p-5">

                Continue advanced interview preparation.

              </div>

            </div>

          </div>

        </div>

      </PageLayout>

    </MainLayout>
  );
}

export default Profile;