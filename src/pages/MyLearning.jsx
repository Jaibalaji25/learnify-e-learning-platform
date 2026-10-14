import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Clock,
  CheckCircle,
  GraduationCap,
  ArrowRight,
  PlayCircle,
} from "lucide-react";

import courses from "../data/courses";

export default function MyLearning() {
  const [enrollments, setEnrollments] = useState(() =>
    JSON.parse(localStorage.getItem("learnifyEnrollments") || "[]"),
  );

  function markLessonComplete(courseId, lessonIndex, totalLessons) {
    const updated = enrollments.map((enrollment) => {
      if (enrollment.courseId !== courseId) {
        return enrollment;
      }

      const completedLessons = enrollment.completedLessons || [];

      const lessonAlreadyCompleted = completedLessons.includes(lessonIndex);

      const updatedLessons = lessonAlreadyCompleted
        ? completedLessons.filter((index) => index !== lessonIndex)
        : [...completedLessons, lessonIndex];

      const progress = Math.round((updatedLessons.length / totalLessons) * 100);

      return {
        ...enrollment,
        completedLessons: updatedLessons,
        progress,
      };
    });

    setEnrollments(updated);
    localStorage.setItem("learnifyEnrollments", JSON.stringify(updated));
  }

  const enrolledCourses = enrollments
    .map((enrollment) => ({
      ...enrollment,
      course: courses.find((course) => course.id === enrollment.courseId),
    }))
    .filter((enrollment) => enrollment.course);

  const completedCount = enrolledCourses.filter(
    (item) => item.progress === 100,
  ).length;

  const totalLessonsCompleted = enrolledCourses.reduce(
    (total, item) => total + (item.completedLessons || []).length,
    0,
  );

  return (
    <main className="my-learning-page">
      <section className="learning-hero">
        <div className="section-container">
          <span className="section-label">YOUR LEARNING SPACE</span>
          <h1>My Learning</h1>
          <p>Continue your courses and track your learning progress.</p>

          <div className="learning-stats">
            <div className="learning-stat">
              <BookOpen size={25} />
              <div>
                <strong>{enrolledCourses.length}</strong>
                <span>Enrolled Courses</span>
              </div>
            </div>

            <div className="learning-stat">
              <CheckCircle size={25} />
              <div>
                <strong>{completedCount}</strong>
                <span>Completed Courses</span>
              </div>
            </div>

            <div className="learning-stat">
              <GraduationCap size={25} />
              <div>
                <strong>{totalLessonsCompleted}</strong>
                <span>Lessons Completed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container enrolled-section">
        <div className="section-heading">
          <div>
            <h2>My Courses</h2>
            <p className="section-description">
              Your personal learning journey starts here.
            </p>
          </div>

          <Link to="/courses" className="text-link">
            Explore Courses <ArrowRight size={17} />
          </Link>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="empty-state">
            <GraduationCap size={48} />
            <h3>No enrolled courses yet</h3>
            <p>Explore our courses and enroll to start learning.</p>

            <Link to="/courses" className="primary-btn">
              Browse Courses <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="my-courses-list">
            {enrolledCourses.map(({ course, progress, completedLessons }) => {
              const completed = completedLessons || [];
              const totalLessons = course.curriculum.length;

              return (
                <article className="my-course-card" key={course.id}>
                  <img
                    src={course.image}
                    alt={course.title}
                    className="my-course-image"
                  />

                  <div className="my-course-content">
                    <span className="section-label">{course.category}</span>

                    <h3>{course.title}</h3>
                    <p>Instructor: {course.instructor}</p>

                    <div className="progress-label">
                      <span>Course Progress</span>
                      <strong>{progress || 0}%</strong>
                    </div>

                    <div
                      className="progress-track"
                      role="progressbar"
                      aria-label={`${course.title} progress`}
                      aria-valuenow={progress || 0}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div
                        className="progress-fill"
                        style={{ width: `${progress || 0}%` }}
                      />
                    </div>

                    <p className="lesson-summary">
                      {completed.length} of {totalLessons} lessons completed
                    </p>

                    <div className="lesson-checklist">
                      <h4>Lessons</h4>

                      {course.curriculum.map((lesson, index) => {
                        const isCompleted = completed.includes(index);

                        return (
                          <label className="lesson-check-item" key={lesson}>
                            <input
                              type="checkbox"
                              checked={isCompleted}
                              onChange={() =>
                                markLessonComplete(
                                  course.id,
                                  index,
                                  totalLessons,
                                )
                              }
                            />

                            <span>{lesson}</span>

                            {isCompleted && <CheckCircle size={17} />}
                          </label>
                        );
                      })}
                    </div>

                    <Link
                      to={`/courses/${course.id}`}
                      className="continue-learning"
                    >
                      <PlayCircle size={18} />
                      View Course Details
                    </Link>
                  </div>

                  <div className="my-course-duration">
                    <Clock size={16} />
                    {course.duration}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
