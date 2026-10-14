import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Users,
  Search,
  Code,
  Palette,
  Database,
  Sparkles,
} from "lucide-react";

import courses from "../data/courses";
import CourseCard from "../components/CourseCard";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const popularCourses = courses.slice(0, 3);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const categories = [
    { name: "Web Development", icon: Code },
    { name: "Programming", icon: BookOpen },
    { name: "Design", icon: Palette },
    { name: "Data Science", icon: Database },
  ];

  return (
    <main>
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={16} />
              Learn something new every day
            </div>

            <h1>
              Unlock Your Potential
              <span> With Online Learning</span>
            </h1>

            <p>
              Explore expert-led courses, develop valuable skills, and take the
              next step toward your dream career with Learnify.
            </p>

            <div className="hero-buttons">
              <Link to="/courses" className="primary-btn">
                Explore Courses <ArrowRight size={19} />
              </Link>

              <Link to="/register" className="secondary-btn">
                Get Started
              </Link>
            </div>

            <div className="hero-stats">
              <div>
                <strong>1,000+</strong>
                <span>Happy Students</span>
              </div>

              <div>
                <strong>50+</strong>
                <span>Expert Courses</span>
              </div>

              <div>
                <strong>95%</strong>
                <span>Success Rate</span>
              </div>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000"
              alt="Students learning together"
              className="hero-image"
            />

            <div className="floating-card floating-card-top">
              <GraduationCap size={28} />
              <div>
                <strong>Learn Anywhere</strong>
                <span>Your future starts here</span>
              </div>
            </div>

            <div className="floating-card floating-card-bottom">
              <Users size={25} />
              <div>
                <strong>Join Our Community</strong>
                <span>Grow your skills together</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="category-section section-container">
        <div className="section-heading">
          <div>
            <span className="section-label">EXPLORE CATEGORIES</span>
            <h2>What do you want to learn?</h2>
          </div>
          <Link to="/courses" className="text-link">
            View All <ArrowRight size={17} />
          </Link>
        </div>

        <div className="category-grid">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                to={`/courses?category=${encodeURIComponent(category.name)}`}
                className="category-card"
                key={category.name}
              >
                <span className="category-icon">
                  <Icon size={27} />
                </span>

                <h3>{category.name}</h3>
                <span className="category-explore">
                  Explore courses <ArrowRight size={15} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="popular-section">
        <div className="section-container">
          <div className="section-heading">
            <div>
              <span className="section-label">LEARNIFY PICKS</span>
              <h2>Popular courses for you</h2>
              <p className="section-description">
                Start learning with our most popular courses.
              </p>
            </div>

            <Link to="/courses" className="text-link">
              Browse Courses <ArrowRight size={17} />
            </Link>
          </div>

          <div className="course-grid">
            {popularCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      <section className="home-search-section section-container">
        <div className="search-banner">
          <span className="section-label">FIND YOUR NEXT SKILL</span>
          <h2>What would you like to learn today?</h2>
          <p>Search our courses and find the right learning path for you.</p>

          <form
            className="hero-search"
            onSubmit={(event) => {
              event.preventDefault();

              window.location.href = `/courses?search=${encodeURIComponent(
                searchTerm,
              )}`;
            }}
          >
            <Search size={21} />

            <input
              type="search"
              placeholder="Search for React, Java, Python..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />

            <button type="submit">Search Courses</button>
          </form>

          {searchTerm.trim() && (
            <p className="search-hint">
              {filteredCourses.length} matching course(s) in our current
              catalog.
            </p>
          )}
        </div>
      </section>

      <section className="cta-section section-container">
        <div className="cta-card">
          <div>
            <span className="section-label">YOUR JOURNEY STARTS HERE</span>
            <h2>Ready to build your future?</h2>
            <p>Create your free account and start learning at your own pace.</p>
          </div>

          <Link to="/register" className="cta-btn">
            Join Learnify <ArrowRight size={19} />
          </Link>
        </div>
      </section>
    </main>
  );
}
