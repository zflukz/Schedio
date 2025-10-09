import React from "react";

interface User {
  name: string;
  role: "admin" | "organizer" | "user";
  image?: string;
}

interface NavbarProps {
  user?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
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
          <button className="text-[18px] bg-[#3EBAD0]/10 hover:bg-primary text-black font-bold px-4 py-2 rounded-full transition">
            Sign In
          </button>
        ) : (
          <div className="flex items-center space-x-5">
            {/* Dynamic menu by role */}
            {user.role === "admin" && (
              <>
                <button className="text-[18px] font-bold text-black hover:text-primary transition">
                 User Management
                </button>
                
              </>
            )}

            {user.role === "organizer" && (
              <>
                
              </>
            )}

            {user.role === "user" && (
              <button className="text-[18px] font-bold text-black hover:text-primary transition">
                My Events
              </button>
            )}

            {/* User info */}
            <div className="flex items-center space-x-2 bg-[#3EBAD0]/10 hover:bg-primary px-4 py-2 rounded-full">
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
