import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiEndpoints } from '../config/api';

interface AuthFormProps {
  mode: "signin" | "register";
  onSubmit: (data: { username?: string; email?: string; password: string; firstname?: string; lastname?: string}) => void;
  backendError?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit, backendError }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setfirstName] = useState(""); // ใช้เฉพาะ Register
  const [lastname, setlastName] = useState(""); // ใช้เฉพาะ Register
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const requiredField = mode === "signin" ? username : email;
    if (!requiredField || !password || (mode === "register" && !firstname && !lastname)) {
      setError("Please fill in all required fields.");
      return;
    }

    setError("");
    onSubmit({ 
      username: username,
      email: email,
      password, 
      firstname: firstname,
      lastname: lastname 
    });
  };

  return (
    <div className="font-sans flex items-center justify-center min-h-screen bg-bg-light">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white px-[50px] py-[50px] rounded-[20px] shadow-md w-full max-w-lg"
      >
        {/* Logo + Heading */}
        <div className="text-center mb-[20px]">
          <img src="/Logo-25.svg" alt="Logo" className="mx-auto mb-[10px] max-h-[50px]" />
          <h2 className="text-2xl font-bold">
            {mode === "signin" ? "Sign In" : "Register"}
          </h2>
        </div>

        {/* Frontend validation error */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Backend error from API */}
        {backendError && <p className="text-red-500 mb-4">{backendError}</p>}

        {/* Name (เฉพาะ Register) */}
        {mode === "register" && (
          <div className="flex flex-row gap-4 mb-[20px]">
            {/* First Name */}
            <div className="flex flex-col w-1/2">
              <label className="block mb-[5px] text-[18px] font-semibold">First name</label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setfirstName(e.target.value)}
                className="w-full border border-support4 rounded-[8px] px-[11px] py-[8px] bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your First name"
                required
              />
            </div>

            {/* Last Name (หรือ field ที่ 2) */}
            <div className="flex flex-col w-1/2">
              <label className="block mb-[5px] text-[18px] font-semibold">Last name</label>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setlastName(e.target.value)}
                className="w-full border border-support4 rounded-[8px] px-[11px] py-[8px] bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your Last name"
                required
              />
            </div>
          </div>
        )}

        {/* Username for signin, Email for register */}
        {mode === "signin" ? (
          <div className="mb-[20px]">
            <label className="block mb-[5px] text-[18px] font-semibold">Username or Email</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-support4 rounded-[8px] px-[11px] py-[8px] bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your username or Email"
              required
            />
          </div>
        ) : (
          <div className="mb-[20px]">
            <div className="mb-[20px]">
            <label className="block mb-[5px] text-[18px] font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-support4 rounded-[8px] px-[11px] py-[8px] bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="you@example.com"
              required
            />
            </div>
            <div className="mb-[20px]">
            <label className="block mb-[5px] text-[18px] font-semibold">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-support4 rounded-[8px] px-[11px] py-[8px] bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="user12345"
              required
            />
            </div>
          </div>
          
        )}

        {/* Password */}
        <div className="mb-[25px]">
          <label className="block mb-[5px] text-[18px] font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-support4 rounded-[8px] px-[11px] py-[8px] bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Remember me + Forgot password (เฉพาะ SignIn) */}
        {mode === "signin" && (
          <div className="flex justify-between items-center mt-[-10px] mb-[20px] text-[16px]">
            <label className="flex items-center gap-2 relative">
              <input
                type="checkbox"
                className="w-4 h-4 border border-support4 rounded appearance-none checked:bg-primary checked:border-primary focus:ring-1 focus:ring-primary peer"
              />
              <span className="absolute left-0 top-[4px] w-4 h-4 pointer-events-none peer-checked:block">
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </span>
              Remember me
            </label>
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-black hover:underline"
            >
              Forgot password?
            </button>
          </div>
        )}

        <button
          type="submit"
          className="w-full mb-[20px] text-[20px] font-bold bg-night-default text-white py-2 rounded-full hover:bg-night-hover transition hover:shadow-md"
        >
          {mode === "signin" ? "Sign In" : "Register"}
        </button>

        <div className="text-center text-[14px]">
          {mode === "signin" ? (
            <>
              Don’t have an account?{" "}
              <button
                type="button"
                className="ml-[10px] text-primary hover:underline"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
              <div className="relative flex items-center my-[20px] w-full">
                {/* เส้น */}
                <div className="flex-grow border-t border-text-black"></div>

                {/* คำว่า or */}
                <span className="absolute left-1/2 transform -translate-x-1/2 bg-white px-3 text-text-black font-normal">
                  or
                </span>
              </div>
              <button
                type="button"
                onClick={() => window.location.href = apiEndpoints.oauth2Google}
                className="w-full font-semibold mt-[20px] text-[20px] border border-dashed  border-text-black bg-white text-text-black py-2 rounded-[12px] flex items-center justify-center hover:shadow-md transition"
              >
                <img
                  src="/Google Icon Logo.svg"
                  alt="Google Logo"
                  className="w-[24px] h-[24px] mr-[10px] "
                />
                <span>Sign in with Google</span>
              </button>

            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                className="ml-[10px] text-primary hover:underline"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </form>
      </div>
    </div>
  );
};

export default AuthForm;
