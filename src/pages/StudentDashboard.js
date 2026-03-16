import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { COURSES, getUser, getEnrolled, saveEnrolled, getCompleted } from "../data";

const StudentDashboard = () => {
  const [enrolled, setEnrolled] = useState([]);
  const [completed, setCompleted] = useState([]);
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    if (!user || !localStorage.getItem("token")) { navigate("/login"); return; }
    const enrolledList = getEnrolled();
    const completedIds = getCompleted().map(c => c._id);
    setEnrolled(enrolledList);
    setCompleted(getCompleted());
  }, []);

  const handleUnenroll = (courseId, courseTitle) => {
    if (!window.confirm(`Are you sure you want to cancel enrollment from "${courseTitle}"?`)) return;
    const updated = getEnrolled().filter(c => c._id !== courseId);
    saveEnrolled(updated);
    setEnrolled(updated);
    alert("✅ Successfully unenrolled from the course.");
  };

  const completedIds = completed.map(c => c._id);

  return (
    <div style={{ minHeight: "calc(100vh - 70px)", background: "#f8fafc" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1e293b, #334155)", padding: "50px 40px", color: "white" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "8px" }}>
            Welcome back, <span style={{ color: "#10b981" }}>{user?.name || "Student"}</span> 👋
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem" }}>
            Learn, take quizzes, and earn certificates!
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ maxWidth: 1100, margin: "-30px auto 0", padding: "0 40px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
          {[
            { icon: "📚", label: "Enrolled Courses", value: enrolled.length, color: "#4f46e5" },
            { icon: "🏆", label: "Completed", value: completed.length, color: "#10b981" },
            { icon: "⏳", label: "In Progress", value: enrolled.length - completed.length, color: "#f59e0b" },
            { icon: "🎓", label: "Certificates", value: completed.length, color: "#7c3aed" },
          ].map((s, i) => (
            <div key={i} style={{
              background: "white", borderRadius: "14px", padding: "24px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)", textAlign: "center",
              border: "1px solid rgba(0,0,0,0.04)",
            }}>
              <span style={{ fontSize: "2rem" }}>{s.icon}</span>
              <h3 style={{ fontSize: "2rem", fontWeight: 800, color: s.color, margin: "8px 0 4px" }}>{s.value}</h3>
              <p style={{ color: "#6b7280", fontSize: "0.85rem", margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Courses & Certificates */}
      {completed.length > 0 && (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 40px 0" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1e293b", marginBottom: "20px" }}>
            🏆 Completed Courses & Certificates
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
            {completed.map((c, i) => {
              const cdata = COURSES.find(x => x._id === c._id) || c;
              return (
                <div key={i} style={{
                  background: "white", borderRadius: "14px", padding: "20px",
                  border: "2px solid #10b981", boxShadow: "0 4px 16px rgba(16,185,129,0.1)",
                  display: "flex", alignItems: "center", gap: "16px",
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "12px",
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.8rem", flexShrink: 0,
                  }}>🏆</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b", marginBottom: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {cdata.title}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                      Score: {c.score}/10 · {new Date(c.completedDate).toLocaleDateString()}
                    </div>
                    <Link to={`/certificate/${c._id}`} style={{
                      display: "inline-block", marginTop: "8px", padding: "5px 14px",
                      background: "#f0fdf4", color: "#10b981", borderRadius: "20px",
                      textDecoration: "none", fontWeight: 600, fontSize: "0.8rem",
                    }}>
                      View Certificate →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Enrolled Courses */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1e293b" }}>
            📖 My Enrolled Courses
          </h2>
          <Link to="/courses" className="btn" style={{ textDecoration: "none", padding: "10px 24px", fontSize: "0.9rem" }}>
            + Browse More Courses
          </Link>
        </div>

        {enrolled.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "60px 40px", background: "white",
            borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          }}>
            <span style={{ fontSize: "4rem" }}>📖</span>
            <h3 style={{ marginTop: "16px", color: "#1e293b", fontSize: "1.3rem" }}>No Courses Yet</h3>
            <p style={{ color: "#6b7280", marginTop: "8px", marginBottom: "24px" }}>Start exploring and enroll in a course!</p>
            <Link to="/courses" className="btn" style={{ textDecoration: "none" }}>Browse Courses</Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
            {enrolled.map((course, index) => {
              const cdata = COURSES.find(c => c._id === course._id) || course;
              const isCompleted = completedIds.includes(course._id);
              const completedInfo = completed.find(c => c._id === course._id);
              return (
                <div key={course._id || index} style={{
                  background: "white", borderRadius: "16px", overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                  border: isCompleted ? "2px solid #10b981" : "1px solid rgba(0,0,0,0.05)",
                }}>
                  <div style={{ position: "relative" }}>
                    <img
                      src={cdata.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400"}
                      alt={cdata.title}
                      style={{ width: "100%", height: "170px", objectFit: "cover", display: "block" }}
                    />
                    {isCompleted && (
                      <div style={{
                        position: "absolute", top: 12, right: 12,
                        background: "#10b981", color: "white", padding: "4px 12px",
                        borderRadius: "20px", fontWeight: 700, fontSize: "0.8rem",
                      }}>✓ Completed</div>
                    )}
                  </div>
                  <div style={{ padding: "20px" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1e293b", marginBottom: "6px" }}>{cdata.title}</h3>
                    <p style={{ color: "#6b7280", fontSize: "0.82rem", marginBottom: "8px" }}>
                      👤 {cdata.instructor} &nbsp;·&nbsp; ⏱ {cdata.duration}
                    </p>
                    <p style={{ color: "#9ca3af", fontSize: "0.78rem", marginBottom: "14px" }}>
                      Enrolled: {new Date(course.enrolledDate || Date.now()).toLocaleDateString()}
                      {isCompleted && ` · Score: ${completedInfo?.score}/10`}
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {/* Primary Action */}
                      {isCompleted ? (
                        <Link to={`/certificate/${course._id}`} className="btn btn-success" style={{ textDecoration: "none", textAlign: "center", padding: "10px" }}>
                          🏆 View Certificate
                        </Link>
                      ) : (
                        <Link to={`/quiz/${course._id}`} className="btn" style={{ textDecoration: "none", textAlign: "center", padding: "10px" }}>
                          🧪 Take Quiz to Complete
                        </Link>
                      )}

                      {/* Secondary Actions */}
                      <div style={{ display: "flex", gap: "8px" }}>
                        <Link to={`/course/${course._id}`} style={{
                          flex: 1, padding: "9px", background: "#f8fafc", color: "#374151",
                          borderRadius: "8px", textDecoration: "none", fontWeight: 600,
                          fontSize: "0.85rem", textAlign: "center", border: "1px solid #e2e8f0",
                        }}>
                          📖 View Content
                        </Link>
                        <button
                          onClick={() => handleUnenroll(course._id, cdata.title)}
                          style={{
                            padding: "9px 14px", background: "#fef2f2", color: "#dc2626",
                            border: "1px solid #fecaca", borderRadius: "8px", fontWeight: 600,
                            fontSize: "0.85rem", cursor: "pointer",
                          }}
                          title="Cancel Enrollment"
                        >
                          ✕ Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
