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
  upcoming: Event[];
  joinedEvents: string[];
  joinEvent: (eventId: string) => void;
  cancelJoinEvent: (eventId: string) => void;
  approveEvent: (eventId: string, approver: string) => void;
  rejectEvent: (eventId: string, rejecter: string, reason: string) => void;
  addEvent: (e: Event) => void;
  fetchHomeEvents: (filters?: { search?: string; category?: string[]; startDate?: string; endDate?: string }) => void;
  fetchUpcoming: () => Promise<void>;
  fetchOrganizerEvents: (userId?: string) => Promise<void>;
  fetchAdminEvents: () => Promise<void>;
  fetchMyRegistrations: () => Promise<void>;
  isMyEvent: (eventId: string) => boolean;
}

const EventContext = createContext<EventContextType | undefined>(undefined);




export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [upcoming,setupcoming] = useState<Event[]>([]);
  const [joinedEvents, setJoinedEvents] = useState<string[]>([]);
  const addEvent = (e: Event) => setEvents((prev) => [...prev, e]);

  const fetchHomeEvents = (filters?: { search?: string; category?: string[]; startDate?: string; endDate?: string }) => {
    const token = localStorage.getItem("token");
    const payload: any = {};
    if (filters?.search) payload.search = filters.search;
    if (filters?.category && filters.category.length > 0) {
      payload.category = filters.category.map(c => c.toUpperCase());
    }
    if (filters?.startDate) payload.startDate = new Date(filters.startDate).toISOString();
    if (filters?.endDate) payload.endDate = new Date(filters.endDate).toISOString();
    
    fetch(`${API_BASE_URL}/api/events/filter`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` }),
      },
      body: JSON.stringify(payload),
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
  const fetchUpcoming = async() => {
    fetch(`${API_BASE_URL}/api/events/Upcoming-event`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
      }
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
              currentParticipants: item.registeredCount || 0,
              adminStatus: "Approved",
              phone: item.eventContactPhone,
              tags: item.categories || [],
              imageUrl: item.poster || "",
              description: item.description,
              organizer: item.eventBy,
              walkInAvailable: item.walkIn,
              posterUrl: item.poster,
              proposalUrl: item.filePdf,
            };
          });
          setupcoming(mappedEvents);
        }
      })
      .catch(err => console.error("Failed to fetch upcoming events:", err));
  }
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
        upcoming,
        joinedEvents,
        joinEvent,
        cancelJoinEvent,
        approveEvent,
        rejectEvent,
        addEvent,
        fetchHomeEvents,
        fetchUpcoming,
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
