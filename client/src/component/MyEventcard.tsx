import React from "react";
import { Event, useEventContext } from "../context/EventContext";

interface EventCardProps {
  event: Event;
}

const MyEventCard: React.FC<EventCardProps> = ({ event }) => {
  const { joinEvent, cancelJoinEvent, joinedEvents } = useEventContext();

  const isFull = event.currentParticipants >= event.totalseats;
  const isJoined = joinedEvents.includes(event.id); // user-specific join

  // Logic สำหรับ upcoming (ใกล้ถึงวันงาน)
  const today = new Date();
  const eventDate = new Date(event.date);
  const diffTime = eventDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const daysBeforeUpcoming = 3; // กำหนด threshold 3 วัน
  const showUpcoming = isJoined && diffDays <= daysBeforeUpcoming && diffDays >= 0;

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex flex-col space-y-3 transition-all hover:shadow-md">
      {/* Title & Status */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-sky-600">{event.title}</h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1 bg-secondary text-text-black text-[16px] font-semibold px-[15px] py-[3px] rounded-full whitespace-nowrap flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
              {event.duration}
            </div>

            <span
              className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                showUpcoming
                  ? "bg-green-100 text-green-700"
                  : isJoined
                  ? "bg-yellow-100 text-yellow-700"
                  : isFull
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {showUpcoming
                ? "Upcoming"
                : isJoined
                ? "Joined"
                : isFull
                ? "Full"
                : "Not Joined"}
            </span>
          </div>
        </div>
      </div>

      {/* Event Info */}
      <div className="flex flex-col gap-1 text-sm text-gray-600 mt-2">
        <div>
			{new Date(event.date).toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "short",
			year: "numeric",
			})}
		</div>
        <div>{event.time}</div>
        <div>{event.location}</div>
      </div>

      {/* Seats Info */}
      <p className="text-sm text-gray-500 mt-1">
        Participants:{" "}
        <span className="font-medium text-gray-700">
          {event.currentParticipants}/{event.totalseats}
        </span>
      </p>

      <hr className="border-gray-200" />

      {/* Buttons */}
      <div className="flex justify-end gap-2 mt-1">
        <button
          className="text-sm font-medium bg-sky-100 text-sky-700 px-4 py-1.5 rounded-lg hover:bg-sky-200 transition"
          onClick={() => alert(`Viewing details for ${event.title}`)}
        >
          View Details
        </button>

        {!isJoined ? (
          <button
            disabled={isFull}
            onClick={() => joinEvent(event.id)}
            className={`text-sm font-medium px-4 py-1.5 rounded-lg transition ${
              isFull
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            {isFull ? "Full" : "Join"}
          </button>
        ) : (
          <button
            onClick={() => cancelJoinEvent(event.id)}
            className="text-sm font-medium bg-red-100 text-red-700 px-4 py-1.5 rounded-lg hover:bg-red-200 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default MyEventCard;
