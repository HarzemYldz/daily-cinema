import React, { useCallback, useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { getPopularMovies, getPopularTvShows, getNowPlayingMovies } from '../api/tmdb';
import Card from '../components/Card';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { Squares2X2Icon, Bars3Icon } from '@heroicons/react/24/outline';
import NowPlayingSlider from '../components/NowPlayingSlider';

const MovieRow = ({ title, apiCall, id, language }) => {
  const fetchFn = useCallback(() => apiCall(language), [apiCall, language]);
  const { data, loading, error } = useFetch(fetchFn, [fetchFn]);
  const [view, setView] = useState(() => localStorage.getItem('viewMode') || 'grid');

  useEffect(() => {
    localStorage.setItem('viewMode', view);
  }, [view]);

  if (error) return <p className="text-red-500">Error loading data.</p>;

  return (
    <section id={id} className="glass-section border-t border-white/20 shadow-glass my-12">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-5xl font-extrabold font-comfortaa bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-500 bg-clip-text text-transparent tracking-tight drop-shadow-2xl mb-1 text-left">
            {title}
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-500 rounded-full mb-2 shadow-lg" />
        </div>
        <div className="flex items-center gap-2">
          <button
            className={`p-2 glass-btn rounded-full shadow hover:scale-105 transition ${view === 'grid' ? 'ring-2 ring-indigo-400' : ''}`}
            onClick={() => setView('grid')}
            aria-label="Grid view"
          >
            <Squares2X2Icon className="w-5 h-5" />
          </button>
          <button
            className={`p-2 glass-btn rounded-full shadow hover:scale-105 transition ${view === 'list' ? 'ring-2 ring-indigo-400' : ''}`}
            onClick={() => setView('list')}
            aria-label="List view"
          >
            <Bars3Icon className="w-5 h-5" />
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex flex-col gap-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="w-full h-32 sm:h-40 glass-card animate-pulse bg-gradient-to-r from-indigo-100/40 via-pink-100/40 to-purple-100/40 dark:from-indigo-900/30 dark:via-pink-900/30 dark:to-purple-900/30" />
          ))}
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-10">
          <AnimatePresence>
            {data?.results.slice(0, 15).map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <AnimatePresence>
            {data?.results.slice(0, 15).map((item) => (
              <Card key={item.id} item={item} variant="list" />
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
};

const Home = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'tr' ? 'tr-TR' : 'en-US';

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover fixed"
          // src="/src/assets/bg-video.mp4"
        />
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#3b82f6] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#3b82f6] opacity-80 z-[-1] transition-all duration-700" />
      </div>
      <div className="container mx-auto px-4 py-16">
        <NowPlayingSlider />
        <MovieRow id="popular-movies" title={t('popular_movies')} apiCall={getPopularMovies} language={lang} />
        <MovieRow id="popular-series" title={t('popular_series')} apiCall={getPopularTvShows} language={lang} />
      </div>
    </div>
  );
};

export default Home; 