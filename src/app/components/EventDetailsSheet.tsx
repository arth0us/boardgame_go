import { motion, AnimatePresence, type PanInfo } from 'motion/react';
import { useState, type FormEvent, type MouseEvent } from 'react';
import { GAME_CATEGORIES } from '../constants/gameCategories';
import { EXPLORE_DEMO_EVENTS } from '../constants/exploreDemoEvents';
import { useEvents } from '../contexts/EventsContext';
import { findScheduleConflict, resolveDateFromTimeText } from '../utils/eventSchedule';

interface EventDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
}

const parseTimeRange = (timeRange: string) => {
  const match = timeRange.match(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/);
  if (!match) {
    return {
      startTime: { hour: 19, minute: 0 },
      duration: { hour: 2, minute: 0 },
    };
  }

  const startHour = Number(match[1]);
  const startMinute = Number(match[2]);
  const endHour = Number(match[3]);
  const endMinute = Number(match[4]);
  const startTotal = startHour * 60 + startMinute;
  let endTotal = endHour * 60 + endMinute;
  if (endTotal <= startTotal) {
    endTotal += 24 * 60;
  }
  const durationMinutes = endTotal - startTotal;

  return {
    startTime: { hour: startHour, minute: startMinute },
    duration: {
      hour: Math.floor(durationMinutes / 60),
      minute: durationMinutes % 60,
    },
  };
};

const parseNeededPlayers = (neededPlayers: string) => {
  const match = neededPlayers.match(/(\d+)/);
  return match ? Number(match[1]) : 2;
};

const parseMaxParticipants = (participantText: string) => {
  const matches = participantText.match(/\d+/g);
  return matches?.length ? Number(matches[matches.length - 1]) : 4;
};

const formatCommentTime = (date: Date) =>
  `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

const isDemoEventEnded = (timeRange: string) => {
  const { startTime, duration } = parseTimeRange(timeRange);
  const end = new Date();
  end.setHours(startTime.hour + duration.hour, startTime.minute + duration.minute, 0, 0);
  return end < new Date();
};

export function EventDetailsSheet({ isOpen, onClose, eventId }: EventDetailsSheetProps) {
  const [commentBody, setCommentBody] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { events, comments, addEvent, addComment } = useEvents();
  const selectedEvent = EXPLORE_DEMO_EVENTS.find((event) => event.id === eventId) ?? EXPLORE_DEMO_EVENTS[0];
  const category = GAME_CATEGORIES.find((item) => item.id === selectedEvent.categoryId);
  const isJoined = events.some((event) => event.sourceEventId === selectedEvent.id);
  const eventComments = comments
    .filter((comment) => comment.eventId === selectedEvent.id)
    .slice()
    .sort((a, b) => Number(b.isAnnouncement) - Number(a.isAnnouncement) || a.createdAt.getTime() - b.createdAt.getTime());
  const isEventEnded = isDemoEventEnded(selectedEvent.timeRange);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 150) {
      onClose();
    }
  };

  const handleJoinEvent = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (isJoined) return;

    const { startTime, duration } = parseTimeRange(selectedEvent.timeRange);
    const date = resolveDateFromTimeText(selectedEvent.timeRange);
    const conflict = findScheduleConflict(events, { date, startTime, duration });

    if (conflict) {
      setSnackbarMessage(`你在 ${conflict.timeRange} 已有活動，無法加入新的活動。`);
      window.setTimeout(() => setSnackbarMessage(''), 4000);
      return;
    }

    const maxParticipants = parseMaxParticipants(selectedEvent.participantText);
    const neededPlayers = parseNeededPlayers(selectedEvent.neededPlayers);
    const joinedPlayers = Math.max(maxParticipants - neededPlayers, 0);

    addEvent({
      sourceEventId: selectedEvent.id,
      title: selectedEvent.title,
      description: selectedEvent.description,
      type: category?.name ?? 'Strategy',
      typeColor: category?.bgColor ?? '#d1fae5',
      categoryId: selectedEvent.categoryId,
      location: selectedEvent.location,
      locationAddress: selectedEvent.locationAddress,
      date,
      startTime,
      duration,
      time: selectedEvent.timeRange,
      status: 'joined',
      participants: `${joinedPlayers}/${maxParticipants} 人`,
      maxParticipants,
    });
    setSnackbarMessage('');
  };

  const handleCommentSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = commentBody.trim();
    if (!body || !isJoined || isEventEnded) return;

    addComment({
      eventId: selectedEvent.id,
      authorId: 'me',
      authorName: '我',
      body,
    });
    setCommentBody('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 z-40 bg-[#f9f9f9] rounded-t-[24px] shadow-[0_-4px_20px_rgba(0,0,0,0.15)]"
          >
            <div className="sticky top-0 z-10 bg-[#fafaf9] rounded-t-[24px] pt-[12px] pb-[8px] border-b-2 border-[rgba(6,78,59,0.1)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
              <div className="w-[40px] h-[4px] bg-[#d4d4d8] rounded-full mx-auto mb-[12px]" />
              <div className="flex items-center px-[16px]">
                <button onClick={onClose} className="size-[30px] flex items-center justify-center">
                  <svg className="size-[20px]" fill="none" viewBox="0 0 20 20">
                    <path fill="#78716C" d="M13 4L7 10L13 16L11.6 17.4L4.2 10L11.6 2.6L13 4Z" />
                  </svg>
                </button>
                <div className="flex-1 text-center font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#047857]">
                  活動詳情
                </div>
                <div className="w-[30px]" />
              </div>
            </div>

            <div className="h-full overflow-y-auto pb-[120px]">
              <div
                className="h-[240px]"
                style={{ backgroundImage: `linear-gradient(to bottom right, ${selectedEvent.imageFrom}, ${selectedEvent.imageTo})` }}
              />

              <div className="p-[20px]">
                <div className="bg-white rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-[20px] mb-[16px]">
                  <div className="flex items-start justify-between mb-[16px]">
                    <h1 className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[24px] text-[#1a1c1c] flex-1">
                      {selectedEvent.title}
                    </h1>
                    <div className="px-[12px] py-[6px] rounded-[8px]" style={{ backgroundColor: category?.bgColor ?? '#d1fae5' }}>
                      <span
                        className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px]"
                        style={{ color: category?.color ?? '#006334' }}
                      >
                        {category?.name ?? 'Strategy'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-[12px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#3f4940]">
                    <div>{selectedEvent.timeRange}</div>
                    <div>{selectedEvent.locationAddress}</div>
                    <div>{selectedEvent.participantText}</div>
                  </div>
                </div>

                <div className="bg-white rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-[20px] mb-[16px]">
                  <h2 className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[18px] text-[#1a1c1c] mb-[12px]">
                    活動內文
                  </h2>
                  <p className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#3f4940] leading-[20px]">
                    {selectedEvent.description}
                  </p>
                </div>

                <div className="bg-white rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-[20px] mb-[16px]">
                  <h2 className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[18px] text-[#1a1c1c] mb-[12px]">
                    主持人
                  </h2>
                  <div className="flex items-center gap-[12px]">
                    <div className="size-[48px] rounded-full border-2 border-[#277d4a] bg-gradient-to-br from-[#277d4a] to-[#065f46]" />
                    <div>
                      <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#1a1c1c]">
                        {selectedEvent.hostName}
                      </div>
                      <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#6f7a70]">
                        舉辦過 {selectedEvent.hostEventCount} 場活動
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-[20px] mb-[16px]">
                  <div className="flex items-center justify-between mb-[12px]">
                    <h2 className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[18px] text-[#1a1c1c]">
                      活動留言板
                    </h2>
                    <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#6f7a70]">
                      公開交流
                    </span>
                  </div>

                  <div className="flex flex-col gap-[10px] mb-[14px]">
                    {eventComments.length > 0 ? (
                      eventComments.map((comment) => (
                        <div
                          key={comment.id}
                          className={`rounded-[10px] p-[12px] border ${
                            comment.isAnnouncement
                              ? 'bg-[#fff7ed] border-[#f59e0b]'
                              : 'bg-[#f3f4f6] border-transparent'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-[4px]">
                            <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] text-[#1a1c1c]">
                              {comment.authorName}
                            </span>
                            <div className="flex items-center gap-[6px]">
                              {comment.isAnnouncement && (
                                <span className="px-[7px] py-[4px] rounded-[7px] bg-[#f59e0b] text-white font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[11px]">
                                  公告
                                </span>
                              )}
                              <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[11px] text-[#6f7a70]">
                                {formatCommentTime(comment.createdAt)}
                              </span>
                            </div>
                          </div>
                          <p className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] text-[#3f4940] leading-[18px]">
                            {comment.body}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-[10px] bg-[#f3f4f6] p-[12px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] text-[#6f7a70]">
                        還沒有留言。加入活動後可以在這裡同步集合、遲到或臨時資訊。
                      </div>
                    )}
                  </div>

                  {isEventEnded ? (
                    <div className="rounded-[10px] bg-[#f3f3f3] border border-[#d4d4d8] p-[12px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] text-[#6f7a70]">
                      活動已結束，留言板已關閉。
                    </div>
                  ) : isJoined ? (
                    <form onSubmit={handleCommentSubmit} className="flex flex-col gap-[8px]">
                      <textarea
                        value={commentBody}
                        onChange={(event) => setCommentBody(event.target.value)}
                        placeholder="留下集合、遲到或臨時資訊..."
                        className="min-h-[84px] rounded-[10px] border-2 border-[rgba(111,122,112,0.2)] bg-[#f9f9f9] p-[12px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] leading-[18px] outline-none resize-none focus:border-[#006334]"
                      />
                      <button
                        type="submit"
                        disabled={commentBody.trim() === ''}
                        className={`py-[10px] rounded-[10px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] ${
                          commentBody.trim() === ''
                            ? 'bg-[#e8e8e8] text-[#6f7a70]'
                            : 'bg-[#006334] text-white shadow-[0px_3px_0px_0px_rgba(0,0,0,0.18)]'
                        }`}
                      >
                        送出留言
                      </button>
                    </form>
                  ) : (
                    <div className="rounded-[10px] bg-[#e8f7ee] border border-[#bfc9be] p-[12px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] text-[#065f46]">
                      加入活動後才能留言；交流會留在公共空間，避免一對一騷擾。
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 px-[20px] pb-[24px] bg-gradient-to-t from-[#f9f9f9] via-[#f9f9f9] to-transparent pt-[32px] pointer-events-none">
              <AnimatePresence>
                {snackbarMessage && (
                  <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.12 }}
                    style={{ backgroundColor: '#1f2937' }}
                    className="mb-[12px] rounded-[10px] px-[14px] py-[12px] shadow-[0px_8px_24px_rgba(0,0,0,0.24)] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] leading-[18px] text-white"
                    role="alert"
                  >
                    <div className="text-[14px] mb-[2px]">活動時間重疊</div>
                    <div className="text-white/90">{snackbarMessage}</div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={handleJoinEvent}
                disabled={isJoined}
                className={`w-full py-[16px] rounded-[12px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[20px] shadow-[0px_4px_0px_0px_rgba(0,0,0,0.2)] flex items-center justify-center gap-[8px] pointer-events-auto ${
                  isJoined ? 'bg-[#e8e8e8] text-[#6f7a70]' : 'bg-[#006334] text-white'
                }`}
              >
                {isJoined ? '已加入活動' : '加入活動'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
