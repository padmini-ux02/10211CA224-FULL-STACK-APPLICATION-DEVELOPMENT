import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { COURSES, getUser, getEnrolled, saveEnrolled, getCompleted } from "../data";

const Courses = () => {
  const [enrolled, setEnrolled] = useState([]);
  const [completed, setCompleted] = useState([]);
  const user = getUser();

  useEffect(() => {
    setEnrolled(getEnrolled().map(c => c._id));
    setCompleted(getCompleted().map(c => c._id));
  }, []);

  const handleEnroll = (course) => {
    if (!user) { alert("Please login to enroll!"); return; }
    if (enrolled.includes(course._id)) { alert("Already enrolled!"); return; }
    const list = getEnrolled();
    list.push({ ...course, enrolledDate: new Date().toISOString() });
    saveEnrolled(list);
    setEnrolled([...enrolled, course._id]);
    alert(`🎉 Enrolled in "${course.title}"! Go to your dashboard to start learning.`);
  };

  const levelColor = { Beginner: "#10b981", Intermediate: "#f59e0b", Advanced: "#ef4444" };

  return (
    <div style={{ padding: "40px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "10px" }}>
          Explore Our <span style={{ color: "#4f46e5" }}>Courses</span>
        </h1>
        <p style={{ color: "#6b7280", fontSize: "1.05rem" }}>
          Enroll, learn, take the quiz, and earn your certificate!
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "28px" }}>
        {COURSES.map((c) => {
          const isEnrolled = enrolled.includes(c._id);
          const isCompleted = completed.includes(c._id);
          return (
            <div key={c._id} style={{
              background: "white", borderRadius: "16px", overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: isCompleted ? "2px solid #10b981" : "1px solid rgba(0,0,0,0.05)",
              transition: "transform 0.2s, box-shadow 0.2s",
              position: "relative",
            }}>
              {isCompleted && (
                <div style={{
                  position: "absolute", top: 12, right: 12, zIndex: 10,
                  background: "#10b981", color: "white", padding: "4px 12px",
                  borderRadius: "20px", fontWeight: 700, fontSize: "0.8rem",
                }}>✓ Completed</div>
              )}
              <Link to={`/course/${c._id}`}>
                <img src={c.image} alt={c.title} style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }} />
              </Link>
              <div style={{ padding: "24px" }}>
                <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                  <span style={{ background: `${levelColor[c.level]}20`, color: levelColor[c.level], padding: "4px 12px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600 }}>
                    {c.level}
                  </span>
                  <span style={{ background: "#f5f3ff", color: "#7c3aed", padding: "4px 12px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600 }}>
                    {c.duration}
                  </span>
                </div>
                <Link to={`/course/${c._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#1e293b", marginBottom: "8px" }}>{c.title}</h3>
                </Link>
                <p style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "14px", minHeight: "54px" }}>{c.shortDesc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <span style={{ color: "#6b7280", fontSize: "0.85rem" }}>👤 {c.instructor}</span>
                  <span style={{ color: "#6b7280", fontSize: "0.85rem" }}>📚 {c.lessons} lessons</span>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <Link to={`/course/${c._id}`} style={{
                    flex: 1, padding: "10px", background: "#f8fafc", color: "#4f46e5",
                    border: "1px solid #e2e8f0", borderRadius: "10px", textDecoration: "none",
                    fontWeight: 600, fontSize: "0.9rem", textAlign: "center",
                  }}>
                    View Details
                  </Link>
                  <button
                    onClick={() => handleEnroll(c)}
                    disabled={isEnrolled || isCompleted}
                    style={{
                      flex: 1, padding: "10px",
                      background: isCompleted ? "#10b981" : isEnrolled ? "#d1d5db" : "#4f46e5",
                      color: "white", border: "none", borderRadius: "10px",
                      fontWeight: 600, fontSize: "0.9rem",
                      cursor: isEnrolled || isCompleted ? "default" : "pointer",
                      boxShadow: isEnrolled || isCompleted ? "none" : "0 4px 12px rgba(79,70,229,0.2)",
                    }}
                  >
                    {isCompleted ? "✓ Completed" : isEnrolled ? "✓ Enrolled" : "Enroll Now"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
