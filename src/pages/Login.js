import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "calc(100vh - 70px)", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #f8fafc, #e2e8f0)", padding: "40px 20px",
    }}>
      <div style={{
        background: "white", borderRadius: "20px", padding: "48px 40px", width: "100%", maxWidth: "440px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.05)",
      }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>👋</div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1e293b", marginBottom: "8px" }}>Welcome Back</h1>
          <p style={{ color: "#6b7280" }}>Sign in to continue learning</p>
        </div>
        {error && <div style={{ background: "#fef2f2", color: "#dc2626", padding: "12px 16px", borderRadius: "10px", marginBottom: "20px", borderLeft: "4px solid #dc2626", fontSize: "0.9rem" }}>{error}</div>}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: 600, color: "#374151", fontSize: "0.9rem" }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: 600, color: "#374151", fontSize: "0.9rem" }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required />
          </div>
          <button type="submit" className="btn" disabled={loading} style={{ width: "100%", padding: "14px", opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "24px", color: "#6b7280", fontSize: "0.95rem" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#4f46e5", fontWeight: 700, textDecoration: "none" }}>Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
