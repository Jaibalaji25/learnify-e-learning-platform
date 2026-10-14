import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import MyLearning from "./pages/MyLearning";
import Login from "./pages/Login";
import Register from "./pages/Register";

function NotFound() {
  return (
    <main className="not-found section-container">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <a href="/" className="primary-btn">
        Back to Home
      </a>
    </main>
  );
}

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/my-learning" element={<MyLearning />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <footer className="site-footer">
        <div className="section-container footer-content">
          <a href="/" className="footer-logo">
            Learnify
          </a>
          <p>Learn today. Grow tomorrow.</p>
          <p>© {new Date().getFullYear()} Learnify. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
