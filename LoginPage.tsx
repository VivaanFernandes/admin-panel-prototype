import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import type { LoginResponse } from "../types/auth";

const LoginPage: React.FC = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const useMock = String(import.meta.env.VITE_USE_MOCK) === "true";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (useMock) {
        // DEV FALLBACK: fake a successful login
        localStorage.setItem("token", "mock-token");
        return nav("/dashboard", { replace: true });
      }

      // Adjust endpoint/body to match your Django API
      // Example: POST /login with { email, password }
      const { data } = await api.post<LoginResponse>("/login", {
        email,
        password,
      });

      if (!data?.token) {
        throw new Error("No token received");
      }

      localStorage.setItem("token", data.token);
      nav("/dashboard", { replace: true });
    } catch (err: any) {
      console.error(err);
      setError("Login failed. Check credentials or API connection.");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: 520 }}>
      <h1>Login</h1>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: "0.75rem" }}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            minLength={4}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </label>

        <button type="submit">Sign in</button>
        {error && <p style={{ color: "crimson" }}>{error}</p>}
        {useMock && (
          <p style={{ fontSize: 12, opacity: 0.8 }}>
            Dev mode: mock login enabled. Any credentials will succeed.
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
