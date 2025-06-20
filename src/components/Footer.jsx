import React from 'react';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="glass-card border-t border-white/10 shadow-glass-xl mt-12 py-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 items-center px-4">
        <div className="flex flex-col items-center sm:items-start gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent font-comfortaa">DailyCinema</span>
          <span className="text-light-text dark:text-dark-text">Made with <span className="text-red-500">❤️</span> by Harzem Umut Yıldız</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <a href="https://github.com/HarzemYldz" target="_blank" rel="noopener noreferrer" className="glass-btn" aria-label="GitHub"><FaGithub className="w-5 h-5" /></a>
            <a href="https://www.linkedin.com/in/harzem-umut-y%C4%B1ld%C4%B1z-2356801b7/" target="_blank" rel="noopener noreferrer" className="glass-btn" aria-label="LinkedIn"><FaLinkedin className="w-5 h-5" /></a>
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
          <span className="text-xs text-light-subtext dark:text-dark-subtext">API by <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="underline">TMDB</a></span>
        </div>
        <div className="flex flex-col items-center sm:items-end gap-2 text-xs text-light-subtext dark:text-dark-subtext">
          <span>© {new Date().getFullYear()} DailyCinema</span>
          <span>Yasal Uyarı: Bu site TMDB API verilerini kullanır, ticari amaçlı değildir.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 