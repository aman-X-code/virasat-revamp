'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const AnimatedArtistBackground = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const rangoliRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const background = backgroundRef.current;
    const rangoli = rangoliRef.current;

    if (!background || !rangoli) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: background,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    tl.to(rangoli, {
      rotation: 360,
      duration: 1,
      ease: 'none',
    });

    tl.to(
      background,
      {
        backgroundPosition: '0% 100%',
        ease: 'none',
      },
      0
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={backgroundRef}
      className="absolute inset-0 -z-10"
      style={{
        background: 'linear-gradient(180deg, #ffedd5, #fef3c7, #fce7f3, #e0e7ff)',
        backgroundSize: '100% 400%',
      }}
    >
      <Image
        ref={rangoliRef}
        src="/images/rangoli.svg"
        alt="Rangoli"
        width={500}
        height={500}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"
      />
    </div>
  );
};

export default AnimatedArtistBackground;
