import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { GAME_CATEGORIES } from '../constants/gameCategories';
import { type AvailabilityPreference, type AvailabilityPreferenceDraft } from '../contexts/UserPreferencesContext';
import { LocationMap } from './LocationMap';
import { TimePicker } from './TimePicker';

interface AvailabilityPreferenceSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (preference: AvailabilityPreferenceDraft) => void;
  initialPreference: AvailabilityPreferenceDraft;
  editingPreference?: AvailabilityPreference | null;
}

const locations = [
  { id: 1, name: '實踐大學附近', address: '台北市中山區大直街 70 號周邊', distance: '0.5km', lat: 25.0836, lng: 121.5469 },
  { id: 2, name: '捷運大直站附近', address: '台北市中山區北安路 534 號周邊', distance: '0.8km', lat: 25.0815, lng: 121.5485 },
  { id: 3, name: '台北市大安區', address: '台北市大安區和平東路周邊', distance: '1.2km', lat: 25.026, lng: 121.543 },
  { id: 4, name: '台北市中正區', address: '台北市中正區羅斯福路周邊', distance: '1.5km', lat: 25.04, lng: 121.52 },
  { id: 5, name: '公館桌遊店', address: '台北市中正區汀州路三段周邊', distance: '1.8km', lat: 25.015, lng: 121.532 },
];

const userLocation = { lat: 25.0836, lng: 121.5469 };

const formatTime = (time: { hour: number; minute: number }) =>
  `${time.hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')}`;

export function AvailabilityPreferenceSheet({
  isOpen,
  onClose,
  onSave,
  initialPreference,
  editingPreference,
}: AvailabilityPreferenceSheetProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [label, setLabel] = useState(initialPreference.label);
  const [categoryId, setCategoryId] = useState(initialPreference.categoryId);
  const [startTime, setStartTime] = useState(initialPreference.startTime);
  const [endTime, setEndTime] = useState(initialPreference.endTime);
  const [location, setLocation] = useState(initialPreference.location);
  const [direction, setDirection] = useState(0);
  const [visibleLocations, setVisibleLocations] = useState(locations);
  const steps = ['標籤名稱', '遊戲類型', '時間設定', '常用地點'];

  useEffect(() => {
    if (!isOpen) return;
    const draft = editingPreference ?? initialPreference;
    setCurrentStep(0);
    setLabel(draft.label);
    setCategoryId(draft.categoryId);
    setStartTime(draft.startTime);
    setEndTime(draft.endTime);
    setLocation(draft.location);
    setVisibleLocations(locations);
    setDirection(0);
  }, [editingPreference, initialPreference, isOpen]);

  const isStepComplete = (stepIndex: number) => {
    if (stepIndex === 0) return label.trim() !== '';
    if (stepIndex === 1) return categoryId !== '';
    if (stepIndex === 2) return true;
    if (stepIndex === 3) return location.trim() !== '';
    return false;
  };

  const isAllComplete = () => steps.every((_, index) => isStepComplete(index));

  const handleStepClick = (index: number) => {
    if (index === currentStep) return;
    if (index > currentStep && !steps.slice(0, index).every((_, stepIndex) => isStepComplete(stepIndex))) {
      return;
    }
    setDirection(index > currentStep ? 1 : -1);
    setCurrentStep(index);
  };

  const handlePrimaryAction = () => {
    if (currentStep < steps.length - 1) {
      if (!isStepComplete(currentStep)) return;
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
      return;
    }

    if (!isAllComplete()) return;
    onSave({
      label: label.trim(),
      categoryId,
      startTime,
      endTime,
      location: location.trim(),
    });
    onClose();
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
            className="absolute inset-0 z-40 bg-black/50"
            onClick={onClose}
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute inset-0 z-40 flex flex-col bg-[#f9f9f9]"
          >
            <div className="shrink-0 border-b-2 border-[rgba(6,78,59,0.2)] bg-[#fafaf9] px-[16px] py-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
              <div className="mb-[12px] flex items-center gap-[12px]">
                <button onClick={onClose} className="size-[30px] flex items-center justify-center shrink-0" aria-label="關閉標籤設定">
                  <svg className="size-[20px]" fill="none" viewBox="0 0 20 20">
                    <path fill="#78716C" d="M13 4L7 10L13 16L11.6 17.4L4.2 10L11.6 2.6L13 4Z" />
                  </svg>
                </button>
                <div className="flex-1 text-center font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#047857]">
                  標籤設定
                </div>
                <div className="w-[30px]" />
              </div>

              <div className="flex rounded-[12px] border border-[rgba(191,201,190,0.3)] bg-[#f3f3f3] p-[5px]">
                {steps.map((step, index) => {
                  const isActive = currentStep === index;
                  const isComplete = isStepComplete(index);
                  return (
                    <button
                      key={step}
                      type="button"
                      onClick={() => handleStepClick(index)}
                      className={`flex-1 rounded-[8px] py-[8px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] transition-all ${
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

            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  className="absolute inset-0 overflow-hidden"
                >
                  <div className={`${currentStep === 3 ? 'h-full p-[20px]' : 'h-full overflow-y-auto p-[20px] pb-[120px]'}`}>
                    {currentStep === 0 && (
                      <div className="rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] bg-white p-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
                        <label className="flex flex-col gap-[8px]">
                          <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#3f4940]">
                            標籤名稱
                          </span>
                          <input
                            value={label}
                            onChange={(event) => setLabel(event.target.value)}
                            placeholder="例如：下課局"
                            className="h-[46px] rounded-[10px] border-2 border-[rgba(111,122,112,0.2)] bg-white px-[14px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[15px] outline-none focus:border-[#006334]"
                          />
                        </label>

                      </div>
                    )}

                    {currentStep === 1 && (
                      <div>
                        <h2 className="mb-[12px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#1a1c1c]">
                          遊戲類型
                        </h2>
                        <div className="grid grid-cols-2 gap-[14px]">
                          {GAME_CATEGORIES.map((category) => (
                            <button
                              key={category.id}
                              type="button"
                              onClick={() => setCategoryId(category.id)}
                              className={`overflow-hidden rounded-[8px] border-2 bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] ${
                                categoryId === category.id ? 'border-[#006334]' : 'border-[rgba(111,122,112,0.2)]'
                              }`}
                            >
                              <div className="h-[10px]" style={{ backgroundColor: category.color }} />
                              <div className="flex flex-col items-center gap-[10px] p-[14px]">
                                <div
                                  className="flex size-[44px] items-center justify-center rounded-full text-[22px]"
                                  style={{ backgroundColor: category.bgColor }}
                                >
                                  {category.icon}
                                </div>
                                <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#1a1c1c]">
                                  {category.name}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}


                    {currentStep === 2 && (
                      <div className="flex flex-col gap-[16px]">
                        <div className="rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] bg-white p-[16px]">
                          <TimePicker value={startTime} onChange={setStartTime} label="開始時間" />
                          <TimePicker value={endTime} onChange={setEndTime} label="結束時間" />
                        </div>
                        <div className="rounded-[10px] bg-[#e8f7ee] p-[12px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[13px] text-[#065f46]">
                          目前設定為 {formatTime(startTime)}-{formatTime(endTime)}
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="flex h-full flex-col">
                        <LocationMap
                          locations={locations}
                          userLocation={userLocation}
                          selectedLocation={location}
                          onLocationSelect={setLocation}
                          onVisibleLocationsChange={setVisibleLocations}
                        />

                        <h3 className="mb-[8px] mt-[12px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#1a1c1c]">
                          附近地點 ({visibleLocations.length})
                        </h3>

                        <div className="min-h-0 flex-1 overflow-y-auto pb-[86px] pr-[4px]">
                          <div className="space-y-[10px]">
                            {visibleLocations.map((item) => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => setLocation(item.name)}
                                className={`w-full rounded-[12px] border-2 bg-white p-[14px] text-left ${
                                  location === item.name
                                    ? 'border-[#006334] shadow-[0px_2px_4px_0px_rgba(0,99,52,0.2)]'
                                    : 'border-[rgba(111,122,112,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]'
                                }`}
                              >
                                <div className="mb-[4px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[15px] text-[#1a1c1c]">
                                  {item.name}
                                </div>
                                <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#6f7a70]">
                                  {item.address} · {item.distance}
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

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-[#f9f9f9] via-[#f9f9f9] to-transparent px-[20px] pb-[24px] pt-[38px]">
              <button
                type="button"
                onClick={handlePrimaryAction}
                disabled={currentStep === steps.length - 1 ? !isAllComplete() : !isStepComplete(currentStep)}
                className={`pointer-events-auto flex w-full items-center justify-center gap-[8px] rounded-[12px] py-[16px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[20px] ${
                  (currentStep === steps.length - 1 ? isAllComplete() : isStepComplete(currentStep))
                    ? 'bg-[#006334] text-white shadow-[0px_4px_0px_0px_rgba(0,0,0,0.2)]'
                    : 'bg-[#e8e8e8] text-[#6f7a70] opacity-50'
                }`}
              >
                {currentStep < steps.length - 1 ? '下一步' : editingPreference ? '儲存標籤' : '建立標籤'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
