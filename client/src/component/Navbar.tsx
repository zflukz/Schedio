import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
interface User {
  name: string;
  role: "admin" | "organizer" | "user";
  image?: string;
}

interface NavbarProps {
  user?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const firstName = user?.name ? user.name.split(" ")[0] : "";
  const navigate = useNavigate();
  const location = useLocation();
  const isMyEventsPage = location.pathname === "/myevent";
  const handleLogoClick = () => {
      if (!user) {
        navigate("/"); // ถ้ายังไม่ login ให้ไปหน้า home ธรรมดา
        return;
      }

      switch (user.role) {
        case "admin":
          navigate("/admin/dashboard"); // หน้า home ของ admin
          break;
        case "organizer":
          navigate("/organizer/dashboard"); // หน้า home ของ organizer
          break;
        case "user":
          navigate("/"); // หน้า home ของ user
          break;
        default:
          navigate("/"); // fallback
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
            className="absolute inset-0 transition-opacity duration-500 opacity-100 group-hover:opacity-0"
          />
          <img
            src="/Logo-25-hover.svg"
            alt="Logo Hover"
            className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
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
                onClick={() => navigate("/admin/users")}
                className="text-[18px] font-bold text-black hover:text-primary transition"
                >
                 User Management
                </button>
                
              </>
            )}

            {user.role === "organizer" && (
              <>
                
              </>
            )}

            {user.role === "user" && (
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
            <div className="flex items-center space-x-2 bg-primary hover:bg-primaryhover px-4 py-2 rounded-full"
            onClick={() => navigate("/myaccount")}
            >
              {user.image && (
                <img
                  src={user.image}
                  alt="Profile"
                  className="h-6 w-6 rounded-full"
                />
              )}
              <span className="text-[18px] font-bold text-white">{firstName}</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
