import React from "react";
import { useEventContext } from "../context/EventContext";
import MyEventCard from "../component/MyEventcard";
import Navbar from "../component/Navbar";
import { useNavigate } from "react-router-dom";

const MyEventsList: React.FC = () => {
  const { events, joinedEvents } = useEventContext();
  const navigate = useNavigate();

  const user = {
    name: "Thanrada",
    role: "user" as const,
  };

  // กรองเฉพาะ event ที่ user join
  const myEvents = events.filter((ev) => joinedEvents.includes(ev.id));

  if (myEvents.length === 0) {
    return (
      <div className="font-sans bg-bg-light min-h-screen flex flex-col">
        <div className="relative w-full flex flex-col lg:flex-row lg:items-center lg:justify-center px-[15px] sm:px-[25px] lg:px-[60px] pt-[50px]">
		{/* Back Button */}
		<button
			onClick={() => navigate("/")}
			className="absolute left-[15px] sm:left-[25px] lg:left-[60px] top-[55px] lg:top-auto lg:static flex items-center bg-white text-black py-[8px] px-[20px] rounded-full font-semibold text-[16px] hover:shadow-md transition"
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

		{/* Navbar Centered */}
		<div className="flex justify-center w-full lg:flex-grow mt-[60px] lg:mt-0">
			<Navbar user={user} />
		</div>
		</div>




        {/* Center Message */}
        <div className="flex flex-1 justify-center items-center">
          <p className="text-[26px] sm:text-[30px] font-semibold text-text-black text-center px-4">
            No events joined yet. <br/>Explore and join some!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans bg-bg-light min-h-screen pt-[50px] px-[15px] sm:px-[25px] lg:px-[40px]">
      {/* Navbar */}
      <div className="flex flex-col sm:flex-row sm:items-center w-full gap-[30px] mb-6">
        <div className="flex justify-start sm:w-auto">
          <button
            onClick={() => navigate("/")}
            className="flex items-center bg-white text-black py-[8px] px-[20px] rounded-full font-semibold text-[16px] hover:shadow-md transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-[10px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
            Back
          </button>
        </div>
        <div className="flex-1 flex justify-center w-full">
          <Navbar user={user} />
        </div>
      </div>

      {/* Joined Events List */}
      <div className="flex flex-col gap-4">
        {myEvents.map((ev) => (
          <MyEventCard key={ev.id} event={ev} />
        ))}
      </div>
    </div>
  );
};

export default MyEventsList;
