// src/services/authService.ts
export async function login(email: string, password: string) {
  if (import.meta.env.VITE_USE_MOCK === "true") {
    // Mock success: allow any non-empty credentials
    if (email && password) {
      return { success: true, token: "mock-token-123" };
    }
    return { success: false, message: "Missing credentials" };
  }

  // 🚧 Real API call placeholder
  try {
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    return { success: true, token: data.token };
  } catch (err) {
    return { success: false, message: "Login failed. Check credentials or API connection." };
  }
}
