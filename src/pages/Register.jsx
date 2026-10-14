import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleRegister(event) {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const savedUsers = JSON.parse(
      localStorage.getItem("learnifyUsers") || "[]",
    );

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = savedUsers.some(
      (user) => user.email.toLowerCase() === normalizedEmail,
    );

    if (existingUser) {
      setError("This email is already registered. Please sign in.");
      return;
    }

    const newUser = {
      name: name.trim(),
      email: normalizedEmail,
      password,
    };

    localStorage.setItem(
      "learnifyUsers",
      JSON.stringify([...savedUsers, newUser]),
    );

    navigate("/login");
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link to="/" className="auth-logo">
          <span className="logo-icon">
            <BookOpen size={27} />
          </span>
          <span>Learnify</span>
        </Link>

        <div className="auth-heading">
          <span className="section-label">START YOUR JOURNEY</span>
          <h1>Create your account</h1>
          <p>Join Learnify and start learning new skills.</p>
        </div>

        <form className="auth-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="register-name">Full Name</label>

            <input
              id="register-name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-email">Email Address</label>

            <input
              id="register-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-password">Password</label>

            <div className="password-field">
              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                placeholder="At least 8 characters"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={8}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>

            <input
              id="confirm-password"
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              minLength={8}
              required
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="primary-btn auth-submit">
            Create Account <ArrowRight size={19} />
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>

        <p className="auth-note">
          Demo project: your account details are saved in this browser.
        </p>
      </section>
    </main>
  );
}
