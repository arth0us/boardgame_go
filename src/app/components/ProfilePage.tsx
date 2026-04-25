import { PageLayout } from './PageLayout';

import { useNavigate } from 'react-router';

export function ProfilePage() {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="size-full overflow-y-auto bg-[#f9f9f9] p-[20px] flex flex-col gap-[24px]">
        {/* User Info Card */}
        <div className="bg-white rounded-[12px] p-[24px] border-2 border-[rgba(111,122,112,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col items-center gap-[16px]">
            <div className="size-[80px] rounded-full border-4 border-[#277d4a] overflow-hidden">
              <div className="size-full bg-gradient-to-br from-[#277d4a] to-[#065f46]" />
            </div>
            <div className="text-center">
              <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[20px] text-[#1a1c1c] mb-[4px]">
                桌遊玩家
              </div>
              <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#6f7a70]">
                已參與 12 場桌遊聚會
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-[12px]">
          <div className="bg-[#d1fae5] rounded-[8px] p-[16px] text-center">
            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[24px] text-[#065f46] mb-[4px]">
              12
            </div>
            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#065f46]">
              已參與
            </div>
          </div>
          <div className="bg-[#d1fae5] rounded-[8px] p-[16px] text-center">
            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[24px] text-[#065f46] mb-[4px]">
              5
            </div>
            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#065f46]">
              發起活動
            </div>
          </div>
          <div className="bg-[#d1fae5] rounded-[8px] p-[16px] text-center">
            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[24px] text-[#065f46] mb-[4px]">
              8
            </div>
            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#065f46]">
              好友數
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] overflow-hidden">
          <div className="p-[16px] border-b border-[#e7e5e4]">
            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[16px] text-[#1a1c1c]">
              我的設定
            </div>
          </div>
          <div className="p-[16px] border-b border-[#e7e5e4]">
            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#3f4940]">
              偏好遊戲類型
            </div>
          </div>
          <div className="p-[16px] border-b border-[#e7e5e4]">
            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#3f4940]">
              通知設定
            </div>
          </div>
          <div className="p-[16px]">
            <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#3f4940]">
              隱私設定
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
