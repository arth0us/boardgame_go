import { createContext, useContext, useState, type ReactNode } from 'react';

export type FriendStatus = 'online' | 'offline' | 'playing';

export interface Friend {
  id: number;
  name: string;
  status: FriendStatus;
  categoryIds: string[];
  joinedCount: number;
  avatarFrom: string;
  avatarTo: string;
}

export interface FriendInvite {
  id: number;
  name: string;
  status: FriendStatus;
  categoryIds: string[];
  joinedCount: number;
  avatarFrom: string;
  avatarTo: string;
  mutualCount: number;
}

const INITIAL_FRIENDS: Friend[] = [
  { id: 1, name: '小明', status: 'online', categoryIds: ['strategy'], joinedCount: 18, avatarFrom: '#34d399', avatarTo: '#059669' },
  { id: 2, name: '小華', status: 'playing', categoryIds: ['party', 'classic'], joinedCount: 12, avatarFrom: '#fb7185', avatarTo: '#e11d48' },
  { id: 3, name: '阿強', status: 'offline', categoryIds: ['card'], joinedCount: 9, avatarFrom: '#60a5fa', avatarTo: '#2563eb' },
  { id: 4, name: 'Sandy', status: 'online', categoryIds: ['classic'], joinedCount: 14, avatarFrom: '#a78bfa', avatarTo: '#7c3aed' },
  { id: 5, name: 'Leo', status: 'playing', categoryIds: ['strategy', 'card'], joinedCount: 21, avatarFrom: '#f59e0b', avatarTo: '#d97706' },
  { id: 6, name: 'Mia', status: 'online', categoryIds: ['party'], joinedCount: 16, avatarFrom: '#f472b6', avatarTo: '#db2777' },
  { id: 7, name: 'Eric', status: 'offline', categoryIds: ['classic', 'strategy'], joinedCount: 11, avatarFrom: '#22d3ee', avatarTo: '#0891b2' },
  { id: 8, name: 'Nina', status: 'playing', categoryIds: ['card', 'party'], joinedCount: 13, avatarFrom: '#4ade80', avatarTo: '#16a34a' },
];

const INITIAL_FRIEND_INVITES: FriendInvite[] = [
  { id: 101, name: 'Jenny', status: 'online', categoryIds: ['party'], joinedCount: 7, avatarFrom: '#fb7185', avatarTo: '#e11d48', mutualCount: 3 },
  { id: 102, name: 'Max', status: 'offline', categoryIds: ['strategy', 'classic'], joinedCount: 20, avatarFrom: '#60a5fa', avatarTo: '#2563eb', mutualCount: 5 },
];

interface SocialContextType {
  friends: Friend[];
  friendInvites: FriendInvite[];
  acceptFriendInvite: (inviteId: number) => Friend | null;
  ignoreFriendInvite: (inviteId: number) => void;
}

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export function SocialProvider({ children }: { children: ReactNode }) {
  const [friends, setFriends] = useState<Friend[]>(INITIAL_FRIENDS);
  const [friendInvites, setFriendInvites] = useState<FriendInvite[]>(INITIAL_FRIEND_INVITES);

  const acceptFriendInvite = (inviteId: number) => {
    const invite = friendInvites.find((item) => item.id === inviteId);
    if (!invite) return null;

    const existingFriend = friends.find((friend) => friend.name === invite.name);
    if (existingFriend) {
      setFriendInvites((prev) => prev.filter((item) => item.id !== inviteId));
      return existingFriend;
    }

    const nextId = friends.length > 0 ? Math.max(...friends.map((friend) => friend.id)) + 1 : 1;
    const newFriend: Friend = {
      id: nextId,
      name: invite.name,
      status: invite.status,
      categoryIds: invite.categoryIds,
      joinedCount: invite.joinedCount,
      avatarFrom: invite.avatarFrom,
      avatarTo: invite.avatarTo,
    };

    setFriends((prev) => [...prev, newFriend]);
    setFriendInvites((prev) => prev.filter((item) => item.id !== inviteId));
    return newFriend;
  };

  const ignoreFriendInvite = (inviteId: number) => {
    setFriendInvites((prev) => prev.filter((item) => item.id !== inviteId));
  };

  return (
    <SocialContext.Provider value={{ friends, friendInvites, acceptFriendInvite, ignoreFriendInvite }}>
      {children}
    </SocialContext.Provider>
  );
}

export function useSocial() {
  const context = useContext(SocialContext);
  if (context === undefined) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
}
