import { motion, AnimatePresence, type PanInfo } from 'motion/react';
import { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { TimePicker } from './TimePicker';
import { LocationMap } from './LocationMap';
import { useEvents } from '../contexts/EventsContext';
import { GAME_CATEGORIES } from '../constants/gameCategories';
import { findScheduleConflict } from '../utils/eventSchedule';
import 'react-day-picker/dist/style.css';

type EventDraft = {
  categoryId: string;
  date: Date;
  startTime: { hour: number; minute: number };
  duration: { hour: number; minute: number };
  location: string;
  title?: string;
  description?: string;
};

interface CreateEventSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onEventCreated?: () => void;
  editingEvent?: (EventDraft & { id: number }) | null;
  prefill?: EventDraft | null;
  initialStep?: number;
}

const locations = [
  { id: 1, name: '實踐大學附近', address: '台北市中山區大直街 70 號周邊', distance: '0.5km', lat: 25.0836, lng: 121.5469 },
  { id: 2, name: '桌遊店大直店', address: '台北市中山區北安路 621 巷 12 號', distance: '0.8km', lat: 25.0815, lng: 121.5485 },
  { id: 3, name: 'Game Master', address: '台北市中山區明水路 397 巷 7 弄', distance: '1.2km', lat: 25.0801, lng: 121.552 },
  { id: 4, name: 'Fun Board Game', address: '台北市中山區樂群二路 267 號', distance: '1.5km', lat: 25.079, lng: 121.559 },
  { id: 5, name: '捷運大直站', address: '台北市中山區北安路 534 號', distance: '1.8km', lat: 25.0794, lng: 121.5477 },
];

const userLocation = { lat: 25.0836, lng: 121.5469 };

const getDurationFromRange = (
  startTime: { hour: number; minute: number },
  endTime: { hour: number; minute: number },
) => {
  const startMinutes = startTime.hour * 60 + startTime.minute;
  let endMinutes = endTime.hour * 60 + endTime.minute;
  if (endMinutes <= startMinutes) {
    endMinutes += 24 * 60;
  }
  const total = endMinutes - startMinutes;
  return { hour: Math.floor(total / 60), minute: total % 60 };
};

export function buildPrefillFromPreference(preference: {
  label: string;
  startTime: { hour: number; minute: number };
  endTime: { hour: number; minute: number };
  location: string;
  categoryId: string;
}): EventDraft {
  const category = GAME_CATEGORIES.find((item) => item.id === preference.categoryId);
  return {
    categoryId: preference.categoryId,
    date: new Date(),
    startTime: preference.startTime,
    duration: getDurationFromRange(preference.startTime, preference.endTime),
    location: preference.location,
    title: `${preference.label}桌遊局`,
    description: `預計在${preference.location}附近揪一場${category?.name ?? '桌遊'}，時間彈性，加入後可在活動留言板同步即時資訊。`,
  };
}

export function CreateEventSheet({
  isOpen,
  onClose,
  onEventCreated,
  editingEvent,
  prefill,
  initialStep = 0,
}: CreateEventSheetProps) {
  const { events, addEvent, updateEvent } = useEvents();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [startTime, setStartTime] = useState({ hour: 19, minute: 0 });
  const [duration, setDuration] = useState({ hour: 2, minute: 0 });
  const [selectedLocation, setSelectedLocation] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [direction, setDirection] = useState(0);
  const [visibleLocations, setVisibleLocations] = useState(locations);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const steps = ['遊戲類型', '時間設定', '地點選擇', '標題內文'];

  useEffect(() => {
    if (!isOpen) return;

    const draft = editingEvent ?? prefill;
    setCurrentStep(initialStep);
    setSelectedCategory(draft?.categoryId ?? '');
    setSelectedDate(draft?.date);
    setStartTime(draft?.startTime ?? { hour: 19, minute: 0 });
    setDuration(draft?.duration ?? { hour: 2, minute: 0 });
    setSelectedLocation(draft?.location ?? '');
    setEventTitle(draft?.title ?? '');
    setEventDescription(draft?.description ?? '');
    setDirection(0);
    setSnackbarMessage('');
  }, [editingEvent, initialStep, isOpen, prefill]);

  const isStepComplete = (stepIndex: number) => {
    if (stepIndex === 0) return selectedCategory !== '';
    if (stepIndex === 1) return selectedDate !== undefined;
    if (stepIndex === 2) return selectedLocation !== '';
    if (stepIndex === 3) return eventTitle.trim() !== '' && eventDescription.trim() !== '';
    return false;
  };

  const isAllComplete = () => steps.every((_, index) => isStepComplete(index));

  const resetForm = () => {
    setCurrentStep(0);
    setSelectedCategory('');
    setSelectedDate(undefined);
    setStartTime({ hour: 19, minute: 0 });
    setDuration({ hour: 2, minute: 0 });
    setSelectedLocation('');
    setEventTitle('');
    setEventDescription('');
    setSnackbarMessage('');
  };

  const handleCreateEvent = () => {
    if (!selectedDate || !isAllComplete()) return;

    const category = GAME_CATEGORIES.find((item) => item.id === selectedCategory);
    if (!category) return;

    const conflict = findScheduleConflict(
      editingEvent ? events.filter((event) => event.id !== editingEvent.id) : events,
      { date: selectedDate, startTime, duration },
    );

    if (conflict) {
      setSnackbarMessage(`你在 ${conflict.timeRange} 已有活動，無法建立新的活動。`);
      window.setTimeout(() => setSnackbarMessage(''), 4000);
      return;
    }

    const locationData = locations.find((item) => item.name === selectedLocation);
    const timeStr = `${format(selectedDate, 'M月d日', { locale: zhTW })} ${startTime.hour
      .toString()
      .padStart(2, '0')}:${startTime.minute.toString().padStart(2, '0')}`;

    const endDate = new Date(selectedDate);
    endDate.setHours(startTime.hour + duration.hour, startTime.minute + duration.minute, 0, 0);
    const startTimeStr = `${startTime.hour.toString().padStart(2, '0')}:${startTime.minute.toString().padStart(2, '0')}`;
    const endTimeStr = `${endDate.getHours().toString().padStart(2, '0')}:${endDate
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
    const eventTimeRange = `${format(selectedDate, 'M月d日 EEEE', { locale: zhTW })} ${startTimeStr}-${endTimeStr}`;

    const eventData = {
      title: eventTitle.trim(),
      description: eventDescription.trim(),
      type: category.name,
      typeColor: category.bgColor,
      categoryId: category.id,
      location: locationData?.name ?? selectedLocation,
      locationAddress: locationData?.address ?? selectedLocation,
      date: selectedDate,
      startTime,
      duration,
      time: eventTimeRange,
      status: 'hosting' as const,
      participants: '1/4 人',
      maxParticipants: 4,
    };

    if (editingEvent) {
      updateEvent(editingEvent.id, eventData);
    } else {
      addEvent(eventData);
    }

    resetForm();
    onEventCreated?.();
    onClose();
  };

  const handlePrimaryAction = () => {
    if (currentStep < steps.length - 1) {
      if (!isStepComplete(currentStep)) return;
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
      return;
    }

    handleCreateEvent();
  };

  const handleSwipe = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) <= 100) return;
    if (info.offset.x > 0 && currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
    if (info.offset.x < 0 && currentStep < steps.length - 1 && isStepComplete(currentStep)) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleStepClick = (index: number) => {
    if (index === currentStep) return;
    if (index > currentStep && !steps.slice(0, index).every((_, stepIndex) => isStepComplete(stepIndex))) {
      return;
    }
    setDirection(index > currentStep ? 1 : -1);
    setCurrentStep(index);
  };

  const variants = {
    enter: (moveDirection: number) => ({
      x: moveDirection > 0 ? 390 : -390,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (moveDirection: number) => ({
      x: moveDirection > 0 ? -390 : 390,
      opacity: 0,
    }),
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
            className="absolute inset-0 z-40 bg-[#f9f9f9] flex flex-col"
          >
            <div className="shrink-0 bg-[#fafaf9] px-[16px] py-[16px] border-b-2 border-[rgba(6,78,59,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-[12px]">
                <button onClick={onClose} className="size-[14px] flex items-center justify-center shrink-0">
                  <svg className="size-full" fill="none" viewBox="0 0 14 14">
                    <path fill="#78716C" d="M14 6H4.83l4.59-4.59L8 0 0 8l8 8 1.41-1.41L4.83 10H14V6z" />
                  </svg>
                </button>

                <div className="flex-1 bg-[#f3f3f3] rounded-[12px] border border-[rgba(191,201,190,0.3)] flex p-[5px]">
                  {steps.map((step, index) => {
                    const isComplete = isStepComplete(index);
                    const isActive = currentStep === index;
                    return (
                      <button
                        key={step}
                        onClick={() => handleStepClick(index)}
                        className={`flex-1 py-[8px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] rounded-[8px] transition-all relative ${
                          isActive
                            ? 'bg-white text-[#006334] border border-[rgba(0,99,52,0.1)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]'
                            : isComplete
                              ? 'bg-[#d1fae5] text-[#006334]'
                              : 'text-[#6f7a70]'
                        }`}
                      >
                        {step}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-hidden relative">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleSwipe}
                  className="absolute inset-0 overflow-hidden"
                >
                  <div className={`${currentStep === 2 ? 'h-full p-[20px]' : 'p-[20px] pb-[120px] overflow-y-auto h-full'}`}>
                    {currentStep === 0 && (
                      <>
                        <h2 className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#1a1c1c] mb-[16px]">
                          選擇遊戲類型
                        </h2>
                        <div className="grid grid-cols-2 gap-[16px]">
                          {GAME_CATEGORIES.map((category) => (
                            <button
                              key={category.id}
                              onClick={() => setSelectedCategory(category.id)}
                              className={`bg-[#f9f9f9] rounded-[8px] border-2 ${
                                selectedCategory === category.id ? 'border-[#006334]' : 'border-[rgba(111,122,112,0.2)]'
                              } shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden`}
                            >
                              <div className="h-[12px] border-b border-[rgba(0,0,0,0.1)]" style={{ backgroundColor: category.color }} />
                              <div className="p-[16px] flex flex-col items-center gap-[12px]">
                                <div
                                  className="size-[48px] rounded-full flex items-center justify-center text-[24px]"
                                  style={{ backgroundColor: category.bgColor }}
                                >
                                  {category.icon}
                                </div>
                                <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#1a1c1c]">
                                  {category.name}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {currentStep === 1 && (
                      <>
                        <div
                          className="bg-white rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] mb-[12px] flex justify-center overflow-hidden"
                          onPointerDown={(event) => event.stopPropagation()}
                          style={{ height: '200px' }}
                        >
                          <div style={{ transform: 'scale(0.7)', transformOrigin: 'center top', marginTop: '-12px' }}>
                            <DayPicker
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              locale={zhTW}
                              disabled={{ before: new Date() }}
                              className="rdp-custom"
                              styles={{
                                day_selected: {
                                  backgroundColor: '#006334',
                                  color: 'white',
                                  borderRadius: '50%',
                                  fontWeight: 600,
                                },
                              }}
                            />
                          </div>
                        </div>

                        <TimePicker value={startTime} onChange={setStartTime} label="開始時間" />
                        <TimePicker value={duration} onChange={setDuration} label="預計時長" maxHour={8} />
                      </>
                    )}

                    {currentStep === 2 && (
                      <div className="h-full flex flex-col">
                        <LocationMap
                          locations={locations}
                          userLocation={userLocation}
                          selectedLocation={selectedLocation}
                          onLocationSelect={setSelectedLocation}
                          onVisibleLocationsChange={setVisibleLocations}
                        />

                        <h3 className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#1a1c1c] mb-[8px] mt-[12px]">
                          附近地點 ({visibleLocations.length})
                        </h3>

                        <div className="flex-1 overflow-y-auto pr-[4px] pb-[80px]">
                          <div className="space-y-[12px]">
                            {visibleLocations.map((location) => (
                              <button
                                key={location.id}
                                onClick={() => setSelectedLocation(location.name)}
                                className={`w-full text-left bg-white rounded-[12px] p-[16px] border-2 ${
                                  selectedLocation === location.name
                                    ? 'border-[#006334] shadow-[0px_2px_4px_0px_rgba(0,99,52,0.2)]'
                                    : 'border-[rgba(111,122,112,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]'
                                }`}
                              >
                                <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#1a1c1c] mb-[4px]">
                                  {location.name}
                                </div>
                                <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#6f7a70]">
                                  {location.address} · {location.distance}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="flex flex-col gap-[16px]">
                        <div>
                          <h2 className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[18px] text-[#1a1c1c] mb-[6px]">
                            活動標題與內文
                          </h2>
                          <p className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] text-[#6f7a70] leading-[18px]">
                            告訴大家這場活動適合誰、會玩什麼，以及集合或遲到時要注意的資訊。
                          </p>
                        </div>

                        <label className="flex flex-col gap-[8px]">
                          <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#3f4940]">活動標題</span>
                          <input
                            value={eventTitle}
                            onChange={(event) => setEventTitle(event.target.value)}
                            placeholder="例如：下課後輕鬆派對桌遊局"
                            className="h-[46px] rounded-[10px] border-2 border-[rgba(111,122,112,0.2)] bg-white px-[14px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[15px] outline-none focus:border-[#006334]"
                          />
                        </label>

                        <label className="flex flex-col gap-[8px]">
                          <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#3f4940]">活動內文</span>
                          <textarea
                            value={eventDescription}
                            onChange={(event) => setEventDescription(event.target.value)}
                            placeholder="例如：歡迎新手加入，預計玩妙語說書人或誰是牛頭王，遲到可以在活動留言板說。"
                            className="min-h-[150px] rounded-[10px] border-2 border-[rgba(111,122,112,0.2)] bg-white p-[14px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[15px] leading-[22px] outline-none resize-none focus:border-[#006334]"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute bottom-0 left-0 right-0 px-[20px] py-[16px] bg-transparent pointer-events-none z-10">
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
                onClick={handlePrimaryAction}
                disabled={currentStep === steps.length - 1 ? !isAllComplete() : !isStepComplete(currentStep)}
                className={`w-full py-[16px] rounded-[12px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[20px] flex items-center justify-center gap-[8px] pointer-events-auto ${
                  (currentStep === steps.length - 1 ? isAllComplete() : isStepComplete(currentStep))
                    ? 'bg-[#006334] text-white shadow-[0px_4px_0px_0px_rgba(0,0,0,0.2)]'
                    : 'bg-[#e8e8e8] text-[#6f7a70] opacity-50'
                }`}
              >
                <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 20 20">
                  <path
                    fill="currentColor"
                    d="M10 0L12.0711 7.92893L20 10L12.0711 12.0711L10 20L7.92893 12.0711L0 10L7.92893 7.92893L10 0Z"
                  />
                </svg>
                {currentStep < steps.length - 1 ? '下一步' : editingEvent ? '確認更新活動' : '確認創建活動'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
