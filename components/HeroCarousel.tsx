/**
 * HeroCarousel.tsx
 * Mobile video carousel component for VIRASAT festival website
 * 
 * */

'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const HeroCarousel = ({ items }: { items: { id: number; video: string }[] }) => {
  return (
    <div className="w-full h-full">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="w-full h-full"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="w-full h-full rounded-3xl overflow-hidden">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
                onContextMenu={(e) => e.preventDefault()}
                onError={(e) => {
                  console.error('Carousel video failed to load:', item.video);
                  // Fallback to gradient background if video fails
                  const videoElement = e.target as HTMLVideoElement;
                  const fallbackElement = document.createElement('div');
                  fallbackElement.className = 'w-full h-full bg-gradient-to-br from-amber-500/30 to-orange-600/30 flex items-center justify-center';
                  fallbackElement.innerHTML = '<div class="text-white/70 text-lg font-semibold">Heritage Video</div>';
                  videoElement.parentNode?.replaceChild(fallbackElement, videoElement);
                }}
              >
                <source src={item.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
