import React, { useEffect, useState } from "react";
import Upcomingcard from "./Comingcard";
import useEmblaCarousel from "embla-carousel-react";
import { useNavigate } from "react-router-dom";
import { Event } from "../context/EventContext";


interface HorizontalScrollCardsProps {
  events: Event[];
  onJoin?: (event: Event) => void;
}

const HorizontalScrollCards: React.FC<HorizontalScrollCardsProps> = ({ events, onJoin }) => {
  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
  });
  const [cardsPerPage, setCardsPerPage] = useState(3);

  const updateCardsPerPage = () => {
    if (window.innerWidth < 640) setCardsPerPage(1);
    else if (window.innerWidth < 1024) setCardsPerPage(2);
    else setCardsPerPage(3);
  };

  useEffect(() => {
    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  

  return (
    <div className="relative max-w-[1300px] mx-auto">
      {/* Left button */}
      <button
        onClick={scrollPrev}
        className="absolute top-1/2 left-0 z-10 transform -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Carousel */}
       <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-[30px] py-5">
          {events.map((c, i) => (
            <div
              key={i}
              className="flex-none"
              style={{
                width: `calc((100% - ${(cardsPerPage - 1) * 30}px) / ${cardsPerPage})`,
                marginLeft: i === 0 ? "10px" : "0",   
                marginRight: i === events.length - 1 ? "10px" : "0",
             }}
            >
              <Upcomingcard
                id={c.id}
                title={c.title}
                date={c.date}
                time={c.time}
                place={c.location}
                objective="Learn React + TS"
                description={c.description}
                organizer="Tech Community"
                currentParticipants={c.currentParticipants}
                totalseats={c.totalseats}
                onJoin={() => onJoin && onJoin(c)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right button */}
      <button
        onClick={scrollNext}
        className="absolute top-1/2 right-0 z-10 transform -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
};

export default HorizontalScrollCards;
