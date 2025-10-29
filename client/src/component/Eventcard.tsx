import React from "react";

interface EventCardProps {
  title: string;
  duration: string;
  date: string;
  time: string;
  location: string;
  tags: string[];
  imageUrl: string;
  onViewMore?: () => void;
}

const Eventcard: React.FC<EventCardProps> = ({
  title,
  duration,
  date,
  time,
  location,
  tags,
  imageUrl,
  onViewMore,
}) => {
  return (
    <div className="font-sans bg-white p-[30px] rounded-[20px] max-w-md min-w-[380px] shadow-sm">
      {/* Image */}
      <div className="rounded-[12px] overflow-hidden mb-3">
        <img src={imageUrl} alt={title} className="w-full h-[200px] object-cover " />
      </div>

      {/* Title and Duration */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[20px] font-bold text-primary">{title}</h3>
        <span className="bg-secondary text-text-black text-[16px] font-semibold px-[15px] py-[3px] rounded-full">
          {duration}
        </span>
      </div>

	<div className="mb-[15px]">
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
	</div>
	<div className="flex items-center text-text-black font-semibold mb-[15px]">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-[10px]">
		<path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
		<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
		</svg>
		{location}
	</div>

      {/* Tags + View more */}
      <div className="flex items-center justify-between mt-2">
        {/* Tags list */}
        <div className="flex flex-wrap gap-2 text-[16px] font-semibold">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-support2 text-text-black px-[15px] py-[3px] rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* View more button */}
        <button
          onClick={onViewMore}
          className="text-text-black text-[14px] font-semibold hover:underline ml-[10px] whitespace-nowrap"
        >
          View more
        </button>
      </div>

    </div>
  );
};

export default Eventcard;
