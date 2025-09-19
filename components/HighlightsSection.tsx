'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const highlightsData = [
  {
    imageUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1758174433/prod/highlights/chakravyuh_xrbkxu.png',
    title: 'Chakravyuh – A Garhwali Folk Theatre Masterpiece',
    description: 'Experience the traditional Garhwali folk theatre performance that showcases the rich cultural heritage of Uttarakhand.',
    detailedInfo: `Chakravyuh is one of the most acclaimed folk theatre productions of Garhwal, written and scripted by Professor Dataram Purohit. Performed by a dedicated ensemble of Garhwali folk artists, it brings to life the legendary military formation from the Mahabharata through a powerful combination of narration, music, and ritual performance.

First staged in 2001 at Gandhari village, Chakravyuh has since become a highlight at cultural festivals including the Virasat Mahotsav, where it has been received with immense appreciation by audiences. The production showcases the artistry of traditional musicians playing instruments such as the ranasingha, dhol, damau, and bankori, and captures the essence of Garhwal's living heritage.

More than a performance, Chakravyuh is part of the broader tradition of Pandav Nritya (or Pandav Leela), a ritual dance-drama that narrates the story of the Pandava brothers from their birth to their Swargarohini Yatra (ascent to heaven). Performed in villages across Chamoli and Rudraprayag, especially during the winter months, Pandav Nritya celebrates devotion, community spirit, and the timeless values of dharma.

Through episodes like Keechak Vadh (slaying of Keechak), Narayan Vivah (marriage of Lord Vishnu), Chakravyuh (the war strategy devised by Guru Drona), and Genda Vadh (symbolic sacrifice of a rhinoceros), the tradition keeps alive the Mahabharata's moral and spiritual teachings in the cultural memory of Uttarakhand.

With its staging of Chakravyuh, REACH continues its mission of preserving and celebrating the intangible cultural heritage of the Himalayas, bringing age-old folk traditions to contemporary audiences.`,
  },
  {
    imageUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1758174433/prod/highlights/carrally_l5qnty.jpg',
    title: 'Vintage Car Rally',
    description: 'Experience the charm of classic automobiles in our vintage car rally through heritage routes.',
    detailedInfo: `The Vintage & Classical Car and Bike Rally has become one of the most spectacular highlights of the Virasat Art & Heritage Festival in Dehradun. Flagged off from the Ambedkar Stadium, the rally brings the city to life as over 40 rare and beautifully maintained vintage cars and bikes parade through iconic routes like Rajpur Road and the Cantonment area, before returning to the stadium for public viewing.

From a stately 1926 Chevrolet to the legendary 1942 Matchless motorcycle, the rally showcases timeless automotive treasures that continue to capture hearts across generations. Awards are presented in multiple categories—including cars, bikes, audience choice, and more—adding a competitive yet celebratory spirit to the event.

More than just a parade, the rally reflects the charm of heritage motoring, encouraging the preservation of classic vehicles while offering the public a nostalgic journey through automotive history. With cheering crowds and the gleam of chrome under the Doon sun, the Vintage Car Rally embodies the elegance, pride, and cultural vibrance that the Virasat Festival stands for.`,
  },
  {
    imageUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1758174433/prod/highlights/bikerally_yfphdz.jpg',
    title: 'Bike Rally',
    description: 'Join our exciting bike rally celebrating the spirit of adventure and cultural exploration.',
    detailedInfo: `The Bike Rally at the Virasat Art & Heritage Festival is more than a parade, it's a celebration of the evolution of biking across generations. From the timeless elegance of 1940s and 50s British marques like the BSA and Matchless, to the nostalgic scooters that once defined Indian roads, the Lambretta and Vespa, the rally offers a living glimpse into motorcycling history.

Adding a contemporary edge, the line-up also includes modern sports bikes, showcasing how design, speed, and engineering have transformed over the decades while retaining the same passion for the open road.

As the rally winds through Dehradun's iconic streets, crowds cheer on an eclectic mix of scooters, cruisers, vintage sport bikes, and today's high-performance machines. Each ride tells a story of heritage, innovation, and the enduring bond between rider and machine. With awards across categories, riders in themed attire, and the unique atmosphere of camaraderie, the event bridges nostalgia with the thrill of the present.

By celebrating the journey from vintage classics to modern marvels, the Bike Rally captures the spirit of evolution reminding us that while the machines may have changed, the love for two wheels remains timeless.`,
  },
  {
    imageUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1758174434/prod/highlights/saadhna_ay8fyg.jpg',
    title: 'SAADHNA',
    description: 'A dedicated platform for spiritual and cultural practices that connect us to our roots.',
    detailedInfo: `Virasat Sadhana: Young Voices of Heritage

Among the many highlights of the Virasat Art & Heritage Festival, the Sadhana sessions hold a special place, celebrating the creativity and promise of the younger generation. Held every morning during the festival, these sessions transform the stage into a canvas for school and college students from across Dehradun and beyond, offering them a rare opportunity to perform before an enthusiastic audience.

The air fills with the sound of ragas, devotional hymns, and folk melodies as young vocalists showcase their training, while dancers captivate with graceful renditions of classical forms like Kathak, Bharatnatyam, and Kuchipudi. Interspersed with these are heritage quizzes, recitals, and even popular songs—making the sessions both educational and entertaining.

What makes Sadhana truly unique is how it mirrors the journey of India's performing arts: from timeless classical traditions to more contemporary interpretations, all brought alive by students with fresh energy and pride. Many participants arrive dressed in traditional attire, carrying the poise of seasoned performers, while others experiment with fusions that bridge old and new. Every performance is met with applause, reinforcing the idea that heritage is not a relic of the past, but a living, evolving practice. Certificates and awards at the end honor the effort, but the real reward is the confidence and recognition that young artists carry back with them.

By placing the spotlight on budding talent, Virasat Sadhana nurtures a deeper connection between youth and culture. It ensures that art forms passed down through centuries continue to resonate in modern times, inspiring not just the performers, but also the audiences who witness them. In many ways, Sadhana is the heartbeat of Virasat—where tradition meets youthful imagination, and heritage finds its future.`,
  },
  {
    imageUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1758174434/prod/highlights/talkies_rqusd9.jpg',
    title: 'REACH Talkies',
    description: 'Our film club that celebrates world cinema and promotes awareness through curated screenings.',
    detailedInfo: `Sixteen years ago, in 2009, a small group of passionate cinephiles in Dehradun came together with a simple idea — to give the city a taste of world cinema beyond the mainstream. That idea became REACH Talkies, and today, it proudly stands as the only dedicated film society in Dehradun promoting art cinema, world classics, and meaningful films.

Over the years, REACH Talkies has built a loyal community of film lovers who gather regularly to watch and discuss films that spark thought, debate, and reflection. From the timeless works of Satyajit Ray to international masters like Kurosawa, Bergman, and Vittorio De Sica, screenings have opened windows to cultures, philosophies, and cinematic traditions far beyond Uttarakhand.

"Our mission was never just to show films, but to create conversations around them," says the REACH Talkies team. "Cinema is a mirror to society, and through it, we wanted Doon's audiences to engage with ideas and stories that mainstream theatres rarely offer."

What started as a handful of screenings has now grown into a consistent cultural movement. Collaborations with embassies, cultural centers, and film archives have allowed the group to bring rare, independent, and award-winning films to the valley. Student-focused screenings and discussions have also made REACH Talkies a hub for young people curious about cinema as art, not just entertainment.

For cinephiles in Dehradun, REACH Talkies has become a sanctuary — a space where the silence of a hall and the glow of a projector connect people to stories from across the world. In a city where mainstream entertainment dominates, REACH Talkies continues to keep the spirit of serious cinema alive, 16 years and counting.`,
  },
  {
    imageUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1758174434/prod/highlights/theatre_firrdd.png',
    title: 'Theatre Festival',
    description: 'A celebration of dramatic arts featuring performances that bring stories to life on stage.',
    detailedInfo: `While Dehradun's Virasat Arts & Heritage Festival is celebrated for its diverse cultural offerings, the Theatre Festival has carved out its own distinct identity as a premier event for dramatic arts in the region. Over the years, it has grown into a platform where India's most acclaimed directors, actors, and theatre companies converge, transforming the city into a hub of creativity and storytelling.

The 2011 edition remains memorable for Bhanu Bharti's Tamasha Na Hua, a production that showcased his mastery of blending folk aesthetics with modern sensibilities, and Sangeeta Sharma's Visarjan, a stirring dance-drama adaptation of Rabindranath Tagore's work. These performances set the bar high, establishing the festival as a space for bold and innovative theatre.

In subsequent years, legendary figures graced the stage—none more iconic than Naseeruddin Shah, whose presence drew audiences into the magnetic world of serious theatre and reaffirmed the festival's national stature. By 2017, the festival reached new heights with Urubhangam, a rare and powerful Sanskrit classic brought alive with intensity, alongside productions from the late Ratan Thiyam, whose visionary theatre left audiences spellbound with its ritualistic grandeur and philosophical depth.

Unlike routine cultural programming, the Theatre Festival thrives as a space of experimentation, dialogue, and artistic risk-taking. It has welcomed traditional folk plays and experimental scripts, blending regional voices with universal themes. For audiences, it offers not only entertainment but an intellectual and emotional engagement that lingers long after the performance.

Today, the Theatre Festival stands as an institution in its own right—an event that honors India's theatrical heritage while embracing its evolving future. It is more than a stage; it is a living conversation between artists and audiences, between tradition and innovation, between the stories of yesterday and the possibilities of tomorrow.`,
  },
  {
    imageUrl: 'https://res.cloudinary.com/digilabs/image/upload/v1758174433/prod/highlights/photography_lmglkm.jpg',
    title: 'Photography Competition',
    description: 'Freeze moments of beauty and tradition in our photography competition celebrating visual storytelling.',
    detailedInfo: `This year, Virasat introduces an exciting new addition to its cultural celebration—the Photography Competition, a platform for festival-goers to capture the many moods, colors, and stories of Virasat through their own lens. Open to all attendees, the competition invites participants to document their unique perspective of the festival—be it art, performances, crafts, food, or candid moments of joy—making every photograph a slice of Virasat's living heritage.

Participation is simple: attendees can submit their photographs through a Google Form link provided by the organizers and also share their entries on Instagram by tagging our official handle. Every submission becomes a chance to showcase creativity while engaging with the festival community in real time.

Rules & Guidelines:
• Photos must be taken within the Virasat premises during the festival.
• The subject and style of photography are entirely up to the participant—artistic freedom is encouraged.
• Submitted photographs may be featured on Virasat's official social media platforms and website, at the discretion of the organizers.
• Participants whose photos are selected for publication may also be invited to collaborate on Virasat's social media pages.
• Certificates will be awarded to the Top 5 photographers, whose entries will be recognized as the standout captures of Virasat 2025.

More than a contest, this is a call to celebrate Virasat through your own eyes—every frame telling a story, every image adding to the collective memory of the festival. Whether you're a budding photographer, an Instagram storyteller, or simply someone who loves to capture moments, the Virasat Photography Competition is your chance to be part of the festival in a whole new way.`,
  },
];

export const HighlightsSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [scrollContainerRef, setScrollContainerRef] = useState<HTMLDivElement | null>(null);
  const [selectedHighlight, setSelectedHighlight] = useState<typeof highlightsData[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cleanup: restore body scroll when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle scroll position for mobile
  const handleScroll = () => {
    if (!isMobile || !scrollContainerRef) return;
    
    const scrollLeft = scrollContainerRef.scrollLeft;
    const cardWidth = 304; // w-72 + gap = 288 + 16 = 304px
    const currentCardIndex = Math.round(scrollLeft / cardWidth);
    setCurrentCard(Math.min(Math.max(currentCardIndex, 0), highlightsData.length - 1));
  };

  // Pagination logic for desktop
  const cardsPerPage = 4;
  const totalPages = Math.ceil(highlightsData.length / cardsPerPage);
  const startIndex = currentPage * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const displayedHighlights = highlightsData.slice(startIndex, endIndex);

  const nextPage = () => {
    if (isMobile) {
      setCurrentCard((prev) => Math.min(prev + 1, highlightsData.length - 1));
    } else {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }
  };

  const prevPage = () => {
    if (isMobile) {
      setCurrentCard((prev) => Math.max(prev - 1, 0));
    } else {
      setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    }
  };

  const openModal = (highlight: typeof highlightsData[0]) => {
    setSelectedHighlight(highlight);
    setIsModalOpen(true);
    // Prevent all scrolling on the entire page while preserving scroll position
    const scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollY}px`;
    document.body.setAttribute('data-scroll-y', scrollY.toString());
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHighlight(null);
    // Restore all scrolling functionality
    const scrollY = document.body.getAttribute('data-scroll-y') || '0';
    document.body.style.overflow = 'unset';
    document.body.style.position = 'unset';
    document.body.style.width = 'unset';
    document.body.style.top = 'unset';
    document.body.removeAttribute('data-scroll-y');
    // Use scrollTo with behavior: 'instant' to avoid animation
    window.scrollTo({ top: parseInt(scrollY), behavior: 'instant' });
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="pt-4 pb-20 px-6" 
      style={{ backgroundColor: '#FFF7F5F4' }}
    >
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-brand-brown mb-6">
          Our Journey&apos;s Highlights
        </h2>
        {/* Decorative gradient line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-24 h-1 mx-auto mb-6 rounded-full"
          style={{
            background: 'linear-gradient(to right, #dc2626, #7c2d12)'
          }}
        />
        <p className="text-center text-lg text-brand-earthen mb-12 max-w-2xl mx-auto">
          Moments that defined our mission and celebrated our shared heritage.
        </p>
        
        {/* Desktop Grid Layout with Pagination */}
        {!isMobile && (
          <div className="relative">
            {/* Navigation Buttons */}
            <div className="flex items-center gap-6 lg:gap-8 mb-8">
              {/* Left Button - only show when not on first page */}
              {currentPage > 0 && (
                <motion.button
                  onClick={prevPage}
                  className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-brand-red group flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  aria-label="Previous highlights"
                >
                  <svg
                    className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
              )}

              {/* Spacer for when left button is not shown */}
              {currentPage === 0 && <div className="w-14 h-14 flex-shrink-0" />}

              {/* Highlights Grid */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-8">
                {displayedHighlights.map((highlight, index) => (
                  <motion.div
                    key={startIndex + index}
                    initial={isMobile ? undefined : { opacity: 0, y: 50 }}
                    whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
                    viewport={isMobile ? undefined : { once: true }}
                    transition={isMobile ? undefined : { duration: 0.6, delay: index * 0.1 }}
                    className={`bg-white rounded-2xl ${isMobile ? 'shadow-md hover:shadow-lg' : 'shadow-lg hover:shadow-2xl'} transition-all duration-300 ease-out overflow-hidden group flex flex-col`}
                  >
                    <div className="relative h-48 sm:h-52 overflow-hidden">
                      <Image 
                        src={highlight.imageUrl} 
                        alt={highlight.title} 
                        fill
                        className="object-cover" 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-serif text-brand-black mb-3 line-clamp-2">{highlight.title}</h3>
                      <p className="text-sm font-sans text-brand-earthen line-clamp-3 mb-4 flex-grow">
                        {highlight.description}
                      </p>
                      <button
                        onClick={() => openModal(highlight)}
                        className="text-sm font-medium text-brand-red hover:text-brand-brown transition-colors duration-200 flex items-center gap-1 group mt-auto"
                      >
                        Read More
                        <svg
                          className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right Button - only show when not on last page */}
              {currentPage < totalPages - 1 && (
                <motion.button
                  onClick={nextPage}
                  className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-brand-red group flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  aria-label="Next highlights"
                >
                  <svg
                    className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              )}

              {/* Spacer for when right button is not shown */}
              {currentPage === totalPages - 1 && <div className="w-14 h-14 flex-shrink-0" />}
            </div>

            {/* Page Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentPage
                      ? 'bg-brand-red scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Mobile Horizontal Scroll Layout */}
        {isMobile && (
          <div className="relative">
            <div 
              ref={setScrollContainerRef}
              className="flex overflow-x-auto overflow-y-hidden scrollbar-hide gap-3 sm:gap-4 pb-4"
              onScroll={handleScroll}
              style={{
                scrollSnapType: 'x mandatory',
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {highlightsData.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={undefined}
                  whileInView={undefined}
                  viewport={undefined}
                  transition={undefined}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ease-out overflow-hidden group flex-shrink-0 w-72 flex flex-col"
                  style={{
                    scrollSnapAlign: 'start'
                  }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image 
                      src={highlight.imageUrl} 
                      alt={highlight.title} 
                      fill
                      className="object-cover" 
                      sizes="(max-width: 768px) 100vw, 288px"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-serif text-brand-black mb-2 line-clamp-2">{highlight.title}</h3>
                    <p className="text-sm font-sans text-brand-earthen line-clamp-3 mb-3 flex-grow">
                      {highlight.description}
                    </p>
                    <button
                      onClick={() => openModal(highlight)}
                      className="text-sm font-medium text-brand-red hover:text-brand-brown transition-colors duration-200 flex items-center gap-1 group mt-auto"
                    >
                      Read More
                      <svg
                        className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal for detailed information */}
      {isModalOpen && selectedHighlight && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative h-64">
              <Image
                src={selectedHighlight.imageUrl}
                alt={selectedHighlight.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 512px"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
              <h2 className="text-2xl font-serif text-brand-black mb-4">
                {selectedHighlight.title}
              </h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line text-justify">
                {selectedHighlight.detailedInfo}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t">
              <button
                onClick={closeModal}
                className="w-full bg-brand-red hover:bg-brand-brown text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  );
};

export default HighlightsSection;