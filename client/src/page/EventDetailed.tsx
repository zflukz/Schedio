import React, { useState } from "react";
import Navbar from "../component/Navbar";
import HorizontalScrollCards from "../component/HorizontalScrollCards";
import EventDetailedcard from "../component/EventDetailedcard";
import { useLocation, useNavigate,useParams } from "react-router-dom"; 
import { useEventContext } from "../context/EventContext";

interface User {
  name: string;
  role: "admin" | "organizer" | "user";
}

 interface Event {
  id: string; // or number
  title: string;
  duration: string;
  date: string;
  time: string;
  location: string;
  totalseats: number;
  currentParticipants: number;
  phone?: number;
  tags: string[];
  imageUrl: string;
  description: string
}

interface Category {
  id: number;
  name: string;
}

function EventDetailedPage() {

  const navigate = useNavigate();
  const user: User | null = {
  name: "Thanrada",
  role: "user",
};
  const location = useLocation();
  const { event } = location.state as { event: Event };
  const { eventId } = useParams<{ eventId: string }>();
  const { events } = useEventContext();

  const handleViewDetails = (event: Event) => {
  navigate(`/event/${event.id}`, { state: { event } });
  };



  return (
    <div className="font-sans bg-background min-h-screen">
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

      <div className="my-[50px] px-4 sm:px-6">
        <EventDetailedcard event={event} user={user}/>
      </div>
      <div className="pb-[80px]">
      <HorizontalScrollCards
        events={events}
        onJoin={(event) => handleViewDetails(event)}
      />
      </div>      

      <div className="flex items-center justify-center py-[10px] pt-[30px] text-[14px] font-normal">
        © 2025 Schedio. All rights reserved.
      </div>
    </div>
  );
}

export default EventDetailedPage;
