import React from "react";
import Header from "../components/Header";

const DashboardPage: React.FC = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <Header />
      <h1>Dashboard</h1>
      <p>This is the placeholder for system analytics and user management.</p>
    </div>
  );
};

export default DashboardPage;
