import { useNavigate } from 'react-router';
import { PageLayout } from './PageLayout';
import { useState } from 'react';

export function CreateLocationPage() {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState('');

  const locations = [
    { id: 1, name: '卡牌屋 桌遊咖啡', address: '台北市大安區羅斯福路三段 283 巷', distance: '0.5km' },
    { id: 2, name: '桌遊愛樂園', address: '台北市大安區師大路 39 巷', distance: '0.8km' },
    { id: 3, name: 'Game Master', address: '台北市中正區汀州路三段', distance: '1.2km' },
  ];

  const handleCreateEvent = () => {
    navigate('/explore');
  };

  return (
    <PageLayout showHeader={false}>
      <div className="size-full bg-[#f9f9f9] relative">
        {/* Sub-page Header */}
        <div className="bg-[#fafaf9] h-[56px] flex items-center px-[16px] border-b-2 border-[rgba(6,78,59,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <button onClick={() => navigate('/create/time')} className="size-[30px] flex items-center justify-center">
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
              <button
                onClick={() => navigate('/create/time')}
                className="flex-1 py-[8px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#6f7a70] tracking-[0.7px]"
              >
                時間設定
              </button>
              <button className="flex-1 py-[9px] bg-white rounded-[8px] border border-[rgba(0,99,52,0.1)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#006334] tracking-[0.7px]">
                地點經驗
              </button>
            </div>

            {/* Progress */}
            <div className="bg-[#eee] h-[12px] rounded-full flex gap-[4px] mb-[24px]">
              <div className="bg-[#006334] flex-1 rounded-full" />
              <div className="bg-[#006334] flex-1 rounded-full" />
              <div className="bg-[#006334] flex-1 rounded-full" />
            </div>

            {/* Map Preview */}
            <div className="mb-[24px]">
              <h2 className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#1a1c1c] mb-[12px]">
                在地圖上選擇地點
              </h2>
              <div className="bg-gradient-to-br from-[#d1fae5] to-[#9ff5b7] h-[200px] rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                  <svg className="size-full" viewBox="0 0 350 200">
                    {[...Array(5)].map((_, i) => (
                      <circle
                        key={i}
                        cx={Math.random() * 350}
                        cy={Math.random() * 200}
                        r="20"
                        fill="#006334"
                        opacity="0.3"
                      />
                    ))}
                  </svg>
                </div>
                <div className="relative z-10 text-center">
                  <svg className="w-[40px] h-[40px] mx-auto mb-[8px]" fill="none" viewBox="0 0 40 40">
                    <path fill="#006334" d="M20 0C13.383 0 8 5.383 8 12c0 9 12 28 12 28s12-19 12-28c0-6.617-5.383-12-12-12zm0 16c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"/>
                  </svg>
                  <p className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#006334]">
                    點擊地圖選擇位置
                  </p>
                </div>
              </div>
            </div>

            {/* Nearby Locations */}
            <div>
              <h2 className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#1a1c1c] mb-[12px]">
                附近的桌遊店
              </h2>
              <div className="space-y-[12px]">
                {locations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc.name)}
                    className={`w-full text-left bg-white rounded-[12px] p-[16px] border-2 ${
                      selectedLocation === loc.name
                        ? 'border-[#006334] shadow-[0px_2px_4px_0px_rgba(0,99,52,0.2)]'
                        : 'border-[rgba(111,122,112,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]'
                    }`}
                  >
                    <div className="flex items-start gap-[12px]">
                      <div className="size-[48px] bg-gradient-to-br from-[#d1fae5] to-[#9ff5b7] rounded-[8px] flex items-center justify-center shrink-0">
                        <svg className="size-[24px]" fill="none" viewBox="0 0 24 24">
                          <path fill="#006334" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#1a1c1c] mb-[4px]">
                          {loc.name}
                        </div>
                        <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#6f7a70] mb-[2px]">
                          {loc.address}
                        </div>
                        <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#006334]">
                          距離 {loc.distance}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Button */}
          <div className="absolute bottom-[80px] left-0 right-0 px-[20px] pb-[16px]">
            <button
              onClick={handleCreateEvent}
              disabled={!selectedLocation}
              className={`w-full py-[16px] rounded-[12px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[20px] flex items-center justify-center gap-[8px] ${
                selectedLocation
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
