import { useState } from 'react';
import { PageLayout } from './PageLayout';
import { GAME_CATEGORIES } from '../constants/gameCategories';
import { useEvents } from '../contexts/EventsContext';

type FriendStatus = 'online' | 'offline' | 'playing';

interface Friend {
  id: number;
  name: string;
  status: FriendStatus;
  categoryIds: string[];
  joinedCount: number;
  avatarFrom: string;
  avatarTo: string;
}

const FRIENDS: Friend[] = [
  { id: 1, name: '小明', status: 'online', categoryIds: ['strategy'], joinedCount: 18, avatarFrom: '#34d399', avatarTo: '#059669' },
  { id: 2, name: '小華', status: 'playing', categoryIds: ['party', 'classic'], joinedCount: 12, avatarFrom: '#fb7185', avatarTo: '#e11d48' },
  { id: 3, name: '阿強', status: 'offline', categoryIds: ['card'], joinedCount: 9, avatarFrom: '#60a5fa', avatarTo: '#2563eb' },
  { id: 4, name: 'Sandy', status: 'online', categoryIds: ['classic'], joinedCount: 14, avatarFrom: '#a78bfa', avatarTo: '#7c3aed' },
  { id: 5, name: 'Leo', status: 'playing', categoryIds: ['strategy', 'card'], joinedCount: 21, avatarFrom: '#f59e0b', avatarTo: '#d97706' },
  { id: 6, name: 'Mia', status: 'online', categoryIds: ['party'], joinedCount: 16, avatarFrom: '#f472b6', avatarTo: '#db2777' },
  { id: 7, name: 'Eric', status: 'offline', categoryIds: ['classic', 'strategy'], joinedCount: 11, avatarFrom: '#22d3ee', avatarTo: '#0891b2' },
  { id: 8, name: 'Nina', status: 'playing', categoryIds: ['card', 'party'], joinedCount: 13, avatarFrom: '#4ade80', avatarTo: '#16a34a' },
];

const STATUS_META: Record<FriendStatus, { label: string; bgColor: string; textColor: string; dotColor: string }> = {
  online: { label: '上線中', bgColor: '#d1fae5', textColor: '#065f46', dotColor: '#16a34a' },
  offline: { label: '離線', bgColor: '#e5e7eb', textColor: '#4b5563', dotColor: '#6b7280' },
  playing: { label: '正在遊玩', bgColor: '#dbeafe', textColor: '#1d4ed8', dotColor: '#2563eb' },
};

export function SocialPage() {
  const { events } = useEvents();
  const [selectedFriendId, setSelectedFriendId] = useState<number>(FRIENDS[0]?.id ?? 1);
  const [invitesByFriend, setInvitesByFriend] = useState<Record<number, number[]>>({});

  const selectedFriend = FRIENDS.find((friend) => friend.id === selectedFriendId) ?? FRIENDS[0];
  const myHostEvents = events.filter((event) => event.status === 'hosting');
  const selectedStatusMeta = STATUS_META[selectedFriend.status];

  const handleInvite = (friendId: number, eventId: number) => {
    setInvitesByFriend((prev) => {
      const invitedEvents = prev[friendId] ?? [];
      if (invitedEvents.includes(eventId)) {
        return prev;
      }
      return { ...prev, [friendId]: [...invitedEvents, eventId] };
    });
  };

  return (
    <PageLayout>
      <div className="size-full overflow-hidden bg-[#f9f9f9] p-[20px]">
        <div className="h-full flex flex-col gap-[16px]">
          <div className="shrink-0">
            <h1 className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[24px] text-[#1a1c1c] mb-[6px]">
              好友
            </h1>
            <p className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#6f7a70]">
              點擊好友查看狀態、偏好類型並邀請加入你的活動
            </p>
          </div>

          <div className="bg-white rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] overflow-hidden h-[320px] shrink-0">
            <div className="h-full overflow-y-auto">
              {FRIENDS.map((friend) => {
                const statusMeta = STATUS_META[friend.status];
                const isSelected = friend.id === selectedFriendId;
                const primaryCategory = GAME_CATEGORIES.find((cat) => cat.id === friend.categoryIds[0]);
                return (
                  <button
                    key={friend.id}
                    onClick={() => setSelectedFriendId(friend.id)}
                    className={`w-full text-left p-[14px] border-b border-[#e7e5e4] last:border-b-0 ${
                      isSelected ? 'bg-[#f0fdf4]' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-[12px]">
                      <div
                        className="size-[44px] rounded-full border-2 border-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0"
                        style={{ backgroundImage: `linear-gradient(to bottom right, ${friend.avatarFrom}, ${friend.avatarTo})` }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-[8px] mb-[2px]">
                          <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[15px] text-[#1a1c1c] truncate">
                            {friend.name}
                          </span>
                          <span
                            className="inline-flex items-center gap-[5px] px-[6px] py-[2px] rounded-[10px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[11px]"
                            style={{ backgroundColor: statusMeta.bgColor, color: statusMeta.textColor }}
                          >
                            <span className="size-[6px] rounded-full" style={{ backgroundColor: statusMeta.dotColor }} />
                            {statusMeta.label}
                          </span>
                        </div>
                        <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#6f7a70] truncate">
                          {primaryCategory ? `${primaryCategory.icon} ${primaryCategory.name}` : '偏好未設定'} • 已參與 {friend.joinedCount} 場
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedFriend && (
            <div className="bg-white rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] p-[16px] flex-1 min-h-0 overflow-y-auto">
              <h2 className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[18px] text-[#1a1c1c] mb-[12px]">
                {selectedFriend.name} 的資訊
              </h2>

              <div className="mb-[14px]">
                <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] text-[#6f7a70] mb-[6px]">
                  好友狀態
                </div>
                <span
                  className="inline-flex items-center gap-[6px] px-[10px] py-[6px] rounded-[8px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px]"
                  style={{ backgroundColor: selectedStatusMeta.bgColor, color: selectedStatusMeta.textColor }}
                >
                  <span className="size-[7px] rounded-full" style={{ backgroundColor: selectedStatusMeta.dotColor }} />
                  {selectedStatusMeta.label}
                </span>
              </div>

              <div className="mb-[14px]">
                <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] text-[#6f7a70] mb-[6px]">
                  偏好遊戲類型
                </div>
                <div className="flex flex-wrap gap-[8px]">
                  {selectedFriend.categoryIds.map((categoryId) => {
                    const category = GAME_CATEGORIES.find((item) => item.id === categoryId);
                    if (!category) return null;
                    return (
                      <span
                        key={category.id}
                        className="px-[10px] py-[6px] rounded-[8px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px]"
                        style={{ backgroundColor: category.bgColor, color: category.color }}
                      >
                        {category.icon} {category.name}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] text-[#6f7a70] mb-[8px]">
                  邀請加入我的活動
                </div>
                {myHostEvents.length === 0 ? (
                  <div className="bg-[#f3f3f3] rounded-[8px] p-[12px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#6f7a70]">
                    你目前沒有可邀請的主揪活動，先到 Create 發起活動吧。
                  </div>
                ) : (
                  <div className="flex flex-col gap-[8px]">
                    {myHostEvents.map((event) => {
                      const invited = (invitesByFriend[selectedFriend.id] ?? []).includes(event.id);
                      return (
                        <div
                          key={event.id}
                          className="bg-[#fafaf9] rounded-[8px] border border-[rgba(111,122,112,0.2)] p-[10px] flex items-center justify-between gap-[8px]"
                        >
                          <div className="min-w-0">
                            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] text-[#1a1c1c] truncate">
                              {event.title}
                            </div>
                            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[11px] text-[#6f7a70] truncate">
                              {event.time} • {event.location}
                            </div>
                          </div>
                          <button
                            onClick={() => handleInvite(selectedFriend.id, event.id)}
                            disabled={invited}
                            className={`shrink-0 px-[10px] py-[6px] rounded-[7px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] ${
                              invited
                                ? 'bg-[#e8e8e8] text-[#6f7a70]'
                                : 'bg-[#006334] text-white'
                            }`}
                          >
                            {invited ? '已邀請' : '邀請'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
