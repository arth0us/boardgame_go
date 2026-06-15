import { motion, AnimatePresence, type PanInfo } from 'motion/react';
import { useState, type FormEvent, type MouseEvent } from 'react';
import { useEvents, type Event, type EventParticipant } from '../contexts/EventsContext';
import { formatEventDisplayTime } from '../utils/eventSchedule';

interface MyEventDetailsSheetProps {
  isOpen: boolean;
  event: Event | null;
  onClose: () => void;
  onEdit: (event: Event) => void;
}

const formatCommentTime = (date: Date) =>
  `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

const isEventEnded = (event: Event) => {
  const end = new Date(event.date);
  end.setHours(
    event.startTime.hour + event.duration.hour,
    event.startTime.minute + event.duration.minute,
    0,
    0,
  );
  return end < new Date();
};

const fallbackAttendees = (event: Event): EventParticipant[] => {
  if (event.attendees?.length) return event.attendees;
  if (event.status === 'hosting') return [{ id: 'me', name: '我', role: 'host' }];
  return [
    { id: 'host', name: '主揪', role: 'host' },
    { id: 'me', name: '我', role: 'participant' },
  ];
};

export function MyEventDetailsSheet({ isOpen, event, onClose, onEdit }: MyEventDetailsSheetProps) {
  const [commentBody, setCommentBody] = useState('');
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const { comments, addComment, deleteComment, toggleCommentAnnouncement, updateEvent, deleteEvent } = useEvents();

  if (!event) return null;

  const attendees = fallbackAttendees(event);
  const eventComments = comments
    .filter((comment) => comment.eventId === String(event.id))
    .slice()
    .sort((a, b) => Number(b.isAnnouncement) - Number(a.isAnnouncement) || a.createdAt.getTime() - b.createdAt.getTime());
  const canManage = event.status === 'hosting';
  const ended = isEventEnded(event);

  const handleDragEnd = (dragEvent: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 150) {
      onClose();
    }
  };

  const handleRemoveAttendee = (attendeeId: string) => {
    const nextAttendees = attendees.filter((attendee) => attendee.id !== attendeeId);
    updateEvent(event.id, {
      attendees: nextAttendees,
      participants: `${nextAttendees.length}/${event.maxParticipants} 人`,
    });
  };

  const handleCommentSubmit = (submitEvent: FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();
    const body = commentBody.trim();
    if (!body || ended) return;

    addComment({
      eventId: String(event.id),
      authorId: 'me',
      authorName: '我',
      body,
    });
    setCommentBody('');
  };

  const handleConfirmCancel = () => {
    deleteEvent(event.id);
    setShowCancelDialog(false);
    onClose();
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

            <div className="h-full overflow-y-auto pb-[130px]">
              <div className="h-[160px] bg-gradient-to-br from-[#d1fae5] to-[#9ff5b7]" />

              <div className="p-[20px]">
                <div className="bg-white rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] p-[20px] mb-[16px]">
                  <div className="flex items-start justify-between gap-[12px] mb-[12px]">
                    <div>
                      <h1 className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[24px] text-[#1a1c1c] leading-[30px]">
                        {event.title}
                      </h1>
                      {canManage && (
                        <span className="inline-block mt-[8px] bg-[#006334] text-white px-[8px] py-[3px] rounded-[4px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[11px]">
                          主揪管理
                        </span>
                      )}
                    </div>
                    <div className="px-[10px] py-[6px] rounded-[8px] shrink-0" style={{ backgroundColor: event.typeColor }}>
                      <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] text-[#006334]">
                        {event.type}
                      </span>
                    </div>
                  </div>

                  <p className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#3f4940] leading-[20px] mb-[16px]">
                    {event.description}
                  </p>
                  <div className="space-y-[8px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#6f7a70]">
                    <div>{formatEventDisplayTime(event)}</div>
                    <div>{event.locationAddress}</div>
                    <div>{attendees.length}/{event.maxParticipants} 人參加</div>
                  </div>
                </div>

                <div className="bg-white rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] p-[20px] mb-[16px]">
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
                      eventComments.map((comment) => {
                        const isOwnHostComment = canManage && comment.authorId === 'me';
                        return (
                        <div
                          key={comment.id}
                          className={`rounded-[10px] p-[12px] border ${
                            comment.isAnnouncement
                              ? 'bg-[#fff7ed] border-[#f59e0b]'
                              : 'bg-[#f3f4f6] border-transparent'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-[8px] mb-[4px]">
                            <div>
                              <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] text-[#1a1c1c]">
                                {comment.authorName}
                              </div>
                              <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[11px] text-[#6f7a70]">
                                {formatCommentTime(comment.createdAt)}
                              </div>
                            </div>
                            {comment.isAnnouncement && (
                              <span className="px-[7px] py-[4px] rounded-[7px] bg-[#f59e0b] text-white font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[11px] shrink-0">
                                公告
                              </span>
                            )}
                            {isOwnHostComment && (
                              <button
                                type="button"
                                onClick={() => toggleCommentAnnouncement(comment.id)}
                                className="px-[8px] py-[5px] rounded-[7px] bg-white text-[#b45309] border border-[#fed7aa] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[11px] shrink-0"
                              >
                                {comment.isAnnouncement ? '取消公告' : '設為公告'}
                              </button>
                            )}
                            {canManage && (
                              <button
                                type="button"
                                onClick={() => deleteComment(comment.id)}
                                className="px-[8px] py-[5px] rounded-[7px] bg-white text-[#b91c1c] border border-[#fecaca] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[11px]"
                              >
                                刪除
                              </button>
                            )}
                          </div>
                          <p className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] text-[#3f4940] leading-[18px]">
                            {comment.body}
                          </p>
                        </div>
                        );
                      })
                    ) : (
                      <div className="rounded-[10px] bg-[#f3f4f6] p-[12px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] text-[#6f7a70]">
                        還沒有留言。可以在這裡同步集合、遲到或臨時資訊。
                      </div>
                    )}
                  </div>

                  {ended ? (
                    <div className="rounded-[10px] bg-[#f3f3f3] border border-[#d4d4d8] p-[12px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] text-[#6f7a70]">
                      活動已結束，留言功能已關閉。
                    </div>
                  ) : (
                    <form onSubmit={handleCommentSubmit} className="flex flex-col gap-[8px]">
                      <textarea
                        value={commentBody}
                        onChange={(inputEvent) => setCommentBody(inputEvent.target.value)}
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
                  )}
                </div>

                <div className="bg-white rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] p-[20px] mb-[16px]">
                  <div className="flex items-center justify-between mb-[12px]">
                    <h2 className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[18px] text-[#1a1c1c]">
                      參加人員
                    </h2>
                    <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#6f7a70]">
                      {attendees.length}/{event.maxParticipants}
                    </span>
                  </div>

                  <div className="flex flex-col gap-[10px]">
                    {attendees.map((attendee) => (
                      <div key={attendee.id} className="flex items-center justify-between gap-[10px] rounded-[10px] bg-[#f3f4f6] p-[12px]">
                        <div className="flex items-center gap-[10px] min-w-0">
                          <div className="size-[34px] rounded-full bg-gradient-to-br from-[#277d4a] to-[#065f46] shrink-0" />
                          <div className="min-w-0">
                            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#1a1c1c] truncate">
                              {attendee.name}
                            </div>
                            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[11px] text-[#6f7a70]">
                              {attendee.role === 'host' ? '主揪' : '參加者'}
                            </div>
                          </div>
                        </div>
                        {canManage && attendee.role !== 'host' && (
                          <button
                            type="button"
                            onClick={() => handleRemoveAttendee(attendee.id)}
                            className="px-[10px] py-[6px] rounded-[8px] bg-[#fee2e2] text-[#b91c1c] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px]"
                          >
                            移除
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowCancelDialog(true)}
                  className="w-full py-[13px] rounded-[12px] bg-[#fff7ed] text-[#b45309] border-2 border-[#fed7aa] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] mb-[24px]"
                >
                  {canManage ? '取消活動' : '取消參加'}
                </button>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 px-[20px] pb-[24px] bg-gradient-to-t from-[#f9f9f9] via-[#f9f9f9] to-transparent pt-[32px] pointer-events-none">
              <button
                onClick={() => onEdit(event)}
                className="w-full py-[16px] rounded-[12px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[20px] shadow-[0px_4px_0px_0px_rgba(0,0,0,0.2)] flex items-center justify-center gap-[8px] pointer-events-auto bg-[#006334] text-white"
              >
                {canManage ? '編輯活動' : '查看已加入'}
              </button>
            </div>

            {showCancelDialog && (
              <div className="absolute inset-0 z-[90] flex items-center justify-center bg-black/50 px-[28px]">
                <div
                  role="alertdialog"
                  aria-modal="true"
                  aria-labelledby="detail-cancel-title"
                  className="w-full rounded-[16px] bg-white border-2 border-[rgba(111,122,112,0.2)] p-[20px] shadow-[0px_12px_40px_rgba(0,0,0,0.24)] font-['WenQuanYi_Zen_Hei:Medium',sans-serif]"
                >
                  <h2 id="detail-cancel-title" className="text-[18px] text-[#1a1c1c] mb-[8px]">
                    {canManage ? '確認取消活動？' : '確認取消參加？'}
                  </h2>
                  <p className="text-[14px] text-[#6f7a70] leading-[20px] mb-[18px]">
                    {canManage
                      ? `取消「${event.title}」後，活動將從我的活動中移除。`
                      : `確定要取消參加「${event.title}」嗎？`}
                  </p>
                  <div className="flex gap-[10px]">
                    <button
                      type="button"
                      onClick={() => setShowCancelDialog(false)}
                      className="flex-1 rounded-[10px] border-2 border-[rgba(111,122,112,0.2)] bg-white py-[10px] text-[14px] text-[#3f4940]"
                    >
                      保留
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmCancel}
                      className="flex-1 rounded-[10px] bg-[#b91c1c] py-[10px] text-[14px] text-white"
                    >
                      確認取消
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
