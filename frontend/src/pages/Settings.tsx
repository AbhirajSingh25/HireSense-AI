import MainLayout from "../components/MainLayout";

import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";

import {
  User,
  ShieldCheck,
  Bell,
  Brain,
  Moon,
  Sparkles,
  Lock,
  Eye,
} from "lucide-react";


function Settings() {

  return (

    <MainLayout>

      <div
        className="
          w-full
          max-w-[1600px]
          mx-auto
          pb-24
        "
      >

        <PageHeader
          badge="SYSTEM SETTINGS"
          title="Platform Preferences"
          description="
            Configure AI preferences,
            recruiter visibility,
            notification systems,
            privacy controls,
            and interview intelligence settings.
          "
        />



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
              space-y-6
            "
          >

            {/* PROFILE */}

            <Card
              className="
                p-8
              "
            >

              <div className="mb-10">

                <p
                  className="
                    text-red-400
                    uppercase
                    tracking-[0.3em]
                    text-xs
                    mb-3
                  "
                >
                  PROFILE SETTINGS
                </p>

                <h2
                  className="
                    text-4xl
                    font-black
                  "
                >
                  Personal Information
                </h2>

              </div>



              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-6
                "
              >

                <div>

                  <label
                    className="
                      block
                      text-zinc-400
                      mb-3
                    "
                  >
                    Full Name
                  </label>

                  <input
                    defaultValue="Abhiraj Singh"

                    className="
                      w-full
                      h-16
                      rounded-2xl
                      bg-[#0b0b0b]
                      border
                      border-white/10
                      px-5
                      text-white
                      outline-none
                    "
                  />

                </div>



                <div>

                  <label
                    className="
                      block
                      text-zinc-400
                      mb-3
                    "
                  >
                    Email Address
                  </label>

                  <input
                    defaultValue="abhirajsingh2141@gmail.com"

                    className="
                      w-full
                      h-16
                      rounded-2xl
                      bg-[#0b0b0b]
                      border
                      border-white/10
                      px-5
                      text-white
                      outline-none
                    "
                  />

                </div>



                <div>

                  <label
                    className="
                      block
                      text-zinc-400
                      mb-3
                    "
                  >
                    Target Role
                  </label>

                  <input
                    defaultValue="AI Software Engineer"

                    className="
                      w-full
                      h-16
                      rounded-2xl
                      bg-[#0b0b0b]
                      border
                      border-white/10
                      px-5
                      text-white
                      outline-none
                    "
                  />

                </div>



                <div>

                  <label
                    className="
                      block
                      text-zinc-400
                      mb-3
                    "
                  >
                    Experience Level
                  </label>

                  <input
                    defaultValue="Fresher / Entry Level"

                    className="
                      w-full
                      h-16
                      rounded-2xl
                      bg-[#0b0b0b]
                      border
                      border-white/10
                      px-5
                      text-white
                      outline-none
                    "
                  />

                </div>

              </div>



              <button
                className="
                  mt-8
                  h-14
                  px-8
                  rounded-2xl
                  bg-red-500
                  hover:bg-red-400
                  transition-all
                  duration-300
                  font-bold
                "
              >
                Save Changes
              </button>

            </Card>



            {/* AI SETTINGS */}

            <Card
              className="
                p-8
              "
            >

              <div className="mb-10">

                <p
                  className="
                    text-cyan-400
                    uppercase
                    tracking-[0.3em]
                    text-xs
                    mb-3
                  "
                >
                  AI SETTINGS
                </p>

                <h2
                  className="
                    text-4xl
                    font-black
                  "
                >
                  Intelligence Preferences
                </h2>

              </div>



              <div className="space-y-6">

                {[
                  {
                    title:
                      "Enable AI Voice Analysis",

                    subtitle:
                      "Analyze communication clarity and speech patterns",
                  },

                  {
                    title:
                      "Behavioral Intelligence",

                    subtitle:
                      "Track confidence and recruiter communication signals",
                  },

                  {
                    title:
                      "Real-Time Feedback",

                    subtitle:
                      "Receive live AI coaching during interviews",
                  },

                  {
                    title:
                      "Advanced Recruiter Insights",

                    subtitle:
                      "Unlock deeper recruiter-grade analytics",
                  },
                ].map((item) => (

                  <div
                    key={item.title}

                    className="
                      flex
                      items-center
                      justify-between
                      gap-6
                      p-5
                      rounded-3xl
                      bg-[#0b0b0b]
                      border
                      border-white/5
                    "
                  >

                    <div>

                      <h3
                        className="
                          text-xl
                          font-bold
                          mb-2
                        "
                      >
                        {item.title}
                      </h3>

                      <p className="text-zinc-500">
                        {item.subtitle}
                      </p>

                    </div>



                    <button
                      className="
                        w-16
                        h-9
                        rounded-full
                        bg-red-500
                        relative
                        shrink-0
                      "
                    >

                      <div
                        className="
                          absolute
                          top-1
                          right-1
                          w-7
                          h-7
                          rounded-full
                          bg-white
                        "
                      />

                    </button>

                  </div>

                ))}

              </div>

            </Card>

          </div>



          {/* RIGHT */}

          <div
            className="
              xl:col-span-4
              space-y-6
            "
          >

            {/* SECURITY */}

            <Card
              className="
                p-8
              "
            >

              <div className="mb-8">

                <p
                  className="
                    text-green-400
                    uppercase
                    tracking-[0.3em]
                    text-xs
                    mb-2
                  "
                >
                  SECURITY
                </p>

                <h2
                  className="
                    text-3xl
                    font-black
                  "
                >
                  Privacy Controls
                </h2>

              </div>



              <div className="space-y-5">

                {[
                  {
                    icon: Lock,
                    title: "2FA Authentication",
                    color: "text-green-400",
                  },

                  {
                    icon: Eye,
                    title: "Recruiter Visibility",
                    color: "text-cyan-400",
                  },

                  {
                    icon: ShieldCheck,
                    title: "Secure AI Sessions",
                    color: "text-red-400",
                  },
                ].map((item) => {

                  const Icon = item.icon;

                  return (

                    <div
                      key={item.title}

                      className="
                        p-5
                        rounded-3xl
                        bg-[#0b0b0b]
                        border
                        border-white/5
                        flex
                        items-center
                        justify-between
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-4
                        "
                      >

                        <Icon
                          className={item.color}
                        />

                        <span>
                          {item.title}
                        </span>

                      </div>

                      <div
                        className="
                          w-3
                          h-3
                          rounded-full
                          bg-green-400
                        "
                      />

                    </div>

                  );
                })}

              </div>

            </Card>



            {/* PREFERENCES */}

            <Card
              className="
                p-8
              "
            >

              <div className="mb-8">

                <p
                  className="
                    text-yellow-400
                    uppercase
                    tracking-[0.3em]
                    text-xs
                    mb-2
                  "
                >
                  PREFERENCES
                </p>

                <h2
                  className="
                    text-3xl
                    font-black
                  "
                >
                  System Controls
                </h2>

              </div>



              <div className="space-y-5">

                {[
                  {
                    icon: Bell,
                    title: "Notifications",
                  },

                  {
                    icon: Moon,
                    title: "Dark Mode",
                  },

                  {
                    icon: Brain,
                    title: "AI Optimization",
                  },

                  {
                    icon: Sparkles,
                    title: "Experimental Features",
                  },

                  {
                    icon: User,
                    title: "Profile Visibility",
                  },
                ].map((item) => {

                  const Icon = item.icon;

                  return (

                    <div
                      key={item.title}

                      className="
                        p-5
                        rounded-3xl
                        bg-[#0b0b0b]
                        border
                        border-white/5
                        flex
                        items-center
                        justify-between
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-4
                        "
                      >

                        <Icon
                          className="
                            text-red-400
                          "
                        />

                        <span>
                          {item.title}
                        </span>

                      </div>



                      <button
                        className="
                          w-14
                          h-8
                          rounded-full
                          bg-red-500
                          relative
                        "
                      >

                        <div
                          className="
                            absolute
                            top-1
                            right-1
                            w-6
                            h-6
                            rounded-full
                            bg-white
                          "
                        />

                      </button>

                    </div>

                  );
                })}

              </div>

            </Card>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default Settings;