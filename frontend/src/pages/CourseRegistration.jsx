
import { useState } from "react";

const availableSections = [
  {
    id: 1,
    code: "CSE327",
    title: "Software Engineering",
    section: "1",
    faculty: "Faculty TBA",
    schedule: "Sun & Tue, 10:00 AM - 11:30 AM",
    seats: 12,
    credits: 3,
  },
  {
    id: 2,
    code: "CSE331",
    title: "Computer Organization and Architecture",
    section: "2",
    faculty: "Faculty TBA",
    schedule: "Mon & Wed, 11:30 AM - 1:00 PM",
    seats: 8,
    credits: 3,
  },
  {
    id: 3,
    code: "CSE273",
    title: "Introduction to Theory of Computation",
    section: "1",
    faculty: "Faculty TBA",
    schedule: "Sun & Tue, 1:00 PM - 2:30 PM",
    seats: 15,
    credits: 3,
  },
  {
    id: 4,
    code: "CSE225",
    title: "Data Structures and Algorithms",
    section: "3",
    faculty: "Faculty TBA",
    schedule: "Mon & Wed, 2:30 PM - 4:00 PM",
    seats: 0,
    credits: 3,
  },
];

export default function CourseRegistration() {
  const [selectedSections, setSelectedSections] = useState([]);
  const [search, setSearch] = useState("");

  const toggleSection = (sectionId) => {
    setSelectedSections((current) =>
      current.includes(sectionId)
        ? current.filter((id) => id !== sectionId)
        : [...current, sectionId]
    );
  };

  const filteredSections = availableSections.filter((course) =>
    `${course.code} ${course.title}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const selectedCredits = availableSections
    .filter((course) => selectedSections.includes(course.id))
    .reduce((total, course) => total + course.credits, 0);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-gradient-to-r from-slate-950 to-cyan-900 p-7 text-white">
        <p className="text-sm text-cyan-300">
          Student Enrollment
        </p>
        <h2 className="mt-2 text-3xl font-bold">
          Course Registration
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          Browse sections and prepare your course selection.
        </p>
      </section>

      <section className="grid gap-5 sm:grid-cols-3">
        {[
          {
            label: "Available Sections",
            value: availableSections.length,
          },
          {
            label: "Selected Sections",
            value: selectedSections.length,
          },
          {
            label: "Selected Credits",
            value: selectedCredits,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">
              {stat.label}
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <label
          htmlFor="registration-search"
          className="mb-2 block text-sm font-semibold"
        >
          Search Available Sections
        </label>
        <input
          id="registration-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by course code or name..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />
      </section>

      <section className="space-y-4">
        {filteredSections.map((course) => {
          const isSelected = selectedSections.includes(course.id);
          const isFull = course.seats === 0;

          return (
            <article
              key={course.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-lg bg-cyan-100 px-3 py-1 text-sm font-bold text-cyan-800">
                      {course.code}
                    </span>
                    <span className="text-xs text-slate-500">
                      Section {course.section}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {course.title}
                  </h3>

                  <div className="space-y-1 text-sm text-slate-500">
                    <p>Faculty: {course.faculty}</p>
                    <p>Schedule: {course.schedule}</p>
                    <p>Credits: {course.credits}</p>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-3 md:items-end">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      isFull
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {isFull
                      ? "Section Full"
                      : `${course.seats} Seats Available`}
                  </span>

                  <button
                    type="button"
                    disabled={isFull}
                    onClick={() => toggleSection(course.id)}
                    className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                      isFull
                        ? "cursor-not-allowed bg-slate-200 text-slate-400"
                        : isSelected
                          ? "bg-red-100 text-red-700 hover:bg-red-200"
                          : "bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                    }`}
                  >
                    {isFull
                      ? "Unavailable"
                      : isSelected
                        ? "Remove Selection"
                        : "Select Section"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {filteredSections.length === 0 && (
        <div className="rounded-2xl bg-white p-8 text-center text-slate-500">
          No matching sections found.
        </div>
      )}

      <section className="rounded-2xl border border-cyan-200 bg-cyan-50 p-6">
        <h3 className="text-lg font-bold text-slate-900">
          Registration Summary
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          {selectedSections.length} section(s) selected,
          totaling {selectedCredits} credits.
        </p>
        <p className="mt-3 text-xs text-slate-500">
          Demo only: selections are not saved or submitted.
          Actual enrollment will require backend validation
          of prerequisites, capacity, duplicates, and
          timetable conflicts.
        </p>
      </section>
    </div>
  );
}
