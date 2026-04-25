import { PageLayout } from './PageLayout';
import { useState } from 'react';
import { GAME_CATEGORIES } from '../constants/gameCategories';

export function ProfilePage() {
  const [preferredCategoryId, setPreferredCategoryId] = useState<string>(GAME_CATEGORIES[0]?.id ?? '');
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState<'online' | 'offline' | 'playing'>('online');
  const preferredCategory = GAME_CATEGORIES.find((category) => category.id === preferredCategoryId) ?? GAME_CATEGORIES[0];
  const onlineStatusOptions = [
    { id: 'online' as const, label: '上線中', bgColor: '#d1fae5', color: '#065f46' },
    { id: 'offline' as const, label: '離線', bgColor: '#e8e8e8', color: '#6f7a70' },
    { id: 'playing' as const, label: '正在遊玩', bgColor: '#dbeafe', color: '#1d4ed8' },
  ];
  const selectedOnlineStatus =
    onlineStatusOptions.find((status) => status.id === onlineStatus) ?? onlineStatusOptions[0];

  return (
    <PageLayout>
      <div className="size-full overflow-y-auto bg-[#f9f9f9] p-[20px] flex flex-col gap-[24px]">
        {/* User Info Card */}
        <div className="bg-white rounded-[12px] p-[24px] border-2 border-[rgba(111,122,112,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col items-center gap-[16px]">
            <div className="size-[80px] rounded-full border-4 border-[#277d4a] overflow-hidden">
              <div className="size-full bg-gradient-to-br from-[#277d4a] to-[#065f46]" />
            </div>
            <div className="text-center">
              <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[20px] text-[#1a1c1c] mb-[4px]">
                桌遊玩家
              </div>
              <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#6f7a70]">
                已參與 12 場桌遊聚會
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-[12px]">
          <div className="bg-[#d1fae5] rounded-[8px] p-[16px] text-center">
            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[24px] text-[#065f46] mb-[4px]">
              12
            </div>
            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#065f46]">
              已參與
            </div>
          </div>
          <div className="bg-[#d1fae5] rounded-[8px] p-[16px] text-center">
            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[24px] text-[#065f46] mb-[4px]">
              5
            </div>
            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#065f46]">
              發起活動
            </div>
          </div>
          <div className="bg-[#d1fae5] rounded-[8px] p-[16px] text-center">
            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[24px] text-[#065f46] mb-[4px]">
              8
            </div>
            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#065f46]">
              好友數
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] overflow-hidden">
          <div className="p-[16px] border-b border-[#e7e5e4]">
            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#1a1c1c]">
              我的設定
            </div>
          </div>
          <div className="p-[16px] border-b border-[#e7e5e4]">
            <div className="w-full flex items-center justify-between gap-[12px]">
              <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#3f4940]">
                偏好遊戲類型
              </div>
              <div className="relative">
                <select
                  value={preferredCategoryId}
                  onChange={(event) => setPreferredCategoryId(event.target.value)}
                  className="appearance-none rounded-[8px] border border-[rgba(111,122,112,0.2)] pl-[10px] pr-[28px] py-[8px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px]"
                  style={{ backgroundColor: preferredCategory.bgColor, color: preferredCategory.color }}
                >
                  {GAME_CATEGORIES.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
                <svg
                  className="size-[14px] absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path fill="#6f7a70" d="M3 5L7 9L11 5H3Z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="p-[16px] border-b border-[#e7e5e4]">
            <div className="flex items-center justify-between">
              <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#3f4940]">
                通知設定
              </div>
              <div className="flex items-center gap-[10px]">
                <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#6f7a70]">
                  {isNotificationEnabled ? '開啟' : '關閉'}
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={isNotificationEnabled}
                  aria-label="通知設定開關"
                  onClick={() => setIsNotificationEnabled((prev) => !prev)}
                  className={`w-[46px] h-[26px] rounded-full border-2 transition-colors ${
                    isNotificationEnabled
                      ? 'bg-[#006334] border-[#006334]'
                      : 'bg-[#e2e2e2] border-[#bfc9be]'
                  }`}
                >
                  <span
                    className={`block w-[18px] h-[18px] rounded-full bg-white transition-transform ${
                      isNotificationEnabled ? 'translate-x-[22px]' : 'translate-x-[2px]'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="p-[16px]">
            <div className="w-full flex items-center justify-between gap-[12px]">
              <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#3f4940]">
                上線狀態
              </div>
              <div className="relative">
                <select
                  value={onlineStatus}
                  onChange={(event) => setOnlineStatus(event.target.value as 'online' | 'offline' | 'playing')}
                  className="appearance-none rounded-[8px] border border-[rgba(111,122,112,0.2)] pl-[10px] pr-[28px] py-[8px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px]"
                  style={{ backgroundColor: selectedOnlineStatus.bgColor, color: selectedOnlineStatus.color }}
                >
                  {onlineStatusOptions.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.label}
                    </option>
                  ))}
                </select>
                <svg
                  className="size-[14px] absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path fill="#6f7a70" d="M3 5L7 9L11 5H3Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
