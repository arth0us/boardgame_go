import svgPaths from "./svg-mdbzx7ahmf";
import imgGameIcon from "./9afcabcc3fc5199a6f57eedac6a50913bb48ab3d.png";
import imgFriend from "./cbd66c2c615f43a842b1d1607ea877ef4780ef5f.png";
import imgFriend1 from "./9dce752bbc94b48226a716bed89aec7f1ce30d1f.png";
import imgFriend2 from "./d020dd8d68f5fe55806344f914838c2760a3d9fa.png";
import imgUserProfile from "./da323b5fa02feb423a626d68e21b598add3be94c.png";

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[#006334] text-[24px] w-[96px]">
        <p className="leading-[32px]">遊戲邀請</p>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#e8e8e8] content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#6f7a70] text-[12px] tracking-[0.96px] w-[63.23px]">
        <p className="leading-[16px]">3 則新通知</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Background />
    </div>
  );
}

function GameIcon() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Game Icon">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgGameIcon} />
      </div>
    </div>
  );
}

function Border() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[80px]" data-name="Border">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <GameIcon />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#e2e2e2] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[20px] w-full">
        <p className="leading-[28px]">大富翁：世界之旅</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3f4940] text-[16px] w-full">
        <p>
          <span className="leading-[24px]">{`主辦人: `}</span>
          <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] leading-[24px] not-italic text-[#006334]">王大明</span>
        </p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Container">
          <path d={svgPaths.p1041200} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#006334] content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative rounded-[8px] shadow-[0px_4px_0px_0px_rgba(0,0,0,0.2)] shrink-0" data-name="Button">
      <Container6 />
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white w-[32px]">
        <p className="leading-[24px]">接受</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#e2e2e2] content-stretch flex flex-col items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shadow-[0px_4px_0px_0px_rgba(0,0,0,0.2)] shrink-0" data-name="Button">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[16px] text-center w-[32px]">
        <p className="leading-[24px]">拒絕</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[8px] items-start pt-[12px] relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative self-stretch" data-name="Container">
      <Heading2 />
      <Container4 />
      <Container5 />
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-start p-[24px] relative size-full">
        <Border />
        <Container3 />
      </div>
    </div>
  );
}

function LargeInvitationCard() {
  return (
    <div className="bg-white col-1 justify-self-stretch relative rounded-[8px] row-1 self-start shrink-0" data-name="Large Invitation Card">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <div className="bg-[#b7131a] h-[24px] relative shrink-0 w-full" data-name="Background+HorizontalBorder">
          <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-2 border-solid inset-0 pointer-events-none" />
        </div>
        <Container2 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#bfc9be] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[30.75px] relative shrink-0 w-[32.325px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32.325 30.75">
        <g id="Container">
          <path d={svgPaths.p39affe00} fill="var(--fill-0, #00579A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin() {
  return (
    <div className="relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[8px] relative size-full">
        <Container7 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[12px] text-center tracking-[0.96px] w-[51.84px]">
          <p className="leading-[16px]">本週連勝</p>
        </div>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[18.168px] relative shrink-0 w-[22.074px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.074 18.168">
        <g id="Container">
          <path d={svgPaths.p25da5000} fill="var(--fill-0, #00579A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-white col-1 justify-self-stretch relative rounded-[8px] row-1 self-start shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#bfc9be] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[18px] relative size-full">
          <Margin />
          <Container8 />
          <Container9 />
          <div className="absolute bg-[#00579a] h-[24px] left-[-20px] top-[-324px] w-[390px]" data-name="Background+HorizontalBorder">
            <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-2 border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="relative shrink-0 size-[27px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 27">
        <g id="Container">
          <path d={svgPaths.p2bbdef80} fill="var(--fill-0, #277D4A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin1() {
  return (
    <div className="relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[8px] relative size-full">
        <Container10 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[12px] text-center tracking-[0.96px] w-[51.84px]">
          <p className="leading-[16px]">榮譽積分</p>
        </div>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[32px] justify-center leading-[0] relative shrink-0 text-[#277d4a] text-[24px] text-center w-[70.36px]">
          <p className="leading-[32px]">2,450</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-white col-2 justify-self-stretch relative rounded-[8px] row-1 self-start shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#bfc9be] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[18px] relative size-full">
          <Margin1 />
          <Container11 />
          <Container12 />
          <div className="absolute bg-[#277d4a] h-[24px] left-[-203px] top-[-324px] w-[390px]" data-name="Background+HorizontalBorder">
            <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-2 border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SmallActivityFeedInBentoStyle() {
  return (
    <div className="col-1 gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_132px] justify-self-stretch relative row-2 self-start shrink-0" data-name="Small Activity Feed in Bento Style">
      <BackgroundBorder />
      <BackgroundBorder1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[__188px_132px] relative shrink-0 w-full" data-name="Container">
      <LargeInvitationCard />
      <SmallActivityFeedInBentoStyle />
    </div>
  );
}

function InvitationsSectionBentoGridHero() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Invitations Section: Bento Grid Hero">
      <Container />
      <Container1 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[#006334] text-[24px] w-[96px]">
        <p className="leading-[32px]">好友名單</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[12px] relative shrink-0 w-[16.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 12">
        <g id="Container">
          <path d={svgPaths.p21e50b00} fill="var(--fill-0, #006334)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Button">
      <Container14 />
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#006334] text-[16px] text-center w-[64px]">
        <p className="leading-[24px]">新增好友</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading3 />
      <Button2 />
    </div>
  );
}

function Friend() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Friend">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgFriend} />
      </div>
    </div>
  );
}

function Border1() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[56px]" data-name="Border">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <Friend />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#277d4a] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Container16() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Border1 />
        <div className="absolute bg-[#22c55e] bottom-0 right-0 rounded-[9999px] size-[16px]" data-name="Background+Border">
          <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[9999px]" />
        </div>
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 4">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] h-[27px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[18px] w-[54px]">
        <p className="leading-[27px]">林小美</p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#9ff5b7] content-stretch flex flex-col items-start px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Be_Vietnam_Pro:Bold',sans-serif] h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#00210d] text-[10px] uppercase w-[21.88px]">
        <p className="leading-[15px]">PRO</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Heading4 />
      <Background1 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6f7a70] text-[12px] tracking-[0.96px] w-full">
        <p className="leading-[16px]">正在遊戲中: 卡坦島</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container18 />
        <Container19 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p3ffd6800} fill="var(--fill-0, #6F7A70)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center p-[8px] relative size-full">
        <Container20 />
      </div>
    </div>
  );
}

function FriendRow() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Friend Row 1">
      <div aria-hidden="true" className="absolute border-2 border-[#bfc9be] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[18px] relative size-full">
          <Container16 />
          <Container17 />
          <Button3 />
        </div>
      </div>
    </div>
  );
}

function Friend1() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Friend">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgFriend1} />
      </div>
    </div>
  );
}

function Border2() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[56px]" data-name="Border">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <Friend1 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#e2e2e2] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Border2 />
        <div className="absolute bg-[#a1a1aa] bottom-0 right-0 rounded-[9999px] size-[16px]" data-name="Background+Border">
          <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[9999px]" />
        </div>
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[18px] w-full">
        <p className="leading-[27px]">張學友</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6f7a70] text-[12px] tracking-[0.96px] w-full">
        <p className="leading-[16px]">3小時前在線</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading5 />
        <Container23 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p3ffd6800} fill="var(--fill-0, #6F7A70)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center p-[8px] relative size-full">
        <Container24 />
      </div>
    </div>
  );
}

function FriendRow1() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Friend Row 2">
      <div aria-hidden="true" className="absolute border-2 border-[#bfc9be] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[18px] relative size-full">
          <Container21 />
          <Container22 />
          <Button4 />
        </div>
      </div>
    </div>
  );
}

function Friend2() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Friend">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgFriend2} />
      </div>
    </div>
  );
}

function Border3() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[56px]" data-name="Border">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <Friend2 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#e2e2e2] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Container25() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Border3 />
        <div className="absolute bg-[#a1a1aa] bottom-0 right-0 rounded-[9999px] size-[16px]" data-name="Background+Border">
          <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[9999px]" />
        </div>
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[18px] w-full">
        <p className="leading-[27px]">陳思嘉</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6f7a70] text-[12px] tracking-[0.96px] w-full">
        <p className="leading-[16px]">離線</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading6 />
        <Container27 />
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p3ffd6800} fill="var(--fill-0, #6F7A70)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center p-[8px] relative size-full">
        <Container28 />
      </div>
    </div>
  );
}

function FriendRow2() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Friend Row 3">
      <div aria-hidden="true" className="absolute border-2 border-[#bfc9be] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[18px] relative size-full">
          <Container25 />
          <Container26 />
          <Button5 />
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <FriendRow />
      <FriendRow1 />
      <FriendRow2 />
    </div>
  );
}

function SectionFriendsListTabletopPropertyStyle() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Section - Friends List: Tabletop Property Style">
      <Container13 />
      <Container15 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#006334] text-[24px] w-full">
        <p className="leading-[32px]">近期活動</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#6f7a70] text-[12px] tracking-[0.96px] w-full">
        <p className="leading-[16px]">今天 14:30</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[16px] w-full">
        <p className="mb-0">
          <span className="leading-[24px]">你</span>
          <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] leading-[24px] not-italic">{` 在「`}</span>
          <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] leading-[24px] not-italic text-[#00579a]">璀璨寶石</span>
          <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] leading-[24px] not-italic">」中獲得了第一</span>
        </p>
        <p className="leading-[24px]">名！</p>
      </div>
    </div>
  );
}

function OverlayBorder() {
  return (
    <div className="bg-[rgba(255,255,255,0.5)] content-stretch flex items-start p-[9px] relative rounded-[4px] shrink-0" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[#bfc9be] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[12px] tracking-[0.96px] w-[228.17px]">
        <p className="leading-[16px]">🏆 積分 +50 | 🎖️ 解鎖成就：寶石收藏家</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[11.667px] relative shrink-0 w-[5.833px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.83333 11.6667">
        <g id="Container">
          <path d={svgPaths.p39542ec0} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorderShadow1() {
  return (
    <div className="absolute bg-[#006334] content-stretch flex items-center justify-center left-0 p-[2px] rounded-[9999px] size-[24px] top-[4px]" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Container32 />
    </div>
  );
}

function Activity() {
  return (
    <div className="relative shrink-0 w-full" data-name="Activity 1">
      <div className="content-stretch flex flex-col gap-[4px] items-start pl-[40px] relative size-full">
        <Container30 />
        <Container31 />
        <OverlayBorder />
        <BackgroundBorderShadow1 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#6f7a70] text-[12px] tracking-[0.96px] w-full">
        <p className="leading-[16px]">昨天 18:20</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[16px] w-full">
        <p>
          <span className="leading-[24px]">林小美</span>
          <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] leading-[24px] not-italic">{` 接受了你的好友請求。`}</span>
        </p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[9.333px] relative shrink-0 w-[12.833px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.8333 9.33333">
        <g id="Container">
          <path d={svgPaths.p14caae00} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorderShadow2() {
  return (
    <div className="absolute bg-[#00579a] content-stretch flex items-center justify-center left-0 p-[2px] rounded-[9999px] size-[24px] top-[4px]" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Container35 />
    </div>
  );
}

function Activity1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Activity 2">
      <div className="content-stretch flex flex-col gap-[4px] items-start pl-[40px] relative size-full">
        <Container33 />
        <Container34 />
        <BackgroundBorderShadow2 />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6f7a70] text-[12px] tracking-[0.96px] w-full">
        <p className="leading-[16px]">2天前</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1c] text-[16px] w-full">
        <p className="mb-0">
          <span className="leading-[24px]">張學友</span>
          <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] leading-[24px] not-italic">{` 邀請你參加下週的「`}</span>
          <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] leading-[24px] not-italic text-[#006334]">拼布藝</span>
        </p>
        <p>
          <span className="leading-[24px] text-[#006334]">術</span>
          <span className="leading-[24px]">」錦標賽。</span>
        </p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[8.167px] relative shrink-0 w-[11.649px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6492 8.16667">
        <g id="Container">
          <path d={svgPaths.p2d33000} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorderShadow3() {
  return (
    <div className="absolute bg-[#b7131a] content-stretch flex items-center justify-center left-0 p-[2px] rounded-[9999px] size-[24px] top-[4px]" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Container38 />
    </div>
  );
}

function Activity2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Activity 3">
      <div className="content-stretch flex flex-col gap-[4px] items-start pl-[40px] relative size-full">
        <Container36 />
        <Container37 />
        <BackgroundBorderShadow3 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start relative size-full">
        <div className="absolute bg-[#bfc9be] bottom-[8px] left-[12px] top-[8px] w-[2px]" data-name="Vertical Divider" />
        <Activity />
        <Activity1 />
        <Activity2 />
      </div>
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute bg-[#f3f3f3] inset-0 pointer-events-none rounded-[12px]" />
      <div aria-hidden="true" className="absolute border-2 border-[#bfc9be] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col items-start p-[26px] relative size-full">
        <Container29 />
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function SectionActivityLogVerticalTrackStyle() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start pb-[32px] relative shrink-0 w-full" data-name="Section - Activity Log: Vertical Track style">
      <Heading7 />
      <BackgroundBorderShadow />
    </div>
  );
}

function Main() {
  return (
    <div className="relative shrink-0 w-full" data-name="Main">
      <div className="content-stretch flex flex-col gap-[24px] items-start px-[20px] relative size-full">
        <InvitationsSectionBentoGridHero />
        <SectionFriendsListTabletopPropertyStyle />
        <SectionActivityLogVerticalTrackStyle />
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="relative shrink-0 size-[18.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.6667 18.6667">
        <g id="Container">
          <path d={svgPaths.p11a0ca80} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function FloatingActionButtonFabForSocialContextAddFriendPost() {
  return (
    <div className="absolute bg-[#006334] bottom-[176px] content-stretch flex items-center justify-center right-[24px] rounded-[16px] size-[56px]" data-name="Floating Action Button (FAB) - For Social Context (Add Friend/Post)">
      <div className="absolute bg-[rgba(255,255,255,0)] bottom-0 right-0 rounded-[16px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] size-[56px]" data-name="Floating Action Button (FAB) - For Social Context (Add Friend/Post):shadow" />
      <Container39 />
    </div>
  );
}

function Container41() {
  return (
    <div className="h-[12px] relative shrink-0 w-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 12">
        <g id="Container">
          <path d={svgPaths.p2bce57c0} fill="var(--fill-0, #047857)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <Container41 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 1">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] relative shrink-0 text-[#065f46] text-[20px] tracking-[-1px] uppercase w-[164.75px]">
        <p className="leading-[28px]">BOARDGAME GO!</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Button6 />
        <Heading />
      </div>
    </div>
  );
}

function UserProfile() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="User Profile">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgUserProfile} />
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-[#eee] relative rounded-[9999px] shrink-0 size-[40px]" data-name="Background+Border">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <UserProfile />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#006334] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function HeaderTopAppBar() {
  return (
    <div className="absolute bg-[#ecfdf5] content-stretch flex h-[64px] items-center justify-between left-0 pb-[2px] px-[16px] top-0 w-[390px]" data-name="Header - TopAppBar">
      <div aria-hidden="true" className="absolute border-[#e4e4e7] border-b-2 border-solid inset-0 pointer-events-none shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Container40 />
      <BackgroundBorder2 />
    </div>
  );
}

function Container42() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p176f0bb4} fill="var(--fill-0, #A1A1AA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#a1a1aa] text-[10px] tracking-[1px] uppercase w-[52.63px]">
        <p className="leading-[15px]">EXPLORE</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="relative shrink-0" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center py-[4px] relative size-full">
        <Container42 />
        <Container43 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p33b3fb00} fill="var(--fill-0, #A1A1AA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#a1a1aa] text-[10px] tracking-[1px] uppercase w-[44.3px]">
        <p className="leading-[15px]">CREATE</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="relative shrink-0" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center py-[4px] relative size-full">
        <Container44 />
        <Container45 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="h-[16px] relative shrink-0 w-[22px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 16">
        <g id="Container">
          <path d={svgPaths.p33f99400} fill="var(--fill-0, #047857)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#047857] text-[10px] tracking-[1px] uppercase w-[44.34px]">
        <p className="leading-[15px]">SOCIAL</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="relative rounded-[8px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute bg-[#ecfdf5] bg-clip-padding border-0 border-[transparent] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[16px] py-[4px] relative size-full">
        <Container46 />
        <Container47 />
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-2px_0px_0px_#15803d]" />
    </div>
  );
}

function Container48() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Container">
          <path d={svgPaths.p85bff00} fill="var(--fill-0, #A1A1AA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#a1a1aa] text-[10px] tracking-[1px] uppercase w-[48.91px]">
        <p className="leading-[15px]">PROFILE</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="relative shrink-0" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center py-[4px] relative size-full">
        <Container48 />
        <Container49 />
      </div>
    </div>
  );
}

function BottomNavBar() {
  return (
    <div className="absolute bg-white bottom-[80px] content-stretch flex gap-[37.9px] h-[80px] items-center left-0 pl-[26.97px] pr-[27px] pt-[2px] rounded-tl-[8px] rounded-tr-[8px] w-[390px]" data-name="BottomNavBar">
      <div aria-hidden="true" className="absolute border-[#e4e4e7] border-solid border-t-2 inset-0 pointer-events-none rounded-tl-[8px] rounded-tr-[8px] shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.05)]" />
      <Link />
      <Link1 />
      <Link2 />
      <Link3 />
    </div>
  );
}

export default function SocialV() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[192px] pt-[80px] relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(249, 249, 249) 0%, rgb(249, 249, 249) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="社交與通知 (Social) v3">
      <Main />
      <FloatingActionButtonFabForSocialContextAddFriendPost />
      <HeaderTopAppBar />
      <BottomNavBar />
    </div>
  );
}