import React from 'react';

interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  isDark?: boolean;
}

export const Section: React.FC<SectionProps> = ({ id, className = '', children, title, subtitle, isDark = false }) => {
  return (
    <section 
      id={id} 
      className={`py-16 md:py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${isDark ? 'bg-emerald-900 text-white' : 'bg-transparent text-gray-800'} ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && (
              <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-4 ${isDark ? 'text-white' : 'text-emerald-900'}`}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`text-lg md:text-xl max-w-2xl mx-auto ${isDark ? 'text-emerald-100' : 'text-gray-600'}`}>
                {subtitle}
              </p>
            )}
            <div className={`w-24 h-1 mx-auto mt-6 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-emerald-600'}`} />
          </div>
        )}
        {children}
      </div>
    </section>
  );
};