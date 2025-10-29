import React, { useEffect, useState } from "react";
import Upcomingcard from "./Comingcard";
import useEmblaCarousel from "embla-carousel-react";
import { Descriptions } from "antd";

 interface Event {
  title: string;
  duration: string;
  date: string;
  time: string;
  location: string;
  totalseats: number;
  phone?: number;
  tags: string[];
  imageUrl: string;
  description: string;
}

interface HorizontalScrollCardsProps {
  events?: Event[];
  onJoin?: (event: Event) => void;
}

const HorizontalScrollCards: React.FC<HorizontalScrollCardsProps> = ({ events, onJoin }) => {
  const defaultCards = [...Array(10)].map((_, i) => ({
    title: `Workshop ${i + 1}`,
    date: "19 Sep 2025",
    time: "13:30 - 15:30",
    location: `CB${2200 + i}`,
    duration: "2 hr.",
    totalseats: 50,
    phone: 962046598,
    tags: ["Workshop", "Academic"],
    imageUrl: "https://via.placeholder.com/300x200",
    description: "Learn the basics of this workshop"
  }));
  
  const cards = events || defaultCards;

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
          {cards.slice(0, 10).map((c, i) => (
            <div
              key={i}
              className="flex-none"
              style={{
                width: `calc((100% - ${(cardsPerPage - 1) * 30}px) / ${cardsPerPage})`,
              }}
            >
              <Upcomingcard
                title={c.title}
                date={c.date}
                time={c.time}
                place={c.location}
                objective="Learn React + TS"
                description="Basics of React with TS"
                organizer="Tech Community"
                participants={25}
                maxParticipants={50}
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
