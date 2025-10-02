'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const artists = [
  {
    name: "Dinesh Thakur",
    title: "Folk Singer",
    description: "Respected theatre director and actor, founder of Mumbai's Ank. His landmark productions include Jasma Odan, Panchi Aise Aate Hain, and Hai Mera Dil, noted for compelling performances and storytelling.",
    specialty: "Folk Music",
    years: "1980s–Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/f_auto,q_auto,w_400/prod/artists/prod/artists/dinesh_thakur.jpg",
  },
  {
    name: "Naseeruddin Shah",
    title: "Theatre & Film Actor",
    description: "Acclaimed Indian actor with landmark roles in Sparsh, Aakrosh, Jaane Bhi Do Yaaro, and Iqbal; co-founder of Motley Productions, noted for staging Waiting for Godot and Ismat Apa Ke Naam.",
    specialty: "Theatre & Cinema",
    years: "1970s–Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/f_auto,q_auto,w_400/prod/artists/prod/artists/naseeruddin_shah.jpg",
  },
  {
    name: "Ustad Amjad Ali Khan",
    title: "Sarod Maestro",
    description: "Ustad Amjad Ali Khan is a legendary sarod maestro, renowned for masterpieces like Raga Shree, Bhairavi, and Durga. From the Senia Bangash gharana, he brought the sarod to global stages through pathbreaking collaborations.",
    specialty: "Classical Sarod",
    years: "1960s–Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/f_auto,q_auto,w_400/prod/artists/prod/artists/ustad_amjad_ali_khan.jpg",
  },
  {
    name: "Wadali Brothers",
    title: "Sufi Folk Singers",
    description: "The Wadali Brothers, Puranchand and Pyarelal Wadali, were iconic exponents of Sufi and devotional music from Punjab. Their renditions of Bulleh Shah and Amir Khusro's poetry became legendary, and their songs like Tu Maane Ya Na Maane Dildara and Ik Tu Hi Tu Hi continue to inspire lovers of Sufi music.",
    specialty: "Sufi Folk Music",
    years: "1970s–Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221518/prod/artists/prod/artists/wadali_brothers_vqwxqk.jpg",
  },
  {
    name: "Dr. Sonal Mansingh",
    title: "Classical Dancer",
    description: "One of India's most distinguished classical dancers, acclaimed for Bharatanatyam and Odissi. A Padma Vibhushan awardee who has represented India worldwide, using dance to narrate mythology, spirituality, and contemporary themes.",
    specialty: "Bharatanatyam & Odissi",
    years: "1960s–Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221514/prod/artists/prod/artists/sonal_mansingh_gd588b.jpg",
  },
  {
    name: "Manoj Tiwari",
    title: "Classical Vocalist",
    description: "A renowned classical vocalist, Manoj Tiwari is celebrated for his soulful renditions rooted in Indian classical traditions. He is admired for preserving heritage music while bringing freshness to every performance.",
    specialty: "Classical Vocal",
    years: "1980s–Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221500/prod/artists/prod/artists/manoj_tiwari_e2ll5o.jpg",
  },
  {
    name: "Vidushi Kala",
    title: "Classical Dancer",
    description: "A distinguished classical dancer and teacher, Vidushi Kala is recognized for her mastery and dedication to nurturing the next generation of artists. Her performances embody tradition, discipline, and elegance.",
    specialty: "Classical Dance",
    years: "1970s–Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221515/prod/artists/prod/artists/vidushi_kala_lqrte3.jpg",
  },
  {
    name: "Jagjit Singh",
    title: "Ghazal King",
    description: "Jagjit Singh, the \"Ghazal King,\" revolutionized ghazal singing with his melodious voice and modern approach. His music brought poetry to the masses, leaving behind an immortal legacy of soulful compositions.",
    specialty: "Ghazal Singing",
    years: "1960s–2011",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221494/prod/artists/prod/artists/jagjit_singh_xwcyvz.jpg",
  },
  {
    name: "Birju Maharaj",
    title: "Kathak Legend",
    description: "Pandit Birju Maharaj was a legendary Kathak dancer and choreographer, hailed as the torchbearer of the Lucknow gharana. His grace, storytelling, and rhythm made him one of India's greatest cultural icons.",
    specialty: "Kathak Dance",
    years: "1950s–2022",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221493/prod/artists/prod/artists/birju_maharaj_sckjwj.jpg",
  },
  {
    name: "Kailash Kher",
    title: "Playback Singer",
    description: "Kailash Kher is a celebrated Indian playback singer and composer, known for his powerful, soulful voice. Famed for hits like Teri Deewani and Saiyyan, he brings the magic of Indian folk and Sufi influences to contemporary music.",
    specialty: "Playback & Folk Music",
    years: "1990s–Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221495/prod/artists/prod/artists/kailash_kher_kyms7n.jpg",
  },
  {
    name: "Apex Pandya",
    title: "Classical Artist",
    description: "A distinguished artist known for their contributions to Indian classical arts and cultural preservation.",
    specialty: "Classical Arts",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221489/prod/artists/prod/artists/apex_pandya_qkhxso.jpg",
  },
  {
    name: "Anwar Khan",
    title: "Classical Musician",
    description: "A renowned classical musician dedicated to preserving and promoting traditional Indian music.",
    specialty: "Classical Music",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221489/prod/artists/prod/artists/anwar_khan_iopn3u.jpg",
  },
  {
    name: "Avaneendra Sheolikar",
    title: "Classical Artist",
    description: "A respected artist known for their mastery in classical Indian performing arts.",
    specialty: "Classical Arts",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221490/prod/artists/prod/artists/avaneendra_sheolikar_wadlvs.jpg",
  },
  {
    name: "Dr. N. Rajam",
    title: "Violin Maestro",
    description: "A legendary violin maestro and teacher, known for their exceptional contributions to Indian classical music.",
    specialty: "Classical Violin",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221492/prod/artists/prod/artists/Dr_n_rajam_nrdfxe.jpg",
  },
  {
    name: "Hariharan",
    title: "Playback Singer",
    description: "A celebrated playback singer known for their melodious voice and contributions to Indian cinema.",
    specialty: "Playback Singing",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221493/prod/artists/prod/artists/hari_haran_a95yfi.jpg",
  },
  {
    name: "Basanti Devi",
    title: "Classical Vocalist",
    description: "A distinguished classical vocalist known for their soulful renditions and dedication to Indian classical music.",
    specialty: "Classical Vocal",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221493/prod/artists/prod/artists/basanti_devi_hvgn4s.jpg",
  },
  {
    name: "Ghulam Mustafa Saheb",
    title: "Classical Musician",
    description: "A respected classical musician known for their mastery and contributions to traditional music.",
    specialty: "Classical Music",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221494/prod/artists/prod/artists/ghulam_mustafa_saheb_xp2uan.jpg",
  },
  {
    name: "Jasbir Jassi",
    title: "Folk Singer",
    description: "A popular folk singer known for their energetic performances and modern take on traditional Punjabi music.",
    specialty: "Folk Music",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221495/prod/artists/prod/artists/jasbir_jasssi_n4xkz1.jpg",
  },
  {
    name: "Ileana Citaristi",
    title: "Odissi Dancer",
    description: "A renowned Odissi dancer and choreographer known for their graceful performances and cultural contributions.",
    specialty: "Odissi Dance",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759229852/prod/artists/prod/artists/lleana_citaristi_ae956p.jpg",
  },
  {
    name: "Malini Awasti",
    title: "Classical Vocalist",
    description: "A celebrated classical vocalist known for their powerful voice and dedication to Indian classical music.",
    specialty: "Classical Vocal",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221497/prod/artists/prod/artists/malini_awasti_t2p0xu.jpg",
  },
  {
    name: "Kalapini Komkali",
    title: "Classical Vocalist",
    description: "A distinguished classical vocalist from the renowned Komkali family, known for their traditional approach to Indian classical music.",
    specialty: "Classical Vocal",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221497/prod/artists/prod/artists/kalapini_komkali_c0kjrx.jpg",
  },
  {
    name: "Kaushiki Chakraborty",
    title: "Classical Vocalist",
    description: "A renowned classical vocalist known for their exceptional talent and contributions to Indian classical music.",
    specialty: "Classical Vocal",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221497/prod/artists/prod/artists/kaushiki_chakraborty_w64ik2.jpg",
  },
  {
    name: "Manjit Bawa",
    title: "Artist",
    description: "A celebrated artist known for their unique style and contributions to contemporary Indian art.",
    specialty: "Visual Arts",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221498/prod/artists/prod/artists/manjit_bawa_qsvhug.jpg",
  },
  {
    name: "Maqbool Ahmed Sabri",
    title: "Qawwal",
    description: "A renowned qawwal known for their spiritual performances and contributions to Sufi music.",
    specialty: "Qawwali",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221501/prod/artists/prod/artists/maqbool_ahmed_sabri_lgsfnh.jpg",
  },
  {
    name: "Mithilesh Jha",
    title: "Classical Artist",
    description: "A respected classical artist known for their dedication to traditional Indian performing arts.",
    specialty: "Classical Arts",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221501/prod/artists/prod/artists/mithilesh_jha_nde8vl.jpg",
  },
  {
    name: "Pandit Shivkumar",
    title: "Classical Musician",
    description: "A distinguished classical musician known for their mastery and contributions to Indian classical music.",
    specialty: "Classical Music",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221501/prod/artists/prod/artists/pandit_shivkumar_sngdac.jpg",
  },
  {
    name: "Omkar Dadakar",
    title: "Classical Artist",
    description: "A talented classical artist known for their contributions to Indian performing arts.",
    specialty: "Classical Arts",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221502/prod/artists/prod/artists/omkar_dadakar_dvqqho.jpg",
  },
  {
    name: "Brian Silas",
    title: "Musician",
    description: "A versatile musician known for their innovative approach to music and cultural fusion.",
    specialty: "Contemporary Music",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221503/prod/artists/prod/artists/brian_silas_rxvbia.jpg",
  },
  {
    name: "Parthavi Chauhan",
    title: "Classical Artist",
    description: "A promising classical artist known for their dedication to traditional Indian arts.",
    specialty: "Classical Arts",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221505/prod/artists/prod/artists/parthavi_chauhan_pdp06x.jpg",
  },
  {
    name: "Pratibha Singh Baghel",
    title: "Folk Artist",
    description: "A renowned folk artist known for their authentic performances and cultural preservation efforts.",
    specialty: "Folk Arts",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221505/prod/artists/prod/artists/pratibha_singh_baghel_dzadpg.jpg",
  },
  {
    name: "Parween Sultana",
    title: "Classical Vocalist",
    description: "A celebrated classical vocalist known for their exceptional talent and contributions to Indian classical music.",
    specialty: "Classical Vocal",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221506/prod/artists/prod/artists/parween_sultana_gcrigr.jpg",
  },
  {
    name: "Pt. Chhannulal Mishra",
    title: "Classical Vocalist",
    description: "A legendary classical vocalist known for their mastery of Indian classical music and spiritual singing.",
    specialty: "Classical Vocal",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221507/prod/artists/prod/artists/Pt_chhannulal_mishra_uv8avt.jpg",
  },
  {
    name: "Pt. Sajan Mishra",
    title: "Classical Vocalist",
    description: "A renowned classical vocalist known for their exceptional contributions to Indian classical music.",
    specialty: "Classical Vocal",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221508/prod/artists/prod/artists/Pt_sajan_mishra_gwzqp3.jpg",
  },
  {
    name: "Rakesh Chaurasia",
    title: "Flautist",
    description: "A celebrated flautist known for their mastery of the bansuri and contributions to Indian classical music.",
    specialty: "Classical Flute",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221509/prod/artists/prod/artists/rakesh_chaurasia_srlbyf.jpg",
  },
  {
    name: "Purna Das Baul",
    title: "Baul Singer",
    description: "A legendary Baul singer known for their spiritual performances and preservation of Bengali folk traditions.",
    specialty: "Baul Music",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221509/prod/artists/prod/artists/purna_das_baul_lglmcg.jpg",
  },
  {
    name: "Rajendra Gangani",
    title: "Kathak Dancer",
    description: "A distinguished Kathak dancer known for their graceful performances and contributions to classical dance.",
    specialty: "Kathak Dance",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221509/prod/artists/prod/artists/rajendra_gangani_xqzcgb.jpg",
  },
  {
    name: "Ronu Majumdar",
    title: "Flautist",
    description: "A renowned flautist known for their exceptional skill and contributions to Indian classical music.",
    specialty: "Classical Flute",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221510/prod/artists/prod/artists/ronu_majumdar_vr8v8o.jpg",
  },
  {
    name: "Talat Aziz",
    title: "Ghazal Singer",
    description: "A celebrated ghazal singer known for their melodious voice and contributions to Urdu poetry and music.",
    specialty: "Ghazal Singing",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221514/prod/artists/prod/artists/talat_aziz_yu0jop.jpg",
  },
  {
    name: "Shinjini Kulkarni",
    title: "Classical Artist",
    description: "A talented classical artist known for their dedication to Indian performing arts and cultural preservation.",
    specialty: "Classical Arts",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221514/prod/artists/prod/artists/sajini_kulkarni_yjj9t5.jpg",
  },
  {
    name: "Ustad Sultan Khan",
    title: "Sarangi Maestro",
    description: "A legendary sarangi maestro known for their exceptional contributions to Indian classical music and film music.",
    specialty: "Classical Sarangi",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221515/prod/artists/prod/artists/ustad_sultan_khan_fkrf9l.jpg",
  },
  {
    name: "Warsi Brothers",
    title: "Qawwal Duo",
    description: "A renowned qawwal duo known for their powerful performances and contributions to Sufi music.",
    specialty: "Qawwali",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221516/prod/artists/prod/artists/warsi_brothers_tyr6td.jpg",
  },
  {
    name: "Y.G. Parthasarathy",
    title: "Theatre Artist",
    description: "A distinguished theatre artist known for their contributions to Tamil theatre and cultural arts.",
    specialty: "Theatre Arts",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221518/prod/artists/prod/artists/Y.G_parthasarathy_kwewec.jpg",
  },
  {
    name: "Zahid Hussain",
    title: "Classical Musician",
    description: "A respected classical musician known for their mastery and contributions to Indian classical music.",
    specialty: "Classical Music",
    years: "Present",
    image: "https://res.cloudinary.com/digilabs/image/upload/v1759221519/prod/artists/prod/artists/zahid_hussain_vpjarq.jpg",
  },
];

const LegendsPage = () => {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => {
      const newSet = new Set(prev);
      newSet.add(index);
      return newSet;
    });
  };

  return (
    <>
    <section
      className="min-h-screen pt-4 pb-20 px-6 container mx-auto relative"
      style={{ 
        backgroundColor: '#160000',
        contain: 'layout style paint',
        isolation: 'isolate',
        zIndex: 10
      }}
    >
        {/* Fabric Texture Background - Reduced Opacity */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://res.cloudinary.com/digilabs/image/upload/v1759174422/prod/texture/fabric_texture_dtbgi8.jpg)',
            backgroundSize: 'auto',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            opacity: 0.18
          }}
        />
        
        {/* Peacock Flat Overlay with Multiply Blend */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://res.cloudinary.com/digilabs/image/upload/v1759174358/prod/about/background/peacock_flat_ol19op.png)',
            backgroundSize: '70%',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            mixBlendMode: 'multiply',
            opacity: 0.9
          }}
        />
        
        {/* Top Fade Overlay - Like Home Screen */}
        <div 
          className="absolute top-0 left-0 right-0 z-1"
          style={{
            height: '200px',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)'
          }}
        />

        {/* Bottom Fade Overlay - Like Home Screen */}
        <div 
          className="absolute bottom-0 left-0 right-0 z-1"
          style={{
            height: '200px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)'
          }}
        />

      {/* Header */}
      <div className="pt-20 pb-12 relative z-10">

        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-berkshire-swash mb-6 leading-tight text-white"
            style={{ fontFamily: 'var(--font-berkshire-swash)' }}
          >
            Our Legends
          </motion.h1>
          <div className="w-24 h-1 mx-auto mb-8 rounded-full bg-gradient-to-r from-red-600 to-orange-600" />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-league-spartan)' }}
          >
            Celebrating the extraordinary artists who have graced Virasat with their timeless performances and cultural contributions.
          </motion.p>
        </div>
      </div>

      {/* Artists Grid - Column Layout */}
      <div className="pb-20 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-2">
          {artists.map((artist, index) => {
            return (
              <motion.div
                key={artist.name}
                initial={{ opacity: 0, y: 50, rotate: -5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 80,
                  damping: 12
                }}
                whileHover={{ 
                  y: -10,
                  rotate: 2,
                  transition: { duration: 0.3 }
                }}
                className="group cursor-pointer"
              >
                {/* Polaroid Card */}
                <div className="bg-white shadow-2xl transform transition-all duration-300 group-hover:shadow-3xl border-t-8 border-b border-gray-200 overflow-hidden">
                  {/* Photo */}
                  <div className="relative w-full h-48 sm:h-56 md:h-64 mb-3">
                    {/* Loading Skeleton */}
                    {!loadedImages.has(index) && (
                      <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-t-lg">
                        <div className="flex items-center justify-center h-full">
                          <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      </div>
                    )}
                    
                    <Image
                      src={artist.image.replace('/upload/', '/upload/f_auto,q_90,w_600,h_450,c_fill/')}
                      alt={artist.name}
                      fill
                      className={`object-cover grayscale transition-all duration-500 group-hover:grayscale-0 ${
                        loadedImages.has(index) ? 'opacity-100' : 'opacity-0'
                      }`}
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                      loading={index < 8 ? "eager" : "lazy"}
                      priority={index < 4}
                      onLoad={() => handleImageLoad(index)}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </div>
                  
                  {/* Text Content with Padding */}
                  <div className="px-2 sm:px-3 md:px-4 pb-4 sm:pb-5 md:pb-6">
                    {/* Name */}
                    <motion.h3 
                      className="text-black text-left font-bold text-xs sm:text-sm uppercase tracking-wide leading-tight mb-2"
                      style={{ fontFamily: 'var(--font-league-spartan)' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                    >
                      {artist.name}
                    </motion.h3>
                    
                    {/* Decorative Line */}
                    <div className="w-full h-px bg-gray-300"></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </section>

    {/* Floating Back to Home Button - Outside section for true fixed positioning */}
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <Link href="/#artists">
        <motion.button
          className="px-6 py-3 text-white font-semibold rounded-full transition-all duration-300 shadow-2xl hover:shadow-3xl backdrop-blur-sm border border-white/20"
          style={{ backgroundColor: 'rgba(224, 161, 6, 0.95)' }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="flex items-center space-x-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <span>Back to Home</span>
          </div>
        </motion.button>
      </Link>
    </div>
    </>
  );
};

export default LegendsPage;
