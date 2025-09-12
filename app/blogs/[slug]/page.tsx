'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import SmallLoader from '@/components/SmallLoader';
import { useLoading } from '@/hooks/useLoading';

// Blog post data (in a real app, this would come from a CMS or API)
const blogPostsData = {
  'the-revival-of-classical-arts': {
    title: 'The Revival of Classical Arts in the Digital Age',
    image: '/images/blogs/blog1.jpg',
    author: 'Elena Petrova',
    date: 'October 26, 2023',
    readTime: '8 min read',
    content: `
      <p>In an era dominated by digital innovation, classical arts are experiencing an unexpected renaissance. Technology, once seen as a threat to traditional art forms, has become their greatest ally in reaching new audiences and preserving ancient techniques for future generations.</p>
      
      <h2>Digital Preservation of Ancient Techniques</h2>
      <p>Museums and cultural institutions worldwide are leveraging cutting-edge technology to document and preserve classical art forms. High-resolution 3D scanning, virtual reality experiences, and AI-powered restoration techniques are breathing new life into centuries-old masterpieces.</p>
      
      <p>The Metropolitan Museum of Art's recent digitization project has made over 400,000 artworks freely available online, allowing global audiences to explore classical art in unprecedented detail. Similarly, the Vatican Museums have created virtual tours that transport visitors through the Sistine Chapel from anywhere in the world.</p>
      
      <h2>Interactive Learning Platforms</h2>
      <p>Educational technology has revolutionized how we learn about classical arts. Interactive platforms now offer immersive experiences where students can virtually step into historical periods, witness the creation of famous artworks, and understand the cultural contexts that shaped these masterpieces.</p>
      
      <p>Augmented reality applications allow visitors to see how ancient sculptures and paintings would have appeared in their original colors, while machine learning algorithms help art historians discover hidden details and connections between works across different periods and cultures.</p>
      
      <h2>The Future of Classical Arts</h2>
      <p>As we move forward, the integration of technology and classical arts promises even more exciting developments. From AI-assisted art restoration to blockchain-based provenance tracking, technology continues to serve as a bridge between our artistic heritage and future generations.</p>
    `
  },
  'a-journey-through-textiles': {
    title: 'A Journey Through the Rich Textiles of India',
    image: '/images/blogs/blog2.jpg',
    author: 'Samuel Chen',
    date: 'October 22, 2023',
    readTime: '6 min read',
    content: `
      <p>India's textile heritage spans thousands of years, weaving together stories of culture, tradition, and artistic excellence. From the luxurious silks of Varanasi to the intricate cotton weaves of Gujarat, each region tells its unique story through fabric.</p>
      
      <h2>The Silk Route Legacy</h2>
      <p>The ancient Silk Route not only facilitated trade but also enabled the exchange of textile techniques and designs. Indian silk, particularly from regions like Karnataka and Tamil Nadu, became highly prized across Asia and Europe for its quality and craftsmanship.</p>
      
      <p>The traditional art of silk weaving involves complex processes passed down through generations. Master weavers spend years perfecting their craft, creating intricate patterns that reflect local mythology, nature, and cultural symbols.</p>
      
      <h2>Cotton: The Fabric of the People</h2>
      <p>While silk represented luxury, cotton became the fabric of everyday life in India. The development of cotton cultivation and processing techniques in the Indian subcontinent revolutionized global textile production.</p>
      
      <p>Regional variations in cotton weaving techniques have given rise to distinctive styles like Khadi from Gujarat, Chanderi from Madhya Pradesh, and Mangalgiri from Andhra Pradesh. Each carries the signature of its region's climate, culture, and artistic sensibilities.</p>
      
      <h2>Preserving Traditional Techniques</h2>
      <p>Today, efforts to preserve these traditional textile arts face the challenge of modernization. Organizations and artisans are working together to document ancient techniques, train new generations of weavers, and find contemporary applications for traditional crafts.</p>
    `
  },
  'the-architecture-of-empires': {
    title: 'The Enduring Legacy of Imperial Architecture',
    image: '/images/blogs/blog3.jpg',
    author: 'Aisha Khan',
    date: 'October 18, 2023',
    readTime: '10 min read',
    content: `
      <p>Imperial architecture stands as a testament to the ambitions, beliefs, and artistic achievements of great civilizations. From the soaring domes of Mughal monuments to the intricate stone carvings of ancient temples, these structures continue to inspire contemporary architects and urban planners.</p>
      
      <h2>Mughal Architectural Mastery</h2>
      <p>The Mughal Empire left an indelible mark on Indian architecture, blending Persian, Islamic, and local Indian styles into a distinctive architectural language. The Taj Mahal, Red Fort, and Humayun's Tomb exemplify this synthesis of diverse cultural influences.</p>
      
      <p>Mughal architects pioneered innovative construction techniques, including the use of double domes, intricate inlay work, and sophisticated water management systems. These innovations not only created stunning visual effects but also addressed practical concerns like climate control and structural stability.</p>
      
      <h2>Temple Architecture: Sacred Geometry</h2>
      <p>Indian temple architecture represents one of the world's most sophisticated systems of sacred design. Based on ancient texts like the Vastu Shastra, these structures embody complex mathematical and spiritual principles.</p>
      
      <p>The temples of Khajuraho, Konark, and Hampi showcase the incredible skill of medieval Indian architects and sculptors. Every element, from the foundation to the pinnacle, follows precise geometric principles believed to create harmony between the earthly and divine realms.</p>
      
      <h2>Modern Interpretations</h2>
      <p>Contemporary architects continue to draw inspiration from imperial architecture, adapting classical principles to modern needs. Sustainable design practices now incorporate traditional techniques like passive cooling systems and natural lighting strategies developed centuries ago.</p>
      
      <p>The challenge lies in preserving the essence of these architectural traditions while meeting contemporary requirements for functionality, accessibility, and environmental responsibility.</p>
    `
  }
};

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

const BlogPostPage = ({ params }: BlogPostPageProps) => {
  const { isLoading, withLoading } = useLoading(true);
  const [blogPost, setBlogPost] = useState<any>(null);

  useEffect(() => {
    const loadBlogPost = async () => {
      await withLoading(async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const post = blogPostsData[params.slug as keyof typeof blogPostsData];
        if (post) {
          setBlogPost(post);
        }
      });
    };
    
    loadBlogPost();
  }, [params.slug, withLoading]);

  if (isLoading) {
    return <SmallLoader isLoading={true} />;
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FFF6F4' }}>
        <div className="text-center">
          <h1 className="text-4xl font-serif text-brand-brown mb-4">Blog Post Not Found</h1>
          <p className="text-brand-earthen mb-6">The blog post you're looking for doesn't exist.</p>
          <Link 
            href="/blogs" 
            className="inline-flex items-center gap-2 bg-brand-red text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFF6F4' }}>
      <div className="pt-28 pb-8">
        <div className="container mx-auto px-6">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Link 
              href="/blogs" 
              className="inline-flex items-center gap-2 text-brand-red hover:text-red-700 transition-colors font-sans"
            >
              <ArrowLeft size={20} />
              Back to All Posts
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <header className="mb-6">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif text-brand-brown mb-4 leading-tight">
                {blogPost.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-brand-earthen mb-6">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span className="font-sans text-sm">{blogPost.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span className="font-sans text-sm">{blogPost.date}</span>
                </div>
                <span className="font-sans text-sm">{blogPost.readTime}</span>
              </div>
            </header>

            {/* Featured Image */}
            <div className="relative h-48 md:h-64 mb-6 rounded-lg overflow-hidden">
              <Image
                src={blogPost.image}
                alt={blogPost.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none font-sans text-brand-black"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
              style={{
                lineHeight: '1.7',
              }}
            />

            {/* Article Footer */}
            <footer className="mt-8 pt-6 border-t border-brand-earthen-light">
              <div className="flex justify-between items-center">
                <div className="text-brand-earthen">
                  <p className="font-sans text-sm">Written by</p>
                  <p className="font-serif text-lg text-brand-brown">{blogPost.author}</p>
                </div>
                <Link 
                  href="/blogs" 
                  className="bg-brand-red text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-sans"
                >
                  More Articles
                </Link>
              </div>
            </footer>
          </motion.article>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;