export type ExploreCategoryId = 'strategy' | 'party' | 'card' | 'classic';

export interface ExploreDemoEvent {
  id: string;
  title: string;
  categoryId: ExploreCategoryId;
  location: string;
  locationAddress: string;
  distance: string;
  time: string;
  timeRange: string;
  neededPlayers: string;
  participantText: string;
  imageFrom: string;
  imageTo: string;
  description: string;
  hostName: string;
  hostEventCount: number;
}

export const EXPLORE_DEMO_EVENTS: ExploreDemoEvent[] = [
  {
    id: '1',
    title: '週末策略桌遊局',
    categoryId: 'strategy',
    location: '台北市大安區',
    locationAddress: '台北市大安區羅斯福路三段 283 巷',
    distance: '0.5km',
    time: '今天 19:00',
    timeRange: '今天 19:00 - 22:00',
    neededPlayers: '還需 2 人',
    participantText: '還需 2 人 (共 4 人)',
    imageFrom: '#d1fae5',
    imageTo: '#9ff5b7',
    description: '歡迎喜歡策略遊戲的朋友一起來玩！本場會玩璀璨寶石、卡坦島等中度策略遊戲，新手也可以加入，現場會快速教學。',
    hostName: '策略小隊長',
    hostEventCount: 15,
  },
  {
    id: '2',
    title: '歡樂派對夜',
    categoryId: 'party',
    location: '台北市信義區',
    locationAddress: '台北市信義區松仁路 28 號',
    distance: '1.1km',
    time: '今晚 20:00',
    timeRange: '今晚 20:00 - 23:00',
    neededPlayers: '還需 1 人',
    participantText: '還需 1 人 (共 6 人)',
    imageFrom: '#ffe4e6',
    imageTo: '#fecdd3',
    description: '下班後的輕鬆派對場，會玩妙語說書人、誰是牛頭王等互動遊戲，歡迎帶朋友一起來熱鬧一下。',
    hostName: '派對王阿豪',
    hostEventCount: 22,
  },
  {
    id: '3',
    title: '卡牌對戰練習團',
    categoryId: 'card',
    location: '台北市中正區',
    locationAddress: '台北市中正區汀州路三段 160 號',
    distance: '1.6km',
    time: '明天 14:00',
    timeRange: '明天 14:00 - 17:00',
    neededPlayers: '還需 3 人',
    participantText: '還需 3 人 (共 5 人)',
    imageFrom: '#dcfce7',
    imageTo: '#86efac',
    description: '想提升卡牌操作與觀念的玩家歡迎加入，本場以實戰對局＋簡短賽後檢討為主，適合想進步的你。',
    hostName: '卡牌研究員',
    hostEventCount: 10,
  },
  {
    id: '4',
    title: '經典桌遊新手場',
    categoryId: 'classic',
    location: '台北市松山區',
    locationAddress: '台北市松山區八德路三段 200 號',
    distance: '2.0km',
    time: '週六 15:00',
    timeRange: '週六 15:00 - 18:00',
    neededPlayers: '還需 2 人',
    participantText: '還需 2 人 (共 4 人)',
    imageFrom: '#e5e7eb',
    imageTo: '#d1d5db',
    description: '給第一次接觸桌遊的朋友，從規則簡單但耐玩的經典作品開始，節奏輕鬆，重點是玩得開心。',
    hostName: '經典收藏家',
    hostEventCount: 8,
  },
];
