
import React from 'react';
import { THEME_COLORS, ChatBubbleIcon } from '../constants';

interface ChatFABProps {
  onToggleChat: () => void;
}

const ChatFAB: React.FC<ChatFABProps> = ({ onToggleChat }) => {
  return (
    <button
      onClick={onToggleChat}
      aria-label="챗봇과 대화하기"
      title="챗봇과 대화하기"
      className={`
        fixed top-1/2 -translate-y-1/2 right-4 sm:right-6 md:right-8
        z-[1000]
        w-16 h-16
        rounded-full
        shadow-xl
        flex items-center justify-center
        hover:scale-110 hover:shadow-2xl
        active:scale-100
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-4 focus:ring-sky-400 focus:ring-opacity-50
        overflow-hidden /* 'relative' 클래스를 여기서 제거했습니다. */
      `}
    >
      <img
        src="assets/images/20.png"
        alt="챗봇 배경"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <ChatBubbleIcon
        className={`
          relative z-10 w-10 h-10
          text-white opacity-75
          drop-shadow-lg
        `}
      />
    </button>
  );
};

export default ChatFAB;
