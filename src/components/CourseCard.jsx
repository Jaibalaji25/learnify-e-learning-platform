import { Link } from "react-router-dom";
import { Clock, BookOpen, Star, ArrowRight } from "lucide-react";

export default function CourseCard({ course }) {
  return (
    <article className="course-card">
      <Link to={`/courses/${course.id}`} className="course-image-link">
        <img src={course.image} alt={course.title} className="course-image" />

        <span className="course-category">{course.category}</span>
      </Link>

      <div className="course-card-body">
        <div className="course-rating">
          <Star size={16} fill="#f5a623" color="#f5a623" />
          <span>{course.rating}</span>
          <span className="student-count">
            ({course.students.toLocaleString()} students)
          </span>
        </div>

        <h3>
          <Link to={`/courses/${course.id}`}>{course.title}</Link>
        </h3>

        <p className="course-instructor">By {course.instructor}</p>

        <div className="course-meta">
          <span>
            <Clock size={16} />
            {course.duration}
          </span>

          <span>
            <BookOpen size={16} />
            {course.lessons} lessons
          </span>
        </div>

        <div className="course-card-footer">
          <strong className="course-price">
            {course.price === 0
              ? "Free"
              : `₹${course.price.toLocaleString("en-IN")}`}
          </strong>

          <Link
            to={`/courses/${course.id}`}
            className="course-arrow"
            aria-label={`View ${course.title}`}
          >
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </article>
  );
}
