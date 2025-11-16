import React, { useState } from "react";
import { Event, useEventContext } from "../context/EventContext";
import { useNavigate } from "react-router-dom";
import PopupModal from "./PopupAlert";

interface EventCardProps {
  event: Event;
  role?: "user" | "organizer" | "admin";
}

const MyEventCard: React.FC<EventCardProps> = ({ event, role = "user" }) => {
  const { cancelJoinEvent, joinedEvents } = useEventContext();
  const navigate = useNavigate();
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const isJoined = joinedEvents.includes(event.id);

  const today = new Date();
  const eventDate = new Date(event.date);
  const diffDays = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const showUpcoming = isJoined && diffDays >= 0 && diffDays <= 3;

  const confirmCancel = () => {
    cancelJoinEvent(event.id);
    setIsCancelled(true);
    setShowCancelPopup(false);
  };

  if (isCancelled) return null;

  // Status badge logic
  const getStatusBadge = () => {
    if (role === "organizer" || role === "admin") {
      const status = event.adminStatus as any;
      switch (status) {
        case "Approved":
          return { text: "Approved", color: "bg-[#DCFCE7] text-[#16A34A]" };
        case "Pending":
          return { text: "Pending", color: "bg-[#FEF9C3] text-[#CA8A04]" };
        case "Rejected":
          return { text: "Rejected", color: "bg-[#FEE2E2] text-[#EF4444]" };
        default:
          return { text: "Unknown", color: "bg-gray-200 text-gray-600" };
      }
    }

    if (showUpcoming) return { text: "Upcoming", color: "bg-[#DBEAFE] text-[#3B82F6]" };
    if (isJoined) return { text: "Joined", color: "bg-[#DCFCE7] text-[#22C55E]" };
    return { text: "Not Joined", color: "bg-gray-100 text-gray-700" };
  };

  const statusBadge = getStatusBadge();

  const formatStatusDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      {showCancelPopup && (
        <PopupModal
          title="Cancel Booking?"
          message={
            <>
              This will cancel your booking. <br />
              Do you want to continue?
            </>
          }
          confirmText="Yes"
          cancelText="Back"
          confirmColor="red"
          onConfirm={confirmCancel}
          onCancel={() => setShowCancelPopup(false)}
        />
      )}

      <div
        className={`w-full min-w-[280px] max-w-lg bg-white rounded-[12px] shadow-sm border border-support1 p-5 flex flex-col h-full transition-all
          ${
            (role === "organizer" || role === "admin") && (event.adminStatus as any) === "Rejected"
              ? "" // no hover
              : "hover:shadow-md"
          }`}
      >
        {/* Title & Status */}
        <div className="flex justify-between items-start w-full flex-wrap gap-2">
          <h2 className={`text-[20px] sm:text-[24px] font-bold break-words ${
            (role === "organizer" || role === "admin") && (event.adminStatus as any) === "Rejected"
              ? "text-support3"
              : "text-primary"
          }`}>
            {event.title}
          </h2>

          <span className={`text-[14px] sm:text-[16px] font-semibold px-3 py-1 rounded-full whitespace-nowrap ${statusBadge.color}`}>
            {statusBadge.text}
          </span>
        </div>

        {/* Event Info */}
        <div className="flex flex-col gap-1 text-[14px] sm:text-[18px] text-text-black mt-2 break-words">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 font-semibold">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
              </svg>
              {new Date(event.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
            </div>

            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              {event.time}
            </div>

            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              {event.location}
            </div>
          </div>
        </div>

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="w-full mt-[10px] text-text-black font-medium flex flex-wrap gap-2 sm:gap-4 text-[14px] sm:text-[16px] mt-0">
            {event.tags.map((tag, index) => (
              <span key={index} className="bg-support2 text-text-black px-[15px] py-[3px] rounded-full">{tag}</span>
            ))}
          </div>
        )}

        <hr className="border-support1 mt-[10px] mb-[10px]" />
{/* Status Date & Buttons */}
<div
  className={`flex flex-col md:flex-col lg:flex-row md:items-start sm:items-center gap-2 mt-0 mb-0 flex-1
  ${role === "user" ? "justify-end" : "justify-between"}`}
>

  
  {/* Status Date (Organizer/Admin view) */}
  {(role === "organizer" || role === "admin") && (
    <div className="flex-1 flex flex-col justify-center font-semibold text-text-black text-[14px] sm:text-[16px] leading-tight">
      {(event.adminStatus as any) === "Pending" && (
        <>Date Submitted: <span className="text-support3">{formatStatusDate((event as any).statusDate)}</span></>
      )}
      {(event.adminStatus as any) === "Approved" && (
        <div className="flex flex-col space-y-[2px]">
          <span>Approved on: <span className="text-support3">{formatStatusDate((event as any).statusDate)}</span></span>
          <span>by {((event as any).approvedBy) || "Admin"}</span>
        </div>
      )}
      {(event.adminStatus as any) === "Rejected" && (
        <div className="flex flex-col space-y-[2px]">
          <span>Rejected on: <span className="text-support3">{formatStatusDate((event as any).statusDate)}</span></span>
          <span>by {((event as any).rejectedBy) || "Admin"}</span>
        </div>
      )}
    </div>
  )}

{/* Buttons */}
<div className="flex flex-col sm:flex-row gap-2 mt-2 lg:mt-0 
  items-center sm:items-end 
  w-full sm:w-full lg:w-auto">

  <button
    onClick={() => {
      if (role === "organizer") navigate(`/organizer/event/${event.id}`, { state: { event } });
      else if (role === "admin") navigate(`/admin/event/${event.id}`, { state: { event } });
      else navigate(`/event/${event.id}`, { state: { event } });
    }}
    className={`text-[14px] font-semibold px-3 py-2 rounded-[8px] transition
      w-full sm:w-full lg:w-fit
      ${
        (role === "organizer" || role === "admin") && (event.adminStatus as any) === "Rejected"
          ? "bg-support1 text-support3 hover:bg-support2"
          : "bg-[#3EBAD0]/30 text-primary hover:bg-[#3EBAD0]/45"
      }`}
  >
    View Details
  </button>

  {role === "user" && isJoined && (
    <button
      onClick={() => setShowCancelPopup(true)}
      className="text-[14px] font-semibold bg-support1 text-text-black px-3 py-2 rounded-[8px] hover:bg-support2 transition
        w-full sm:w-full lg:w-fit"
    >
      Cancel
    </button>
  )}

</div>

</div>


        
      </div>
    </>
  );
};

export default MyEventCard;
