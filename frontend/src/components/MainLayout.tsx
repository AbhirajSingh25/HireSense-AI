import { ReactNode } from "react";

import Sidebar from "./ui/Sidebar";

interface Props {
  children: ReactNode;
}

function MainLayout({
  children,
}: Props) {
  return (
    <div
      className="
        flex
        bg-[#050505]
        text-white
        min-h-screen
      "
    >
      <Sidebar />

      <main
        className="
          flex-1
          p-8
          overflow-y-auto
        "
      >
        {children}
      </main>
    </div>
  );
}

export default MainLayout;