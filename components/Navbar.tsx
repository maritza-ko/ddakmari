
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NAV_LINKS, THEME_COLORS } from '../constants';
// Removed: import logoImg from '../assets/images/1.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [activeHash, setActiveHash] = useState(location.hash);

  useEffect(() => {
    setActiveHash(location.hash);
  }, [location.hash]);

  const handleLinkClick = (hash: string) => {
    setIsOpen(false);
    // Smooth scroll to element if not handled by browser alone
    const element = document.getElementById(hash.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <nav className={`sticky top-0 z-50 shadow-lg bg-[${THEME_COLORS.CREAM}]`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#hero" onClick={() => handleLinkClick('#hero')} className="flex items-center">
              <img className="h-12 w-auto" src="assets/images/1.png" alt="딱마리치킨 로고" />
              <span className={`ml-3 text-2xl font-bold text-[${THEME_COLORS.MOCHA}]`}>딱마리치킨</span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.path} // Use direct hash path
                  onClick={() => handleLinkClick(link.path)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out
                    ${activeHash === link.path || (link.path === '#hero' && activeHash === '') 
                      ? `bg-[${THEME_COLORS.GOLD}] text-[${THEME_COLORS.TEXT_LIGHT}]` 
                      : `text-[${THEME_COLORS.MOCHA}] hover:bg-[${THEME_COLORS.GOLD}]/20 hover:text-[${THEME_COLORS.MOCHA}]/80`
                    }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md text-[${THEME_COLORS.MOCHA}] hover:text-white hover:bg-[${THEME_COLORS.GOLD}] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`block px-3 py-2 rounded-md text-base font-medium
                  ${activeHash === link.path || (link.path === '#hero' && activeHash === '') 
                    ? `bg-[${THEME_COLORS.GOLD}] text-[${THEME_COLORS.TEXT_LIGHT}]` 
                    : `text-[${THEME_COLORS.MOCHA}] hover:bg-[${THEME_COLORS.GOLD}]/20 hover:text-[${THEME_COLORS.MOCHA}]/80`
                  }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
