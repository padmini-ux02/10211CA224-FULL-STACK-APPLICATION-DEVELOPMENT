import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getUser } from "../data";

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    if (!user || !localStorage.getItem("token")) { navigate("/login"); return; }
    const fetch = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/courses");
        setCourses(data.filter(c => c.instructorId?._id === user.id || c.instructorId === user.id));
      } catch { } finally { setLoading(false); }
    };
    fetch();
  }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      setCourses(courses.filter(c => c._id !== id));
    } catch { alert("Error deleting course."); }
  };

  return (
    <div style={{ minHeight: "calc(100vh - 70px)", background: "#f8fafc" }}>
      <div style={{ background: "linear-gradient(135deg, #1e293b, #334155)", padding: "50px 40px", color: "white" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "8px" }}>Instructor Dashboard 🎓</h1>
          <p style={{ color: "rgba(255,255,255,0.7)" }}>Welcome, <strong style={{ color: "#10b981" }}>{user?.name}</strong>! Manage your courses.</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ maxWidth: 1100, margin: "-30px auto 0", padding: "0 40px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
          {[
            { icon: "📚", label: "Total Courses", value: courses.length, color: "#4f46e5" },
            { icon: "👥", label: "Est. Students", value: courses.length * 15, color: "#10b981" },
            { icon: "⭐", label: "Avg Rating", value: "4.8", color: "#f59e0b" },
            { icon: "💰", label: "Revenue", value: "$" + courses.reduce((s, c) => s + (c.price || 0), 0), color: "#7c3aed" },
          ].map((s, i) => (
            <div key={i} style={{ background: "white", borderRadius: "14px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", textAlign: "center" }}>
              <span style={{ fontSize: "2rem" }}>{s.icon}</span>
              <h3 style={{ fontSize: "2rem", fontWeight: 800, color: s.color, margin: "8px 0 4px" }}>{s.value}</h3>
              <p style={{ color: "#6b7280", fontSize: "0.85rem", margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1e293b" }}>My Created Courses</h2>
          <Link to="/create-course" className="btn" style={{ textDecoration: "none" }}>+ Create New Course</Link>
        </div>

        {loading ? (
          <p style={{ color: "#6b7280", textAlign: "center", padding: "40px" }}>Loading...</p>
        ) : courses.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px", background: "white", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
            <span style={{ fontSize: "4rem" }}>🎯</span>
            <h3 style={{ marginTop: "16px", color: "#1e293b" }}>No Courses Created Yet</h3>
            <p style={{ color: "#6b7280", marginTop: "8px", marginBottom: "24px" }}>Start sharing your knowledge!</p>
            <Link to="/create-course" className="btn" style={{ textDecoration: "none" }}>Create First Course</Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {courses.map((c) => (
              <div key={c._id} style={{
                background: "white", borderRadius: "14px", padding: "24px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)", display: "flex",
                justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px",
              }}>
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <h3 style={{ fontWeight: 700, color: "#1e293b", marginBottom: "6px" }}>{c.title}</h3>
                  <p style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: "8px" }}>{c.description}</p>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <span style={{ background: "#f0fdf4", color: "#16a34a", padding: "4px 12px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600 }}>💰 ${c.price}</span>
                    <span style={{ background: "#eff6ff", color: "#2563eb", padding: "4px 12px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600 }}>📅 {new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <button onClick={() => handleDelete(c._id, c.title)} style={{
                  padding: "10px 20px", background: "#fee2e2", color: "#dc2626",
                  border: "none", borderRadius: "10px", fontWeight: 600, cursor: "pointer",
                }}>🗑️ Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorDashboard;
