'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star, Users, Crown, Sparkles, Filter, ChevronDown } from 'lucide-react';

// Helper function to generate Cloudinary URLs
const getCloudinaryImageUrl = (folder: string, publicId: string, width: number = 100) => {
  return `https://res.cloudinary.com/digilabs/image/upload/f_auto,q_80,w_${width},c_limit/prod/about/${folder}/prod/about/${folder}/${publicId}`;
};

// Team data organized by categories
const teamCategories: Record<string, {
  title: string;
  icon: React.ReactElement;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  members: Array<{
    name: string;
    role: string;
    image: string;
    folder: string;
    bio: string;
    years?: string;
    contribution?: string;
    department?: string;
    experience?: string;
  }>;
}> = {
  'in-loving-memory': {
    title: 'In Loving Memory',
    icon: <Heart className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-800',
    members: [
      {
        name: 'Shri. Rajendra Prasad Joshi',
        role: 'Founder Chairman',
        image: 'Shri._Rajendra_Prasad_Joshi',
        folder: 'loving-memory',
        bio: 'The visionary who founded REACH in 1995, dedicating his life to preserving India&apos;s cultural heritage and empowering rural artists.',
        years: '1995-2020',
        contribution: 'Founded REACH and established the foundation for Virasat festival'
      },
      {
        name: 'Shri Ajai Shankar, IAS (retd.)',
        role: 'Vice Chairman',
        image: 'Shri_Ajai_Shankar,_IAS_(retd.)',
        folder: 'loving-memory',
        bio: 'Renowned scholar who documented over 200 endangered art forms and mentored countless artists across India.',
        years: '1998-2019',
        contribution: 'Documented and preserved traditional art forms'
      },
      {
        name: 'Shri Bameshwar Prasad Narayan Sinha',
        role: 'Founding Member',
        image: 'Shri_Bameshwar_Prasad_Narayan_Sinha',
        folder: 'loving-memory',
        bio: 'Legendary craftsman who trained over 500 artisans and revived the dying art of traditional wood carving.',
        years: '1996-2018',
        contribution: 'Revived traditional wood carving techniques'
      },
      {
        name: 'Shri Surjit Kishore Das',
        role: 'Vice Chairman',
        image: 'Shri_Surjit_Kishore_Das',
        folder: 'loving-memory',
        bio: 'Pioneer in cultural education who developed the first curriculum for traditional arts in modern schools.',
        years: '2000-2021',
        contribution: 'Developed cultural education programs'
      },
      {
        name: 'Col. Subhash Khullar',
        role: 'Founding President of REACH Talkies',
        image: 'Col._Subhash_Khullar',
        folder: 'loving-memory',
        bio: 'Master of Hindustani classical music who performed at the first Virasat and inspired generations of musicians.',
        years: '1995-2017',
        contribution: 'Established classical music traditions at Virasat'
      },
      {
        name: 'Shri Sanjeev Singh (IPS)',
        role: 'Founding Member',
        image: 'Shri_Sanjeev_Singh_(IPS)',
        folder: 'loving-memory',
        bio: 'Guardian of folk arts who traveled across India to preserve and promote traditional dance forms.',
        years: '1997-2019',
        contribution: 'Preserved and promoted folk dance forms'
      },
      {
        name: 'Ms. Rajshree Joshi',
        role: 'Founding Member',
        image: 'Ms._Rajshree_Joshi',
        folder: 'loving-memory',
        bio: 'Community leader who built bridges between rural artists and urban audiences, creating lasting partnerships.',
        years: '1996-2020',
        contribution: 'Built community partnerships and networks'
      }
    ]
  },
  'patrons': {
    title: 'Patrons',
    icon: <Crown className="w-6 h-6" />,
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-50',
    borderColor: 'border-yellow-200',
    textColor: 'text-yellow-800',
    members: [
      {
        name: 'Shri Raja Randhir Singh',
        role: 'Patron',
        image: 'Shri_Raja_Randhir_Singh',
        folder: 'patrons',
        bio: 'Former shooting champion and influential sports administrator from the royal family of Patiala. Asian Games gold medalist and Arjuna Awardee who has held key leadership roles in Indian and Asian sports for decades.',
        years: '2005-Present',
        contribution: 'Strategic guidance and major funding support'
      },
      {
        name: 'Shri Johri Lal',
        role: 'Patron',
        image: 'Shri_Johri_Lal',
        folder: 'patrons',
        bio: 'He was among ONGC&apos;s longest-serving Directors (HR), instrumental in establishing Virasat as a flagship CSR initiative. A deeply spiritual man and dedicated social activist, he tirelessly championed the cause of the weaker sections of society.',
        years: '2010-Present',
        contribution: 'Support for rural artist development programs'
      },
      {
        name: 'Dr. A.K. Balyan',
        role: 'Patron',
        image: 'Dr_A.K_Balyan',
        folder: 'patrons',
        bio: 'A world-class geochemist and CNG expert trained in Germany, he served as Director (HR) of ONGC and later as MD of Petronet LNG Ltd.',
        years: '2008-Present',
        contribution: 'Technology integration and digital initiatives'
      },
      {
        name: 'Dr. Alka Mittal',
        role: 'Patron',
        image: 'Dr_Alka_Mittal',
        folder: 'patrons',
        bio: 'Former Director HR and then CMD of ONGC, Dr. Mittal was instrumental in providing stability and guidance to REACH.',
        years: '2008-Present',
        contribution: 'Women&apos;s empowerment through cultural arts'
      }
    ]
  },
  'current-team': {
    title: 'The Virasat Team',
    icon: <Users className="w-6 h-6" />,
    color: 'from-green-500 to-teal-500',
    bgColor: 'bg-gradient-to-br from-green-50 to-teal-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-800',
    members: [
      {
        name: 'Shri Vijay Ranchan',
        role: 'Board of Trustees (Chairman)',
        image: 'Shri_Vijay_Ranchan',
        folder: 'the-virasat-team',
        bio: '1967 IAS officer (Gujarat cadre, rtd.) who has chaired REACH since 2008. Passionate advocate of art and culture, author of several books including Bollywood the Rashtrawad and Bollywood Aur Ramkatha.'
      },
      {
        name: 'Shri Rajeev Kumar Singh',
        role: 'Board of Trustees & Executive Committee & Virasat Organising Committee (General Secretary)',
        image: 'Shri_Rajeev_Kumar_Singh',
        folder: 'the-virasat-team',
        bio: 'Distinguished career at ONGC, retired as Executive Director, Human Resource. Has been serving REACH as General Secretary since 1995, bringing extensive organizational experience.'
      },
      {
        name: 'Dr. Lokesh Ohri',
        role: 'Board of Trustees & Executive Committee & Virasat Organising Committee (Treasurer)',
        image: 'Dr._Lokesh_Ohri',
        folder: 'the-virasat-team',
        bio: 'Anthropologist, historian, writer, and cultural activist from Dehradun. Founder of Been There Doon That (BTDT), promoting awareness through walks and supporting village-based slow tourism. Associated with REACH since 1995, serving as Treasurer.'
      },
      {
        name: 'Prof. Data Ram Purohit',
        role: 'Board of Trustees (Trustee)',
        image: 'Prof._Data_Ram_Purohit',
        folder: 'the-virasat-team',
        bio: 'Professor of English and former Director of Folk Culture and Performance Centre at HNB Garhwal Central University. Sangeet Natak Akademi Award recipient (2019) for preserving Uttarakhand&apos;s folk music and theatre traditions.'
      },
      {
        name: 'Shri Devendra Narayan Singh',
        role: 'Board of Trustees (Trustee)',
        image: 'Shri_Devendra_Narayan_Singh',
        folder: 'the-virasat-team',
        bio: 'Ace senior geo scientist with ONGC. Acknowledged actor, theatre director and script writer. Has been associated with REACH from early times, bringing unique blend of scientific and artistic expertise.'
      },
      {
        name: 'Shri Harish Awal',
        role: 'Board of Trustees (Trustee)',
        image: 'Shri_Harish_Awal',
        folder: 'the-virasat-team',
        bio: 'Electronic engineer from Thapar Institute of Technology. Actor, orator, painter and corporate communication expert who retired as Executive Director from ONGC. Looks after all digital representation of REACH and Virasat across platforms.'
      },
      {
        name: 'Shri Shankar Kumar Jha',
        role: 'Board of Trustees (Trustee)',
        image: 'Shri_Shankar_Kumar_Jha',
        folder: 'the-virasat-team',
        bio: 'Geo physicist with ONGC trained at IIT Delhi. Deep interest in Indian classical music and Hindi-Urdu poetry. Guest speaker at ITC and Sangeet Research Academy. Responsible for artist selection at Virasat.'
      },
      {
        name: 'Dr. Shambhu Shekhar Singh',
        role: 'Board of Trustees (Trustee)',
        image: 'Dr._Shambhu_Shekhar_Singh',
        folder: 'the-virasat-team',
        bio: 'JNU trained scholar of economics with long teaching association in Delhi University. Deep love for music, painting, crafts and Indian folk forms. The conscience keeper of REACH.'
      },
      {
        name: 'Shri Hemant Arora',
        role: 'Board of Trustees (Trustee)',
        image: 'Shri_Hemant_Arora',
        folder: 'the-virasat-team',
        bio: 'Renowned Chartered Accountant of India and Rotarian, social worker and philanthropist. Acts as the financial and legal advisor for REACH, ensuring organizational compliance and fiscal responsibility.'
      },
      {
        name: 'Ms. Vijayshri Joshi',
        role: 'Executive Committee & Virasat Organising Committee (Joint Secretary)',
        image: 'Ms._Vijayshri_Joshi',
        folder: 'the-virasat-team',
        bio: 'Represents a generation of youth that has grown in the management of arts and large festivals. Advises the state Government on matters of art and culture, bringing fresh perspective and expertise.'
      },
      {
        name: 'Shri Sunil Verma',
        role: 'Executive Committee & Virasat Organising Committee (Director- Art & Crafts)',
        image: 'Shri_Sunil_Verma',
        folder: 'the-virasat-team',
        bio: 'Over 30+ years experience as Editor/Director in Film & Television. Associated with Theatre since age 9, working for revitalizing arts, craft, culture & heritage of India. Director/Editor of TV series like Chandrakanta, Hum Saath Saath Hain.'
      },
      {
        name: 'Ms. Sunaina Prakash Agarwal',
        role: 'Virasat Organising Committee (VP)',
        image: 'Ms._Sunaina_Prakash_Agarwal',
        folder: 'the-virasat-team',
        bio: 'Distinguished Supreme Court advocate and crucial wheel in organising Virasat every year. Senior member of Supreme Court Bar Association and Bar Council of UP. Chairperson of Legal Advisory Committee of Indian Olympic Association, representing India at Paris 2024.'
      },
      {
        name: 'Shri Kunal Rai',
        role: 'Virasat Organising Committee (Member)',
        image: 'Shri_Kunal_Rai',
        folder: 'the-virasat-team',
        bio: 'Associated with REACH and Virasat since 2004, commencing as a volunteer. Over 15 years expertise in waste management and environmental matters. Currently CEO of a Waste Management Startup and active contributor to REACH.'
      },
      {
        name: 'Shri Ashutosh Shandilya',
        role: 'Virasat Organising Committee (Member)',
        image: 'Shri_Ashutosh_Shandilya',
        folder: 'the-virasat-team',
        bio: 'General Manager, Geology with ONGC. Associated with REACH since 2017. REACH&apos;s representative at the ONGC Committee for VIRASAT, facilitating corporate partnership and support.'
      },
      {
        name: 'Shri Ghanshyam Rai',
        role: 'Virasat Organising Committee (Member)',
        image: 'Shri_Ghanshyam_Rai',
        folder: 'the-virasat-team',
        bio: 'Very dedicated and committed member of REACH who adds value to important activities including Saadhna, car and bike rally, contributing significantly to festival organization and community engagement.'
      },
      {
        name: 'Shri Pradeep Kumar Maithel',
        role: 'Virasat Organising Committee (Member)',
        image: 'Shri_Pradeep_Kumar_Maithel',
        folder: 'the-virasat-team',
        bio: 'Served in ONGC for over 37 years, retired as Deputy General Manager, Construction and Maintenance. Actively involved with REACH since September 2023. Responsible for formulating contracts and their management, in charge of operations.'
      },
      {
        name: 'Shri Ashish Dua',
        role: 'Virasat Organising Committee (Member)',
        image: 'Shri_Ashish_Dua',
        folder: 'the-virasat-team',
        bio: 'Mechanical Engineer from Delhi College of Engineering with Post Graduate in Garment Manufacturing Technology from NIFT, New Delhi, and LL.B. from Dr. Ambedkar Law University, Rajasthan. Pursued advanced programs at FIT, New York, and University of Cambridge, UK.'
      },
      {
        name: 'Shri Tripurari Sharan',
        role: 'Advisor',
        image: 'Shri_Tripurari_Sharan',
        folder: 'the-virasat-team',
        bio: '1985 batch Bihar Cadre IAS Officer, former Chief Secretary of Bihar and current State Chief Information Commissioner (CIC). Distinguished filmmaker celebrated for distinctive storytelling and profound cultural insights, with acclaimed work in cinema and television.'
      },
      {
        name: 'Shri Surendra Kumar Bhagat',
        role: 'Advisor',
        image: 'Shri_Surendra_Kumar_Bhagat',
        folder: 'the-virasat-team',
        bio: '1982 batch IPS Officer of Uttarakhand Cadre, former Director General, Railway Protection Force. Resident of Noida, helps REACH on policy and strategic matters, bringing extensive administrative and security expertise.'
      },
      {
        name: 'Shri Ashok Kumar',
        role: 'Advisor',
        image: 'Shri_Ashok_Kumar',
        folder: 'the-virasat-team',
        bio: 'Retired 1989 batch Indian Police Service officer of Uttarakhand cadre, served as 11th Director General of Uttarakhand Police. Appointed as Vice-Chancellor of Sports University of Haryana on 28 February 2024, bringing leadership and administrative expertise.'
      },
      {
        name: 'Dr. Alaknanda Ashok',
        role: 'Advisor',
        image: 'Dr._Alaknanda_Ashok',
        folder: 'the-virasat-team',
        bio: 'Dean at College of Technology, GB Pant University of Agriculture & Technology (GBPUAT). Previously served as Director of Women&apos;s Institute of Technology (WIT), Dehradun, bringing extensive academic leadership and educational expertise.'
      },
      {
        name: 'Shri Manohar Bothra',
        role: 'Advisor',
        image: 'Shri_Manohar_Bothra_Senior_Journalist_Bhopal',
        folder: 'the-virasat-team',
        bio: 'Senior journalist and long associate of REACH, bringing media expertise and strategic communication insights to support the organization&apos;s mission and outreach efforts.'
      },
      {
        name: 'Shri Rajesh Badal',
        role: 'Advisor',
        image: 'Shri_Rajesh_Badal',
        folder: 'the-virasat-team',
        bio: 'Illustrious career in journalism (radio, print, electronic and digital) spanning 42 years, produced more than 100 documentaries. Pioneer in TV biopics, served as Editor at Aaj Tak, Managing Editor at Voice of India, and Founder Executive Director of Rajya Sabha TV for eight years.'
      },
      {
        name: 'Shri Ashok Bajpai',
        role: 'Advisor',
        image: 'Shri_Ashok_Bajpai',
        folder: 'the-virasat-team',
        bio: 'Life Trustee, Raza Foundation, Hindi poet-critic, translator, editor and culture-activist. Major cultural figure with 14 books of poetry, 10 of criticism and 4 books on art. Sahitya Akademi Award recipient, widely recognised as outstanding promoter of culture and innovative institution-builder.'
      },
      {
        name: 'Dr. Madhuri Barthwal',
        role: 'Advisor',
        image: 'Dr._Madhuri_Barthwal',
        folder: 'the-virasat-team',
        bio: 'Folk singer of Uttarakhand, first woman music composer in All India Radio and first female musician from Uttarakhand to become a music teacher. Awarded Nari Shakti Puraskar (2019) and Padma Shri (2022), India&apos;s fourth highest civilian award in the field of art.'
      },
      {
        name: 'Shri Mithilesh Kumar Jha',
        role: 'Advisor',
        image: 'Shri_Mithilesh_Kumar_Jha',
        folder: 'the-virasat-team',
        bio: '1986 batch IPS officer of Tamil Nadu cadre who has been associated with REACH. Previously served REACH in the capacity of a Trustee, bringing administrative expertise and long-standing commitment to the organization&apos;s mission.'
      },
      {
        name: 'Shri Rajat Mishra',
        role: 'Advisor',
        image: 'Shri_Rajat_Mishra',
        folder: 'the-virasat-team',
        bio: 'Seasoned business executive with strong track record of revitalising businesses and launching successful ventures across Indian and European markets. CEO, EFKON India Ltd. Distinguished alumnus of IIT Delhi (B. Tech. Electrical Engineering, 1989 batch).'
      },
      {
        name: 'Dr. Shekhar Pathak',
        role: 'Advisor',
        image: 'Dr._Shekhar_Pathak',
        folder: 'the-virasat-team',
        bio: 'Historian, editor, publisher, activist, and traveller from Uttarakhand. Known for extensive knowledge of colonial and postcolonial social movements, contemporary environmental and social issues in Uttarakhand, and colonial exploration in the Himalayas and Tibet.'
      },
      {
        name: 'Shri Anup Sinha',
        role: 'Advisor',
        image: 'Shri_Anup_Sinha',
        folder: 'the-virasat-team',
        bio: 'Professor of communication at School of Communication in Levin College of Public Affairs and Education, Cleveland State University, USA. Scholar of political communication, sociology of news, media law and ethics. Author of The Making of a Small State: Populist Social Mobilisation and the Hindi Press in the Uttarakhand Movement.'
      },
      {
        name: 'Mrs. Shobhna Khullar',
        role: 'Virasat Organising Committee (Member) President - REACH Talkies',
        image: 'Mrs._Shobhna_Khullar',
        folder: 'the-virasat-team',
        bio: 'Standard bearer of REACH Talkies as its President. Educated from Chandigarh (Punjab University), actively involved in sectors of tourism, marketing and culture. An avid traveller bringing diverse experience and cultural insights to the organization.'
      },
      {
        name: 'Shri Avinash Saxena',
        role: 'Secretary - REACH Talkies',
        image: 'Shri_Avinash_Saxena',
        folder: 'the-virasat-team',
        bio: 'Industrialist of repute and backbone of REACH Talkies, looking after day-to-day operations. Has deep interest in world cinema, bringing passion for film and cultural arts to support the organization&apos;s mission.'
      }
    ]
  }
};

const AboutPage = () => {
  const [activeCategory, setActiveCategory] = useState('in-loving-memory');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [scrollContainerRef, setScrollContainerRef] = useState<HTMLDivElement | null>(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll position for mobile
  const handleScroll = () => {
    if (!isMobile || !scrollContainerRef) return;
    
    const scrollLeft = scrollContainerRef.scrollLeft;
    const cardWidth = 304; // w-72 + gap = 288 + 16 = 304px
    const currentCardIndex = Math.round(scrollLeft / cardWidth);
    setCurrentCard(Math.min(Math.max(currentCardIndex, 0), teamCategories[activeCategory].members.length - 1));
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const slideInLeft = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, delay: 0.2 },
  };

  const slideInRight = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, delay: 0.4 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const memberVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <>
      <style jsx>{`
        /* From Uiverse.io by cssbuttons-io - Adapted for Virasat brand colors */ 
        .donate-btn {
          --color: #d4af37; /* golden yellow */
          font-family: inherit;
          display: inline-block;
          width: auto;
          min-width: 8em;
          height: 2.6em;
          line-height: 2.5em;
          margin: 20px;
          position: relative;
          cursor: pointer;
          overflow: hidden;
          border: 2px solid var(--color);
          transition: color 0.5s;
          z-index: 1;
          font-size: 17px;
          border-radius: 6px;
          font-weight: 500;
          color: var(--color);
          padding: 0 2em;
          background: transparent;
        }

        .donate-btn:before {
          content: "";
          position: absolute;
          z-index: -1;
          background: var(--color);
          height: 300px;
          width: 300px;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0);
          transition: transform 0.7s ease;
        }

        .donate-btn:hover {
          color: #fff;
        }

        .donate-btn:hover:before {
          transform: translate(-50%, -50%) scale(1);
        }

        .donate-btn:active:before {
          background: #b8941f; /* darker golden yellow */
          transition: background 0s;
        }
      `}</style>
      <div className="text-brand-black pt-28" style={{ backgroundColor: '#FFF7F5F4' }}>
      {/* Hero Section */}
      <motion.section
        className="py-8 px-6 container mx-auto"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <div className="text-center max-w-4xl mx-auto mb-8">
          <motion.h1 
            className="text-4xl md:text-5xl font-serif text-brand-brown mb-4 leading-tight"
            variants={fadeIn}
          >
            About Virasat by REACH
          </motion.h1>
          <motion.div 
            className="w-20 h-1 bg-gradient-to-r from-brand-red to-brand-brown mx-auto rounded-full"
            variants={fadeIn}
          ></motion.div>
        </div>
      </motion.section>

      {/* Main Content Section */}
      <motion.section
        className="py-8 px-6 container mx-auto relative"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {/* Decorative Rangoli Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Left Rangoli */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            whileInView={{ opacity: 0.6, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56"
          >
            <Image 
              src="/images/rangoli-about.png" 
              alt="Decorative Rangoli" 
              width={224}
              height={224}
              className="w-full h-full object-contain filter drop-shadow-lg"
              style={{ opacity: 0.8 }}
              onError={(e) => {
                console.log('Rangoli image failed to load:', e);
                e.currentTarget.style.display = 'none';
              }}
              onLoad={() => console.log('Rangoli image loaded successfully')}
            />
          </motion.div>
          
          {/* Top Right Rangoli */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            whileInView={{ opacity: 0.5, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56"
          >
            <Image 
              src="/images/rangoli-about2.png" 
              alt="Decorative Rangoli" 
              width={224}
              height={224}
              className="w-full h-full object-contain filter drop-shadow-lg scale-x-[-1]"
              style={{ opacity: 0.4 }}
              onError={(e) => {
                console.log('Rangoli image failed to load:', e);
                e.currentTarget.style.display = 'none';
              }}
              onLoad={() => console.log('Rangoli image loaded successfully')}
            />
          </motion.div>
          
          {/* Bottom Center Rangoli */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            whileInView={{ opacity: 0.4, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.7, ease: "easeOut" }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64"
          >
            <Image 
              src="/images/rangoli-about3.png" 
              alt="Decorative Rangoli" 
              width={256}
              height={256}
              className="w-full h-full object-contain filter drop-shadow-lg"
              style={{ opacity: 0.35 }}
              onError={(e) => {
                console.log('Rangoli image failed to load:', e);
                e.currentTarget.style.display = 'none';
              }}
              onLoad={() => console.log('Rangoli image loaded successfully')}
            />
          </motion.div>
          
          {/* Side decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 1 }}
            className="absolute inset-0"
          >
            {/* Left side decorative pattern */}
            <motion.div
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-16 h-16 md:w-20 md:h-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Image 
                src="/images/rangoli.svg" 
                alt="Decorative Rangoli" 
                width={80}
                height={80}
                className="w-full h-full object-contain"
                style={{ opacity: 0.2 }}
              />
            </motion.div>
            
            {/* Right side decorative pattern */}
            <motion.div
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-16 h-16 md:w-20 md:h-20"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              <Image 
                src="/images/rangoli.svg" 
                alt="Decorative Rangoli" 
                width={80}
                height={80}
                className="w-full h-full object-contain"
                style={{ opacity: 0.2 }}
              />
            </motion.div>
            
            {/* Floating decorative dots */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-brand-red rounded-full"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Image and Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Image Section - Left Column */}
            <motion.div 
              className="lg:col-span-4 flex justify-center lg:justify-start"
              variants={slideInLeft}
            >
              <div className="relative group">
                {/* Decorative background elements */}
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-brand-red/20 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-brand-brown/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-1/2 -left-8 w-6 h-6 bg-brand-red/25 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                
                {/* Main image container */}
                <div className="relative">
                  {/* Rotated background shadow */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-brand-red/10 to-brand-brown/10 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
                  
                  {/* Image frame */}
                  <div className="relative bg-white p-4 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/REACH (2).png"
                      alt="REACH - Rural Entrepreneurship for Art & Cultural Heritage"
                      width={280}
                      height={210}
                      className="rounded-lg group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Overlay gradient for depth */}
                    <div className="absolute inset-4 bg-gradient-to-t from-black/5 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                </div>
                
                {/* Subtle border glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-red/5 via-transparent to-brand-brown/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>

            {/* Text Content - Right Column */}
            <motion.div 
              className="lg:col-span-8"
              variants={slideInRight}
            >
              <div className="space-y-6">
                
                {/* First Paragraph */}
                <motion.div 
                  className="bg-gradient-to-r from-brand-red/5 to-transparent p-4 rounded-xl border-l-4 border-brand-red"
                  variants={slideInRight}
                >
                  <p className="text-base md:text-lg font-sans text-brand-earthen leading-relaxed">
                    Born in 1995 in Dehradun, <span className="font-semibold text-brand-brown">REACH (Rural Entrepreneurship for Art & Cultural Heritage)</span> emerged to safeguard India&apos;s fading traditions at a time when modernization threatened to overshadow them. Its mission has been clear: preserve heritage, empower rural artists, and create sustainable cultural entrepreneurship.
                  </p>
                </motion.div>

                {/* Second Paragraph */}
                <motion.div 
                  className="bg-gradient-to-l from-brand-brown/5 to-transparent p-4 rounded-xl border-r-4 border-brand-brown"
                  variants={slideInRight}
                >
                  <p className="text-base md:text-lg font-sans text-brand-earthen leading-relaxed">
                    From this vision came <span className="font-semibold text-brand-red">Virāsat</span>, a festival that began as a small campus initiative and has grown into <span className="font-semibold text-brand-brown">Afro-Asia&apos;s largest celebration of art and culture</span>. Spanning fifteen days, it transforms Dehradun into a living museum where classical ragas blend with folk dances, handmade crafts find new admirers, and theatre, literature, and traditional cuisines bring communities together.
                  </p>
                </motion.div>

                {/* Third Paragraph with Impact */}
                <motion.div 
                  className="bg-gradient-to-br from-brand-red/8 via-brand-brown/5 to-brand-red/8 p-4 rounded-xl border border-brand-brown/20 relative overflow-hidden"
                  variants={slideInRight}
                >
                  {/* Decorative background elements - positioned outside text area */}
                  <div className="absolute -top-2 -right-2 w-12 h-12 border-2 border-brand-red/10 rounded-full"></div>
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 border-2 border-brand-brown/10 rounded-full"></div>
                  
                  <p className="text-base md:text-lg font-sans text-brand-earthen leading-relaxed relative z-10">
                    Today, Virāsat is more than a festival — it is a <span className="font-semibold text-brand-red">movement of revival and pride</span>. Each year it welcomes over a million visitors, features more than four hundred performing artists and three hundred artisans from across India, and engages fifty thousand students from schools and colleges. With a media reach valued at over <span className="font-semibold text-brand-brown">₹22 crore</span>, it not only revives endangered art forms but also creates livelihoods, connects grassroots creators with global audiences, and fosters cultural pride among the youth. With nearly three decades of impact, Virāsat continues to shape the cultural economy while keeping India&apos;s living heritage alive, relevant, and celebrated.
                  </p>
                </motion.div>

              </div>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        className="py-16 px-6 container mx-auto relative"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {/* Decorative Rangoli Background Elements for Team Section */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Left Rangoli */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
            whileInView={{ opacity: 0.3, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="absolute top-0 left-0 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"
          >
            <Image 
              src="/images/rangoli.svg" 
              alt="Decorative Rangoli" 
              width={160}
              height={160}
              className="w-full h-full object-contain filter drop-shadow-lg"
              style={{ opacity: 0.4 }}
            />
          </motion.div>
          
          {/* Top Right Rangoli */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 15 }}
            whileInView={{ opacity: 0.25, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"
          >
            <Image 
              src="/images/rangoli.svg" 
              alt="Decorative Rangoli" 
              width={160}
              height={160}
              className="w-full h-full object-contain filter drop-shadow-lg scale-x-[-1]"
              style={{ opacity: 0.3 }}
            />
          </motion.div>
          
          {/* Bottom Center Rangoli */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            whileInView={{ opacity: 0.2, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
          >
            <Image 
              src="/images/rangoli.svg" 
              alt="Decorative Rangoli" 
              width={192}
              height={192}
              className="w-full h-full object-contain filter drop-shadow-lg"
              style={{ opacity: 0.25 }}
            />
          </motion.div>
        </div>

        {/* Team Header */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-16 relative z-10"
          variants={fadeIn}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-brand-brown mb-6 leading-tight">
            Meet Our Team
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-red to-brand-brown mx-auto rounded-full mb-8"></div>
          <p className="text-lg md:text-xl text-brand-earthen leading-relaxed mb-8">
            The passionate individuals behind REACH and Virasat, dedicated to preserving and celebrating India&apos;s cultural heritage.
          </p>

          {/* Category Filter */}
          <div className="relative">
            <motion.div 
              className="grid grid-cols-2 gap-4 mb-8 max-w-md mx-auto md:flex md:flex-wrap md:justify-center md:max-w-none"
              initial="hidden"
              animate="visible"
              variants={categoryVariants}
            >
              {Object.entries(teamCategories).map(([key, category], index) => (
                <motion.button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`relative px-4 ${index === 2 ? 'py-3 md:py-3' : 'py-2 md:py-3'} rounded-full font-semibold transition-all duration-300 overflow-hidden ${
                    activeCategory === key
                      ? 'text-white shadow-lg'
                      : 'bg-white text-brand-earthen hover:bg-gray-50 shadow-md'
                  } ${index === 2 ? 'col-span-2 md:col-span-1 w-3/5 mx-auto md:w-auto md:mx-0' : ''}`}
                  variants={memberVariants}
                >
                  {/* Background gradient - only visible when active */}
                  {activeCategory === key && (
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${category.color}`}
                      layoutId="activeCategory"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  {/* Content - always on top with proper z-index */}
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    {category.icon}
                    <span className="text-sm md:text-base">{category.title}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      activeCategory === key 
                        ? 'bg-white/30 text-white' 
                        : 'bg-brand-red/10 text-brand-red'
                    }`}>
                      {category.members.length}
                    </span>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Team Members Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="max-w-7xl mx-auto relative z-10"
            variants={categoryVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Desktop Grid Layout */}
            <div className={`${isMobile ? 'hidden' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'} gap-6`}>
              {teamCategories[activeCategory].members.map((member: any, index: number) => (
                <motion.div
                  key={member.name}
                  className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group border-2 ${teamCategories[activeCategory].borderColor} hover:border-opacity-60`}
                  variants={memberVariants}
                  style={{
                    background: `linear-gradient(135deg, ${teamCategories[activeCategory].bgColor.replace('bg-gradient-to-br ', '')}, white)`
                  }}
                >
                  <div className="text-center">
                    <div className="relative mb-6">
                      <div className={`w-20 h-20 mx-auto rounded-full overflow-hidden border-4 transition-all duration-300 relative`}
                           style={{ borderColor: teamCategories[activeCategory].color.replace('from-', '').replace(' to-', ', ') }}>
                        <Image
                          src={getCloudinaryImageUrl(member.folder, member.image, 80)}
                          alt={member.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Special badges for different categories */}
                      {activeCategory === 'in-loving-memory' && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <Heart className="w-3 h-3 text-white fill-current" />
                        </div>
                      )}
                      {activeCategory === 'patrons' && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                          <Crown className="w-3 h-3 text-white fill-current" />
                        </div>
                      )}
                      {activeCategory === 'current-team' && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                          <Sparkles className="w-3 h-3 text-white fill-current" />
                        </div>
                      )}
                    </div>
                    
                    <h3 className={`text-lg font-serif ${teamCategories[activeCategory].textColor} leading-tight mb-2`}>
                      {member.name}
                    </h3>
                    <p className="text-brand-red font-semibold text-base mb-3">{member.role}</p>
                    
                    {/* Additional info based on category */}
                    {activeCategory === 'current-team' && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-1">{member.department}</p>
                        <p className="text-sm font-medium text-green-700">{member.experience}</p>
                      </div>
                    )}
                    
                    <p className="text-brand-earthen text-base leading-relaxed mb-3 text-justify">{member.bio}</p>
                    
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Horizontal Scroll Layout */}
            {isMobile && (
              <div className="relative">
                <div 
                  ref={setScrollContainerRef}
                  className="flex overflow-x-auto overflow-y-hidden scrollbar-hide gap-4 pb-4"
                  onScroll={handleScroll}
                  style={{
                    scrollSnapType: 'x mandatory',
                    scrollBehavior: 'smooth',
                    WebkitOverflowScrolling: 'touch'
                  }}
                >
                  {teamCategories[activeCategory].members.map((member: any, index: number) => (
                    <motion.div
                      key={member.name}
                      className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group border-2 ${teamCategories[activeCategory].borderColor} hover:border-opacity-60 flex-shrink-0 w-72`}
                      style={{
                        scrollSnapAlign: 'start',
                        background: `linear-gradient(135deg, ${teamCategories[activeCategory].bgColor.replace('bg-gradient-to-br ', '')}, white)`
                      }}
                    >
                      <div className="text-center">
                        <div className="relative mb-6">
                          <div className={`w-20 h-20 mx-auto rounded-full overflow-hidden border-4 transition-all duration-300 relative`}
                               style={{ borderColor: teamCategories[activeCategory].color.replace('from-', '').replace(' to-', ', ') }}>
                            <Image
                              src={getCloudinaryImageUrl(member.folder, member.image, 80)}
                              alt={member.name}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Special badges for different categories */}
                          {activeCategory === 'in-loving-memory' && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                              <Heart className="w-3 h-3 text-white fill-current" />
                            </div>
                          )}
                          {activeCategory === 'patrons' && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                              <Crown className="w-3 h-3 text-white fill-current" />
                            </div>
                          )}
                          {activeCategory === 'current-team' && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                              <Sparkles className="w-3 h-3 text-white fill-current" />
                            </div>
                          )}
                        </div>
                        
                        <h3 className={`text-lg font-serif ${teamCategories[activeCategory].textColor} leading-tight mb-2`}>
                          {member.name}
                        </h3>
                        <p className="text-brand-red font-semibold text-base mb-3">{member.role}</p>
                        
                        {/* Additional info based on category */}
                        {activeCategory === 'current-team' && (
                          <div className="mb-3">
                            <p className="text-sm text-gray-600 mb-1">{member.department}</p>
                            <p className="text-sm font-medium text-green-700">{member.experience}</p>
                          </div>
                        )}
                        
                        <p className="text-brand-earthen text-base leading-relaxed mb-3 text-justify">{member.bio}</p>
                        
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.section>

      {/* Donate CTA Section */}
      <motion.section
        className="py-6 px-6 container mx-auto"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <motion.div 
          className="text-center max-w-xl mx-auto"
          variants={fadeIn}
        >
          <h2 className="text-2xl md:text-3xl font-serif text-brand-brown mb-2">
            Support Our Mission
          </h2>
          <p className="text-sm md:text-base text-brand-earthen mb-4">
            Help preserve India&apos;s cultural heritage.
          </p>
          
          <Link href="/donate">
            <button className="donate-btn">
              <Heart className="w-4 h-4 inline mr-2" />
              Donate Now
            </button>
          </Link>
        </motion.div>
      </motion.section>
      </div>
    </>
  );
};

export default AboutPage;
