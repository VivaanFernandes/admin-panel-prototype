import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");      // clear our simple auth flag
    navigate("/login", { replace: true }); // go back to login
  };

  const barStyle: React.CSSProperties = {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.75rem 1rem",
    borderBottom: "1px solid #ddd",
    marginBottom: "1rem",
  };

  return (
    <header style={barStyle}>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/messages">Messages</Link>
      </nav>
      <button onClick={handleLogout}>Log out</button>
    </header>
  );
};

export default Header;
