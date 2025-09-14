
import React from 'react';

const ChefHatIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.15,8.65A3,3,0,0,0,17,4.36V2a1,1,0,0,0-2,0V4.1a5,5,0,0,0-8,2.9,5.13,5.13,0,0,0,0,4,5,5,0,0,0,8,2.9V20.73a1.4,1.4,0,0,0,1.38,1.27h0a1.4,1.4,0,0,0,1.38-1.27V14.12A3.13,3.13,0,0,0,21,11a3,3,0,0,0-1.85-2.35ZM12,14a3,3,0,0,1-3-3A3.09,3.09,0,0,1,12,8a3,3,0,0,1,0,6Z"/>
    </svg>
);


const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md border-b border-slate-200">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-center text-center">
        <ChefHatIcon className="w-8 h-8 text-primary mr-3"/>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
          Gemini Recipe Generator
        </h1>
      </div>
    </header>
  );
};

export default Header;
