import React, { useState, useMemo } from "react";
import Navbar from "../component/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";
import EventOrganizerAdminDetailCard from "../component/EventOrganizer&AdminDetailcard";
import { useUser } from "../App";
import { useEventContext, Event } from "../context/EventContext";

const EventOrganizerandAdminDatailed: React.FC = () => {
  const { events } = useEventContext();
  const { user } = useUser(); 
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  const event = events.find((e) => e.id === eventId);

  const [viewSection, setViewSection] = useState<"detail" | "users">("detail");

  if (!user || (user.userRole !== "admin" && user.userRole !== "organizer")) {
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
<div className="flex flex-col min-h-screen bg-bg-light">
      {/* Header with back button and navbar */}
  <div className="w-full px-[15px] sm:px-[25px] lg:px-[60px] lg:top-[50px] pt-[25px] flex flex-col lg:flex-row lg:items-center relative">
        <div className="flex justify-start mb-4 lg:mb-0">
          <button
            onClick={() => {
              if (user?.userRole === "admin") navigate("/admin/dashboard");
              else if (user?.userRole === "organizer") navigate("/organizer/dashboard");
              else navigate("/");
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

        <div className="flex justify-center w-full lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
          <Navbar />
        </div>
      </div>

  <div className="lg:pt-[80px] px-4 sm:px-6 w-full">
        {/* Toggle Buttons for Organizer */}
			{user?.userRole === "organizer" && (
			<div className="flex justify-center mb-6 \">
				<div className="flex items-center text-center mt-[30px] lg:mt-[80px] gap-4 px-4 py-2 rounded-full bg-white max-w-[500px] w-full">
				<button
					onClick={() => setViewSection("detail")}
					className={`flex-1 px-4 py-2 rounded-full font-semibold transition text-center ${
					viewSection === "detail"
						? "bg-night-default text-text-white"
						: "bg-none text-text-black hover:bg-[#0D0D0D]/30"
					}`}
				>
					Event Details
				</button>
				<button
					onClick={() => setViewSection("users")}
					className={`flex-1 px-4 py-2 rounded-full font-semibold transition text-center ${
					viewSection === "users"
						? "bg-night-default text-text-white"
						: "bg-none text-text-black hover:bg-[#0D0D0D]/30"
					}`}
				>
					Users Joined
				</button>
				</div>
			</div>
		)}



        {/* Conditional Rendering */}
        {viewSection === "detail" && (
          <EventOrganizerAdminDetailCard
            event={{
              ...event,
              statusDate: event.statusDate ?? new Date().toISOString().split("T")[0],
            }}
            role={user?.userRole}
          />
        )}

        {viewSection === "users" && event.joinedUsers && event.joinedUsers.length > 0 && (
          <div className="max-w-[770px] mx-auto bg-white p-[25px] rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Users Joined</h2>
            <div className="overflow-x-auto rounded-[8px] border border-support2">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-support1 text-left text-text-black font-semibold">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                  </tr>
                </thead>
                <tbody className="text-text-black bg-white">
                  {event.joinedUsers.map(u => (
                    <tr key={u.id} className="border-t border-support2 hover:bg-gray-50">
                      <td className="px-4 py-3">{u.name}</td>
                      <td className="px-4 py-3">{u.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {viewSection === "users" && (!event.joinedUsers || event.joinedUsers.length === 0) && (
          <p className="mt-4 text-support3 text-center">No users have joined this event yet.</p>
        )}
      </div>

      {/* Footer */}
  	<div className="flex items-center  justify-center py-[20px] text-[14px] font-normal bg-bg-light">
        © 2025 Schedio. All rights reserved.
      </div>
    </div>
  );
};

export default EventOrganizerandAdminDatailed;
