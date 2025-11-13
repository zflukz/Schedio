import React, { useState, useMemo } from "react";
import Navbar from "../component/Navbar";
import EventFilterbar from "../component/EventFilterbar";
import { Pagination, Button } from "antd";
import { useNavigate } from "react-router-dom";
import MyEventCard from "../component/MyEventcard"; 
import "../App.css";
import EventOrganizerAdminDetailCard from "../component/EventOrganizer&AdminDetailcard";
import { useUser } from "../App";
import { useEventContext, Event } from "../context/EventContext";

const HomeAdmin: React.FC = () => {
	const { events } = useEventContext();
	const { user, setUser } = useUser(); 
  const navigate = useNavigate();
	const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const eventsPerPage = 4;

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


const startIndex = (currentPage - 1) * pageSize;
  const currentEvents = visibleEvents.slice(startIndex, startIndex + pageSize);
  

  const stats = useMemo(() => {
	const total = events.length;
	const approved = events.filter((e) => e.adminStatus === "Approved").length;
	const pending = events.filter((e) => e.adminStatus === "Pending").length;
	const rejected = events.filter((e) => e.adminStatus === "Rejected").length;
	return { total, approved, pending, rejected };
  }, [events]);
  
const selectedEventId = "1"; // เปลี่ยนเป็น id ที่คุณอยากโชว์
  const selectedEvent = events.find((ev) => ev.id === selectedEventId);
if (!user || user.userRole !== "admin") {
	return (
	  <div className="flex justify-center items-center h-screen text-xl text-gray-500">
		You don’t have permission to access this page.
	  </div>
	);
  }
console.log("User in HomeAdmin:", user);

  return (
	<div className="font-sans bg-bg-light min-h-screen pt-[50px]">
		<div className="flex-1 flex justify-center px-[15px] sm:px-[25px] lg:px-0">
		  <Navbar />
		</div>

	  <div className="flex justify-center items-center pt-[30px]">
		<div className="w-[90%] max-w-[1200px] px-[30px] py-[20px] sm:px-[30px] sm:py-[30px]">
		  <h1 className="text-[30px] font-semibold mb-6 text-center">Dashboard Overview</h1>
		  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
			<div className="bg-white rounded-[15px] p-5 shadow-sm text-center font-medium">
			  <p className="text-text-black">Total Events</p>
			  <p className="text-[30px] font-bold text-primary">{stats.total}</p>
			</div>
			<div className="bg-white rounded-[15px] p-5 shadow-sm text-center">
			  <p className="text-text-black">Approved</p>
			  <p className="text-[30px] font-bold text-green-600">{stats.approved}</p>
			</div>
			<div className="bg-white rounded-[15px] p-5 shadow-sm text-center">
			  <p className="text-text-black">Pending</p>
			  <p className="text-[30px] font-bold text-yellow-500">{stats.pending}</p>
			</div>
			<div className="bg-white rounded-[15px] p-5 shadow-sm text-center">
			  <p className="text-text-black">Rejected</p>
			  <p className="text-[30px] font-bold text-red-500">{stats.rejected}</p>
			</div>
		  </div>
		</div>
	  </div>

	  <div className="pt-[30px] px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto bg-white p-[25px] rounded-2xl shadow-sm py-[20px] ">
		  <div className="flex flex-row items-start justify-between mb-6 gap-4">
			<h2 className="text-[30px] font-semibold">My Events ({events.length})</h2>
			<button
			  className="flex gap-[10px] bg-night-default hover:bg-night-hover text-white font-semibold px-[15px] py-[8px] rounded-[8px] flex-shrink-0"
			  onClick={() => navigate("/organizer/create event")}
			>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
			<path fillRule="evenodd" d="M19.5 21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-5.379a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H4.5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h15Zm-6.75-10.5a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V10.5Z" clipRule="evenodd" />
			</svg>
			  Create Event
			</button>
		  </div>

		<EventFilterbar
		  categories={[
			{ id: 1, name: "Paranormal" },
			{ id: 2, name: "Art" },
			{ id: 3, name: "Culture" },
			{ id: 4, name: "Contest" },
		  ]}
		  onCategoriesChange={(c) => setFilters((prev) => ({ ...prev, categories: c }))}
		  onDateRangeChange={(d) => setFilters((prev) => ({ ...prev, dateRange: d }))}
		  onSearchChange={(s) => setFilters((prev) => ({ ...prev, search: s }))}
		/>

		<div className="grid md:grid-cols-2 gap-6 mt-8 justify-items-center">
		  {currentEvents.length > 0 ? (
			currentEvents.map((event) => (
			  <MyEventCard key={event.id} event={event as any} role="organizer" />
			))
		  ) : (
			<p className="text-gray-500 text-center col-span-2">No events found.</p>
		  )}
		</div>

		{/* Pagination */}
		<div className="flex justify-center pt-[20px]">
		  <Pagination
			current={currentPage}
			pageSize={pageSize}
			total={filteredEvents.length}
			onChange={(page, size) => {
			  setCurrentPage(page);
			  if (size) setPageSize(size);
			}}
			showSizeChanger={true} // เปิด dropdown เลือก pageSize
			pageSizeOptions={['3','6','9','12']}
			className="custom-pagination"
		  />
		</div>
		</div>
	  </div>
	  <div className="flex items-center justify-center py-[10px] pt-[30px] text-[14px] font-normal">
		© 2025 Schedio. All rights reserved.
	  </div>
	</div>
  );
};

export default HomeAdmin;
