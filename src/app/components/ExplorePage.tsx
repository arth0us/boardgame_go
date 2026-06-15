import { useState } from 'react';
import { PageLayout } from './PageLayout';
import { EventDetailsSheet } from './EventDetailsSheet';
import { CreateEventSheet, buildPrefillFromPreference } from './CreateEventSheet';
import { GAME_CATEGORIES } from '../constants/gameCategories';
import { EXPLORE_DEMO_EVENTS, type ExploreCategoryId } from '../constants/exploreDemoEvents';
import { useUserPreferences } from '../contexts/UserPreferencesContext';

type ExploreFilterId = 'all' | ExploreCategoryId;

const filterButtons: Array<{ id: ExploreFilterId; label: string }> = [
  { id: 'all', label: '全部' },
  { id: 'strategy', label: '策略遊戲' },
  { id: 'party', label: '派對聚會' },
  { id: 'card', label: '卡牌遊戲' },
  { id: 'classic', label: '經典桌遊' },
];

const formatTimeRange = (preference: {
  startTime: { hour: number; minute: number };
  endTime: { hour: number; minute: number };
}) =>
  `${preference.startTime.hour.toString().padStart(2, '0')}:${preference.startTime.minute
    .toString()
    .padStart(2, '0')}-${preference.endTime.hour.toString().padStart(2, '0')}:${preference.endTime.minute
    .toString()
    .padStart(2, '0')}`;

export function ExplorePage() {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<ExploreFilterId>('all');
  const [showQuickCreate, setShowQuickCreate] = useState(false);
  const [showManualCreate, setShowManualCreate] = useState(false);
  const {
    availabilityPresets,
    availabilityPreference,
    activePreferenceId,
    selectAvailabilityPreference,
  } = useUserPreferences();

  const preferredCategory = GAME_CATEGORIES.find((category) => category.id === availabilityPreference.categoryId);
  const quickPrefill = buildPrefillFromPreference(availabilityPreference);
  const isQuickFilterActive = activeFilter === availabilityPreference.categoryId;
  const filteredEvents =
    activeFilter === 'all'
      ? EXPLORE_DEMO_EVENTS
      : EXPLORE_DEMO_EVENTS.filter((event) => event.categoryId === activeFilter);

  return (
    <PageLayout>
      <div className="size-full bg-[#f9f9f9] relative overflow-hidden">
        <div className="size-full overflow-y-auto">
          <div className="px-[20px] pt-[24px] pb-[16px]">
            <div className="relative w-full h-[52px] bg-[#f9f9f9] rounded-[8px] border-2 border-[#bfc9be] shadow-[inset_0px_2px_4px_2px_rgba(0,0,0,0.06)]">
              <input
                type="text"
                placeholder="搜尋附近的桌遊聚會..."
                className="w-full h-full bg-transparent pl-[42px] pr-[18px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#6b7280] outline-none"
              />
              <div className="absolute left-[12px] top-1/2 -translate-y-1/2 size-[18px]">
                <svg className="size-full" fill="none" viewBox="0 0 18 18">
                  <path
                    fill="#6F7A70"
                    d="M12.5 11h-.79l-.28-.27C12.41 9.59 13 8.11 13 6.5 13 2.91 10.09 0 6.5 0S0 2.91 0 6.5 2.91 13 6.5 13c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L17.49 16l-4.99-5zm-6 0C4.01 11 2 8.99 2 6.5S4.01 2 6.5 2 11 4.01 11 6.5 8.99 11 6.5 11z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="px-[20px] pb-[16px] flex gap-[8px] overflow-x-auto">
            {filterButtons.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`h-[40px] px-[14px] py-0 rounded-full font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] whitespace-nowrap border-2 ${
                    isActive
                      ? 'bg-[#277d4a] text-[#c9ffd3] border-[#006334]'
                      : 'bg-white text-[#1a1c1c] border-[#d4d4d8]'
                  } ${filter.id === 'all' ? 'flex items-center gap-[4px]' : ''}`}
                >
                  {filter.id === 'all' && (
                    <svg className={`w-[13.5px] h-[9px] ${isActive ? '' : 'opacity-70'}`} fill="none" viewBox="0 0 13.5 9">
                      <path fill={isActive ? '#C9FFD3' : '#6F7A70'} d="M0 0L6.75 9L13.5 0H0Z" />
                    </svg>
                  )}
                  {filter.label}
                </button>
              );
            })}
          </div>

          <div className="px-[20px] pb-[148px] flex flex-col gap-[16px]">
            {isQuickFilterActive && (
              <div className="bg-[#e8f7ee] border-2 border-[#006334] rounded-[12px] p-[12px] flex items-center justify-between gap-[12px]">
                <div>
                  <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#065f46]">
                    已套用：{availabilityPreference.label}
                  </div>
                  <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#3f4940]">
                    {preferredCategory?.name ?? '桌遊'} · {availabilityPreference.location}
                  </div>
                </div>
                <button
                  onClick={() => setActiveFilter('all')}
                  className="px-[10px] py-[6px] rounded-[8px] bg-white text-[#006334] border border-[#006334] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px]"
                >
                  取消
                </button>
              </div>
            )}

            {filteredEvents.map((event) => {
              const category = GAME_CATEGORIES.find((item) => item.id === event.categoryId);
              return (
                <div
                  key={event.id}
                  onClick={() => setSelectedEventId(event.id)}
                  className="bg-white rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
                >
                  <div
                    className="h-[120px]"
                    style={{ backgroundImage: `linear-gradient(to bottom right, ${event.imageFrom}, ${event.imageTo})` }}
                  />
                  <div className="p-[16px]">
                    <div className="flex items-start justify-between mb-[8px]">
                      <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[18px] text-[#1a1c1c]">
                        {event.title}
                      </div>
                      <div className="px-[8px] py-[4px] rounded-[4px]" style={{ backgroundColor: category?.bgColor ?? '#d1fae5' }}>
                        <span
                          className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px]"
                          style={{ color: category?.color ?? '#006334' }}
                        >
                          {category?.name ?? 'Strategy'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-[8px] text-[#6f7a70] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] mb-[4px]">
                      <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                        <path fill="#6f7a70" d="M8 0C6.34 0 5 1.34 5 3C5 4.66 6.34 6 8 6C9.66 6 11 4.66 11 3C11 1.34 9.66 0 8 0ZM8 14L2 10V8L8 11L14 8V10L8 14Z" />
                      </svg>
                      <span>{event.location} · 距離 {event.distance}</span>
                    </div>
                    <div className="flex items-center gap-[8px] text-[#6f7a70] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px]">
                      <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                        <path fill="#6f7a70" d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm.5-9.5v3.56l3 1.79-.75 1.23-3.75-2.25V4.5h1.5z" />
                      </svg>
                      <span>{event.timeRange} · {event.neededPlayers}</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredEvents.length === 0 && (
              <div className="bg-white rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] p-[20px] text-center font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#6f7a70]">
                目前沒有符合條件的活動。
              </div>
            )}
          </div>
        </div>

        <div
          data-testid="quick-preference-panel"
          className="absolute left-[20px] right-[20px] bottom-[16px] z-20 h-[124px] overflow-hidden bg-white border-2 border-[#006334] rounded-[12px] p-[8px] shadow-[0px_8px_24px_rgba(0,0,0,0.18)] flex flex-col gap-[6px]"
        >
          <div className="flex h-[30px] items-center gap-[8px]">
            <div className="min-w-0 flex-1 flex gap-[6px] overflow-x-auto">
              {availabilityPresets.map((preset) => {
                const isActivePreset = preset.id === activePreferenceId;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => selectAvailabilityPreference(preset.id)}
                    className={`h-[30px] px-[10px] py-0 rounded-full border whitespace-nowrap font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] ${
                      isActivePreset
                        ? 'bg-[#006334] text-white border-[#006334]'
                        : 'bg-[#f3f4f6] text-[#3f4940] border-[#d4d4d8]'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => setShowManualCreate(true)}
              className="shrink-0 h-[30px] px-[10px] py-0 rounded-full bg-white text-[#006334] border-2 border-[#b7e4c7] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px]"
            >
              手動設定
            </button>
          </div>

          <div className="hidden">
            <div className="min-w-0 flex-1">
              <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#6f7a70]">
                用我的空檔快速開始
              </div>
              <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[15px] text-[#1a1c1c] truncate">
                {availabilityPreference.label}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowManualCreate(true)}
              className="hidden"
            >
              手動設定
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter(availabilityPreference.categoryId as ExploreFilterId)}
              className={`h-[34px] px-[12px] py-0 rounded-full font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] shrink-0 ${
                isQuickFilterActive ? 'bg-[#006334] text-white' : 'bg-[#d1fae5] text-[#065f46]'
              }`}
            >
              找看看
            </button>
          </div>

          <div className="flex h-[28px] items-center gap-[6px] overflow-hidden">
            <span className="px-[8px] py-[5px] rounded-full bg-[#f3f4f6] text-[#3f4940] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[11px] whitespace-nowrap">
              {formatTimeRange(availabilityPreference)}
            </span>
            <span className="min-w-0 truncate px-[8px] py-[5px] rounded-full bg-[#f3f4f6] text-[#3f4940] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[11px] whitespace-nowrap">
              {availabilityPreference.location}
            </span>
            <button
              type="button"
              onClick={() => setActiveFilter(availabilityPreference.categoryId as ExploreFilterId)}
              className={`hidden ${
                isQuickFilterActive ? 'bg-[#006334] text-white' : 'bg-[#d1fae5] text-[#065f46]'
              }`}
            >
              找看看
            </button>
            <span className="px-[8px] py-[5px] rounded-full bg-[#f3f4f6] text-[#3f4940] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[11px] whitespace-nowrap">
              {preferredCategory?.name ?? '桌遊'}
            </span>
          </div>

          <button
            onClick={() => setShowQuickCreate(true)}
            aria-label="建立活動"
            className="hidden"
          >
            <span className="text-[14px]">建立活動</span>
          </button>

          <div className="grid grid-cols-2 gap-[8px]">
            <button
              type="button"
              onClick={() => setShowQuickCreate(true)}
              className="h-[36px] rounded-[8px] bg-[#006334] text-white font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] shadow-[0px_3px_0px_0px_rgba(0,0,0,0.18)]"
            >
              建立活動
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter(availabilityPreference.categoryId as ExploreFilterId)}
              className={`h-[36px] rounded-[8px] border-2 font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] ${
                isQuickFilterActive
                  ? 'border-[#006334] bg-[#006334] text-white'
                  : 'border-[#b7e4c7] bg-[#d1fae5] text-[#065f46]'
              }`}
            >
              找看看
            </button>
          </div>
        </div>
      </div>

      <EventDetailsSheet
        isOpen={selectedEventId !== null}
        onClose={() => setSelectedEventId(null)}
        eventId={selectedEventId || ''}
      />

      <CreateEventSheet
        isOpen={showQuickCreate}
        onClose={() => setShowQuickCreate(false)}
        prefill={quickPrefill}
        initialStep={3}
      />

      <CreateEventSheet
        isOpen={showManualCreate}
        onClose={() => setShowManualCreate(false)}
        initialStep={0}
      />
    </PageLayout>
  );
}
