import { useRef, useEffect, useState } from 'react';

interface TimePickerProps {
  value: { hour: number; minute: number };
  onChange: (value: { hour: number; minute: number }) => void;
  label: string;
  maxHour?: number;
}

export function TimePicker({ value, onChange, label, maxHour = 23 }: TimePickerProps) {
  const hours = Array.from({ length: maxHour + 1 }, (_, i) => i);
  const minutes = Array.from({ length: 6 }, (_, i) => i * 10); // 0, 10, 20, 30, 40, 50

  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  const [isDraggingHour, setIsDraggingHour] = useState(false);
  const [isDraggingMinute, setIsDraggingMinute] = useState(false);

  const itemHeight = 36;

  useEffect(() => {
    if (hourRef.current) {
      hourRef.current.scrollTop = value.hour * itemHeight;
    }
  }, []);

  useEffect(() => {
    if (minuteRef.current) {
      const minuteIndex = minutes.indexOf(value.minute);
      minuteRef.current.scrollTop = minuteIndex * itemHeight;
    }
  }, []);

  const handleHourScroll = () => {
    if (!hourRef.current || isDraggingHour) return;
    const scrollTop = hourRef.current.scrollTop;
    const index = Math.round(scrollTop / itemHeight);
    const clampedIndex = Math.max(0, Math.min(index, hours.length - 1));

    if (clampedIndex !== value.hour) {
      onChange({ ...value, hour: clampedIndex });
    }
  };

  const handleMinuteScroll = () => {
    if (!minuteRef.current || isDraggingMinute) return;
    const scrollTop = minuteRef.current.scrollTop;
    const index = Math.round(scrollTop / itemHeight);
    const clampedIndex = Math.max(0, Math.min(index, minutes.length - 1));

    if (minutes[clampedIndex] !== value.minute) {
      onChange({ ...value, minute: minutes[clampedIndex] });
    }
  };

  return (
    <div className="mb-[10px]">
      <h3 className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#1a1c1c] mb-[6px]">
        {label}
      </h3>
      <div className="flex gap-[12px] items-center justify-center">
        {/* Hour Picker */}
        <div className="relative">
          <div
            ref={hourRef}
            onScroll={handleHourScroll}
            onPointerDown={(e) => {
              e.stopPropagation();
              setIsDraggingHour(true);
            }}
            onPointerUp={() => {
              setIsDraggingHour(false);
              handleHourScroll();
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              setIsDraggingHour(true);
            }}
            onTouchEnd={() => {
              setIsDraggingHour(false);
              handleHourScroll();
            }}
            className="h-[72px] w-[70px] overflow-y-scroll snap-y snap-mandatory scrollbar-hide touch-pan-y"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              touchAction: 'pan-y',
            }}
          >
            <div className="h-[18px]" />
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-[36px] flex items-center justify-center snap-center"
              >
                <span
                  className={`font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[20px] transition-all ${
                    hour === value.hour ? 'text-[#006334] scale-110' : 'text-[#9ca3af]'
                  }`}
                >
                  {hour.toString().padStart(2, '0')}
                </span>
              </div>
            ))}
            <div className="h-[18px]" />
          </div>
          <div className="absolute inset-x-0 top-[18px] h-[36px] border-y-2 border-[#006334] pointer-events-none" />
          {/* Fade effect */}
          <div className="absolute inset-x-0 top-0 h-[18px] bg-gradient-to-b from-[#f9f9f9] to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-[18px] bg-gradient-to-t from-[#f9f9f9] to-transparent pointer-events-none" />
        </div>

        <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[20px] text-[#1a1c1c]">:</span>

        {/* Minute Picker */}
        <div className="relative">
          <div
            ref={minuteRef}
            onScroll={handleMinuteScroll}
            onPointerDown={(e) => {
              e.stopPropagation();
              setIsDraggingMinute(true);
            }}
            onPointerUp={() => {
              setIsDraggingMinute(false);
              handleMinuteScroll();
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              setIsDraggingMinute(true);
            }}
            onTouchEnd={() => {
              setIsDraggingMinute(false);
              handleMinuteScroll();
            }}
            className="h-[72px] w-[70px] overflow-y-scroll snap-y snap-mandatory scrollbar-hide touch-pan-y"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              touchAction: 'pan-y',
            }}
          >
            <div className="h-[18px]" />
            {minutes.map((minute) => (
              <div
                key={minute}
                className="h-[36px] flex items-center justify-center snap-center"
              >
                <span
                  className={`font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[20px] transition-all ${
                    minute === value.minute ? 'text-[#006334] scale-110' : 'text-[#9ca3af]'
                  }`}
                >
                  {minute.toString().padStart(2, '0')}
                </span>
              </div>
            ))}
            <div className="h-[18px]" />
          </div>
          <div className="absolute inset-x-0 top-[18px] h-[36px] border-y-2 border-[#006334] pointer-events-none" />
          {/* Fade effect */}
          <div className="absolute inset-x-0 top-0 h-[18px] bg-gradient-to-b from-[#f9f9f9] to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-[18px] bg-gradient-to-t from-[#f9f9f9] to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
