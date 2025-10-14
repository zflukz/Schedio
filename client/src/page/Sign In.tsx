import React, { useState } from "react";
import AuthForm from "../component/Sign In";
import { useNavigate } from "react-router-dom";

const AuthPage: React.FC<{ mode: "signin" | "register" }> = ({ mode }) => {
  const navigate = useNavigate();
  const [backendError, setBackendError] = useState("");

  const handleAuthSubmit = async (data: { email: string; password: string; name?: string }) => {
    try {
      // Decide endpoint based on mode
      const endpoint = mode === "register" ? "/register" : "/login";

      // Map form data to backend DTOs
      const payload =
        mode === "register"
          ? {
              userName: data.name,       // Full Name
              userPassword: data.password,
              email: data.email,
            }
          : {
              userName: data.name,      // For login, use email as username
              userPassword: data.password,
            };

      const response = await fetch('http://localhost:8080/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle error returned by GlobalExceptionHandler
        const message = result.message || JSON.stringify(result);
        setBackendError(message);
        return;
      }

      setBackendError("");

      if (mode === "register") {
        navigate("/signin");
      } else {
        // Login success
        localStorage.setItem("token", result.token);
        navigate("/dashboard"); // Redirect after login
      }
    } catch (error) {
      console.error("Network error:", error);
      setBackendError("Network error. Please try again later.");
    }
  };

  return <AuthForm mode={mode} onSubmit={handleAuthSubmit} />;
};

export default AuthPage;
