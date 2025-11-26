import React from "react";
export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  adminStatus?: "Pending" | "Approved" | "Rejected"; 
  approvedBy?: string;
  rejectedBy?: string;
  rejectReason?: string;
  statusDate?: string;   
  phone?: number | string;
  tags?: string[];
  duration: string;
  totalseats: number;
  imageUrl: string;
  description: string;
  walkInAvailable?: boolean;
  organizer?: string;
  reminder?: string;
  posterUrl?: string;
  proposalName?: string;
  proposalUrl?: string;
}



interface EventOrganizerAdminDetailCardProps {
  event: Event;
  role?: "organizer" | "admin";
  onApprove?: () => void;
  onReject?: () => void;
}

const EventOrganizerAdminDetailCard: React.FC<EventOrganizerAdminDetailCardProps> = ({
  
  event,
  role = "organizer",
  onApprove,
  onReject,
}) => {
  
  return (
    <div className="bg-white rounded-[20px] shadow-md p-[25px] max-w-3xl mx-auto mt-6 border border-gray-100">
      {/* Approval / Reject Info */}
		{event.adminStatus === "Rejected" && (
			<>
			<div className="bg-[#FEE2E2] text-[#EF4444] text-sm px-3 py-1 font-semibold mb-2 rounded">
				Rejected by {event.rejectedBy ?? "—"} on {event.statusDate}
			</div>
			<div className="text-fail text-sm px-3 py-2 border border-dashed border-fail rounded-[8px] mb-4">
				{event.rejectReason ?? "No reason provided"}
			</div>
			</>
		)}
		{event.adminStatus === "Approved" && (
			<div className="bg-[#DCFCE7] text-[#16A34A] text-sm font-semibold px-3 py-1 rounded mb-4">
			Approved by {event.approvedBy ?? "—"} on {event.statusDate}
			</div>
		)}
		{event.adminStatus === "Pending" && (
			<div className="bg-[#FEF9C3] text-[#CA8A04] text-sm font-semibold px-3 py-1 rounded mb-4">
			Pending Approval
			</div>
		)}
	  {/* Header */}
      <div className="flex flex-wrap items-center justify-between mb-[15px]">
        <h2
          className={`font-bold text-[28px] sm:text-[32px] truncate ${
            event.adminStatus === "Rejected" ? "text-support3" : "text-primary"
          }`}
        >
          {event.title}
        </h2>

        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1 px-[15px] py-[3px] rounded-full whitespace-nowrap flex-shrink-0 font-semibold text-[16px] ${
              event.adminStatus === "Rejected"
                ? "bg-support2 text-text-black"
                : "bg-secondary text-text-black"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clipRule="evenodd"
              />
            </svg>
            {event.duration}
          </div>

          {/* Status Badge */}
          <span
            className={`text-[16px] font-semibold px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${
              event.adminStatus === "Pending"
                ? "bg-[#FEF9C3] text-[#CA8A04]"
                : event.adminStatus === "Approved"
                ? "bg-[#DCFCE7] text-[#16A34A]"
                : "bg-[#FEE2E2] text-[#EF4444]"
            }`}
          >
            {event.adminStatus ?? "Pending"}
          </span>


		
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-[10px] mb-[15px] text-[18px] font-medium">
        {event.tags?.map((tag, idx) => (
          <span
            key={idx}
            className="bg-support2 text-text-black px-[12px] py-[2px] rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Event Info */}
      <div className="space-y-[10px] text-[18px] text-text-black font-semibold">
        <p className="flex items-center gap-2">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
		<path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
		</svg>
          {event.date} | {event.time}
        </p>

        <p className="flex items-center gap-2">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
		<path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
		<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
		</svg>
          {event.location}
        </p>

        <p className="flex items-center gap-2">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
		<path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
		<path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
		</svg>
          {event.totalseats} Seats{" "}
          {event.walkInAvailable && (
            <span className="font-normal ml-1">Walk-in available</span>
          )}
        </p>

        {event.organizer && (
          <p className="flex items-center gap-2">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
			<path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
			</svg>
            {event.organizer}
          </p>
        )}

        {event.phone && (
          <p className="flex items-center gap-2">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
			<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
			</svg>
            0{event.phone}
          </p>
        )}

        {event.reminder && (
          <p className="flex items-center gap-2">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
			<path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
			</svg>
            Reminder: {event.reminder}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="mt-[20px]">
        <h3 className="text-center text-[24px] font-bold mb-[8px]">Event Description</h3>
        <p className="text-[16px] text-text-black leading-relaxed">{event.description}</p>
      </div>

      {/* Poster & Proposal */}
      <div className="flex flex-wrap gap-10 mt-[15px]">
        {/* Poster */}
        <div>
          <p className="font-semibold mb-[6px]">Poster</p>
          {event.posterUrl ? (
            <img
              src={event.posterUrl}
              alt="Event Poster"
              className="w-36 h-52 object-cover rounded-lg border border-support4"
            />
          ) : (
            <div className="w-36 h-52 px-2 py-2 text-support3 italic flex text-center items-center justify-center border border-support4 rounded-lg">
                No poster available
            </div>
          )}
        </div>

        {/* Proposal */}
        <div>
          <p className="font-semibold mb-[6px]">Event Proposal</p>
          {event.proposalUrl ? (
            <div className="flex gap-2 px-[15px] py-[5px] border border-support4 border-dashed rounded-[8px] hover:shadow-sm transition group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 text-text-black group-hover:text-primary transition"
              >
                <path
                  fillRule="evenodd"
                  d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z"
                  clipRule="evenodd"
                />
                <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
              </svg>

              <a
                href={event.proposalUrl}
                className="flex items-center text-text-black group-hover:text-primary transition"
                download
              >
                {event.proposalName ?? "Download Proposal"}
              </a>
            </div>
          ) : (
            <p className="text-support3 italic px-[15px] py-[5px] border border-support4 border-dashed rounded-[8px] w-full">
              No proposal uploaded
            </p>
          )}
        </div>
      </div>


      {/* Approve/Reject Buttons */}
      {role === "admin" && event.adminStatus === "Pending" && (
        <div className="flex justify-center gap-4 mt-[25px] text-[14px]">
          <button
            onClick={onApprove}
            className="px-[15px] py-[8px] min-w-[210px] rounded-[12px] bg-[#DCFCE7] text-[#16A34A] font-semibold hover:bg-green-200 transition"
          >
            Approve
          </button>
          <button
            onClick={onReject}
            className="px-[15px] py-[8px] min-w-[210px] rounded-[12px] bg-[#FEE2E2] text-[#EF4444] font-semibold hover:bg-red-200 transition"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default EventOrganizerAdminDetailCard;
