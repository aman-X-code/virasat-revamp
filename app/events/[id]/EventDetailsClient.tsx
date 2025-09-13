"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Users, 
  Star, 
  Share2,
  AlertCircle,
  X,
  ChevronDown
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import SmallLoader from '@/components/SmallLoader'
import EventTestimonials from '@/components/EventTestimonials'
import { useLoading } from '@/hooks/useLoading'

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

interface EventData {
  id: number
  day: string
  title: string
  description: string
  image: string
  time: string
  location: string
  seats: string
  price: string
  featured: boolean
  category: string
  date: string
  duration?: string
  ageRestriction?: string
}

interface EventDetailsClientProps {
  eventData: EventData
}

// Enhanced event data with cultural context

export default function EventDetailsClient({ eventData }: EventDetailsClientProps) {
  const { isLoading, withLoading } = useLoading(false)
  const [showScrollHint, setShowScrollHint] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 60) setShowScrollHint(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const router = useRouter()
  const [isLiked, setIsLiked] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)


  const handleBookNow = () => {
    // Redirect to BookMyShow with event details
    const bookMyShowUrl = `https://in.bookmyshow.com/events/${eventData.title.replace(/\s+/g, '-').toLowerCase()}-${eventData.id}`
    window.open(bookMyShowUrl, '_blank')
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: eventData.title,
          text: `Don't miss ${eventData.title} at Virasat Festival 2024!`,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      setShowShareModal(true)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    // Show toast notification
  }

  return (
    <>
      <SmallLoader isLoading={isLoading} />
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen"
          style={{ backgroundColor: '#FFF7F5F4' }}
        >
          {/* Hero Section */}
          <div className="relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dc2626' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>

            <div className="container mx-auto max-w-7xl px-6 pt-24 pb-6 relative z-10">
              {/* Back Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-4"
              >
                <Link href="/events" className="inline-block">
                  <button className="bg-white/90 backdrop-blur-sm text-center w-32 rounded-lg h-10 relative text-brand-black text-xs font-semibold group shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="bg-brand-red rounded-md h-8 w-8 flex items-center justify-center absolute left-1 top-1 group-hover:w-[120px] z-10 duration-500">
                      <ArrowLeft className="w-4 h-4 text-white" />
                    </div>
                    <p className="translate-x-4 text-brand-black">Back to Events</p>
                  </button>
                </Link>
              </motion.div>

              {/* Event Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-4 mb-4 relative"
              >

                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="lg:w-1/3 relative">
                    <img
                      src={getEventImageUrl(eventData.title)}
                      alt={eventData.title}
                      width={400}
                      height={240}
                      className="w-full h-60 object-cover rounded-xl"
                    />
                    {eventData.featured && (
                      <span className="absolute top-3 right-3 bg-brand-red text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current" />
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="lg:w-2/3">
                    <div className="mb-3">
                      {/* Category pill */}
                      <div className="mb-2">
                        <span className="inline-block px-3 py-1 rounded-full bg-brand-earthen-light/30 text-brand-brown text-xs font-semibold">
                          {eventData.category || 'Performance'}
                        </span>
                      </div>
                      <h1 className="text-lg md:text-xl font-serif font-bold text-brand-black mb-2">
                        {eventData.title}
                      </h1>
                      <p className="text-brand-earthen text-sm md:text-base leading-relaxed text-justify">
                        {eventData.description}
                      </p>
                    </div>

                    {/* Summary blocks styled like the new design */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                      {/* Time */}
                      <div className="flex items-center gap-2 sm:gap-3 bg-brand-earthen-light/20 rounded-lg sm:rounded-xl p-2 sm:p-3 text-brand-earthen">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-brand-red/10 flex items-center justify-center">
                          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-brand-red" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-brand-black leading-tight">{eventData.time}</p>
                          <p className="text-xs sm:text-sm">{eventData.date}</p>
                        </div>
                      </div>

                      {/* Tickets */}
                      <div className="flex items-center gap-2 sm:gap-3 bg-brand-earthen-light/20 rounded-lg sm:rounded-xl p-2 sm:p-3 text-brand-earthen">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-brand-red/10 flex items-center justify-center">
                          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-brand-red" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-brand-black leading-tight">Only 100 tickets</p>
                          <p className="text-xs sm:text-sm">First-come, first-served</p>
                          <div className="mt-1">
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-white text-brand-earthen text-[11px] sm:text-xs border border-brand-earthen-light">
                              {eventData.ageRestriction || 'All ages welcome'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-2 sm:gap-3 bg-brand-earthen-light/20 rounded-lg sm:rounded-xl p-2 sm:p-3 text-brand-earthen col-span-1 md:col-span-1">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-brand-red/10 flex items-center justify-center">
                          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-brand-red" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-brand-black leading-tight">{eventData.location}</p>
                          <p className="text-xs sm:text-sm">{eventData.duration || 'Duration varies'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Instructions Button - Before Booking Steps */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center mb-4"
              >
                <button
                  onClick={() => setShowInstructions(!showInstructions)}
                  className="uiverse-instructions-btn"
                  aria-label="Booking Instructions"
                >
                  <span className="inline-flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Booking Instructions
                  </span>
                </button>
                <style jsx>{`
                  /* Uiverse-styled button adapted to brand colors */
                  .uiverse-instructions-btn {
                    --color: #dc2626; /* brand red */
                    font-family: inherit;
                    display: inline-block;
                    width: 12em; /* slightly wider */
                    height: 2.8em; /* slightly taller */
                    line-height: 2.7em; /* keep text centered */
                    overflow: hidden;
                    margin: 8px 0;
                    font-size: 1rem; /* a touch larger text */
                    z-index: 1;
                    color: var(--color);
                    border: 2px solid var(--color);
                    border-radius: 10px;
                    position: relative;
                    background: transparent;
                    transition: color .2s ease;
                  }
                  .uiverse-instructions-btn::before {
                    position: absolute;
                    content: "";
                    background: var(--color);
                    width: 250px;
                    height: 180px;
                    z-index: -1;
                    border-radius: 50%;
                    top: 100%;
                    left: 100%;
                    transition: .3s all;
                  }
                  .uiverse-instructions-btn:hover {
                    color: #ffffff;
                  }
                  .uiverse-instructions-btn:hover::before {
                    top: -30px;
                    left: -30px;
                  }
                `}</style>
              </motion.div>

              {/* Mobile scroll hint */}
              {showScrollHint && (
                <div className="md:hidden flex items-center justify-center gap-2 text-brand-earthen mt-2 mb-3">
                  <span className="text-xs">Scroll for booking steps</span>
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                </div>
              )}

              {/* Booking Steps */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-2"
              >
                <div className="flex items-start justify-between max-w-4xl mx-auto px-2">
                  {[
                    { id: 1, title: "View Event", description: "Explore event details and information" },
                    { id: 2, title: "Booking Opens Soon", description: "Pricing and booking details coming soon" },
                    { id: 3, title: "Select Seats", description: "Choose your preferred seating area" },
                    { id: 4, title: "Complete Booking", description: "Payment and confirmation on BookMyShow" }
                  ].map((step, index) => (
                    <div key={step.id} className="flex items-center flex-1">
                      <div className="flex flex-col items-center w-full">
                        <div
                          className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 ${
                            step.id === 1
                              ? 'bg-brand-red text-white'
                              : 'bg-gray-200 text-gray-500'
                          }`}
                        >
                          {step.id}
                        </div>
                        <div className="mt-0.5 text-center w-full">
                          <p className={`text-xs sm:text-sm font-medium ${
                            step.id === 1 ? 'text-brand-red' : 'text-gray-500'
                          }`}>
                            {step.title}
                          </p>
                          <p className="text-xs text-gray-400 hidden sm:block mt-0.5">{step.description}</p>
                        </div>
                      </div>
                      {index < 3 && (
                        <div className={`w-6 sm:w-8 md:w-12 h-1 mx-1 sm:mx-2 md:mx-3 transition-all duration-300 ${
                          step.id === 1 ? 'bg-brand-red' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>


              {/* Instructions Modal */}
              <AnimatePresence>
                {showInstructions && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowInstructions(false)}
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-brand-black">Booking Instructions</h3>
                        <button
                          onClick={() => setShowInstructions(false)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="space-y-4 text-brand-earthen">
                        <div>
                          <h4 className="font-bold text-brand-red mb-2">Current Status</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Exclusive Sofa Seating available</li>
                            <li><span className="font-semibold">Only 100 seats</span> available (first-come, first-served)</li>
                            <li>Tickets will launch exclusively on BookMyShow soon</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-bold text-brand-red mb-2">Included With Your Ticket</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Free Village Entry: Complimentary access to the entire festival village</li>
                            <li>Dedicated Entry Gate: Separate entry for Sofa Zone ticket holders</li>
                            <li>Complimentary Snacks: Light bites included for ticket holders</li>
                            <li>Single-Day Validity: Valid for the date of purchase only</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-bold text-brand-red mb-2">Booking Platform</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>BookMyShow Launch: Tickets will be available exclusively on BookMyShow</li>
                            <li>Secure payment processing and instant confirmations</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-bold text-brand-red mb-2">Important Notes</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li><span className="font-semibold">Exclusive Sofa Seating</span> (Only 100 seats available)</li>
                            <li>Only valid for the chosen date; carry a valid ID</li>
                            <li>Tickets are non-refundable; transfers subject to platform policy</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>


            </div>
          </div>

          {/* BookMyShow Button - Temporarily commented out for future use */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mb-8"
          >
            <button
              onClick={handleBookNow}
              className="inline-flex items-center justify-center gap-3 bg-red-500 hover:bg-white text-white hover:text-red-500 px-5 py-2.5 rounded-lg border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(239,68,68,1)] hover:border-red-500 transition-all duration-300 ease-in-out active:shadow-none active:translate-y-1 cursor-pointer"
            >
              <Image
                src="/images/BookMyShow.png"
                alt="BookMyShow"
                width={100}
                height={32}
                className="h-8 object-contain"
              />
            </button>
          </motion.div> */}

          {/* Booking Status Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center bg-brand-earthen-light/20 hover:bg-brand-earthen-light/30 text-brand-earthen px-8 py-4 rounded-lg border-2 border-brand-earthen-light shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out">
              <span className="text-lg font-medium">Booking will start soon</span>
            </div>
            <p className="text-sm text-brand-earthen mt-3 max-w-md mx-auto">
              We&apos;re finalizing the pricing and booking details. Stay tuned for updates!
            </p>
          </motion.div>

          {/* Event Testimonials */}
          <EventTestimonials />

          {/* Share Modal */}
          <AnimatePresence>
            {showShareModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                onClick={() => setShowShareModal(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-2xl p-6 max-w-md w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-xl font-bold text-brand-black mb-4">Share This Event</h3>
                  <div className="space-y-3">
                    <button
                      onClick={copyToClipboard}
                      className="w-full flex items-center gap-3 p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Share2 className="w-5 h-5 text-brand-red" />
                      <span>Copy Link</span>
                    </button>
                    <button
                      onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Don't miss ${eventData.title} at Virasat Festival 2024!`)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                      className="w-full flex items-center gap-3 p-3 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                    >
                      <span className="text-blue-600">Twitter</span>
                    </button>
                    <button
                      onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                      className="w-full flex items-center gap-3 p-3 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                    >
                      <span className="text-blue-600">Facebook</span>
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      )}
    </>
  )
}
