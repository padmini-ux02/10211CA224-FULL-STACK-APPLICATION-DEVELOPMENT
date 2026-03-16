import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "Student" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/register", formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
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
        boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
      }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>🚀</div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1e293b", marginBottom: "8px" }}>Create Account</h1>
          <p style={{ color: "#6b7280" }}>Start your learning journey today</p>
        </div>
        {error && <div style={{ background: "#fef2f2", color: "#dc2626", padding: "12px 16px", borderRadius: "10px", marginBottom: "20px", borderLeft: "4px solid #dc2626" }}>{error}</div>}
        <form onSubmit={handle}>
          {[
            { label: "Full Name", type: "text", key: "name", placeholder: "John Doe" },
            { label: "Email Address", type: "email", key: "email", placeholder: "you@example.com" },
            { label: "Password", type: "password", key: "password", placeholder: "Create strong password" },
          ].map(f => (
            <div key={f.key} style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: 600, color: "#374151", fontSize: "0.9rem" }}>{f.label}</label>
              <input type={f.type} value={formData[f.key]} onChange={e => setFormData({ ...formData, [f.key]: e.target.value })} placeholder={f.placeholder} required />
            </div>
          ))}
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: 600, color: "#374151", fontSize: "0.9rem" }}>I want to join as</label>
            <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}>
              <option value="Student">📖 Student — Learn & earn certificates</option>
              <option value="Instructor">👩‍🏫 Instructor — Create & manage courses</option>
            </select>
          </div>
          <button type="submit" className="btn" disabled={loading} style={{ width: "100%", padding: "14px", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Creating Account..." : "Create Account →"}
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "24px", color: "#6b7280", fontSize: "0.95rem" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#4f46e5", fontWeight: 700, textDecoration: "none" }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
