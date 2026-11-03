
import { useState } from "react";

const demoCourses = [
  {
    code: "CSE225",
    title: "Data Structures and Algorithms",
    credits: 3,
    prerequisites: ["CSE115"],
    reason: "Builds foundational algorithm and data structure skills.",
  },
  {
    code: "CSE273",
    title: "Introduction to Theory of Computation",
    credits: 3,
    prerequisites: ["CSE173"],
    reason: "Develops knowledge of automata and formal languages.",
  },
  {
    code: "CSE327",
    title: "Software Engineering",
    credits: 3,
    prerequisites: ["CSE225"],
    reason: "Introduces software development processes and teamwork.",
  },
  {
    code: "CSE331",
    title: "Computer Organization and Architecture",
    credits: 3,
    prerequisites: ["CSE225"],
    reason: "Builds understanding of computer hardware and architecture.",
  },
];

const demoCompletedCourses = ["CSE115", "CSE173", "CSE225"];

export default function CourseAdvisor() {
  const [completedCourses, setCompletedCourses] = useState(
    demoCompletedCourses
  );

  const [recommendations, setRecommendations] = useState(null);

  const toggleCompletedCourse = (code) => {
    setCompletedCourses((current) =>
      current.includes(code)
        ? current.filter((item) => item !== code)
        : [...current, code]
    );
    setRecommendations(null);
  };

  const generateRecommendations = () => {
    const results = demoCourses.map((course) => {
      const missingPrerequisites = course.prerequisites.filter(
        (code) => !completedCourses.includes(code)
      );

      const alreadyCompleted = completedCourses.includes(course.code);

      return {
        ...course,
        eligible: !alreadyCompleted && missingPrerequisites.length === 0,
        alreadyCompleted,
        missingPrerequisites,
      };
    });

    setRecommendations(results);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-gradient-to-r from-slate-950 to-cyan-900 p-7 text-white">
        <p className="text-sm text-cyan-300">
          Academic Planning
        </p>
        <h2 className="mt-2 text-3xl font-bold">
          Course Advisor
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          Explore course recommendations based on completed
          prerequisites and academic progress.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900">
          Completed Courses
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Select the courses completed by the demo student.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          {["CSE115", "CSE173", "CSE225"].map((code) => (
            <label
              key={code}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm"
            >
              <input
                type="checkbox"
                checked={completedCourses.includes(code)}
                onChange={() => toggleCompletedCourse(code)}
                className="h-4 w-4 accent-cyan-600"
              />
              <span className="font-semibold">{code}</span>
            </label>
          ))}
        </div>

        <button
          type="button"
          onClick={generateRecommendations}
          className="mt-6 rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Generate Recommendations
        </button>
      </section>

      {recommendations && (
        <>
          <section className="grid gap-5 sm:grid-cols-3">
            {[
              {
                label: "Courses Evaluated",
                value: recommendations.length,
              },
              {
                label: "Eligible Courses",
                value: recommendations.filter(
                  (course) => course.eligible
                ).length,
              },
              {
                label: "Eligible Credits",
                value: recommendations
                  .filter((course) => course.eligible)
                  .reduce(
                    (total, course) => total + course.credits,
                    0
                  ),
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-sm text-slate-500">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-bold">
                  {stat.value}
                </p>
              </div>
            ))}
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-bold">
              Recommendation Results
            </h3>

            {recommendations.map((course) => (
              <article
                key={course.code}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-lg bg-cyan-100 px-3 py-2 text-sm font-bold text-cyan-800">
                    {course.code}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      course.alreadyCompleted
                        ? "bg-slate-100 text-slate-600"
                        : course.eligible
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {course.alreadyCompleted
                      ? "Already Completed"
                      : course.eligible
                        ? "Eligible"
                        : "Prerequisites Missing"}
                  </span>
                </div>

                <h4 className="mt-4 text-lg font-bold">
                  {course.title}
                </h4>

                <p className="mt-2 text-sm text-slate-500">
                  {course.reason}
                </p>

                <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm">
                  <p className="font-semibold">
                    Recommendation Explanation
                  </p>

                  <p className="mt-2 text-slate-600">
                    {course.alreadyCompleted
                      ? "This course is already marked as completed."
                      : course.eligible
                        ? "All listed prerequisites are satisfied. This course is eligible under the demo prerequisite rules."
                        : `Missing prerequisite(s): ${course.missingPrerequisites.join(", ")}.`}
                  </p>
                </div>
              </article>
            ))}
          </section>
        </>
      )}

      <p className="text-xs text-slate-500">
        Demo rule-based advisor: recommendations are based
        only on the sample prerequisite data and selected
        completion records. They do not verify actual
        university policies, course offerings, timetable
        conflicts, or credit limits.
      </p>
    </div>
  );
}
