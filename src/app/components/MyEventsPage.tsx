import { useState } from 'react';
import { PageLayout } from './PageLayout';
import { CreateEventSheet } from './CreateEventSheet';
import { MyEventDetailsSheet } from './MyEventDetailsSheet';
import { useEvents, type Event } from '../contexts/EventsContext';
import { formatEventDisplayTime, groupEventsByDay } from '../utils/eventSchedule';

export function MyEventsPage() {
  const { events, deleteEvent } = useEvents();
  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [pendingCancelEvent, setPendingCancelEvent] = useState<Event | null>(null);
  const [editingEvent, setEditingEvent] = useState<{
    id: number;
    categoryId: string;
    date: Date;
    startTime: { hour: number; minute: number };
    duration: { hour: number; minute: number };
    location: string;
    title?: string;
    description?: string;
  } | null>(null);

  const selectedEvent = events.find((event) => event.id === selectedEventId) ?? null;
  const eventGroups = groupEventsByDay(events);

  const beginEditEvent = (event: Event) => {
    setSelectedEventId(null);
    setEditingEvent({
      id: event.id,
      categoryId: event.categoryId,
      date: event.date,
      startTime: event.startTime,
      duration: event.duration,
      location: event.location,
      title: event.title,
      description: event.description,
    });
    setShowCreateSheet(true);
  };

  return (
    <PageLayout>
      <div className="size-full bg-[#f9f9f9] relative">
        <div className="size-full overflow-y-auto">
          <div className="px-[20px] pt-[24px] pb-[16px]">
            <h1 className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[24px] text-[#1a1c1c] mb-[8px]">
              我的活動
            </h1>
            <p className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#6f7a70]">
              已加入和發起的桌遊活動
            </p>
          </div>

          <div className="px-[20px] pb-[24px] flex flex-col gap-[16px]">
            {eventGroups.map((group) => (
              <div key={group.key} className="flex flex-col gap-[12px]">
                <div className="flex items-center gap-[10px]">
                  <div className="h-px flex-1 bg-[#d8ded8]" />
                  <span className="rounded-full bg-[#e8f7ee] px-[12px] py-[4px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] text-[#065f46]">
                    {group.label}
                  </span>
                  <div className="h-px flex-1 bg-[#d8ded8]" />
                </div>

                {group.events.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => setSelectedEventId(event.id)}
                    className="bg-white rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
                  >
                    <div className="p-[16px]">
                      <div className="flex items-start justify-between mb-[12px]">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-[8px] mb-[4px]">
                            <h3 className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[18px] text-[#1a1c1c] leading-[24px]">
                              {event.title}
                            </h3>
                            {event.status === 'hosting' && (
                              <span className="bg-[#006334] text-white px-[8px] py-[2px] rounded-[4px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[10px] shrink-0">
                                主揪
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="px-[8px] py-[4px] rounded-[4px] shrink-0" style={{ backgroundColor: event.typeColor }}>
                          <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#006334]">
                            {event.type}
                          </span>
                        </div>
                      </div>

                      {event.description && (
                        <p className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] text-[#6f7a70] leading-[18px] mb-[12px] line-clamp-2">
                          {event.description}
                        </p>
                      )}

                      <div className="space-y-[8px]">
                        <div className="flex items-center gap-[8px] text-[#6f7a70] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px]">
                          <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                            <path fill="#6f7a70" d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm.5-9.5v3.56l3 1.79-.75 1.23-3.75-2.25V4.5h1.5z" />
                          </svg>
                          <span>{formatEventDisplayTime(event)}</span>
                        </div>

                        <div className="flex items-center gap-[8px] text-[#6f7a70] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px]">
                          <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                            <path fill="#6f7a70" d="M8 0C6.34 0 5 1.34 5 3C5 4.66 6.34 6 8 6C9.66 6 11 4.66 11 3C11 1.34 9.66 0 8 0ZM8 14L2 10V8L8 11L14 8V10L8 14Z" />
                          </svg>
                          <span>{event.location} · {event.participants}</span>
                        </div>
                      </div>

                      <div className="flex gap-[8px] mt-[12px]">
                        {event.status === 'hosting' ? (
                          <>
                            <button
                              onClick={(clickEvent) => {
                                clickEvent.stopPropagation();
                                beginEditEvent(event);
                              }}
                              className="flex-1 h-[40px] bg-[#006334] text-white rounded-[8px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px]"
                            >
                              編輯活動
                            </button>
                            <button
                              onClick={(clickEvent) => {
                                clickEvent.stopPropagation();
                                setPendingCancelEvent(event);
                              }}
                              className="flex-1 h-[40px] bg-[#fff7ed] text-[#b45309] rounded-[8px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] border-2 border-[#fed7aa]"
                            >
                              取消活動
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={(clickEvent) => {
                              clickEvent.stopPropagation();
                              setPendingCancelEvent(event);
                            }}
                            className="flex-1 h-[40px] bg-[#f3f3f3] text-[#6f7a70] rounded-[8px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] border-2 border-[rgba(111,122,112,0.2)]"
                          >
                            取消參加
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {events.length === 0 && (
              <div className="flex flex-col items-center justify-center py-[60px]">
                <div className="size-[80px] rounded-full bg-[#f3f3f3] flex items-center justify-center mb-[16px]">
                  <svg className="size-[40px]" fill="none" viewBox="0 0 40 40">
                    <path fill="#6f7a70" d="M20 0C17.58 0 15 1.34 15 3C15 4.66 17.58 6 20 6C22.42 6 25 4.66 25 3C25 1.34 22.42 0 20 0ZM20 10C16.67 0 10 11.67 10 15v3h20v-3c0-3.33-6.67-15-10-15z" />
                  </svg>
                </div>
                <p className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#6f7a70] text-center">
                  還沒有活動，先發起一場桌遊局吧。
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

      <MyEventDetailsSheet
        isOpen={selectedEvent !== null}
        event={selectedEvent}
        onClose={() => setSelectedEventId(null)}
        onEdit={beginEditEvent}
      />

      <CreateEventSheet
        isOpen={showCreateSheet}
        onClose={() => {
          setShowCreateSheet(false);
          setEditingEvent(null);
        }}
        onEventCreated={() => setEditingEvent(null)}
        editingEvent={editingEvent}
      />

      {pendingCancelEvent && (
        <div className="absolute inset-0 z-[90] flex items-center justify-center bg-black/50 px-[28px]">
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="cancel-event-title"
            className="w-full rounded-[16px] bg-white border-2 border-[rgba(111,122,112,0.2)] p-[20px] shadow-[0px_12px_40px_rgba(0,0,0,0.24)] font-['WenQuanYi_Zen_Hei:Medium',sans-serif]"
          >
            <h2 id="cancel-event-title" className="text-[18px] text-[#1a1c1c] mb-[8px]">
              {pendingCancelEvent.status === 'hosting' ? '確認取消活動？' : '確認取消參加？'}
            </h2>
            <p className="text-[14px] text-[#6f7a70] leading-[20px] mb-[18px]">
              {pendingCancelEvent.status === 'hosting'
                ? `取消「${pendingCancelEvent.title}」後，活動將從我的活動中移除。`
                : `確定要取消參加「${pendingCancelEvent.title}」嗎？`}
            </p>
            <div className="flex gap-[10px]">
              <button
                type="button"
                onClick={() => setPendingCancelEvent(null)}
                className="flex-1 rounded-[10px] border-2 border-[rgba(111,122,112,0.2)] bg-white py-[10px] text-[14px] text-[#3f4940]"
              >
                保留
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteEvent(pendingCancelEvent.id);
                  setPendingCancelEvent(null);
                }}
                className="flex-1 rounded-[10px] bg-[#b91c1c] py-[10px] text-[14px] text-white"
              >
                確認取消
              </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
