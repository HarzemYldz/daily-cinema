import React, { useState, useEffect } from 'react';
import { getPosterUrl } from '../api/tmdb';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { StarIcon, HeartIcon } from '@heroicons/react/24/solid';

const genreColors = [
  'bg-indigo-500',
  'bg-pink-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-blue-500',
  'bg-red-500',
  'bg-teal-500',
];

const Card = ({ item, variant = 'grid' }) => {
  const title = item.title || item.name;
  const posterPath = item.poster_path;
  const linkTo = `/movie/${item.id}`;
  const rating = item.vote_average ? item.vote_average.toFixed(1) : null;
  const genres = item.genre_ids || item.genres || [];
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const likedItems = JSON.parse(localStorage.getItem('likedItems') || '[]');
    setLiked(likedItems.includes(item.id));
  }, [item.id]);

  const toggleLike = (e) => {
    e.preventDefault();
    let likedItems = JSON.parse(localStorage.getItem('likedItems') || '[]');
    if (liked) {
      likedItems = likedItems.filter(id => id !== item.id);
    } else {
      likedItems.push(item.id);
    }
    localStorage.setItem('likedItems', JSON.stringify(likedItems));
    setLiked(!liked);
  };

  if (variant === 'list') {
    return (
      <Link to={linkTo} className="block">
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-card flex flex-col sm:flex-row items-center gap-6 p-4 relative overflow-hidden shadow-glass-xl cursor-pointer hover:scale-[1.01] hover:shadow-glass-xl transition-all duration-300"
        >
          {/* Like Button */}
          <button
            onClick={toggleLike}
            className="absolute top-2 left-2 z-10 p-1 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-sm border border-glass shadow hover:scale-110 transition text-red-500"
            aria-label="Like"
          >
            <HeartIcon className={`w-5 h-5 ${liked ? 'text-red-500' : 'text-white dark:text-light-text'}`} />
          </button>
          {/* IMDB Rating Badge */}
          {rating && (
            <div className="absolute top-2 right-2 bg-black/60 dark:bg-white/20 text-white dark:text-light-text px-2 py-1 text-xs rounded-full shadow-sm backdrop-blur-sm border border-glass z-10 flex items-center gap-1">
              <StarIcon className="w-4 h-4 text-yellow-400" />
              <span className="font-bold">{rating}</span>
            </div>
          )}
          <img
            src={posterPath ? getPosterUrl(posterPath) : 'https://via.placeholder.com/500x750?text=No+Image'}
            alt={title}
            className="w-24 h-36 object-cover rounded-xl flex-shrink-0 shadow-lg border border-glass"
          />
          <div className="flex-1 flex flex-col gap-2 min-w-0">
            <h3 className="text-2xl font-bold font-comfortaa mb-1 text-light-text dark:text-dark-text truncate">{title}</h3>
            <div className="flex flex-wrap gap-2 mb-1">
              {genres.slice(0, 3).map((genre, idx) => (
                <span
                  key={typeof genre === 'object' ? genre.id : genre}
                  className={`px-2 py-0.5 text-xs rounded-full text-white shadow ${genreColors[idx % genreColors.length]} glass-blur border border-glass`}
                >
                  {typeof genre === 'object' ? genre.name : genre}
                </span>
              ))}
            </div>
            <p className="text-light-subtext dark:text-dark-subtext text-sm line-clamp-2">{item.overview}</p>
          </div>
        </motion.div>
      </Link>
    );
  }

  // Grid görünümü (default)
  return (
    <Link to={linkTo}>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="glass-card group relative overflow-hidden shadow-glass-xl cursor-pointer hover:scale-105 hover:shadow-glass-xl transition-all duration-300"
      >
        {/* Like Button */}
        <button
          onClick={toggleLike}
          className="absolute top-2 left-2 z-10 p-1 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-sm border border-glass shadow hover:scale-110 transition text-red-500"
          aria-label="Like"
        >
          <HeartIcon className={`w-5 h-5 ${liked ? 'text-red-500' : 'text-white dark:text-light-text'}`} />
        </button>
        {/* IMDB Rating Badge */}
        {rating && (
          <div className="absolute top-2 right-2 bg-black/60 dark:bg-white/20 text-white dark:text-light-text px-2 py-1 text-xs rounded-full shadow-sm backdrop-blur-sm border border-glass z-10 flex items-center gap-1">
            <StarIcon className="w-4 h-4 text-yellow-400" />
            <span className="font-bold">{rating}</span>
          </div>
        )}
        <img
          src={posterPath ? getPosterUrl(posterPath) : 'https://via.placeholder.com/500x750?text=No+Image'}
          alt={title}
          className="w-full h-full object-cover rounded-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <h3 className="text-white text-lg font-bold font-comfortaa mb-2 drop-shadow-lg">{title}</h3>
        </div>
        {/* Genre Chips */}
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1 z-10">
          {genres.slice(0, 3).map((genre, idx) => (
            <span
              key={typeof genre === 'object' ? genre.id : genre}
              className={`px-2 py-0.5 text-xs rounded-full text-white shadow ${genreColors[idx % genreColors.length]} glass-blur border border-glass`}
            >
              {typeof genre === 'object' ? genre.name : genre}
            </span>
          ))}
        </div>
      </motion.div>
    </Link>
  );
};

export default Card; 