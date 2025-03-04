import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);

    // Simple login validation (you can replace this with actual logic)
    if (email && password) {
      // Redirect to WebScraper page after successful login
      navigate("/webscraper");
    } else {
      setError("Please enter a valid email and password.");
    }
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f7fafc",
  };

  const formStyle = {
    backgroundColor: "white",
    padding: "32px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  };

  const headingStyle = {
    fontSize: "24px",
    fontWeight: "600",
    color: "#2d3748",
    textAlign: "center",
    marginBottom: "12px",
  };

  const paragraphStyle = {
    color: "#4a5568",
    textAlign: "center",
    marginBottom: "24px",
  };

  const labelStyle = {
    display: "block",
    color: "#4a5568",
    fontWeight: "500",
    marginBottom: "8px",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    marginBottom: "16px",
    fontSize: "16px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#3182ce",
    color: "white",
    fontWeight: "600",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: "#2b6cb0",
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={headingStyle}>Login</h2>
        <p style={paragraphStyle}>Access your account securely</p>

        <form onSubmit={handleLogin}>
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
          <div style={{ textAlign: "right", marginBottom: "16px" }}>
            <Link to="/forgot-password" style={{ color: "#3182ce", textDecoration: "underline" }}>
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
            onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
          >
            Login
          </button>
        </form>

        <p style={{ textAlign: "center", color: "#4a5568", marginTop: "16px" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#3182ce", textDecoration: "underline" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
