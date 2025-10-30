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
		{/* Top section with Navbar and Back button */}
		<div className="relative w-full flex flex-col lg:flex-row lg:items-center lg:justify-center px-[15px] sm:px-[25px] lg:px-[60px] pt-[50px]">
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

		{/* Center message section */}
		<div className="flex flex-col justify-center items-center flex-1 gap-[30px] pb-[60px]">
		<p className="text-[26px] sm:text-[30px] font-semibold text-text-black text-center px-4">
			No events joined yet. <br />Explore and join some!
		</p>

		<button
			onClick={() => navigate("/")}
			className="flex items-center bg-primary text-white py-[8px] px-[20px] rounded-[8px] font-semibold text-[18px] hover:shadow-md transition"
		>
			<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
			className="size-6 mr-[10px] text-white"
			>
			<path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
			<path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
			</svg>
			Back to Home
		</button>
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
