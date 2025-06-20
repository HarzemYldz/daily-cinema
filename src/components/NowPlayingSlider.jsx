import React, { useCallback } from 'react';
import useFetch from '../hooks/useFetch';
import { getNowPlayingMovies, getBackdropUrl } from '../api/tmdb';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';

const NowPlayingSlider = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'tr' ? 'tr-TR' : 'en-US';
  const fetchFn = useCallback(() => getNowPlayingMovies(lang), [lang]);
  const { data, loading, error } = useFetch(fetchFn, [fetchFn]);

  if (error) return null;

  if (loading) {
    return (
      <div id="now-playing" className="w-full h-[60vh] glass-card animate-pulse bg-gradient-to-r from-indigo-100/40 via-pink-100/40 to-purple-100/40 dark:from-indigo-900/30 dark:via-pink-900/30 dark:to-purple-900/30 mb-12 rounded-2xl"></div>
    );
  }

  return (
    <section id="now-playing" className="relative mb-12">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        loop={true}
        className="now-playing-swiper"
      >
        {data?.results.slice(0, 10).map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={getBackdropUrl(movie.backdrop_path)}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <h2 className="text-4xl font-bold font-comfortaa drop-shadow-lg mb-2">{movie.title}</h2>
                  <div className="flex items-center gap-2">
                     <StarIcon className="w-6 h-6 text-yellow-400" />
                     <span className="text-xl font-bold">{movie.vote_average.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-prev-custom glass-btn !p-2 !rounded-full absolute top-1/2 -translate-y-1/2 left-4 z-10 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
      </div>
      <div className="swiper-button-next-custom glass-btn !p-2 !rounded-full absolute top-1/2 -translate-y-1/2 right-4 z-10 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
      </div>
    </section>
  );
};

export default NowPlayingSlider; 