import { useNavigate, useLocation } from 'react-router';

export function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const isExploreActive = location.pathname === '/explore';
  const isCreateActive = location.pathname === '/create';
  const isSocialActive = location.pathname === '/social';
  const isProfileActive = location.pathname === '/profile';

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-[#fafaf9] h-[80px] flex items-center justify-around px-[24px] pt-[2px] z-50">
      <div aria-hidden="true" className="absolute border-[#e7e5e4] border-solid border-t-2 inset-0 pointer-events-none shadow-[0px_-2px_10px_0px_rgba(0,0,0,0.05)]" />

      {/* Explore Tab */}
      <button
        onClick={() => navigate('/explore')}
        className={`flex flex-col items-center px-[12px] py-[4px] relative z-10 ${isExploreActive ? 'bg-[#d1fae5] rounded-[8px] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.1)]' : ''}`}
      >
        <div className="relative size-[20px] mb-[4px]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path fill={isExploreActive ? "#065F46" : "#78716C"} d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm.5-9.5v3.56l3 1.79-.75 1.23-3.75-2.25V6.5h1.5z" />
          </svg>
        </div>
        <span className={`font-['Be_Vietnam_Pro:Medium',sans-serif] text-[11px] tracking-[0.55px] uppercase leading-[16.5px] ${isExploreActive ? 'text-[#065f46]' : 'text-[#78716c]'}`}>
          EXPLORE
        </span>
      </button>

      {/* Create Tab */}
      <button
        onClick={() => navigate('/create')}
        className={`flex flex-col items-center px-[12px] py-[4px] relative z-10 ${isCreateActive ? 'bg-[#d1fae5] rounded-[8px] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.1)]' : ''}`}
      >
        <div className="relative size-[18px] mb-[4px]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path fill={isCreateActive ? "#065F46" : "#78716C"} d="M9 0C8.44772 0 8 0.447715 8 1V8H1C0.447715 8 0 8.44772 0 9C0 9.55228 0.447715 10 1 10H8V17C8 17.5523 8.44772 18 9 18C9.55228 18 10 17.5523 10 17V10H17C17.5523 10 18 9.55228 18 9C18 8.44772 17.5523 8 17 8H10V1C10 0.447715 9.55228 0 9 0Z" />
          </svg>
        </div>
        <span className={`font-['Be_Vietnam_Pro:Medium',sans-serif] text-[11px] tracking-[0.55px] uppercase leading-[16.5px] ${isCreateActive ? 'text-[#065f46]' : 'text-[#78716c]'}`}>
          CREATE
        </span>
      </button>

      {/* Social Tab */}
      <button
        onClick={() => navigate('/social')}
        className={`flex flex-col items-center px-[12px] py-[4px] relative z-10 ${isSocialActive ? 'bg-[#d1fae5] rounded-[8px] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.1)]' : ''}`}
      >
        <div className="relative w-[22px] h-[16px] mb-[4px]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 16">
            <path fill={isSocialActive ? "#065F46" : "#78716C"} d="M15 7C16.66 7 17.99 5.66 17.99 4C17.99 2.34 16.66 1 15 1C13.34 1 12 2.34 12 4C12 5.66 13.34 7 15 7ZM7 7C8.66 7 9.99 5.66 9.99 4C9.99 2.34 8.66 1 7 1C5.34 1 4 2.34 4 4C4 5.66 5.34 7 7 7ZM7 9C4.67 9 0 10.17 0 12.5V15H14V12.5C14 10.17 9.33 9 7 9ZM15 9C14.71 9 14.38 9.02 14.03 9.05C15.19 9.89 16 11.02 16 12.5V15H22V12.5C22 10.17 17.33 9 15 9Z" />
          </svg>
        </div>
        <span className={`font-['Be_Vietnam_Pro:Medium',sans-serif] text-[11px] tracking-[0.55px] uppercase leading-[16.5px] ${isSocialActive ? 'text-[#065f46]' : 'text-[#78716c]'}`}>
          SOCIAL
        </span>
      </button>

      {/* Profile Tab */}
      <button
        onClick={() => navigate('/profile')}
        className={`flex flex-col items-center px-[12px] py-[4px] relative z-10 ${isProfileActive ? 'bg-[#d1fae5] rounded-[8px] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.1)]' : ''}`}
      >
        <div className="relative size-[16px] mb-[4px]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <path fill={isProfileActive ? "#065F46" : "#78716C"} d="M8 0C6.34315 0 5 1.34315 5 3C5 4.65685 6.34315 6 8 6C9.65685 6 11 4.65685 11 3C11 1.34315 9.65685 0 8 0ZM2 14C2 11.7909 5.58172 10 8 10C10.4183 10 14 11.7909 14 14V16H2V14Z" />
          </svg>
        </div>
        <span className={`font-['Be_Vietnam_Pro:Medium',sans-serif] text-[11px] tracking-[0.55px] uppercase leading-[16.5px] ${isProfileActive ? 'text-[#065f46]' : 'text-[#78716c]'}`}>
          PROFILE
        </span>
      </button>
    </div>
  );
}
