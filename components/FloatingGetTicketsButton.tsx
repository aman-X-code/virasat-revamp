'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const FloatingGetTicketsButton = () => {
  return (
     <motion.div
       className="fixed bottom-20 right-6 z-50 sm:bottom-12"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        delay: 1,
        duration: 0.5,
        type: "spring",
        stiffness: 200
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link href="/events">
        <button className="floating-tickets-button">
          <p className="button__text">
            <span style={{ '--index': 0 } as React.CSSProperties}>G</span>
            <span style={{ '--index': 1 } as React.CSSProperties}>E</span>
            <span style={{ '--index': 2 } as React.CSSProperties}>T</span>
            <span style={{ '--index': 3 } as React.CSSProperties}> </span>
            <span style={{ '--index': 4 } as React.CSSProperties}>T</span>
            <span style={{ '--index': 5 } as React.CSSProperties}>I</span>
            <span style={{ '--index': 6 } as React.CSSProperties}>C</span>
            <span style={{ '--index': 7 } as React.CSSProperties}>K</span>
            <span style={{ '--index': 8 } as React.CSSProperties}>E</span>
            <span style={{ '--index': 9 } as React.CSSProperties}>T</span>
            <span style={{ '--index': 10 } as React.CSSProperties}>S</span>
          </p>

          <div className="button__circle">
            <svg
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="button__icon"
              width="14"
            >
              <path
                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                fill="currentColor"
              />
            </svg>

            <svg
              viewBox="0 0 14 15"
              fill="none"
              width="14"
              xmlns="http://www.w3.org/2000/svg"
              className="button__icon button__icon--copy"
            >
              <path
                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                fill="currentColor"
              />
            </svg>
          </div>
        </button>
      </Link>

      <style jsx>{`
        .floating-tickets-button {
          cursor: pointer;
          border: none;
          background: #000;
          color: #fff;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          display: grid;
          place-content: center;
          transition:
            background 300ms,
            transform 200ms;
          font-weight: 600;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .button__text {
          position: absolute;
          inset: 0;
          animation: text-rotation 8s linear infinite;
        }

         .button__text > span {
           position: absolute;
           transform: rotate(calc(32.7deg * var(--index)));
           inset: 7px;
           font-size: 13px;
           font-weight: 900;
           letter-spacing: 0.5px;
           -webkit-text-stroke: 0.5px #fff;
         }
         
         /* Custom positioning for better letter spacing */
         .button__text > span:nth-child(1) { transform: rotate(0deg); } /* G */
         .button__text > span:nth-child(2) { transform: rotate(30deg); } /* E */
         .button__text > span:nth-child(3) { transform: rotate(60deg); } /* T */
         .button__text > span:nth-child(4) { transform: rotate(90deg); } /* space */
         .button__text > span:nth-child(5) { transform: rotate(120deg); } /* T */
         .button__text > span:nth-child(6) { transform: rotate(150deg); } /* I */
         .button__text > span:nth-child(7) { transform: rotate(180deg); } /* C */
         .button__text > span:nth-child(8) { transform: rotate(210deg); } /* K */
         .button__text > span:nth-child(9) { transform: rotate(240deg); } /* E */
         .button__text > span:nth-child(10) { transform: rotate(270deg); } /* T */
         .button__text > span:nth-child(11) { transform: rotate(300deg); } /* S */

        .button__circle {
          position: relative;
          width: 40px;
          height: 40px;
          overflow: hidden;
          background: #fff;
          color: #000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .button__icon--copy {
          position: absolute;
          transform: translate(-150%, 150%);
        }

         .floating-tickets-button:hover {
           background: #f9e828;
           color: #000;
           transform: scale(1.05);
         }

         .floating-tickets-button:hover .button__text > span {
           -webkit-text-stroke: 0.5px #000;
           color: #000;
         }

        .floating-tickets-button:hover .button__icon {
          color: #000;
        }

        .floating-tickets-button:hover .button__icon:first-child {
          transition: transform 0.3s ease-in-out;
          transform: translate(150%, -150%);
        }

        .floating-tickets-button:hover .button__icon--copy {
          transition: transform 0.3s ease-in-out 0.1s;
          transform: translate(0);
        }

        @keyframes text-rotation {
          to {
            rotate: 360deg;
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .floating-tickets-button {
            width: 80px;
            height: 80px;
          }
          
          .button__circle {
            width: 32px;
            height: 32px;
          }
          
           .button__text > span {
             font-size: 11px;
             font-weight: 900;
             letter-spacing: 0.3px;
             -webkit-text-stroke: 0.3px #fff;
           }
           
           .floating-tickets-button:hover .button__text > span {
             -webkit-text-stroke: 0.3px #000;
             color: #000;
           }
        }
      `}</style>
    </motion.div>
  );
};

export default FloatingGetTicketsButton;
