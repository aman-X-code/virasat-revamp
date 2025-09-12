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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="pt-4 pb-20 px-6" style={{ backgroundColor: '#FFF7F5F4' }}
    >
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-brand-brown mb-6">
          Frequently Asked Questions
        </h2>
        {/* Decorative gradient line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-24 h-1 mx-auto mb-6 rounded-full"
          style={{
            background: 'linear-gradient(to right, #dc2626, #7c2d12)'
          }}
        />
        <p className="text-center text-lg text-brand-earthen mb-12">
          Answers to some of the common questions we receive.
        </p>

        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-xl font-sans font-semibold text-brand-black hover:text-brand-red text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base font-sans text-brand-earthen leading-relaxed">
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
