import React, { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
  text: string | string[];
  speed?: number;
  delay?: number;
  loop?: boolean;
  cursor?: boolean;
  cursorChar?: string;
  cursorColor?: string;
  pauseBetweenWords?: number;
  pauseAtEnd?: number;
  className?: string;
  onComplete?: () => void;
}

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 50,
  delay = 0,
  loop = false,
  cursor = true,
  cursorChar = '|',
  cursorColor = 'text-purple-500',
  pauseBetweenWords = 1000,
  pauseAtEnd = 2000,
  className = '',
  onComplete,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const textArray = Array.isArray(text) ? text : [text];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear any existing timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Main typing effect
  useEffect(() => {
    // Initial delay before starting
    if (!isTyping && currentIndex === 0 && currentWordIndex === 0) {
      timerRef.current = setTimeout(() => {
        setIsTyping(true);
      }, delay);
      return;
    }

    if (isPaused) return;

    // Get current word
    const currentWord = textArray[currentWordIndex];
    
    // Handle typing
    if (isTyping && !isDeleting) {
      if (currentIndex < currentWord.length) {
        // Type next character
        timerRef.current = setTimeout(() => {
          setDisplayText(currentWord.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, speed);
      } else {
        // Finished typing current word
        setIsTyping(false);
        
        // If we're looping or there are more words, pause before deleting
        if (loop || currentWordIndex < textArray.length - 1) {
          setIsPaused(true);
          timerRef.current = setTimeout(() => {
            setIsDeleting(true);
            setIsPaused(false);
          }, pauseAtEnd);
        } else {
          // Completed all words without looping
          onComplete?.();
        }
      }
    }
    
    // Handle deleting
    if (isDeleting) {
      if (currentIndex > 0) {
        // Delete next character
        timerRef.current = setTimeout(() => {
          setDisplayText(currentWord.substring(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        }, speed / 2); // Deleting is faster than typing
      } else {
        // Finished deleting current word
        setIsDeleting(false);
        
        // Move to next word or loop back to first word
        const nextWordIndex = (currentWordIndex + 1) % textArray.length;
        
        // If we've gone through all words and not looping, stop
        if (nextWordIndex === 0 && !loop) {
          onComplete?.();
          return;
        }
        
        // Pause before typing next word
        setIsPaused(true);
        timerRef.current = setTimeout(() => {
          setCurrentWordIndex(nextWordIndex);
          setIsTyping(true);
          setIsPaused(false);
        }, pauseBetweenWords);
      }
    }
  }, [
    text, 
    textArray,
    speed, 
    delay, 
    loop, 
    currentIndex, 
    currentWordIndex, 
    isTyping, 
    isDeleting, 
    isPaused,
    pauseBetweenWords,
    pauseAtEnd,
    onComplete
  ]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      {displayText}
      {cursor && (
        <span className={`animate-pulse ${cursorColor}`}>
          {cursorChar}
        </span>
      )}
    </span>
  );
};

export default Typewriter;
