import React from "react";
import JoinButton from "./JoinButton";
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

interface EventDetailedcardProps {
  event: Event;
  user?: User | null;
}

const EventDetailedcard: React.FC<EventDetailedcardProps> = ({ event ,user}) => {
    const handleJoin = () => {
    console.log("User joined this event!");
  };

  const handleCancel = () => {
    console.log("User canceled the booking!");
  };
  return (
    <div className="bg-white rounded-[20px] shadow-md p-[25px] max-w-[900px] mx-auto flex flex-col lg:flex-row gap-[20px]">
      {/* Left Image */}
      <div className="flex-shrink-0 w-full lg:w-[40%] rounded-[15px] overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Content */}
      <div className="flex flex-col justify-between w-full lg:w-[60%]">
        <div>
          {/* Title + Duration */}
          <div className="flex items-center justify-between w-full gap-[10px]">
            <h2 className="text-primary font-bold text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] truncate">
              {event.title}
            </h2>
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
          </div>


          {/* Tags */}
          <div className="flex flex-wrap gap-[10px] mt-[10px] text-[20px] font-semibold mb-[20px]">
            {event.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-support2 text-text-black px-[15px] py-[3px] rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Details */}
          <div className="text-[22px] flex flex-col gap-[10px]">
            <div className="flex items-center text-text-black font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 mr-[10px]"
              >
                <path
                  fillRule="evenodd"
                  d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                  clipRule="evenodd"
                />
              </svg>
              {event.date}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 ml-[10px] mr-[10px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              {event.time}
            </div>

            <div className="flex items-center text-text-black font-semibold">
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
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              {event.location}
            </div>

            <div className="flex items-center text-text-black font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 mr-[10px]"
              >
                <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
              </svg>
              {event.totalseats} Seats
            </div>

            <div className="flex items-center text-text-black font-semibold">
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
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
              0{event.phone}
            </div>
          </div>

          {/* Description */}
          <div className="mt-[20px] flex flex-col">
            <h3 className="font-bold text-[24px] mb-[10px] text-center">Event Description</h3>
            <p className="text-[18px] text-text-black leading-relaxed">
              {event.description} 
            </p>
          </div>
        </div>

        {/* Join Button */}
        <div className="mt-5 ">
          <JoinButton onJoin={handleJoin} 
          onCancel={handleCancel}  
          user={user}
          totalSeats={event.totalseats}       
          currentParticipants={event.currentParticipants}
          />
        </div>
      </div>
    </div>
  );
};

export default EventDetailedcard;
