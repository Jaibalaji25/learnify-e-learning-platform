import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(event) {
    event.preventDefault();
    setError("");

    const savedUsers = JSON.parse(
      localStorage.getItem("learnifyUsers") || "[]",
    );

    const user = savedUsers.find(
      (item) =>
        item.email.toLowerCase() === email.trim().toLowerCase() &&
        item.password === password,
    );

    if (!user) {
      setError("Invalid email or password. Please register first.");
      return;
    }

    localStorage.setItem(
      "learnifyCurrentUser",
      JSON.stringify({
        name: user.name,
        email: user.email,
      }),
    );

    navigate("/my-learning");
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
          <span className="section-label">WELCOME BACK</span>
          <h1>Sign in to Learnify</h1>
          <p>Continue learning and reach your goals.</p>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="login-email">Email Address</label>

            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>

            <div className="password-field">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
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

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="primary-btn auth-submit">
            Sign In <ArrowRight size={19} />
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Create an account</Link>
        </p>

        <p className="auth-note">
          Demo project: register an account first, then sign in using those
          details.
        </p>
      </section>
    </main>
  );
}
