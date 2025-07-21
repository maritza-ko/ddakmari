import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ChatFAB from './components/ChatFAB';
import ChatModal from './components/ChatModal'; // Import the new ChatModal component
import { THEME_COLORS } from './constants';

const App: React.FC = () => {
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const toggleChatModal = () => {
    setIsChatModalOpen(!isChatModalOpen);
  };

  return (
    <HashRouter>
      <div className={`flex flex-col min-h-screen bg-[${THEME_COLORS.CREAM}] text-[${THEME_COLORS.MOCHA}]`}>
        <Navbar />
        <main className="flex-grow">
          <HomePage />
        </main>
        <Footer />
        <ChatFAB onToggleChat={toggleChatModal} />
        <ChatModal isOpen={isChatModalOpen} onClose={toggleChatModal} />
      </div>
    </HashRouter>
  );
};

export default App;