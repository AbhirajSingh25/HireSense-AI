import {
  motion,
} from "framer-motion";

import {
  Link,
} from "react-router-dom";

import {
  Brain,
  FileText,
  History,
  Settings,
  BarChart3,
} from "lucide-react";

import PremiumCard from "./PremiumCard";

const actions = [

  {
    title:
      "Mock Interview",

    description:
      "Practice AI-powered interview sessions",

    link:
      "/mock",

    icon:
      Brain,
  },

  {
    title:
      "AI Reports",

    description:
      "View recruiter evaluation reports",

    link:
      "/reports",

    icon:
      FileText,
  },

  {
    title:
      "Interview History",

    description:
      "Track interview progression",

    link:
      "/history",

    icon:
      History,
  },

  {
    title:
      "Analytics",

    description:
      "Review AI performance intelligence",

    link:
      "/analytics",

    icon:
      BarChart3,
  },

  {
    title:
      "Settings",

    description:
      "Manage AI workspace preferences",

    link:
      "/settings",

    icon:
      Settings,
  },
];

function QuickActions() {

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-5">

      {actions.map(
        (
          item,
          index
        ) => {

          const Icon =
            item.icon;

          return (

            <Link
              to={item.link}
              key={index}
            >

              <motion.div
                whileHover={{
                  y: -6,
                }}
                transition={{
                  duration: 0.2,
                }}
              >

                <PremiumCard className="p-6 h-full">

                  <div className="w-14 h-14 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-300">

                    <Icon size={26} />

                  </div>

                  <h2 className="text-xl font-bold text-white mt-6">

                    {item.title}

                  </h2>

                  <p className="text-gray-400 leading-7 mt-3">

                    {item.description}

                  </p>

                </PremiumCard>

              </motion.div>

            </Link>

          );
        }
      )}

    </div>
  );
}

export default QuickActions;