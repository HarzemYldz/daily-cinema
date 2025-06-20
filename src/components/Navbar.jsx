import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const NavLink = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = to === location.hash || (to === '/' && location.pathname === '/');
  return (
    <a
      href={to}
      onClick={e => {
        if (to.startsWith('#')) {
          e.preventDefault();
          const targetId = to.substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
          if (onClick) onClick();
        }
      }}
      className={`px-4 py-2 rounded-lg font-bold text-light-text dark:text-dark-text hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white/20 dark:hover:bg-white/10 transition-colors font-comfortaa ${isActive ? 'border-b-2 border-indigo-500 text-indigo-600' : ''}`}
    >
      {children}
    </a>
  );
};

const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: t('popular_movies'), to: '#popular-movies' },
    { name: t('popular_series'), to: '#popular-series' },
    { name: t('now_playing'), to: '#now-playing' },
    { name: t('search'), to: '/search' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* Top Navbar (not scrolled) */}
      <div className={`fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none transition-all duration-500 ${isScrolled ? 'pt-6' : ''}`}>
        <div className={`container mx-auto px-4 pointer-events-auto max-w-7xl ${isScrolled ? 'glass-card sticky top-0 rounded-2xl shadow-glass-xl py-3' : 'bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/20 shadow-md rounded-2xl py-3 mt-4'} transition-all duration-500`}> 
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
            <div className="flex flex-col items-center sm:items-start">
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent font-comfortaa">DailyCinema</Link>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-comfortaa mt-1">Your daily visual entertainment guide.</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              {location.pathname === '/' && navLinks.filter(l => l.to.startsWith('#')).map(link => (
                <NavLink key={link.name} to={link.to}>{link.name}</NavLink>
              ))}
              <Link to="/search" className="px-4 py-2 rounded-lg font-bold text-light-text dark:text-dark-text hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white/20 dark:hover:bg-white/10 transition-colors font-comfortaa">{t('search')}</Link>
            </div>
            <div className="flex items-center space-x-2 mt-2 sm:mt-0">
              <ThemeToggle />
              <LanguageSwitcher />
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-md text-light-text dark:text-dark-text">
                {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Glass Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 w-full z-50 flex justify-center md:hidden"
          >
            <div className="glass-card w-[90vw] max-w-2xl mx-auto flex flex-col items-center space-y-2 py-4">
              {location.pathname === '/' && navLinks.filter(l => l.to.startsWith('#')).map(link => (
                <NavLink key={link.name} to={link.to} onClick={closeMenu}>{link.name}</NavLink>
              ))}
              <Link to="/search" onClick={closeMenu} className="px-4 py-2 rounded-lg font-bold text-light-text dark:text-dark-text hover:bg-white/20 dark:hover:bg-white/10 transition-colors">{t('search')}</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 