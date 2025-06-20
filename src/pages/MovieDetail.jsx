import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { getMovieDetails, getBackdropUrl, getPosterUrl } from '../api/tmdb';
import { StarIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

const MovieDetail = () => {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const lang = i18n.language === 'tr' ? 'tr-TR' : 'en-US';
  const fallbackLang = i18n.language === 'tr' ? 'en-US' : 'tr-TR';
  const fetchFn = useCallback(() => getMovieDetails(id, lang), [id, lang]);
  const { data: movie, loading, error } = useFetch(fetchFn, [fetchFn]);
  const [fallbackMovie, setFallbackMovie] = useState(null);

  useEffect(() => {
    setFallbackMovie(null);
  }, [lang, id]);

  useEffect(() => {
    if (movie && (!movie.overview || !movie.title)) {
      getMovieDetails(id, fallbackLang).then(res => setFallbackMovie(res.data));
    }
  }, [movie, id, fallbackLang]);

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-light-primary dark:border-dark-primary"></div></div>;
  if (error) return <div className="flex justify-center items-center h-screen"><p className="text-red-500">Error loading movie details.</p></div>;

  const displayMovie = movie && (movie.overview || movie.title) ? movie : fallbackMovie || movie;

  return (
    <div className="min-h-screen">
      {displayMovie && (
        <>
          <div
            className="w-full h-[60vh] bg-cover bg-center relative"
            style={{ backgroundImage: `url(${getBackdropUrl(displayMovie.backdrop_path)})` }}
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-light-background via-light-background/50 to-transparent dark:from-dark-background dark:via-dark-background/50" />
          </div>
          <div className="container mx-auto px-4 md:px-8 py-8 -mt-48 relative z-10">
            <div className="md:flex md:space-x-8">
              <div className="md:w-1/3 flex-shrink-0">
                <img src={getPosterUrl(displayMovie.poster_path)} alt={displayMovie.title} className="rounded-lg shadow-2xl w-full" />
              </div>
              <div className="md:w-2/3 mt-8 md:mt-0">
                <h1 className="text-4xl lg:text-5xl font-bold mb-2">{displayMovie.title}</h1>
                <p className="text-lg text-light-text/80 dark:text-dark-text/80 mb-4">{displayMovie.tagline}</p>
                <div className="flex items-center mb-4">
                  <StarIcon className="w-6 h-6 text-yellow-500 mr-1" />
                  <span className="text-xl font-bold">{displayMovie.vote_average?.toFixed(1)}</span>
                  <span className="text-sm ml-2 text-light-text/70 dark:text-dark-text/70">({displayMovie.vote_count} votes)</span>
                  <span className="mx-4">|</span>
                  <span>{displayMovie.release_date}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {displayMovie.genres?.map(genre => (
                    <span key={genre.id} className="px-3 py-1 bg-white/10 dark:bg-white/5 rounded-full text-sm">{genre.name}</span>
                  ))}
                </div>
                <h2 className="text-2xl font-semibold mb-2">Overview</h2>
                <p className="text-light-text/90 dark:text-dark-text/90 leading-relaxed">{displayMovie.overview}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail; 