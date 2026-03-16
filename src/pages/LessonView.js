import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { COURSES, getEnrolled } from "../data";

const LessonView = () => {
  const { id, chapterId, lessonId } = useParams();
  const navigate = useNavigate();
  
  const course = COURSES.find(c => c._id === id);
  if (!course) return <h2 style={{textAlign: "center", marginTop: "50px"}}>Course not found</h2>;

  const enrolled = getEnrolled().some(c => c._id === id);
  if (!enrolled) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>You are not enrolled in this course.</h2>
        <Link to={`/course/${id}`} className="btn" style={{ marginTop: "20px", display: "inline-block" }}>Go back to enroll</Link>
      </div>
    );
  }

  const cIdx = parseInt(chapterId);
  const lIdx = parseInt(lessonId);

  const chapter = course.content[cIdx];
  const lessonTitle = chapter?.lessons[lIdx];

  if (!lessonTitle) return <h2 style={{textAlign: "center", marginTop: "50px"}}>Lesson not found</h2>;

  // Determine next lesson or quiz
  let nextLink = "";
  let nextText = "";
  let isLast = false;
  
  if (lIdx + 1 < chapter.lessons.length) {
    // Next lesson in same chapter
    nextLink = `/course/${id}/lesson/${cIdx}/${lIdx + 1}`;
    nextText = "Next Lesson ➔";
  } else if (cIdx + 1 < course.content.length) {
    // First lesson in next chapter
    nextLink = `/course/${id}/lesson/${cIdx + 1}/0`;
    nextText = `Next Chapter ➔`;
  } else {
    // No more lessons, go to quiz
    nextLink = `/quiz/${course._id}`;
    nextText = "Attend Quiz 🧠";
    isLast = true;
  }
  
  // Previous lesson
  let prevLink = "";
  let prevText = "← Previous";
  if (lIdx - 1 >= 0) {
    prevLink = `/course/${id}/lesson/${cIdx}/${lIdx - 1}`;
  } else if (cIdx - 1 >= 0) {
    const prevChapter = course.content[cIdx - 1];
    prevLink = `/course/${id}/lesson/${cIdx - 1}/${prevChapter.lessons.length - 1}`;
  }

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: "0 24px" }}>
      <div style={{ marginBottom: "20px", fontSize: "0.95rem", display: "flex", justifyContent: "space-between" }}>
        <div>
          <Link to={`/course/${course._id}`} style={{ color: "#4f46e5", textDecoration: "none", fontWeight: 500 }}>
            ← Back to Course
          </Link>
          <span style={{ color: "#9ca3af", margin: "0 10px" }}>/</span>
          <span style={{ color: "#6b7280" }}>{chapter.chapter}</span>
        </div>
        <div style={{ fontWeight: 600, color: "#10b981", background: "#ecfdf5", padding: "4px 12px", borderRadius: "16px" }}>
          Lesson {cIdx + 1}.{lIdx + 1}
        </div>
      </div>

      <div style={{ background: "white", borderRadius: "16px", padding: "40px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "24px", color: "#1e293b" }}>{lessonTitle}</h1>
        
        <div style={{ lineHeight: 1.8, color: "#475569", fontSize: "1.1rem" }}>
          <p style={{ marginBottom: "20px" }}>
            Welcome to <strong>{lessonTitle}</strong>. In this lesson, we will explore the core concepts and fundamental mechanics behind this topic. 
            Understanding these principles is essential for your continuous progress in the <strong>{course.title}</strong> course.
          </p>
          <div style={{ background: "#f8fafc", padding: "20px", borderLeft: "4px solid #4f46e5", borderRadius: "4px", marginBottom: "20px" }}>
            <strong>💡 Key Takeaway:</strong> Pay close attention to how these elements fit into the broader scope of the subject. A solid foundation here will make advanced topics much easier to grasp.
          </div>
          <p style={{ marginBottom: "20px" }}>
            The application of this concept is wide-ranging. Professionals in the field frequently rely on these patterns to solve complex problems efficiently, minimize errors, and deliver high-quality results.
          </p>
          <p style={{ marginBottom: "20px" }}>
            Take your time reading through the materials. If there are code snippets or practical exercises available, make sure to execute them and observe the outcomes. Practice is the best way to solidify your active learning process.
          </p>
          <h3 style={{ marginTop: "30px", marginBottom: "15px", color: "#1e293b" }}>Summary of {lessonTitle}</h3>
          <ul style={{ paddingLeft: "20px", marginBottom: "30px" }}>
            <li style={{ marginBottom: "10px" }}>Understanding the fundamental building blocks and their roles.</li>
            <li style={{ marginBottom: "10px" }}>Identifying common anti-patterns within {lessonTitle.toLowerCase()} and how to avoid them.</li>
            <li style={{ marginBottom: "10px" }}>Applying practical and scalable solutions to everyday development scenarios.</li>
          </ul>
        </div>
        
        <div style={{ borderTop: "2px solid #f1f5f9", marginTop: "40px", paddingTop: "30px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
          {prevLink ? (
             <button onClick={() => navigate(prevLink)} className="btn" style={{ background: "transparent", color: "#4f46e5", border: "1px solid #4f46e5", padding: "10px 20px" }}>
               {prevText}
             </button>
          ) : <div />}
          
          <button 
             onClick={() => navigate(nextLink)} 
             className={isLast ? "btn btn-success" : "btn"} 
             style={{ padding: "12px 30px", fontWeight: "bold" }}>
             {nextText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonView;
