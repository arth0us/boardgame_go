import { createContext, useContext, useState, type ReactNode } from 'react';

export interface EventParticipant {
  id: string;
  name: string;
  role: 'host' | 'participant';
}

export interface Event {
  id: number;
  sourceEventId?: string;
  title: string;
  description: string;
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
  attendees?: EventParticipant[];
}

export interface EventComment {
  id: number;
  eventId: string;
  authorId?: string;
  authorName: string;
  body: string;
  createdAt: Date;
  isAnnouncement?: boolean;
}

interface EventsContextType {
  events: Event[];
  comments: EventComment[];
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: number, event: Partial<Event>) => void;
  deleteEvent: (id: number) => void;
  addComment: (comment: Omit<EventComment, 'id' | 'createdAt'>) => void;
  deleteComment: (commentId: number) => void;
  toggleCommentAnnouncement: (commentId: number) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

const hostAttendees: EventParticipant[] = [
  { id: 'me', name: '我', role: 'host' },
  { id: 'maya', name: 'Maya', role: 'participant' },
];

const joinedAttendees: EventParticipant[] = [
  { id: 'host-1', name: '桌遊店長', role: 'host' },
  { id: 'me', name: '我', role: 'participant' },
];

const buildDefaultAttendees = (event: Omit<Event, 'id'>): EventParticipant[] => {
  if (event.attendees?.length) return event.attendees;
  if (event.status === 'hosting') return [{ id: 'me', name: '我', role: 'host' }];
  return joinedAttendees;
};

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: '週末策略桌遊局',
      description: '想找附近同學一起玩一場策略桌遊，歡迎新手加入，現場會教規則。',
      type: 'Strategy',
      typeColor: '#d3e4ff',
      categoryId: 'strategy',
      location: '台北市大安區',
      locationAddress: '台北市大安區復興南路 283 號',
      date: new Date(),
      startTime: { hour: 21, minute: 0 },
      duration: { hour: 2, minute: 0 },
      time: '今天 21:00-23:00',
      status: 'joined',
      participants: '2/4 人',
      maxParticipants: 4,
      attendees: joinedAttendees,
    },
    {
      id: 2,
      title: '下課後派對桌遊局',
      description: '輕鬆玩派對遊戲，適合新手和想快速認識附近玩家的人。',
      type: 'Party',
      typeColor: '#ffdad6',
      categoryId: 'party',
      location: '實踐大學附近',
      locationAddress: '實踐大學附近',
      date: new Date(),
      startTime: { hour: 18, minute: 0 },
      duration: { hour: 3, minute: 0 },
      time: '今天 18:00',
      status: 'hosting',
      participants: '2/4 人',
      maxParticipants: 4,
      attendees: hostAttendees,
    },
  ]);
  const [comments, setComments] = useState<EventComment[]>([
    {
      id: 1,
      eventId: '1',
      authorId: 'host-1',
      authorName: '主持人',
      body: '我會提早 10 分鐘到店裡佔位，加入後有狀況可以在這裡留言。',
      createdAt: new Date(),
    },
    {
      id: 2,
      eventId: '2',
      authorId: 'maya',
      authorName: 'Maya',
      body: '我可能晚 5 分鐘到，先幫我留位。',
      createdAt: new Date(),
    },
  ]);

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = {
      ...event,
      attendees: buildDefaultAttendees(event),
      id: Date.now(),
    };
    setEvents((prev) => [...prev, newEvent]);
  };

  const updateEvent = (id: number, updatedData: Partial<Event>) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, ...updatedData } : event,
      ),
    );
  };

  const deleteEvent = (id: number) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
    setComments((prev) => prev.filter((comment) => comment.eventId !== String(id)));
  };

  const addComment = (comment: Omit<EventComment, 'id' | 'createdAt'>) => {
    setComments((prev) => [
      ...prev,
      {
        ...comment,
        id: Date.now(),
        createdAt: new Date(),
      },
    ]);
  };

  const deleteComment = (commentId: number) => {
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
  };

  const toggleCommentAnnouncement = (commentId: number) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              isAnnouncement: !comment.isAnnouncement,
            }
          : comment,
      ),
    );
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        comments,
        addEvent,
        updateEvent,
        deleteEvent,
        addComment,
        deleteComment,
        toggleCommentAnnouncement,
      }}
    >
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
