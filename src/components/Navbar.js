import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../data";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getUser());
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const linkStyle = {
    textDecoration: "none", color: scrolled ? "#374151" : "rgba(255,255,255,0.88)",
    fontSize: "0.95rem", fontWeight: 500, transition: "color 0.2s", padding: "6px 12px",
    borderRadius: "8px",
  };

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 1000,
      background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(30,41,59,0.95)",
      backdropFilter: "blur(16px)", padding: "14px 40px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.1)" : "none",
      transition: "all 0.3s",
    }}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <span style={{
          fontSize: "1.5rem", fontWeight: 900, letterSpacing: "-1px",
          color: scrolled ? "#4f46e5" : "white",
        }}>
          Skill<span style={{ color: "#10b981" }}>Academy</span>
        </span>
      </Link>

      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/courses" style={linkStyle}>Courses</Link>

        {user && user.role === "Student" && (
          <Link to="/student-dashboard" style={linkStyle}>Dashboard</Link>
        )}
        {user && user.role === "Instructor" && (
          <Link to="/instructor-dashboard" style={linkStyle}>Dashboard</Link>
        )}

        {!user ? (
          <>
            <Link to="/login" style={{ ...linkStyle, marginLeft: "8px" }}>Login</Link>
            <Link to="/register" style={{
              marginLeft: "8px", padding: "10px 20px", background: "#4f46e5", color: "white",
              borderRadius: "10px", textDecoration: "none", fontWeight: 600, fontSize: "0.95rem",
              boxShadow: "0 4px 12px rgba(79,70,229,0.35)",
            }}>Get Started</Link>
          </>
        ) : (
          <button onClick={logout} style={{
            marginLeft: "12px", padding: "10px 20px", background: "#ef4444", color: "white",
            border: "none", borderRadius: "10px", fontWeight: 600, fontSize: "0.9rem",
            cursor: "pointer", boxShadow: "0 4px 12px rgba(239,68,68,0.3)",
          }}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
