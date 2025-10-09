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
    <div className="font-sans p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
		<div className="px-[15px] px-[3px] mx-[15px] rounded-full bg-[#4F4F4F] font-bold text-[18px]">
			Happening Tomorrow
		</div>
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-1">
        <strong>Date:</strong> {date}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Time:</strong> {time}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Place:</strong> {place}
      </p>
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
