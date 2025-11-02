import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../App";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useUser();
  const isMyEventsPage = location.pathname === "/myevent";
  
  const getUserRole = () => {
    if (!user?.userRole) return "attendee";
    const role = user.userRole.toLowerCase();
    return role === "admin" || role === "organizer" ? role : "attendee";
  };
  
  const getUserName = () => {
    return user?.firstName || user?.userName || "User";
  };

  const handleLogoClick = () => {
    const role = getUserRole();
    if (!user) {
      navigate("/"); // ถ้ายังไม่ login ให้ไปหน้า home ธรรมดา
      return;
    }
    switch (role) {
      case "admin":
        navigate("/admin/dashboard"); // หน้า home ของ admin
        break;
      case "organizer":
        navigate("/organizer/dashboard"); // หน้า home ของ organizer
        break;
      case "attendee":
        navigate("/home"); // หน้า home ของ user
        break;
      default:
        navigate("/home"); // fallback
    }
  };

  return (
    <nav className="bg-white w-full max-w-[960px] min-w-[300px] shadow-md rounded-full mx-auto">
      <div className="font-sans flex items-center justify-between px-[50px] py-[24px] w-full">
        {/* Left: Logo with hover */}
        <div className="relative flex items-center cursor-pointer group"
        onClick={handleLogoClick}
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
                onClick={() => navigate("/myevent")}
                className={`text-[18px] font-bold transition ${
                  isMyEventsPage ? "text-primary" : "text-black hover:text-primary"
                }`}
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
