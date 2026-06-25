import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";
import PageContainer from "../components/ui/PageContainer";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";

import {
  FileText,
  Brain,
  Trophy,
  CheckCircle2,
} from "lucide-react";

import {
  getLatestReport,
} from "../services/api";

function Reports() {

  const [
    report,
    setReport,
  ] = useState<any>(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    loadReport();

  }, []);

  async function loadReport() {

    try {

      const data =
        await getLatestReport();

      setReport(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }

  if (loading) {

    return (

      <MainLayout>

        <PageContainer>

          <div className="text-white">
            Loading Report...
          </div>

        </PageContainer>

      </MainLayout>
    );
  }

  if (!report) {

    return (

      <MainLayout>

        <PageContainer>

          <div className="text-white">
            No Report Found
          </div>

        </PageContainer>

      </MainLayout>
    );
  }

  return (

    <MainLayout>

      <PageContainer>

        <PageHeader
          badge="AI REPORT"
          title="Interview Performance Report"
          description="Recruiter-grade evaluation generated from your latest interview."
        />

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-4
            gap-5
            mb-6
          "
        >

          <Card className="p-6">

            <FileText
              className="text-red-400 mb-4"
              size={30}
            />

            <h2 className="text-4xl font-black">
              {report.overall_score}
            </h2>

            <p className="text-zinc-500">
              Overall Score
            </p>

          </Card>

          <Card className="p-6">

            <Brain
              className="text-cyan-400 mb-4"
              size={30}
            />

            <h2 className="text-4xl font-black">
              {report.role}
            </h2>

            <p className="text-zinc-500">
              Target Role
            </p>

          </Card>

          <Card className="p-6">

            <Trophy
              className="text-yellow-400 mb-4"
              size={30}
            />

            <h2 className="text-4xl font-black">
              {report.level}
            </h2>

            <p className="text-zinc-500">
              Level
            </p>

          </Card>

          <Card className="p-6">

            <CheckCircle2
              className="text-green-400 mb-4"
              size={30}
            />

            <h2 className="text-4xl font-black">
              {
                report.overall_score >= 85
                  ? "Strong"
                  : report.overall_score >= 70
                  ? "Good"
                  : "Needs Work"
              }
            </h2>

            <p className="text-zinc-500">
              Verdict
            </p>

          </Card>

        </div>

        <Card className="p-6">

          <h2
            className="
              text-3xl
              font-black
              mb-6
            "
          >
            Question Breakdown
          </h2>

          <div className="space-y-6">

            {
              report.questions?.map(
                (
                  question: string,
                  index: number
                ) => {

                  const evaluation =
                    report.evaluations?.[index];

                  const answer =
                    report.answers?.[index];

                  return (

                    <div
                      key={index}
                      className="
                        p-5
                        rounded-2xl
                        bg-black/30
                        border
                        border-white/10
                      "
                    >

                      <h3
                        className="
                          font-bold
                          text-lg
                          mb-3
                        "
                      >
                        Q{index + 1}.
                        {" "}
                        {question}
                      </h3>

                      <p
                        className="
                          text-zinc-400
                          mb-4
                        "
                      >
                        {answer}
                      </p>

                      <div
                        className="
                          grid
                          grid-cols-3
                          gap-4
                          mb-4
                        "
                      >

                        <div>
                          Confidence:
                          {" "}
                          {
                            evaluation?.confidence || 0
                          }
                        </div>

                        <div>
                          Communication:
                          {" "}
                          {
                            evaluation?.communication || 0
                          }
                        </div>

                        <div>
                          Technical:
                          {" "}
                          {
                            evaluation?.technical || 0
                          }
                        </div>

                      </div>

                      <p
                        className="
                          text-green-400
                        "
                      >
                        {
                          evaluation?.feedback
                        }
                      </p>

                    </div>
                  );
                }
              )
            }

          </div>

        </Card>

      </PageContainer>

    </MainLayout>
  );
}

export default Reports;