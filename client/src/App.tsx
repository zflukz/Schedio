import React from 'react';
import './App.css';
import Navbar from './component/Navbar';
import { Routes, Route } from "react-router-dom";
import AuthForm from './component/Sign In';
import Upcomingcard from './component/Comingcard';

interface User {
  name: string;
  role: 'admin' | 'organizer' | 'user';
}


function App() {
  const user: User | null = null; // สมมติยังไม่ได้ login

 const handleAuthSubmit = (data: { email: string; password: string; name?: string }) => {
    console.log("Auth data:", data);
    // TODO: เรียก API login / register ตาม mode
  };


  return (
    <div className="font-sans bg-background min-h-screen">
      <Navbar user={user} />
       <Upcomingcard
        title="Workshop React & TypeScript"
        date="2025-10-20"
        time="10:00 AM - 4:00 PM"
        place="Online Zoom Meeting"
        objective="Learn how to build a React app with TypeScript"
        description="In this workshop, we will cover the basics of React with TypeScript, including components, props, state, and more."
        organizer="Tech Community"
        participants={25}
        maxParticipants={50}
      />
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          {/* Sign In */}
          <Route
            path="/signin"
            element={<AuthForm mode="signin" onSubmit={handleAuthSubmit} />}
          />
          {/* Register */}
          <Route
            path="/register"
            element={<AuthForm mode="register" onSubmit={handleAuthSubmit} />}
          />
        </Routes>
    </div>
  );
}

export default App;
