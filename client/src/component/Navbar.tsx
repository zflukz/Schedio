import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../App";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  
  const getUserRole = () => {
    if (!user?.userRole) return "attendee";
    const role = user.userRole.toLowerCase();
    return role === "admin" || role === "organizer" ? role : "attendee";
  };
  
  const getUserName = () => {
    return user?.firstName || user?.userName || "User";
  };

  return (
    <nav className="bg-white w-full max-w-[960px] min-w-[600px] shadow-md rounded-full mx-auto">
      <div className="font-sans flex items-center justify-between px-[50px] py-[24px] w-full">
        {/* Left: Logo with hover */}
        <div 
          className="relative flex items-center cursor-pointer group"
          onClick={() => {
            const role = getUserRole();
            if (role === "admin") {
              navigate("/admin-dashboard");
            } else if (role === "organizer") {
              navigate("/organizer-dashboard");
            } else {
              navigate("/");
            }
          }}
        >
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
            {getUserRole() === "admin" && (
              <>
                <button 
                  className="text-[18px] font-bold text-black hover:text-primary transition"
                  onClick={() => navigate("/admin-dashboard")}
                >
                 User Management
                </button>
                
              </>
            )}

            {getUserRole() === "organizer" && (
              <>
                <button 
                  className="text-[18px] font-bold text-black hover:text-primary transition"
                  onClick={() => navigate("/organizer-dashboard")}
                >
                  My Events
                </button>
              </>
            )}

            {getUserRole() === "attendee" && (
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
              onClick={() => navigate("/profile")}
            >
              <span className="text-[18px] font-bold text-black">{getUserName()}</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
