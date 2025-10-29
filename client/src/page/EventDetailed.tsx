import React, { useState } from "react";
import Navbar from "../component/Navbar";
import HorizontalScrollCards from "../component/HorizontalScrollCards";
import EventDetailedcard from "../component/EventDetailedcard";
import { useLocation, useNavigate,useParams } from "react-router-dom"; 
import { useEventContext } from "../context/EventContext";

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

interface Category {
  id: number;
  name: string;
}

function EventDetailedPage() {

  const navigate = useNavigate();
  const user: User | null = {
  name: "Thanrada",
  role: "user",
};
  const location = useLocation();
  const { event } = location.state as { event: Event };
  const { eventId } = useParams<{ eventId: string }>();
  const { events } = useEventContext();

  const handleViewDetails = (event: Event) => {
  navigate(`/event/${event.id}`, { state: { event } });
  };



  return (
    <div className="font-sans bg-background min-h-screen pt-[50px]">
      <div className="mx-[15px] sm:mx-[25px] lg:mx-auto">
        <Navbar user={user} />
      </div>

      <div className="my-[80px] px-4 sm:px-6">
        <EventDetailedcard event={event} user={user}/>
      </div>

      <div className="pb-[80px]">
      <HorizontalScrollCards
        events={events}
        onJoin={(event) => handleViewDetails(event)}
      />
      </div>      

      <div className="flex items-center justify-center py-[10px] pt-[30px] text-[14px] font-normal">
        © 2025 Schedio. All rights reserved.
      </div>
    </div>
  );
}

export default EventDetailedPage;
