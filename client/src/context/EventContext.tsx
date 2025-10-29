// src/context/EventContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Event {
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
  description: string;
}

interface EventContextType {
  events: Event[];
  joinEvent: (eventId: string) => void;
  cancelJoinEvent: (eventId: string) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Cooking Chicken",
    duration: "2 hr",
    date: "2025-10-20",
    time: "10:00 - 12:00",
    location: "CB4301",
    totalseats: 40,
    currentParticipants: 15,
    phone: 1234567890,
    tags: ["Workshop"],
    imageUrl: "",
    description: "Lorem ipsum dolor sit amet"
  },
  {
    id: "2",
    title: "Chicken Language",
    duration: "2 hr",
    date: "2025-11-10",
    time: "13:00 - 15:00",
    location: "CB1201",
    totalseats: 50,
    currentParticipants: 50,
    phone: 1234567890,
    tags: ["Academic", "Workshop"],
    imageUrl: "",
    description: "Lorem ipsum dolor sit amet"
  },
  // เพิ่ม mock event ตามต้องการ
];

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(mockEvents);

  const joinEvent = (eventId: string) => {
    setEvents(prev =>
      prev.map(ev =>
        ev.id === eventId && ev.currentParticipants < ev.totalseats
          ? { ...ev, currentParticipants: ev.currentParticipants + 1 }
          : ev
      )
    );
  };

  const cancelJoinEvent = (eventId: string) => {
    setEvents(prev =>
      prev.map(ev =>
        ev.id === eventId && ev.currentParticipants > 0
          ? { ...ev, currentParticipants: ev.currentParticipants - 1 }
          : ev
      )
    );
  };

  return (
    <EventContext.Provider value={{ events, joinEvent, cancelJoinEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) throw new Error("useEventContext must be used within EventProvider");
  return context;
};
