import React, { useMemo, useState } from "react";
import Navbar from "../component/Navbar";
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

type EventStatus = "Pending" | "Approved" | "Rejected";

interface AdminEvent {
  id: string;
  title: string;
  duration: string;
  status: EventStatus;
  date: string;
  time: string;
  location: string;
  submissionLabel: string;
  submissionDate: string;
}

const statusBadgeStyles: Record<EventStatus, string> = {
  Pending: "bg-[#FFF6D9] text-[#D48A01]",
  Approved: "bg-[#DCF7E3] text-[#0F9D58]",
  Rejected: "bg-[#FFE1E1] text-[#D14343]",
};

const actionButtonStyles: Record<EventStatus, string> = {
  Pending:
    "bg-[#E5F8FC] text-[#2AA5B9] hover:bg-[#d1eef5] transition-colors",
  Approved:
    "bg-[#E5F8FC] text-[#2AA5B9] hover:bg-[#d1eef5] transition-colors",
  Rejected:
    "bg-[#F2F2F2] text-[#939393] cursor-not-allowed",
};

const HomeAdmin: React.FC = () => {
  const navigate = useNavigate();
  const adminUser = {
    name: "Thanaphat",
    role: "admin" as const,
    image: "/MyuserProfile.svg",
  };

  const stats = useMemo(
    () => [
      { label: "Total Events", value: 30, accent: "text-[#3EBAD0]" },
      { label: "Approved", value: 13, accent: "text-[#10B981]" },
      { label: "Pending", value: 15, accent: "text-[#FBDE71]" },
      { label: "Rejected", value: 2, accent: "text-[#EF4444]" },
    ],
    []
  );

  const events = useMemo<AdminEvent[]>(
    () => [
      {
        id: "1",
        title: "Chicken Cooking",
        duration: "1.30 hr.",
        status: "Pending",
        date: "19 Sep 2025",
        time: "13.30 - 15.00",
        location: "LX Floor 1",
        submissionLabel: "Date Submitted:",
        submissionDate: "30 Aug 2025",
      },
      {
        id: "2",
        title: "Chicken Cooking",
        duration: "1.30 hr.",
        status: "Pending",
        date: "19 Sep 2025",
        time: "13.30 - 15.00",
        location: "LX Floor 1",
        submissionLabel: "Date Submitted:",
        submissionDate: "30 Aug 2025",
      },
      {
        id: "3",
        title: "Bangmod Hack",
        duration: "1.30 hr.",
        status: "Approved",
        date: "19 Sep 2025",
        time: "13.30 - 15.00",
        location: "LX Floor 1",
        submissionLabel: "Approved on:",
        submissionDate: "30 Aug 2025",
      },
      {
        id: "4",
        title: "Bangmod Hack",
        duration: "1.30 hr.",
        status: "Approved",
        date: "19 Sep 2025",
        time: "13.30 - 15.00",
        location: "LX Floor 1",
        submissionLabel: "Approved on:",
        submissionDate: "30 Aug 2025",
      },
      {
        id: "5",
        title: "AI Workshop",
        duration: "1.30 hr.",
        status: "Rejected",
        date: "19 Sep 2025",
        time: "13.30 - 15.00",
        location: "LX Floor 1",
        submissionLabel: "Rejected on:",
        submissionDate: "1 Sep 2025",
      },
      {
        id: "6",
        title: "AI Workshop",
        duration: "1.30 hr.",
        status: "Rejected",
        date: "19 Sep 2025",
        time: "13.30 - 15.00",
        location: "LX Floor 1",
        submissionLabel: "Rejected on:",
        submissionDate: "1 Sep 2025",
      },
    ],
    []
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<EventStatus | "All">("All");

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = event.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || event.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [events, searchTerm, statusFilter]);

  return (
    <div className="bg-bg-light min-h-screen pb-12">
      <div className="pt-10">
        <Navbar user={adminUser} />
      </div>

      <main className="max-w-[1140px] mx-auto w-full px-4 sm:px-8">
        <section className="pt-12 pb-10 text-center">
          <h1 className="text-[32px] sm:text-[40px] font-bold text-[#1F1F1F]">
            Dashboard
          </h1>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[24px] bg-white shadow-[0px_20px_40px_rgba(16,24,40,0.06)] px-6 py-5 text-center border border-[#F0F0F0]"
              >
                <p className="text-[16px] text-[#676767] font-medium">
                  {stat.label}
                </p>
                <p
                  className={`text-[32px] font-semibold mt-2 ${stat.accent}`}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white border border-[#ECECEC] rounded-[32px] shadow-[0px_24px_48px_rgba(16,24,40,0.06)] px-6 sm:px-10 py-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-[28px] sm:text-[32px] font-semibold text-[#1F1F1F]">
                Events Management
              </h2>
              <div className="relative w-full sm:w-auto sm:min-w-[320px]">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9A9A9A]" />
                <input
                  type="text"
                  placeholder="Search your events."
                  className="w-full rounded-[18px] border border-[#E5E5E5] bg-[#F8F8F8] py-3 pl-12 pr-4 text-[16px] text-[#1F1F1F] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#2AA5B9] focus:bg-white"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button className="flex items-center justify-between sm:justify-start gap-3 rounded-[18px] border border-[#E5E5E5] bg-white px-4 py-3 text-[16px] text-[#1F1F1F]">
                  <CalendarDaysIcon className="h-5 w-5 text-[#2AA5B9]" />
                  Jul 1, 2025 – Jul 31, 2025
                </button>

                <div className="relative">
                  <FunnelIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#2AA5B9]" />
                  <select
                    value={statusFilter}
                    onChange={(event) =>
                      setStatusFilter(event.target.value as EventStatus | "All")
                    }
                    className="appearance-none rounded-[18px] border border-[#E5E5E5] bg-white pl-12 pr-10 py-3 text-[16px] text-[#1F1F1F] focus:outline-none focus:border-[#2AA5B9]"
                  >
                    <option value="All">Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9A9A9A] text-[14px]">
                    ▼
                  </span>
                </div>
              </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex h-full flex-col justify-between rounded-[28px] border border-[#F0F0F0] bg-white px-6 py-6 shadow-[0px_18px_36px_rgba(16,24,40,0.04)]"
                >
                  <div className="space-y-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-[22px] font-semibold text-[#1F1F1F]">
                          {event.title}
                        </h3>
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-[15px] text-[#525252]">
                          <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-medium ${
                            event.status === "Rejected"
                              ? "bg-[#D0D0D0] text-black"
                              : "bg-[#FBDE71] text-[#6C4B00]"
                          }`}>
                            <StarIcon className="h-4 w-4 text-white" />
                            {event.duration}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`inline-flex items-center rounded-full px-4 py-1.5 text-[15px] font-semibold ${statusBadgeStyles[event.status]}`}
                      >
                        {event.status}
                      </span>
                    </div>

                    <div className="space-y-3 text-[15px] text-[#525252]">
                      <div className="flex items-center gap-3">
                        <CalendarDaysIcon className="h-5 w-5 text-[#2AA5B9]" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-3">
                        <ClockIcon className="h-5 w-5 text-[#2AA5B9]" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPinIcon className="h-5 w-5 text-[#2AA5B9]" />
                        {event.location}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[#F3F3F3] pt-4">
                    <div className="text-[15px] text-[#7B7B7B]">
                      <span className="font-medium text-[#525252]">
                        {event.submissionLabel}
                      </span>{" "}
                      {event.submissionDate}
                    </div>
                    <button
                      className={`class="text-[14px] font-semibold bg-[#3EBAD0]/30 text-[#33A9BC] px-3 py-2 rounded-[8px] hover:bg-[#3EBAD0]/45 transition" ${actionButtonStyles[event.status]}`}
                      disabled={event.status === "Rejected"}
                      onClick={() => {
                        if (event.status === "Rejected") return;
                        navigate(`/admin/events/${event.id}`, { state: { event: { ...event, tags: ["Academic", "Workshop"], totalseats: 50, contactName: "Wongsakorn", contactPhone: "0923397882" } } });
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 pt-6">
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E5E5] text-[#9A9A9A]">
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-2 text-[15px]">
                <button className="h-9 w-9 rounded-full bg-[#1F1F1F] text-white font-medium">
                  1
                </button>
                <span className="text-[#9A9A9A]">2</span>
                <span className="text-[#9A9A9A]">…</span>
                <span className="text-[#9A9A9A]">4</span>
                <span className="text-[#9A9A9A]">5</span>
              </div>
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E5E5] text-[#9A9A9A]">
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-12 text-center text-[14px] text-[#6B6B6B]">
        © 2025 Schedio. All rights reserved.
      </footer>
    </div>
  );
};

export default HomeAdmin;

