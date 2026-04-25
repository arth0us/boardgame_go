import { useState } from 'react';
import { PageLayout } from './PageLayout';
import { EventDetailsSheet } from './EventDetailsSheet';
import { GAME_CATEGORIES } from '../constants/gameCategories';
import { EXPLORE_DEMO_EVENTS, ExploreCategoryId } from '../constants/exploreDemoEvents';

type ExploreFilterId = 'all' | ExploreCategoryId;

export function ExplorePage() {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<ExploreFilterId>('all');

  const handleEventClick = (eventId: string) => {
    setSelectedEventId(eventId);
  };

  const handleCloseSheet = () => {
    setSelectedEventId(null);
  };

  const filterButtons: Array<{ id: ExploreFilterId; label: string }> = [
    { id: 'all', label: '篩選：全部' },
    { id: 'strategy', label: '策略遊戲' },
    { id: 'party', label: '派對聚會' },
    { id: 'card', label: '卡牌遊戲' },
    { id: 'classic', label: '經典桌遊' },
  ];

  const filteredEvents =
    activeFilter === 'all'
      ? EXPLORE_DEMO_EVENTS
      : EXPLORE_DEMO_EVENTS.filter((event) => event.categoryId === activeFilter);

  return (
    <PageLayout>
      <div className="size-full overflow-y-auto bg-[#f9f9f9] relative">
        {/* Search Bar */}
        <div className="px-[20px] pt-[24px] pb-[16px]">
          <div className="relative w-full h-[52px] bg-[#f9f9f9] rounded-[8px] border-2 border-[#bfc9be] shadow-[inset_0px_2px_4px_2px_rgba(0,0,0,0.06)]">
            <input
              type="text"
              placeholder="搜尋附近的桌遊聚會..."
              className="w-full h-full bg-transparent pl-[42px] pr-[18px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#6b7280] outline-none"
            />
            <div className="absolute left-[12px] top-1/2 -translate-y-1/2 size-[18px]">
              <svg className="size-full" fill="none" viewBox="0 0 18 18">
                <path fill="#6F7A70" d="M12.5 11h-.79l-.28-.27C12.41 9.59 13 8.11 13 6.5 13 2.91 10.09 0 6.5 0S0 2.91 0 6.5 2.91 13 6.5 13c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L17.49 16l-4.99-5zm-6 0C4.01 11 2 8.99 2 6.5S4.01 2 6.5 2 11 4.01 11 6.5 8.99 11 6.5 11z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="px-[20px] pb-[16px] flex gap-[8px] overflow-x-auto">
          {filterButtons.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-[16px] py-[8px] rounded-full font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] whitespace-nowrap border-2 ${
                  isActive
                    ? 'bg-[#277d4a] text-[#c9ffd3] border-[#006334]'
                    : 'bg-white text-[#1a1c1c] border-[#d4d4d8]'
                } ${filter.id === 'all' ? 'flex items-center gap-[4px]' : ''}`}
              >
                {filter.id === 'all' && (
                  <svg className={`w-[13.5px] h-[9px] ${isActive ? '' : 'opacity-70'}`} fill="none" viewBox="0 0 13.5 9">
                    <path fill={isActive ? '#C9FFD3' : '#6F7A70'} d="M0 0L6.75 9L13.5 0H0Z"/>
                  </svg>
                )}
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Event Cards */}
        <div className="px-[20px] pb-[24px] flex flex-col gap-[16px]">
          {filteredEvents.map((event) => {
            const category = GAME_CATEGORIES.find((item) => item.id === event.categoryId);
            return (
              <div
                key={event.id}
                onClick={() => handleEventClick(event.id)}
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
                    <div
                      className="px-[8px] py-[4px] rounded-[4px]"
                      style={{ backgroundColor: category?.bgColor ?? '#d1fae5' }}
                    >
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
                      <path fill="#6f7a70" d="M8 0C6.34 0 5 1.34 5 3C5 4.66 6.34 6 8 6C9.66 6 11 4.66 11 3C11 1.34 9.66 0 8 0ZM8 14L2 10V8L8 11L14 8V10L8 14Z"/>
                    </svg>
                    <span>{event.location} • 距離 {event.distance}</span>
                  </div>
                  <div className="flex items-center gap-[8px] text-[#6f7a70] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px]">
                    <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                      <path fill="#6f7a70" d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm.5-9.5v3.56l3 1.79-.75 1.23-3.75-2.25V4.5h1.5z"/>
                    </svg>
                    <span>{event.time} • {event.neededPlayers}</span>
                  </div>
                </div>
              </div>
            );
          })}
          {filteredEvents.length === 0 && (
            <div className="bg-white rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] p-[20px] text-center font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#6f7a70]">
              目前沒有符合篩選條件的活動
            </div>
          )}
        </div>
      </div>

      {/* Event Details Sheet */}
      <EventDetailsSheet
        isOpen={selectedEventId !== null}
        onClose={handleCloseSheet}
        eventId={selectedEventId || ''}
      />
    </PageLayout>
  );
}
