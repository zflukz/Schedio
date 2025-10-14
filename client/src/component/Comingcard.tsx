import React from "react";

interface EventDetailProps {
  title: string;
  date: string;
  time: string;
  place: string;
  objective: string;
  description: string;
  organizer: string;
  participants: number;
  maxParticipants: number;
}

const Upcomingcard: React.FC<EventDetailProps> = ({
  title,
  date,
  time,
  place,
  objective,
  description,
  organizer,
  participants,
  maxParticipants,
}) => {
  return (
    <div className="font-sans p-6 bg-white rounded-[20px] shadow-md max-w-lg mx-auto">
      <div className="inline-block bg-primary text-white font-bold text-[18px] px-[15px] py-[3px] mb-[20px] rounded-full">
        Happening Tomorrow
      </div>
      <div className="mb-[20px]">
        <h1 className="text-[20px] font-bold mb-[10px] text-primary">{title}</h1>
        <div className="flex items-center text-black font-semibold mb-[10px]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 mr-[10px]">
            <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
          </svg>
          {date}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-[10px] mr-[10px]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          {time}
        </div>
      <div className="flex items-center text-black font-semibold mb-[20px]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-[10px]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
        {place}
      </div>
      </div>
   
      <p className="text-gray-600 mb-1">
        <strong>Objective:</strong> {objective}
      </p>
      <p className="text-gray-700 mb-3">{description}</p>
      <p className="text-gray-600 mb-1">
        <strong>Organizer:</strong> {organizer}
      </p>
      <p className="text-gray-600">
        <strong>Participants:</strong> {participants}/{maxParticipants}
      </p>
    </div>

  );
};

export default Upcomingcard;
