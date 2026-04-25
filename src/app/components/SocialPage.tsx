import { PageLayout } from './PageLayout';

export function SocialPage() {
  const notifications = [
    { id: 1, type: 'join', user: '小明', event: '週末策略桌遊局', time: '5 分鐘前' },
    { id: 2, type: 'friend', user: '小華', time: '1 小時前' },
    { id: 3, type: 'message', user: '阿強', message: '今天還有位子嗎？', time: '2 小時前' },
  ];

  return (
    <PageLayout>
      <div className="size-full overflow-y-auto bg-[#f9f9f9] p-[20px]">
        <h1 className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[24px] text-[#1a1c1c] mb-[24px]">
          通知
        </h1>

        <div className="space-y-[12px]">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className="bg-white rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-[16px]"
            >
              <div className="flex items-start gap-[12px]">
                <div className="size-[48px] rounded-full border-2 border-[#277d4a] bg-gradient-to-br from-[#277d4a] to-[#065f46] shrink-0" />
                <div className="flex-1">
                  <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#1a1c1c] mb-[4px]">
                    {notif.type === 'join' && (
                      <><span className="font-bold">{notif.user}</span> 加入了您的活動「{notif.event}」</>
                    )}
                    {notif.type === 'friend' && (
                      <><span className="font-bold">{notif.user}</span> 想要加您為好友</>
                    )}
                    {notif.type === 'message' && (
                      <><span className="font-bold">{notif.user}</span> 傳訊息給您：「{notif.message}」</>
                    )}
                  </div>
                  <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#6f7a70]">
                    {notif.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
