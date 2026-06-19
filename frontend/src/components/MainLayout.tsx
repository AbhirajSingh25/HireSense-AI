import Sidebar from "./Sidebar";


function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <div
      className="
        min-h-screen
        bg-black
        text-white
        flex
      "
    >

      {/* SIDEBAR */}

      <Sidebar />



      {/* MAIN CONTENT */}

      <main
        className="
          flex-1
          min-w-0
          bg-black
        "
      >

        <div
          className="
            px-5
            md:px-7
            xl:px-8
            py-5
          "
        >

          {children}

        </div>

      </main>

    </div>
  );
}

export default MainLayout;