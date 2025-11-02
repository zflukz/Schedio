import React, { useEffect, useState } from "react";
import Upcomingcard from "./Comingcard";
import useEmblaCarousel from "embla-carousel-react";
import { useNavigate } from "react-router-dom";

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
  description: string;
}

interface HorizontalScrollCardsProps {
  events: Event[]; // ไม่ optional แล้ว ให้มั่นใจว่าจะมีข้อมูล
  onJoin?: (event: Event) => void;
}

const HorizontalScrollCards: React.FC<HorizontalScrollCardsProps> = ({ events, onJoin }) => {
  const navigate = useNavigate();
  // Embla Carousel hook
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "center" });
  const [cardsPerPage, setCardsPerPage] = useState(3);

  // Update cards per view based on window width
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

const handleViewDetails = (event: Event, eventId: string) => {
  navigate(`/event/${eventId}`, { state: { event } });
};

  return (
    <div className="relative max-w-[1300px] mx-auto px-[30px] sm:px-[30px]">
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
        <div className="flex gap-[30px] px-5 py-5">
          {events.map((c, i) => (
            <div
              key={i}
              className="flex-none"
              style={{
                width: `calc((100% - ${(cardsPerPage - 1) * 30}px) / ${cardsPerPage})`,
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
