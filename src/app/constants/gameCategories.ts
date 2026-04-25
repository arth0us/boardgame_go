export interface GameCategory {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  icon: string;
}

export const GAME_CATEGORIES: GameCategory[] = [
  { id: 'strategy', name: 'Strategy', color: '#00579A', bgColor: '#d3e4ff', icon: '🎯' },
  { id: 'party', name: 'Party', color: '#B7131A', bgColor: '#ffdad6', icon: '🎉' },
  { id: 'card', name: 'Card', color: '#006334', bgColor: '#9ff5b7', icon: '🃏' },
  { id: 'classic', name: 'Classic', color: '#3f4940', bgColor: '#e2e2e2', icon: '🎲' },
];
