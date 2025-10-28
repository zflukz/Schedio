import React, { useState } from "react";
import AuthForm from "../component/Sign In";
import { useNavigate } from "react-router-dom";

const AuthPage: React.FC<{ mode: "signin" | "register" }> = ({ mode }) => {
  const navigate = useNavigate();
  const [backendError, setBackendError] = useState("");

  const handleAuthSubmit = async (data: { username: string; password: string; name?: string }) => {
    try {
      const endpoint = mode === "register" ? "/register" : "/login";

      const payload =
        mode === "register"
          ? {
              username: data.username,
              password: data.password,
              name: data.name,
            }
          : {
              username: data.username,
              password: data.password,
            };

      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        const message = result.message || JSON.stringify(result);
        setBackendError(message);
        return;
      }

      setBackendError("");

      if (mode === "register") {
        navigate("/signin");
      } else {
        localStorage.setItem("token", result.token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Network error:", error);
      setBackendError("Network error. Please try again later.");
    }
  };

  return <AuthForm mode={mode} onSubmit={handleAuthSubmit} backendError={backendError} />;
};

export default AuthPage;
