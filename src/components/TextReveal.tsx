import React, { useState, useEffect, useRef } from 'react';

interface TextRevealProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  revealOnView?: boolean;
  revealThreshold?: number;
  highlightWords?: string[];
  highlightColor?: string;
  as?: keyof JSX.IntrinsicElements;
}

const TextReveal: React.FC<TextRevealProps> = ({
  text,
  speed = 50,
  delay = 0,
  className = '',
  revealOnView = true,
  revealThreshold = 0.1,
  highlightWords = [],
  highlightColor = 'text-purple-500',
  as: Component = 'p',
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isRevealing, setIsRevealing] = useState(false);
  const [isInView, setIsInView] = useState(!revealOnView);
  const elementRef = useRef<HTMLElement>(null);
  
  // Check if element is in viewport
  useEffect(() => {
    if (!revealOnView) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: revealThreshold }
    );
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, [revealOnView, revealThreshold]);
  
  // Reveal text animation
  useEffect(() => {
    if (!isInView) return;
    
    let timer: NodeJS.Timeout;
    
    // Start revealing after the delay
    const delayTimer = setTimeout(() => {
      setIsRevealing(true);
      
      let currentIndex = 0;
      
      // Reveal one character at a time
      timer = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(timer);
          setIsRevealing(false);
        }
      }, speed);
    }, delay);
    
    return () => {
      clearTimeout(delayTimer);
      clearInterval(timer);
    };
  }, [text, speed, delay, isInView]);
  
  // Highlight specific words
  const renderHighlightedText = () => {
    if (highlightWords.length === 0) return displayedText;
    
    let result = displayedText;
    
    // Replace each highlighted word with a span
    highlightWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      result = result.replace(regex, `<span class="${highlightColor}">${word}</span>`);
    });
    
    return result;
  };
  
  return (
    <Component
      ref={elementRef as any}
      className={`relative ${className}`}
      dangerouslySetInnerHTML={{ __html: renderHighlightedText() }}
    />
  );
};

export default TextReveal;
