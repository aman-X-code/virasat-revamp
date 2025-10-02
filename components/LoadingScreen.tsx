"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

export default function LoadingScreen({
  onLoadingComplete,
}: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        onLoadingComplete?.();
      },
    });

    // Set initial states with null checks
    if (textRef.current) gsap.set(textRef.current, { opacity: 0, scale: 0.8 });
    if (lettersRef.current.length > 0)
      gsap.set(lettersRef.current, { opacity: 0, y: 30, rotationX: -90 });
    if (particlesRef.current.length > 0)
      gsap.set(particlesRef.current, { scale: 0, opacity: 0 });
    if (glowRef.current) gsap.set(glowRef.current, { scale: 0, opacity: 0 });

    // Phase 1: Fade in text container
    if (textRef.current) {
      tl.to(textRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        force3D: true,
      });
    }

    // Phase 2: Reveal letters with 3D effect
    if (lettersRef.current.length > 0) {
      tl.to(
        lettersRef.current,
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "back.out(1.7)",
          force3D: true,
        },
        "-=0.4"
      );
    }

    // Phase 3: Glow effect appears
    if (glowRef.current) {
      tl.to(
        glowRef.current,
        {
          scale: 1.5,
          opacity: 0.8,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }

    // Phase 4: Particles appear and animate
    if (particlesRef.current.length > 0) {
      tl.to(
        particlesRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.03,
          ease: "power2.out",
        },
        "-=0.4"
      );
    }

    // Phase 5: Hold the text for a moment
    tl.to({}, { duration: 0.6 });

    // Phase 6: Zoom transition through letter T
    if (containerRef.current) {
      tl.to(
        containerRef.current,
        {
          scale: 50,
          duration: 2.5,
          ease: "power2.inOut",
          onStart: () => {
            if (containerRef.current) {
              containerRef.current.style.transformOrigin = "50% 50%";
            }
          },
          onUpdate: () => {
            // Add subtle perspective changes during zoom for enhanced 3D effect
            if (containerRef.current) {
              const progress = tl.progress();
              const perspective = 2000 + progress * 3000;
              containerRef.current.style.perspective = `${perspective}px`;
            }
          },
        },
        "-=0.2"
      );
    }

    // Phase 7: Fade out the loading text & overlay
    const fadeOutElements = [];
    if (textRef.current) fadeOutElements.push(textRef.current);
    if (glowRef.current) fadeOutElements.push(glowRef.current);

    if (fadeOutElements.length > 0) {
      tl.to(
        fadeOutElements,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        "-=1.2"
      );
    }

    if (overlayRef.current) {
      tl.to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.1,
          ease: "power2.out",
        },
        "-=0.1"
      );
    }

    return () => {
      tl.kill();
    };
  }, [onLoadingComplete]);

  const letters = "VIRASAT".split("");

  return (
    <>
      {/* Loading Screen Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 100%)",
        }}
      >
        <div
          ref={containerRef}
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          style={{
            perspective: "2000px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Animated background particles */}
          <div
            className="absolute inset-0"
            style={{ transform: "translateZ(-100px)" }}
          >
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) particlesRef.current[i] = el;
                }}
                className="absolute w-1 h-1 bg-white rounded-full opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `particleFloat ${
                    3 + Math.random() * 4
                  }s infinite ease-in-out ${Math.random() * 2}s`,
                  transform: `translateZ(${Math.random() * 200 - 100}px)`,
                }}
              />
            ))}
          </div>

          {/* Main text container */}
          <div
            ref={textRef}
            className="relative z-10"
            style={{
              transform: "translateZ(0px)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="relative text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-wider flex loading-text">
              {letters.map((letter, index) => (
                <span
                  key={index}
                  ref={(el) => {
                    if (el) lettersRef.current[index] = el;
                  }}
                  className="inline-block"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    letterSpacing: "0.15em",
                    textShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
                    transform:
                      index === 6
                        ? "translateZ(20px)"
                        : `translateZ(${Math.random() * 10}px)`,
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>

          {/* Depth layer */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at center, transparent 25%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.8) 90%),
                radial-gradient(circle at center, transparent 35%, rgba(255,255,255,0.02) 60%, transparent 80%)
              `,
              transform: "translateZ(-50px)",
            }}
          />
        </div>
      </div>

      {/* Extra CSS */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;700;900&family=Noto+Serif+Devanagari:wght@400;700;900&display=swap");

        /* Prevent font flash and ensure smooth loading */
        .loading-text {
          font-family: "Noto Sans Devanagari", "Noto Serif Devanagari",
            "Arial Unicode MS", "Mangal", "Kokila", serif !important;
          font-display: swap;
          font-weight: 700;
        }

        @keyframes particleFloat {
          0% {
            transform: translateY(0px);
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-20px);
            opacity: 0.1;
          }
        }
      `}</style>
    </>
  );
}
