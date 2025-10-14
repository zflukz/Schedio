import React, { useEffect, useState } from "react";
import Upcomingcard from "./Comingcard";
import useEmblaCarousel from "embla-carousel-react";
 

const HorizontalScrollCards: React.FC = () => {
  const cards = [...Array(10)].map((_, i) => ({
    title: `Workshop ${i + 1}`,
    place: `CB${2200 + i}`,
  }));

  // Embla Carousel hook
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });

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
    <div className="relative max-w-[1300px] mx-auto px-[30px]">
      {/* Left button */}
      <button
        onClick={scrollPrev}
        className="absolute left-[-30px] top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 hover:bg-gray-100"
      >
        ◀
      </button>

      {/* Embla Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-[30px]">
          {cards.map((c, i) => (
            <div
              key={i}
              className="flex-none"
              style={{ width: `calc((100% - ${(cardsPerPage - 1) * 30}px) / ${cardsPerPage})` }}
            >
              <Upcomingcard
                title={c.title}
                date="19 Sep 2025"
                time="13:30 - 15:30"
                place={c.place}
                objective="Learn React + TS"
                description="Basics of React with TS"
                organizer="Tech Community"
                participants={25}
                maxParticipants={50}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right button */}
      <button
        onClick={scrollNext}
        className="absolute right-[-30px] top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 hover:bg-gray-100"
      >
        ▶
      </button>
    </div>
  );
};

export default HorizontalScrollCards;
