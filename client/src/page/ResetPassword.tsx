import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { API_BASE_URL } from '../config/api';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const resetToken = searchParams.get("token");
    if (!resetToken) {
      setError("Invalid reset link");
      return;
    }
    setToken(resetToken);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    // Check password complexity
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#+-_=])[A-Za-z\d@$!%*?&.#+-_=]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&.#+-_=)");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Password reset successfully!");
        navigate("/signin");
      } else {
        // Handle different error response formats
        let errorMessage = "Failed to reset password.";
        if (result.message) {
          errorMessage = result.message;
        } else if (result.error) {
          errorMessage = result.error;
        } else if (typeof result === 'string') {
          errorMessage = result;
        }
        setError(errorMessage);
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
            <h2 className="text-2xl font-bold">Reset Password</h2>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="mb-[20px]">
            <label htmlFor="password" className="block mb-[5px] text-[18px] font-semibold">New Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-support4 rounded-[8px] px-[11px] py-[8px] bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter new password"
              required
            />
          </div>

          <div className="mb-[25px]">
            <label htmlFor="confirmPassword" className="block mb-[5px] text-[18px] font-semibold">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-support4 rounded-[8px] px-[11px] py-[8px] bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Confirm new password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !token}
            className="w-full mb-[20px] text-[20px] font-bold bg-night-default text-white py-2 rounded-full hover:bg-night-hover transition hover:shadow-md disabled:opacity-50"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;