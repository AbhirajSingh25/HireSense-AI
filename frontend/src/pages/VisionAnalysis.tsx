import { useEffect, useState } from "react";

import MainLayout from "../components/MainLayout";
import Card from "../components/ui/Card";

function VisionAnalysis() {
  const [result, setResult] =
    useState<any>(null);

  useEffect(() => {
    loadVision();
  }, []);

  async function loadVision() {
    setResult({
      eye_contact: 91,
      posture: 87,
      engagement: 94,
    });
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">

        <h1
          className="
            text-6xl
            font-black
            mb-10
          "
        >
          Vision Analysis
        </h1>

        {result && (
          <div className="grid grid-cols-3 gap-6">

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-3">
                Eye Contact
              </h2>

              <p className="text-6xl font-black text-red-400">
                {result.eye_contact}%
              </p>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-3">
                Posture
              </h2>

              <p className="text-6xl font-black text-red-400">
                {result.posture}%
              </p>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-3">
                Engagement
              </h2>

              <p className="text-6xl font-black text-red-400">
                {result.engagement}%
              </p>
            </Card>

          </div>
        )}

      </div>
    </MainLayout>
  );
}

export default VisionAnalysis;