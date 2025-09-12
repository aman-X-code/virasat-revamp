"use client"

import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion"
import { useState, useEffect } from "react"
import { 
  Star, 
  Quote, 
  User, 
  Users,
  ThumbsUp, 
  MessageCircle,
  Award,
  Heart,
  Camera,
  MapPin,
  Calendar,
  Music
} from "lucide-react"
import Image from "next/image"

interface Testimonial {
  id: number
  name: string
  avatar: string
  rating: number
  comment: string
  date: string
  event: string
  location: string
  likes: number
  verified: boolean
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    avatar: "/images/artists/birju_maharaj.png",
    rating: 5,
    comment: "Absolutely mesmerizing performance! The cultural authenticity was incredible. I felt transported to another era. The artists' dedication to preserving our heritage is truly inspiring.",
    date: "2 years ago",
    event: "Sarod recital by Ustad Amjad Ali Khan",
    location: "Mumbai",
    likes: 24,
    verified: true
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    avatar: "/images/artists/lata_mangeshkar.jpg",
    rating: 5,
    comment: "A beautiful celebration of our heritage. The venue was perfect, and the organization was flawless. Highly recommended for everyone who wants to experience authentic Indian culture.",
    date: "6 months ago",
    event: "Bharatnatyam dance by Aarohi Munshi",
    location: "Delhi",
    likes: 18,
    verified: true
  },
  {
    id: 3,
    name: "Anita Patel",
    avatar: "/images/artists/shubha_mudgal.jpg",
    rating: 4,
    comment: "Wonderful experience overall! The performance was outstanding, though the venue could be better organized. Still, the cultural value made it completely worth it.",
    date: "2 weeks ago",
    event: "Folk performances from Uttarakhand",
    location: "Bangalore",
    likes: 12,
    verified: true
  },
  {
    id: 4,
    name: "Vikram Singh",
    avatar: "/images/artists/naseeruddin_shah.jpg",
    rating: 5,
    comment: "Perfect blend of tradition and modern presentation. Loved every moment! The artists were world-class, and the cultural context provided was educational and engaging.",
    date: "3 weeks ago",
    event: "Hindustani vocal by Pt Ulhas Kashalkar",
    location: "Pune",
    likes: 31,
    verified: true
  },
  {
    id: 5,
    name: "Meera Joshi",
    avatar: "/images/artists/zakir_hussain.jpg",
    rating: 5,
    comment: "This was my first classical music concert, and I was blown away! The explanations about ragas and the cultural significance made it accessible for beginners like me.",
    date: "1 month ago",
    event: "Sitar recital by Adnan Khan",
    location: "Chennai",
    likes: 19,
    verified: true
  },
  {
    id: 6,
    name: "Arjun Reddy",
    avatar: "/images/artists/ring.png",
    rating: 5,
    comment: "Exceptional quality of performances! The festival truly captures the essence of Indian culture. My family and I had an unforgettable experience.",
    date: "1 month ago",
    event: "Usha Uthup Live in Concert",
    location: "Hyderabad",
    likes: 27,
    verified: true
  }
]

const stats = [
  { icon: Users, label: "Happy Attendees", value: "10,000+" },
  { icon: Star, label: "Average Rating", value: "4.8/5" },
  { icon: Award, label: "Years of Excellence", value: "25+" },
  { icon: Heart, label: "Cultural Events", value: "500+" }
]

export default function EventTestimonials() {
  const [isMobile, setIsMobile] = useState(false)
  const [currentCard, setCurrentCard] = useState(0)
  const [scrollContainerRef, setScrollContainerRef] = useState<HTMLDivElement | null>(null)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Handle scroll position for mobile
  const handleScroll = () => {
    if (!isMobile || !scrollContainerRef) return
    
    const scrollLeft = scrollContainerRef.scrollLeft
    const cardWidth = 304 // w-72 + gap = 288 + 16 = 304px
    const currentCardIndex = Math.round(scrollLeft / cardWidth)
    setCurrentCard(Math.min(Math.max(currentCardIndex, 0), testimonials.length - 1))
  }

  return (
    <div className="pt-4 pb-16" style={{ backgroundColor: '#FFF6F4' }}>
      <div className="container mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-3 bg-brand-red/10 rounded-full px-6 py-3 mb-4">
            <MessageCircle className="w-6 h-6 text-brand-red" />
            <span className="font-bold text-brand-black">Community Reviews</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-brand-black mb-4">
            What Our <span className="text-brand-red">Community</span> Says
          </h2>
          
          <p className="text-xl text-brand-earthen max-w-3xl mx-auto leading-relaxed">
            Join thousands of culture enthusiasts who have experienced the magic of authentic Indian heritage
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-3 shadow-md text-center hover:shadow-lg transition-all duration-300"
            >
              <div className="p-2 bg-brand-red/10 rounded-lg w-fit mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-brand-red" />
              </div>
              <div className="text-3xl font-bold text-brand-black mb-1">{stat.value}</div>
              <div className="text-xs text-brand-earthen">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid - native scroll on mobile, grid on desktop */}
        <div 
          ref={setScrollContainerRef}
          className={`flex-1 ${isMobile ? 'flex overflow-x-auto overflow-y-hidden scrollbar-hide px-4' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-4 sm:gap-6 lg:gap-8`}
          onScroll={handleScroll}
          style={{
            scrollSnapType: isMobile ? 'x mandatory' : 'none',
            scrollBehavior: isMobile ? 'smooth' : 'auto',
            WebkitOverflowScrolling: isMobile ? 'touch' : 'auto',
            contain: 'layout style paint',
            isolation: 'isolate'
          }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={isMobile ? false : { opacity: 0, y: 50 }}
              animate={isMobile ? false : { opacity: 1, y: 0 }}
              transition={isMobile ? {} : { duration: 0.8, delay: index * 0.1 }}
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col ${isMobile ? 'flex-shrink-0 w-72' : 'h-full'}`}
              style={{
                scrollSnapAlign: isMobile ? 'start' : 'none',
                filter: 'drop-shadow(0 0 0 transparent)'
              }}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  {testimonial.verified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <Award className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-brand-black">{testimonial.name}</h4>
                    {testimonial.verified && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-brand-earthen">
                    <Calendar className="w-3 h-3" />
                    <span>{testimonial.date}</span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${
                        i < testimonial.rating 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-brand-earthen">({testimonial.rating}/5)</span>
              </div>

              {/* Quote */}
              <div className="relative mb-4">
                <Quote className="absolute -top-2 -left-2 w-6 h-6 text-brand-red/20" />
                <p className="text-brand-earthen leading-relaxed pl-4">
                  {testimonial.comment}
                </p>
              </div>

              {/* Event Info */}
              <div className="bg-gray-50 rounded-xl p-3 mt-auto">
                <div className="flex items-center gap-2 text-sm text-brand-earthen mb-1">
                  <Music className="w-3 h-3" />
                  <span className="font-medium">{testimonial.event}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-brand-earthen">
                  <MapPin className="w-3 h-3" />
                  <span>{testimonial.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Swipe Indicators for Mobile */}
        {isMobile && (
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (scrollContainerRef) {
                    const cardWidth = 304
                    scrollContainerRef.scrollTo({
                      left: index * cardWidth,
                      behavior: 'smooth'
                    })
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentCard ? 'bg-brand-red' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <div className="bg-gradient-to-r from-brand-red to-brand-red-dark rounded-2xl p-6 text-white shadow-xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-3">Join Our Cultural Community</h3>
            <p className="text-lg mb-4 opacity-90">
              Be part of thousands who celebrate and preserve Indian cultural heritage
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-300 fill-current" />
                <span>4.8/5 Average Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>10,000+ Happy Attendees</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>15+ Years of Excellence</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

