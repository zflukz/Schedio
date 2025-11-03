import React from "react";
import { Event, useEventContext } from "../context/EventContext";
import { useNavigate } from "react-router-dom";
interface EventCardProps {
  event: Event;
}

const MyEventCard: React.FC<EventCardProps> = ({ event }) => {
  const { joinEvent, cancelJoinEvent, joinedEvents } = useEventContext();
  const navigate = useNavigate();

  const handleViewDetails = (event: Event) => {
  navigate(`/event/${event.id}`, { state: { event } });
  };
  const isJoined = joinedEvents.includes(event.id); // user-specific join

  // Logic สำหรับ upcoming (ใกล้ถึงวันงาน)
  const today = new Date();
  const eventDate = new Date(event.date);
  const diffTime = eventDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const daysBeforeUpcoming = 3; // กำหนด threshold 3 วัน
  const showUpcoming = isJoined && diffDays <= daysBeforeUpcoming && diffDays >= 0;

  return (
    <div className="w-full min-w-[280px] max-w-lg bg-white rounded-[12px] shadow-sm border border-support1 p-5 flex flex-col space-y-2 transition-all hover:shadow-md">
  {/* Title & Status */}
    <div className="flex justify-between items-start w-full flex-wrap gap-2">
      {/* Left: title + duration */}
      <div className="flex flex-wrap items-start gap-2 sm:gap-4 flex-1">
        <h2 className="text-[20px] sm:text-[20px] md:text-[24px] font-bold text-primary break-words">
          {event.title}
        </h2>
        <div className="flex items-center gap-1 bg-secondary text-text-black text-[12px] sm:text-[16px] font-semibold px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 sm:w-5 sm:h-6 text-white"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clipRule="evenodd"
            />
          </svg>
          {event.duration}
        </div>
      </div>

      {/* Right: status */}
      <span
        className={`text-[12px] sm:text-[18px] font-semibold px-2 sm:px-3 py-1 rounded-full whitespace-nowrap ${
          showUpcoming
            ? "bg-[#DBEAFE] text-[#3B82F6]"
            : isJoined
            ? "bg-[#DCFCE7] text-[#22C55E]"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {showUpcoming ? "Upcoming" : isJoined ? "Joined" : "Not Joined"}
      </span>
    </div>


  {/* Event Info */}
  <div className="flex flex-col gap-1 text-[14px] sm:text-[18px] text-text-black mt-2 break-words">
    <div className="flex flex-wrap items-center gap-2 sm:gap-4 font-semibold">
      {/* Date */}
      <div className="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
        </svg>
        {new Date(event.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
      </div>

      {/* Time */}
      <div className="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        {event.time}
      </div>

      {/* Location */}
      <div className="flex items-center gap-1 break-words max-w-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
        {event.location}
      </div>
    </div>
  </div>

  {/* Tags */}
<div className="w-full text-text-black font-semibold flex flex-wrap gap-2 sm:gap-4 text-[14px] sm:text-[18px] mt-0">
  {event.tags.map((tag, index) => (
    <span key={index}>{tag}</span>
  ))}
</div>



  <hr className="border-support1" />

  {/* Buttons */}
  <div className="flex flex-wrap gap-2 mt-2 justify-end">
    <button
      className="text-[14px] font-semibold bg-[#3EBAD0]/30 text-primary px-3 py-2 rounded-[8px] hover:bg-[#3EBAD0]/45 transition"
      onClick={() => handleViewDetails(event)}
    >
      View Details
    </button>

    <button
      onClick={() => cancelJoinEvent(event.id)}
      className="text-[14px] font-semibold bg-support1 text-text-black px-3 py-2 rounded-[8px] hover:bg-support2 transition"
    >
      Cancel
    </button>
  </div>
</div>

  );
};

export default MyEventCard;
