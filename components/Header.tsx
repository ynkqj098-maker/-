import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10 dark:bg-slate-800 dark:border-b dark:border-slate-700">
      <div className="container mx-auto max-w-2xl px-4 py-4 md:px-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          健康観察アプリ
        </h1>
      </div>
    </header>
  );
};

export default Header;