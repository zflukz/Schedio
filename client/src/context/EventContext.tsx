// src/context/EventContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { API_BASE_URL } from '../config/api';

// Status สำหรับ user / organizer/admin
export type UserEventStatus = "upcoming" | "joined" | "full";
export type AdminEventStatus = "Pending" | "Approved" | "Rejected";
export interface UserJoined {
  id: string;
  name: string;
  email: string;
}
export interface Event {
  id: string;
  title: string;
  duration: string;
  date: string;
  time: string;
  location: string;
  totalseats: number;
  currentParticipants: number;
  userStatus?: UserEventStatus;
  adminStatus?: AdminEventStatus;
  statusDate?: string;         
  approvedBy?: string;
  rejectedBy?: string;
  rejectReason?: string;
  phone?: number | string;
  tags: string[];
  imageUrl: string;
  description: string;
  organizer?: string;
  walkInAvailable?: boolean;
  reminder?: string;
  posterUrl?: string;
  proposalName?: string;
  proposalUrl?: string;
  joinedUsers?: UserJoined[]; 

}


interface EventContextType {
  events: Event[];
  myEvents: Event[];
  joinedEvents: string[];
  joinEvent: (eventId: string) => void;
  cancelJoinEvent: (eventId: string) => void;
  approveEvent: (eventId: string, approver: string) => void;
  rejectEvent: (eventId: string, rejecter: string, reason: string) => void;
  addEvent: (e: Event) => void;
  fetchHomeEvents: (filters?: { search?: string; category?: string[]; startDate?: string; endDate?: string }) => void;
  fetchOrganizerEvents: (userId?: string) => Promise<void>;
  fetchAdminEvents: () => Promise<void>;
  fetchMyRegistrations: () => Promise<void>;
  isMyEvent: (eventId: string) => boolean;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

// Mock data
const mockEvents: Event[] = [
  {
    id: "1",
    title: "Cooking Chicken",
    date: "2025-10-31",
    time: "10:00 - 12:00",
    location: "CB4301",
    duration: "2 hr.",
    totalseats: 40,
    currentParticipants: 0,
    adminStatus: "Approved", // แทน status
    approvedBy: "Admin",
    phone: "1234567890",
    tags: ["Workshop"],
    imageUrl: "",
    description: "Learn to cook delicious chicken dishes from scratch.",
    walkInAvailable: true,
    organizer: "Chef Academy",
    reminder: "Bring your own apron!",
    posterUrl: "https://cdn.discordapp.com/attachments/1187005922288087091/1420375835528921108/IMG_0811_2.jpeg?ex=69166dd4&is=69151c54&hm=93b60eb1580a4155334c247090b205e4b452b8d8c82f9428c3c093ccbbf97e7b&",
    proposalName: "Chicken Workshop Proposal",
    proposalUrl: "https://drive.google.com/file/d/1zBLjv1FPp4q7O-sGiESp66ZXCU1rfcGa/view?usp=sharing",
    statusDate: "2025-11-02", // ถ้าต้องใช้เก็บวันที่สถานะ
    joinedUsers: [
      { id: "u1", name: "Alice Johnson", email: "alice@example.com"},
      { id: "u2", name: "Bob Smith", email: "bob@example.com" },
    ],
  },
  {
    id: "2",
    title: "Thai Dessert Workshop",
    date: "2025-11-05",
    time: "09:00 - 12:00",
    location: "CB5202",
    duration: "3 hr.",
    totalseats: 25,
    currentParticipants: 5,
    adminStatus: "Pending",
    phone: 9876543210,
    tags: ["Workshop", "Cultural"],
    imageUrl: "",
    description: "Discover the art of making traditional Thai desserts.",
    walkInAvailable: false,
    organizer: "Cultural Club",
    reminder: "Please arrive 15 minutes early.",
    posterUrl: "",
    proposalName: "Thai Dessert Workshop Proposal",
    proposalUrl: "",
  },
  {
    id: "3",
    title: "Creative Writing Competition",
    date: "2025-11-20",
    time: "13:00 - 17:00",
    location: "Library Hall",
    duration: "4 hr.",
    totalseats: 50,
    currentParticipants: 0,
    adminStatus: "Rejected",
    rejectedBy: "Event Manager",
    rejectReason: "Insufficient entries",
    phone: "1122334455",
    tags: ["Competition", "Academic"],
    imageUrl: "",
    description: "Show off your storytelling skills in this creative writing contest.",
    walkInAvailable: false,
    organizer: "English Department",
    reminder: "Submit your story draft before the event.",
    posterUrl: "",
    proposalName: "Creative Writing Contest Proposal",
    proposalUrl: "",
    joinedUsers: [
      { id: "u1", name: "Alice Johnson", email: "alice@example.com"  },
      { id: "u2", name: "Bob Smith", email: "bob@example.com" },
    ],
  },
];


export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [joinedEvents, setJoinedEvents] = useState<string[]>([]);
  const addEvent = (e: Event) => setEvents((prev) => [...prev, e]);

  const fetchHomeEvents = (filters?: { search?: string; category?: string[]; startDate?: string; endDate?: string }) => {
    const token = localStorage.getItem("token");
    fetch(`${API_BASE_URL}/api/events/filter`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` }),
      },
      body: JSON.stringify(filters || {}),
    })
      .then(res => res.json())
      .then(response => {
        if (response.success && response.data) {
          const mappedEvents: Event[] = response.data.map((item: any) => {
            const startDate = new Date(item.startsAt);
            const endDate = new Date(item.endsAt);
            return {
              id: item.eventId,
              title: item.title,
              duration: `${item.activityHour} hr.`,
              date: startDate.toISOString().split('T')[0],
              time: `${startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })} - ${endDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}`,
              location: item.location,
              totalseats: item.capacity,
              currentParticipants: 0,
              adminStatus: "Approved",
              phone: item.eventContactPhone || item.organizer.userPhone,
              tags: item.categorySet || [],
              imageUrl: item.poster || "",
              description: item.description,
              organizer: item.eventBy,
              walkInAvailable: item.walkIn,
              posterUrl: item.poster,
              proposalUrl: item.filePdf,
            };
          });
          setEvents(mappedEvents);
        }
      })
      .catch(err => console.error("Failed to fetch events:", err));
  };

  const fetchOrganizerEvents = async (userId?: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/approval/filter-organizer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({})
      });
      
      const result = await response.json();
      
      if (result.success && result.data) {
        const mappedEvents: Event[] = result.data.map((approval: any) => {
          const event = approval.event;
          const startDate = new Date(event.startsAt);
          const endDate = new Date(event.endsAt);
          return {
            id: event.eventId,
            title: event.title,
            duration: `${event.activityHour || 0} hr.`,
            date: startDate.toISOString().split('T')[0],
            time: `${startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })} - ${endDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}`,
            location: event.location,
            totalseats: event.capacity || 0,
            currentParticipants: 0,
            adminStatus: approval.decision === 'APPROVED' ? 'Approved' : approval.decision === 'PENDING' ? 'Pending' : 'Rejected',
            phone: event.eventContactPhone,
            tags: event.categorySet || [],
            imageUrl: event.poster || "",
            description: event.description,
            organizer: event.eventBy,
            walkInAvailable: event.walkIn,
            posterUrl: event.poster,
            proposalUrl: event.filePdf,
          };
        });
        setMyEvents(mappedEvents);
        setEvents(prev => {
          const existingIds = prev.map(e => e.id);
          const newEvents = mappedEvents.filter(e => !existingIds.includes(e.id));
          return [...prev, ...newEvents];
        });
      }
    } catch (error) {
      console.error("Failed to fetch organizer events:", error);
    }
  };

  const fetchAdminEvents = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/approval/filter-admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({})
      });
      
      const result = await response.json();
      
      if (result.success && result.data) {
        const mappedEvents: Event[] = result.data.map((approval: any) => {
          const event = approval.event;
          const startDate = new Date(event.startsAt);
          const endDate = new Date(event.endsAt);
          return {
            id: event.eventId,
            title: event.title,
            duration: `${event.activityHour || 0} hr.`,
            date: startDate.toISOString().split('T')[0],
            time: `${startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })} - ${endDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}`,
            location: event.location,
            totalseats: event.capacity || 0,
            currentParticipants: 0,
            adminStatus: approval.decision === 'APPROVED' ? 'Approved' : approval.decision === 'PENDING' ? 'Pending' : 'Rejected',
            phone: event.eventContactPhone,
            tags: event.categorySet || [],
            imageUrl: event.poster || "",
            description: event.description,
            organizer: event.eventBy,
            walkInAvailable: event.walkIn,
            posterUrl: event.poster,
            proposalUrl: event.filePdf,
          };
        });
        setMyEvents(mappedEvents);
        setEvents(prev => {
          const existingIds = prev.map(e => e.id);
          const newEvents = mappedEvents.filter(e => !existingIds.includes(e.id));
          return [...prev, ...newEvents];
        });
      }
    } catch (error) {
      console.error("Failed to fetch admin events:", error);
    }
  };

  const fetchMyRegistrations = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/registrations/my-registrations`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      const result = await response.json();
      
      if (result.success && result.data) {
        const eventIds = result.data.map((registration: any) => registration.event.eventId);
        const registeredEvents: Event[] = result.data.map((registration: any) => {
          const event = registration.event;
          const startDate = new Date(event.startsAt);
          const endDate = new Date(event.endsAt);
          return {
            id: event.eventId,
            title: event.title,
            duration: `${event.activityHour || 0} hr.`,
            date: startDate.toISOString().split('T')[0],
            time: `${startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })} - ${endDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}`,
            location: event.location,
            totalseats: event.capacity || 0,
            currentParticipants: 0,
            adminStatus: "Approved",
            phone: event.eventContactPhone,
            tags: event.categorySet || [],
            imageUrl: event.poster || "",
            description: event.description,
            organizer: event.eventBy,
            walkInAvailable: event.walkIn,
            posterUrl: event.poster,
            proposalUrl: event.filePdf,
          };
        });
        setJoinedEvents(eventIds);
        setMyEvents(prev => [...prev, ...registeredEvents]);
      }
    } catch (error) {
      console.error("Failed to fetch my registrations:", error);
    }
  };

  const isMyEvent = (eventId: string) => {
    return myEvents.some(event => event.id === eventId) || joinedEvents.includes(eventId);
  };

  useEffect(() => {
    fetchHomeEvents();
  }, []);

  // Update user status
  const updateUserStatus = (ev: Event, joined: boolean) => {
    if (joined) return "joined" as UserEventStatus;
    if (ev.currentParticipants >= ev.totalseats) return "full" as UserEventStatus;
    return "upcoming" as UserEventStatus;
  };

  // User joins event
  const joinEvent = async (eventId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/registrations/register/${eventId}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      const result = await response.json();
      
      if (result.success) {
        setEvents(prev =>
          prev.map(ev => {
            if (ev.id === eventId && ev.currentParticipants < ev.totalseats) {
              const updated = { ...ev, currentParticipants: ev.currentParticipants + 1 };
              updated.userStatus = updateUserStatus(updated, true);
              return updated;
            }
            return ev;
          })
        );
        setJoinedEvents(prev => [...prev, eventId]);
      }
    } catch (error) {
      console.error("Failed to join event:", error);
    }
  };

  // User cancels join
  const cancelJoinEvent = async (eventId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/registrations/unregister/${eventId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      const result = await response.json();
      
      if (result.success) {
        setEvents(prev =>
          prev.map(ev => {
            if (ev.id === eventId && ev.currentParticipants > 0) {
              const updated = { ...ev, currentParticipants: ev.currentParticipants - 1 };
              updated.userStatus = updateUserStatus(updated, false);
              return updated;
            }
            return ev;
          })
        );
        setJoinedEvents(prev => prev.filter(id => id !== eventId));
      }
    } catch (error) {
      console.error("Failed to cancel join event:", error);
    }
  };

  // Organizer/Admin approves
  const approveEvent = async (eventId: string, decision: string, comment?: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/approval/approve/${eventId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          decision: decision,
          comment: comment
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setEvents(prev =>
          prev.map(ev => {
            if (ev.id === eventId) {
              return { ...ev, adminStatus: decision === "APPROVED" ? "Approved" : "Rejected" };
            }
            return ev;
          })
        );
        setMyEvents(prev =>
          prev.map(ev => {
            if (ev.id === eventId) {
              return { ...ev, adminStatus: decision === "APPROVED" ? "Approved" : "Rejected" };
            }
            return ev;
          })
        );
      }
    } catch (error) {
      console.error("Failed to approve/reject event:", error);
    }
  };

  // Organizer/Admin rejects
  const rejectEvent = async (eventId: string, rejecter: string, reason: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/approval/approve/${eventId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          decision: "REJECT",
          comment: reason
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setEvents(prev =>
          prev.map(ev => {
            if (ev.id === eventId) {
              return { ...ev, adminStatus: "Rejected", rejectedBy: rejecter, rejectReason: reason };
            }
            return ev;
          })
        );
        setMyEvents(prev =>
          prev.map(ev => {
            if (ev.id === eventId) {
              return { ...ev, adminStatus: "Rejected", rejectedBy: rejecter, rejectReason: reason };
            }
            return ev;
          })
        );
      }
    } catch (error) {
      console.error("Failed to reject event:", error);
    }
  };

  return (
    <EventContext.Provider
      value={{
        events,
        joinedEvents,
        joinEvent,
        cancelJoinEvent,
        approveEvent,
        rejectEvent,
        addEvent,
        fetchHomeEvents,
        fetchOrganizerEvents,
        fetchAdminEvents,
        fetchMyRegistrations,
        myEvents,
        isMyEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

// Hook สำหรับเรียกใช้ context
export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) throw new Error("useEventContext must be used within EventProvider");
  return context;
};
