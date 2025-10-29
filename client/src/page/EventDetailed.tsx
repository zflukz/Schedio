import React, { useState } from "react";
import Navbar from "../component/Navbar";
import HorizontalScrollCards from "../component/HorizontalScrollCards";
import EventDetailedcard from "../component/EventDetailedcard";
import { useLocation, useNavigate } from "react-router-dom"; 

interface User {
  name: string;
  role: "admin" | "organizer" | "user";
}

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
  description: string
}

interface Category {
  id: number;
  name: string;
}

function EventDetailedPage() {
  const navigate = useNavigate();
  const user: User | null = null;
  
  const location = useLocation();
  const { event } = location.state as { event: Event };

  
  const events: Event[] = [
    {
      title: "Cooking Chicken",
      duration: "2 hr.",
      date: "2025-10-20",
      time: "10:00 - 12:00",
      location: "CB4301",
      totalseats: 50,
      phone: 962046598,
      tags: ["Academic", "Workshop"],
      imageUrl:
        "https://cdn.discordapp.com/attachments/1187005922288087091/1420375835528921108/IMG_0811_2.jpeg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
    {
      title: "Chicken Language",
      duration: "2 hr.",
      date: "2025-11-10",
      time: "13:00 - 15:00",
      location: "CB1201",
      totalseats: 50,
      phone: 962046598,
      tags: ["Academic", "Workshop"],
      imageUrl:
        "https://cdn.discordapp.com/attachments/1176389332140048465/1427957333304021033/7B70C761-1AB0-4A3D-BD48-7CBD581EDB4F_1_105_c.jpeg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."    
      },
    {
      title: "Chicken Dance",
      duration: "2 hr.",
      date: "2025-11-10",
      time: "13:00 - 15:00",
      location: "CB1201",
      totalseats: 50,
      phone: 962046598,
      tags: ["Workshop", "Social"],
      imageUrl:
        "https://cdn.discordapp.com/attachments/1176389332140048465/1427957271392026634/1A10E491-6609-44BE-A69E-FE5B01391B98_1_105_c.jpeg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
    {
      title: "Cooking Chicken",
      duration: "2 hr.",
      date: "2025-10-20",
      time: "10:00 - 12:00",
      location: "CB4301",
      totalseats: 50,
      phone: 962046598,
      tags: ["Academic", "Workshop"],
      imageUrl:
        "https://cdn.discordapp.com/attachments/1187005922288087091/1420375835528921108/IMG_0811_2.jpeg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
    {
      title: "Chicken Language",
      duration: "2 hr.",
      date: "2025-11-10",
      time: "13:00 - 15:00",
      location: "CB1201",
      totalseats: 50,
      phone: 962046598,
      tags: ["Academic", "Workshop"],
      imageUrl:
        "https://cdn.discordapp.com/attachments/1176389332140048465/1427957333304021033/7B70C761-1AB0-4A3D-BD48-7CBD581EDB4F_1_105_c.jpeg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

      },
    {
      title: "Chicken Dance",
      duration: "2 hr.",
      date: "2025-11-10",
      time: "13:00 - 15:00",
      location: "CB1201",
      totalseats: 50,
      phone: 962046598,
      tags: ["Workshop", "Social"],
      imageUrl:
        "https://cdn.discordapp.com/attachments/1176389332140048465/1427957271392026634/1A10E491-6609-44BE-A69E-FE5B01391B98_1_105_c.jpeg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

      },{
      title: "Cooking NongOak",
      duration: "2 hr.",
      date: "2025-10-20",
      time: "10:00 - 12:00",
      location: "CB4301",
      totalseats: 50,
      phone: 962046598,
      tags: ["Academic", "Workshop"],
      imageUrl:
        "https://cdn.discordapp.com/attachments/1187005922288087091/1420375835528921108/IMG_0811_2.jpeg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

      },
    {
      title: "NongOak Language",
      duration: "2 hr.",
      date: "2025-11-10",
      time: "13:00 - 15:00",
      location: "CB1201",
      totalseats: 50,
      phone: 962046598,
      tags: ["Academic", "Workshop"],
      imageUrl:
        "https://cdn.discordapp.com/attachments/1176389332140048465/1427957333304021033/7B70C761-1AB0-4A3D-BD48-7CBD581EDB4F_1_105_c.jpeg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
    {
      title: "NongOak Dance",
      duration: "2 hr.",
      date: "2025-11-10",
      time: "13:00 - 15:00",
      location: "CB1201",
      totalseats: 50,
      phone: 962046598,
      tags: ["Workshop", "Social"],
      imageUrl:
        "https://cdn.discordapp.com/attachments/1176389332140048465/1427957271392026634/1A10E491-6609-44BE-A69E-FE5B01391B98_1_105_c.jpeg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
    {
      title: "Cooking Chicken",
      duration: "2 hr.",
      date: "2025-10-20",
      time: "10:00 - 12:00",
      location: "CB4301",
      totalseats: 50,
      phone: 962046598,
      tags: ["Academic", "Workshop"],
      imageUrl:
        "https://cdn.discordapp.com/attachments/1187005922288087091/1420375835528921108/IMG_0811_2.jpeg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
    {
      title: "Chicken Language",
      duration: "2 hr.",
      date: "2025-11-10",
      time: "13:00 - 15:00",
      location: "CB1201",
      totalseats: 50,
      phone: 962046598,
      tags: ["Academic", "Workshop"],
      imageUrl:
        "https://cdn.discordapp.com/attachments/1176389332140048465/1427957333304021033/7B70C761-1AB0-4A3D-BD48-7CBD581EDB4F_1_105_c.jpeg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
    {
      title: "Chicken Dance",
      duration: "2 hr.",
      date: "2025-11-10",
      time: "13:00 - 15:00",
      location: "CB1201",
      totalseats: 50,
      phone: 962046598,
      tags: ["Workshop", "Social"],
      imageUrl:
        "https://cdn.discordapp.com/attachments/1176389332140048465/1427957271392026634/1A10E491-6609-44BE-A69E-FE5B01391B98_1_105_c.jpeg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },{
      title: "Cooking Chicken",
      duration: "2 hr.",
      date: "2025-10-20",
      time: "10:00 - 12:00",
      location: "CB4301",
      totalseats: 50,
      phone: 962046598,
      tags: ["Academic", "Workshop"],
      imageUrl:
        "https://cdn.discordapp.com/attachments/1187005922288087091/1420375835528921108/IMG_0811_2.jpeg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
    {
      title: "Chicken Language",
      duration: "2 hr.",
      date: "2025-11-10",
      time: "13:00 - 15:00",
      location: "CB1201",
      totalseats: 50,
      phone: 962046598,
      tags: ["Academic", "Workshop"],
      imageUrl:
        "https://cdn.discordapp.com/attachments/1176389332140048465/1427957333304021033/7B70C761-1AB0-4A3D-BD48-7CBD581EDB4F_1_105_c.jpeg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
    {
      title: "Chicken Dance",
      duration: "2 hr.",
      date: "2025-11-10",
      time: "13:00 - 15:00",
      location: "CB1201",
      totalseats: 50,
      phone: 962046598,
      tags: ["Workshop", "Social"],
      imageUrl:
        "https://cdn.discordapp.com/attachments/1176389332140048465/1427957271392026634/1A10E491-6609-44BE-A69E-FE5B01391B98_1_105_c.jpeg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
    {
      title: "Cooking Chicken",
      duration: "2 hr.",
      date: "2025-10-20",
      time: "10:00 - 12:00",
      location: "CB4301",
      totalseats: 50,
      phone: 962046598,
      tags: ["Academic", "Workshop"],
      imageUrl:
        "https://cdn.discordapp.com/attachments/1187005922288087091/1420375835528921108/IMG_0811_2.jpeg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
    {
      title: "Chicken Language",
      duration: "2 hr.",
      date: "2025-11-10",
      time: "13:00 - 15:00",
      location: "CB1201",
      totalseats: 50,
      phone: 962046598,
      tags: ["Academic", "Workshop"],
      imageUrl:
        "https://cdn.discordapp.com/attachments/1176389332140048465/1427957333304021033/7B70C761-1AB0-4A3D-BD48-7CBD581EDB4F_1_105_c.jpeg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
    {
      title: "Chicken Dance",
      duration: "2 hr.",
      date: "2025-11-10",
      time: "13:00 - 15:00",
      location: "CB1201",
      totalseats: 50,
      phone: 962046598,
      tags: ["Workshop", "Social"],
      imageUrl:
        "https://cdn.discordapp.com/attachments/1176389332140048465/1427957271392026634/1A10E491-6609-44BE-A69E-FE5B01391B98_1_105_c.jpeg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
  ];

  const handleViewDetails = (event: Event) => {
    navigate(`/event/${event.title}`, { state: { event } });
  }; 
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

  return (
    <div className="font-sans bg-background min-h-screen pt-[50px]">
      <div className="mx-[15px] sm:mx-[25px] lg:mx-auto">
        <Navbar user={user} />
      </div>

      <div className="my-[80px] px-4 sm:px-6">
        <EventDetailedcard event={event} />
      </div>

      <div className="pb-[80px]">
        <HorizontalScrollCards events={events} onJoin={handleViewDetails} />
      </div>      

      <div className="flex items-center justify-center py-[10px] pt-[30px] text-[14px] font-normal">
        © 2025 Schedio. All rights reserved.
      </div>
    </div>
  );
}

export default EventDetailedPage;
