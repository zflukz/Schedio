import  { useState } from "react";
import Navbar from "../component/Navbar";
import HorizontalScrollCards from "../component/HorizontalScrollCards";
import Eventcard from "../component/Eventcard";
import EventFilterbar from "../component/EventFilterbar";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom"; 
import { useEventContext } from "../context/EventContext";

interface Event {
  id: string; 
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

function Home() {
  
  const navigate = useNavigate();

  const categories: Category[] = [
    { id: 1, name: "Academic" },
    { id: 2, name: "Cultural" },
    { id: 3, name: "Career" },
    { id: 4, name: "Competition" },
    { id: 5, name: "Social" },
    { id: 6, name: "Sport" },
    { id: 7, name: "Workshop" },
    { id: 8, name: "Volunteer" },
  ];
  const { events } = useEventContext();

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<[string, string] | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6); // จำนวน card ต่อหน้า

  // Filtered events
  const filteredEvents = events.filter(event => {
    const matchCategory =
      selectedCategories.length === 0 ||
      event.tags.some(tag =>
        selectedCategories.includes(
          categories.find(c => c.name.toLowerCase() === tag.toLowerCase())?.name ?? ""
        )
      );

    const matchDate =
      !selectedDateRange ||
      (new Date(event.date) >= new Date(selectedDateRange[0]) &&
        new Date(event.date) <= new Date(selectedDateRange[1]));

    const matchSearch =
      !searchKeyword ||
      event.title.toLowerCase().includes(searchKeyword.toLowerCase());

    return matchCategory && matchDate && matchSearch;
  });

  // Slice events ตามหน้าและ pageSize
  const pagedEvents = filteredEvents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleViewDetails = (event: Event) => {
  navigate(`/event/${event.id}`, { state: { event } });
  };


  return (
    <div className="font-sans bg-bg-light min-h-screen pt-[50px]">
        <div className="flex-1 flex justify-center px-[15px] sm:px-[25px] lg:px-0">
          <Navbar />
        </div>

      


      <div className="flex items-center justify-center whitespace-nowrap 
      pt-[85px] pb-[30px] text-[30px] sm:text-[32px] md:text-[36px] 
      lg:text-[40px] font-bold mx-auto
      ">
        “ Don’t Miss These Events “
      </div>

      <div className="pb-[80px]">
        <HorizontalScrollCards
          events={events}
          onJoin={(event) => handleViewDetails(event)}
        />
      </div>

      <div className="px-[30px] py-[30px] rounded-[15px]  max-w-[1300px] mx-[15px] sm:mx-[25px] lg:mx-auto">
        <div
          className="
            flex items-center justify-center whitespace-nowrap pb-[30px]
            text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px]
            font-bold mx-auto
          "
        >
          “ Find the Right Event for You ”
        </div>


        {/* Filter Bar */}
        <div className="flex justify-center pb-[50px]">
          <EventFilterbar
            categories={categories}
            onCategoriesChange={(names: string[]) => {
              setSelectedCategories(names);
              setCurrentPage(1); // reset page to 1
            }}
            onDateRangeChange={(range) => {
              setSelectedDateRange(range);
              setCurrentPage(1);
            }}
            onSearchChange={(keyword) => {
              setSearchKeyword(keyword);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Event cards */}
        <div className="flex justify-center pb-[30px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px] max-w-[1200px]">
            {pagedEvents.map((event, index) => (
              <Eventcard
                key={index}
                title={event.title}
                duration={event.duration}
                date={event.date}
                time={event.time}
                location={event.location}
                tags={event.tags}
                imageUrl={event.imageUrl}
                onViewMore={() => handleViewDetails(event)} 
              />
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center pt-[20px]">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredEvents.length}
            onChange={(page, size) => {
              setCurrentPage(page);
              if (size) setPageSize(size);
            }}
            showSizeChanger={true} // เปิด dropdown เลือก pageSize
            pageSizeOptions={['3','6','9','12']}
            className="custom-pagination"
          />
        </div>
      </div>

      <div className="flex items-center justify-center py-[10px] pt-[30px] text-[14px] font-normal">
        © 2025 Schedio. All rights reserved.
      </div>
    </div>
  );
}

export default Home;
