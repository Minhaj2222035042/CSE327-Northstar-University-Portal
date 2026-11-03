
import { useState } from "react";

const sampleCourses = [
  {
    code: "CSE115",
    title: "Programming Language I",
    credits: 3,
    prerequisite: "None",
    department: "CSE",
  },
  {
    code: "CSE173",
    title: "Discrete Mathematics",
    credits: 3,
    prerequisite: "None",
    department: "CSE",
  },
  {
    code: "CSE225",
    title: "Data Structures and Algorithms",
    credits: 3,
    prerequisite: "CSE115",
    department: "CSE",
  },
  {
    code: "CSE273",
    title: "Introduction to Theory of Computation",
    credits: 3,
    prerequisite: "CSE173",
    department: "CSE",
  },
  {
    code: "CSE327",
    title: "Software Engineering",
    credits: 3,
    prerequisite: "CSE225",
    department: "CSE",
  },
  {
    code: "CSE331",
    title: "Computer Organization and Architecture",
    credits: 3,
    prerequisite: "CSE225",
    department: "CSE",
  },
];

export default function CourseCatalog() {
  const [search, setSearch] = useState("");

  const filteredCourses = sampleCourses.filter((course) =>
    `${course.code} ${course.title} ${course.department}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-gradient-to-r from-slate-950 to-cyan-900 p-7 text-white">
        <p className="text-sm text-cyan-300">
          Academic Resources
        </p>
        <h2 className="mt-2 text-3xl font-bold">
          Course Catalog
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          Explore available courses, credits, and prerequisites.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <label
          htmlFor="course-search"
          className="mb-2 block text-sm font-semibold"
        >
          Search Courses
        </label>

        <input
          id="course-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by course code or title..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredCourses.map((course) => (
          <article
            key={course.code}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-cyan-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="rounded-lg bg-cyan-100 px-3 py-2 text-sm font-bold text-cyan-800">
                {course.code}
              </span>
              <span className="text-xs text-slate-500">
                {course.credits} Credits
              </span>
            </div>

            <h3 className="mt-5 min-h-12 text-lg font-bold text-slate-900">
              {course.title}
            </h3>

            <div className="mt-5 space-y-3 border-t border-slate-100 pt-4 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-slate-500">
                  Department
                </span>
                <span className="font-semibold">
                  {course.department}
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-slate-500">
                  Prerequisite
                </span>
                <span className="font-semibold">
                  {course.prerequisite}
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>

      {filteredCourses.length === 0 && (
        <div className="rounded-2xl bg-white p-10 text-center text-slate-500">
          No courses found. Try another course code or title.
        </div>
      )}

      <p className="text-xs text-slate-500">
        Demo catalog: course details and prerequisite rules
        are illustrative and must be verified before
        integration with the university database.
      </p>
    </div>
  );
}
