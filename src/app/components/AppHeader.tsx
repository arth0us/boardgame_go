export function AppHeader() {
  return (
    <div className="absolute top-0 left-0 right-0 bg-[#fafaf9] h-[64px] flex items-center justify-between px-[16px] pb-[2px] z-50">
      <div aria-hidden="true" className="absolute border-[#e7e5e4] border-b-2 border-solid inset-0 pointer-events-none shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex gap-[12px] items-center relative z-10">
        <div className="relative size-[18px]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path fill="#047857" d="M9 0L11.0728 6.92705L18 9L11.0728 11.0728L9 18L6.92705 11.0728L0 9L6.92705 6.92705L9 0Z" />
          </svg>
        </div>
        <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[20px] text-[#065f46] tracking-[-0.5px] leading-[28px]">
          BoardGame Go!
        </div>
      </div>
      <div className="relative z-10 size-[32px] rounded-full border-2 border-[#277d4a] overflow-hidden">
        <div className="size-full bg-gradient-to-br from-[#277d4a] to-[#065f46]" />
      </div>
    </div>
  );
}
