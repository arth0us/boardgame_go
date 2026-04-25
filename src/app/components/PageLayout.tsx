import { ReactNode } from 'react';
import { AppHeader } from './AppHeader';
import { BottomNavigation } from './BottomNavigation';

interface PageLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showBottomNav?: boolean;
}

export function PageLayout({ children, showHeader = true, showBottomNav = true }: PageLayoutProps) {
  return (
    <div className="size-full relative bg-[#f9f9f9] overflow-hidden">
      {showHeader && <AppHeader />}
      <div className="absolute inset-0" style={{ top: showHeader ? '64px' : '0', bottom: showBottomNav ? '80px' : '0' }}>
        {children}
      </div>
      {showBottomNav && <BottomNavigation />}
    </div>
  );
}
