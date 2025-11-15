import React, { useState } from "react";
import AuthForm from "../component/Sign In";
import { useNavigate } from "react-router";
import { useUser } from "../App";

const AuthPage: React.FC<{ mode: "signin" | "register" }> = ({ mode }) => {
  const navigate = useNavigate();
  const { refreshUser } = useUser();
  const [backendError, setBackendError] = useState("");

  const handleAuthSubmit = async (data: { username: string; email?: string; password: string }) => {
    try {
      const endpoint = mode === "register" ? "/register" : "/login";

      const payload =
        mode === "register"
          ? {
              userName: data.username,
              userPassword: data.password,
              email: data.email,
            }
          : {
              userName: data.username,
              userPassword: data.password,
            };

      console.log('Sending request to:', `${process.env.REACT_APP_BACKEND_URL}${endpoint}`);
      console.log('Payload:', payload);
      
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log('Response status:', response.status);
      
      const result = await response.json();
      console.log('Response data:', result);

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
        await refreshUser();
        
        // Get updated user data and alert it
        const profileResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/profile`, {
          headers: { "Authorization": `Bearer ${result.token}` }
        });
        
        if (profileResponse.ok) {
          const userData = await profileResponse.json();
          alert("User data: " + JSON.stringify(userData, null, 2));
        }
        
        navigate("/");
      }
    } catch (error) {
      console.error("Network error:", error);
      setBackendError(`Network error: ${error}. Please check if backend is running.`);
    }
  };

  return <AuthForm mode={mode} onSubmit={handleAuthSubmit} backendError={backendError} />;
};

export default AuthPage;
