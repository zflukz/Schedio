import React, { useState } from "react";
import AuthForm from "../component/Sign In";
import { useNavigate } from "react-router";
import { useUser } from "../App";
import { API_BASE_URL, apiEndpoints } from '../config/api';

const AuthPage: React.FC<{ mode: "signin" | "register" }> = ({ mode }) => {
  const navigate = useNavigate();
  const { refreshUser } = useUser();
  const [backendError, setBackendError] = useState("");

  const handleAuthSubmit = async (data: { username?: string; email?: string; password: string; name?: string }) => {
    try {
      const endpoint = mode === "register" ? "/register" : "/login";

      const payload =
        mode === "register"
          ? {
              userName: data.username,
              userPassword: data.password,
              userEmail: data.email,
              userFristname: data.name,
              userLastname: data.name
            }
          : {
              usernameOrEmail: data.username,
              userPassword: data.password,
            };

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
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
        await refreshUser();
        
        // Get updated user data and navigate based on role
        const profileResponse = await fetch(apiEndpoints.profile, {
          headers: { "Authorization": `Bearer ${result.token}` }
        });
        
        if (profileResponse.ok) {
          const userData = await profileResponse.json();
          const userRole = userData.userRole?.toLowerCase();
          
          if (userRole === "admin") {
            navigate("/admin/dashboard");
          } else if (userRole === "organizer") {
            navigate("/organizer/dashboard");
          } else {
            navigate("/");
          }
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Network error:", error);
      setBackendError("Network error. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      <div className="w-full px-[15px] sm:px-[25px] lg:px-[60px] lg:top-[50px] pt-[25px] flex flex-col lg:flex-row lg:items-center relative">
        {/* Back Button */}
        <div className="flex justify-start mb-4 lg:mb-0">
          <button
            onClick={() => navigate("/")}
            className="flex items-center bg-white text-black py-[8px] px-[20px] rounded-full font-semibold text-[16px] hover:shadow-md transition z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-[10px]"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            Back
          </button>
        </div>
      </div>
      
      <AuthForm mode={mode} onSubmit={handleAuthSubmit} backendError={backendError} />
    </div>
  );
};

export default AuthPage;
