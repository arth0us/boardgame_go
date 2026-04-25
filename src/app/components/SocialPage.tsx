import { useEffect, useState } from 'react';
import { PageLayout } from './PageLayout';
import { GAME_CATEGORIES } from '../constants/gameCategories';
import { useEvents } from '../contexts/EventsContext';
import { FriendStatus, useSocial } from '../contexts/SocialContext';

const STATUS_META: Record<FriendStatus, { label: string; bgColor: string; textColor: string; dotColor: string }> = {
  online: { label: '上線中', bgColor: '#d1fae5', textColor: '#065f46', dotColor: '#16a34a' },
  offline: { label: '離線', bgColor: '#e5e7eb', textColor: '#4b5563', dotColor: '#6b7280' },
  playing: { label: '正在遊玩', bgColor: '#dbeafe', textColor: '#1d4ed8', dotColor: '#2563eb' },
};

export function SocialPage() {
  const { events } = useEvents();
  const { friends, friendInvites, acceptFriendInvite, ignoreFriendInvite } = useSocial();
  const [topListTab, setTopListTab] = useState<'friends' | 'invites'>('friends');
  const [selectedFriendId, setSelectedFriendId] = useState<number>(friends[0]?.id ?? 1);
  const [invitesByFriend, setInvitesByFriend] = useState<Record<number, number[]>>({});

  const selectedFriend = friends.find((friend) => friend.id === selectedFriendId) ?? friends[0] ?? null;
  const myHostEvents = events.filter((event) => event.status === 'hosting');
  const selectedStatusMeta = selectedFriend ? STATUS_META[selectedFriend.status] : STATUS_META.offline;

  useEffect(() => {
    if (friends.length === 0) return;
    if (!friends.some((friend) => friend.id === selectedFriendId)) {
      setSelectedFriendId(friends[0].id);
    }
  }, [friends, selectedFriendId]);

  const handleInvite = (friendId: number, eventId: number) => {
    setInvitesByFriend((prev) => {
      const invitedEvents = prev[friendId] ?? [];
      if (invitedEvents.includes(eventId)) {
        return prev;
      }
      return { ...prev, [friendId]: [...invitedEvents, eventId] };
    });
  };

  const handleAcceptFriendInvite = (inviteId: number) => {
    const acceptedFriend = acceptFriendInvite(inviteId);
    if (acceptedFriend) {
      setSelectedFriendId(acceptedFriend.id);
    }
    setTopListTab('friends');
  };

  const handleIgnoreFriendInvite = (inviteId: number) => {
    ignoreFriendInvite(inviteId);
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
              點擊好友查看狀態、偏好類型，並可處理好友邀請與活動邀請
            </p>
          </div>

          <div className="shrink-0">
            <div className="flex gap-[8px] mb-[8px]">
              <button
                onClick={() => setTopListTab('friends')}
                className={`px-[14px] py-[8px] rounded-full font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] border-2 ${
                  topListTab === 'friends'
                    ? 'bg-[#277d4a] text-[#c9ffd3] border-[#006334]'
                    : 'bg-white text-[#3f4940] border-[#d4d4d8]'
                }`}
              >
                好友（{friends.length}）
              </button>
              <button
                onClick={() => setTopListTab('invites')}
                className={`px-[14px] py-[8px] rounded-full font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] border-2 ${
                  topListTab === 'invites'
                    ? 'bg-[#277d4a] text-[#c9ffd3] border-[#006334]'
                    : 'bg-white text-[#3f4940] border-[#d4d4d8]'
                }`}
              >
                好友邀請（{friendInvites.length}）
              </button>
            </div>

            <div className="bg-white rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] overflow-hidden h-[320px]">
              <div className="h-full overflow-y-auto">
                {topListTab === 'friends' ? (
                  friends.map((friend) => {
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
                  })
                ) : friendInvites.length === 0 ? (
                  <div className="h-full flex items-center justify-center p-[16px] text-center font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] text-[#6f7a70]">
                    目前沒有新的好友邀請。
                  </div>
                ) : (
                  <div className="p-[10px] space-y-[8px]">
                    {friendInvites.map((invite) => {
                      const primaryCategory = GAME_CATEGORIES.find((category) => category.id === invite.categoryIds[0]);
                      return (
                        <div
                          key={invite.id}
                          className="bg-[#fafaf9] rounded-[8px] border border-[rgba(111,122,112,0.2)] p-[10px]"
                        >
                          <div className="flex items-center gap-[10px] mb-[8px]">
                            <div
                              className="size-[36px] rounded-full border-2 border-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0"
                              style={{ backgroundImage: `linear-gradient(to bottom right, ${invite.avatarFrom}, ${invite.avatarTo})` }}
                            />
                            <div className="min-w-0 flex-1">
                              <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] text-[#1a1c1c] truncate">
                                {invite.name}
                              </div>
                              <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[11px] text-[#6f7a70] truncate">
                                {primaryCategory ? `${primaryCategory.icon} ${primaryCategory.name}` : '偏好未設定'} • 共同好友 {invite.mutualCount} 位
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-[8px]">
                            <button
                              onClick={() => handleAcceptFriendInvite(invite.id)}
                              className="px-[10px] py-[6px] rounded-[7px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] bg-[#006334] text-white"
                            >
                              接受
                            </button>
                            <button
                              onClick={() => handleIgnoreFriendInvite(invite.id)}
                              className="px-[10px] py-[6px] rounded-[7px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] bg-[#e8e8e8] text-[#6f7a70]"
                            >
                              忽略
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] p-[16px] flex-1 min-h-0 overflow-y-auto">
            {selectedFriend ? (
              <>
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
              </>
            ) : (
              <div className="bg-[#f3f3f3] rounded-[8px] p-[12px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#6f7a70]">
                目前沒有好友，先接受上方好友邀請吧。
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
