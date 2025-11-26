import React, { useState } from "react";
import { useNavigate } from "react-router";
import { API_BASE_URL } from '../config/api';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Password reset link has been sent to your email.");
      } else {
        setError(result.message || "Failed to send reset email.");
      }
    } catch (error) {
      setError("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-sans flex items-center justify-center min-h-screen bg-bg-light">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white px-[50px] py-[50px] rounded-[20px] shadow-md w-full max-w-lg"
        >
          <div className="text-center mb-[20px]">
            <img src="/Logo-25.svg" alt="Logo" className="mx-auto mb-[10px] max-h-[50px]" />
            <h2 className="text-2xl font-bold">Forgot Password</h2>
            <p className="text-gray-600 mt-2">Enter your email to receive a password reset link</p>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {message && <p className="text-green-500 mb-4">{message}</p>}

          <div className="mb-[20px]">
            <label htmlFor="email" className="block mb-[5px] text-[18px] font-semibold">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-support4 rounded-[8px] px-[11px] py-[8px] bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mb-[20px] text-[20px] font-bold bg-night-default text-white py-2 rounded-full hover:bg-night-hover transition hover:shadow-md disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="text-center text-[14px]">
            <button
              type="button"
              className="text-primary hover:underline"
              onClick={() => navigate("/signin")}
            >
              Back to Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;