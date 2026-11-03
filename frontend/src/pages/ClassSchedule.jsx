
const sampleClasses = [
  {
    code: "CSE327",
    title: "Software Engineering",
    section: "1",
    days: ["Sunday", "Tuesday"],
    time: "10:00 AM - 11:30 AM",
    room: "TBA",
    color: "bg-cyan-50 border-cyan-200 text-cyan-900",
  },
  {
    code: "CSE331",
    title: "Computer Organization and Architecture",
    section: "2",
    days: ["Monday", "Wednesday"],
    time: "11:30 AM - 1:00 PM",
    room: "TBA",
    color: "bg-indigo-50 border-indigo-200 text-indigo-900",
  },
  {
    code: "CSE273",
    title: "Introduction to Theory of Computation",
    section: "1",
    days: ["Sunday", "Tuesday"],
    time: "1:00 PM - 2:30 PM",
    room: "TBA",
    color: "bg-emerald-50 border-emerald-200 text-emerald-900",
  },
];

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
];

export default function ClassSchedule() {
  const totalSessions = sampleClasses.reduce(
    (total, course) => total + course.days.length,
    0
  );

  const downloadSchedule = () => {
    const header = [
      "Course",
      "Title",
      "Section",
      "Days",
      "Time",
      "Room",
    ];

    const rows = sampleClasses.map((course) => [
      course.code,
      course.title,
      course.section,
      course.days.join(" & "),
      course.time,
      course.room,
    ]);

    const csv = [header, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\r\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "northstar-class-schedule.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 rounded-2xl bg-gradient-to-r from-slate-950 to-cyan-900 p-7 text-white sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-cyan-300">
            Academic Timetable
          </p>
          <h2 className="mt-2 text-3xl font-bold">
            Class Schedule
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Your weekly class schedule for Fall 2026.
          </p>
        </div>

        <button
          type="button"
          onClick={downloadSchedule}
          className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          Download Schedule
        </button>
      </section>

      <section className="grid gap-5 sm:grid-cols-3">
        {[
          {
            label: "Total Courses",
            value: sampleClasses.length,
          },
          {
            label: "Weekly Sessions",
            value: totalSessions,
          },
          {
            label: "Current Semester",
            value: "Fall 2026",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">
              {stat.label}
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h3 className="text-lg font-bold text-slate-900">
            Weekly Timetable
          </h3>
          <p className="text-sm text-slate-500">
            Classes organized by day
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-5">
          {weekdays.map((day) => {
            const dayClasses = sampleClasses.filter((course) =>
              course.days.includes(day)
            );

            return (
              <div
                key={day}
                className="min-h-56 rounded-xl border border-slate-200 bg-slate-50 p-3"
              >
                <h4 className="mb-4 border-b border-slate-200 pb-3 text-center text-sm font-bold text-slate-800">
                  {day}
                </h4>

                <div className="space-y-3">
                  {dayClasses.length === 0 ? (
                    <p className="py-8 text-center text-xs text-slate-400">
                      No classes
                    </p>
                  ) : (
                    dayClasses.map((course) => (
                      <div
                        key={`${day}-${course.code}`}
                        className={`rounded-xl border p-3 ${course.color}`}
                      >
                        <p className="text-sm font-bold">
                          {course.code}
                        </p>
                        <p className="mt-1 text-xs">
                          {course.title}
                        </p>
                        <p className="mt-3 text-xs font-semibold">
                          {course.time}
                        </p>
                        <p className="mt-1 text-xs">
                          Section {course.section}
                        </p>
                        <p className="mt-1 text-xs">
                          Room: {course.room}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <p className="text-xs text-slate-500">
        Demo timetable — course times and rooms are sample
        information. The downloaded CSV contains this demo
        schedule, not verified enrollment records.
      </p>
    </div>
  );
}
