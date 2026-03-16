import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CreateCourse = () => {
  const [formData, setFormData] = useState({ title: "", description: "", price: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/courses", formData, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      alert("🎉 Course published successfully!");
      navigate("/instructor-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Error creating course.");
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "calc(100vh - 70px)", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #f8fafc, #e2e8f0)", padding: "40px 20px",
    }}>
      <div style={{
        background: "white", borderRadius: "20px", padding: "48px 40px", width: "100%", maxWidth: "540px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
      }}>
        <Link to="/instructor-dashboard" style={{ color: "#6b7280", textDecoration: "none", fontSize: "0.9rem" }}>← Back to Dashboard</Link>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1e293b", marginTop: "16px", marginBottom: "8px" }}>Create New Course 📝</h1>
        <p style={{ color: "#6b7280", marginBottom: "32px" }}>Share your expertise with learners worldwide</p>
        {error && <div style={{ background: "#fef2f2", color: "#dc2626", padding: "12px 16px", borderRadius: "10px", marginBottom: "20px", borderLeft: "4px solid #dc2626" }}>{error}</div>}
        <form onSubmit={handle}>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: 600, color: "#374151", fontSize: "0.9rem" }}>Course Title</label>
            <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g., Complete React.js Bootcamp" required />
          </div>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: 600, color: "#374151", fontSize: "0.9rem" }}>Description</label>
            <textarea rows={4} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Describe what students will learn..." required style={{ resize: "vertical" }} />
          </div>
          <div style={{ marginBottom: "28px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: 600, color: "#374151", fontSize: "0.9rem" }}>Price (USD)</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#6b7280", fontWeight: 600 }}>$</span>
              <input type="number" min="0" step="0.01" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} placeholder="49.99" required style={{ paddingLeft: "32px" }} />
            </div>
          </div>
          <button type="submit" className="btn" disabled={loading} style={{ width: "100%", padding: "14px", fontSize: "1rem", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Publishing..." : "🚀 Publish Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
