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
  const diffTime = eventDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const daysBeforeUpcoming = 3;
  const showUpcoming = isJoined && diffDays <= daysBeforeUpcoming && diffDays >= 0;

  const confirmCancel = () => {
    cancelJoinEvent(event.id);
    setIsCancelled(true);
    setShowCancelPopup(false);
  };

  if (isCancelled) return null;

  // Status badge logic
  const getStatusBadge = () => {
    if (role === "organizer") {
      const organizerStatus = event.status as any;
      switch (organizerStatus) {
        case "Approved":
          return { text: "Approved", color: "bg-[#DCFCE7] text-[#22C55E]" };
        case "Pending":
          return { text: "Pending", color: "bg-[#FEF9C3] text-[#EAB308]" };
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
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleDateString("en-GB", {
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
        className={`w-full min-w-[280px] max-w-lg bg-white rounded-[12px] shadow-sm border border-support1 p-5 flex flex-col space-y-2 transition-all
          ${
            role === "organizer" && (event.status as any) === "Rejected"
              ? "" // no hover
              : "hover:shadow-md"
          }`}
      >
        {/* Title & Status */}
        <div className="flex justify-between items-start w-full flex-wrap gap-2">
          <div className="flex flex-wrap items-start gap-2 sm:gap-4 flex-1">
            <h2
              className={`text-[20px] sm:text-[20px] md:text-[24px] font-bold break-words ${
                role === "organizer" && (event.status as any) === "Rejected" ? "text-support3" : "text-primary"
              }`}
            >
              {event.title}
            </h2>
          </div>

          <span
            className={`text-[14px] sm:text-[18px] font-semibold px-3 sm:px-3 py-1 rounded-full whitespace-nowrap ${statusBadge.color}`}
          >
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
              {new Date(event.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
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
          <div className="w-full text-text-black font-medium flex flex-wrap gap-2 sm:gap-4 text-[14px] sm:text-[16px] mt-0">
            {event.tags.map((tag, index) => (
              <span key={index} className="bg-support2 text-text-black px-[15px] py-[3px] rounded-full">{tag}</span>
            ))}
          </div>
        )}

        <hr className="border-support1" />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 w-full">
          {/* Status Date (Organizer view) */}
          {role === "organizer" && (
            <p className="font-semibold text-text-black text-[14px] sm:text-[16px] whitespace-nowrap">
              {(event.status as any) === "Pending" && (
                <>Date Submitted: <span className="text-support3">{formatStatusDate((event as any).statusDate)}</span></>
              )}
              {(event.status as any) === "Approved" && (
                <>Approved on: <span className="text-support3">{formatStatusDate((event as any).statusDate)}</span></>
              )}
              {(event.status as any) === "Rejected" && (
                <>Rejected on: <span className="text-support3">{formatStatusDate((event as any).statusDate)}</span></>
              )}
            </p>
          )}

          <div className="flex gap-2 flex-nowrap ml-auto">
            {/* View Details Button */}
            <button
              onClick={() => {
                if (!(role === "organizer" && (event.status as any) === "Rejected")) {
                  navigate(`/event/${event.id}`, { state: { event } });
                }
              }}
              className={`text-[14px] font-semibold px-3 py-2 rounded-[8px] transition
                ${
                  role === "organizer" && (event.status as any) === "Rejected"
                    ? "bg-support1 text-support3 hover:bg-support2"
                    : "bg-[#3EBAD0]/30 text-primary hover:bg-[#3EBAD0]/45"
                }`}
            >
              View Details
            </button>


            {/* Cancel button for Pending organizers or joined users */}
            {(role === "user" && isJoined) || (role === "organizer" && (event.status as any) === "Pending") ? (
              <button
                onClick={() => setShowCancelPopup(true)}
                className="text-[14px] font-semibold bg-support1 text-text-black px-3 py-2 rounded-[8px] hover:bg-support2 transition"
              >
                Cancel
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyEventCard;
