import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="glass-btn w-12 h-6 flex items-center rounded-full relative p-0 transition-all duration-300 focus:outline-none"
      aria-label="Toggle theme"
    >
      <span className="absolute left-0 top-0 w-12 h-6 bg-gray-200 dark:bg-gray-800 rounded-full transition-colors duration-300 border border-glass" />
      <span
        className={`absolute top-0 left-0 w-6 h-6 flex items-center justify-center rounded-full shadow transition-transform duration-300 border border-glass ${theme === 'dark' ? 'translate-x-6 bg-indigo-500 text-white' : 'translate-x-0 bg-white text-yellow-400'}`}
      >
        {theme === 'light' ? (
          <SunIcon className="w-5 h-5 transition-transform duration-300 scale-100" />
        ) : (
          <MoonIcon className="w-5 h-5 transition-transform duration-300 scale-110" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle; 