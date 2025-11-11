import React from "react";
interface EventDetailProps {
  id: string; // or number
  title: string;
  date: string;
  time: string;
  place: string;
  objective: string;
  description: string;
  organizer: string;
  currentParticipants: number;
  totalseats: number;
  user?: { name: string; role: string } | null;
  onJoin?: () => void;
  onCancel?: () => void;
}

const Upcomingcard: React.FC<EventDetailProps> = ({
  title,
  date,
  time,
  place,
  objective,
  description,
  organizer,
  currentParticipants,
  totalseats,
  onJoin,
}) => {
  const percentage = Math.round((currentParticipants / totalseats) * 100);

  return (
    <div className="font-sans p-[30px] bg-white rounded-[20px] shadow-md w-full max-w-sm md:max-w-sm min-w-[380px] mx-auto">
      <div className="inline-block bg-[#4F4F4F] text-white font-bold text-[18px] px-[15px] py-[3px] mb-[15px] rounded-full">
        🔥 Happening Soon!
      </div>
      <div className="mb-[15px]">
        <h1 className="text-[20px] font-bold mb-[10px] text-primary">{title}</h1>
        <div className="flex items-center text-text-black font-semibold mb-[10px]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 mr-[10px]">
            <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
          </svg>
          <div>
            {new Date(date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-[10px] mr-[10px]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          {time}
        </div>
      <div className="flex items-center text-text-black font-semibold mb-[15px]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-[10px]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
        {place}
      </div>
      </div>
        <div className="mb-[15px] font-semibold text-[16px]">
          <div className="flex justify-between items-center text-support3 mb-2">
            <div className="flex items-center gap-[10px] text-text-black">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
              </svg>
              <span>{currentParticipants} Joined</span>
            </div>
            <span className="text-support3">{totalseats} seats</span>
          </div>
          <div className="w-full bg-support1 rounded-full h-3 overflow-hidden">
            <div
              className="bg-yellow-300 h-3 rounded-full transition-all"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <p className="text-support3 mt-1">{percentage}% Full</p>
        </div>

      {/* Button */}
      <button 
        onClick={onJoin}
        className="w-full bg-night-default text-white py-2 rounded-[10px] font-bold text-[18px] hover:bg-night-hover transition"
      >
        Join Now
      </button>
    </div>

  );
};

export default Upcomingcard;
