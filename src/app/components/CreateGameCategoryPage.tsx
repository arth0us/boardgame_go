import { useNavigate } from 'react-router';
import { PageLayout } from './PageLayout';
import { useState } from 'react';

export function CreateGameCategoryPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = [
    { id: 'strategy', name: 'Strategy', color: '#00579A', bgColor: '#d3e4ff', icon: '🎯' },
    { id: 'party', name: 'Party', color: '#B7131A', bgColor: '#ffdad6', icon: '🎉' },
    { id: 'card', name: 'Card', color: '#006334', bgColor: '#9ff5b7', icon: '🃏' },
    { id: 'classic', name: 'Classic', color: '#3f4940', bgColor: '#e2e2e2', icon: '🎲' },
  ];

  return (
    <PageLayout showHeader={false}>
      <div className="size-full bg-[#f9f9f9] relative">
        {/* Sub-page Header */}
        <div className="bg-[#fafaf9] h-[56px] flex items-center px-[16px] border-b-2 border-[rgba(6,78,59,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <button onClick={() => navigate('/explore')} className="size-[14px] flex items-center justify-center mr-[16px]">
            <svg className="size-full" fill="none" viewBox="0 0 14 14">
              <path fill="#78716C" d="M14 6H4.83l4.59-4.59L8 0 0 8l8 8 1.41-1.41L4.83 10H14V6z"/>
            </svg>
          </button>
          <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#047857] uppercase tracking-[-0.4px]">
            發起新活動
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto" style={{ height: 'calc(100% - 56px)' }}>
          <div className="p-[20px] pb-[120px]">
            {/* Tabs */}
            <div className="flex gap-[8px] mb-[16px]">
              <button className="bg-[#006334] text-white px-[20px] py-[10px] rounded-full font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] border-b-2 border-[#84d89c] shadow-[0px_4px_0px_0px_rgba(0,0,0,0.1)]">
                遊戲類別
              </button>
              <button className="bg-[#e8e8e8] text-[#3f4940] px-[20px] py-[10px] rounded-full font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] opacity-60 border-b-2 border-[#bfc9be]">
                時間設定
              </button>
              <button className="bg-[#e8e8e8] text-[#3f4940] px-[20px] py-[10px] rounded-full font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] opacity-60 border-b-2 border-[#bfc9be]">
                地點經驗
              </button>
            </div>

            {/* Progress */}
            <div className="bg-[#eee] h-[12px] rounded-full flex gap-[4px] mb-[24px]">
              <div className="bg-[#006334] flex-1 rounded-full" />
              <div className="bg-[#e2e2e2] flex-1 rounded-full" />
              <div className="bg-[#e2e2e2] flex-1 rounded-full" />
            </div>

            {/* Title */}
            <h2 className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#1a1c1c] mb-[16px]">
              選擇遊戲類型
            </h2>

            {/* Category Grid */}
            <div className="grid grid-cols-2 gap-[16px] mb-[24px]">
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
                    <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#1a1c1c] text-center">
                      {cat.name}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Info Card */}
            <div className="bg-[#eee] rounded-[12px] border-2 border-dashed border-[rgba(111,122,112,0.2)] p-[26px] flex gap-[16px]">
              <div className="size-[64px] bg-white rounded-[8px] border-2 border-white shadow-[inset_0px_2px_4px_2px_rgba(0,0,0,0.05)] overflow-hidden flex items-center justify-center text-[32px]">
                🎲
              </div>
              <div className="flex-1">
                <h3 className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#1a1c1c] mb-[4px]">
                  發起您的帝國
                </h3>
                <p className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#3f4940] tracking-[0.96px] leading-[16px]">
                  選擇一個適合的主題，吸引最好的玩家加入您的局。
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Button */}
          <div className="absolute bottom-[80px] left-0 right-0 px-[20px] pb-[16px]">
            <button
              onClick={() => navigate('/create/time')}
              disabled={!selectedCategory}
              className={`w-full py-[16px] rounded-[12px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[20px] flex items-center justify-center gap-[8px] ${
                selectedCategory
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
