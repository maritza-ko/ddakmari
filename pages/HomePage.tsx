

import React from 'react';
import { Link } from 'react-router-dom'; // Keep for potential internal links if any, though nav is now anchor
import { THEME_COLORS, PhoneIcon, EmailIcon, MapPinIcon, ChatBubbleIcon } from '../constants';
import type { MenuItem, FranchiseTier, SuccessStory } from '../types';
import SectionTitle from '../components/SectionTitle';

// Removed all asset imports like:
// import img1png from '../assets/images/1.png';
// ...
// import videoBrandIntro from '../assets/videos/1.mp4';
// ...

// Define placeholder paths directly
const placeholderMenuImgPath = "assets/images/placeholder_menu.png";
const placeholderPersonImgPath = "assets/images/placeholder_person.png";


// Re-inline MenuCard, FranchiseTierCard, StoryCard, ContactInfoItem as they are now part of HomePage
const MenuCard: React.FC<{ item: MenuItem }> = ({ item }) => (
  <div className="rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 flex flex-col h-full bg-white">
    <img
      src={item.image || placeholderMenuImgPath}
      alt={item.name}
      className="w-full h-56 object-cover"
    />
    <div className="p-6 flex flex-col flex-grow">
      <h3 className={`text-xl font-semibold mb-2 text-[${THEME_COLORS.MOCHA}]`}>{item.name}</h3>
      <p className={`text-sm flex-grow text-[${THEME_COLORS.MOCHA}]`}>{item.description}</p>
      {item.price && <p className={`mt-3 text-lg font-bold text-[${THEME_COLORS.GOLD}]`}>{item.price}</p>}
    </div>
  </div>
);

const FranchiseTierCard: React.FC<{ tier: FranchiseTier, color: string, isEnhanced?: boolean }> = ({ tier, color, isEnhanced }) => (
  <div className={`border-2 rounded-xl shadow-xl p-6 flex flex-col h-full hover:shadow-2xl transition-shadow duration-300 border-[${color}] bg-white`}>
    <span className={`text-xs font-semibold uppercase tracking-wider mb-1 text-[${color}]`}>LEVEL {tier.level}</span>
    <h3 className={`text-2xl font-bold mb-3 text-[${THEME_COLORS.MOCHA}]`}>{tier.name}</h3>
    <p className={`font-semibold mb-3 text-[${color}]`}>{tier.coreBenefit}</p>
    <div className={`text-sm space-y-2 flex-grow text-[${THEME_COLORS.MOCHA}]`}>
      <p><strong>주요 특징:</strong> {tier.requirements}</p>
      <p><strong>BI 사용:</strong> {tier.biUsage}</p>
      <p><strong>상권 보호:</strong> {tier.territoryProtection}</p>
      <p><strong>디지털 권리금:</strong> {tier.premium}</p>
      {isEnhanced && tier.benefitsDetails && (
        <ul className="list-disc list-inside mt-2 space-y-1">
          {tier.benefitsDetails.map((detail, index) => <li key={index}>{detail}</li>)}
        </ul>
      )}
      <p className="mt-2"><strong>핵심 혜택:</strong> {tier.benefits}</p>
    </div>
  </div>
);

const StoryCard: React.FC<{ story: SuccessStory }> = ({ story }) => (
  <div className="rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row items-center gap-6 p-6 bg-white">
    <img
      src={story.image || placeholderPersonImgPath}
      alt={story.franchisee}
      className="w-48 h-48 rounded-full object-cover shadow-md md:w-1/3"
    />
    <div className="md:w-2/3">
      <h3 className={`text-2xl font-semibold mb-2 text-[${THEME_COLORS.GOLD}]`}>{story.title}</h3>
      <p className={`italic text-md mb-3 text-[${THEME_COLORS.MOCHA}]`}>"{story.quote}"</p>
      <p className={`font-medium mb-3 text-right text-[${THEME_COLORS.MOCHA}]`}>- {story.franchisee} {story.age && `(${story.age}세)`}</p>
      <div className={`mt-4 border-t pt-3 border-[${THEME_COLORS.TURQUOISE}]/30`}>
        <h4 className={`text-sm font-semibold mb-1 text-[${THEME_COLORS.TURQUOISE}]`}>Key Metrics:</h4>
        <ul className={`list-disc list-inside text-sm space-y-1 text-[${THEME_COLORS.MOCHA}]`}>
          {story.metrics.map(metric => <li key={metric.label}><strong>{metric.label}:</strong> {metric.value}</li>)}
        </ul>
      </div>
    </div>
  </div>
);

const ContactInfoItem: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className={`flex items-start space-x-4 p-4 rounded-lg hover:bg-[${THEME_COLORS.GOLD}]/10 transition-colors duration-200`}>
    <div className={`flex-shrink-0 w-8 h-8 mt-1 text-[${THEME_COLORS.GOLD}]`}>{icon}</div>
    <div>
      <h3 className={`text-lg font-semibold text-[${THEME_COLORS.MOCHA}]`}>{title}</h3>
      <div className={`text-md text-[${THEME_COLORS.MOCHA}]`}>{children}</div>
    </div>
  </div>
);


const HomePage: React.FC = () => {
  const signatureMenus: MenuItem[] = [
    { name: "딱! 간장치킨", description: "교촌의 아성을 넘보기 위해 탄생했습니다. 고급 간장 베이스에 비법 시즈닝을 더해, 단짠의 격을 한 단계 끌어올렸습니다.", image: "assets/images/8.png" },
    { name: "딱! 치즈링클", description: "BHC에 익숙한 당신에게 새로운 경험을 선사합니다. 소비자가 직접 뿌려 먹는 방식으로, 더 신선하고 바삭한 치즈의 풍미를 즐길 수 있습니다.", image: "assets/images/9.png" },
    { name: "딱! 황금올리브치킨", description: "BBQ의 바삭함에 도전합니다. 혼합유를 최적의 비율로 변경하여, 식어도 눅눅해지지 않는 지속적인 바삭함을 구현했습니다.", image: "assets/images/10.png" },
    { name: "두딱마리 / 세딱마리 세트", description: "한 번에 여러 맛을 즐기고 싶은 욕심꾸러기들을 위한 최고의 선택. 부담 없는 가격으로 다양한 '딱! 시리즈'를 조합해 드세요.", image: "assets/images/11.png" },
  ];

  const chibapMenus: MenuItem[] = [
    { name: "치킨마요 누룽지 보름달밥", description: "'치킨마요덮밥'의 치킨 양이 아쉬우셨나요? 우리는 치킨이 주인공인 진짜 치밥을 만듭니다. 순살치킨과 함께 제공되는 누룽지 식감의 둥근 보름달밥. 바삭한 누룽지와 부드러운 치킨, 고소한 마요 소스의 완벽한 조화로 든든한 한 끼를 책임집니다.", image: "assets/images/12.png" },
  ];

  const kSideMenus: MenuItem[] = [
    { name: "깻잎 부각 크런치", description: "찹쌀풀을 발라 튀겨낸 전통 부각. '바사삭' 소리와 함께 퍼지는 깻잎 향이 치킨의 느끼함을 완벽하게 잡아줍니다.", image: "assets/images/13.png" },
    { name: "인삼 허니글레이즈 윙", description: "쌉싸름한 인삼과 달콤한 꿀의 이색적인 만남. \"몸에 좋은데 맛도 좋은\" SNS 화제 예약 메뉴!", image: "assets/images/14.png" },
    { name: "도라지 크리스피 프라이", description: "도라지를 얇게 튀겨 감자튀김을 재해석했습니다. 쓴맛은 사라지고 고소함만 남아, 최고의 맥주 안주가 됩니다.", image: "assets/images/15.png" },
  ];

  const franchiseTiers: FranchiseTier[] = [
    {
      level: "1", name: "협력점 (자유 제휴형)",
      coreBenefit: "부담없이 시작하는 첫 단계",
      requirements: "별도 조건 없음, 최소 투자로 브랜드 경험",
      biUsage: "자율 (미사용 가능)",
      territoryProtection: "없음",
      premium: "형성되지 않음 (개인 간 거래)",
      benefits: "검증된 핵심 물류(소스, 파우더 등) 선택적 공급, 운영 자율성 극대화",
      benefitsDetails: ["최소 투자로 브랜드 경험", "자유로운 매장 운영", "핵심 물류 선택적 사용"]
    },
    {
      level: "2", name: "제휴점 (성과 연동형)",
      coreBenefit: "성장 가속, 브랜드 시너지 창출",
      requirements: "월 300마리 이상 판매 등 성과 조건 충족",
      biUsage: "부분적 사용 권장 (온라인, 배달앱 등)",
      territoryProtection: "제한적 보호 (일정 구역 내 출점 제한)",
      premium: "데이터 기반 가치 형성 시작",
      benefits: "본사 마케팅 지원, 교육 프로그램 제공, '디지털 권리금' 가치 누적 시작",
      benefitsDetails: ["본사 마케팅 캠페인 참여", "운영 효율화 교육 제공", "데이터 기반 매장 컨설팅"]
    },
    {
      level: "3", name: "정식 가맹점 (가치 공유형)",
      coreBenefit: "최고 수준 지원, '디지털 권리금' 극대화",
      requirements: "월 1,500마리 이상 판매 등 최상위 조건 충족, 본사 표준 운영 필수",
      biUsage: "전면 의무 사용 (간판, 인테리어 포함)",
      territoryProtection: "철저한 독점 상권 보장 ('1억 메이저 상권' 목표)",
      premium: "본사 공식 인정 NFT 가맹권, AI가치평가 시스템 적용, 거래지원 검토",
      benefits: "본사 투자유치 연계, 신메뉴 우선 도입, '1억 메이저 상권' 달성 지원, 디지털 자산화된 권리금의 유동화 및 가치 상승 기대",
      benefitsDetails: ["독점 상권 보장", "NFT화된 가맹권의 가치 상승 기대", "AI기반 객관적 매장 가치 평가", "본사 집중 지원 및 투자 연계"]
    },
  ];
  const tierColors = [THEME_COLORS.TURQUOISE, THEME_COLORS.GOLD, THEME_COLORS.MOCHA];
  const procedureSteps = [
    "홈페이지/전화 상담 신청", "본사 1:1 심층 면접 및 사업설명회", "정보공개서 제공 및 가맹 계약",
    "최적 입지 선정 및 점포 계약", "본사 집중 교육 및 인테리어 시공", "마침내, 성공 창업의 문을 열다!"
  ];

  const successStories: SuccessStory[] = [
    {
      id: "1", title: "요리 '요'자도 모르던 20대 청년, 월 순수익 1,200만원을 달성하다",
      quote: "제가 할 수 있을까? 반신반의했지만, 로봇이 다 튀겨주더군요. 본사 교육 2주 만에 저도 '바삭함 장인'이 되었습니다. 지금은 2호점 오픈을 준비 중입니다!",
      franchisee: "김민준 점주님", age: 29,
      metrics: [ { label: "오픈 6개월 만에", value: "3단계 '정식 가맹점' 승급" }, { label: "배달앱 평점", value: "4.9점 유지" }, { label: "일 평균 주문", value: "70건 돌파" }, ],
      image: "assets/images/9.png"
    },
    {
      id: "2", title: "타 프랜차이즈에 지쳤던 40대 부부, '저녁 있는 삶'을 찾다",
      quote: "이전 가게는 하루 12시간씩 튀겨도 남는 게 없었어요. 딱마리는 조리가 편해지니 몸도 마음도 여유롭고, 수익은 오히려 2배가 늘었습니다. 이제야 진짜 '내 사업' 하는 기분입니다.",
      franchisee: "박서연 & 이정훈 점주님", age: 45,
      metrics: [ { label: "인건비", value: "50% 절감 (부부 2인 운영)" }, { label: "영업 이익률", value: "25% 달성" }, { label: "성과", value: "2구역 관할권 획득으로 매출 증대" }, ],
      image: "assets/images/10.png"
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center">
        <img
          src="assets/images/1.png"
          alt="딱마리치킨 로고"
          className="w-48 h-48 sm:w-64 sm:h-64 mb-8 rounded-full shadow-xl object-contain"
        />
        <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-[${THEME_COLORS.MOCHA}]`}>
          <span className={`text-[${THEME_COLORS.GOLD}]`}>딱</span>! 맞는 바삭함, <span className={`text-[${THEME_COLORS.TURQUOISE}]`}>딱</span>! 맞는 즐거움
        </h1>
        <p className={`text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-[${THEME_COLORS.MOCHA}]`}>
          딱마리치킨은 '가장 바삭한 치킨을, 가장 현명한 방법으로' 즐길 수 있는 새로운 기준을 제시합니다.
          남길 걱정 없이, 부담 없이 즐기는 완벽한 2/3마리의 행복을 경험하세요.
        </p>
        <div className="space-x-4">
          <a
            href="#menu"
            className={`px-8 py-3 text-lg font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 bg-[${THEME_COLORS.GOLD}] text-white`}
          >
            메뉴 보러가기
          </a>
          <a
            href="#brand"
            className={`px-8 py-3 text-lg font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 bg-transparent border-2 border-[${THEME_COLORS.TURQUOISE}] text-[${THEME_COLORS.TURQUOISE}] hover:bg-[${THEME_COLORS.TURQUOISE}] hover:text-white`}
          >
            브랜드 이야기
          </a>
        </div>
         <img
            src="assets/images/3.png"
            alt="맥주를 든 빠삭이 캐릭터"
            className="mt-12 w-full max-w-2xl aspect-[20/9] opacity-80 object-contain"
          />
      </section>

      {/* Brand Section */}
      <section id="brand" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <video
            src="assets/videos/1.mp4"
            className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg mb-8"
            autoPlay
            muted
            loop
            playsInline
            controls
            aria-label="딱마리치킨 브랜드 소개 영상"
          />
          <h1 className={`text-4xl sm:text-5xl font-bold mb-4 text-[${THEME_COLORS.MOCHA}]`}>
            우리가 '딱마리'를 시작한 이유
          </h1>
          <p className={`text-xl sm:text-2xl text-[${THEME_COLORS.MOCHA}]`}>
            "치킨, 왜 항상 남겨야 했을까?"<br />
            "왜 한 마리의 가격은 당연하게 2만 원이 넘어야 했을까?"
          </p>
          <p className={`mt-4 text-lg max-w-3xl mx-auto text-[${THEME_COLORS.MOCHA}]`}>
            딱마리치킨은 이 두 가지 질문에서 시작되었습니다.
            우리는 고객의 죄책감과 부담감을 끝내고, 진정한 만족을 설계하기로 했습니다.
          </p>
        </div>
        <div className="space-y-16">
          <div className={`flex flex-col md:flex-row items-center gap-8 p-6 rounded-lg shadow-lg bg-[${THEME_COLORS.CREAM}EE]`}>
            <img src="assets/images/5.png" alt="과학적 해답, 2/3마리" className="w-full md:w-1/3 h-auto rounded-lg object-contain" />
            <div className="md:w-2/3">
              <h3 className={`text-2xl sm:text-3xl font-semibold mb-3 text-[${THEME_COLORS.GOLD}]`}>
                1. 가장 완벽한 바삭함을 위한 과학적 해답, '2/3마리'
              </h3>
              <p className={`text-md sm:text-lg leading-relaxed text-[${THEME_COLORS.MOCHA}]`}>
                저희는 '대한민국 1등 바삭한 치킨'을 목표로 수백 번의 실험을 거쳤습니다. 그리고 마침내 해답을 찾았습니다. 치킨이 가장 맛있게 튀겨지는 황금 온도는 180℃. 하지만 한 마리를 통째로 넣는 순간, 기름 온도는 급격히 떨어져 바삭함을 잃게 됩니다.
                <br /><br />
                그래서 우리는 과감히 양을 줄였습니다. 180℃를 끝까지 지켜낼 수 있는 최적의 양, '2/3마리'. 이것이 바로 마지막 한 조각까지 완벽한 바삭함을 유지하는 딱마리치킨의 핵심 기술이자, 품질에 대한 타협 없는 약속입니다.
              </p>
            </div>
          </div>
          <div className={`flex flex-col md:flex-row-reverse items-center gap-8 p-6 rounded-lg shadow-lg bg-[${THEME_COLORS.CREAM}EE]`}>
            <img src="assets/images/4.png" alt="딱 맞는 소비와 운영" className="w-full md:w-1/3 h-auto rounded-lg object-contain" />
            <div className="md:w-2/3">
              <h3 className={`text-2xl sm:text-3xl font-semibold mb-3 text-[${THEME_COLORS.TURQUOISE}]`}>
                2. 고객과 점주 모두를 위한 '딱! 맞는' 소비와 운영
              </h3>
              <p className={`text-md sm:text-lg leading-relaxed text-[${THEME_COLORS.MOCHA}]`}>
                고객에게는, 남길 걱정 없는 <strong className={`text-[${THEME_COLORS.GOLD}]`}>딱! 맞는 양(딱양)</strong>과 지갑이 가벼워지는 <strong className={`text-[${THEME_COLORS.GOLD}]`}>딱! 맞는 가격(딱가격)</strong>을 제안합니다. 이제 죄책감 없이, 나를 위한 똑똑하고 맛있는 소비를 즐기세요.
                <br /><br />
                점주에게는, 튀김 로봇과 표준화된 레시피로 지옥 같던 주방 노동을 끝내고, 쉽고 편안한 운영을 약속합니다. 점주님이 행복해야 고객에게도 최고의 치킨이 전달된다는 것이 저희의 믿음입니다.
              </p>
            </div>
          </div>
          <div className={`flex flex-col md:flex-row items-center gap-8 p-6 rounded-lg shadow-lg bg-[${THEME_COLORS.CREAM}EE]`}>
            <img src="assets/images/1.png" alt="우리의 얼굴, 빠삭이" className="w-full md:w-1/3 h-auto rounded-lg object-contain p-4" />
            <div className="md:w-2/3">
              <h3 className={`text-2xl sm:text-3xl font-semibold mb-3 text-[${THEME_COLORS.MOCHA}]`}>
                3. 우리의 얼굴, '빠삭이'
              </h3>
              <p className={`text-md sm:text-lg leading-relaxed text-[${THEME_COLORS.MOCHA}]`}>
                펭귄 '빠삭이'는 저희의 페르소나입니다. 닭이 아닌 펭귄을 마스코트로 삼은 이유는, 기존의 틀을 깨는 혁신과 위트를 보여주기 위함입니다. '빠삭이'는 완벽한 바삭함을 추구하는 자신감 넘치는 치킨 전문가이자, 고객에게 즐거움을 선사하는 유쾌한 친구입니다.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-16 text-center">
          <p className={`text-2xl sm:text-3xl font-bold text-[${THEME_COLORS.MOCHA}]`}>
            딱마리치킨은 단순히 치킨을 파는 브랜드가 아닙니다.
          </p>
          <p className={`mt-2 text-xl sm:text-2xl text-[${THEME_COLORS.GOLD}]`}>
            우리는 '가장 바삭한 치킨을, 가장 현명한 방법으로 즐기는 새로운 기준'을 만듭니다.
          </p>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-10">
          <video
            src="assets/videos/2.mp4"
            className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg mb-8"
            autoPlay
            muted
            loop
            playsInline
            controls
            aria-label="딱마리치킨 메뉴 소개 배경 영상 - 자연 풍경"
          />
          <h1 className={`text-4xl sm:text-5xl font-bold mb-4 text-[${THEME_COLORS.MOCHA}]`}>
            딱마리, 맛으로 증명합니다
          </h1>
          <p className={`text-xl sm:text-2xl text-[${THEME_COLORS.MOCHA}]`}>
            당신의 입맛에 '딱!' 맞는 치킨, 여기에 다 있습니다.<br/>
            평범함을 거부하는 딱마리만의 메뉴 경쟁력을 지금 확인하세요.
          </p>
        </div>
        <div className="mb-16">
          <SectionTitle>시그니처 '딱! 시리즈' - 대한민국 대표 치킨에 던지는 출사표</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {signatureMenus.map(item => <MenuCard key={item.name} item={item} />)}
          </div>
        </div>
        <div className="mb-16">
          <SectionTitle>식사의 새로운 기준, '딱! 맞는' 치밥 메뉴</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {chibapMenus.map(item => <MenuCard key={item.name} item={item} />)}
          </div>
        </div>
        <div className="mb-16">
          <SectionTitle>상식을 파괴하는 K-사이드 메뉴</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {kSideMenus.map(item => <MenuCard key={item.name} item={item} />)}
          </div>
        </div>
        <div className={`text-center p-8 rounded-xl shadow-xl bg-[${THEME_COLORS.MOCHA}]`}>
          <h3 className={`text-3xl font-semibold mb-6 text-[${THEME_COLORS.CREAM}]`}>
            바삭함을 지키는 마지막 기술,<br/>3층 구조 '숨 쉬는' 배달 박스
          </h3>
          <img src="assets/images/2.png" alt="3층 구조 배달 박스" className="w-full max-w-2xl mx-auto rounded-lg shadow-md mb-6 object-contain" />
          <p className={`text-lg leading-relaxed text-[${THEME_COLORS.CREAM}]`}>
            딱마리치킨의 경험은 포장에서 완성됩니다. 저희는 배달 시간 동안 치킨이 눅눅해지는 것을 막기 위해 특수 설계된 3층 구조 배달 박스를 사용합니다.
            <br />1층: 기름과 수분 배출 통로 | 2층: 치킨을 담는 메인 공간 | 3층: 증기를 배출하는 상단 뚜껑
            <br />이 서랍식 박스는 바삭함을 지켜줄 뿐만 아니라, 열어보는 재미까지 더해 '나를 위한 선물'이라는 경험을 극대화합니다.
          </p>
        </div>
      </section>

      {/* Franchise Section */}
      <section id="franchise" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
         <div className="text-center mb-12">
          <video
            src="assets/videos/3.mp4"
            className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg mb-8"
            autoPlay
            muted
            loop
            playsInline
            controls
            aria-label="딱마리치킨 가맹 안내 영상"
          />
          <h1 className={`text-4xl sm:text-5xl font-bold mb-4 text-[${THEME_COLORS.MOCHA}]`}>
            사장님, 이제 <span className={`text-[${THEME_COLORS.GOLD}]`}>디지털 자산</span>으로 꽃길만 걸으세요.
          </h1>
          <p className={`text-xl sm:text-2xl text-[${THEME_COLORS.MOCHA}]`}>
            딱마리치킨은 점주님의 <strong className={`text-[${THEME_COLORS.TURQUOISE}]`}>노력</strong>이 <strong className={`text-[${THEME_COLORS.TURQUOISE}]`}>가치</strong>가 되는 혁신을 만듭니다.
          </p>
          <p className={`mt-6 text-lg max-w-3xl mx-auto text-[${THEME_COLORS.MOCHA}]`}>
            월 3,000마리 판매, 높은 수익, 넘치는 손님... 그리고 당신의 매장은 <strong className={`text-[${THEME_COLORS.GOLD}]`}>성장하는 디지털 자산</strong>이 됩니다.
            딱마리치킨은 <strong className={`text-[${THEME_COLORS.GOLD}]`}>'디지털 권리금 시스템'</strong>과 <strong className={`text-[${THEME_COLORS.TURQUOISE}]`}>'3단계 성장 등급제'</strong>로 점주님의 성공을 현실로 만듭니다.
          </p>
        </div>

        {/* Digital Premium System Section */}
        <div className="mb-20 p-8 rounded-xl shadow-2xl bg-white">
          <SectionTitle subtitle="점주님의 노력이 투명한 디지털 자산으로 인정받는 시스템">
            미래형 프랜차이즈의 핵심: 딱마리 <span className={`text-[${THEME_COLORS.GOLD}]`}>디지털 권리금 시스템</span>
          </SectionTitle>
          <video
            src="assets/videos/4.mp4"
            className="w-full max-w-3xl mx-auto h-auto object-contain rounded-lg shadow-md mb-10"
            autoPlay
            muted
            loop
            playsInline
            controls
            aria-label="디지털 권리금 시스템 설명 영상"
          />
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className={`p-6 rounded-lg bg-[${THEME_COLORS.CREAM}]/50 shadow`}>
              <h4 className={`text-xl font-semibold mb-2 text-[${THEME_COLORS.MOCHA}]`}>1. NFT 기반 가맹권: 투명한 소유와 거래</h4>
              <p className={`text-md text-[${THEME_COLORS.MOCHA}]`}>
                점주님의 소중한 가맹권은 블록체인 기반의 <strong className={`text-[${THEME_COLORS.TURQUOISE}]`}>NFT(대체 불가능 토큰)</strong>로 발행됩니다. 이를 통해 가맹권의 소유 관계가 투명하게 관리되며, 향후 안전하고 효율적인 양수도 거래의 기반을 마련합니다. 점주님의 권리는 디지털 기술로 강력하게 보호받습니다.
              </p>
            </div>
            <div className={`p-6 rounded-lg bg-[${THEME_COLORS.CREAM}]/50 shadow`}>
              <h4 className={`text-xl font-semibold mb-2 text-[${THEME_COLORS.MOCHA}]`}>2. 데이터 기반 AI 가치평가: 공정한 가치 인정</h4>
              <p className={`text-md text-[${THEME_COLORS.MOCHA}]`}>
                매출, 고객 충성도, 운영 효율 등 매장의 모든 성과는 실시간으로 데이터화되어 축적됩니다. 딱마리치킨의 <strong className={`text-[${THEME_COLORS.TURQUOISE}]`}>AI 시스템</strong>은 이 방대한 데이터를 분석하여 매장의 '디지털 권리금' 가치를 객관적이고 공정하게 평가합니다. 더 이상 깜깜이식 권리금 산정은 없습니다.
              </p>
            </div>
            <div className={`md:col-span-2 p-6 rounded-lg bg-[${THEME_COLORS.CREAM}]/50 shadow`}>
              <h4 className={`text-xl font-semibold mb-2 text-[${THEME_COLORS.MOCHA}]`}>3. '1억 메이저 상권' & 가치 유동화: 실질적 자산 성장</h4>
              <p className={`text-md text-[${THEME_COLORS.MOCHA}]`}>
                최상위 등급인 3단계 정식 가맹점은 <strong className={`text-[${THEME_COLORS.GOLD}]`}>'1억 메이저 상권'</strong>으로의 성장을 목표로 하며, 이는 곧 높은 디지털 권리금 가치를 의미합니다. 본사는 이 디지털화된 권리금의 <strong className={`text-[${THEME_COLORS.TURQUOISE}]`}>유동성을 확보</strong>하고, 나아가 DeFi 연동 등 금융 혁신을 통해 점주님의 자산 가치를 극대화하는 미래를 그리고 있습니다. 점주님의 성공이 곧 브랜드의 성공이며, 함께 성장하는 선순환 구조입니다.
              </p>
            </div>
          </div>
           <p className={`mt-8 text-center text-lg font-semibold text-[${THEME_COLORS.MOCHA}]`}>
            딱마리치킨과 함께라면, 당신의 매장은 단순한 가게가 아닌, <strong className={`text-[${THEME_COLORS.GOLD}]`}>가치를 인정받고 성장하는 디지털 자산</strong>이 됩니다.
          </p>
        </div>

        {/* 3-Tier Growth System Section */}
        <div className="mb-16 p-8 rounded-xl shadow-2xl bg-white">
          <SectionTitle subtitle="누구나 가볍게 시작하여 디지털 자산가로 성장하는 여정">
            리스크는 낮추고 기회는 넓히다: <span className={`text-[${THEME_COLORS.TURQUOISE}]`}>3단계 성장 등급제</span>
          </SectionTitle>
          <img
            src="assets/images/8.png"
            alt="3단계 성장 등급제 흐름도"
            className="w-full max-w-3xl mx-auto h-auto object-contain rounded-lg shadow-md mb-10"
          />
          <p className={`text-center mb-10 max-w-2xl mx-auto text-[${THEME_COLORS.MOCHA}]`}>
            딱마리치킨의 3단계 성장 등급제는 예비 점주님께 부담 없는 시작을, 기존 점주님께는 명확한 성장 경로와 디지털 자산 형성의 기회를 제공합니다. 각 단계는 점주님의 노력과 성과에 따라 공정하게 평가되며, 다음 단계로의 성장은 곧 더 큰 혜택과 '디지털 권리금' 가치 상승으로 이어집니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {franchiseTiers.map((tier, index) => <FranchiseTierCard key={tier.level} tier={tier} color={tierColors[index % tierColors.length]} isEnhanced={true} />)}
          </div>
        </div>

        <div className={`p-8 rounded-xl shadow-xl bg-[${THEME_COLORS.MOCHA}] text-[${THEME_COLORS.CREAM}]`}>
          <SectionTitle className="!text-white">점주님의 '몸과 마음'을 지키는 운영 시스템</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                  <h4 className={`text-xl font-semibold mb-2 text-[${THEME_COLORS.GOLD}]`}>쉽고 편안한 조리</h4>
                  <p>튀김 로봇과 본사에서 90% 조리된 원팩 시스템으로, 전문 주방장 없이도 알바생 1명이면 충분합니다. 뜨거운 기름 앞에서의 지옥 같은 노동은 이제 그만! 점주님의 워라밸을 지켜드립니다.</p>
              </div>
              <div>
                  <h4 className={`text-xl font-semibold mb-2 text-[${THEME_COLORS.GOLD}]`}>소자본 맞춤 창업</h4>
                  <p>배달/포장 전문 매장으로 10평 내외 소규모 공간에서도 창업이 가능합니다. 불필요한 인테리어 비용을 없애고 초기 투자 부담을 획기적으로 낮춰, 누구나 꿈을 펼칠 수 있도록 지원합니다.</p>
              </div>
          </div>
        </div>

        <div className="mt-16">
          <SectionTitle>투명한 가맹 절차</SectionTitle>
          <ol className={`list-decimal list-inside space-y-3 max-w-2xl mx-auto text-lg p-6 rounded-lg shadow-lg text-[${THEME_COLORS.MOCHA}] bg-[${THEME_COLORS.CREAM}EE]`}>
            {procedureSteps.map((step, index) => (
              <li key={index} className="mb-2"><span className="font-semibold">{index + 1}단계:</span> {step}</li>
            ))}
          </ol>
        </div>

        <div className="mt-16 text-center">
          <h2 className={`text-3xl font-bold mb-6 text-[${THEME_COLORS.MOCHA}]`}>지금 바로, 당신의 <span className={`text-[${THEME_COLORS.GOLD}]`}>디지털 자산</span> 스토리를 시작하세요!</h2>
          <button
            className={`px-10 py-4 text-xl font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 bg-[${THEME_COLORS.GOLD}] text-white`}
            onClick={() => alert('가맹 상담 신청 기능은 준비 중입니다.')}
          >
            가맹 상담 신청하기
          </button>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="success-stories" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <SectionTitle>그들의 성공이 당신의 미래입니다</SectionTitle>
        <div className="space-y-12 max-w-4xl mx-auto">
          {successStories.map(story => <StoryCard key={story.id} story={story} />)}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <SectionTitle>당신의 목소리에 항상 귀 기울이겠습니다</SectionTitle>
        <p className={`text-center text-lg max-w-2xl mx-auto mb-12 text-[${THEME_COLORS.MOCHA}]`}>
          딱마리치킨은 고객님과 예비 점주님의 모든 의견을 소중히 여깁니다.
          저희는 '빠르고, 정확하고, 진정성 있는' 응대를 약속합니다.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="p-8 rounded-xl shadow-xl bg-white">
            <h2 className={`text-2xl font-bold mb-6 text-center text-[${THEME_COLORS.TURQUOISE}]`}>가맹(창업) 문의</h2>
            <p className={`text-center mb-6 text-[${THEME_COLORS.MOCHA}]`}>
              새로운 성공의 기회를 잡고 싶은 예비 점주님께서는 아래 연락처로 문의해주시면,
              전문 창업 컨설턴트가 1:1 맞춤 상담을 진행해 드립니다.
            </p>
            <div className="space-y-4">
              <ContactInfoItem icon={<PhoneIcon className="w-full h-full" />} title="대표전화">1588-XXXX</ContactInfoItem>
              <ContactInfoItem icon={<EmailIcon className="w-full h-full" />} title="이메일">franchise@dakmari.com</ContactInfoItem>
              <button
                className={`w-full mt-4 px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 bg-[${THEME_COLORS.TURQUOISE}] text-white`}
                onClick={() => alert('온라인 상담 신청 기능은 준비 중입니다.')}
              >온라인 상담 신청</button>
            </div>
          </div>
          <div className="p-8 rounded-xl shadow-xl bg-white">
            <h2 className={`text-2xl font-bold mb-6 text-center text-[${THEME_COLORS.GOLD}]`}>일반 고객 문의</h2>
            <p className={`text-center mb-6 text-[${THEME_COLORS.MOCHA}]`}>
              메뉴, 서비스, 매장 이용에 대한 칭찬이나 개선 의견이 있으시다면 언제든 알려주세요.
              고객님의 피드백이 딱마리치킨을 성장시킵니다.
            </p>
            <div className="space-y-4">
              <ContactInfoItem icon={<PhoneIcon className="w-full h-full" />} title="고객센터 (수신자 부담)">080-XXX-XXXX</ContactInfoItem>
              <ContactInfoItem icon={<ChatBubbleIcon className="w-full h-full" />} title="카카오톡 채널">@딱마리치킨</ContactInfoItem>
            </div>
          </div>
        </div>
        <div className="mt-16 p-8 rounded-xl shadow-xl max-w-5xl mx-auto text-center bg-white">
          <h2 className={`text-2xl font-bold mb-6 text-[${THEME_COLORS.MOCHA}]`}>본사 위치</h2>
          <div className={`flex justify-center mb-4 text-[${THEME_COLORS.GOLD}]`}><MapPinIcon className="w-12 h-12"/></div>
          <p className={`text-lg text-[${THEME_COLORS.MOCHA}]`}>서울특별시 구로구 디지털로33길 11 에이스테크노타워8차 8층</p>
          <img
            src="assets/images/100.png"
            alt="딱마리치킨 본사 위치 지도"
            className="mt-4 w-full h-64 object-contain rounded-lg shadow-md"
          />
        </div>
      </section>
    </>
  );
};

export default HomePage;
