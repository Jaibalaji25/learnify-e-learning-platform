import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, BookOpen } from "lucide-react";

import courses from "../data/courses";
import CourseCard from "../components/CourseCard";

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All",
  );

  const [selectedLevel, setSelectedLevel] = useState("All");

  const categories = [
    "All",
    ...new Set(courses.map((course) => course.category)),
  ];

  const levels = ["All", "Beginner", "Intermediate"];

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        course.title.toLowerCase().includes(search) ||
        course.instructor.toLowerCase().includes(search) ||
        course.category.toLowerCase().includes(search);

      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;

      const matchesLevel =
        selectedLevel === "All" || course.level === selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchTerm, selectedCategory, selectedLevel]);

  function handleSearch(event) {
    event.preventDefault();

    const params = new URLSearchParams();

    if (searchTerm.trim()) {
      params.set("search", searchTerm.trim());
    }

    if (selectedCategory !== "All") {
      params.set("category", selectedCategory);
    }

    setSearchParams(params);
  }

  return (
    <main className="courses-page">
      <section className="courses-hero">
        <div className="section-container">
          <span className="section-label">EXPLORE LEARNIFY</span>

          <h1>Discover Your Next Course</h1>

          <p>
            Find the right course to build new skills and achieve your goals.
          </p>

          <form className="courses-search" onSubmit={handleSearch}>
            <Search size={21} />

            <input
              type="search"
              placeholder="Search courses, topics, or instructors..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />

            <button type="submit">Search</button>
          </form>
        </div>
      </section>

      <section className="section-container courses-content">
        <div className="courses-toolbar">
          <div>
            <h2>All Courses</h2>
            <p>
              Showing {filteredCourses.length} of {courses.length} courses
            </p>
          </div>

          <div className="level-filter">
            <SlidersHorizontal size={18} />

            <label htmlFor="level-filter">Level:</label>

            <select
              id="level-filter"
              value={selectedLevel}
              onChange={(event) => setSelectedLevel(event.target.value)}
            >
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="courses-layout">
          <aside className="category-sidebar">
            <h3>
              <BookOpen size={19} /> Categories
            </h3>

            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={
                  selectedCategory === category ? "category-active" : ""
                }
                onClick={() => {
                  setSelectedCategory(category);

                  const params = new URLSearchParams(searchParams);

                  if (category === "All") {
                    params.delete("category");
                  } else {
                    params.set("category", category);
                  }

                  setSearchParams(params);
                }}
              >
                {category}
                <span>
                  {category === "All"
                    ? courses.length
                    : courses.filter((course) => course.category === category)
                        .length}
                </span>
              </button>
            ))}
          </aside>

          <div className="courses-results">
            {filteredCourses.length > 0 ? (
              <div className="course-grid">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <Search size={42} />
                <h3>No courses found</h3>
                <p>Try a different search term or category.</p>

                <button
                  type="button"
                  className="primary-btn"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                    setSelectedLevel("All");
                    setSearchParams({});
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
