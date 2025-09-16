'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import SmallLoader from '@/components/SmallLoader';
import { useLoading } from '@/hooks/useLoading';

// Poster-style news items linking to PDFs
const newsItems = [
  {
    id: 'pdf-1',
    title: 'Press Release 1',
    cover: '/images/news/poster-1.png',
    pdfUrl: '/pdfs/news-1.pdf',
    downloadName: 'Press_Release_1.pdf'
  },
  {
    id: 'pdf-2',
    title: 'Press Release 2',
    cover: '/images/news/poster-2.png',
    pdfUrl: '/pdfs/news-2.pdf',
    downloadName: 'Press_Release_2.pdf'
  }
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
          <section className="py-6 px-6 container mx-auto">
            <div className="text-center mb-4">
              <h1 className="text-4xl md:text-5xl font-serif text-brand-brown mb-2">News</h1>
              <p className="text-base font-sans text-brand-earthen max-w-2xl mx-auto">Download our latest press releases and announcements.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center">
              {newsItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="bg-white rounded-xl overflow-hidden border-2 border-brand-earthen-light shadow-sm w-full max-w-[385px]"
                  custom={index}
                  initial="initial"
                  whileInView="animate"
                  variants={fadeIn}
                  viewport={{ once: true }}
                >
                  <a href={item.pdfUrl} download={item.downloadName} target="_blank" rel="noopener noreferrer" className="group block">
                    <div className="relative w-full pb-[120%]">
                      <Image src={item.cover} alt={item.title} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div className="p-3 flex items-center justify-between">
                      <h3 className="text-lg font-serif text-brand-black">{item.title}</h3>
                      <span className="text-sm font-semibold text-brand-red group-hover:underline">Download PDF</span>
                    </div>
                  </a>
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
