import { useState } from 'react';
import { PageLayout } from './PageLayout';
import { EventDetailsSheet } from './EventDetailsSheet';

export function ExplorePage() {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleEventClick = (eventId: string) => {
    setSelectedEventId(eventId);
  };

  const handleCloseSheet = () => {
    setSelectedEventId(null);
  };

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
          <button className="bg-[#277d4a] text-[#c9ffd3] px-[16px] py-[8px] rounded-full font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] whitespace-nowrap border-b-2 border-[#006334] flex items-center gap-[4px]">
            <svg className="w-[13.5px] h-[9px]" fill="none" viewBox="0 0 13.5 9">
              <path fill="#C9FFD3" d="M0 0L6.75 9L13.5 0H0Z"/>
            </svg>
            篩選
          </button>
          <button className="bg-white text-[#1a1c1c] px-[17px] py-[9px] rounded-full font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] whitespace-nowrap border-2 border-[#d4d4d8]">
            策略遊戲
          </button>
          <button className="bg-white text-[#1a1c1c] px-[17px] py-[9px] rounded-full font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] whitespace-nowrap border-2 border-[#d4d4d8]">
            派對聚會
          </button>
        </div>

        {/* Event Cards */}
        <div className="px-[20px] pb-[24px] flex flex-col gap-[16px]">
          {[1, 2, 3].map((id) => (
            <div
              key={id}
              onClick={() => handleEventClick(id.toString())}
              className="bg-white rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
            >
              <div className="h-[120px] bg-gradient-to-br from-[#d1fae5] to-[#9ff5b7]" />
              <div className="p-[16px]">
                <div className="flex items-start justify-between mb-[8px]">
                  <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[18px] text-[#1a1c1c]">
                    週末策略桌遊局
                  </div>
                  <div className="bg-[#d1fae5] px-[8px] py-[4px] rounded-[4px]">
                    <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#006334]">
                      Strategy
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-[8px] text-[#6f7a70] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] mb-[4px]">
                  <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                    <path fill="#6f7a70" d="M8 0C6.34 0 5 1.34 5 3C5 4.66 6.34 6 8 6C9.66 6 11 4.66 11 3C11 1.34 9.66 0 8 0ZM8 14L2 10V8L8 11L14 8V10L8 14Z"/>
                  </svg>
                  <span>台北市大安區 • 距離 0.5km</span>
                </div>
                <div className="flex items-center gap-[8px] text-[#6f7a70] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px]">
                  <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                    <path fill="#6f7a70" d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm.5-9.5v3.56l3 1.79-.75 1.23-3.75-2.25V4.5h1.5z"/>
                  </svg>
                  <span>今天 19:00 • 還需 2 人</span>
                </div>
              </div>
            </div>
          ))}
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
