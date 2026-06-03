import MainLayout from "../components/MainLayout";

import Card from "../components/ui/Card";

import ActivityItem from "../components/ui/ActivityItem";

import {
  History as HistoryIcon,
} from "lucide-react";


function History() {

  const interviews = [

    {
      role:
        "Frontend Developer",

      score:
        "92%",

      date:
        "2 hours ago",
    },

    {
      role:
        "React Engineer",

      score:
        "88%",

      date:
        "Yesterday",
    },

    {
      role:
        "AI Engineer",

      score:
        "95%",

      date:
        "2 days ago",
    },

    {
      role:
        "Backend Developer",

      score:
        "84%",

      date:
        "Last week",
    },
  ];


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
          Interview History
        </h1>

        <p
          className="
            text-zinc-400
            text-xl
          "
        >
          Track all your AI interview sessions
        </p>

      </div>


      <Card className="p-8">

        <div
          className="
            flex
            items-center
            gap-3
            mb-8
          "
        >

          <HistoryIcon
            className="
              text-cyan-400
            "
          />

          <h2
            className="
              text-3xl
              font-bold
            "
          >
            Recent Interviews
          </h2>

        </div>


        <div className="space-y-5">

          {interviews.map(
            (item, index) => (

              <ActivityItem
                key={index}
                role={item.role}
                score={item.score}
                date={item.date}
              />
            )
          )}

        </div>

      </Card>

    </MainLayout>
  );
}

export default History;