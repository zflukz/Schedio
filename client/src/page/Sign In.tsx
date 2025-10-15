import React, { useState } from "react";
import AuthForm from "../component/Sign In";
import { useNavigate } from "react-router-dom";

const AuthPage: React.FC<{ mode: "signin" | "register" }> = ({ mode }) => {
  const navigate = useNavigate();
  const [backendError, setBackendError] = useState("");

  const handleAuthSubmit = async (data: { username?: string; email?: string; password: string; name?: string }) => {
    try {
      const endpoint = mode === "register" ? "/register" : "/login";

      const payload =
        mode === "register"
          ? {
              userName: data.name,
              userPassword: data.password,
              userEmail: data.email,
            }
          : {
              userName: data.username,
              userPassword: data.password,
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
        
        // Get user profile to determine role
        try {
          const profileResponse = await fetch("http://localhost:8080/profile", {
            headers: { "Authorization": `Bearer ${result.token}` }
          });
          
          if (profileResponse.ok) {
            const profile = await profileResponse.json();
            alert("User details: " + JSON.stringify(profile, null, 2));
            
            const role = profile.userRole?.toLowerCase();
            
            if (role === "organizer") {
              navigate("/organizers-dashboard");
            } else if (role === "admin") {
              navigate("/admin-dashboard");
            } else {
              navigate("/");
            }
          } else {
            navigate("/");
          }
        } catch (profileError) {
          console.error("Profile fetch error:", profileError);
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Network error:", error);
      setBackendError("Network error. Please try again later.");
    }
  };

  return <AuthForm mode={mode} onSubmit={handleAuthSubmit} backendError={backendError} />;
};

export default AuthPage;
