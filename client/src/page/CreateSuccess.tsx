import React from "react";
import Navbar from "../component/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../App";
import { useEventContext, Event } from "../context/EventContext";

const CreateSuccess: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();


  if (!user || user.userRole !== "organizer") {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-500">
        You don’t have permission to access this page.
      </div>
    );
  }


  return (
    <div className="font-sans bg-bg-light flex flex-col min-h-screen pt-[50px]">
      {/* Top Header */}
      <div className="w-full px-[15px] sm:px-[25px] lg:px-[60px] pt-[25px] flex flex-col lg:flex-row lg:items-center relative">
        <div className="flex justify-start mb-4 lg:mb-0">
          <button
            onClick={() => navigate("/organizer/dashboard")}
            className="flex items-center bg-white text-black py-[8px] px-[20px] rounded-full font-semibold text-[16px] hover:shadow-md transition z-10"
          >
            Back
          </button>
        </div>
        <div className="flex justify-center w-full lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          <Navbar />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-4">
        <div className="text-[30px] font-bold mb-2 text-text-black">
          Event submitted successfully!
        </div>
        <div className="text-[20px] font-medium mb-4 text-text-black">
          Your event has been submitted.
          <span className="block sm:inline"> Waiting for approval.</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/organizer/dashboard")}
            className="flex items-center bg-white text-text-black py-[8px] px-[20px] rounded-[8px] font-semibold text-[18px] hover:shadow-md transition"
          >
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 mr-[10px]">
			<path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
			<path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
			</svg>
            Back to Home
          </button>
          <button
            onClick={() => navigate("/organizer/dashboard")}
            className="flex items-center bg-[#3EBAD0]/30 text-primary hover:bg-[#3EBAD0]/45 py-[8px] px-[20px] rounded-[8px] font-semibold text-[18px] hover:shadow-md transition"
          >
            View Detailed
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center py-[10px] text-[14px] font-normal">
        © 2025 Schedio. All rights reserved.
      </div>
    </div>
  );
};

export default CreateSuccess;
