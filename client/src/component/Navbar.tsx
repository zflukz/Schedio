import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
interface User {
  name: string;
  role: "admin" | "organizer" | "attendee";
  image?: string;
}

interface NavbarProps {
  user?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ user: propUser }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(propUser || null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      try {
        const response = await fetch("http://localhost:8080/profile", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        
        if (response.ok) {
          const userData = await response.json();
          const backendRole = userData.userRole?.toLowerCase();
          let frontendRole: "admin" | "organizer" | "attendee";
          
          if (backendRole === "admin") {
            frontendRole = "admin";
          } else if (backendRole === "organizer") {
            frontendRole = "organizer";
          } else {
            frontendRole = "attendee";
          }

          frontendRole = "attendee"; // Temporary override for testing
          
          setUser({
            name: userData.firstName || userData.userName,
            role: frontendRole,
            image: undefined
          });
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    if (!propUser) {
      fetchUser();
    }
  }, [propUser]);

  return (
    <nav className="bg-white w-full max-w-[960px] min-w-[600px] shadow-md rounded-full mx-auto">
      <div className="font-sans flex items-center justify-between px-[50px] py-[24px] w-full">
        {/* Left: Logo with hover */}
        <div className="relative flex items-center cursor-pointer group">
          <img src="/Logo-25.svg" alt="Logo" className="max-h-[25px]" />
          <img
            src="/Logo-25.svg"
            alt="Logo"
            className="absolute inset-0 transition-opacity duration-200 opacity-100 group-hover:opacity-0"
          />
          <img
            src="/Logo-25-hover.svg"
            alt="Logo Hover"
            className="absolute inset-0 transition-opacity duration-200 opacity-0 group-hover:opacity-100"
          />
        </div>

        {/* Right: User section */}
        {!user ? (
          <button 
          className="text-[18px] bg-primary hover:bg-primaryhover text-white font-bold px-4 py-2 rounded-full transition"
          onClick={() => navigate("/signin")}
          >
            Sign In
          </button>
        ) : (
          <div className="flex items-center space-x-5">
            {/* Dynamic menu by role */}
            {user.role === "admin" && (
              <>
                <button 
                  className="text-[18px] font-bold text-black hover:text-primary transition"
                  onClick={() => navigate("/admin-dashboard")}
                >
                 User Management
                </button>
                
              </>
            )}

            {user.role === "organizer" && (
              <>
                <button 
                  className="text-[18px] font-bold text-black hover:text-primary transition"
                  onClick={() => navigate("/organizers-dashboard")}
                >
                  My Events
                </button>
              </>
            )}

            {user.role === "attendee" && (
              <button 
                className="text-[18px] font-bold text-black hover:text-primary transition"
                onClick={() => navigate("/")}
              >
                My Events
              </button>
            )}

            {/* User info */}
            <div 
              className="flex items-center space-x-2 bg-primary hover:bg-primaryhover px-4 py-2 rounded-full cursor-pointer"
              onClick={() => {
                localStorage.removeItem("token");
                setUser(null);
                navigate("/");
              }}
            >
              {user.image && (
                <img
                  src={user.image}
                  alt="Profile"
                  className="h-6 w-6 rounded-full"
                />
              )}
              <span className="text-[18px] font-bold text-black">{user.name}</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
