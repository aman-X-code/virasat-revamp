'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Users, ArrowRight, Calendar, ChevronLeft, ChevronRight, ChevronDown, QrCode, CreditCard, X, Info } from 'lucide-react';
import Link from 'next/link';
import { allEvents, dayOrder, type Event } from '@/lib/events';

// Helper function to convert event title to Cloudinary image name
function getEventImageUrl(title: string): string {
  const kebabCase = title
    .toLowerCase()
    .replace(/[–—]/g, '-')           // Replace em/en dashes
    .replace(/[^\w\s-]/g, '')       // Remove special chars except spaces and hyphens
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/-+/g, '-')            // Replace multiple hyphens with single
    .replace(/^-|-$/g, '');         // Remove leading/trailing hyphens
  
  return `https://res.cloudinary.com/digilabs/image/upload/f_auto,q_auto,w_500/prod/events/prod/events/${kebabCase}.jpg`;
}

const EventsPage = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isDayDropdownOpen, setIsDayDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [dayDropdownPosition, setDayDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [categoryDropdownPosition, setCategoryDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [expandedTitles, setExpandedTitles] = useState<Set<number>>(new Set());
  const dayButtonRef = useRef<HTMLButtonElement>(null);
  const categoryButtonRef = useRef<HTMLButtonElement>(null);

  // Helper function to truncate long titles
  const truncateTitle = (title: string, maxLength: number = 50) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + '...';
  };

  // Toggle expanded title
  const toggleTitleExpansion = (eventId: number) => {
    const newExpanded = new Set(expandedTitles);
    if (newExpanded.has(eventId)) {
      newExpanded.delete(eventId);
    } else {
      newExpanded.add(eventId);
    }
    setExpandedTitles(newExpanded);
  };

  // Get unique days and categories
  const uniqueDays = ['All', ...Object.keys(dayOrder).sort((a, b) => {
    const dayA = dayOrder[a] || 999;
    const dayB = dayOrder[b] || 999;
    return dayA - dayB;
  })];
  
  const uniqueCategories = ['All', ...Array.from(new Set(allEvents.map(event => event.category))).sort()];

  // Filter events based on selected filters
  const filteredEvents = allEvents.filter(event => {
    const dayMatch = selectedDay === 'All' || event.day === selectedDay;
    const categoryMatch = selectedCategory === 'All' || event.category === selectedCategory;
    return dayMatch && categoryMatch;
  });

  // Group filtered events by day
  const eventsByDay: Record<string, Event[]> = {};
  filteredEvents.forEach(event => {
    if (!eventsByDay[event.day]) {
      eventsByDay[event.day] = [];
    }
    eventsByDay[event.day].push(event);
  });

  // Sort days according to dayOrder
  const sortedDays = Object.keys(eventsByDay).sort((a, b) => {
    const dayA = dayOrder[a] || 999;
    const dayB = dayOrder[b] || 999;
    return dayA - dayB;
  });


  // Calculate dropdown position
  const calculateDropdownPosition = (buttonRef: React.RefObject<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      return {
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width
      };
    }
    return { top: 0, left: 0, width: 0 };
  };

  // Handle dropdown toggle
  const toggleDayDropdown = () => {
    if (!isDayDropdownOpen) {
      const position = calculateDropdownPosition(dayButtonRef);
      setDayDropdownPosition(position);
    }
    setIsDayDropdownOpen(!isDayDropdownOpen);
    setIsCategoryDropdownOpen(false);
  };

  const toggleCategoryDropdown = () => {
    if (!isCategoryDropdownOpen) {
      const position = calculateDropdownPosition(categoryButtonRef);
      setCategoryDropdownPosition(position);
    }
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
    setIsDayDropdownOpen(false);
  };

  // Handle payment modal
  const handlePaymentClick = (event: Event) => {
    setSelectedEvent(event);
    setShowPaymentModal(true);
    // Prevent body scroll - more robust approach
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${window.scrollY}px`;
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
    setSelectedEvent(null);
    // Restore body scroll
    const scrollY = document.body.style.top;
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  };

  const handleDirectPayment = () => {
    // PayU payment link
    window.open('https://payu.in/invoice/537B9024E5441B619012DB00D53CEAB57E7188F585220534625FAFB9C5BA7A91/C4A8F1931F35F35D59F417480F754596', '_blank');
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container') && !target.closest('.dropdown-menu')) {
        setIsDayDropdownOpen(false);
        setIsCategoryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup scroll lock on unmount
  useEffect(() => {
    return () => {
      // Restore all scroll-related styles
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, []);

  return (
    <div className="text-brand-black pt-16 relative">
      {/* Dark Underlay Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: '#160000'
        }}
      />
      
      {/* Fabric Texture Background - Reduced Opacity */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://res.cloudinary.com/digilabs/image/upload/v1759174422/prod/texture/fabric_texture_dtbgi8.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
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

      {/* Header Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-12 pb-8 px-4 sm:px-6 relative overflow-hidden z-10"
        style={{ 
          contain: 'layout style paint',
          isolation: 'isolate'
        }}
      >
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Earthen floating elements */}
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 bg-brand-earthen/20 rounded-full"
            animate={{ 
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-16 h-16 bg-brand-brown/15 rounded-full"
            animate={{ 
              y: [0, 15, 0],
              x: [0, 10, 0],
              rotate: [0, -180, -360]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl mb-4"
              style={{ fontFamily: 'var(--font-berkshire-swash)' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="text-white">All Cultural </span>
              <span className="text-brand-red font-bold">Events</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: 'var(--font-league-spartan)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Explore all events organized by day. Book your preferred events and immerse yourself in authentic Indian cultural experiences.
            </motion.p>
          </motion.div>

           {/* Filter Dropdowns */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.7 }}
             className="flex flex-row gap-4 justify-center items-start mt-6"
           >
             {/* Day Filter */}
             <div className="dropdown-container w-full sm:w-auto sm:min-w-[200px]">
               <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'var(--font-league-spartan)' }}>Day</label>
               <button
                 ref={dayButtonRef}
                 onClick={toggleDayDropdown}
                 className="flex items-center justify-between w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-brand-red transition-colors duration-200"
               >
                 <span className="text-brand-black text-sm" style={{ fontFamily: 'var(--font-league-spartan)' }}>{selectedDay}</span>
                 <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isDayDropdownOpen ? 'rotate-180' : ''}`} />
               </button>
             </div>

             {/* Category Filter */}
             <div className="dropdown-container w-full sm:w-auto sm:min-w-[200px]">
               <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'var(--font-league-spartan)' }}>Category</label>
               <button
                 ref={categoryButtonRef}
                 onClick={toggleCategoryDropdown}
                 className="flex items-center justify-between w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-brand-red transition-colors duration-200"
               >
                 <span className="text-brand-black text-sm" style={{ fontFamily: 'var(--font-league-spartan)' }}>{selectedCategory}</span>
                 <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
               </button>
             </div>
           </motion.div>
        </div>
      </motion.section>

      {/* Events by Day */}
      <section className="py-8 px-4 sm:px-6 relative z-10">
        <div className="container mx-auto max-w-7xl">
          {sortedDays.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <h3 className="text-2xl text-white mb-4" style={{ fontFamily: 'var(--font-berkshire-swash)' }}>No events found</h3>
              <p className="text-gray-300 mb-6" style={{ fontFamily: 'var(--font-league-spartan)' }}>
                Try adjusting your filters to see more events.
              </p>
              <button
                onClick={() => {
                  setSelectedDay('All');
                  setSelectedCategory('All');
                }}
                className="bg-brand-red hover:bg-brand-red-dark text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                style={{ fontFamily: 'var(--font-league-spartan)' }}
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            sortedDays.map((day, dayIndex) => (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: dayIndex * 0.05 }}
              className="mb-12 last:mb-0"
            >
              {/* Day Header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="mb-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-1 bg-gradient-to-r from-brand-red to-brand-brown rounded-full" />
                  <h2 className="text-3xl md:text-4xl font-berkshire-swash text-white" style={{ fontFamily: 'var(--font-berkshire-swash)' }}>
                    {day}
                  </h2>
                  <div className="flex-1 h-1 bg-gradient-to-r from-brand-brown to-transparent rounded-full" />
                  <div className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {eventsByDay[day].length} event{eventsByDay[day].length !== 1 ? 's' : ''}
                  </div>
                </div>
                <p className="text-gray-300 text-lg" style={{ fontFamily: 'var(--font-league-spartan)' }}>
                  {eventsByDay[day][0]?.date}
                </p>
              </motion.div>

              {/* Events Grid for this Day */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-4">
                {/* Mobile: Horizontal scroll container */}
                <div className="sm:hidden flex overflow-x-auto overflow-y-hidden scrollbar-hide gap-4 pb-2" style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}>
                  {eventsByDay[day].map((event, eventIndex) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: eventIndex * 0.05 }}
                      className="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl transition-all duration-300 ease-out overflow-hidden flex flex-col flex-shrink-0 w-72"
                      style={{
                        filter: 'drop-shadow(0 0 0 transparent)',
                        scrollSnapAlign: 'start'
                      }}
                      onMouseEnter={() => setHoveredCard(event.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      {/* Inner white card container */}
                      <div className="bg-white rounded-2xl m-1 flex flex-col flex-1 overflow-hidden">
                        {/* Event Image */}
                        <div className="relative h-48 sm:h-52 overflow-hidden">
                          <motion.img
                            src={event.image || getEventImageUrl(event.title)}
                            alt={event.title}
                            className={`w-full h-full object-cover ${
                              event.id === 16 || event.id === 30 || event.id === 34 
                                ? 'object-top' 
                                : 'object-center'
                            }`}
                            style={{
                              ...(event.id === 16 || event.id === 30 || event.id === 34 
                                ? { objectPosition: 'center 20%' } 
                                : {})
                            }}
                          />
                         
                          {/* Overlay Gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          
                          {/* Day Badge */}
                          <div className="absolute top-4 left-4">
                            <span className="bg-brand-black text-white px-3 py-1 rounded-full text-sm font-medium">
                              {event.day}
                            </span>
                          </div>
                          
                        </div>

                        {/* Event Content */}
                        <div className="p-4 sm:p-5 flex flex-col flex-grow">
                           {/* Dynamic Height Title Section */}
                           <div className="mb-3 flex items-start">
                             <div className="flex-1">
                               <h3 className="text-base sm:text-lg md:text-xl font-bold text-brand-black group-hover:text-brand-red transition-colors duration-300 leading-tight font-sans">
                                 {expandedTitles.has(event.id) ? event.title : truncateTitle(event.title)}
                               </h3>
                               {event.title.length > 50 && (
                                 <button
                                   onClick={() => toggleTitleExpansion(event.id)}
                                   className="text-xs text-brand-red hover:text-brand-red-dark transition-colors duration-200 mt-1"
                                   style={{ fontFamily: 'var(--font-league-spartan)' }}
                                 >
                                   {expandedTitles.has(event.id) ? 'Show less' : 'Read more'}
                                 </button>
                               )}
                             </div>
                           </div>
                          
                          {/* Fixed Height Description Section */}
                          <div className="h-10 sm:h-12 mb-3 sm:mb-4 flex items-start">
                            <p className="text-brand-earthen text-xs sm:text-sm leading-relaxed line-clamp-2" style={{ fontFamily: 'var(--font-league-spartan)' }}>
                              {event.description}
                            </p>
                          </div>
                          
                          {/* Fixed Height Separator Section */}
                          <div className="h-5 sm:h-6 mb-3 sm:mb-4 flex items-center">
                            <div className="w-12 sm:w-16 h-1 bg-brand-red rounded-full" />
                          </div>
                          
                           {/* Event Details */}
                           <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 flex-grow">
                             <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-earthen group-hover:text-brand-red transition-colors duration-300" style={{ fontFamily: 'var(--font-league-spartan)' }}>
                               <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-red flex-shrink-0" />
                               <span>{event.time}</span>
                             </div>
                             <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-earthen group-hover:text-brand-red transition-colors duration-300" style={{ fontFamily: 'var(--font-league-spartan)' }}>
                               <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-red flex-shrink-0" />
                               <span>{event.location}</span>
                             </div>
                             <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-earthen group-hover:text-brand-red transition-colors duration-300" style={{ fontFamily: 'var(--font-league-spartan)' }}>
                               <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-red flex-shrink-0" />
                               <span>Get your front row pass</span>
                             </div>
                           </div>
                          
                          {/* Get Tickets Button */}
                          <div className="mt-4">
                            <motion.button
                              onClick={() => handlePaymentClick(event)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex justify-center gap-2 items-center mx-auto shadow-lg text-base bg-black backdrop-blur-md font-medium isolation-auto border-gray-800 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-gradient-to-r before:from-yellow-400 before:to-amber-600 hover:text-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group text-white"
                              style={{ fontFamily: 'var(--font-league-spartan)' }}
                            >
                              Get Tickets
                              <svg
                                className="w-7 h-7 justify-end group-hover:rotate-90 group-hover:bg-white text-white group-hover:text-white ease-linear duration-300 rounded-full border border-gray-600 group-hover:border-white p-1.5 rotate-45"
                                viewBox="0 0 16 19"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                                  className="fill-white group-hover:fill-black"
                                ></path>
                              </svg>
                            </motion.button>
                          </div>
                          
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Medium Laptop: Compact button layout */}
                <div className="hidden sm:contents lg:hidden">
                  {eventsByDay[day].map((event, eventIndex) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: eventIndex * 0.05 }}
                      className="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl transition-all duration-300 ease-out overflow-hidden flex flex-col"
                      style={{
                        filter: 'drop-shadow(0 0 0 transparent)'
                      }}
                      onMouseEnter={() => setHoveredCard(event.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      {/* Compact button-style container */}
                      <div className="bg-white rounded-xl m-1 flex flex-row items-center p-3 hover:shadow-lg transition-all duration-300">
                        {/* Event Image - Small */}
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <motion.img
                            src={event.image || getEventImageUrl(event.title)}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                          {/* Day Badge */}
                          <div className="absolute -top-1 -left-1">
                            <span className="bg-brand-black text-white px-1.5 py-0.5 rounded-full text-xs font-medium">
                              {event.day}
                            </span>
                          </div>
                        </div>

                        {/* Event Info */}
                        <div className="flex-1 ml-3 min-w-0">
                          <div className="mb-1">
                            <h3 className="text-sm font-bold text-brand-black group-hover:text-brand-red transition-colors duration-300 font-sans">
                              {expandedTitles.has(event.id) ? event.title : truncateTitle(event.title, 40)}
                            </h3>
                            {event.title.length > 40 && (
                              <button
                                onClick={() => toggleTitleExpansion(event.id)}
                                className="text-xs text-brand-red hover:text-brand-red-dark transition-colors duration-200"
                                style={{ fontFamily: 'var(--font-league-spartan)' }}
                              >
                                {expandedTitles.has(event.id) ? 'Show less' : 'Read more'}
                              </button>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-brand-earthen mb-2" style={{ fontFamily: 'var(--font-league-spartan)' }}>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-brand-red flex-shrink-0" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-brand-red flex-shrink-0" />
                              <span className="truncate">{event.location}</span>
                            </div>
                          </div>
                          <motion.button
                            onClick={() => handlePaymentClick(event)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex justify-center gap-1.5 items-center mx-auto shadow-lg text-sm bg-black backdrop-blur-md font-medium isolation-auto border-gray-800 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-gradient-to-r before:from-yellow-400 before:to-amber-600 hover:text-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-2.5 py-1.5 overflow-hidden border-2 rounded-full group text-white"
                            style={{ fontFamily: 'var(--font-league-spartan)' }}
                          >
                            Get Tickets
                            <svg
                              className="w-6 h-6 justify-end group-hover:rotate-90 group-hover:bg-white text-white group-hover:text-white ease-linear duration-300 rounded-full border border-gray-600 group-hover:border-white p-1 rotate-45"
                              viewBox="0 0 16 19"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                                className="fill-white group-hover:fill-black"
                              ></path>
                            </svg>
                          </motion.button>
                        </div>

                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Desktop: Grid layout */}
                <div className="hidden lg:contents">
                {eventsByDay[day].map((event, eventIndex) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: eventIndex * 0.05 }}
                    className="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl transition-all duration-300 ease-out overflow-hidden flex flex-col"
                    style={{
                      filter: 'drop-shadow(0 0 0 transparent)'
                    }}
                    onMouseEnter={() => setHoveredCard(event.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Inner white card container */}
                    <div className="bg-white rounded-2xl m-1 flex flex-col flex-1 overflow-hidden">
                      {/* Event Image */}
                      <div className="relative h-48 sm:h-52 overflow-hidden">
                        <motion.img
                          src={event.image || getEventImageUrl(event.title)}
                          alt={event.title}
                          className={`w-full h-full object-cover ${
                            event.id === 16 || event.id === 30 || event.id === 34 
                              ? 'object-top' 
                              : 'object-center'
                          }`}
                          style={{
                            ...(event.id === 16 || event.id === 30 || event.id === 34 
                              ? { objectPosition: 'center 20%' } 
                              : {})
                          }}
                        />
                       
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Day Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="bg-brand-black text-white px-3 py-1 rounded-full text-sm font-medium">
                            {event.day}
                          </span>
                        </div>
                        
                      </div>

                      {/* Event Content */}
                      <div className="p-4 sm:p-5 flex flex-col flex-grow">
                         {/* Dynamic Height Title Section */}
                         <div className="mb-3 flex items-start">
                           <div className="flex-1">
                             <h3 className="text-base sm:text-lg md:text-xl font-bold text-brand-black group-hover:text-brand-red transition-colors duration-300 leading-tight font-sans">
                               {expandedTitles.has(event.id) ? event.title : truncateTitle(event.title)}
                             </h3>
                             {event.title.length > 50 && (
                               <button
                                 onClick={() => toggleTitleExpansion(event.id)}
                                 className="text-xs text-brand-red hover:text-brand-red-dark transition-colors duration-200 mt-1"
                                 style={{ fontFamily: 'var(--font-league-spartan)' }}
                               >
                                 {expandedTitles.has(event.id) ? 'Show less' : 'Read more'}
                               </button>
                             )}
                           </div>
                         </div>
                        
                        {/* Fixed Height Description Section */}
                        <div className="h-10 sm:h-12 mb-3 sm:mb-4 flex items-start">
                          <p className="text-brand-earthen text-xs sm:text-sm leading-relaxed line-clamp-2" style={{ fontFamily: 'var(--font-league-spartan)' }}>
                            {event.description}
                          </p>
                        </div>
                        
                        {/* Fixed Height Separator Section */}
                        <div className="h-5 sm:h-6 mb-3 sm:mb-4 flex items-center">
                          <div className="w-12 sm:w-16 h-1 bg-brand-red rounded-full" />
                        </div>
                        
                         {/* Event Details */}
                         <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 flex-grow">
                           <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-earthen group-hover:text-brand-red transition-colors duration-300" style={{ fontFamily: 'var(--font-league-spartan)' }}>
                             <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-red flex-shrink-0" />
                             <span>{event.time}</span>
                           </div>
                           <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-earthen group-hover:text-brand-red transition-colors duration-300" style={{ fontFamily: 'var(--font-league-spartan)' }}>
                             <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-red flex-shrink-0" />
                             <span>{event.location}</span>
                           </div>
                           <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-earthen group-hover:text-brand-red transition-colors duration-300" style={{ fontFamily: 'var(--font-league-spartan)' }}>
                             <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-red flex-shrink-0" />
                             <span>Get your front row pass</span>
                           </div>
                         </div>
                        
                        {/* Get Tickets Button */}
                        <div className="mt-4">
                          <motion.button
                            onClick={() => handlePaymentClick(event)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex justify-center gap-2 items-center mx-auto shadow-lg text-base bg-black backdrop-blur-md font-medium isolation-auto border-gray-800 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-gradient-to-r before:from-yellow-400 before:to-amber-600 hover:text-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group text-white"
                            style={{ fontFamily: 'var(--font-league-spartan)' }}
                          >
                            Get Tickets
                            <svg
                              className="w-7 h-7 justify-end group-hover:rotate-90 group-hover:bg-white text-white group-hover:text-white ease-linear duration-300 rounded-full border border-gray-600 group-hover:border-white p-1.5 rotate-45"
                              viewBox="0 0 16 19"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                                className="fill-white group-hover:fill-black"
                              ></path>
                            </svg>
                          </motion.button>
                        </div>
                        
                      </div>
                    </div>
                  </motion.div>
                ))}
                </div>
              </div>
            </motion.div>
            ))
          )}
        </div>
       </section>

       {/* End Message */}
       <motion.section
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.8 }}
         className="py-8 px-4 sm:px-6 relative z-10"
       >
         <div className="container mx-auto max-w-4xl text-center">
           <p className="text-lg text-gray-300" style={{ fontFamily: 'var(--font-league-spartan)' }}>
             You&apos;ve reached the end of all events. Thank you for exploring our cultural heritage!
           </p>
         </div>
       </motion.section>

       {/* Portal-based Dropdown Menus */}
      <AnimatePresence>
        {isDayDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto dropdown-menu"
            style={{
              top: dayDropdownPosition.top,
              left: dayDropdownPosition.left,
              width: dayDropdownPosition.width,
              zIndex: 99999
            }}
          >
            {uniqueDays.map((day) => (
              <button
                key={day}
                onClick={() => {
                  setSelectedDay(day);
                  setIsDayDropdownOpen(false);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2 ${
                  selectedDay === day ? 'bg-brand-red/10 text-brand-red' : 'text-brand-black'
                }`}
                style={{ fontFamily: 'var(--font-league-spartan)' }}
              >
                {selectedDay === day && <span className="text-brand-red">✓</span>}
                {day}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCategoryDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto dropdown-menu"
            style={{
              top: categoryDropdownPosition.top,
              left: categoryDropdownPosition.left,
              width: categoryDropdownPosition.width,
              zIndex: 99999
            }}
          >
            {uniqueCategories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setIsCategoryDropdownOpen(false);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2 ${
                  selectedCategory === category ? 'bg-brand-red/10 text-brand-red' : 'text-brand-black'
                }`}
                style={{ fontFamily: 'var(--font-league-spartan)' }}
              >
                {selectedCategory === category && <span className="text-brand-red">✓</span>}
                {category}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 pt-20"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-lg w-full max-h-[80vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Fixed Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-full flex items-center justify-center">
                    <Info className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-brand-black" style={{ fontFamily: 'var(--font-league-spartan)' }}>
                    Event Booking
                  </h2>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Event Details */}
                  <div className="bg-gradient-to-r from-brand-red/5 to-brand-brown/5 rounded-lg p-4">
                    <h3 className="text-lg font-bold text-brand-black mb-3" style={{ fontFamily: 'var(--font-league-spartan)' }}>
                      {selectedEvent.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-brand-earthen" style={{ fontFamily: 'var(--font-league-spartan)' }}>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-brand-red" />
                        <span>{selectedEvent.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-brand-red" />
                        <span>{selectedEvent.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-brand-red" />
                        <span>{selectedEvent.day} - {selectedEvent.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Friend of Virāsat Information */}
                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-bold text-yellow-800 mb-3 flex items-center gap-2 text-base" style={{ fontFamily: 'var(--font-league-spartan)' }}>
                      <Info className="w-4 h-4" />
                      Ticket Booking Privileges
                    </h4>
                    <div className="text-sm text-yellow-800 space-y-3" style={{ fontFamily: 'var(--font-league-spartan)' }}>
                      <p className="leading-relaxed text-justify">
                        Today, Virāsat welcomes 1M+ visitors annually, showcases 400+ performing artists & 300 artisans, and engages over 50,000 students, creating livelihoods & cultural pride.
                      </p>
                      <p className="leading-relaxed text-justify">
                        Now you can be part of this journey as a Friend of Virāsat (FoV) – an exclusive circle of patrons who support artistes & traditions while enjoying insider privileges:
                      </p>
                      <ul className="space-y-1.5 ml-2">
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-600">✨</span>
                          <span>A private sofa for two across all 14 festival days for just ₹30,000 (first-come-first-served)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-600">✨</span>
                          <span>Priority access & free parking</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-600">✨</span>
                          <span>A dedicated liaison for seamless experiences</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-600">✨</span>
                          <span>Cultural updates year-round</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-600">✨</span>
                          <span>50% tax exemption under Section 80(G)</span>
                        </li>
                      </ul>
                      <p className="leading-relaxed font-medium text-justify">
                        Be more than an audience. Be family. 🌟 Join FoV and sustain heritage for future generations.
                      </p>
                    </div>
                  </div>

                  {/* Payment Options */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-brand-black text-center text-base" style={{ fontFamily: 'var(--font-league-spartan)' }}>
                      Choose Payment Method
                    </h4>
                    
                    {/* Payment Methods - Responsive Layout */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-gray-50 rounded-lg p-4">
                      {/* QR Code Option */}
                      <div className="text-center sm:text-left flex-1">
                        {/* QR Code Image */}
                        <div className="bg-white p-1 rounded-lg inline-block mb-3">
                          <img 
                            src="/images/qr.jpg" 
                            alt="Payment QR Code" 
                            className="w-24 h-24 rounded"
                          />
                        </div>
                        <h5 className="font-semibold text-brand-black text-base" style={{ fontFamily: 'var(--font-league-spartan)' }}>
                          Scan QR Code
                        </h5>
                      </div>

                      {/* OR Text with Lines - Responsive */}
                      <div className="flex-shrink-0 flex items-center justify-center">
                        <div className="w-8 sm:w-8 h-px bg-gray-300"></div>
                        <span className="px-3 text-base text-gray-500 font-medium" style={{ fontFamily: 'var(--font-league-spartan)' }}>
                          OR
                        </span>
                        <div className="w-8 sm:w-8 h-px bg-gray-300"></div>
                      </div>

                      {/* Direct Payment Option */}
                      <div className="flex-1 text-center sm:text-left">
                        <motion.button
                          onClick={handleDirectPayment}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex justify-center gap-2 items-center mx-auto shadow-lg text-base bg-black backdrop-blur-md font-medium isolation-auto border-gray-800 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-gradient-to-r before:from-yellow-400 before:to-amber-600 hover:text-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2.5 overflow-hidden border-2 rounded-full group text-white"
                          style={{ fontFamily: 'var(--font-league-spartan)' }}
                        >
                          Visit Link
                          <svg
                            className="w-7 h-7 justify-end group-hover:rotate-90 group-hover:bg-white text-white group-hover:text-white ease-linear duration-300 rounded-full border border-gray-600 group-hover:border-white p-1.5 rotate-45"
                            viewBox="0 0 16 19"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                              className="fill-white group-hover:fill-black"
                            ></path>
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventsPage;

