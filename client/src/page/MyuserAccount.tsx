import React from "react";
import Navbar from "../component/Navbar";
import { useNavigate } from "react-router-dom";
const MyUserAccount: React.FC = () => {
  const navigate = useNavigate();
  const user = {
    name: "Thanrada Tungweerapornpong",
    role: "user" as const,
    email: "thanrada.fai@gmail.com",
  };

  return (
    <div className="flex min-h-screen bg-bg-light font-sans flex flex-col pt-[50px]">
      {/* Top section with Navbar and Back button */}
          <div className="w-full px-[15px] sm:px-[25px] lg:px-[60px] pt-[25px] flex flex-col lg:flex-row lg:items-center relative">
            {/* Back Button */}
            <div className="flex justify-start mb-4 lg:mb-0">
              <button
                onClick={() => navigate("/")}
                className="flex items-center bg-white text-black py-[8px] px-[20px] rounded-full font-semibold text-[16px] hover:shadow-md transition z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-[10px]"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                Back
              </button>
            </div>
      
            {/* Navbar Centered */}
            <div className="flex justify-center w-full lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
              <Navbar user={user} />
            </div>
          </div>
          
      {/* Sidebar */}
      <aside className="w-64 bg-white rounded-[12px] shadow-sm m-6 px-[25px] py-[15px] flex flex-col justify-start gap-4 text-[18px]">
        
        <button className="flex items-center justify-start gap-[10px] px-[15px] py-[5px] bg-primary text-text-white font-semibold rounded-[8px] shadow-sm transition">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-text-white">
            <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
          </svg>
          My Account
        </button>
        <button className="flex items-center justify-start gap-[10px] px-[15px] py-[5px] text-text-black font-semibold rounded-[8px] hover:bg-[#3EBAD0]/45 transition">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
          </svg>
          Log out
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-white rounded-2xl shadow-sm m-6 p-10">
        <h1 className="text-2xl font-semibold mb-8">My Account</h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          {/* Avatar icon */}
          <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full">
          </div>

          {/* User Info */}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-medium">{user.name}</h2>
            </div>
            <p className="text-gray-500 text-sm">{user.role}</p>

            <div className="flex items-center gap-2 mt-2 text-gray-700">
              <span>{user.email}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyUserAccount;
