'use client';

import React from 'react';

interface TexturedBackgroundProps {
  className?: string;
  opacity?: number;
  children?: React.ReactNode;
}

const TexturedBackground: React.FC<TexturedBackgroundProps> = ({ 
  className = '', 
  opacity = 1,
  children 
}) => {
  return (
    <div 
      className={`relative ${className}`}
      style={{
        backgroundImage: 'url("/images/textured-background.svg")',
        backgroundSize: '200px 200px',
        backgroundRepeat: 'repeat',
        backgroundColor: '#f5f1e8',
        opacity: opacity
      }}
    >
      {children}
    </div>
  );
};

export default TexturedBackground;

