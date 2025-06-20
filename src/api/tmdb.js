import axiosInstance from './axios';

const imageBaseUrl = 'https://image.tmdb.org/t/p/original';
const posterBaseUrl = 'https://image.tmdb.org/t/p/w500';

export const getPopularMovies = (language = 'en-US') => axiosInstance.get('/movie/popular', { params: { language } });
export const getNowPlayingMovies = (language = 'en-US') => axiosInstance.get('/movie/now_playing', { params: { language } });
export const getPopularTvShows = (language = 'en-US') => axiosInstance.get('/tv/popular', { params: { language } });
export const getMovieDetails = (movieId, language = 'en-US') => axiosInstance.get(`/movie/${movieId}`, { params: { language } });
export const searchMovies = (query, language = 'en-US') => axiosInstance.get('/search/movie', { params: { query, language } });

export const getBackdropUrl = (path) => `${imageBaseUrl}${path}`;
export const getPosterUrl = (path) => `${posterBaseUrl}${path}`; 