import { useState } from 'react';
import { PageLayout } from './PageLayout';
import { CreateEventSheet } from './CreateEventSheet';
import { useEvents } from '../contexts/EventsContext';

export function MyEventsPage() {
  const { events, deleteEvent } = useEvents();
  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [editingEvent, setEditingEvent] = useState<{
    id: number;
    categoryId: string;
    date: Date;
    startTime: { hour: number; minute: number };
    duration: { hour: number; minute: number };
    location: string;
  } | null>(null);

  const myEvents = events;

  return (
    <PageLayout>
      <div className="size-full bg-[#f9f9f9] relative">
        <div className="size-full overflow-y-auto">
          {/* Header */}
          <div className="px-[20px] pt-[24px] pb-[16px]">
            <h1 className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[24px] text-[#1a1c1c] mb-[8px]">
              我的活動
            </h1>
            <p className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#6f7a70]">
              已加入和發起的桌遊活動
            </p>
          </div>

          {/* Event List */}
          <div className="px-[20px] pb-[120px] flex flex-col gap-[16px]">
            {myEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden"
              >
                <div className="p-[16px]">
                  <div className="flex items-start justify-between mb-[12px]">
                    <div className="flex-1">
                      <div className="flex items-center gap-[8px] mb-[4px]">
                        <h3 className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[18px] text-[#1a1c1c]">
                          {event.title}
                        </h3>
                        {event.status === 'hosting' && (
                          <span className="bg-[#006334] text-white px-[8px] py-[2px] rounded-[4px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[10px]">
                            主揪
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="px-[8px] py-[4px] rounded-[4px]" style={{ backgroundColor: event.typeColor }}>
                      <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#006334]">
                        {event.type}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-[8px]">
                    <div className="flex items-center gap-[8px] text-[#6f7a70] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px]">
                      <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                        <path fill="#6f7a70" d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm.5-9.5v3.56l3 1.79-.75 1.23-3.75-2.25V4.5h1.5z"/>
                      </svg>
                      <span>{event.time}</span>
                    </div>

                    <div className="flex items-center gap-[8px] text-[#6f7a70] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px]">
                      <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                        <path fill="#6f7a70" d="M8 0C6.34 0 5 1.34 5 3C5 4.66 6.34 6 8 6C9.66 6 11 4.66 11 3C11 1.34 9.66 0 8 0ZM8 14L2 10V8L8 11L14 8V10L8 14Z"/>
                      </svg>
                      <span>{event.location} • {event.participants}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-[8px] mt-[12px]">
                    {event.status === 'hosting' ? (
                      <button
                        onClick={() => {
                          const locations = [
                            { id: 1, name: '卡牌屋 桌遊咖啡', address: '台北市大安區羅斯福路三段 283 巷' },
                            { id: 2, name: '桌遊愛樂園', address: '台北市大安區師大路 39 巷' },
                            { id: 3, name: 'Game Master', address: '台北市中正區汀州路三段' },
                          ];
                          const locationObj = locations.find(l => l.address === event.locationAddress);
                          setEditingEvent({
                            id: event.id,
                            categoryId: event.categoryId,
                            date: event.date,
                            startTime: event.startTime,
                            duration: event.duration,
                            location: locationObj?.name || event.locationAddress,
                          });
                          setShowCreateSheet(true);
                        }}
                        className="flex-1 py-[8px] bg-[#006334] text-white rounded-[8px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px]"
                      >
                        編輯活動
                      </button>
                    ) : (
                      <button
                        onClick={() => deleteEvent(event.id)}
                        className="flex-1 py-[8px] bg-[#f3f3f3] text-[#6f7a70] rounded-[8px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] border-2 border-[rgba(111,122,112,0.2)]"
                      >
                        取消參加
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Empty State */}
            {myEvents.length === 0 && (
              <div className="flex flex-col items-center justify-center py-[60px]">
                <div className="size-[80px] rounded-full bg-[#f3f3f3] flex items-center justify-center mb-[16px]">
                  <svg className="size-[40px]" fill="none" viewBox="0 0 40 40">
                    <path fill="#6f7a70" d="M20 0C17.58 0 15 1.34 15 3C15 4.66 17.58 6 20 6C22.42 6 25 4.66 25 3C25 1.34 22.42 0 20 0ZM20 10C16.67 0 10 11.67 10 15v3h20v-3c0-3.33-6.67-15-10-15z"/>
                  </svg>
                </div>
                <p className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#6f7a70] text-center">
                  尚未加入或發起任何活動
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Floating Create Button */}
        <div className="absolute bottom-[16px] left-[20px] right-[20px] z-20 pointer-events-none">
          <button
            onClick={() => setShowCreateSheet(true)}
            className="w-full bg-[#006334] text-white py-[16px] rounded-[12px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[20px] shadow-[0px_4px_0px_0px_rgba(0,0,0,0.2)] flex items-center justify-center gap-[8px] pointer-events-auto"
          >
            <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 20 20">
              <path fill="white" d="M10 0C9.44772 0 9 0.447715 9 1V9H1C0.447715 9 0 9.44772 0 10C0 10.5523 0.447715 11 1 11H9V19C9 19.5523 9.44772 20 10 20C10.5523 20 11 19.5523 11 19V11H19C19.5523 11 20 10.5523 20 10C20 9.44772 19.5523 9 19 9H11V1C11 0.447715 10.5523 0 10 0Z"/>
            </svg>
            發起新活動
          </button>
        </div>
      </div>

      {/* Create Event Sheet */}
      <CreateEventSheet
        isOpen={showCreateSheet}
        onClose={() => {
          setShowCreateSheet(false);
          setEditingEvent(null);
        }}
        onEventCreated={() => setEditingEvent(null)}
        editingEvent={editingEvent}
      />
    </PageLayout>
  );
}
