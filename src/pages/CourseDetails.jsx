import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Clock,
  BookOpen,
  Star,
  CheckCircle,
  GraduationCap,
  ArrowLeft,
} from "lucide-react";

import courses from "../data/courses";

export default function CourseDetails() {
  const { id } = useParams();

  const course = courses.find((item) => item.id === Number(id));

  const [enrolled, setEnrolled] = useState(() => {
    const saved = JSON.parse(
      localStorage.getItem("learnifyEnrollments") || "[]",
    );

    return saved.some((item) => item.courseId === Number(id));
  });

  function handleEnroll() {
    const saved = JSON.parse(
      localStorage.getItem("learnifyEnrollments") || "[]",
    );

    const alreadyEnrolled = saved.some((item) => item.courseId === course.id);

    if (!alreadyEnrolled) {
      saved.push({
        courseId: course.id,
        progress: 0,
        completedLessons: [],
      });

      localStorage.setItem("learnifyEnrollments", JSON.stringify(saved));
    }

    setEnrolled(true);
  }

  if (!course) {
    return (
      <main className="not-found section-container">
        <h1>Course Not Found</h1>
        <p>Sorry, we couldn't find that course.</p>
        <Link to="/courses" className="primary-btn">
          <ArrowLeft size={18} /> Back to Courses
        </Link>
      </main>
    );
  }

  return (
    <main className="course-details-page">
      <div className="section-container">
        <Link to="/courses" className="back-link">
          <ArrowLeft size={18} /> Back to Courses
        </Link>

        <div className="details-layout">
          <section className="details-main">
            <span className="section-label">{course.category}</span>

            <h1>{course.title}</h1>

            <p className="details-description">{course.description}</p>

            <div className="details-meta">
              <span>
                <Star size={17} fill="#f5a623" color="#f5a623" />
                {course.rating} rating
              </span>

              <span>
                <GraduationCap size={18} />
                {course.students.toLocaleString()} students
              </span>

              <span>
                <Clock size={18} />
                {course.duration}
              </span>
            </div>

            <img
              src={course.image}
              alt={course.title}
              className="details-image"
            />

            <div className="curriculum-section">
              <h2>Course Curriculum</h2>

              <p>Explore the topics covered in this course.</p>

              <div className="curriculum-list">
                {course.curriculum.map((lesson, index) => (
                  <div className="curriculum-item" key={lesson}>
                    <span className="lesson-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span>{lesson}</span>

                    <BookOpen size={18} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="enrollment-card">
            <img src={course.image} alt="" className="enrollment-image" />

            <div className="enrollment-card-body">
              <div className="enrollment-price">
                {course.price === 0
                  ? "Free"
                  : `₹${course.price.toLocaleString("en-IN")}`}
              </div>

              <p>Start learning at your own pace.</p>

              <button
                type="button"
                className="primary-btn enroll-btn"
                onClick={handleEnroll}
                disabled={enrolled}
              >
                {enrolled ? (
                  <>
                    <CheckCircle size={19} /> Already Enrolled
                  </>
                ) : (
                  "Enroll Now"
                )}
              </button>

              {enrolled && (
                <p className="success-message">
                  You're enrolled! Your course is ready.
                </p>
              )}

              <div className="enrollment-benefits">
                <span>
                  <CheckCircle size={17} /> {course.lessons} lessons
                </span>

                <span>
                  <CheckCircle size={17} /> {course.level} level
                </span>

                <span>
                  <CheckCircle size={17} /> Track your progress
                </span>
              </div>

              {enrolled && (
                <Link to="/my-learning" className="learning-link">
                  Go to My Learning
                </Link>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
