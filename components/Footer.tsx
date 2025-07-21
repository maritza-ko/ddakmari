import React from 'react';
import { THEME_COLORS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className={`py-8 text-center bg-[${THEME_COLORS.MOCHA}] text-[${THEME_COLORS.CREAM}]`}>
      <div className="container mx-auto px-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} 딱마리치킨 (Ttakmari Chicken). All rights reserved.
        </p>
        <p className="text-xs mt-1">
          본 사이트는 실제 운영되는 서비스가 아니며, 포트폴리오 목적으로 제작되었습니다.
        </p>
      </div>
    </footer>
  );
};

export default Footer;