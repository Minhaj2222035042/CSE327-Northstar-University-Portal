
import { useState } from "react";
import StudentDashboard from "./pages/StudentDashboard";
import CourseCatalog from "./pages/CourseCatalog";
import CourseRegistration from "./pages/CourseRegistration";
import ClassSchedule from "./pages/ClassSchedule";
import CourseAdvisor from "./pages/CourseAdvisor";
import StudentBilling from "./pages/StudentBilling";



const menuItems = [
  { icon: "▦", label: "Dashboard" },
  { icon: "▤", label: "Course Catalog" },
  { icon: "✎", label: "Registration" },
  { icon: "▦", label: "Class Schedule" },
  { icon: "✦", label: "Course Advisor" },
  { icon: "▣", label: "Billing" },
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-950 text-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-slate-800 px-6 py-6">
          <h1 className="text-xl font-bold text-cyan-400">
            NORTHSTAR
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            University Portal
          </p>
        </div>

        <nav className="space-y-2 p-4">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setActivePage(item.label);
                setSidebarOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                activePage === item.label
                  ? "bg-cyan-500 font-semibold text-slate-950"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full border-t border-slate-800 p-5">
          <p className="text-sm font-semibold">Student Portal</p>
          <p className="text-xs text-slate-400">
            Academic Management System
          </p>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <button
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
        />
      )}

      {/* Main Content */}
      <div className="lg:ml-64">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 shadow-sm md:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-2xl lg:hidden"
              aria-label="Open sidebar"
            >
              ☰
            </button>

            <div>
              <h2 className="text-xl font-bold">
                {activePage}
              </h2>
              <p className="text-xs text-slate-500">
                Northstar University Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-600 sm:block">
              Demo Student
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 font-bold text-cyan-700">
              DS
            </div>
          </div>
        </header>
<main className="mx-auto max-w-7xl p-5 md:p-8">
  {activePage === "Dashboard" ? (
    <StudentDashboard />
  ) : activePage === "Course Catalog" ? (
    <CourseCatalog />
  ) : activePage === "Registration" ? (
    <CourseRegistration />
  ) : activePage === "Class Schedule" ? (
    <ClassSchedule />
  ) : activePage === "Course Advisor" ? (
    <CourseAdvisor />
  ) : activePage === "Billing" ? (
    <StudentBilling />
  ) : (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h3 className="text-2xl font-bold">
        {activePage}
      </h3>
      <p className="mt-3 text-slate-500">
        This module will be implemented in the next
        development steps.
      </p>
    </section>
  )}
</main>





      </div>
    </div>
  );
}

export default App;
