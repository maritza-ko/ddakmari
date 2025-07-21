import React from 'react';
import { THEME_COLORS } from '../constants';

interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, subtitle, className = '' }) => {
  return (
    <div className={`mb-8 sm:mb-12 text-center ${className}`}>
      <h2 className={`text-3xl sm:text-4xl font-bold text-[${THEME_COLORS.MOCHA}]`}>
        {children}
      </h2>
      {subtitle && (
        <p className={`mt-2 text-lg sm:text-xl text-[${THEME_COLORS.MOCHA_LIGHT}]`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;