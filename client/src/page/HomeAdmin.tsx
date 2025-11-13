import React, { useMemo, useState } from "react";
import Navbar from "../component/Navbar";
import { DatePicker, Dropdown, Checkbox, Button } from "antd";
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  MagnifyingGlassIcon,
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
  submissionBy: string;
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
    "bg-[#F2F2F2] text-[#939393] cursor-pointer",
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
        submissionBy: "Admin02",
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
        submissionBy: "Admin02",
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
        submissionBy: "Admin01",
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
        submissionBy: "Admin01",
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
        submissionBy: "Admin03",
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
        submissionBy: "Admin03",
      },
    ],
    []
  );

  const { RangePicker } = DatePicker;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<[string, string] | null>(null);

  const statusOptions = useMemo(
    () => [
      { id: 1, name: "Pending" },
      { id: 2, name: "Approved" },
      { id: 3, name: "Rejected" },
    ],
    []
  );

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = event.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesStatus =
        selectedStatuses.length === 0 || selectedStatuses.includes(event.status);

      const matchesDate =
        !selectedDateRange ||
        (new Date(event.date) >= new Date(selectedDateRange[0]) &&
          new Date(event.date) <= new Date(selectedDateRange[1]));

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [events, searchTerm, selectedStatuses, selectedDateRange]);

  const handleStatusToggle = (name: string, checked: boolean) => {
    const updated = checked
      ? [...selectedStatuses, name]
      : selectedStatuses.filter((s) => s !== name);
    setSelectedStatuses(updated);
  };

  const statusButtonLabel =
    selectedStatuses.length === 0
      ? "Status"
      : selectedStatuses.length <= 2
      ? selectedStatuses.join(", ")
      : `${selectedStatuses.length} selected`;

  return (
    <div className="bg-bg-light min-h-screen pb-12">
      <div className="pt-10">
        <Navbar user={adminUser} />
      </div>

      <main className="max-w-[1280px] mx-auto w-full px-4 sm:px-8">
        <section className="pt-12 pb-10 text-center max-w-[840px] mx-auto w-full">
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
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <h2 className="text-[28px] sm:text-[32px] font-semibold text-[#1F1F1F]">
                Events Management
              </h2>
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="relative w-full sm:w-auto sm:min-w-[280px]">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9A9A9A]" />
                  <input
                    type="text"
                    placeholder="Search your events."
                    className="w-full rounded-[18px] border border-[#E5E5E5] bg-[#F8F8F8] py-3 pl-12 pr-4 text-[16px] text-[#1F1F1F] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#2AA5B9] focus:bg-white"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                  />
                </div>

                <div className="bg-white flex items-center rounded-[18px] px-4 border border-[#E5E5E5] w-full sm:w-[280px]">
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='size-5 md:size-6 text-text-black mr-1 shrink-0'
                  >
                    <path
                      fillRule='evenodd'
                      d='M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <RangePicker
                    onChange={(dates, dateStrings) => {
                      if (!dates) {
                        setSelectedDateRange(null);
                      } else {
                        setSelectedDateRange([dateStrings[0], dateStrings[1]] as [string, string]);
                      }
                    }}
                    bordered={false}
                    format='MMM D, YYYY'
                    placeholder={["Start", "End"]}
                    className='custom-range-picker w-full text-[15px]'
                    suffixIcon={null}
                  />
                </div>

                <Dropdown
                  dropdownRender={() => (
                    <div className="bg-white rounded-[12px] shadow-md inline-block px-[20px] py-[15px] min-w-[150px]" onClick={(e) => e.stopPropagation()}>
                      {statusOptions.map((opt) => (
                        <div key={opt.id} className="flex items-center rounded-md px-2 py-1 cursor-pointer hover:bg-[#3EBAD080] whitespace-nowrap">
                          <Checkbox
                            checked={selectedStatuses.includes(opt.name)}
                            onChange={(e) => handleStatusToggle(opt.name, e.target.checked)}
                            className="custom-checkbox"
                          >
                            {opt.name}
                          </Checkbox>
                        </div>
                      ))}
                    </div>
                  )}
                  trigger={["click"]}
                  placement='bottomCenter'
                >
                  <Button className="!h-[54px] !py-[10px] !px-[16px] flex items-center justify-start bg-white text-[16px] text-[#1F1F1F] rounded-[18px] border border-[#E5E5E5] w-full sm:w-[160px] hover:!bg-gray-50">
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='size-5 md:size-6 text-text-black mr-1 shrink-0'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75'
                      />
                    </svg>
                    <span className="truncate max-w-[200px]">{statusButtonLabel}</span>
                  </Button>
                </Dropdown>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex h-full flex-col justify-between rounded-[28px] border border-[#F0F0F0] bg-white px-6 py-6 shadow-[0px_18px_36px_rgba(16,24,40,0.04)]"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className={`text-[22px] font-semibold ${
                          event.status === "Rejected" ? "text-[#939393]" : "text-[#3EBAD0]"}`}>
                          {event.title}
                        </h3>
                        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-medium text-[15px] ${
                          event.status === "Rejected"
                            ? "bg-[#D0D0D0] text-black"
                            : "bg-[#FBDE71] text-[#6C4B00]"
                        }`}>
                          <StarIcon className="h-4 w-4 text-white" />
                          {event.duration}
                        </span>
                      </div>

                      <span
                        className={`inline-flex items-center rounded-full px-4 py-1.5 text-[15px] font-semibold ${statusBadgeStyles[event.status]}`}
                      >
                        {event.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-[15px] text-black">
                      <div className="flex items-center gap-2">
                        <CalendarDaysIcon className="h-5 w-5" />
                        {event.date}
                      </div>
                      <span>|</span>
                      <div className="flex items-center gap-2">
                        <ClockIcon className="h-5 w-5" />
                        {event.time}
                      </div>
                      <span>|</span>
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="h-5 w-5" />
                        {event.location}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[#F3F3F3] pt-4">
                    <div className="text-[15px] text-[#7B7B7B]">
                      {event.status === "Pending" ? (
                        <>
                          <span className="font-medium text-black">
                            {event.submissionLabel}
                          </span>{" "}
                          <span className="text-[#939393]">{event.date}</span>
                        </>
                      ) : (
                        <>
                          <span className="font-medium text-black">
                            {event.submissionLabel}
                          </span>{" "}
                          <span className="text-[#939393]">{event.submissionDate}</span>{" "}
                          <span className="text-black font-medium">By</span>{" "}
                          <span className="text-black">{event.submissionBy}</span>
                        </>
                      )}
                    </div>
                    <button
                      className={`text-[14px] font-semibold px-3 py-2 rounded-[8px] transition ${actionButtonStyles[event.status]}`}
                      onClick={() => {
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

