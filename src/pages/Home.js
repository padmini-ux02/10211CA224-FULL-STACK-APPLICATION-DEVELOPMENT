import React from "react";
import { Link } from "react-router-dom";
import { COURSES, getUser, getEnrolled, getCompleted } from "../data";

const Home = () => {
  const user = getUser();
  const completedCount = getCompleted().length;
  const enrolledCount = getEnrolled().length;

  return (
    <div>
      {/* Hero */}
      <div style={{
        minHeight: "92vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        padding: "60px 20px", position: "relative", overflow: "hidden",
      }}>
        {/* Decoration circles */}
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "rgba(79,70,229,0.08)", top: -100, right: -100 }} />
        <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "rgba(16,185,129,0.06)", bottom: -50, left: -50 }} />

        <div style={{ position: "relative", maxWidth: "780px" }}>
          <span style={{
            display: "inline-block", padding: "8px 20px", background: "rgba(79,70,229,0.15)",
            borderRadius: "50px", color: "#a5b4fc", fontWeight: 600, fontSize: "0.85rem",
            marginBottom: "24px", border: "1px solid rgba(79,70,229,0.3)", letterSpacing: "0.5px",
          }}>🎓 LEARN • TEST • CERTIFY</span>

          <h1 style={{ fontSize: "4rem", fontWeight: 900, color: "white", lineHeight: 1.15, marginBottom: "20px", letterSpacing: "-2px" }}>
            Learn Skills That <br /><span style={{ color: "#10b981" }}>Shape Your Future</span>
          </h1>

          <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "40px", maxWidth: "580px", margin: "0 auto 40px" }}>
            Master in-demand skills with expert-led courses. Complete interactive quizzes and earn verified certificates to advance your career.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/courses" className="btn" style={{ fontSize: "1.05rem", padding: "16px 36px" }}>
              🚀 Explore Courses
            </Link>
            {!user && (
              <Link to="/register" style={{
                padding: "16px 36px", fontSize: "1.05rem", background: "transparent",
                color: "white", border: "2px solid rgba(255,255,255,0.3)", borderRadius: "10px",
                textDecoration: "none", fontWeight: 600, transition: "all 0.2s",
              }}>
                Join Free
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: "white", padding: "40px 20px", borderBottom: "1px solid #f1f5f9" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "20px" }}>
          {[
            { value: "10,000+", label: "Active Students" },
            { value: "6+", label: "Expert Courses" },
            { value: "100%", label: "Certificate on Completion" },
            { value: "MCQ Quiz", label: "Test to Earn Certificate" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: 900, color: "#4f46e5" }}>{s.value}</div>
              <div style={{ color: "#6b7280", marginTop: "4px", fontSize: "0.95rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{ padding: "80px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: "2.2rem", fontWeight: 800, marginBottom: "12px" }}>
          How It <span style={{ color: "#4f46e5" }}>Works</span>
        </h2>
        <p style={{ textAlign: "center", color: "#6b7280", marginBottom: "50px", fontSize: "1.05rem" }}>
          Four simple steps to earn your certificate
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "30px" }}>
          {[
            { step: "1", icon: "📝", title: "Register", desc: "Create your free account as a Student or Instructor in seconds." },
            { step: "2", icon: "📚", title: "Enroll in Course", desc: "Browse our courses and enroll in topics that interest you." },
            { step: "3", icon: "🧪", title: "Take the Quiz", desc: "Complete 10 MCQ questions at the end to test your knowledge." },
            { step: "4", icon: "🏆", title: "Get Certificate", desc: "Pass the quiz and download your verified completion certificate." },
          ].map((s, i) => (
            <div key={i} style={{
              textAlign: "center", padding: "40px 24px", background: "white",
              borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              border: "1px solid rgba(0,0,0,0.04)", position: "relative",
            }}>
              <div style={{
                position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)",
                width: 36, height: 36, borderRadius: "50%", background: "#4f46e5",
                color: "white", display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, fontSize: "1rem",
              }}>{s.step}</div>
              <div style={{ fontSize: "3rem", marginBottom: "16px", marginTop: "8px" }}>{s.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: "10px" }}>{s.title}</h3>
              <p style={{ color: "#6b7280", lineHeight: 1.6, fontSize: "0.95rem" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Courses */}
      <div style={{ background: "#f8fafc", padding: "60px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: 800, marginBottom: "40px" }}>
            Featured <span style={{ color: "#4f46e5" }}>Courses</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
            {COURSES.slice(0, 3).map(c => (
              <div key={c._id} style={{
                background: "white", borderRadius: "16px", overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)", transition: "transform 0.2s",
              }}>
                <img src={c.image} alt={c.title} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                <div style={{ padding: "20px" }}>
                  <span style={{ background: "#eff6ff", color: "#4f46e5", padding: "4px 12px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600 }}>
                    {c.level}
                  </span>
                  <h3 style={{ marginTop: "12px", fontWeight: 700, fontSize: "1.1rem" }}>{c.title}</h3>
                  <p style={{ color: "#6b7280", fontSize: "0.9rem", marginTop: "8px", marginBottom: "16px" }}>{c.shortDesc}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.85rem", color: "#6b7280" }}>👤 {c.instructor}</span>
                    <Link to={`/course/${c._id}`} className="btn" style={{ padding: "8px 18px", fontSize: "0.9rem" }}>View Course</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <Link to="/courses" className="btn" style={{ fontSize: "1rem", padding: "14px 36px" }}>View All Courses →</Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        background: "#0f172a", color: "rgba(255,255,255,0.6)", padding: "30px 40px",
        textAlign: "center", fontSize: "0.9rem",
      }}>
        <p>© 2026 SkillAcademy · All rights reserved · Enroll → Learn → Certify 🎓</p>
      </footer>
    </div>
  );
};

export default Home;
