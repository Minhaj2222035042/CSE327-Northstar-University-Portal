
const courses = [
  {
    code: "CSE327",
    name: "Software Engineering",
    faculty: "Faculty TBA",
    credits: 3,
    status: "Enrolled",
  },
  {
    code: "CSE331",
    name: "Computer Organization and Architecture",
    faculty: "Faculty TBA",
    credits: 3,
    status: "Enrolled",
  },
  {
    code: "CSE273",
    name: "Introduction to Theory of Computation",
    faculty: "Faculty TBA",
    credits: 3,
    status: "Enrolled",
  },
];

const stats = [
  { label: "Enrolled Courses", value: "3", icon: "▤" },
  { label: "Total Credits", value: "9", icon: "◈" },
  { label: "Academic Status", value: "Active", icon: "✓" },
  { label: "Current Semester", value: "Fall 2026", icon: "▦" },
];

export default function StudentDashboard() {
  return (
    <div className="space-y-7">
      <section className="rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-900 p-7 text-white shadow-lg">
        <p className="text-sm text-cyan-300">
          Student Dashboard
        </p>
        <h2 className="mt-2 text-3xl font-bold">
          Welcome to Northstar!
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          Manage your courses, registration, class schedule,
          and academic progress in one place.
        </p>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100 text-xl text-cyan-700">
              {card.icon}
            </div>
            <p className="text-sm text-slate-500">
              {card.label}
            </p>
            <h3 className="mt-1 text-2xl font-bold">
              {card.value}
            </h3>
          </div>
        ))}
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div>
            <h3 className="text-lg font-bold">
              My Courses
            </h3>
            <p className="text-sm text-slate-500">
              Current semester enrollment
            </p>
          </div>
          <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700">
            Fall 2026
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4">Faculty</th>
                <th className="px-6 py-4">Credits</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr
                  key={course.code}
                  className="border-t border-slate-100"
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-900">
                      {course.code}
                    </p>
                    <p className="text-xs text-slate-500">
                      {course.name}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    {course.faculty}
                  </td>
                  <td className="px-6 py-4">
                    {course.credits}
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      {course.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="text-xs text-slate-500">
        Demo interface — course and enrollment data are
        placeholders until backend integration.
      </p>
    </div>
  );
}
