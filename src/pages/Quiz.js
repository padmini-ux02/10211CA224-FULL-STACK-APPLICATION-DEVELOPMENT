import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { COURSES, getUser, getEnrolled, getCompleted, saveCompleted } from "../data";

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = COURSES.find(c => c._id === id);
  const user = getUser();

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    if (!course) { navigate("/courses"); return; }
    if (!getEnrolled().some(c => c._id === id)) { navigate(`/course/${id}`); return; }
    if (getCompleted().some(c => c._id === id)) { navigate(`/certificate/${id}`); return; }
  }, []);

  if (!course) return null;

  const questions = course.quiz;
  const q = questions[current];

  const handleSelect = (idx) => { if (!submitted) setSelected(idx); };

  const handleNext = () => {
    const newAnswers = [...answers, { question: q.q, selected, correct: q.answer }];
    setAnswers(newAnswers);
    setSelected(null);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      // Calculate score
      const totalCorrect = newAnswers.filter(a => a.selected === a.correct).length;
      setScore(totalCorrect);
      setSubmitted(true);

      if (totalCorrect >= 7) {
        // Pass: save to completed
        const completed = getCompleted();
        if (!completed.some(c => c._id === id)) {
          completed.push({ ...course, completedDate: new Date().toISOString(), score: totalCorrect });
          saveCompleted(completed);
        }
      }
    }
  };

  const passed = score >= 7;
  const progress = ((current + 1) / questions.length) * 100;

  if (submitted) {
    return (
      <div style={{
        minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "linear-gradient(135deg, #f8fafc, #e2e8f0)", padding: "40px 20px",
      }}>
        <div style={{
          background: "white", borderRadius: "24px", padding: "60px 48px",
          maxWidth: "560px", width: "100%", textAlign: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
        }}>
          <div style={{ fontSize: "5rem", marginBottom: "20px" }}>
            {passed ? "🎉" : "💪"}
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "12px", color: passed ? "#10b981" : "#ef4444" }}>
            {passed ? "Congratulations! You Passed!" : "Keep Practicing!"}
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1.1rem", marginBottom: "28px" }}>
            {passed
              ? `You scored ${score}/10. Your certificate is ready!`
              : `You scored ${score}/10. You need at least 7/10 to pass. Try again!`
            }
          </p>

          {/* Score Visual */}
          <div style={{
            background: passed ? "#f0fdf4" : "#fef2f2", borderRadius: "16px", padding: "24px",
            marginBottom: "32px",
          }}>
            <div style={{ fontSize: "3rem", fontWeight: 900, color: passed ? "#10b981" : "#ef4444" }}>
              {score} / 10
            </div>
            <div style={{ color: "#6b7280", marginTop: "8px", fontSize: "0.95rem" }}>
              {score * 10}% Score · {passed ? "PASSED ✓" : "FAILED ✗"}
            </div>
            {/* Answer breakdown */}
            <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginTop: "16px", flexWrap: "wrap" }}>
              {answers.map((a, i) => (
                <div key={i} style={{
                  width: "32px", height: "32px", borderRadius: "8px", display: "flex",
                  alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.8rem",
                  background: a.selected === a.correct ? "#dcfce7" : "#fee2e2",
                  color: a.selected === a.correct ? "#16a34a" : "#dc2626",
                }}>
                  {a.selected === a.correct ? "✓" : "✗"}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            {passed ? (
              <Link to={`/certificate/${id}`} className="btn btn-success" style={{ textDecoration: "none", fontSize: "1rem", padding: "14px 32px" }}>
                🏆 View Certificate
              </Link>
            ) : (
              <button onClick={() => { setCurrent(0); setSelected(null); setAnswers([]); setSubmitted(false); setScore(0); }}
                className="btn" style={{ fontSize: "1rem", padding: "14px 32px" }}>
                🔄 Retry Quiz
              </button>
            )}
            <Link to={`/course/${id}`} style={{
              padding: "14px 28px", background: "#f1f5f9", color: "#374151",
              borderRadius: "10px", textDecoration: "none", fontWeight: 600,
            }}>
              Back to Course
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div style={{
        minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "linear-gradient(135deg, #f8fafc, #e2e8f0)", padding: "40px 20px",
      }}>
        <div style={{
          background: "white", borderRadius: "24px", padding: "60px 48px",
          maxWidth: "540px", width: "100%", textAlign: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
        }}>
          <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🧪</div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "12px" }}>Course Quiz</h1>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#4f46e5", marginBottom: "20px" }}>{course.title}</h2>
          <div style={{ background: "#f8fafc", borderRadius: "12px", padding: "24px", marginBottom: "32px", textAlign: "left" }}>
            {[
              { icon: "❓", text: "10 multiple choice questions" },
              { icon: "✅", text: "Need 7/10 (70%) to pass" },
              { icon: "🏆", text: "Pass to earn your certificate" },
              { icon: "🔄", text: "You can retry if you fail" },
              { icon: "⏱️", text: "No time limit — take your time" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "12px", alignItems: "center", padding: "8px 0", borderBottom: i < 4 ? "1px solid #e5e7eb" : "none" }}>
                <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                <span style={{ color: "#374151" }}>{item.text}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setStarted(true)} className="btn" style={{ width: "100%", fontSize: "1.05rem", padding: "16px" }}>
            Start Quiz →
          </button>
          <Link to={`/course/${id}`} style={{ display: "block", marginTop: "16px", color: "#6b7280", textDecoration: "none", fontSize: "0.95rem" }}>
            ← Back to Course
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #f8fafc, #e2e8f0)", padding: "40px 20px",
    }}>
      <div style={{
        background: "white", borderRadius: "24px", padding: "48px",
        maxWidth: "620px", width: "100%",
        boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
          <span style={{ color: "#6b7280", fontWeight: 600, fontSize: "0.95rem" }}>
            Question {current + 1} of {questions.length}
          </span>
          <span style={{ background: "#eff6ff", color: "#4f46e5", padding: "6px 16px", borderRadius: "20px", fontWeight: 700, fontSize: "0.9rem" }}>
            {Math.round(progress)}%
          </span>
        </div>

        {/* Progress Bar */}
        <div style={{ height: "6px", background: "#e5e7eb", borderRadius: "3px", marginBottom: "32px" }}>
          <div style={{
            height: "100%", background: "#4f46e5", borderRadius: "3px",
            width: `${progress}%`, transition: "width 0.4s ease",
          }} />
        </div>

        {/* Question */}
        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#1e293b", marginBottom: "28px", lineHeight: 1.4 }}>
          {current + 1}. {q.q}
        </h2>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              style={{
                padding: "16px 20px", borderRadius: "12px", textAlign: "left",
                border: selected === i ? "2px solid #4f46e5" : "2px solid #e5e7eb",
                background: selected === i ? "#eff6ff" : "white",
                cursor: "pointer", fontSize: "0.98rem", fontWeight: selected === i ? 600 : 400,
                color: selected === i ? "#4f46e5" : "#374151", transition: "all 0.15s",
                display: "flex", alignItems: "center", gap: "14px",
              }}
            >
              <span style={{
                width: "28px", height: "28px", borderRadius: "50%", border: `2px solid ${selected === i ? "#4f46e5" : "#d1d5db"}`,
                background: selected === i ? "#4f46e5" : "white", color: selected === i ? "white" : "#6b7280",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: 700, flexShrink: 0,
              }}>
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={selected === null}
          className="btn"
          style={{
            width: "100%", padding: "16px", fontSize: "1.05rem",
            opacity: selected === null ? 0.4 : 1, cursor: selected === null ? "not-allowed" : "pointer",
          }}
        >
          {current === questions.length - 1 ? "Submit Quiz 🎯" : "Next Question →"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
