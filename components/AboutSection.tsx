'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const AboutSection = () => {
  return (
    <section
      className="pt-4 pb-20 px-6 relative w-full"
      style={{ 
        backgroundColor: '#000',
        contain: 'layout style paint',
        isolation: 'isolate',
        zIndex: 10
      }}
    >
      {/* Fabric Texture Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://res.cloudinary.com/digilabs/image/upload/v1759174422/prod/texture/fabric_texture_dtbgi8.jpg)',
          backgroundSize: 'auto',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          opacity: 0.25,
          minWidth: '100%',
          minHeight: '100%'
        }}
      />

       {/* Top Fade Overlay */}
       <div 
         className="absolute top-0 left-0 right-0 z-2"
         style={{
           height: '200px',
           background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)'
         }}
       />

       {/* Bottom Fade Overlay */}
       <div 
         className="absolute bottom-0 left-0 right-0 z-2"
         style={{
           height: '200px',
           background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)'
         }}
       />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start mb-8">
          {/* Left Side - Text Content */}
          <div className="order-2 lg:order-1 lg:col-span-2 mt-2 lg:mt-32">
            <div className="text-white space-y-6 leading-relaxed font-league-spartan" style={{ fontFamily: 'var(--font-league-spartan)' }}>
              <p className="text-xl">
                <span className="font-semibold text-white">Virasat, Arts, Folklife and Heritage Festival</span> is a fortnight long event that has become an unparalleled success story in promoting village and classical music, dance, and crafts for urban audiences.
              </p>
              
              <p className="text-lg">
                The festival has a truly national presence with an international footprint. It brings together all possible aspects of heritage through a crafts bazaar, workshops, folkdances, music, theatre, exhibitions, talks, seminars, film-festival, literature festivals, cuisine presentations and much more.
              </p>
              
              <div className="mt-8">
                <Link 
                  href="/about" 
                  className="inline-flex items-center gap-2 font-semibold hover:underline group transition-all duration-300 hover:scale-105 font-sans"
                  style={{ color: '#E0A106' }}
                >
                  Learn More 
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  >
                    &rarr;
                  </motion.span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right Side - Images with Text */}
          <div className="order-1 lg:order-2 lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-black shadow-xl">
              {/* Heading inside the box */}
              <div className="mb-4 md:mb-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-berkshire-swash text-white mb-4 leading-tight text-left" style={{ fontFamily: 'var(--font-berkshire-swash)' }}>
                  About Virasat
                </h2>
                <div className="w-20 h-1 rounded-full bg-gradient-to-r from-red-600 to-orange-600 mb-4" />
                
               {/* Small descriptive lines */}
               <div className="text-white text-sm font-league-spartan leading-relaxed" style={{ fontFamily: 'var(--font-league-spartan)' }}>
                 <p>A fortnight long festival celebrating<br />India&apos;s rich heritage with one million<br />participants and 700+ artists.</p>
               </div>
              </div>
             {/* Desktop Layout - 2 Images with Text in Between */}
             <div className="hidden md:grid grid-cols-3 gap-4 mb-2">
               {/* Image 1 */}
               <div className="relative">
                 <div className="w-full h-72 overflow-hidden mb-3">
                   <Image 
                     src="https://res.cloudinary.com/digilabs/image/upload/v1759175054/prod/about/home/about_one_s4llpm.jpg" 
                     alt="REACH Heritage" 
                     width={350}
                     height={320}
                     className="w-full h-full object-cover"
                   />
                 </div>
               </div>
               
               {/* Text between images */}
               <div className="flex items-start justify-center pt-8">
                 <div className="text-white text-xs font-league-spartan leading-relaxed text-center space-y-20" style={{ fontFamily: 'var(--font-league-spartan)' }}>
                   <p>
                     <span className="font-semibold text-white">Festival Impact:</span> Direct support to 350 artisans, 100 culinary artistes, and 100 Uttarakhand artists through festival participation.
                   </p>
                   <p>
                     <span className="font-semibold text-white">Youth Engagement:</span> Participation of 50,000 school children and youth from various schools and training institutes.
                   </p>
                 </div>
               </div>
               
               {/* Image 2 */}
               <div className="relative -mt-24">
                 <div className="w-full h-96 overflow-hidden mb-3">
                   <Image 
                     src="https://res.cloudinary.com/digilabs/image/upload/v1759175055/prod/about/home/about_two_xqii0a.jpg" 
                     alt="Cultural Celebration" 
                     width={350}
                     height={480}
                     className="w-full h-full object-cover opacity-80"
                     style={{ objectPosition: '30% center' }}
                   />
                 </div>
               </div>
             </div>

             {/* Mobile Layout - Image Gallery with Separate Text Section */}
             <div className="md:hidden mb-3">
               {/* Image Gallery */}
               <div className="grid grid-cols-2 gap-3 mb-6">
                 <div className="w-full h-40 overflow-hidden rounded-lg">
                   <Image 
                     src="https://res.cloudinary.com/digilabs/image/upload/v1759175054/prod/about/home/about_one_s4llpm.jpg" 
                     alt="REACH Heritage" 
                     width={350}
                     height={320}
                     className="w-full h-full object-cover"
                   />
                 </div>
                 <div className="w-full h-40 overflow-hidden rounded-lg">
                   <Image 
                     src="https://res.cloudinary.com/digilabs/image/upload/v1759175055/prod/about/home/about_two_xqii0a.jpg" 
                     alt="Cultural Celebration" 
                     width={350}
                     height={480}
                     className="w-full h-full object-cover"
                     style={{ objectPosition: '30% center' }}
                   />
                 </div>
               </div>
               
               {/* Full-width bottom image */}
               <div className="w-full h-32 overflow-hidden rounded-lg">
                 <Image 
                   src="https://res.cloudinary.com/digilabs/image/upload/v1759218371/prod/about/home/about_three_e7milb.jpg" 
                   alt="Community Connection" 
                   width={500}
                   height={200}
                   className="w-full h-full object-cover"
                   style={{ objectPosition: 'center 75%' }}
                 />
               </div>
             </div>
              
               {/* Bottom Row - 1 Image (Desktop Only) */}
               <div className="hidden md:block relative">
                 <div className="w-full h-48 overflow-hidden mb-1">
                   <Image 
                     src="https://res.cloudinary.com/digilabs/image/upload/v1759218371/prod/about/home/about_three_e7milb.jpg" 
                     alt="Community Connection" 
                     width={500}
                     height={200}
                     className="w-full h-full object-cover opacity-80"
                     style={{ objectPosition: 'center 75%' }}
                   />
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
