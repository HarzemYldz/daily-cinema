import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const currentLang = i18n.language === 'tr' ? 'TR' : 'EN';

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="glass-btn flex items-center gap-1 px-3 py-1 rounded-full hover:scale-105 transition"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
      >
        <GlobeAltIcon className="w-5 h-5 text-indigo-500" />
        <span className="font-bold text-sm">{currentLang}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-24 glass-card shadow-lg rounded-xl py-2 z-50 flex flex-col">
          <button
            onClick={() => changeLang('tr')}
            className={`px-4 py-2 text-left hover:bg-indigo-50 dark:hover:bg-indigo-900 rounded-lg transition font-comfortaa ${currentLang === 'TR' ? 'text-indigo-600 font-bold' : ''}`}
          >
            🇹🇷 Türkçe
          </button>
          <button
            onClick={() => changeLang('en')}
            className={`px-4 py-2 text-left hover:bg-indigo-50 dark:hover:bg-indigo-900 rounded-lg transition font-comfortaa ${currentLang === 'EN' ? 'text-indigo-600 font-bold' : ''}`}
          >
            🇬🇧 English
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 