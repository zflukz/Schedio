import React, { useState, useMemo } from "react";
import Navbar from "../component/Navbar";
import { useNavigate } from "react-router-dom";
import "../App.css";
import EventOrganizerAdminDetailCard from "../component/EventOrganizer&AdminDetailcard";
import { useUser } from "../App";
import { useParams } from "react-router-dom";
import { useEventContext, Event } from "../context/EventContext";




const EventOrganizerandAdminDatailed: React.FC = () => {
	const { events, joinEvent, cancelJoinEvent } = useEventContext();
	const { user, setUser } = useUser(); 
	const { eventId } = useParams<{ eventId: string }>();

  const navigate = useNavigate();
const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);


  const [filters, setFilters] = useState({
	categories: [] as string[],
	dateRange: null as [string, string] | null,
	search: "",
  });

  const visibleEvents = useMemo(() => {
  return filteredEvents.filter((e) => {
	const matchesSearch =
	  filters.search === "" ||
	  e.title.toLowerCase().includes(filters.search.toLowerCase());

	const matchesDate =
	  !filters.dateRange ||
	  (e.date >= filters.dateRange[0] && e.date <= filters.dateRange[1]);

	return matchesSearch && matchesDate;
  });
}, [filteredEvents, filters]);



const event = events.find((e) => e.id === eventId);

if (!user || user.userRole !== "admin" && user.userRole !== "organizer") {
	return (
	  <div className="flex justify-center items-center h-screen text-xl text-gray-500">
		You don’t have permission to access this page.
	  </div>
	);
  }

if (!event) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-500">
        Event not found.
      </div>
    );
  }

  return (
	<div className="font-sans bg-bg-light min-h-screen pt-[50px]">
		<div className="w-full px-[15px] sm:px-[25px] lg:px-[60px] pt-[25px] flex flex-col lg:flex-row lg:items-center relative">
		{/* Back Button */}
		<div className="flex justify-start mb-4 lg:mb-0">
			<button
				onClick={() => {
					if (user?.userRole === "admin") {
					navigate("/admin/dashboard"); 
					} else if (user?.userRole === "organizer") {
					navigate("/organizer/dashboard"); 
					} else {
					navigate("/"); 
					}
				}}			
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
			<Navbar />
		</div>
		</div>

		<div className="sm:pt-[50px] px-4 sm:px-6">
			<EventOrganizerAdminDetailCard
			event={{
				...event,
				statusDate: event.statusDate ?? new Date().toISOString().split("T")[0], // ยังเก็บวันที่ได้
			}}
			role={user?.userRole}
			/>
		</div>


	  <div className="flex items-center justify-center py-[10px] pt-[20px] text-[14px] font-normal">
		© 2025 Schedio. All rights reserved.
	  </div>
	</div>
  );
};

export default EventOrganizerandAdminDatailed;
