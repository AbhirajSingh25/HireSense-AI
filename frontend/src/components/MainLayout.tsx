// frontend/src/components/MainLayout.tsx

import Sidebar from "./ui/Sidebar";

import TopBar from "./ui/TopBar";

import GlowOrb from "./ui/GlowOrb";

import PageTransition from "./PageTransition";


interface Props {

  children: React.ReactNode;
}


function MainLayout({

  children,
}: Props) {

  return (

    <div
      className="
        min-h-screen
        bg-[#030712]
        text-white
        flex
        flex-col
        lg:flex-row
        relative
        overflow-hidden
      "
    >

      <GlowOrb />


      <Sidebar />


      <main
        className="
          flex-1
          p-5
          lg:p-10
          overflow-y-auto
          relative
          z-10
        "
      >

        <TopBar />


        <PageTransition>

          {children}

        </PageTransition>

      </main>

    </div>
  );
}

export default MainLayout;