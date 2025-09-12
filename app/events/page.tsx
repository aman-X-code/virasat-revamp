'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Users, Star, ArrowRight, Timer, Calendar, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
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
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [selectedDay, setSelectedDay] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isDayDropdownOpen, setIsDayDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [dayDropdownPosition, setDayDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [categoryDropdownPosition, setCategoryDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const dayButtonRef = useRef<HTMLButtonElement>(null);
  const categoryButtonRef = useRef<HTMLButtonElement>(null);

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

  // Countdown timer for featured events
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const eventDate = new Date();
      eventDate.setDate(eventDate.getDate() + 3); // 3 days from now
      const distance = eventDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFF7F5F4' }}>
      {/* Header Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-24 pb-8 px-4 sm:px-6 relative overflow-hidden"
        style={{ 
          backgroundColor: '#FFF7F5F4',
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
              className="text-4xl sm:text-5xl md:text-6xl font-serif mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="text-brand-black">All Cultural </span>
              <span className="text-brand-brown font-bold">Events</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-brand-earthen max-w-3xl mx-auto leading-relaxed"
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
               <label className="block text-sm font-medium text-brand-brown mb-2">Day</label>
               <button
                 ref={dayButtonRef}
                 onClick={toggleDayDropdown}
                 className="flex items-center justify-between w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-brand-red transition-colors duration-200"
               >
                 <span className="text-brand-black text-sm">{selectedDay}</span>
                 <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isDayDropdownOpen ? 'rotate-180' : ''}`} />
               </button>
             </div>

             {/* Category Filter */}
             <div className="dropdown-container w-full sm:w-auto sm:min-w-[200px]">
               <label className="block text-sm font-medium text-brand-brown mb-2">Category</label>
               <button
                 ref={categoryButtonRef}
                 onClick={toggleCategoryDropdown}
                 className="flex items-center justify-between w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-brand-red transition-colors duration-200"
               >
                 <span className="text-brand-black text-sm">{selectedCategory}</span>
                 <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
               </button>
             </div>
           </motion.div>
        </div>
      </motion.section>

      {/* Events by Day */}
      <section className="py-8 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          {sortedDays.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <h3 className="text-2xl font-serif text-brand-brown mb-4">No events found</h3>
              <p className="text-brand-earthen mb-6">
                Try adjusting your filters to see more events.
              </p>
              <button
                onClick={() => {
                  setSelectedDay('All');
                  setSelectedCategory('All');
                }}
                className="bg-brand-red hover:bg-brand-red-dark text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
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
                  <h2 className="text-3xl md:text-4xl font-serif text-brand-black">
                    {day}
                  </h2>
                  <div className="flex-1 h-1 bg-gradient-to-r from-brand-brown to-transparent rounded-full" />
                  <div className="bg-brand-earthen-light/20 text-brand-earthen px-3 py-1 rounded-full text-sm font-medium">
                    {eventsByDay[day].length} event{eventsByDay[day].length !== 1 ? 's' : ''}
                  </div>
                </div>
                <p className="text-brand-earthen text-lg">
                  {eventsByDay[day][0]?.date}
                </p>
              </motion.div>

              {/* Events Grid for this Day */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-4">
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
                            src={getEventImageUrl(event.title)}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                         
                          {/* Overlay Gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          
                          {/* Day Badge */}
                          <div className="absolute top-4 left-4">
                            <span className="bg-brand-black text-white px-3 py-1 rounded-full text-sm font-medium">
                              {event.day}
                            </span>
                          </div>
                          
                          {/* Featured Badge */}
                          {event.featured && (
                            <div className="absolute top-4 right-4 flex flex-col gap-2">
                              <span className="bg-brand-red text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                <Star className="w-3 h-3 fill-current" />
                                Featured
                              </span>
                              {/* Countdown Timer */}
                              <div className="bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs">
                                <div className="flex items-center gap-1">
                                  <Timer className="w-3 h-3" />
                                  <span>{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Event Content */}
                        <div className="p-4 sm:p-5 flex flex-col flex-grow">
                           {/* Fixed Height Title Section */}
                           <div className="h-14 sm:h-16 mb-3 flex items-start">
                             <h3 className="text-base sm:text-lg md:text-xl font-bold text-brand-black font-serif group-hover:text-brand-red transition-colors duration-300 line-clamp-2 leading-tight">
                               {event.title}
                             </h3>
                           </div>
                          
                          {/* Fixed Height Description Section */}
                          <div className="h-10 sm:h-12 mb-3 sm:mb-4 flex items-start">
                            <p className="text-brand-earthen text-xs sm:text-sm leading-relaxed line-clamp-2">
                              {event.description}
                            </p>
                          </div>
                          
                          {/* Fixed Height Separator Section */}
                          <div className="h-5 sm:h-6 mb-3 sm:mb-4 flex items-center">
                            <div className="w-12 sm:w-16 h-1 bg-brand-red rounded-full" />
                          </div>
                          
                           {/* Event Details */}
                           <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 flex-grow">
                             <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-earthen group-hover:text-brand-red transition-colors duration-300">
                               <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-red flex-shrink-0" />
                               <span>{event.time}</span>
                             </div>
                             <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-earthen group-hover:text-brand-red transition-colors duration-300">
                               <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-red flex-shrink-0" />
                               <span>{event.location}</span>
                             </div>
                             <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-earthen group-hover:text-brand-red transition-colors duration-300">
                               <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-red flex-shrink-0" />
                               <span>Only 100 tickets • First-come, first-served</span>
                             </div>
                           </div>
                          
                          {/* Price and Buy Button - Temporarily commented out for future use */}
                          {/* <div className="flex items-center justify-between gap-2 sm:gap-3 mt-auto px-1">
                            <div className="flex items-baseline gap-1">
                              <span className="text-lg sm:text-xl md:text-2xl font-bold text-brand-black leading-none">{event.price}</span>
                              <span className="text-xs text-brand-earthen-light leading-tight whitespace-nowrap">per person</span>
                            </div>
                            
                            <Link href={`/events/${event.id}`}>
                              <motion.button
                                className="bg-brand-red hover:bg-brand-red-dark text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-1 sm:gap-1.5 group/btn flex-shrink-0 h-8 sm:h-9"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                  console.log('Events page Book Now clicked for event:', event.id, event.title);
                                  console.log('Events page Event Details URL:', `/events/${event.id}`);
                                }}
                              >
                                <span className="text-xs sm:text-sm whitespace-nowrap">Book Now</span>
                                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                              </motion.button>
                            </Link>
                          </div> */}
                          
                          {/* Booking Status Message */}
                          <div className="flex items-center justify-between gap-2 sm:gap-3 mt-auto px-1">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                              <span className="text-sm font-medium text-brand-earthen">Booking starts soon</span>
                            </div>
                            
                            <Link href={`/events/${event.id}`}>
                              <motion.button
                                className="bg-brand-earthen-light/20 hover:bg-brand-earthen-light/30 text-brand-earthen px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-1 sm:gap-1.5 group/btn flex-shrink-0 h-8 sm:h-9 border border-brand-earthen-light"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                  console.log('Events page View Details clicked for event:', event.id, event.title);
                                  console.log('Events page Event Details URL:', `/events/${event.id}`);
                                }}
                              >
                                <span className="text-xs sm:text-sm whitespace-nowrap">View Details</span>
                                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                              </motion.button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Desktop: Grid layout */}
                <div className="hidden sm:contents">
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
                          src={getEventImageUrl(event.title)}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                       
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Day Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="bg-brand-black text-white px-3 py-1 rounded-full text-sm font-medium">
                            {event.day}
                          </span>
                        </div>
                        
                        {/* Featured Badge */}
                        {event.featured && (
                          <div className="absolute top-4 right-4 flex flex-col gap-2">
                            <span className="bg-brand-red text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                              <Star className="w-3 h-3 fill-current" />
                              Featured
                            </span>
                            {/* Countdown Timer */}
                            <div className="bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs">
                              <div className="flex items-center gap-1">
                                <Timer className="w-3 h-3" />
                                <span>{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Event Content */}
                      <div className="p-4 sm:p-5 flex flex-col flex-grow">
                         {/* Fixed Height Title Section */}
                         <div className="h-14 sm:h-16 mb-3 flex items-start">
                           <h3 className="text-base sm:text-lg md:text-xl font-bold text-brand-black font-serif group-hover:text-brand-red transition-colors duration-300 line-clamp-2 leading-tight">
                             {event.title}
                           </h3>
                         </div>
                        
                        {/* Fixed Height Description Section */}
                        <div className="h-10 sm:h-12 mb-3 sm:mb-4 flex items-start">
                          <p className="text-brand-earthen text-xs sm:text-sm leading-relaxed line-clamp-2">
                            {event.description}
                          </p>
                        </div>
                        
                        {/* Fixed Height Separator Section */}
                        <div className="h-5 sm:h-6 mb-3 sm:mb-4 flex items-center">
                          <div className="w-12 sm:w-16 h-1 bg-brand-red rounded-full" />
                        </div>
                        
                         {/* Event Details */}
                         <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 flex-grow">
                           <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-earthen group-hover:text-brand-red transition-colors duration-300">
                             <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-red flex-shrink-0" />
                             <span>{event.time}</span>
                           </div>
                           <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-earthen group-hover:text-brand-red transition-colors duration-300">
                             <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-red flex-shrink-0" />
                             <span>{event.location}</span>
                           </div>
                           <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-earthen group-hover:text-brand-red transition-colors duration-300">
                             <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-red flex-shrink-0" />
                             <span>Only 100 tickets • First-come, first-served</span>
                           </div>
                         </div>
                        
                        {/* Price and Buy Button - Temporarily commented out for future use */}
                        {/* <div className="flex items-center justify-between gap-2 sm:gap-3 mt-auto px-1">
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg sm:text-xl md:text-2xl font-bold text-brand-black leading-none">{event.price}</span>
                            <span className="text-xs text-brand-earthen-light leading-tight whitespace-nowrap">per person</span>
                          </div>
                          
                          <Link href={`/events/${event.id}`}>
                            <motion.button
                              className="bg-brand-red hover:bg-brand-red-dark text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-1 sm:gap-1.5 group/btn flex-shrink-0 h-8 sm:h-9"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                console.log('Events page Book Now clicked for event:', event.id, event.title);
                                console.log('Events page Event Details URL:', `/events/${event.id}`);
                              }}
                            >
                              <span className="text-xs sm:text-sm whitespace-nowrap">Book Now</span>
                              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                            </motion.button>
                          </Link>
                        </div> */}
                        
                        {/* Booking Status Message */}
                        <div className="flex items-center justify-between gap-2 sm:gap-3 mt-auto px-1">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-brand-earthen">Booking starts soon</span>
                          </div>
                          
                          <Link href={`/events/${event.id}`}>
                            <motion.button
                              className="bg-brand-earthen-light/20 hover:bg-brand-earthen-light/30 text-brand-earthen px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-1 sm:gap-1.5 group/btn flex-shrink-0 h-8 sm:h-9 border border-brand-earthen-light"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                console.log('Events page View Details clicked for event:', event.id, event.title);
                                console.log('Events page Event Details URL:', `/events/${event.id}`);
                              }}
                            >
                              <span className="text-xs sm:text-sm whitespace-nowrap">View Details</span>
                              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                            </motion.button>
                          </Link>
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
         className="py-8 px-4 sm:px-6"
       >
         <div className="container mx-auto max-w-4xl text-center">
           <p className="text-lg text-brand-earthen">
             You've reached the end of all events. Thank you for exploring our cultural heritage!
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
              >
                {selectedCategory === category && <span className="text-brand-red">✓</span>}
                {category}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventsPage;
