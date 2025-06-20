import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';
import { searchMovies } from '../api/tmdb';
import Card from '../components/Card';
import { AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, Squares2X2Icon, Bars3Icon } from '@heroicons/react/24/outline';

const currentYear = new Date().getFullYear();

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('movie');
  const [minRating, setMinRating] = useState(0);
  const [year, setYear] = useState('');
  const [view, setView] = useState(() => localStorage.getItem('searchViewMode') || 'grid');
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      setLoading(true);
      searchMovies(debouncedQuery)
        .then((res) => {
          setResults(res.data.results);
        })
        .catch((err) => {
          console.error(err);
          setResults([]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    localStorage.setItem('searchViewMode', view);
  }, [view]);

  // Filtreleme işlemi frontend'de yapılacak
  const filteredResults = results.filter(item => {
    const rating = item.vote_average || 0;
    const releaseYear = (item.release_date || item.first_air_date || '').slice(0, 4);
    const matchesType = type === 'all' || (type === 'movie' ? item.title : item.name);
    const matchesRating = rating >= minRating;
    const matchesYear = !year || releaseYear === year;
    return matchesType && matchesRating && matchesYear;
  });

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="relative mb-8 max-w-2xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="w-full p-4 pl-12 rounded-full bg-light-card dark:bg-dark-card backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary shadow-lg"
        />
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-light-text/60 dark:text-dark-text/60" />
      </div>

      {/* Filtre Barı ve Görünüm Toggle */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8">
        <select value={type} onChange={e => setType(e.target.value)} className="btn-outline">
          <option value="all">All</option>
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
        </select>
        <div className="flex items-center gap-2">
          <label htmlFor="minRating" className="text-light-subtext dark:text-dark-subtext">IMDB {minRating}+</label>
          <input
            id="minRating"
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={minRating}
            onChange={e => setMinRating(Number(e.target.value))}
            className="w-32 accent-indigo-500"
          />
        </div>
        <input
          type="number"
          min="1900"
          max={currentYear}
          value={year}
          onChange={e => setYear(e.target.value)}
          placeholder="Year"
          className="btn-outline w-24"
        />
        <div className="flex items-center gap-2 ml-2">
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

      <h2 className="text-4xl font-extrabold font-comfortaa bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-500 bg-clip-text text-transparent tracking-tight drop-shadow-2xl mb-6 text-left">
        Search Results
      </h2>
      <div>
        {loading ? (
          <div className="flex flex-col gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="w-full h-32 sm:h-40 glass-card animate-pulse bg-gradient-to-r from-indigo-100/40 via-pink-100/40 to-purple-100/40 dark:from-indigo-900/30 dark:via-pink-900/30 dark:to-purple-900/30" />
            ))}
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredResults.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <AnimatePresence>
              {filteredResults.map((item) => (
                <Card key={item.id} item={item} variant="list" />
              ))}
            </AnimatePresence>
          </div>
        )}
        {!loading && filteredResults.length === 0 && query && (
          <p className="text-center mt-8">No results found for "{query}"</p>
        )}
      </div>
    </div>
  );
};

export default Search; 