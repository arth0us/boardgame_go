import { createContext, useContext, useState, ReactNode } from 'react';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';

export interface Event {
  id: number;
  sourceEventId?: string;
  title: string;
  type: string;
  typeColor: string;
  categoryId: string;
  location: string;
  locationAddress: string;
  date: Date;
  startTime: { hour: number; minute: number };
  duration: { hour: number; minute: number };
  time: string;
  status: 'hosting' | 'joined';
  participants: string;
  maxParticipants: number;
}

interface EventsContextType {
  events: Event[];
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: number, event: Partial<Event>) => void;
  deleteEvent: (id: number) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: '週末策略桌遊局',
      type: 'Strategy',
      typeColor: '#d3e4ff',
      categoryId: 'strategy',
      location: '台北市大安區',
      locationAddress: '台北市大安區羅斯福路三段 283 巷',
      date: new Date(),
      startTime: { hour: 19, minute: 0 },
      duration: { hour: 2, minute: 0 },
      time: '今天 19:00',
      status: 'joined',
      participants: '2/4 人',
      maxParticipants: 4,
    },
  ]);

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = {
      ...event,
      id: Date.now(),
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const updateEvent = (id: number, updatedData: Partial<Event>) => {
    setEvents(prev =>
      prev.map(event =>
        event.id === id ? { ...event, ...updatedData } : event
      )
    );
  };

  const deleteEvent = (id: number) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
}
