import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { TimePicker } from './TimePicker';
import { LocationMap } from './LocationMap';
import { useEvents } from '../contexts/EventsContext';
import 'react-day-picker/dist/style.css';

interface CreateEventSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onEventCreated?: () => void;
  editingEvent?: {
    id: number;
    categoryId: string;
    date: Date;
    startTime: { hour: number; minute: number };
    duration: { hour: number; minute: number };
    location: string;
  } | null;
}

export function CreateEventSheet({ isOpen, onClose, onEventCreated, editingEvent }: CreateEventSheetProps) {
  const { addEvent, updateEvent } = useEvents();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState({ hour: 19, minute: 0 });
  const [duration, setDuration] = useState({ hour: 2, minute: 0 });
  const [selectedLocation, setSelectedLocation] = useState('');
  const [direction, setDirection] = useState(0);

  // Initialize form with editing event data
  useEffect(() => {
    if (editingEvent && isOpen) {
      setSelectedCategory(editingEvent.categoryId);
      setSelectedDate(editingEvent.date);
      setStartTime(editingEvent.startTime);
      setDuration(editingEvent.duration);
      setSelectedLocation(editingEvent.location);
    }
  }, [editingEvent, isOpen]);

  const categories = [
    { id: 'strategy', name: 'Strategy', color: '#00579A', bgColor: '#d3e4ff', icon: '🎯' },
    { id: 'party', name: 'Party', color: '#B7131A', bgColor: '#ffdad6', icon: '🎉' },
    { id: 'card', name: 'Card', color: '#006334', bgColor: '#9ff5b7', icon: '🃏' },
    { id: 'classic', name: 'Classic', color: '#3f4940', bgColor: '#e2e2e2', icon: '🎲' },
  ];

  const userLocation = { lat: 25.0330, lng: 121.5450 }; // 台北市大安區

  const locations = [
    { id: 1, name: '卡牌屋 桌遊咖啡', address: '台北市大安區羅斯福路三段 283 巷', distance: '0.5km', lat: 25.0165, lng: 121.5385 },
    { id: 2, name: '桌遊愛樂園', address: '台北市大安區師大路 39 巷', distance: '0.8km', lat: 25.0185, lng: 121.5375 },
    { id: 3, name: 'Game Master', address: '台北市中正區汀州路三段', distance: '1.2km', lat: 25.0155, lng: 121.5410 },
    { id: 4, name: '瘋桌遊 Fun Board Game', address: '台北市大安區和平東路二段', distance: '1.5km', lat: 25.0265, lng: 121.5455 },
    { id: 5, name: '骰子人桌遊咖啡館', address: '台北市大安區新生南路三段', distance: '1.8km', lat: 25.0210, lng: 121.5340 },
    { id: 6, name: '遊戲時光 Game Time', address: '台北市中正區羅斯福路四段', distance: '2.0km', lat: 25.0085, lng: 121.5295 },
    { id: 7, name: '策略桌遊館', address: '台北市大安區復興南路二段', distance: '2.2km', lat: 25.0320, lng: 121.5435 },
    { id: 8, name: '歡樂派對桌遊', address: '台北市大安區敦化南路一段', distance: '2.5km', lat: 25.0410, lng: 121.5495 },
    { id: 9, name: '棋樂無窮桌遊店', address: '台北市信義區松仁路', distance: '3.0km', lat: 25.0385, lng: 121.5620 },
    { id: 10, name: '桌上遊戲王國', address: '台北市中山區南京東路三段', distance: '3.5km', lat: 25.0520, lng: 121.5380 },
    { id: 11, name: 'Board Game Cafe 貳樓', address: '台北市大安區仁愛路四段', distance: '1.3km', lat: 25.0365, lng: 121.5515 },
    { id: 12, name: '築夢桌遊空間', address: '台北市中正區汀州路二段', distance: '1.7km', lat: 25.0125, lng: 121.5260 },
    { id: 13, name: '玩聚時刻桌遊館', address: '台北市大安區光復南路', distance: '2.3km', lat: 25.0275, lng: 121.5565 },
    { id: 14, name: '魔法桌遊屋', address: '台北市松山區八德路三段', distance: '2.8km', lat: 25.0475, lng: 121.5525 },
    { id: 15, name: '友善桌遊空間', address: '台北市中正區南昌路一段', distance: '1.9km', lat: 25.0245, lng: 121.5225 },
  ];

  const [visibleLocations, setVisibleLocations] = useState(locations);

  const steps = ['遊戲類別', '時間設定', '地點選擇'];

  const handleSwipe = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      if (info.offset.x > 0 && currentStep > 0) {
        // Swipe right - go to previous step
        setDirection(-1);
        setCurrentStep(currentStep - 1);
      } else if (info.offset.x < 0 && currentStep < 2) {
        // Swipe left - go to next step
        setDirection(1);
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleStepClick = (index: number) => {
    if (index !== currentStep) {
      setDirection(index > currentStep ? 1 : -1);
      setCurrentStep(index);
    }
  };

  const handleCreateEvent = () => {
    if (!selectedDate) return;

    const category = categories.find(c => c.id === selectedCategory);
    if (!category) return;

    const locationData = locations.find(l => l.name === selectedLocation);
    if (!locationData) return;

    const timeStr = `${format(selectedDate, 'M月d日', { locale: zhTW })} ${startTime.hour.toString().padStart(2, '0')}:${startTime.minute.toString().padStart(2, '0')}`;

    const eventData = {
      title: `${category.name} 桌遊活動`,
      type: category.name,
      typeColor: category.bgColor,
      categoryId: category.id,
      location: locationData.address.split('台北市')[1]?.split('區')[0] + '區' || '台北市',
      locationAddress: locationData.address,
      date: selectedDate,
      startTime: startTime,
      duration: duration,
      time: timeStr,
      status: 'hosting' as const,
      participants: '1/4 人',
      maxParticipants: 4,
    };

    if (editingEvent) {
      updateEvent(editingEvent.id, eventData);
    } else {
      addEvent(eventData);
    }

    onClose();
    setCurrentStep(0);
    setSelectedCategory('');
    setSelectedDate(undefined);
    setStartTime({ hour: 19, minute: 0 });
    setDuration({ hour: 2, minute: 0 });
    setSelectedLocation('');

    if (onEventCreated) {
      onEventCreated();
    }
  };

  const isAllComplete = () => {
    return selectedCategory !== '' && selectedDate !== undefined && selectedLocation !== '';
  };

  const isStepComplete = (stepIndex: number) => {
    if (stepIndex === 0) return selectedCategory !== '';
    if (stepIndex === 1) return selectedDate !== undefined;
    if (stepIndex === 2) return selectedLocation !== '';
    return false;
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 390 : -390,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -390 : 390,
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute inset-0 z-40 bg-[#f9f9f9] flex flex-col"
          >
            {/* Header with Tab Navigation */}
            <div className="shrink-0 bg-[#fafaf9] px-[16px] py-[16px] border-b-2 border-[rgba(6,78,59,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-[12px]">
                <button onClick={onClose} className="size-[14px] flex items-center justify-center shrink-0">
                  <svg className="size-full" fill="none" viewBox="0 0 14 14">
                    <path fill="#78716C" d="M14 6H4.83l4.59-4.59L8 0 0 8l8 8 1.41-1.41L4.83 10H14V6z"/>
                  </svg>
                </button>

                {/* Tab Navigation */}
                <div className="flex-1 bg-[#f3f3f3] rounded-[12px] border border-[rgba(191,201,190,0.3)] flex p-[5px]">
                  {steps.map((step, index) => {
                    const isComplete = isStepComplete(index);
                    const isActive = currentStep === index;

                    return (
                      <button
                        key={index}
                        onClick={() => handleStepClick(index)}
                        className={`flex-1 py-[8px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] tracking-[0.7px] rounded-[8px] transition-all relative ${
                          isActive
                            ? 'bg-white text-[#006334] border border-[rgba(0,99,52,0.1)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]'
                            : isComplete
                            ? 'bg-[#d1fae5] text-[#006334]'
                            : 'text-[#6f7a70]'
                        }`}
                      >
                        {step}
                        {isComplete && !isActive && (
                          <div className="absolute top-[4px] right-[4px] size-[8px] bg-[#006334] rounded-full" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Swipeable Content */}
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
                  <div className={`${currentStep === 2 ? 'h-full p-[20px]' : 'p-[20px] pb-[120px]'}`}>
                    {/* Step 0: Category */}
                    {currentStep === 0 && (
                  <>
                    <h2 className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#1a1c1c] mb-[16px]">
                      選擇遊戲類型
                    </h2>
                    <div className="grid grid-cols-2 gap-[16px]">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`bg-[#f9f9f9] rounded-[8px] border-2 ${
                            selectedCategory === cat.id ? 'border-[#006334]' : 'border-[rgba(111,122,112,0.2)]'
                          } shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden`}
                        >
                          <div className="h-[12px] border-b border-[rgba(0,0,0,0.1)]" style={{ backgroundColor: cat.color }} />
                          <div className="p-[16px] flex flex-col items-center gap-[12px]">
                            <div className="size-[48px] rounded-full flex items-center justify-center text-[24px]" style={{ backgroundColor: cat.bgColor }}>
                              {cat.icon}
                            </div>
                            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#1a1c1c]">
                              {cat.name}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                    {/* Step 1: Time */}
                    {currentStep === 1 && (
                      <>
                        
                        <div
                          className="bg-white rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] mb-[12px] flex justify-center overflow-hidden"
                          onPointerDown={(e) => e.stopPropagation()}
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

                        <TimePicker
                          value={startTime}
                          onChange={setStartTime}
                          label="活動開始時間"
                        />

                        <TimePicker
                          value={duration}
                          onChange={setDuration}
                          label="預計進行時間"
                          maxHour={8}
                        />
                      </>
                    )}

                    {/* Step 2: Location */}
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
                      附近店家 ({visibleLocations.length})
                    </h3>

                    <div className="flex-1 overflow-y-auto pr-[4px] pb-[80px]">
                      <div className="space-y-[12px]">
                        {visibleLocations.map((loc) => (
                          <button
                            key={loc.id}
                            onClick={() => setSelectedLocation(loc.name)}
                            className={`w-full text-left bg-white rounded-[12px] p-[16px] border-2 ${
                              selectedLocation === loc.name
                                ? 'border-[#006334] shadow-[0px_2px_4px_0px_rgba(0,99,52,0.2)]'
                                : 'border-[rgba(111,122,112,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]'
                            }`}
                          >
                            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#1a1c1c] mb-[4px]">
                              {loc.name}
                            </div>
                            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#6f7a70]">
                              {loc.address} • {loc.distance}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Floating Bottom Button */}
            <div className="absolute bottom-0 left-0 right-0 px-[20px] py-[16px] bg-transparent pointer-events-none z-10">
              <button
                onClick={handleCreateEvent}
                disabled={!isAllComplete()}
                className={`w-full py-[16px] rounded-[12px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[20px] flex items-center justify-center gap-[8px] pointer-events-auto ${
                  isAllComplete()
                    ? 'bg-[#006334] text-white shadow-[0px_4px_0px_0px_rgba(0,0,0,0.2)]'
                    : 'bg-[#e8e8e8] text-[#6f7a70] opacity-50'
                }`}
              >
                <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 20 20">
                  <path fill="currentColor" d="M10 0L12.0711 7.92893L20 10L12.0711 12.0711L10 20L7.92893 12.0711L0 10L7.92893 7.92893L10 0Z"/>
                </svg>
                {editingEvent ? '確認並更新活動' : '確認並發起活動'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
