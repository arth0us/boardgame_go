import { useNavigate } from 'react-router';
import { PageLayout } from './PageLayout';

export function EventDetailsPage() {
  const navigate = useNavigate();

  return (
    <PageLayout showHeader={false}>
      <div className="size-full overflow-y-auto bg-[#f9f9f9]">
        {/* Custom Header with Back Button */}
        <div className="bg-[#fafaf9] h-[56px] flex items-center px-[16px] border-b-2 border-[rgba(6,78,59,0.1)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <button onClick={() => navigate('/explore')} className="size-[30px] flex items-center justify-center">
            <svg className="size-full" fill="none" viewBox="0 0 30 30">
              <path fill="#78716C" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </button>
          <div className="flex-1 text-center font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#047857] uppercase tracking-[-0.4px]">
            活動詳情
          </div>
          <div className="w-[30px]" />
        </div>

        {/* Event Image */}
        <div className="h-[240px] bg-gradient-to-br from-[#d1fae5] to-[#9ff5b7]" />

        {/* Event Details */}
        <div className="p-[20px]">
          <div className="bg-white rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-[20px] mb-[16px]">
            <div className="flex items-start justify-between mb-[16px]">
              <h1 className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[24px] text-[#1a1c1c] flex-1">
                週末策略桌遊局
              </h1>
              <div className="bg-[#d1fae5] px-[12px] py-[6px] rounded-[8px]">
                <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#006334]">
                  Strategy
                </span>
              </div>
            </div>

            <div className="space-y-[12px]">
              <div className="flex items-center gap-[12px]">
                <svg className="size-[20px]" fill="none" viewBox="0 0 20 20">
                  <path fill="#6f7a70" d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H9v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
                <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#3f4940]">
                  今天 19:00 - 22:00
                </span>
              </div>

              <div className="flex items-center gap-[12px]">
                <svg className="size-[20px]" fill="none" viewBox="0 0 20 20">
                  <path fill="#6f7a70" d="M10 0C6.13 0 3 3.13 3 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#3f4940]">
                  台北市大安區羅斯福路三段 283 巷
                </span>
              </div>

              <div className="flex items-center gap-[12px]">
                <svg className="size-[20px]" fill="none" viewBox="0 0 20 20">
                  <path fill="#6f7a70" d="M10 0C7.79 0 6 1.79 6 4c0 2.21 1.79 4 4 4s4-1.79 4-4c0-2.21-1.79-4-4-4zM10 10c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z"/>
                </svg>
                <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#3f4940]">
                  還需 2 人 (共 4 人)
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-[20px] mb-[16px]">
            <h2 className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[18px] text-[#1a1c1c] mb-[12px]">
              活動說明
            </h2>
            <p className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#3f4940] leading-[20px]">
              歡迎喜歡策略遊戲的朋友一起來玩！我們會玩農家樂、璀璨寶石等經典策略遊戲。適合有基礎經驗的玩家，新手也歡迎（會提供教學）。
            </p>
          </div>

          {/* Host */}
          <div className="bg-white rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-[20px] mb-[96px]">
            <h2 className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[18px] text-[#1a1c1c] mb-[12px]">
              主揪
            </h2>
            <div className="flex items-center gap-[12px]">
              <div className="size-[48px] rounded-full border-2 border-[#277d4a] bg-gradient-to-br from-[#277d4a] to-[#065f46]" />
              <div>
                <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#1a1c1c]">
                  桌遊達人
                </div>
                <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#6f7a70]">
                  已舉辦 15 場活動
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Join Button */}
        <div className="fixed bottom-[80px] left-0 right-0 px-[20px] pb-[16px] bg-gradient-to-t from-[#f9f9f9] via-[#f9f9f9] to-transparent pt-[24px]">
          <button className="w-full bg-[#006334] text-white py-[16px] rounded-[12px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[20px] shadow-[0px_4px_0px_0px_rgba(0,0,0,0.2)] flex items-center justify-center gap-[8px]">
            <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 20 20">
              <path fill="white" d="M10 0C9.44772 0 9 0.447715 9 1V9H1C0.447715 9 0 9.44772 0 10C0 10.5523 0.447715 11 1 11H9V19C9 19.5523 9.44772 20 10 20C10.5523 20 11 19.5523 11 19V11H19C19.5523 11 20 10.5523 20 10C20 9.44772 19.5523 9 19 9H11V1C11 0.447715 10.5523 0 10 0Z"/>
            </svg>
            加入活動
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
