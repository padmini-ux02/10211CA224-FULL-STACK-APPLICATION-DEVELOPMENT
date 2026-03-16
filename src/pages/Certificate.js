import React, { useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { COURSES, getUser, getCompleted } from "../data";

const Certificate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const printRef = useRef();

  const course = COURSES.find(c => c._id === id);
  const user = getUser();
  const completedList = getCompleted();
  const completedEntry = completedList.find(c => c._id === id);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    if (!course) { navigate("/courses"); return; }
    if (!completedEntry) { navigate(`/course/${id}`); return; }
  }, []);

  if (!course || !completedEntry || !user) return null;

  const completedDate = new Date(completedEntry.completedDate).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  const handlePrint = () => window.print();

  return (
    <div>
      {/* Controls - hidden on print */}
      <div className="no-print" style={{
        background: "#1e293b", padding: "16px 40px", display: "flex",
        justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px",
      }}>
        <Link to="/student-dashboard" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", fontWeight: 500 }}>
          ← Back to Dashboard
        </Link>
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={handlePrint} className="btn" style={{ padding: "10px 24px" }}>
            🖨️ Print / Save as PDF
          </button>
          <Link to="/courses" className="btn" style={{ textDecoration: "none", background: "#334155", boxShadow: "none", padding: "10px 24px" }}>
            Browse More Courses
          </Link>
        </div>
      </div>

      {/* Certificate */}
      <div style={{
        minHeight: "calc(100vh - 70px)", background: "#f1f5f9",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px",
      }}>
        <div ref={printRef} className="certificate-container" style={{
          width: "860px", background: "white",
          border: "12px solid #4f46e5",
          borderRadius: "8px", padding: "0",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          position: "relative", overflow: "hidden",
        }}>
          {/* Inner border */}
          <div style={{
            position: "absolute", inset: "10px",
            border: "3px solid rgba(79,70,229,0.2)",
            borderRadius: "2px", pointerEvents: "none",
          }} />

          {/* Background Watermark */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%) rotate(-30deg)",
            fontSize: "120px", fontWeight: 900, color: "rgba(79,70,229,0.04)",
            whiteSpace: "nowrap", pointerEvents: "none",
          }}>
            SKILL ACADEMY
          </div>

          {/* Top Decoration */}
          <div style={{
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            padding: "32px 60px", textAlign: "center",
          }}>
            <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "white", letterSpacing: "-1px" }}>
              Skill<span style={{ color: "#10b981" }}>Academy</span>
            </div>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.95rem", marginTop: "4px", letterSpacing: "2px" }}>
              ONLINE LEARNING PLATFORM
            </div>
          </div>

          {/* Main Content */}
          <div style={{ padding: "48px 80px", textAlign: "center" }}>
            <div style={{ fontSize: "1rem", color: "#6b7280", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "16px" }}>
              Certificate of Completion
            </div>

            <div style={{ fontSize: "1.1rem", color: "#374151", marginBottom: "8px" }}>
              This is to proudly certify that
            </div>

            <div style={{
              fontSize: "3rem", fontWeight: 900, color: "#1e293b", marginBottom: "4px",
              fontStyle: "italic", borderBottom: "3px solid #4f46e5", display: "inline-block",
              paddingBottom: "4px", letterSpacing: "-1px"
            }}>
              {user.name || user.email}
            </div>

            <div style={{ fontSize: "1.1rem", color: "#374151", marginTop: "20px", marginBottom: "8px" }}>
              has successfully completed the course
            </div>

            <div style={{
              fontSize: "1.8rem", fontWeight: 800, color: "#4f46e5",
              marginBottom: "24px", lineHeight: 1.3,
            }}>
              "{course.title}"
            </div>

            <div style={{ color: "#6b7280", fontSize: "1rem", marginBottom: "8px" }}>
              Taught by <strong style={{ color: "#374151" }}>{course.instructor}</strong>
            </div>

            <div style={{
              display: "flex", justifyContent: "center", gap: "40px", marginTop: "24px",
              padding: "20px 40px", background: "#f8fafc", borderRadius: "12px", flexWrap: "wrap",
            }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#10b981" }}>
                  {completedEntry.score}/10
                </div>
                <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>Quiz Score</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#4f46e5" }}>{course.duration}</div>
                <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>Duration</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#7c3aed" }}>{course.level}</div>
                <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>Level</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "flex-end",
            padding: "24px 80px 48px", flexWrap: "wrap", gap: "20px",
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ borderTop: "2px solid #1e293b", paddingTop: "8px", fontSize: "0.85rem", color: "#374151", fontWeight: 600 }}>
                {course.instructor}
              </div>
              <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Course Instructor</div>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{
                width: "70px", height: "70px", borderRadius: "50%",
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 6px", color: "white", fontSize: "1.8rem",
              }}>🏆</div>
              <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Issued: {completedDate}</div>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ borderTop: "2px solid #1e293b", paddingTop: "8px", fontSize: "0.85rem", color: "#374151", fontWeight: 600 }}>
                SkillAcademy Platform
              </div>
              <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Authorized Signature</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
