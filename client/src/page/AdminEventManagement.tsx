import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../component/Navbar";
import { CalendarDaysIcon, ClockIcon, MapPinIcon, UsersIcon, PhoneIcon, ArrowDownTrayIcon, BellAlertIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

interface AdminUser {
  name: string;
  role: "admin";
  image: string;
}

type EventStatus = "Pending" | "Approved" | "Rejected";

interface AdminEventDetail {
  id: string;
  title: string;
  duration: string;
  status: EventStatus;
  date: string; // already formatted like "19 Sep 2025"
  time: string; // e.g. "13.30 - 15.00"
  location: string;
  totalseats?: number;
  currentParticipants?: number;
  contactName?: string;
  contactPhone?: string;
  tags?: string[]; // categories
  description?: string;
}

const statusBadgeStyles: Record<EventStatus, string> = {
  Pending: "bg-[#FFF6D9] text-[#D48A01]",
  Approved: "bg-[#DCF7E3] text-[#0F9D58]",
  Rejected: "bg-[#FFE1E1] text-[#D14343]",
};

const AdminEventManagement: React.FC = () => {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const adminUser: AdminUser = {
    name: "Thanaphat",
    role: "admin",
    image: "/MyuserProfile.svg",
  };

  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { event } = (location.state as { event?: AdminEventDetail }) || {};

  // Fallback when navigated directly: very basic placeholder so the UI still renders
  const data: AdminEventDetail =
    event ||
    ({
      id: id || "-",
      title: "Event",
      duration: "1.30 hr.",
      status: "Pending",
      date: "19 Sep 2025",
      time: "13.30 - 15.00",
      location: "LX Floor 1",
      totalseats: 50,
      currentParticipants: 0,
      contactName: "Organizer",
      contactPhone: "0000000000",
      tags: ["Academic", "Workshop"],
      description:
        "Event description is not available. This is a placeholder when opening the page directly.",
    } as AdminEventDetail);

  return (
    <div className="bg-bg-light min-h-screen pb-12 pt-[50px]">
      {/* Top section with Navbar and Back button (same pattern as MyEvent.tsx) */}
      <div className="w-full px-[15px] sm:px-[25px] lg:px-[60px] pt-[25px] flex flex-col lg:flex-row lg:items-center relative">
        {/* Back Button */}
        <div className="flex justify-start mb-4 lg:mb-0">
          <button
            onClick={() => navigate(-1)}
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
          <Navbar user={adminUser} />
        </div>
      </div>

      <main className="max-w-[900px] mx-auto w-full px-4 sm:px-6 pt-[25px]">
        <section className="bg-white border border-[#ECECEC] rounded-[28px] shadow-[0px_24px_48px_rgba(16,24,40,0.06)] p-6 sm:p-10 mt-10">
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-[28px] sm:text-[32px] font-bold text-[#3ebad0]">{data.title}</h1>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#FBDE71] px-3 py-1 text-[#6C4B00] text-[14px] font-semibold">
                {data.duration}
              </span>
              <span className={`inline-flex items-center rounded-full px-3 py-1.5 text-[14px] font-semibold ${statusBadgeStyles[data.status]}`}>
                {data.status}
              </span>
            </div>
          </div>

          {/* categories */}
          {data.tags && data.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {data.tags.map((t) => (
                <span key={t} className="bg-[#F2F7F8] text-[#1F1F1F] text-[14px] font-semibold px-4 py-1 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* meta */}
          <div className="mt-6 space-y-3 text-[15px] text-[#525252]">
            <div className="flex items-center gap-3">
              <CalendarDaysIcon className="h-5 w-5" /> {data.date}
            </div>
            <div className="flex items-center gap-3">
              <ClockIcon className="h-5 w-5" /> {data.time}
            </div>
            <div className="flex items-center gap-3">
              <MapPinIcon className="h-5 w-5" /> {data.location}
            </div>
            <div className="flex items-center gap-3">
              <UsersIcon className="h-5 w-5" /> {data.totalseats || 50} Seats <span className="text-[#7B7B7B]">Walk-in available</span>
            </div>
            <div className="flex items-center gap-3">
              <PhoneIcon className="h-5 w-5" /> {data.contactName || "Contact"} | {data.contactPhone || "-"}
            </div>
            <div className="flex items-center gap-3">
              <BellAlertIcon className="h-5 w-5" /> Reminder 60 minutes before event starts.
            </div>
          </div>

          {/* description */}
          <div className="mt-8">
            <h2 className="text-[18px] font-semibold text-[#1F1F1F] text-center">Event Description</h2>
            <p className="mt-4 text-[15px] leading-7 text-[#4B4B4B]">
              {data.description ||
                "Ready to level up your skill? In this hands-on session, you will explore techniques and methods. Perfect for those who want to learn with confidence and creativity."}
            </p>

            <div className="mt-6 text-[15px] leading-7 text-[#4B4B4B]">
              <p className="font-semibold">QUALIFICATION AND REQUIREMENT:</p>
              <ol className="list-decimal pl-6 mt-1 space-y-1">
                <li>Open for high school and university students</li>
                <li>Passionate about learning and eager to learn new techniques</li>
                <li>No prior professional experience required</li>
                <li>Must be able to attend full event duration</li>
              </ol>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div>
                <p className="text-[15px] font-semibold text-[#1F1F1F]">Poster</p>
                <div className="mt-3 rounded-[12px] overflow-hidden border border-[#ECECEC]">
                  <img src="/sample-event.jpg" alt="Poster" className="w-full h-[220px] object-cover" />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-[15px] font-semibold text-[#1F1F1F]">Event Proposal</p>
                <button className="inline-flex items-center gap-2 self-start text-[#1F1F1F] hover:text-[#2AA5B9]">
                  Chicken Cooking Proposal
                  <ArrowDownTrayIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-10 flex gap-3 justify-center">
                <button className="px-[80px] py-2 rounded-[10px] bg-[#BFF1D0] text-[#0F9D58] font-semibold" onClick={() => navigate(-1)}>
                Approve
                </button>
                <button className="px-[80px] py-2 rounded-[10px] bg-[#FFD6D6] text-[#D14343] font-semibold" onClick={() => setIsRejectModalOpen(true)}>
                Reject
              </button>
            </div>
            
          </div>
        </section>

        <p className="mt-8 text-center text-[14px] text-[#6B6B6B]">© 2025 Schedio. All rights reserved.</p>
      </main>

      {isRejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-[480px] rounded-[24px] bg-white px-8 py-8 shadow-xl">
            <h3 className="text-[20px] font-semibold text-center text-[#1F1F1F]">
              Please provide a reason for rejection
            </h3>
            <div className="mt-3">
              <p className="text-[16px] font-medium text-[#1F1F1F] mb-2">
                Write your review
              </p>
              <textarea
                value={rejectReason}
                onChange={(event) => setRejectReason(event.target.value)}
                placeholder=""
                className="w-full rounded-[16px] border border-[#D9D9D9] bg-white px-4 py-3 text-[15px] text-[#1F1F1F] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#2AA5B9] focus:ring-2 focus:ring-[#2AA5B9]/30 resize-none"
                rows={1}
              />
            </div>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setIsRejectModalOpen(false)}
                className="w-full rounded-full border border-[#E5E5E5] bg-white py-3 text-[16px] font-semibold text-[#1F1F1F] hover:bg-[#F5F5F5] transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log("Reject reason:", rejectReason || "Scheduled time does not comply with system rules.");
                  setIsRejectModalOpen(false);
                  navigate(-1);
                }}
                className="w-full rounded-full bg-black py-3 text-[16px] font-semibold text-white hover:bg-[#1F1F1F] transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEventManagement;


