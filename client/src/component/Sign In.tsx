import React, { useState } from "react";

interface SignInProps {
  onSignIn: (email: string, password: string) => void;
}

const SignIn: React.FC<SignInProps> = ({ onSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setError("");
    onSignIn(email, password);
  };

  return (
    <div className="font-sans flex items-center justify-center min-h-screen bg-background">
      <form
        onSubmit={handleSubmit}
        className="bg-white px-[45px] py-[35px] rounded-[20px] shadow-md w-full max-w-md"
      >
        {/* Logo + Heading */}
        <div className="text-center mb-[30px]">
          <img src="/Logo-25.svg" alt="Logo" className="mx-auto mb-[10px] max-h-[50px]" />
          <h2 className="text-2xl font-bold">Sign In</h2>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block mb-[5px] font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );

};

export default SignIn;
