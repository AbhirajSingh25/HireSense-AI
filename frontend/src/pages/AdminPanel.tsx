import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  getFinalReport,
} from "../services/api";


function AdminPanel() {

  const [
    report,
    setReport,
  ] = useState<any>(null);


  useEffect(() => {

    loadReport();

  }, []);


  async function loadReport() {

    try {

      const data =
        await getFinalReport({});

      setReport(data);

    } catch (error) {

      console.error(error);
    }
  }


  return (

    <MainLayout>

      <div>

        <h1
          className="
            text-4xl
            font-bold
            text-white
            mb-8
          "
        >
          Admin Panel
        </h1>


        <div
          className="
            bg-white/5
            border
            border-white/10
            rounded-2xl
            p-6
          "
        >

          <pre
            className="
              text-white
              whitespace-pre-wrap
            "
          >

            {JSON.stringify(
              report,
              null,
              2
            )}

          </pre>

        </div>

      </div>

    </MainLayout>
  );
}

export default AdminPanel;