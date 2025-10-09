import React from 'react';
import './App.css';
import Navbar from './component/Navbar';
import { Routes, Route } from "react-router-dom";
import SignIn from './component/Sign In';

interface User {
  name: string;
  role: 'admin' | 'organizer' | 'user';
}

function App() {
  const user: User | null = null; // สมมติยังไม่ได้ login

  // ฟังก์ชันสำหรับ handle login
  const handleSignIn = (email: string, password: string) => {
    console.log("Email:", email, "Password:", password);
    // ใส่ logic login ของคุณ เช่น call API
  };

  return (
    <div className="font-sans bg-background min-h-screen">
      <div className="pt-[50px]">
        <Navbar user={user} />

        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          {/* ส่ง onSignIn prop ให้ SignIn */}
          <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
