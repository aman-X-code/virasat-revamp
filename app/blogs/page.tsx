'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import SmallLoader from '@/components/SmallLoader';
import { useLoading } from '@/hooks/useLoading';

const blogPosts = [
  {
    slug: 'the-revival-of-classical-arts',
    title: 'The Revival of Classical Arts in the Digital Age',
    image: '/images/blogs/blog1.jpg',
    excerpt: 'Exploring how technology is breathing new life into ancient art forms.',
    author: 'Elena Petrova',
    date: 'October 26, 2023',
  },
  {
    slug: 'a-journey-through-textiles',
    title: 'A Journey Through the Rich Textiles of India',
    image: '/images/blogs/blog2.jpg',
    excerpt: 'From silk to cotton, a look at the stories woven into fabrics.',
    author: 'Samuel Chen',
    date: 'October 22, 2023',
  },
  {
    slug: 'the-architecture-of-empires',
    title: 'The Enduring Legacy of Imperial Architecture',
    image: '/images/blogs/blog3.jpg',
    excerpt: 'How the grand designs of the past continue to inspire modern architects.',
    author: 'Aisha Khan',
    date: 'October 18, 2023',
  },
];

const BlogsPage = () => {
  const { isLoading, withLoading } = useLoading(true);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  // Simulate data loading
  useEffect(() => {
    const loadBlogData = async () => {
      await withLoading(async () => {
        // Simulate API call to fetch blog posts
        await new Promise(resolve => setTimeout(resolve, 1200));
      });
    };
    
    loadBlogData();
  }, [withLoading]);

  return (
    <>
      <SmallLoader isLoading={isLoading} />
      {!isLoading && (
        <div className="text-brand-black pt-20" style={{ backgroundColor: '#FFF6F4' }}>
      <section className="py-12 px-6 container mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-serif text-brand-brown mb-4">News & Insights</h1>
          <p className="text-base font-sans text-brand-earthen max-w-2xl mx-auto">
            Stay updated with the latest stories, articles, and announcements from the world of Virasat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-brand-earthen-light transform hover:-translate-y-2 transition-transform duration-300"
              custom={index}
              initial="initial"
              whileInView="animate"
              variants={fadeIn}
              viewport={{ once: true }}
            >
              <Link href={`/blogs/${post.slug}`} passHref>
                <div className="relative h-56">
                  <Image
                    src={post.image}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </Link>
              <div className="p-4">
                <p className="text-sm text-brand-earthen mb-2">{post.date} • {post.author}</p>
                <h3 className="text-xl font-serif text-brand-black mb-2">
                  <Link href={`/blogs/${post.slug}`} className="hover:text-brand-red transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="font-sans text-brand-earthen mb-3 text-sm">{post.excerpt}</p>
                <div className="w-1/4 h-px bg-brand-red my-3"></div>
                <Link href={`/blogs/${post.slug}`} className="font-sans font-semibold text-brand-red hover:underline text-sm">
                  Read More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
        </div>
      )}
    </>
  );
};

export default BlogsPage;
