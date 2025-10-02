"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "About Us", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "News", href: "/blogs" },
  { name: "Contact Us", href: "/contact" },
]

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const pathname = usePathname()

  // Add CSS for shine animation and blinking dot
  React.useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes zezzz {
        0%,
        10% {
          background-position: -200px;
        }
        20% {
          background-position: top left;
        }
        100% {
          background-position: 200px;
        }
      }
      @keyframes blink {
        0%, 40% {
          opacity: 1;
        }
        50%, 90% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    `
    document.head.appendChild(style)
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  useEffect(() => {
    // Listen for custom events to hide/show header
    let hideTimeout: NodeJS.Timeout
    let showTimeout: NodeJS.Timeout

    const handleHideHeader = () => {
      clearTimeout(showTimeout)
      hideTimeout = setTimeout(() => setIsHeaderVisible(false), 100)
    }

    const handleShowHeader = () => {
      clearTimeout(hideTimeout)
      showTimeout = setTimeout(() => setIsHeaderVisible(true), 100)
    }

    window.addEventListener("hideHeader", handleHideHeader)
    window.addEventListener("showHeader", handleShowHeader)

    return () => {
      clearTimeout(hideTimeout)
      clearTimeout(showTimeout)
      window.removeEventListener("hideHeader", handleHideHeader)
      window.removeEventListener("showHeader", handleShowHeader)
    }
  }, [])

  // Reset header visibility when pathname changes
  useEffect(() => {
    setIsHeaderVisible(true)
  }, [pathname])

  return (
    <motion.header
      className="fixed top-2 left-4 right-4 md:top-4 md:left-12 md:right-12 z-[100] bg-black/10 backdrop-blur-xl shadow-2xl border border-white/10 rounded-2xl"
      style={{
        background: 'linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 100%)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      }}
      initial={{ y: 0 }}
      animate={{ y: isHeaderVisible ? 0 : -100 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "tween",
      }}
    >
      <div className="container mx-auto px-3 py-1 md:px-6 md:py-2 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 md:space-x-4">
          <Image src="https://res.cloudinary.com/digilabs/image/upload/f_auto,q_95,w_160,c_limit/v1759346302/prod/hero/prod/hero/reach_pab9vf.png" alt="REACH Logo" width={80} height={50} className="h-8 md:h-12 w-auto" />
          <Image src="https://res.cloudinary.com/digilabs/image/upload/f_auto,q_95,w_160,c_limit/v1759346303/prod/hero/prod/hero/vir_z2ln92.png" alt="VIR Logo" width={80} height={50} className="h-8 md:h-12 w-auto" priority />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = item.name === "Events" ? pathname.startsWith("/events") : pathname === item.href
            const isEvents = item.name === "Events"
            
            if (isEvents) {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative font-sans font-semibold transition-all duration-400 group flex items-center ${
                    isActive ? (isEvents ? "text-yellow-400" : "text-brand-red") : "text-brand-white hover:text-brand-white"
                  }`}
                  style={{
                    transitionTimingFunction: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
                    transitionDuration: '400ms',
                    transitionProperty: 'color',
                    cursor: 'pointer'
                  }}
                >
                  {/* Blinking golden dot */}
                  <div 
                    className="w-2 h-2 rounded-full mr-2"
                    style={{
                      backgroundColor: '#ffd700',
                      animation: 'blink 2s infinite',
                      boxShadow: '0 0 6px rgba(255, 215, 0, 0.6)'
                    }}
                  />
                  <span 
                    className="relative"
                    style={{
                      cursor: 'pointer',
                      ...(isActive ? {} : {
                        color: 'transparent',
                        background: '#ffffff -webkit-gradient(linear, left top, right top, from(#ffffff), to(#ffffff), color-stop(0.5, #ffd700)) 0 0 no-repeat',
                        backgroundImage: '-webkit-linear-gradient(-40deg, transparent 0%, transparent 30%, #ffd700 40%, #ffd700 60%, transparent 70%, transparent 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitBackgroundSize: '50px',
                        WebkitAnimation: 'zezzz 4s infinite',
                        WebkitTextSizeAdjust: 'none'
                      })
                    }}
                  >
                    {item.name}
                    {!isActive && (
                      <span 
                        className="absolute bottom-[-2px] left-0 w-0 h-0.5 transition-all duration-400 group-hover:w-full"
                        style={{
                          backgroundColor: '#ffd700',
                          transitionTimingFunction: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
                          transitionDuration: '400ms',
                          transitionProperty: 'width'
                        }}
                      />
                    )}
                  </span>
                </Link>
              )
            }
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative font-sans font-semibold transition-all duration-400 group ${
                  isActive ? "text-yellow-400" : "text-white hover:text-yellow-400"
                }`}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
                  transitionDuration: '400ms',
                  transitionProperty: 'color',
                  cursor: 'pointer'
                }}
              >
                {item.name}
                {!isActive && (
                  <span 
                    className="absolute bottom-[-2px] left-1/2 w-0 h-0.5 bg-yellow-400 transition-all duration-400 group-hover:w-full group-hover:left-0"
                    style={{
                      transitionTimingFunction: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
                      transitionDuration: '400ms',
                      transitionProperty: 'width, left'
                    }}
                  />
                )}
              </Link>
            )
          })}
          <Link href="/donate" passHref>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-donate"
              aria-label="Donate to support Virasat Festival"
            >
            </motion.button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center justify-center h-full">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="text-brand-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 flex items-center justify-center mt-1"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.nav
        id="mobile-navigation"
        initial={false}
        animate={{
          height: isMenuOpen ? "auto" : 0,
          opacity: isMenuOpen ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="md:hidden overflow-hidden bg-black/15 backdrop-blur-xl border border-white/10 rounded-2xl mt-2"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        }}
        aria-label="Mobile navigation menu"
      >
        <motion.div
          initial={false}
          animate={{
            y: isMenuOpen ? 0 : -20,
          }}
          transition={{
            duration: 0.3,
            delay: isMenuOpen ? 0.1 : 0,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="px-3 pb-4 md:px-6 md:pb-6"
        >
          <ul className="flex flex-col space-y-0">
            {navItems.map((item, index) => {
              const isActive = item.name === "Events" ? pathname.startsWith("/events") : pathname === item.href
              const isEvents = item.name === "Events"
              
              return (
                <motion.li
                  key={item.name}
                  initial={false}
                  animate={{
                    opacity: isMenuOpen ? 1 : 0,
                    x: isMenuOpen ? 0 : -20,
                  }}
                  transition={{
                    duration: 0.2,
                    delay: isMenuOpen ? 0.15 + index * 0.05 : 0,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                     className={`relative py-3 md:py-4 text-base md:text-lg font-sans font-semibold transition-all duration-400 text-center group flex items-center justify-center ${
                       isActive ? "text-yellow-400" : "text-white hover:text-yellow-400"
                     }`}
                    style={{
                      transitionTimingFunction: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
                      transitionDuration: '400ms',
                      transitionProperty: 'color'
                    }}
                  >
                    {/* Blinking golden dot for mobile */}
                    {isEvents && (
                      <div 
                        className="w-2 h-2 rounded-full mr-2"
                        style={{
                          backgroundColor: '#ffd700',
                          animation: 'blink 2s infinite',
                          boxShadow: '0 0 6px rgba(255, 215, 0, 0.6)'
                        }}
                      />
                    )}
                    <span 
                      className="relative"
                      style={{
                        ...(isEvents && !isActive ? {
                          color: 'transparent',
                          background: '#ffffff -webkit-gradient(linear, left top, right top, from(#ffffff), to(#ffffff), color-stop(0.5, #ffd700)) 0 0 no-repeat',
                          backgroundImage: '-webkit-linear-gradient(-40deg, transparent 0%, transparent 30%, #ffd700 40%, #ffd700 60%, transparent 70%, transparent 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitBackgroundSize: '50px',
                          WebkitAnimation: 'zezzz 4s infinite',
                          WebkitTextSizeAdjust: 'none'
                        } : {})
                      }}
                    >
                      {item.name}
                      {!isActive && (
                        <span 
                          className="absolute bottom-[-2px] left-0 w-0 h-0.5 transition-all duration-400 group-hover:w-full"
                          style={{
                            backgroundColor: '#fbbf24',
                            transitionTimingFunction: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
                            transitionDuration: '400ms',
                            transitionProperty: 'width'
                          }}
                        />
                      )}
                    </span>
                  </Link>
                  {/* Faded line separator */}
                  {index < navItems.length - 1 && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-brand-white/20 to-transparent"></div>
                  )}
                </motion.li>
              )
            })}
            {/* Separator before donate button */}
            <motion.div
              initial={false}
              animate={{
                opacity: isMenuOpen ? 1 : 0,
              }}
              transition={{
                duration: 0.2,
                delay: isMenuOpen ? 0.15 + navItems.length * 0.05 : 0,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="w-3/4 h-px bg-gradient-to-r from-transparent via-brand-white/20 to-transparent mx-auto my-4"
            ></motion.div>
            <motion.li
              initial={false}
              animate={{
                opacity: isMenuOpen ? 1 : 0,
                x: isMenuOpen ? 0 : -20,
              }}
              transition={{
                duration: 0.2,
                delay: isMenuOpen ? 0.15 + navItems.length * 0.05 + 0.05 : 0,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="flex justify-center"
            >
              <Link href="/donate" passHref>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-donate mt-2"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Donate to support Virasat Festival"
                >
                </motion.button>
              </Link>
            </motion.li>
          </ul>
        </motion.div>
      </motion.nav>
    </motion.header>
  )
}

export default Header
