import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { COURSES, getUser, getEnrolled, saveEnrolled, getCompleted } from "../data";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = COURSES.find(c => c._id === id);
  const [enrolled, setEnrolled] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [openChapter, setOpenChapter] = useState(0);
  const user = getUser();

  useEffect(() => {
    if (!course) return;
    setEnrolled(getEnrolled().some(c => c._id === id));
    setCompleted(getCompleted().some(c => c._id === id));
  }, [id]);

  if (!course) return (
    <div style={{ textAlign: "center", padding: "80px" }}>
      <h2>Course not found</h2>
      <Link to="/courses" className="btn" style={{ marginTop: "20px", display: "inline-block" }}>Back to Courses</Link>
    </div>
  );

  const handleEnroll = () => {
    if (!user) { navigate("/login"); return; }
    const list = getEnrolled();
    list.push({ ...course, enrolledDate: new Date().toISOString() });
    saveEnrolled(list);
    setEnrolled(true);
    alert(`🎉 Enrolled in "${course.title}"!`);
  };

  const levelColor = { Beginner: "#10b981", Intermediate: "#f59e0b", Advanced: "#ef4444" };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
      {/* Back */}
      <Link to="/courses" style={{ color: "#4f46e5", textDecoration: "none", fontWeight: 500, fontSize: "0.95rem" }}>
        ← Back to Courses
      </Link>

      {/* Hero Card */}
      <div style={{
        marginTop: "24px", background: "linear-gradient(135deg, #1e293b, #334155)",
        borderRadius: "20px", overflow: "hidden", display: "flex", flexWrap: "wrap",
      }}>
        <div style={{ flex: "1 1 300px", padding: "40px", color: "white" }}>
          <div style={{ display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
            <span style={{ background: `${levelColor[course.level]}30`, color: levelColor[course.level], padding: "5px 14px", borderRadius: "20px", fontWeight: 600, fontSize: "0.85rem" }}>
              {course.level}
            </span>
            <span style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", padding: "5px 14px", borderRadius: "20px", fontWeight: 600, fontSize: "0.85rem" }}>
              ⏱ {course.duration}
            </span>
            <span style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", padding: "5px 14px", borderRadius: "20px", fontWeight: 600, fontSize: "0.85rem" }}>
              📚 {course.lessons} Lessons
            </span>
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "16px", lineHeight: 1.2 }}>{course.title}</h1>
          <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: "24px" }}>{course.description}</p>
          <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "28px", fontSize: "0.95rem" }}>👤 Instructor: <strong style={{ color: "white" }}>{course.instructor}</strong></p>

          {completed ? (
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link to={`/certificate/${course._id}`} className="btn btn-success" style={{ textDecoration: "none" }}>
                🏆 View Certificate
              </Link>
              <span style={{ padding: "12px 20px", background: "rgba(16,185,129,0.2)", color: "#10b981", borderRadius: "10px", fontWeight: 600, fontSize: "0.95rem" }}>
                ✓ Course Completed
              </span>
            </div>
          ) : enrolled ? (
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link to={`/quiz/${course._id}`} className="btn" style={{ textDecoration: "none" }}>
                🧪 Take Quiz to Complete
              </Link>
              <span style={{ padding: "12px 20px", background: "rgba(79,70,229,0.2)", color: "#a5b4fc", borderRadius: "10px", fontWeight: 600, fontSize: "0.95rem" }}>
                ✓ Enrolled
              </span>
            </div>
          ) : (
            <button onClick={handleEnroll} className="btn" style={{ fontSize: "1.05rem", padding: "14px 32px" }}>
              🚀 Enroll Now — Free
            </button>
          )}
        </div>
        <div style={{ flex: "1 1 280px", maxWidth: "380px" }}>
          <img src={course.image} alt={course.title} style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: "260px" }} />
        </div>
      </div>

      {/* Content Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "28px", marginTop: "36px" }}>
        {/* Course Content */}
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "20px" }}>📖 Course Content</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {course.content.map((ch, i) => (
              <div key={i} style={{
                background: "white", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.06)",
                overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}>
                <button
                  onClick={() => setOpenChapter(openChapter === i ? -1 : i)}
                  style={{
                    width: "100%", padding: "18px 20px", background: openChapter === i ? "#f5f3ff" : "white",
                    border: "none", textAlign: "left", cursor: "pointer", fontWeight: 700,
                    fontSize: "1rem", color: "#1e293b", display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}
                >
                  <span>{ch.chapter}</span>
                  <span style={{ color: "#4f46e5", fontSize: "1.2rem" }}>{openChapter === i ? "▲" : "▼"}</span>
                </button>
                {openChapter === i && (
                  <div style={{ borderTop: "1px solid #f1f5f9" }}>
                    {ch.lessons.map((lesson, j) => {
                      const lessonContent = (
                        <div style={{
                          padding: "14px 20px", borderBottom: "1px solid #f8fafc",
                          display: "flex", alignItems: "center", gap: "12px",
                          background: enrolled ? "white" : "#fafafa", cursor: enrolled ? "pointer" : "default",
                          transition: "background 0.2s"
                        }}
                        onMouseEnter={(e) => { if(enrolled) e.currentTarget.style.background = "#f8fafc"; }}
                        onMouseLeave={(e) => { if(enrolled) e.currentTarget.style.background = "white"; }}
                        >
                          <span style={{ color: enrolled ? "#10b981" : "#d1d5db", fontSize: "1.1rem" }}>
                            {enrolled ? "📖" : "🔒"}
                          </span>
                          <span style={{ color: enrolled ? "#4f46e5" : "#9ca3af", fontSize: "0.95rem", fontWeight: enrolled ? 600 : 400 }}>{lesson}</span>
                        </div>
                      );

                      return enrolled ? (
                        <Link to={`/course/${course._id}/lesson/${i}/${j}`} key={j} style={{ textDecoration: "none" }}>
                          {lessonContent}
                        </Link>
                      ) : (
                        <div key={j}>
                          {lessonContent}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div style={{ background: "white", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.05)", position: "sticky", top: "80px" }}>
            <h3 style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: "20px" }}>This course includes:</h3>
            {[
              { icon: "⏱️", text: course.duration + " of video content" },
              { icon: "📚", text: course.lessons + " lessons" },
              { icon: "🧪", text: "10 MCQ Quiz to complete" },
              { icon: "🏆", text: "Certificate of completion" },
              { icon: "♾️", text: "Lifetime access" },
              { icon: "📱", text: "Access on desktop & mobile" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: i < 5 ? "1px solid #f1f5f9" : "none" }}>
                <span style={{ fontSize: "1.2rem", width: "28px", textAlign: "center" }}>{item.icon}</span>
                <span style={{ color: "#374151", fontSize: "0.95rem" }}>{item.text}</span>
              </div>
            ))}
            <div style={{ marginTop: "24px" }}>
              {completed ? (
                <Link to={`/certificate/${course._id}`} className="btn btn-success" style={{ width: "100%", display: "block", textAlign: "center", textDecoration: "none", boxSizing: "border-box" }}>
                  🏆 View Your Certificate
                </Link>
              ) : enrolled ? (
                <Link to={`/quiz/${course._id}`} className="btn" style={{ width: "100%", display: "block", textAlign: "center", textDecoration: "none", boxSizing: "border-box" }}>
                  🧪 Take Quiz Now
                </Link>
              ) : (
                <button onClick={handleEnroll} className="btn" style={{ width: "100%", fontSize: "1rem" }}>
                  Enroll Now — Free
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
