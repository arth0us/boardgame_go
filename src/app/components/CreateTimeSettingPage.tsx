import { useNavigate } from 'react-router';
import { PageLayout } from './PageLayout';
import { useState } from 'react';

export function CreateTimeSettingPage() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  return (
    <PageLayout showHeader={false}>
      <div className="size-full bg-[#f9f9f9] relative">
        {/* Sub-page Header */}
        <div className="bg-[#fafaf9] h-[56px] flex items-center px-[16px] border-b-2 border-[rgba(6,78,59,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <button onClick={() => navigate('/create/category')} className="size-[30px] flex items-center justify-center">
            <svg className="size-full" fill="none" viewBox="0 0 30 30">
              <path fill="#78716C" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </button>
          <div className="flex-1 text-center font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#047857] uppercase tracking-[-0.4px]">
            發起新活動
          </div>
          <div className="w-[30px]" />
        </div>

        {/* Content */}
        <div className="overflow-y-auto" style={{ height: 'calc(100% - 56px)' }}>
          <div className="p-[20px] pb-[120px]">
            {/* Nav Tabs */}
            <div className="bg-[#f3f3f3] rounded-[12px] border border-[rgba(191,201,190,0.3)] flex p-[5px] mb-[24px]">
              <button
                onClick={() => navigate('/create/category')}
                className="flex-1 py-[8px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#6f7a70] tracking-[0.7px]"
              >
                遊戲類別
              </button>
              <button className="flex-1 py-[9px] bg-white rounded-[8px] border border-[rgba(0,99,52,0.1)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#006334] tracking-[0.7px]">
                時間設定
              </button>
              <button
                onClick={() => navigate('/create/location')}
                className="flex-1 py-[8px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#6f7a70] tracking-[0.7px]"
              >
                地點經驗
              </button>
            </div>

            {/* Progress */}
            <div className="bg-[#eee] h-[12px] rounded-full flex gap-[4px] mb-[24px]">
              <div className="bg-[#006334] flex-1 rounded-full" />
              <div className="bg-[#006334] flex-1 rounded-full" />
              <div className="bg-[#e2e2e2] flex-1 rounded-full" />
            </div>

            {/* Date Selection */}
            <div className="mb-[24px]">
              <h2 className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#1a1c1c] mb-[12px]">
                選擇日期
              </h2>
              <div className="grid grid-cols-3 gap-[12px]">
                {['今天', '明天', '後天'].map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(day)}
                    className={`py-[12px] rounded-[8px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] border-2 ${
                      selectedDate === day
                        ? 'bg-[#d1fae5] border-[#006334] text-[#006334]'
                        : 'bg-white border-[rgba(111,122,112,0.2)] text-[#3f4940]'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div className="mb-[24px]">
              <h2 className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#1a1c1c] mb-[12px]">
                選擇時間
              </h2>
              <div className="grid grid-cols-3 gap-[12px]">
                {['下午 14:00', '下午 17:00', '晚上 19:00', '晚上 21:00'].map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-[12px] rounded-[8px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] border-2 ${
                      selectedTime === time
                        ? 'bg-[#d1fae5] border-[#006334] text-[#006334]'
                        : 'bg-white border-[rgba(111,122,112,0.2)] text-[#3f4940]'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <h2 className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#1a1c1c] mb-[12px]">
                預計時長
              </h2>
              <div className="grid grid-cols-3 gap-[12px]">
                {['2 小時', '3 小時', '4 小時'].map((duration) => (
                  <button
                    key={duration}
                    className="py-[12px] rounded-[8px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] border-2 bg-white border-[rgba(111,122,112,0.2)] text-[#3f4940]"
                  >
                    {duration}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Button */}
          <div className="absolute bottom-[80px] left-0 right-0 px-[20px] pb-[16px]">
            <button
              onClick={() => navigate('/create/location')}
              disabled={!selectedDate || !selectedTime}
              className={`w-full py-[16px] rounded-[12px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[20px] flex items-center justify-center gap-[8px] ${
                selectedDate && selectedTime
                  ? 'bg-[#006334] text-white shadow-[0px_4px_0px_0px_rgba(0,0,0,0.2)]'
                  : 'bg-[#e8e8e8] text-[#6f7a70] opacity-50'
              }`}
            >
              <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 20 20">
                <path fill="currentColor" d="M10 0L12.0711 7.92893L20 10L12.0711 12.0711L10 20L7.92893 12.0711L0 10L7.92893 7.92893L10 0Z"/>
              </svg>
              確認並發起活動
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
