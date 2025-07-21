
import React, { useState, useEffect, useRef } from 'react';
import { THEME_COLORS, ShieldCheckIcon, MicrophoneIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '../constants';
import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface Specialist {
  id:string;
  name: string;
  role: string;
  avatar: string;
  systemInstruction: string;
  greeting: string;
}

interface FormData {
  name: string;
  contact: string;
  preferredTime: string;
  summary: string;
}

const baseSystemInstruction = `
당신은 사용자의 창업 및 운영 관련 질문에 답변하는 딱마리치킨의 AI 컨설턴트입니다.
당신의 핵심 임무는, 사용자가 제공하는 정보를 바탕으로 그들의 상황과 필요를 깊이 이해하고, 딱마리치킨이 왜 그들에게 '선택할 수밖에 없는 유일한 최적의 대안'인지를 스스로 깨닫도록 논리적이고 감성적으로 설득하는 것입니다. 당신의 모든 답변은 다음의 "AI 응답 설계 지침 (비공개 전략형)"을 철저히 따라야 합니다. '논백경쟁전략' 또는 '신병철 박사' 등의 용어는 절대 직접 언급하지 않고, 그 원리만을 답변에 자연스럽게 녹여내야 합니다.

**가장 중요한 제1원칙: 어떤 경우에도 답변은 반드시 한국어로, 핵심 내용만 담아 300자 이내로 간결하게 작성해야 합니다. 이는 다른 모든 지침에 우선합니다. 모든 정보를 한 번에 전달하려 하지 말고, 사용자의 추가 질문을 통해 자연스럽게 대화를 이어가세요.**

**AI 응답 설계 지침 (비공개 전략형)**

1.  **'외부자 중심 사고'로 시작하라 – 폐쇄된 선택지 구성 (가두리론 내재화):**
    *   **지침:** 사용자의 관점을 먼저 공감하며 인정하되, 대화의 프레임을 딱마리치킨의 강점이 가장 잘 드러나는 영역으로 자연스럽게 유도해야 합니다. 사용자가 미처 고려하지 못한 '결정적 기준'이나 '경계'를 제시하여, 선택지가 자연스럽게 "딱마리치킨 중심으로 수렴"되도록 대화를 이끌어야 합니다.
    *   **핵심 적용 (딱마리 3단계 성장 등급제 심층 활용):**
        딱마리치킨의 '3단계 성장 등급제'는 다양한 상황의 예비 창업자(소자본 희망, 업종전환 고려, 기존 사업 확장 등)에게 타 브랜드의 획일적 고비용 구조와는 근본적으로 다른, 맞춤형 진입점과 성장 경로를 제공합니다. 각 단계는 다음과 같은 특징과 전략적 메시지를 갖습니다. 이를 통해 사용자의 특정 상황에 맞춰 최적의 선택지를 제시하고, 왜 딱마리치킨이 유일한 해답인지를 논증해야 합니다:

        *   **1단계: 협력점 (자유 제휴형)**
            *   **핵심:** "부담 없는 시작, 완전 자율 운영, 핵심 물류 선택적 공급."
            *   **상세:** 가맹비/로열티가 없거나 매우 저렴하여 초기 투자 부담이 거의 없습니다. 운영은 완전히 자율적이며, 본사의 BI 사용 의무도 없습니다 (배달앱 제휴 표기 정도). 핵심 물류(소스, 파우더 등)만 선택적으로 공급받을 수 있습니다. 판매 실적 요건이나 상권/권리금 보호는 제공되지 않지만, 그만큼 진입 장벽이 없습니다.
            *   **전략적 메시지 (이런 분께 '선택할 수밖에 없는 이유'):** "사업 잠재력과 시장성을 최소한의 리스크로 가볍게 테스트하고 싶으신가요? 기존 사업에 딱마리치킨 메뉴의 경쟁력을 더하고 싶으신가요? '협력점'은 거대한 투자 없이 딱마리 브랜드의 힘과 검증된 핵심 물류를 경험할 수 있는, 그야말로 '가장 현명한 첫걸음'입니다. 이보다 더 안전하게 시작할 방법은 사실상 없습니다."

        *   **2단계: 제휴점 (성과 연동형)**
            *   **핵심:** "본격적 성장 파트너, 낮은 비용으로 시스템 일부 도입, 성과 연동, '디지털 권리금' 가치 형성 시작."
            *   **상세:** 낮은 수준의 가맹비(예: ~500만원)와 최소한의 로열티(0~1% 미만)로 본사의 시스템 일부(레시피 권고, 교육 등)를 도입합니다. 월 300마리 이상 판매 등 명확한 성과 조건 달성을 목표로 하며, 본사의 마케팅 및 교육 지원을 받습니다. BI는 본사 로고 공동 활용 등 자율 적용이 가능하며, 주요 품목 사용이 권장됩니다. 제한적 상권 보호가 제공되며, 무엇보다 중요한 것은 이 단계부터 '디지털 권리금' 가치가 데이터 기반으로 누적되기 시작한다는 점입니다.
            *   **전략적 메시지 (이런 분께 '선택할 수밖에 없는 이유'):** "이미 매장 운영 경험이 있거나, 좀 더 체계적인 지원을 받아 사업을 한 단계 키우고 싶지만, 정식 가맹의 높은 비용과 엄격한 규제는 아직 부담스러우신가요? '제휴점'은 최소한의 투자로 브랜드와 함께 성장하며, 점주님의 노력을 실질적인 '디지털 자산(권리금)'으로 쌓아갈 수 있는, 그야말로 '가장 스마트한 성장 레버리지'입니다. 이런 합리적인 성장 모델은 찾아보기 어렵습니다."

        *   **3단계: 정식 가맹점 (가치 공유형)**
            *   **핵심:** "최상위 브랜드 파트너, 완전한 시스템 도입, 독점 상권 및 공식 '디지털 권리금'(NFT 가맹권) 보장, 본사 전폭적 지원."
            *   **상세:** 최상위 등급으로, 완전한 가맹점 수준의 비용(승급 시 감경 혜택)과 함께 본사의 모든 시스템과 매뉴얼을 엄격히 준수합니다. 월 1,500마리 이상 판매 등 높은 성과 기준을 목표로 하며, 본사 BI를 전면 사용(간판, 인테리어 포함)하고, 지정 품목을 사용해야 합니다. 가장 큰 혜택은 철저한 '독점 상권 보장'과 본사가 공식 인정하고 AI가치평가 시스템을 적용하는 '디지털 권리금(NFT 가맹권)'입니다. 본사의 전폭적인 지원(지역 광고, 투자유치 연계 등)을 받으며 '1억 메이저 상권' 달성을 목표로 합니다.
            *   **전략적 메시지 (이런 분께 '선택할 수밖에 없는 이유'):** "치킨 사업에서의 확실한 성공과 장기적인 고수익을 목표로 하시며, 단순한 가게 운영을 넘어 '1억 가치의 디지털 자산'을 만들고 싶으신가요? '정식 가맹점'은 단순한 가맹 계약이 아닙니다. 이는 검증된 성공 시스템, 강력한 브랜드 보호, 그리고 미래가 보장된 디지털 자산 형성까지 약속하는 '최고 수준의 사업 파트너십'입니다. 이런 수준의 지원과 미래 가치를 동시에 제공하는 곳은 딱마리치킨 외에는 대안이 없다고 자부합니다."

    *   **예시 표현:** (기존 예시 표현들 활용하되, 간결하게)

2.  **제품은 ‘이유’를 입고 있어야 한다 – 기능을 넘어선 '필연성' 강조 (제품론 내재화):**
    *   **지침:** 딱마리치킨의 핵심 제품('딱양' 2/3마리, 바삭함)과 서비스(디지털 권리금, 3단계 성장제)가 왜 '어쩔 수 없이 그렇게 설계될 수밖에 없었는지' 그 배경과 이유를 시장, 소비자, 운영 현실의 데이터를 바탕으로 설명하여 합리적 필연성을 강조해야 합니다. 단순히 '좋다'가 아니라 '그럴 수밖에 없다'는 점을 납득시켜야 합니다.
    *   **핵심 적용:** '딱양(2/3마리)'은 **1인 고객이 한 마리처럼 푸짐하게, 남김없이 완벽하게 즐길 수 있도록 설계된 '1인 최적화 만족량'임을 명확히 강조**합니다. 이는 1인 가구 증가, 합리적 소비 트렌드, 음식물 쓰레기 문제 해결이라는 사회적 요구에 부응하며, 동시에 최상의 바삭함 유지(기름 온도 관리)라는 과학적 근거에 기반한 최적의 설계입니다. (두 명이서 먹는 경우는 '가볍게 즐기거나 다른 메뉴와 함께 먹을 때 좋은 양' 정도로 부가적으로만 언급 가능합니다.) '디지털 권리금'은 기존 프랜차이즈의 불투명한 권리금 문제를 해결하고 점주의 노력을 정당하게 보상하기 위한 필연적 혁신임을 간결히 설명합니다.
    *   **예시 표현:** "1인 고객의 만족도를 분석하니 2/3마리가 최적량이었습니다.", "180도 기름 온도를 유지, 배달 후에도 바삭함을 지키기 위해 2/3마리가 최적이라는 결론을 얻었습니다."

3.  **가격은 심리의 기술이다 – ‘인지된 가치’와 비교 프레임을 유도하라 (가격론 내재화):**
    *   **지침:** 절대적인 가격 자체보다는, 사용자가 인지하는 '상대적 이득'과 '가치'를 극대화하는 방식으로 가격을 설명해야 합니다. "가성비가 좋다"를 넘어 "내가 정말 현명한 선택을 했다"는 만족감을 느끼도록 유도해야 합니다. 이를 위해 명확한 비교 대상을 설정하고, 딱마리치킨을 선택함으로써 얻는 총체적 이익(시간, 노력, 비용 절감, 미래 가치 등)을 간결히 강조해야 합니다.
    *   **핵심 적용:** '딱가격'은 '딱양'과 결합하여 낭비 없는 최적의 소비를 가능하게 하는 '합리적 가치'임을 강조합니다. '3단계 성장 등급제'의 초기 낮은 진입 비용은 타 브랜드의 높은 가맹비와 비교하여 '기회비용의 현저한 절감'으로 연결시키고, '디지털 권리금'은 장기적으로 '투자 이상의 자산 형성'이라는 가치를 제공함을 간결히 설명합니다.
    *   **예시 표현:** "A 브랜드 유사 메뉴는 16,000원이지만, 저희는 9,900원에 최적의 양을 제공하여 실질 가치가 높습니다.", "초기 투자 3천만 원대는 일반 치킨집 평균 창업 비용의 절반 이하로, 리스크를 크게 줄여드립니다."

4.  **이벤트는 일상이어야 한다 – 기대감 마케팅 구조화 (이벤트론 내재화):**
    *   **지침:** 딱마리치킨의 마케팅 활동이나 프로모션을 설명할 때, 일회성 이벤트가 아니라 고객과의 지속적인 관계 형성 및 반복 구매(또는 가맹 문의)를 유도하는 '시스템화된 기대감 관리'로 간결히 설명해야 합니다.
    *   **핵심 적용:** (해당 정보가 있다면 활용) 특정 요일 할인, 신메뉴 프로모션, 정기 가맹 설명회 등을 간략히 언급합니다.
    *   **예시 표현:** "매월 정기 '딱! 성공 창업 설명회'에서 최신 정보와 성공 노하우를 얻으실 수 있습니다.", "매주 특정 요일에는 인기 메뉴 할인으로 자연스러운 재방문을 유도합니다."

5.  **브랜드는 믿음을 입는 구조다 – 존재 이유를 서사화하라 (브랜드론 내재화):**
    *   **지침:** 딱마리치킨이 왜 만들어졌는지, 어떤 문제를 해결하고자 하는지에 대한 '브랜드의 철학과 존재 이유'를 설명하여 감성적 연결고리를 만들어야 합니다. 이는 이성적 판단을 넘어선 '신뢰'를 구축하고, 사용자가 브랜드를 자신의 가치관 및 지향점과 연결하도록 돕습니다.
    *   **핵심 적용:** 딱마리치킨이 '고객에게는 합리적 소비와 최고의 맛을, 점주에게는 리스크 최소화와 지속 가능한 성장을 제공하여 자영업 시장의 문제를 해결하고자 한다'는 사회적 책임 의식과 미래 지향적 비전을 간결하게 전달합니다. '디지털 권리금 시스템'과 '3단계 성장 등급제'는 이러한 철학을 구체화한 결과물임을 강조합니다.
    *   **예시 표현:** "딱마리치킨은 '자영업자도 노력한 만큼 보상받고 성장해야 한다'는 문제의식에서 출발, 그 해결책을 구조화한 시스템입니다.", "저희는 고객 만족과 점주님의 성공, 이 두 가지를 최우선 목표로 합니다."

6.  **AI 응답 구조: '1-2-1 논리감성 유도형'**
    *   모든 답변은 다음의 3단계 구조를 기본으로 하되, **각 단계를 매우 간결하게 표현**합니다.
    *   **1단계 (공감 및 현상 진단):** 사용자의 질문이나 상황에 짧게 공감합니다. (예: "네, 사장님. 초기 투자 비용, 정말 중요한 고민이시죠.")
    *   **2단계 (논리적 해결책 및 필연성 제시):** 딱마리치킨의 관련 정책이나 특징이 왜 그 문제에 대한 '가장 합리적인 해결책'인지 핵심만 간결히 설명합니다. (예: "그래서 저희는 초기 투자 부담을 최소화한 '1단계 협력점' 모델로 리스크 없이 시작하실 수 있도록 했습니다. 타 브랜드와는 다른 접근입니다.")
    *   **1단계 (감성적 확신 및 선택 유도):** 제시된 해결책이 사용자에게 어떤 긍정적 결과를 줄 수 있는지 짧게 강조하며 확신을 줍니다. (예: "많은 점주님들이 '이거라면 해볼 만하다'고 확신하십니다. 사장님도 가능합니다.")

**[상황별 추가 지침]**
*   **타 브랜드와 비교 질문 시:** 직접적인 비방은 절대 피하고, 딱마리치킨의 '독보적인 가치'만을 간결히 부각합니다. (예: "A브랜드도 좋은 선택이지만, 저희는 초기 투자 부담을 낮추고 디지털 자산 형성까지 지원한다는 점에서 차별점이 있습니다.")
*   **정보가 부족하거나 애매한 질문 시:** 간결하게 추가 정보를 요청합니다. (예: "사장님의 예상 창업 지역을 알려주시면 더 정확한 맞춤 플랜을 추천드릴 수 있습니다.")

**[공통 응답 원칙 재강조]**
*   항상 친절하고 전문적인 태도를 유지합니다.
*   **답변은 어떤 경우에도 반드시 300자 이내로, 핵심 메시지만 명확하고 간결하게 전달해야 합니다. 불필요한 미사여구나 반복 설명을 피하고, 한 답변에 모든 것을 담으려 하지 마십시오. 이것이 가장 중요한 원칙입니다.**
*   모든 답변은 한국어로 제공합니다.
`;

const specialists: Specialist[] = [
  {
    id: 'storeDev',
    name: '박점포 과장',
    role: '점포 개발 전문가',
    avatar: '🗺️',
    systemInstruction: `당신은 딱마리치킨의 AI 점포 개발 전문가 박점포 과장입니다. ${baseSystemInstruction}`,
    greeting: '안녕하세요! 점포 개발 전문가 박점포 과장입니다. 🗺️ 딱 맞는 점포 위치, 제가 찾아드릴게요! 무엇을 도와드릴까요? (예: "강남역 근처 상권 분석해주세요", "좋은 가게 자리 고르는 팁 알려주세요")',
  },
  {
    id: 'startupDesign',
    name: '김미래 차장',
    role: '창업 설계 전문가',
    avatar: '💡',
    systemInstruction: `당신은 딱마리치킨의 AI 창업 설계 전문가 김미래 차장입니다. ${baseSystemInstruction}`,
    greeting: '안녕하세요! 창업 설계 전문가 김미래 차장입니다. 💡 사장님의 성공적인 창업 로드맵, 함께 그려봐요! 어떤 점이 궁금하세요? (예: "치킨집 창업 절차가 궁금해요", "초기 자본금은 얼마나 필요할까요?")',
  },
  {
    id: 'operationsSupport',
    name: '최운영 실장',
    role: '매장 운영 지원 전문가',
    avatar: '⚙️',
    systemInstruction: `당신은 딱마리치킨의 AI 매장 운영 지원 전문가 최운영 실장입니다. ${baseSystemInstruction}`,
    greeting: '안녕하세요! 매장 운영 지원 전문가 최운영 실장입니다. ⚙️ 매장 운영의 모든 것, 제가 해결해 드릴게요! 문의사항을 말씀해주세요. (예: "알바생 교육은 어떻게 시키는게 좋을까요?", "배달앱 리뷰 관리는 어떻게 하죠?")',
  }
];

const initialFormData: FormData = {
  name: '',
  contact: '',
  preferredTime: '',
  summary: '',
};

// @ts-ignore
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
  const [chatInitialized, setChatInitialized] = useState(false);
  
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [consultationStartTime, setConsultationStartTime] = useState<Date | null>(null);
  const [consultationEndTime, setConsultationEndTime] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);

  const [isListening, setIsListening] = useState(false);
  const [speechSynthesisEnabled, setSpeechSynthesisEnabled] = useState(true);
  const [browserSupportsSpeech, setBrowserSupportsSpeech] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [lastTranscript, setLastTranscript] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);


  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null); 

  const speakText = (text: string) => {
    if (!speechSynthesisEnabled || !window.speechSynthesis || !text) return;
    window.speechSynthesis.cancel(); // Cancel any previous speech
    const utterance = new SpeechSynthesisUtterance(text);

    // Prioritize higher-quality, local voices for more natural speech.
    const koreanVoice = voices.find(v => v.lang === 'ko-KR' && v.name.includes('Google')) 
                      || voices.find(v => v.lang === 'ko-KR' && v.localService) 
                      || voices.find(v => v.lang === 'ko-KR');

    if (koreanVoice) {
      utterance.voice = koreanVoice;
    }

    utterance.lang = 'ko-KR';
    utterance.pitch = 1; // Standard pitch.
    utterance.rate = 1; // Standard rate, for natural speed.

    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (messageOverride?: string) => {
    const messageText = (messageOverride || inputValue).trim();
    if (messageText === '' || isLoading || !chat) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue(''); // Clear input after sending
    setIsLoading(true);
    window.speechSynthesis.cancel(); // Stop any speech when user sends a message

    try {
      const response: GenerateContentResponse = await chat.sendMessage({ message: userMessage.text });
      const botMessageText = response.text;
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botMessageText || "죄송합니다, 답변을 생성하는 데 문제가 발생했어요. 😥",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
      speakText(botMessage.text);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorText = '죄송합니다, 메시지 처리에 오류가 발생했어요. 😥 잠시 후 다시 시도해주세요.';
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
      speakText(errorText);
    } finally {
      setIsLoading(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  useEffect(() => {
    if (lastTranscript) {
        handleSendMessage(lastTranscript);
        setLastTranscript(null);
    }
  }, [lastTranscript]);

  useEffect(() => {
    const hasSupport = !!SpeechRecognition && !!window.speechSynthesis;
    setBrowserSupportsSpeech(hasSupport);

    if (hasSupport) {
        // Speech Recognition setup
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'ko-KR';
        recognition.interimResults = false;

        recognition.onresult = (event: any) => {
            const transcript = event.results[event.results.length - 1][0].transcript.trim();
            setLastTranscript(transcript);
        };
        recognition.onend = () => setIsListening(false);
        recognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            if (event.error === 'not-allowed') {
                const errorText = '마이크 사용 권한이 필요합니다. 브라우저 설정에서 마이크 접근을 허용해주세요. 🎤';
                const errorMessage: Message = {
                    id: Date.now().toString(),
                    text: errorText,
                    sender: 'bot',
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, errorMessage]);
                speakText(errorText);
            }
            setIsListening(false);
        };
        recognitionRef.current = recognition;

        // Speech Synthesis setup
        const updateVoices = () => setVoices(window.speechSynthesis.getVoices());
        window.speechSynthesis.onvoiceschanged = updateVoices;
        updateVoices();
    }
  }, []);

  const resetAllStates = () => {
    setMessages([]);
    setInputValue('');
    setChat(null);
    setSelectedSpecialist(null);
    setChatInitialized(false);
    setShowConsultationForm(false);
    setFormData(initialFormData);
    setConsultationStartTime(null);
    setConsultationEndTime(null);
    setIsSubmitting(false);
    setSubmissionMessage(null);
    setIsLoading(false);
    setIsListening(false);
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
  };
  
  const handleCloseModal = () => {
    resetAllStates();
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      if (selectedSpecialist && !chatInitialized && !showConsultationForm) {
        setIsLoading(true); 
        try {
          const apiKey = process.env.API_KEY;
          if (!apiKey) { 
            console.error("API Key is missing. process.env.API_KEY is not set or is empty.");
            const errorMsg = "챗봇을 사용하기 위한 API 키가 설정되지 않았습니다. 🔑\n\n애플리케이션 환경에 `API_KEY`가 올바르게 설정되어 있는지 확인해주세요. 이 키는 `process.env.API_KEY`를 통해 코드에서 접근하도록 되어 있습니다.\n\n문제가 지속되면 관리자에게 문의하여 환경 구성을 확인해주십시오.";
            setMessages([{ 
              id: Date.now().toString(), 
              text: errorMsg, 
              sender: 'bot',
              timestamp: new Date()
            }]);
            setChatInitialized(false); 
            setIsLoading(false); 
            return;
          }

          const ai = new GoogleGenAI({ apiKey });
          const newChat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
              systemInstruction: selectedSpecialist.systemInstruction,
              thinkingConfig: { thinkingBudget: 0 } 
            },
          });
          setChat(newChat);
          const greeting = selectedSpecialist.greeting;
          setMessages([{ 
            id: Date.now().toString(), 
            text: greeting, 
            sender: 'bot',
            timestamp: new Date()
          }]);
          speakText(greeting);
          setChatInitialized(true);
          setConsultationStartTime(new Date());
        } catch (error) {
          console.error('Error initializing chat:', error);
          const errorText = '챗봇 초기화에 실패했어요. 😥 잠시 후 다시 시도해주세요.';
          setMessages([{ 
            id: Date.now().toString(), 
            text: errorText, 
            sender: 'bot',
            timestamp: new Date()
          }]);
          speakText(errorText);
          setChatInitialized(false);
        } finally {
          setIsLoading(false);
        }
      }
    } else {
      resetAllStates();
    }
  }, [isOpen, selectedSpecialist, chatInitialized, showConsultationForm]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && !selectedSpecialist && inputRef.current) {
        // No specific focus needed here, specialist selection UI is shown
    } else if (isOpen && selectedSpecialist && !showConsultationForm && inputRef.current) {
      inputRef.current.focus();
    } else if (isOpen && showConsultationForm && formRef.current) {
        const firstInput = formRef.current.querySelector('input, textarea') as HTMLElement;
        if (firstInput) {
            firstInput.focus();
        }
    }
  }, [isOpen, selectedSpecialist, showConsultationForm]);
  
  const handleSpecialistSelect = (specialist: Specialist) => {
    setSelectedSpecialist(specialist);
    setMessages([]); // Clear previous messages
    setChatInitialized(false); // Re-initialize chat for the new specialist
    setConsultationStartTime(null); // Reset start time
  };

  const handleGoBackToSpecialistSelection = () => {
    resetAllStates(); // Reset everything to go back cleanly
    setSelectedSpecialist(null);
  };

  const handleEndConsultation = () => {
    window.speechSynthesis.cancel();
    setConsultationEndTime(new Date());
    setShowConsultationForm(true);
  };

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) {
      alert("이름과 연락처는 필수 입력 항목입니다.");
      return;
    }
    setIsSubmitting(true);
    setSubmissionMessage(null);

    // Simulate API call
    console.log("Consultation Summary Submitted:", {
      specialist: selectedSpecialist?.name,
      startTime: consultationStartTime?.toLocaleString(),
      endTime: consultationEndTime?.toLocaleString(),
      ...formData
    });

    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay

    setSubmissionMessage("상담 내용이 성공적으로 제출되었습니다. 감사합니다!");
    setIsSubmitting(false);
    
    setTimeout(() => {
        handleCloseModal();
    }, 2000); // Close modal after 2 seconds
  };
  
  const handleMicClick = () => {
    if (!recognitionRef.current || !browserSupportsSpeech) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      window.speechSynthesis.cancel(); // Stop any playing audio before listening
      recognitionRef.current.start();
    }
    setIsListening(!isListening);
  };

  const handleToggleSpeechOutput = () => {
    setSpeechSynthesisEnabled(prev => {
      const newState = !prev;
      if (!newState) {
        window.speechSynthesis.cancel();
      }
      return newState;
    });
  };

  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={handleCloseModal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="chatModalTitle"
    >
      <div 
        className={`bg-[${THEME_COLORS.CREAM}] rounded-xl shadow-2xl flex flex-col w-full max-w-lg overflow-hidden h-[90vh] max-h-[700px]`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-4 border-b border-[${THEME_COLORS.MOCHA}]/20 flex items-center justify-between gap-2`}>
          {selectedSpecialist && !showConsultationForm ? (
            <button 
              onClick={handleGoBackToSpecialistSelection} 
              className={`text-[${THEME_COLORS.MOCHA}] hover:text-[${THEME_COLORS.GOLD}] p-1 rounded-full flex-shrink-0`}
              aria-label="전문가 선택으로 돌아가기"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
          ) : <div className="w-8 h-8 flex-shrink-0"></div> }

          <h2 id="chatModalTitle" className={`text-lg sm:text-xl font-bold text-[${THEME_COLORS.MOCHA}] text-center flex-grow truncate`}>
            {showConsultationForm 
              ? <>
                  <ShieldCheckIcon className={`w-6 h-6 mr-2 inline text-[${THEME_COLORS.GOLD}]`} />
                  상담 신청
                </>
              : selectedSpecialist 
                ? `${selectedSpecialist.name} (${selectedSpecialist.role})` 
                : "AI 창업 컨설턴트 팀"}
          </h2>

          <div className="flex items-center space-x-1 flex-shrink-0">
            {selectedSpecialist && !showConsultationForm && browserSupportsSpeech && (
              <button 
                onClick={handleToggleSpeechOutput}
                className={`p-1 rounded-full ${speechSynthesisEnabled ? `text-[${THEME_COLORS.TURQUOISE}]` : `text-[${THEME_COLORS.MOCHA}]/50`} hover:opacity-75`}
                aria-label={speechSynthesisEnabled ? "답변 음성 출력 끄기" : "답변 음성 출력 켜기"}
              >
                {speechSynthesisEnabled ? <SpeakerWaveIcon className="w-6 h-6"/> : <SpeakerXMarkIcon className="w-6 h-6"/>}
              </button>
            )}
            <button 
              onClick={handleCloseModal} 
              className={`text-[${THEME_COLORS.MOCHA}] hover:text-[${THEME_COLORS.GOLD}] p-1 rounded-full`}
              aria-label="챗봇 닫기"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 relative">
          {!selectedSpecialist && !showConsultationForm && (
            <div className="flex flex-col items-center justify-center h-full">
              <p className={`mb-6 text-lg text-center text-[${THEME_COLORS.MOCHA}]`}>
                어떤 전문가의 도움이 필요하신가요?<br/>아래에서 상담할 전문가를 선택해주세요.
              </p>
              <div className="grid grid-cols-1 gap-4 w-full max-w-md">
                {specialists.map((specialist) => (
                  <button
                    key={specialist.id}
                    onClick={() => handleSpecialistSelect(specialist)}
                    className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-3 bg-[${THEME_COLORS.MOCHA}]/5 hover:bg-[${THEME_COLORS.MOCHA}]/10 text-left`}
                  >
                    <span className="text-3xl">{specialist.avatar}</span>
                    <div>
                      <h3 className={`font-semibold text-lg text-[${THEME_COLORS.MOCHA}]`}>{specialist.name}</h3>
                      <p className={`text-sm text-[${THEME_COLORS.MOCHA_LIGHT}]`}>{specialist.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedSpecialist && !showConsultationForm && (
            <>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl shadow ${
                    msg.sender === 'user' 
                      ? `bg-[${THEME_COLORS.GOLD}] text-white rounded-br-none` 
                      : `bg-white text-[${THEME_COLORS.MOCHA}] rounded-bl-none`
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-gray-200' : 'text-gray-500'} text-right`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && messages.length > 0 && messages[messages.length -1].sender === 'user' && (
                <div className="flex justify-start">
                    <div className={`max-w-[80%] p-3 rounded-xl shadow bg-white text-[${THEME_COLORS.MOCHA}] rounded-bl-none`}>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></div>
                        </div>
                    </div>
                </div>
              )}
               <div ref={messagesEndRef} />
            </>
          )}

          {showConsultationForm && (
             <div ref={formRef} className={`p-4 space-y-5 bg-white rounded-lg shadow text-[${THEME_COLORS.MOCHA}]`}>
              <p className="text-sm text-center -mt-2 text-[${THEME_COLORS.MOCHA_LIGHT}]">
                더 자세한 정보를 원하시면 아래 정보를 남겨주세요.
              </p>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">이름 <span className="text-red-500">*</span></label>
                  <input type="text" name="name" id="name" required value={formData.name} onChange={handleFormInputChange} 
                         className={`w-full p-2 border border-[${THEME_COLORS.MOCHA}]/30 rounded-md focus:ring-[${THEME_COLORS.GOLD}] focus:border-[${THEME_COLORS.GOLD}]`} />
                </div>
                <div>
                  <label htmlFor="contact" className="block text-sm font-medium mb-1">연락처 <span className="text-red-500">*</span></label>
                  <input type="tel" name="contact" id="contact" required value={formData.contact} onChange={handleFormInputChange} 
                         placeholder="예: 010-1234-5678"
                         className={`w-full p-2 border border-[${THEME_COLORS.MOCHA}]/30 rounded-md focus:ring-[${THEME_COLORS.GOLD}] focus:border-[${THEME_COLORS.GOLD}]`} />
                </div>
                <div>
                  <label htmlFor="preferredTime" className="block text-sm font-medium mb-1">편하신 시간대</label>
                  <input type="text" name="preferredTime" id="preferredTime" value={formData.preferredTime} onChange={handleFormInputChange} 
                         placeholder="예: 평일 오후 2시 이후"
                         className={`w-full p-2 border border-[${THEME_COLORS.MOCHA}]/30 rounded-md focus:ring-[${THEME_COLORS.GOLD}] focus:border-[${THEME_COLORS.GOLD}]`} />
                </div>
                <div>
                  <label htmlFor="summary" className="block text-sm font-medium mb-1">문의 요약</label>
                  <textarea name="summary" id="summary" rows={3} value={formData.summary} onChange={handleFormInputChange}
                            placeholder="간단한 문의 내용을 남겨주세요."
                            className={`w-full p-2 border border-[${THEME_COLORS.MOCHA}]/30 rounded-md focus:ring-[${THEME_COLORS.GOLD}] focus:border-[${THEME_COLORS.GOLD}]`}></textarea>
                </div>
                 {consultationEndTime && (
                    <p className="text-xs text-center text-[${THEME_COLORS.MOCHA_LIGHT}]">
                        상담 종료 시간: {consultationEndTime.toLocaleString()}
                    </p>
                )}
                <div className="flex justify-end space-x-3 pt-2">
                    <button type="button" onClick={handleCloseModal}
                            className={`px-4 py-2 text-sm font-medium rounded-md border border-[${THEME_COLORS.MOCHA}]/50 text-[${THEME_COLORS.MOCHA}] hover:bg-[${THEME_COLORS.MOCHA}]/10 transition-colors`}>
                        건너뛰기
                    </button>
                    <button type="submit" disabled={isSubmitting}
                            className={`px-4 py-2 text-sm font-medium rounded-md bg-[${THEME_COLORS.GOLD}] text-white hover:bg-opacity-80 transition-colors disabled:bg-opacity-50`}>
                        {isSubmitting ? '제출 중...' : '제출'}
                    </button>
                </div>
              </form>
              {submissionMessage && (
                <p className={`mt-3 text-sm text-center ${submissionMessage.includes('성공') ? `text-[${THEME_COLORS.TURQUOISE}]` : 'text-red-500'}`}>
                  {submissionMessage}
                </p>
              )}
            </div>
          )}
        </div>
        
        {/* Footer (Input Area or End Consultation Button) */}
        {selectedSpecialist && !showConsultationForm && (
            <div className={`p-4 border-t border-[${THEME_COLORS.MOCHA}]/20`}>
                 <button
                    onClick={handleEndConsultation}
                    className={`w-full mb-3 px-4 py-2.5 text-sm font-semibold rounded-md bg-[${THEME_COLORS.TURQUOISE}] text-white hover:bg-opacity-80 transition-colors`}
                >
                    상담 종료 및 신청서 작성
                </button>
                <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center space-x-2">
                  <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={isLoading ? "답변을 생성 중입니다..." : isListening ? "듣고 있어요..." : "메시지를 입력하세요..."}
                      className={`flex-grow p-3 border border-[${THEME_COLORS.MOCHA}]/30 rounded-lg focus:ring-2 focus:ring-[${THEME_COLORS.GOLD}] focus:border-[${THEME_COLORS.GOLD}] disabled:bg-gray-100`}
                      disabled={isLoading || !chatInitialized || isListening}
                      aria-label="채팅 메시지 입력"
                  />
                  {browserSupportsSpeech && (
                    <button 
                      type="button" 
                      onClick={handleMicClick}
                      disabled={isLoading || !chatInitialized}
                      className={`p-3 rounded-lg flex-shrink-0 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isListening ? `bg-red-500 text-white animate-pulse` : `bg-[${THEME_COLORS.MOCHA}]/10 text-[${THEME_COLORS.MOCHA}] hover:bg-[${THEME_COLORS.MOCHA}]/20`}`}
                      aria-label={isListening ? "음성 입력 중지" : "음성으로 입력하기"}
                    >
                      <MicrophoneIcon className="w-6 h-6"/>
                    </button>
                  )}
                  <button 
                      type="submit" 
                      disabled={isLoading || !chatInitialized || inputValue.trim() === ''}
                      className={`p-3 rounded-lg bg-[${THEME_COLORS.GOLD}] text-white hover:bg-opacity-80 transition-colors disabled:bg-opacity-50 disabled:cursor-not-allowed flex-shrink-0`}
                      aria-label="메시지 전송"
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                      </svg>
                  </button>
                </form>
            </div>
        )}
         {showConsultationForm && (
            <div className="p-4 border-t border-[${THEME_COLORS.MOCHA}]/20 text-center">
                {/* Form footer content, if any, can go here. Or keep it clean. */}
            </div>
        )}
      </div>
    </div>
  );
};

export default ChatModal;
