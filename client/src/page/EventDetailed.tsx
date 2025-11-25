import Navbar from "../component/Navbar";
import HorizontalScrollCards from "../component/HorizontalScrollCards";
import EventDetailedcard from "../component/EventDetailedcard";
import { useLocation, useNavigate,useParams } from "react-router"; 
import { useEventContext, Event } from "../context/EventContext";
import { useUser } from "../App";
import { useEffect, useState } from "react";

function EventDetailedPage() {

  const navigate = useNavigate();
  const { user } = useUser();
  const location = useLocation();
  const { eventId } = useParams<{ eventId: string }>();
  const { events, upcoming, fetchHomeEvents, fetchOrganizerEvents, fetchUpcoming } = useEventContext();
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  
  useEffect(() => {
    if (eventId && user) {
      // Check if this is user's event by checking if user is organizer
      const checkIfMyEvent = async () => {
        if (user.userRole === "organizer") {
          await fetchOrganizerEvents(user.userID);
          const myEvent = events.find(e => e.id === eventId);
          if (myEvent) {
            setCurrentEvent(myEvent);
            return;
          }
        }
        
        // If not organizer's event, fetch from home events
        await fetchHomeEvents();
        const homeEvent = events.find(e => e.id === eventId);
        if (homeEvent) {
          setCurrentEvent(homeEvent);
        }
      };
      
      checkIfMyEvent();
      // Fetch upcoming events for the happening soon section
      fetchUpcoming();
    } else if (location.state?.event) {
      // Fallback to location state if available
      setCurrentEvent(location.state.event);
      // Still fetch upcoming events
      fetchUpcoming();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId, user]);
  
  useEffect(() => {
    // Update current event when events change
    if (eventId && events.length > 0) {
      const foundEvent = events.find(e => e.id === eventId);
      if (foundEvent) {
        setCurrentEvent(foundEvent);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events, eventId]);

  const handleViewDetails = (event: Event) => {
  navigate(`/event/${event.id}`, { state: { event } });
  };



  return (
<div className="flex flex-col min-h-screen bg-bg-light">
  <div className="w-full px-[15px] sm:px-[25px] lg:px-[60px] lg:top-[50px] pt-[25px] flex flex-col lg:flex-row lg:items-center relative">
      {/* Back Button */}
      <div className="flex justify-start mb-4 lg:mb-0">
        <button
          onClick={() => navigate("/")}
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

      {/* Navbar Centered */}
      <div className="flex justify-center w-full lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
        <Navbar />
      </div>
    </div>

      <div className="my-[30px] lg:mt-[150px] px-4 sm:px-6">
        {currentEvent ? (
          <EventDetailedcard event={currentEvent} user={user ? {
            name: user.userName || user.firstName || "User",
            role: user.userRole?.toLowerCase() === "admin" ? "admin" : user.userRole?.toLowerCase() === "organizer" ? "organizer" : "user"
          } : null}/>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500 text-xl">Loading event details...</p>
          </div>
        )}
      </div>
      <div className="pb-[80px]">
      <HorizontalScrollCards
        events={upcoming}
        onJoin={(event) => handleViewDetails(event)}
      />
      </div>      

       <footer className="flex items-center justify-center py-[20px] text-[14px] font-normal mt-auto bg-bg-light">
        © 2025 Schedio. All rights reserved.
      </footer>
    </div>
  );
}

export default EventDetailedPage;
