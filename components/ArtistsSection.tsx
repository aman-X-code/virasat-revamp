"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import ComponentErrorBoundary from "./ComponentErrorBoundary";

const artists = [
  {
    name: "Dinesh Thakur",
    title: "Folk Singer",
    description:
      "Respected theatre director and actor, founder of Mumbai's Ank. His landmark productions include Jasma Odan, Panchi Aise Aate Hain, and Hai Mera Dil, noted for compelling performances and storytelling.",
    specialty: "Folk Music",
    years: "1980s–Present",
    image:
      "https://res.cloudinary.com/digilabs/image/upload/f_auto,q_auto,w_400/prod/artists/prod/artists/dinesh_thakur.jpg",
  },
  {
    name: "Naseeruddin Shah",
    title: "Theatre & Film Actor",
    description:
      "Acclaimed Indian actor with landmark roles in Sparsh, Aakrosh, Jaane Bhi Do Yaaro, and Iqbal; co-founder of Motley Productions, noted for staging Waiting for Godot and Ismat Apa Ke Naam.",
    specialty: "Theatre & Cinema",
    years: "1970s–Present",
    image:
      "https://res.cloudinary.com/digilabs/image/upload/f_auto,q_auto,w_400/prod/artists/prod/artists/naseeruddin_shah.jpg",
  },
  {
    name: "Ustad Amjad Ali Khan",
    title: "Sarod Maestro",
    description:
      "Ustad Amjad Ali Khan is a legendary sarod maestro, renowned for masterpieces like Raga Shree, Bhairavi, and Durga. From the Senia Bangash gharana, he brought the sarod to global stages through pathbreaking collaborations.",
    specialty: "Classical Sarod",
    years: "1960s–Present",
    image:
      "https://res.cloudinary.com/digilabs/image/upload/f_auto,q_auto,w_400/prod/artists/prod/artists/ustad_amjad_ali_khan.jpg",
  },
  {
    name: "Wadali Brothers",
    title: "Sufi Folk Singers",
    description:
      "The Wadali Brothers, Puranchand and Pyarelal Wadali, were iconic exponents of Sufi and devotional music from Punjab. Their renditions of Bulleh Shah and Amir Khusro's poetry became legendary, and their songs like Tu Maane Ya Na Maane Dildara and Ik Tu Hi Tu Hi continue to inspire lovers of Sufi music.",
    specialty: "Sufi Folk Music",
    years: "1970s–Present",
    image:
      "https://res.cloudinary.com/digilabs/image/upload/v1759221518/prod/artists/prod/artists/wadali_brothers_vqwxqk.jpg",
  },
  {
    name: "Dr. Sonal Mansingh",
    title: "Classical Dancer",
    description:
      "One of India's most distinguished classical dancers, acclaimed for Bharatanatyam and Odissi. A Padma Vibhushan awardee who has represented India worldwide, using dance to narrate mythology, spirituality, and contemporary themes.",
    specialty: "Bharatanatyam & Odissi",
    years: "1960s–Present",
    image:
      "https://res.cloudinary.com/digilabs/image/upload/v1759221514/prod/artists/prod/artists/sonal_mansingh_gd588b.jpg",
  },
  {
    name: "Manoj Tiwari",
    title: "Classical Vocalist",
    description:
      "A renowned classical vocalist, Manoj Tiwari is celebrated for his soulful renditions rooted in Indian classical traditions. He is admired for preserving heritage music while bringing freshness to every performance.",
    specialty: "Classical Vocal",
    years: "1980s–Present",
    image:
      "https://res.cloudinary.com/digilabs/image/upload/v1759221500/prod/artists/prod/artists/manoj_tiwari_e2ll5o.jpg",
  },
  {
    name: "Vidushi Kala",
    title: "Classical Dancer",
    description:
      "A distinguished classical dancer and teacher, Vidushi Kala is recognized for her mastery and dedication to nurturing the next generation of artists. Her performances embody tradition, discipline, and elegance.",
    specialty: "Classical Dance",
    years: "1970s–Present",
    image:
      "https://res.cloudinary.com/digilabs/image/upload/v1759221515/prod/artists/prod/artists/vidushi_kala_lqrte3.jpg",
  },
  {
    name: "Jagjit Singh",
    title: "Ghazal King",
    description:
      'Jagjit Singh, the "Ghazal King," revolutionized ghazal singing with his melodious voice and modern approach. His music brought poetry to the masses, leaving behind an immortal legacy of soulful compositions.',
    specialty: "Ghazal Singing",
    years: "1960s–2011",
    image:
      "https://res.cloudinary.com/digilabs/image/upload/v1759221494/prod/artists/prod/artists/jagjit_singh_xwcyvz.jpg",
  },
  {
    name: "Birju Maharaj",
    title: "Kathak Legend",
    description:
      "Pandit Birju Maharaj was a legendary Kathak dancer and choreographer, hailed as the torchbearer of the Lucknow gharana. His grace, storytelling, and rhythm made him one of India's greatest cultural icons.",
    specialty: "Kathak Dance",
    years: "1950s–2022",
    image:
      "https://res.cloudinary.com/digilabs/image/upload/v1759221493/prod/artists/prod/artists/birju_maharaj_sckjwj.jpg",
  },
  {
    name: "Kailash Kher",
    title: "Playback Singer",
    description:
      "Kailash Kher is a celebrated Indian playback singer and composer, known for his powerful, soulful voice. Famed for hits like Teri Deewani and Saiyyan, he brings the magic of Indian folk and Sufi influences to contemporary music.",
    specialty: "Playback & Folk Music",
    years: "1990s–Present",
    image:
      "https://res.cloudinary.com/digilabs/image/upload/v1759221495/prod/artists/prod/artists/kailash_kher_kyms7n.jpg",
  },
];

const ArtistsSection = () => {
  const [currentArtistIndex, setCurrentArtistIndex] = useState(0);
  const [visibleCardIndex, setVisibleCardIndex] = useState(0); // 0-9 for all artists
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // Get current artist
  const getCurrentArtist = () => {
    return artists[currentArtistIndex];
  };

  // Get current group of artists (5 at a time)
  const getCurrentGroupArtists = () => {
    const currentGroup = Math.floor(currentArtistIndex / 5);
    const startIndex = currentGroup * 5;
    return artists.slice(startIndex, startIndex + 5);
  };

  // Get current artist position within the group (0-4)
  const getCurrentArtistPosition = () => {
    return currentArtistIndex % 5;
  };

  // Auto-rotate every 4 seconds
  useEffect(() => {
    if (!isAutoRotating) return;

    const interval = setInterval(() => {
      setCurrentArtistIndex((prev) => (prev + 1) % artists.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoRotating]);

  const handleArtistClick = (index: number) => {
    const currentGroup = Math.floor(currentArtistIndex / 5);
    const newArtistIndex = currentGroup * 5 + index;
    setCurrentArtistIndex(newArtistIndex);
    setIsAutoRotating(false);

    // Resume auto-rotation after 8 seconds
    setTimeout(() => {
      setIsAutoRotating(true);
    }, 8000);
  };

  const handleArtistHover = (index: number) => {
    const currentGroup = Math.floor(currentArtistIndex / 5);
    const artistIndex = currentGroup * 5 + index;
    if (artistIndex === currentArtistIndex) {
      setIsAutoRotating(false);
    }
  };

  const handleArtistLeave = (index: number) => {
    const currentGroup = Math.floor(currentArtistIndex / 5);
    const artistIndex = currentGroup * 5 + index;
    if (artistIndex === currentArtistIndex) {
      setIsAutoRotating(true);
      // Immediately advance to next artist
      setCurrentArtistIndex((prev) => (prev + 1) % artists.length);
    }
  };

  return (
    <ComponentErrorBoundary componentName="Artists Section">
      <section
        id="artists"
        className="py-20 px-4 sm:px-6 min-h-screen relative overflow-hidden"
        style={{
          backgroundColor: "#000",
          contain: "layout style paint",
          isolation: "isolate",
          zIndex: 5,
        }}
      >
        {/* Left Curtain */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 z-1 pointer-events-none hidden md:block"
          style={{
            width: "450px",
            backgroundImage: "url(https://res.cloudinary.com/digilabs/image/upload/f_auto,q_95,w_900,c_limit/v1759346217/prod/artists/prod/artists/curtain-left_fylzoy.png)",
            backgroundSize: "contain",
            backgroundPosition: "left center",
            backgroundRepeat: "no-repeat",
            opacity: 0.8,
          }}
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 0.8 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* Right Curtain */}
        <motion.div
          className="absolute right-0 top-0 bottom-0 z-1 pointer-events-none hidden md:block"
          style={{
            width: "450px",
            backgroundImage: "url(https://res.cloudinary.com/digilabs/image/upload/f_auto,q_95,w_900,c_limit/v1759346218/prod/artists/prod/artists/curtain-right_lpdget.png)",
            backgroundSize: "contain",
            backgroundPosition: "right center",
            backgroundRepeat: "no-repeat",
            opacity: 0.8,
          }}
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 0.8 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* Fabric Texture Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/digilabs/image/upload/v1759174422/prod/texture/fabric_texture_dtbgi8.jpg)",
            backgroundSize: "auto",
            backgroundPosition: "center",
            backgroundRepeat: "repeat",
            opacity: 0.25,
          }}
        />

        {/* Top Fade Overlay */}
        <div
          className="absolute top-0 left-0 right-0 z-2"
          style={{
            height: "200px",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)",
          }}
        />

        {/* Bottom Fade Overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 z-2"
          style={{
            height: "200px",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)",
          }}
        />

        {/* Section Header */}
        <div className="text-center mb-4 md:mb-16 relative z-20">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-berkshire-swash text-white mb-6 leading-tight"
            style={{ fontFamily: "var(--font-berkshire-swash)" }}
          >
            The Legends
          </h2>
          <div className="w-24 h-1 mx-auto mb-8 rounded-full bg-gradient-to-r from-red-600 to-orange-600" />
        </div>

        {/* Artists Grid and Description */}
        <div className="relative z-20 mb-2 md:mb-16">
          {/* Desktop Layout */}
          <div className="hidden lg:grid max-w-7xl mx-auto grid-cols-3 gap-8 items-start">
            {/* Artists Grid */}
            <div className="col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={Math.floor(currentArtistIndex / 5)}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.5 },
                    rotateY: { duration: 0.6 },
                  }}
                  className="w-full"
                >
                  <BentoGrid className="w-full">
                    {/* Top row - 3 cards */}
                    {getCurrentGroupArtists()
                      .slice(0, 3)
                      .map((artist, index) => (
                        <BentoGridItem
                          key={`${Math.floor(currentArtistIndex / 5)}-${
                            artist.name
                          }`}
                          className={`cursor-pointer transition-all duration-700 ${
                            index === getCurrentArtistPosition()
                              ? "scale-105 shadow-lg shadow-orange-500/20 border-3"
                              : "opacity-80 hover:opacity-100 hover:scale-102"
                          }`}
                          style={
                            index === getCurrentArtistPosition()
                              ? {
                                  borderColor: "#E0A106",
                                  boxShadow:
                                    "0 0 20px rgba(224, 161, 6, 0.6), 0 0 40px rgba(224, 161, 6, 0.3)",
                                }
                              : {}
                          }
                          header={
                            <motion.div
                              className="relative w-full h-full min-h-[12rem] rounded-lg overflow-hidden"
                              initial={{ opacity: 0, y: 30, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                                ease: "easeOut",
                              }}
                              onMouseEnter={() => handleArtistHover(index)}
                              onMouseLeave={() => handleArtistLeave(index)}
                              onClick={() => handleArtistClick(index)}
                            >
                              <Image
                                src={artist.image}
                                alt={artist.name}
                                fill
                                className={`object-cover transition-all duration-500 hover:scale-110 ${
                                  index === getCurrentArtistPosition()
                                    ? "grayscale-0"
                                    : "grayscale"
                                }`}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                              <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-white text-lg font-semibold mb-1">
                                  {artist.name}
                                </h3>
                              </div>
                            </motion.div>
                          }
                        />
                      ))}

                    {/* Bottom row - 2 cards */}
                    {getCurrentGroupArtists()
                      .slice(3, 5)
                      .map((artist, index) => (
                        <BentoGridItem
                          key={`${Math.floor(currentArtistIndex / 5)}-${
                            artist.name
                          }`}
                          className={`cursor-pointer transition-all duration-700 ${
                            index + 3 === getCurrentArtistPosition()
                              ? "scale-105 shadow-lg shadow-orange-500/20 border-3"
                              : "opacity-80 hover:opacity-100 hover:scale-102"
                          } ${index === 0 ? "md:col-span-2" : ""}`}
                          style={
                            index + 3 === getCurrentArtistPosition()
                              ? {
                                  borderColor: "#E0A106",
                                  boxShadow:
                                    "0 0 20px rgba(224, 161, 6, 0.6), 0 0 40px rgba(224, 161, 6, 0.3)",
                                }
                              : {}
                          }
                          header={
                            <motion.div
                              className="relative w-full h-full min-h-[12rem] rounded-lg overflow-hidden"
                              initial={{ opacity: 0, y: 30, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{
                                duration: 0.5,
                                delay: (index + 3) * 0.1,
                                ease: "easeOut",
                              }}
                              onMouseEnter={() => handleArtistHover(index + 3)}
                              onMouseLeave={() => handleArtistLeave(index + 3)}
                              onClick={() => handleArtistClick(index + 3)}
                            >
                              <Image
                                src={artist.image}
                                alt={artist.name}
                                fill
                                className={`object-cover transition-all duration-500 hover:scale-110 ${
                                  index + 3 === getCurrentArtistPosition()
                                    ? "grayscale-0"
                                    : "grayscale"
                                }`}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                              <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-white text-lg font-semibold mb-1">
                                  {artist.name}
                                </h3>
                              </div>
                            </motion.div>
                          }
                        />
                      ))}
                  </BentoGrid>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Artist Description */}
            <div className="col-span-1">
              <div
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-black shadow-xl"
                style={{ height: "400px" }}
              >
                <div>
                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={`name-${currentArtistIndex}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-4xl font-berkshire-swash mb-6"
                      style={{
                        fontFamily: "var(--font-berkshire-swash)",
                        color: "#E0A106",
                      }}
                    >
                      {getCurrentArtist().name}
                    </motion.h3>
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`desc-${currentArtistIndex}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="text-white text-lg leading-relaxed text-justify"
                      style={{ fontFamily: "var(--font-league-spartan)" }}
                    >
                      {getCurrentArtist().description}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <div className="mt-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`specialty-${currentArtistIndex}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="text-sm"
                      style={{ color: "#E0A106" }}
                    >
                      <span className="font-semibold">Specialty:</span>{" "}
                      {getCurrentArtist().specialty}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* View All Button - Under Description Box */}
              <div className="text-center mt-6">
                <Link href="/legends" className="inline-block">
                  <motion.button
                    className="group cursor-pointer font-semibold transition-all duration-200 py-2.5 px-5 rounded-full border border-transparent flex items-center text-sm text-black bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600"
                    style={{ fontSize: "15px" }}
                    whileHover={{ scale: 1.0 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>View All Artists</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 74 74"
                      height="34"
                      width="34"
                      className="ml-2.5 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
                      style={{ marginLeft: "10px" }}
                    >
                      <circle
                        strokeWidth="3"
                        stroke="black"
                        r="35.5"
                        cy="37"
                        cx="37"
                      ></circle>
                      <path
                        fill="black"
                        d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                      ></path>
                    </svg>
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Layout - Horizontal Scrollable Cards */}
          <div className="lg:hidden">
            {/* Horizontal Scroll Container */}
            <div
              className="flex overflow-x-auto overflow-y-hidden scrollbar-hide gap-4 pb-2 mb-8"
              style={{
                scrollSnapType: "x mandatory",
                scrollBehavior: "smooth",
                WebkitOverflowScrolling: "touch",
              }}
              onScroll={(e) => {
                const container = e.target as HTMLElement;
                const scrollLeft = container.scrollLeft;
                const cardWidth = 320 + 16; // w-80 + gap-4
                const newIndex = Math.round(scrollLeft / cardWidth);
                setVisibleCardIndex(Math.min(newIndex, artists.length - 1));
              }}
            >
              {artists.map((artist, index) => (
                <motion.div
                  key={artist.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl flex flex-col flex-shrink-0 w-80"
                  style={{
                    scrollSnapAlign: "start",
                  }}
                >
                  {/* Artist Image */}
                  <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4">
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 320px, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  {/* Artist Info */}
                  <div className="text-center">
                    <h3
                      className="text-xl font-berkshire-swash mb-3"
                      style={{
                        fontFamily: "var(--font-berkshire-swash)",
                        color: "#E0A106",
                      }}
                    >
                      {artist.name}
                    </h3>
                    <p
                      className="text-white text-sm leading-relaxed mb-3"
                      style={{ fontFamily: "var(--font-league-spartan)" }}
                    >
                      {artist.description}
                    </p>
                    <div className="text-xs mb-4" style={{ color: "#E0A106" }}>
                      <span className="font-semibold">Specialty:</span>{" "}
                      {artist.specialty}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Swipe Instructions */}
            <div className="text-center mb-4">
              <p
                className="text-gray-400 text-sm"
                style={{ fontFamily: "var(--font-league-spartan)" }}
              >
                Swipe horizontally to explore artists
              </p>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mb-4">
              {artists.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === visibleCardIndex
                      ? "bg-white/80 scale-125"
                      : "bg-white/30"
                  }`}
                />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Link href="/legends" className="inline-block">
                <motion.button
                  className="group cursor-pointer font-semibold transition-all duration-200 py-3 px-6 rounded-full border border-transparent flex items-center text-sm text-black bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 mx-auto"
                  style={{ fontSize: "16px" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>View All Artists</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 74 74"
                    height="34"
                    width="34"
                    className="ml-2.5 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
                    style={{ marginLeft: "10px" }}
                  >
                    <circle
                      strokeWidth="3"
                      stroke="black"
                      r="35.5"
                      cy="37"
                      cx="37"
                    ></circle>
                    <path
                      fill="black"
                      d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                    ></path>
                  </svg>
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </ComponentErrorBoundary>
  );
};

export default ArtistsSection;
