import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import {
  CalendarDaysIcon,
  ClockIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";

const organizerUser = {
  name: "Wongsakorn",
  role: "organizer" as const,
  image: "/MyuserProfile.svg",
};

const categoryOptions = [
  "Academic",
  "Cultural",
  "Career",
  "Competition",
  "Social",
  "Sport",
  "Workshop",
  "Volunteer",
];

const OrganizeCreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isUnlimitedCapacity, setIsUnlimitedCapacity] = useState(true);
  const [walkInStatus, setWalkInStatus] = useState(false);
  const [reminderStatus, setReminderStatus] = useState(false);

  const toggleCategory = (tag: string) => {
    setSelectedCategories((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="bg-bg-light min-h-screen pb-12">
      <div className="pt-10 px-4 sm:px-6 lg:px-10">
        <Navbar user={organizerUser} />
      </div>

      <main className="mx-auto mt-12 w-full max-w-[900px] px-4 sm:px-8">
        <form className="rounded-[32px] bg-white px-6 sm:px-12 py-10 shadow-[0px_24px_48px_rgba(16,24,40,0.06)] border border-[#F0F0F0]">
          <div className="flex flex-col gap-10">
            <div className="space-y-3">
              <h1 className="text-[32px] sm:text-[36px] font-bold text-[#1F1F1F]">
                Create Event
              </h1>
              <p className="text-[16px] text-[#707070]">
                Please fill in the details below to create your event.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-semibold text-[#1F1F1F]">
                  Event Title
                </label>
                <input
                  type="text"
                  placeholder="Enter Event Name"
                  className="rounded-[16px] border border-[#E5E5E5] bg-[#F8F8F8] px-4 py-3 text-[16px] text-[#1F1F1F] placeholder:text-[#A5A5A5] focus:border-[#2AA5B9] focus:bg-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-semibold text-[#1F1F1F]">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Enter Location"
                  className="rounded-[16px] border border-[#E5E5E5] bg-[#F8F8F8] px-4 py-3 text-[16px] text-[#1F1F1F] placeholder:text-[#A5A5A5] focus:border-[#2AA5B9] focus:bg-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-semibold text-[#1F1F1F]">
                  Organizer Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Organizer Name"
                  defaultValue="Wongsakorn"
                  className="rounded-[16px] border border-[#E5E5E5] bg-[#F8F8F8] px-4 py-3 text-[16px] text-[#1F1F1F] placeholder:text-[#A5A5A5] focus:border-[#2AA5B9] focus:bg-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-semibold text-[#1F1F1F]">
                  Organizer Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter Organizer Phone Number"
                  defaultValue="0923397882"
                  className="rounded-[16px] border border-[#E5E5E5] bg-[#F8F8F8] px-4 py-3 text-[16px] text-[#1F1F1F] placeholder:text-[#A5A5A5] focus:border-[#2AA5B9] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[16px] font-semibold text-[#1F1F1F]">
                Activity Hours <span className="text-[#9B9B9B]">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="Enter Activity Hours"
                className="rounded-[16px] border border-[#E5E5E5] bg-[#F8F8F8] px-4 py-3 text-[16px] text-[#1F1F1F] placeholder:text-[#A5A5A5] focus:border-[#2AA5B9] focus:bg-white focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[16px] font-semibold text-[#1F1F1F]">
                Description
              </label>
              <textarea
                rows={4}
                placeholder="Enter Description"
                className="rounded-[16px] border border-[#E5E5E5] bg-[#F8F8F8] px-4 py-3 text-[16px] text-[#1F1F1F] placeholder:text-[#A5A5A5] focus:border-[#2AA5B9] focus:bg-white focus:outline-none"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-semibold text-[#1F1F1F]">
                  Date
                </label>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-[16px] border border-[#E5E5E5] bg-[#F8F8F8] px-4 py-3 text-[16px] text-[#1F1F1F] hover:border-[#2AA5B9] hover:bg-white transition"
                >
                  <CalendarDaysIcon className="h-5 w-5 text-[#2AA5B9]" />
                  Select date
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-semibold text-[#1F1F1F]">
                  Time
                </label>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-[16px] border border-[#E5E5E5] bg-[#F8F8F8] px-4 py-3 text-[16px] text-[#1F1F1F] hover:border-[#2AA5B9] hover:bg-white transition"
                >
                  <ClockIcon className="h-5 w-5 text-[#2AA5B9]" />
                  Select time
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[16px] font-semibold text-[#1F1F1F]">
                Event Category
              </label>
              <div className="flex flex-wrap gap-3">
                {categoryOptions.map((tag) => {
                  const isActive = selectedCategories.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleCategory(tag)}
                      className={`rounded-full border px-5 py-2 text-[15px] font-medium transition ${
                        isActive
                          ? "border-[#2AA5B9] bg-[#E5F8FC] text-[#2AA5B9]"
                          : "border-[#E5E5E5] bg-[#F5F5F5] text-[#6B6B6B] hover:border-[#2AA5B9] hover:text-[#2AA5B9]"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-3">
                <label className="text-[16px] font-semibold text-[#1F1F1F]">
                  Maximum Capacity
                </label>
                <div className="flex items-center gap-4 rounded-[18px] border border-[#E5E5E5] bg-[#F8F8F8] px-4 py-3">
                  <input
                    type="number"
                    placeholder="Enter capacity"
                    className="w-full rounded-[12px] border border-transparent bg-white px-4 py-2 text-[16px] text-[#1F1F1F] placeholder:text-[#A5A5A5] focus:border-[#2AA5B9] focus:outline-none disabled:bg-[#F1F1F1] disabled:text-[#B0B0B0]"
                    disabled={isUnlimitedCapacity}
                  />
                  <button
                    type="button"
                    onClick={() => setIsUnlimitedCapacity((prev) => !prev)}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
                      isUnlimitedCapacity ? "bg-[#2AA5B9]" : "bg-[#CFCFCF]"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                        isUnlimitedCapacity ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <span
                    className={`text-[15px] font-semibold ${
                      isUnlimitedCapacity ? "text-[#2AA5B9]" : "text-[#8A8A8A]"
                    }`}
                  >
                    Unlimited
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-[16px] font-semibold text-[#1F1F1F]">
                  Walk in status
                </label>
                <div className="flex items-center justify-between rounded-[18px] border border-[#E5E5E5] bg-[#F8F8F8] px-5 py-3">
                  <span className="text-[15px] font-medium text-[#6B6B6B]">
                    Allow walk-in participants
                  </span>
                  <button
                    type="button"
                    onClick={() => setWalkInStatus((prev) => !prev)}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
                      walkInStatus ? "bg-[#2AA5B9]" : "bg-[#CFCFCF]"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                        walkInStatus ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[16px] font-semibold text-[#1F1F1F]">
                Reminder
              </label>
              <div className="flex items-center justify-between rounded-[18px] border border-[#E5E5E5] bg-[#F8F8F8] px-5 py-3">
                <span className="text-[15px] font-medium text-[#6B6B6B]">
                  Send reminder notifications to attendees
                </span>
                <button
                  type="button"
                  onClick={() => setReminderStatus((prev) => !prev)}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
                    reminderStatus ? "bg-[#2AA5B9]" : "bg-[#CFCFCF]"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                      reminderStatus ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-3">
                <label className="text-[16px] font-semibold text-[#1F1F1F]">
                  Poster <span className="text-[#9B9B9B]">(Optional)</span>
                </label>
                <div className="flex h-[200px] flex-col items-center justify-center gap-3 rounded-[20px] border border-dashed border-[#D0D0D0] bg-[#F9F9F9] px-6 text-center">
                  <ArrowUpTrayIcon className="h-10 w-10 text-[#9B9B9B]" />
                  <p className="text-[15px] text-[#6B6B6B]">
                    Choose a file or drag & drop it here
                    <br />
                    JPEG formats, up to 50MB
                  </p>
                  <button
                    type="button"
                    className="rounded-full bg-[#2AA5B9] px-5 py-2 text-[14px] font-semibold text-white hover:bg-[#238aa0] transition"
                  >
                    Browse File
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-[16px] font-semibold text-[#1F1F1F]">
                  Event Proposal
                </label>
                <div className="flex h-[200px] flex-col items-center justify-center gap-3 rounded-[20px] border border-dashed border-[#D0D0D0] bg-[#F9F9F9] px-6 text-center">
                  <ArrowUpTrayIcon className="h-10 w-10 text-[#9B9B9B]" />
                  <p className="text-[15px] text-[#6B6B6B]">
                    Choose a file or drag & drop it here
                    <br />
                    PDF formats, up to 50MB
                  </p>
                  <button
                    type="button"
                    className="rounded-full bg-[#2AA5B9] px-5 py-2 text-[14px] font-semibold text-white hover:bg-[#238aa0] transition"
                  >
                    Browse File
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-full border border-[#E5E5E5] bg-[#F5F5F5] px-6 py-2.5 text-[16px] font-semibold text-[#1F1F1F] hover:bg-[#E8E8E8] transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full bg-[#1F1F1F] px-7 py-2.5 text-[16px] font-semibold text-white hover:bg-[#333333] transition"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </main>

      <footer className="mt-12 text-center text-[14px] text-[#6B6B6B]">
        © 2025 Schedio. All rights reserved.
      </footer>
    </div>
  );
};

export default OrganizeCreateEvent;


