import svgPaths from "./svg-tcxn2gf36u";
import imgGamePieces from "./6abcb1229455fba59325a5cb01dd9a0928a41b17.png";
import imgUserProfile from "./53014729e726b7ad8cc060cf893ca1ba9679fa15.png";

function Container() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Container">
          <path d={svgPaths.p15494480} fill="var(--fill-0, #78716C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center p-[8px] relative size-full">
        <Container />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="relative shrink-0" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#047857] text-[16px] tracking-[-0.4px] uppercase w-[78.02px]">
          <p className="leading-[24px]">發起新活動</p>
        </div>
      </div>
    </div>
  );
}

function HeaderSubPageTitleBar() {
  return (
    <div className="bg-[#fafaf9] h-[56px] relative shrink-0 w-full" data-name="Header - Sub-page Title Bar">
      <div aria-hidden="true" className="absolute border-[rgba(6,78,59,0.1)] border-b-2 border-solid inset-0 pointer-events-none shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[2px] pl-[16px] pr-[155.98px] relative size-full">
          <Button />
          <Heading1 />
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#006334] content-stretch flex flex-col items-center justify-center pb-[12px] pt-[10px] px-[20px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#84d89c] border-b-2 border-solid inset-0 pointer-events-none rounded-[9999px] shadow-[0px_4px_0px_0px_rgba(0,0,0,0.1)]" />
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white w-[64px]">
        <p className="leading-[24px]">遊戲類別</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#e8e8e8] content-stretch flex flex-col items-center justify-center opacity-60 pb-[12px] pt-[10px] px-[20px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#bfc9be] border-b-2 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#3f4940] text-[16px] text-center w-[64px]">
        <p className="leading-[24px]">時間設定</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#e8e8e8] content-stretch flex flex-col items-center justify-center opacity-60 pb-[12px] pt-[10px] px-[20px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#bfc9be] border-b-2 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#3f4940] text-[16px] text-center w-[64px]">
        <p className="leading-[24px]">地點經驗</p>
      </div>
    </div>
  );
}

function TabsSection() {
  return (
    <div className="content-stretch flex gap-[8px] items-start overflow-clip pb-[8px] relative shrink-0 w-full" data-name="Tabs Section">
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function ProgressIndicator() {
  return (
    <div className="bg-[#eee] content-stretch flex gap-[4px] h-[12px] items-start justify-center overflow-clip relative rounded-[9999px] shrink-0 w-full" data-name="Progress Indicator">
      <div className="bg-[#006334] flex-[1_0_0] h-full min-w-px" data-name="Background" />
      <div className="bg-[#e2e2e2] flex-[1_0_0] h-full min-w-px" data-name="Background" />
      <div className="bg-[#e2e2e2] flex-[1_0_0] h-full min-w-px" data-name="Background" />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[16px] w-full">
        <p className="leading-[24px]">選擇遊戲類型</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p273ff00} fill="var(--fill-0, #00579A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#d3e4ff] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[48px]" data-name="Background">
      <Container3 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[16px] text-center w-[65.84px]">
        <p className="leading-[24px]">Strategy</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-center p-[16px] relative size-full">
          <Background />
          <Container4 />
        </div>
      </div>
    </div>
  );
}

function Strategy() {
  return (
    <div className="bg-[#f9f9f9] col-1 justify-self-stretch relative rounded-[8px] row-1 self-start shrink-0" data-name="Strategy">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <div className="bg-[#00579a] h-[12px] relative shrink-0 w-full" data-name="Background+HorizontalBorder">
          <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b border-solid inset-0 pointer-events-none" />
        </div>
        <Container2 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(111,122,112,0.2)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[20.5px] relative shrink-0 w-[21.55px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.55 20.5">
        <g id="Container">
          <path d={svgPaths.p13ae4980} fill="var(--fill-0, #B7131A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#ffdad6] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[48px]" data-name="Background">
      <Container6 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[16px] text-center w-[39px]">
        <p className="leading-[24px]">Party</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-center p-[16px] relative size-full">
          <Background1 />
          <Container7 />
        </div>
      </div>
    </div>
  );
}

function Party() {
  return (
    <div className="bg-[#f9f9f9] col-2 justify-self-stretch relative rounded-[8px] row-1 self-start shrink-0" data-name="Party">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <div className="bg-[#b7131a] h-[12px] relative shrink-0 w-full" data-name="Background+HorizontalBorder">
          <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b border-solid inset-0 pointer-events-none" />
        </div>
        <Container5 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(111,122,112,0.2)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[18.996px] relative shrink-0 w-[19.992px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.992 18.996">
        <g id="Container">
          <path d={svgPaths.p2dd3b500} fill="var(--fill-0, #006334)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#9ff5b7] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[48px]" data-name="Background">
      <Container9 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[16px] text-center w-[37.58px]">
        <p className="leading-[24px]">Card</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-center p-[16px] relative size-full">
          <Background2 />
          <Container10 />
        </div>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="bg-[#f9f9f9] col-1 justify-self-stretch relative rounded-[8px] row-2 self-start shrink-0" data-name="Card">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <div className="bg-[#006334] h-[12px] relative shrink-0 w-full" data-name="Background+HorizontalBorder">
          <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b border-solid inset-0 pointer-events-none" />
        </div>
        <Container8 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(111,122,112,0.2)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p1067e200} fill="var(--fill-0, #3F4940)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#e2e2e2] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[48px]" data-name="Background">
      <Container12 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[16px] text-center w-[54.88px]">
        <p className="leading-[24px]">Classic</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-center p-[16px] relative size-full">
          <Background3 />
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function Classic() {
  return (
    <div className="bg-[#f9f9f9] col-2 justify-self-stretch relative rounded-[8px] row-2 self-start shrink-0" data-name="Classic">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <div className="bg-[#3f4940] h-[12px] relative shrink-0 w-full" data-name="Background+HorizontalBorder">
          <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b border-solid inset-0 pointer-events-none" />
        </div>
        <Container11 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(111,122,112,0.2)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function CategoryGrid() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[__132px_132px] relative shrink-0 w-full" data-name="Category Grid">
      <Strategy />
      <Party />
      <Card />
      <Classic />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <CategoryGrid />
    </div>
  );
}

function GamePieces() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Game Pieces">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgGamePieces} />
      </div>
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[64px]" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute bg-clip-padding bg-white border-0 border-[transparent] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <GamePieces />
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_4px_2px_rgba(0,0,0,0.05)]" />
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[16px] w-[96px]">
        <p className="leading-[24px]">發起您的帝國</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[#3f4940] text-[12px] tracking-[0.96px] w-[207.38px]">
        <p className="leading-[16px] mb-0">選擇一個適合的主題，吸引最好的玩</p>
        <p className="leading-[16px]">家加入您的局。</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0 w-[207.38px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading3 />
        <Container15 />
      </div>
    </div>
  );
}

function DescriptiveVisualComponent() {
  return (
    <div className="bg-[#eee] relative rounded-[12px] shrink-0 w-full" data-name="Descriptive Visual Component">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(111,122,112,0.2)] border-dashed inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[26px] relative size-full">
          <BackgroundBorderShadow />
          <Container14 />
        </div>
      </div>
    </div>
  );
}

function MainScrollableContentArea() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Main - Scrollable Content Area">
      <div className="content-stretch flex flex-col gap-[24px] items-start pb-[96px] pt-[24px] px-[20px] relative size-full">
        <TabsSection />
        <ProgressIndicator />
        <Container1 />
        <DescriptiveVisualComponent />
      </div>
    </div>
  );
}

function SubPageContainer() {
  return (
    <div className="absolute bg-[#f9f9f9] content-stretch flex flex-col inset-[64px_0_0_0] items-start" data-name="Sub-page Container">
      <HeaderSubPageTitleBar />
      <MainScrollableContentArea />
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[20.071px] relative shrink-0 w-[20.047px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.0467 20.0706">
        <g id="Container">
          <path d={svgPaths.p6551200} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BottomActionButtonButton() {
  return (
    <div className="absolute bg-[#006334] content-stretch flex gap-[8px] items-center justify-center left-[20px] py-[16px] rounded-[12px] shadow-[0px_4px_0px_0px_rgba(0,0,0,0.2)] top-[740px] w-[350px]" data-name="Bottom Action Button → Button">
      <Container16 />
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-center text-white w-[140px]">
        <p className="leading-[28px]">確認並發起活動</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p176f0bb4} fill="var(--fill-0, #78716C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Be_Vietnam_Pro:Medium',sans-serif] h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#78716c] text-[11px] tracking-[0.55px] uppercase w-[55.83px]">
        <p className="leading-[16.5px]">EXPLORE</p>
      </div>
    </div>
  );
}

function ExploreTab() {
  return (
    <div className="relative shrink-0" data-name="Explore Tab">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[12px] py-[4px] relative size-full">
        <Container17 />
        <Margin />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p1424ff80} fill="var(--fill-0, #065F46)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Be_Vietnam_Pro:Medium',sans-serif] h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#065f46] text-[11px] tracking-[0.55px] uppercase w-[47.63px]">
        <p className="leading-[16.5px]">CREATE</p>
      </div>
    </div>
  );
}

function CreateTabActive() {
  return (
    <div className="relative rounded-[8px] shrink-0" data-name="Create Tab (Active)">
      <div aria-hidden="true" className="absolute bg-[#d1fae5] bg-clip-padding border-0 border-[transparent] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[12px] py-[4px] relative size-full">
        <Container18 />
        <Margin1 />
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[16px] relative shrink-0 w-[22px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 16">
        <g id="Container">
          <path d={svgPaths.p39955c80} fill="var(--fill-0, #78716C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Be_Vietnam_Pro:Medium',sans-serif] h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#78716c] text-[11px] tracking-[0.55px] uppercase w-[46.31px]">
        <p className="leading-[16.5px]">SOCIAL</p>
      </div>
    </div>
  );
}

function SocialTab() {
  return (
    <div className="relative shrink-0" data-name="Social Tab">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[12px] py-[4px] relative size-full">
        <Container19 />
        <Margin2 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Container">
          <path d={svgPaths.p85bff00} fill="var(--fill-0, #78716C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Be_Vietnam_Pro:Medium',sans-serif] h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#78716c] text-[11px] tracking-[0.55px] uppercase w-[51.22px]">
        <p className="leading-[16.5px]">PROFILE</p>
      </div>
    </div>
  );
}

function ProfileTab() {
  return (
    <div className="relative shrink-0" data-name="Profile Tab">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[12px] py-[4px] relative size-full">
        <Container20 />
        <Margin3 />
      </div>
    </div>
  );
}

function BottomNavigationShellSyncedWithScreen() {
  return (
    <div className="absolute bg-[#fafaf9] bottom-0 content-stretch flex gap-[15.2px] h-[80px] items-center left-0 pl-[23.63px] pr-[23.64px] pt-[2px] w-[390px]" data-name="Bottom Navigation Shell (Synced with SCREEN_37)">
      <div aria-hidden="true" className="absolute border-[#e7e5e4] border-solid border-t-2 inset-0 pointer-events-none shadow-[0px_-2px_10px_0px_rgba(0,0,0,0.05)]" />
      <ExploreTab />
      <CreateTabActive />
      <SocialTab />
      <ProfileTab />
    </div>
  );
}

function Container22() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p1067e200} fill="var(--fill-0, #047857)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 1">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] relative shrink-0 text-[#065f46] text-[20px] tracking-[-0.5px] w-[151.55px]">
        <p className="leading-[28px]">BoardGame Go!</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container22 />
        <Heading />
      </div>
    </div>
  );
}

function UserProfile() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="User profile">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgUserProfile} />
      </div>
    </div>
  );
}

function Border() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[32px]" data-name="Border">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <UserProfile />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#277d4a] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function MainAppHeaderBoardGameGoMatchedToScreen() {
  return (
    <div className="absolute bg-[#fafaf9] content-stretch flex h-[64px] items-center justify-between left-0 pb-[2px] px-[16px] top-0 w-[390px]" data-name="Main App Header (BoardGame Go!) matched to SCREEN_37">
      <div aria-hidden="true" className="absolute border-[#e7e5e4] border-b-2 border-solid inset-0 pointer-events-none shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Container21 />
      <Border />
    </div>
  );
}

export default function Standardized() {
  return (
    <div className="relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(249, 249, 249) 0%, rgb(249, 249, 249) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="發起新活動 - 遊戲類別 (Standardized)">
      <SubPageContainer />
      <BottomActionButtonButton />
      <BottomNavigationShellSyncedWithScreen />
      <MainAppHeaderBoardGameGoMatchedToScreen />
    </div>
  );
}