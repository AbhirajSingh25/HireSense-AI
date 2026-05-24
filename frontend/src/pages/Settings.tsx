import {
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import AnimatedPage from "../components/AnimatedPage";

import PageLayout from "../components/PageLayout";

import PremiumCard from "../components/PremiumCard";

import SettingToggle from "../components/SettingToggle";

import PremiumButton from "../components/PremiumButton";

function Settings() {

  const savedSettings =
    JSON.parse(
      localStorage.getItem(
        "hiresense-settings"
      ) || "{}"
    );

  const [
    name,
    setName,
  ] = useState(
    savedSettings.name || ""
  );

  const [
    role,
    setRole,
  ] = useState(
    savedSettings.role ||
    "Software Engineer"
  );

  const [
    difficulty,
    setDifficulty,
  ] = useState(
    savedSettings.difficulty ||
    "Intermediate"
  );

  const [
    aiVoice,
    setAiVoice,
  ] = useState(true);

  const [
    notifications,
    setNotifications,
  ] = useState(true);

  const [
    analytics,
    setAnalytics,
  ] = useState(true);

  const saveSettings =
    () => {

      const settings = {
        name,
        role,
        difficulty,
      };

      localStorage.setItem(
        "hiresense-settings",
        JSON.stringify(settings)
      );

      alert(
        "Settings saved successfully."
      );
    };

  return (
    <MainLayout>

      <AnimatedPage>

        <PageLayout
          title="Settings"
          subtitle="Manage AI interview preferences and workspace personalization"
        >

          <div className="grid xl:grid-cols-3 gap-8">

            <div className="xl:col-span-2 space-y-8">

              <PremiumCard className="p-8">

                <h2 className="text-2xl font-bold text-white">

                  Profile Preferences

                </h2>

                <div className="grid md:grid-cols-2 gap-6 mt-8">

                  <div>

                    <label className="text-gray-400 text-sm">

                      Full Name

                    </label>

                    <input
                      value={name}
                      onChange={(e) =>
                        setName(
                          e.target.value
                        )
                      }
                      placeholder="Enter your name"
                      className="w-full mt-3 px-5 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none text-white"
                    />

                  </div>

                  <div>

                    <label className="text-gray-400 text-sm">

                      Target Role

                    </label>

                    <select
                      value={role}
                      onChange={(e) =>
                        setRole(
                          e.target.value
                        )
                      }
                      className="w-full mt-3 px-5 py-4 rounded-2xl bg-[#0b1120] border border-white/10 outline-none text-white"
                    >

                      <option>
                        Software Engineer
                      </option>

                      <option>
                        Frontend Developer
                      </option>

                      <option>
                        Backend Developer
                      </option>

                      <option>
                        Data Analyst
                      </option>

                      <option>
                        AI Engineer
                      </option>

                    </select>

                  </div>

                </div>

                <div className="mt-6">

                  <label className="text-gray-400 text-sm">

                    Interview Difficulty

                  </label>

                  <select
                    value={difficulty}
                    onChange={(e) =>
                      setDifficulty(
                        e.target.value
                      )
                    }
                    className="w-full mt-3 px-5 py-4 rounded-2xl bg-[#0b1120] border border-white/10 outline-none text-white"
                  >

                    <option>
                      Beginner
                    </option>

                    <option>
                      Intermediate
                    </option>

                    <option>
                      Advanced
                    </option>

                  </select>

                </div>

                <div className="mt-8">

                  <div
                    onClick={saveSettings}
                  >

                    <PremiumButton className="w-full sm:w-auto">

                      Save Preferences

                    </PremiumButton>

                  </div>

                </div>

              </PremiumCard>

            </div>

            <div className="space-y-8">

              <PremiumCard className="p-8">

                <h2 className="text-2xl font-bold text-white">

                  AI Features

                </h2>

                <div className="space-y-6 mt-8">

                  <div className="flex items-center justify-between gap-4">

                    <div>

                      <h3 className="text-white font-semibold">

                        AI Voice Analysis

                      </h3>

                      <p className="text-gray-400 text-sm mt-2">

                        Analyze tone and communication

                      </p>

                    </div>

                    <SettingToggle
                      enabled={aiVoice}
                      onClick={() =>
                        setAiVoice(
                          !aiVoice
                        )
                      }
                    />

                  </div>

                  <div className="flex items-center justify-between gap-4">

                    <div>

                      <h3 className="text-white font-semibold">

                        Notifications

                      </h3>

                      <p className="text-gray-400 text-sm mt-2">

                        Receive interview reminders

                      </p>

                    </div>

                    <SettingToggle
                      enabled={notifications}
                      onClick={() =>
                        setNotifications(
                          !notifications
                        )
                      }
                    />

                  </div>

                  <div className="flex items-center justify-between gap-4">

                    <div>

                      <h3 className="text-white font-semibold">

                        AI Analytics

                      </h3>

                      <p className="text-gray-400 text-sm mt-2">

                        Enable advanced AI insights

                      </p>

                    </div>

                    <SettingToggle
                      enabled={analytics}
                      onClick={() =>
                        setAnalytics(
                          !analytics
                        )
                      }
                    />

                  </div>

                </div>

              </PremiumCard>

              <PremiumCard className="p-8 overflow-hidden">

                <div className="absolute top-0 right-0 w-52 h-52 rounded-full bg-cyan-500/10 blur-3xl" />

                <div className="relative z-10">

                  <h2 className="text-2xl font-bold text-white">

                    Workspace Status

                  </h2>

                  <div className="space-y-5 mt-8">

                    <div className="rounded-2xl bg-white/5 border border-white/5 p-5">

                      <p className="text-gray-400 text-sm">

                        AI System

                      </p>

                      <h3 className="text-green-400 font-semibold text-lg mt-3">

                        Operational

                      </h3>

                    </div>

                    <div className="rounded-2xl bg-white/5 border border-white/5 p-5">

                      <p className="text-gray-400 text-sm">

                        Recruiter Analysis

                      </p>

                      <h3 className="text-cyan-300 font-semibold text-lg mt-3">

                        Active

                      </h3>

                    </div>

                    <div className="rounded-2xl bg-white/5 border border-white/5 p-5">

                      <p className="text-gray-400 text-sm">

                        Workspace Mode

                      </p>

                      <h3 className="text-purple-300 font-semibold text-lg mt-3">

                        Premium Experience

                      </h3>

                    </div>

                  </div>

                </div>

              </PremiumCard>

            </div>

          </div>

        </PageLayout>

      </AnimatedPage>

    </MainLayout>
  );
}

export default Settings;