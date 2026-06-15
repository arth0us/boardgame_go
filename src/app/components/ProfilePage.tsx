import { PageLayout } from './PageLayout';
import { useState } from 'react';
import { AvailabilityPreferenceSheet } from './AvailabilityPreferenceSheet';
import { GAME_CATEGORIES } from '../constants/gameCategories';
import { useEvents } from '../contexts/EventsContext';
import { useSocial } from '../contexts/SocialContext';
import {
  type AvailabilityPreference,
  type AvailabilityPreferenceDraft,
  useUserPreferences,
} from '../contexts/UserPreferencesContext';

const formatTimeInput = (time: { hour: number; minute: number }) =>
  `${time.hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')}`;

const parseTimeInput = (value: string) => {
  const [hour = '0', minute = '0'] = value.split(':');
  return { hour: Number(hour), minute: Number(minute) };
};

const formatPreferenceTimeRange = (preference: AvailabilityPreference) =>
  `${formatTimeInput(preference.startTime)}-${formatTimeInput(preference.endTime)}`;

export function ProfilePage() {
  const { events } = useEvents();
  const { friends } = useSocial();
  const {
    availabilityPresets,
    availabilityPreference,
    activePreferenceId,
    selectAvailabilityPreference,
    addAvailabilityPreference,
    createAvailabilityPreference,
    deleteAvailabilityPreference,
    deleteAvailabilityPreferenceById,
    updateAvailabilityPreference,
    updateAvailabilityPreferenceById,
  } = useUserPreferences();
  const [preferredCategoryId, setPreferredCategoryId] = useState<string>(GAME_CATEGORIES[0]?.id ?? '');
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState<'online' | 'offline' | 'playing'>('online');
  const [isPreferenceSheetOpen, setIsPreferenceSheetOpen] = useState(false);
  const [editingPreference, setEditingPreference] = useState<AvailabilityPreference | null>(null);
  const [preferenceSwipeStartX, setPreferenceSwipeStartX] = useState<number | null>(null);
  const preferredCategory = GAME_CATEGORIES.find((category) => category.id === preferredCategoryId) ?? GAME_CATEGORIES[0];
  const joinedEventsCount = events.filter((event) => event.status === 'joined').length;
  const hostingEventsCount = events.filter((event) => event.status === 'hosting').length;
  const friendsCount = friends.length;
  const onlineStatusOptions = [
    { id: 'online' as const, label: '上線中', bgColor: '#d1fae5', color: '#065f46' },
    { id: 'offline' as const, label: '離線', bgColor: '#e8e8e8', color: '#6f7a70' },
    { id: 'playing' as const, label: '正在遊玩', bgColor: '#dbeafe', color: '#1d4ed8' },
  ];
  const selectedOnlineStatus =
    onlineStatusOptions.find((status) => status.id === onlineStatus) ?? onlineStatusOptions[0];
  const activePreferenceCategory =
    GAME_CATEGORIES.find((category) => category.id === availabilityPreference.categoryId) ?? GAME_CATEGORIES[0];
  const newPreferenceDraft: AvailabilityPreferenceDraft = {
    ...availabilityPreference,
    label: `新標籤 ${availabilityPresets.length + 1}`,
  };

  const handleCreatePreference = () => {
    setEditingPreference(null);
    setIsPreferenceSheetOpen(true);
  };

  const handleEditPreference = (preference: AvailabilityPreference) => {
    setEditingPreference(preference);
    setIsPreferenceSheetOpen(true);
  };

  const handleSavePreference = (preference: AvailabilityPreferenceDraft) => {
    if (editingPreference) {
      updateAvailabilityPreferenceById(editingPreference.id, preference);
      selectAvailabilityPreference(editingPreference.id);
      return;
    }
    createAvailabilityPreference(preference);
  };

  const selectPreferenceBySwipe = (offsetX: number) => {
    if (Math.abs(offsetX) < 48 || availabilityPresets.length <= 1) {
      return;
    }

    const currentIndex = availabilityPresets.findIndex((preset) => preset.id === activePreferenceId);
    if (currentIndex === -1) {
      return;
    }

    const nextIndex =
      offsetX < 0
        ? Math.min(currentIndex + 1, availabilityPresets.length - 1)
        : Math.max(currentIndex - 1, 0);
    const nextPreset = availabilityPresets[nextIndex];
    if (nextPreset && nextPreset.id !== activePreferenceId) {
      selectAvailabilityPreference(nextPreset.id);
    }
  };

  return (
    <PageLayout>
      <div className="size-full overflow-y-auto scrollbar-hidden bg-[#f9f9f9] p-[20px] flex flex-col gap-[16px]">
        {/* User Info Card */}
        <div className="bg-white rounded-[12px] p-[24px] border-2 border-[rgba(111,122,112,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0">
          <div className="flex flex-col items-center gap-[16px]">
            <div className="size-[80px] rounded-full border-4 border-[#277d4a] overflow-hidden">
              <div className="size-full bg-gradient-to-br from-[#277d4a] to-[#065f46]" />
            </div>
            <div className="text-center">
              <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[20px] text-[#1a1c1c] mb-[4px]">
                桌遊玩家
              </div>
              <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#6f7a70]">
                已參與 {joinedEventsCount} 場桌遊聚會
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-[12px] shrink-0">
          <div className="bg-[#d1fae5] rounded-[8px] p-[16px] text-center">
            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[24px] text-[#065f46] mb-[4px]">
              {joinedEventsCount}
            </div>
            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#065f46]">
              已參與
            </div>
          </div>
          <div className="bg-[#d1fae5] rounded-[8px] p-[16px] text-center">
            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[24px] text-[#065f46] mb-[4px]">
              {hostingEventsCount}
            </div>
            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#065f46]">
              發起活動
            </div>
          </div>
          <div className="bg-[#d1fae5] rounded-[8px] p-[16px] text-center">
            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[24px] text-[#065f46] mb-[4px]">
              {friendsCount}
            </div>
            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#065f46]">
              好友數
            </div>
          </div>
        </div>

        {/* Availability Preference */}
        <div className="relative bg-white rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] overflow-hidden shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0">
          <div className="p-[16px] pr-[58px] border-b border-[#e7e5e4]">
            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#1a1c1c]">
              我的空檔偏好
            </div>
            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#6f7a70] mt-[4px]">
              這組設定會出現在首頁底部快速面板
            </div>
          </div>

          <button
            type="button"
            onClick={handleCreatePreference}
            aria-label="新增空檔標籤"
            title="新增空檔標籤"
            className="absolute right-[16px] top-[14px] z-10 shrink-0 size-[32px] rounded-full bg-[#d1fae5] border-2 border-[#b7e4c7] text-[#006334] flex items-center justify-center shadow-[inset_0px_1px_2px_rgba(0,0,0,0.08)]"
          >
            <svg className="size-[18px]" fill="none" viewBox="0 0 20 20" aria-hidden="true">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M10 4v12M4 10h12" />
            </svg>
          </button>

          <div className="p-[14px] flex flex-col gap-[10px]">
            <div className="flex gap-[8px] overflow-x-auto scrollbar-hidden pb-[2px]">
              {availabilityPresets.map((preset) => {
                const isActive = preset.id === activePreferenceId;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => selectAvailabilityPreference(preset.id)}
                    className={`h-[32px] shrink-0 rounded-full border-2 px-[10px] py-0 font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] ${
                      isActive
                        ? 'border-[#006334] bg-[#006334] text-white'
                        : 'border-[rgba(111,122,112,0.25)] bg-[#f9f9f9] text-[#3f4940]'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>

            <div
              data-testid="active-preference-card"
              className="rounded-[12px] border-2 border-[#006334] bg-[#e8f7ee] p-[12px] touch-pan-y"
              onPointerDown={(event) => setPreferenceSwipeStartX(event.clientX)}
              onPointerUp={(event) => {
                if (preferenceSwipeStartX !== null) {
                  selectPreferenceBySwipe(event.clientX - preferenceSwipeStartX);
                }
                setPreferenceSwipeStartX(null);
              }}
              onPointerCancel={() => setPreferenceSwipeStartX(null)}
            >
              <div className="mb-[10px] flex items-start justify-between gap-[10px]">
                <div className="min-w-0">
                  <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#1a1c1c] truncate">
                    {availabilityPreference.label}
                  </div>
                  <div className="mt-[4px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#6f7a70] truncate">
                    {formatPreferenceTimeRange(availabilityPreference)} · {availabilityPreference.location}
                  </div>
                </div>
                <span
                  className="shrink-0 rounded-[8px] px-[8px] py-[5px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px]"
                  style={{
                    backgroundColor: activePreferenceCategory?.bgColor ?? '#d1fae5',
                    color: activePreferenceCategory?.color ?? '#006334',
                  }}
                >
                  {activePreferenceCategory?.name ?? '桌遊'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-[8px]">
                <button
                  type="button"
                  onClick={() => handleEditPreference(availabilityPreference)}
                  className="h-[40px] rounded-[8px] border-2 border-[rgba(111,122,112,0.2)] bg-white font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#3f4940]"
                >
                  編輯
                </button>
                <button
                  type="button"
                  onClick={() => deleteAvailabilityPreferenceById(activePreferenceId)}
                  disabled={availabilityPresets.length <= 1}
                  className="h-[40px] rounded-[8px] border-2 border-[#fecaca] bg-[#fff1f2] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#be123c] disabled:cursor-not-allowed disabled:border-[#e7e5e4] disabled:bg-[#f4f4f4] disabled:text-[#9ca3af]"
                >
                  刪除
                </button>
              </div>
            </div>
          </div>

          <div className="hidden">
            {availabilityPresets.map((preset) => {
              const isActive = preset.id === activePreferenceId;
              const category = GAME_CATEGORIES.find((item) => item.id === preset.categoryId);
              return (
                <div
                  key={preset.id}
                  className={`rounded-[12px] border-2 p-[14px] ${
                    isActive
                      ? 'border-[#006334] bg-[#e8f7ee]'
                      : 'border-[rgba(111,122,112,0.2)] bg-[#f9f9f9]'
                  }`}
                >
                  <div className="mb-[10px] flex items-start justify-between gap-[10px]">
                    <div className="min-w-0">
                      <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#1a1c1c] truncate">
                        {preset.label}
                      </div>
                      <div className="mt-[4px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#6f7a70]">
                        {formatPreferenceTimeRange(preset)} · {preset.location}
                      </div>
                    </div>
                    <span
                      className="shrink-0 rounded-[8px] px-[8px] py-[5px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px]"
                      style={{ backgroundColor: category?.bgColor ?? '#d1fae5', color: category?.color ?? '#006334' }}
                    >
                      {category?.name ?? '桌遊'}
                    </span>
                  </div>

                  <div className="flex gap-[8px]">
                    <button
                      type="button"
                      onClick={() => selectAvailabilityPreference(preset.id)}
                      className={`flex-1 rounded-[8px] py-[8px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] ${
                        isActive
                          ? 'bg-[#006334] text-white'
                          : 'bg-white text-[#006334] border-2 border-[#b7e4c7]'
                      }`}
                    >
                      {isActive ? '使用中' : '使用'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEditPreference(preset)}
                      className="flex-1 rounded-[8px] border-2 border-[rgba(111,122,112,0.2)] bg-white py-[8px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] text-[#3f4940]"
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteAvailabilityPreferenceById(preset.id)}
                      disabled={availabilityPresets.length <= 1}
                      className="flex-1 rounded-[8px] border-2 border-[#fecaca] bg-[#fff1f2] py-[8px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] text-[#be123c] disabled:cursor-not-allowed disabled:border-[#e7e5e4] disabled:bg-[#f4f4f4] disabled:text-[#9ca3af]"
                    >
                      刪除
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hidden">
            <div className="flex gap-[8px] overflow-x-auto scrollbar-hidden pb-[2px]">
              {availabilityPresets.map((preset) => {
                const isActive = preset.id === activePreferenceId;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => selectAvailabilityPreference(preset.id)}
                    className={`px-[12px] py-[7px] rounded-full border-2 whitespace-nowrap font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] ${
                      isActive
                        ? 'bg-[#006334] text-white border-[#006334]'
                        : 'bg-[#f9f9f9] text-[#3f4940] border-[rgba(111,122,112,0.25)]'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>

            <label className="flex flex-col gap-[6px]">
              <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] text-[#3f4940]">標籤名稱</span>
              <input
                value={availabilityPreference.label}
                onChange={(event) => updateAvailabilityPreference({ label: event.target.value })}
                className="h-[40px] rounded-[8px] border border-[rgba(111,122,112,0.25)] px-[12px] bg-[#f9f9f9] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] outline-none focus:border-[#006334]"
              />
            </label>

            <div className="grid grid-cols-2 gap-[10px]">
              <label className="flex flex-col gap-[6px]">
                <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] text-[#3f4940]">開始時間</span>
                <input
                  type="time"
                  value={formatTimeInput(availabilityPreference.startTime)}
                  onChange={(event) => updateAvailabilityPreference({ startTime: parseTimeInput(event.target.value) })}
                  className="h-[40px] rounded-[8px] border border-[rgba(111,122,112,0.25)] px-[10px] bg-[#f9f9f9] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] outline-none focus:border-[#006334]"
                />
              </label>
              <label className="flex flex-col gap-[6px]">
                <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] text-[#3f4940]">結束時間</span>
                <input
                  type="time"
                  value={formatTimeInput(availabilityPreference.endTime)}
                  onChange={(event) => updateAvailabilityPreference({ endTime: parseTimeInput(event.target.value) })}
                  className="h-[40px] rounded-[8px] border border-[rgba(111,122,112,0.25)] px-[10px] bg-[#f9f9f9] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] outline-none focus:border-[#006334]"
                />
              </label>
            </div>

            <label className="flex flex-col gap-[6px]">
              <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] text-[#3f4940]">常用地點</span>
              <input
                value={availabilityPreference.location}
                onChange={(event) => updateAvailabilityPreference({ location: event.target.value })}
                className="h-[40px] rounded-[8px] border border-[rgba(111,122,112,0.25)] px-[12px] bg-[#f9f9f9] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] outline-none focus:border-[#006334]"
              />
            </label>

            <label className="flex flex-col gap-[6px]">
              <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] text-[#3f4940]">偏好類型</span>
              <select
                value={availabilityPreference.categoryId}
                onChange={(event) => updateAvailabilityPreference({ categoryId: event.target.value })}
                className="h-[40px] rounded-[8px] border border-[rgba(111,122,112,0.25)] px-[12px] bg-[#f9f9f9] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] outline-none focus:border-[#006334]"
              >
                {GAME_CATEGORIES.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={deleteAvailabilityPreference}
              disabled={availabilityPresets.length <= 1}
              className="h-[42px] rounded-[8px] border-2 border-[#fecaca] bg-[#fff1f2] text-[#be123c] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] disabled:cursor-not-allowed disabled:border-[#e7e5e4] disabled:bg-[#f4f4f4] disabled:text-[#9ca3af]"
            >
              刪除標籤
            </button>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] overflow-hidden shrink-0">
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

      <AvailabilityPreferenceSheet
        isOpen={isPreferenceSheetOpen}
        onClose={() => setIsPreferenceSheetOpen(false)}
        onSave={handleSavePreference}
        initialPreference={newPreferenceDraft}
        editingPreference={editingPreference}
      />
    </PageLayout>
  );
}
