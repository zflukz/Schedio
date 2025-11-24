import React, { useState, useMemo, useEffect } from "react";
import Navbar from "../component/Navbar";
import EventFilterbar from "../component/EventFilterbar";
import { Pagination } from "antd";
import MyEventCard from "../component/MyEventcard"; 
import "../App.css";
import { useUser } from "../App";
import { useEventContext } from "../context/EventContext";

const HomeAdmin: React.FC = () => {
	const { myEvents, fetchAdminEvents } = useEventContext();
	const { user } = useUser();
  const [hasFetched, setHasFetched] = useState(false);
  
  useEffect(() => {
    if (user && user.userRole === "admin" && !hasFetched) {
      fetchAdminEvents();
      setHasFetched(true);
    }
  }, [user, fetchAdminEvents, hasFetched]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);

  const [filters, setFilters] = useState({
	statuses: [] as string[],
	dateRange: null as [string, string] | null,
	search: "",
  });

  const visibleEvents = useMemo(() => {
  return myEvents.filter((e) => {
	const matchesSearch =
	  filters.search === "" ||
	  e.title.toLowerCase().includes(filters.search.toLowerCase());

	const matchesDate =
	  !filters.dateRange ||
	  (new Date(e.date) >= new Date(filters.dateRange[0]) && new Date(e.date) <= new Date(filters.dateRange[1]));

	const matchesStatus =
	  filters.statuses.length === 0 ||
	  (e.adminStatus && filters.statuses.includes(e.adminStatus));

	return matchesSearch && matchesDate && matchesStatus;
  });
}, [myEvents, filters]);


const startIndex = (currentPage - 1) * pageSize;
  const currentEvents = visibleEvents.slice(startIndex, startIndex + pageSize);
  

  const stats = useMemo(() => {
	const total = myEvents.length;
	const approved = myEvents.filter((e) => e.adminStatus === "Approved").length;
	const pending = myEvents.filter((e) => e.adminStatus === "Pending").length;
	const rejected = myEvents.filter((e) => e.adminStatus === "Rejected").length;
	return { total, approved, pending, rejected };
  }, [myEvents]);
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
			<h2 className="text-[30px] font-semibold">Events Management</h2>
		  </div>

		<EventFilterbar
		  categories={[]}
		  statuses={["Pending", "Approved", "Rejected"]}
		  forceMode="status"
		  onStatusChange={(s) => setFilters((prev) => ({ ...prev, statuses: s }))}
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
			total={visibleEvents.length}
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
	  <footer className="flex items-center justify-center py-[20px] text-[14px] font-normal mt-auto bg-bg-light">
        © 2025 Schedio. All rights reserved.
      </footer>
	</div>
  );
};

export default HomeAdmin;
