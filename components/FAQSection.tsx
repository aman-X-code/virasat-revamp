'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqData = [
  {
    question: 'What is the story behind Virasat?',
    answer:
      'Virasat is a celebration of timeless culture and tradition, brought to life through a modern lens. Our mission is to preserve and share the rich tapestry of our heritage with the world, creating a legacy that inspires future generations.',
  },
  {
    question: 'How can I get involved or collaborate?',
    answer:
      'We welcome collaborations with artists, historians, and cultural enthusiasts. Please visit our Contact Us page to send us a proposal or express your interest. We are always looking for passionate individuals to join our journey.',
  },
  {
    question: 'When and where are the events held?',
    answer:
      'Our events are held at various historically significant locations throughout the year. Please subscribe to our newsletter or check the "Events" section for the latest schedule and venue information.',
  },
  {
    question: 'Are the exhibits suitable for all ages?',
    answer:
      'Absolutely. Virasat is designed to be an inclusive experience for all age groups. We believe in making heritage accessible and engaging for everyone, from young children to seasoned connoisseurs.',
  },
];

export const FAQSection = () => {
  return (
    <motion.section
      initial={{ opacity: 1, y: 0 }}
      className="pt-4 pb-20 px-6 relative" 
      style={{ backgroundColor: '#000', zIndex: 10 }}
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
      <div className="container mx-auto max-w-4xl relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-berkshire-swash text-center text-white mb-6" style={{ fontFamily: 'var(--font-berkshire-swash)' }}>
          Frequently Asked<br className="md:hidden" />
          <span className="hidden md:inline"> </span>Questions
        </h2>
        {/* Decorative gradient line */}
        <motion.div
          initial={{ opacity: 1, scaleX: 1 }}
          className="w-24 h-1 mx-auto mb-6 rounded-full bg-gradient-to-r from-red-600 to-orange-600"
        />
        <p className="text-center text-lg text-white mb-12">
          Answers to some of the common questions we receive.
        </p>

        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-xl font-sans font-semibold text-white hover:text-red-400 text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base font-league-spartan text-gray-300 leading-relaxed" style={{ fontFamily: 'var(--font-league-spartan)' }}>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </motion.section>
  );
};

export default FAQSection;
