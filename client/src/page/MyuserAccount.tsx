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
   <div className="flex min-h-screen bg-bg-light font-sans flex-col pt-[50px] px-[15px] sm:px-[25px] lg:px-[60px]">
  {/* Top Navbar + Back button */}
  <div className="w-full flex flex-col lg:flex-row lg:items-center relative mb-6">
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

    <div className="flex justify-center w-full lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
      <Navbar user={user} />
    </div>
  </div>

  {/* Main container: Sidebar + Content */}
<div className="flex flex-col lg:flex-row gap-6 bg-white px-[30px] py-[30px] rounded-[20px] max-w-[940px] w-full mx-auto my-[60px]">
    {/* Sidebar */}
  <div className="bg-white rounded-[12px] shadow-md px-[25px] py-[15px] flex flex-col gap-[10px] self-start">
      <button className="flex items-center gap-[10px] px-[15px] py-[5px] bg-primary text-text-white font-semibold rounded-[8px] shadow-sm transition">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6 text-text-white"
        >
          <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
        </svg>
        My Account
      </button>
      <button className="flex items-center gap-[10px] px-[15px] py-[5px] text-text-black font-semibold rounded-[8px] hover:bg-[#3EBAD0]/45 transition">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
        </svg>
        Log out
      </button>
    </div>

    {/* Main content */}
    <main className="flex-1 sm:pl-[50px] ">
      <h1 className="text-[30px] font-semibold mb-[20px]">My Account</h1>

      <div className="flex flex-col gap-4">
        {/* Row 1: Avatar + Name/Role */}
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 flex-shrink-0">
            <img src="/MyuserProfile.svg" alt="Avatar" className="w-full h-full rounded-full" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="text-[18px] font-semibold">{user.name}</h2>
              {/* Edit icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                className="text-black hover:text-primary transition-colors duration-200 cursor-pointer"
              >
                <path
                  d="M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-support3 text-[16px] mt-1">{user.role}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center">
          <hr className="border-support1 flex-1 max-w-[380px]" />
        </div>

        {/* Row 2: Email */}
        <div className="flex items-center gap-2 text-[18px] font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>
          <span>{user.email}</span>
        </div>
      </div>
    </main>
  </div>
</div>

  );
};

export default MyUserAccount;
