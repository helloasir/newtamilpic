"use client";

import React, { useState, useEffect } from 'react';

interface FadeInProps {
  children: React.ReactNode;
}

const FadeIn: React.FC<FadeInProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`fade-in ${isVisible ? 'visible' : ''}`}
      style={{
        transition: 'opacity 1s ease-in-out',
        opacity: isVisible ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
