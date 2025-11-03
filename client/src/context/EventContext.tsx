// src/context/EventContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

export type EventStatus = "upcoming" | "joined" | "full";

export interface Event {
  id: string;
  title: string;
  duration: string;
  date: string;
  time: string;
  location: string;
  totalseats: number;
  currentParticipants: number;
  status: EventStatus;
  phone?: number;
  tags: string[];
  imageUrl: string;
  description: string;
}

interface EventContextType {
  events: Event[];
  joinedEvents: string[]; // เก็บ id ของ event ที่ user join
  joinEvent: (eventId: string) => void;
  cancelJoinEvent: (eventId: string) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

const mockEvents: Event[] = [
  
  {
    id: "1",
    title: "Cooking Chicken",
    duration: "2 hr.",
    date: "2025-10-31",
    time: "10:00 - 12:00",
    location: "CB4301",
    totalseats: 40,
    currentParticipants: 15,
    status: "upcoming",
    phone: 1234567890,
    tags: ["Workshop"],
    imageUrl: "",
    description: "Lorem ipsum dolor sit amet"
  },
  
  {
    id: "2",
    title: "Chicken Language",
    duration: "2 hr.",
    date: "2025-11-10",
    time: "13:00 - 15:00",
    location: "CB1201",
    totalseats: 50,
    currentParticipants: 50,
    status: "full",
    phone: 1234567890,
    tags: ["Academic", "Workshop"],
    imageUrl: "",
    description: "Lorem ipsum dolor sit amet"
  },
  {
    id: "3",
    title: "Cooking fegviuf",
    duration: "2 hr.",
    date: "2025-11-5",
    time: "10:00 - 12:00",
    location: "CB4301",
    totalseats: 40,
    currentParticipants: 15,
    status: "upcoming",
    phone: 1234567890,
    tags: ["Workshop", "Cultural"],
    imageUrl: "",
    description: "Lorem ipsum dolor sit amet"
  },
  {
    id: "4",
    title: "Sleeping Chicken",
    duration: "2 hr.",
    date: "2025-11-5",
    time: "10:00 - 12:00",
    location: "CB4301",
    totalseats: 40,
    currentParticipants: 15,
    status: "upcoming",
    phone: 1234567890,
    tags: ["Workshop"],
    imageUrl: "",
    description: "Lorem ipsum dolor sit amet"
  },
  {
    id: "5",
    title: "Teaching Chicken",
    duration: "2 hr.",
    date: "2025-11-5",
    time: "10:00 - 12:00",
    location: "CB4301",
    totalseats: 40,
    currentParticipants: 15,
    status: "upcoming",
    phone: 1234567890,
    tags: ["Workshop", "Cultural"],
    imageUrl: "",
    description: "Lorem ipsum dolor sit amet"
  },
  {
    id: "6",
    title: "Teaching Chicken",
    duration: "2 hr.",
    date: "2025-11-5",
    time: "10:00 - 12:00",
    location: "CB4301",
    totalseats: 40,
    currentParticipants: 15,
    status: "upcoming",
    phone: 1234567890,
    tags: ["Workshop", "Cultural"],
    imageUrl: "",
    description: "Lorem ipsum dolor sit amet"
  },
  {
    id: "7",
    title: "Teaching AiOak",
    duration: "2 hr.",
    date: "2025-11-5",
    time: "10:00 - 12:00",
    location: "CB4301",
    totalseats: 40,
    currentParticipants: 15,
    status: "upcoming",
    phone: 1234567890,
    tags: ["Workshop", "Cultural"],
    imageUrl: "",
    description: "Lorem ipsum dolor sit amet"
  },{
    id: "8",
    title: "Teaching Nongnumlaiyud",
    duration: "2 hr.",
    date: "2025-11-5",
    time: "10:00 - 12:00",
    location: "CB4301",
    totalseats: 40,
    currentParticipants: 15,
    status: "upcoming",
    phone: 1234567890,
    tags: ["Workshop", "Cultural"],
    imageUrl: "",
    description: "Lorem ipsum dolor sit amet"
  },
];

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [joinedEvents, setJoinedEvents] = useState<string[]>([]);

  const updateStatus = (ev: Event, joined: boolean) => {
    if (joined) return "joined" as EventStatus;
    if (ev.currentParticipants >= ev.totalseats) return "full" as EventStatus;
    return "upcoming" as EventStatus;
  };

  const joinEvent = (eventId: string) => {
    setEvents(prev =>
      prev.map(ev => {
        if (ev.id === eventId && ev.currentParticipants < ev.totalseats) {
          const updated = { ...ev, currentParticipants: ev.currentParticipants + 1 };
          updated.status = updateStatus(updated, true);
          return updated;
        }
        return ev;
      })
    );
    setJoinedEvents(prev => [...prev, eventId]);
  };

  const cancelJoinEvent = (eventId: string) => {
    setEvents(prev =>
      prev.map(ev => {
        if (ev.id === eventId && ev.currentParticipants > 0) {
          const updated = { ...ev, currentParticipants: ev.currentParticipants - 1 };
          updated.status = updateStatus(updated, false);
          return updated;
        }
        return ev;
      })
    );
    setJoinedEvents(prev => prev.filter(id => id !== eventId));
  };

  return (
    <EventContext.Provider value={{ events, joinedEvents, joinEvent, cancelJoinEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) throw new Error("useEventContext must be used within EventProvider");
  return context;
};
