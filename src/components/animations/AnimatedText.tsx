import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from '../../hooks';

interface AnimatedTextProps {
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  type?: 'letter-by-letter' | 'word-by-word' | 'gradient' | 'typewriter';
  duration?: number;
  delay?: number;
  gradient?: string;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  tag = 'h1',
  type = 'letter-by-letter',
  duration = 50,
  delay = 0,
  gradient = 'from-purple-500 to-blue-500',
  className = '',
}) => {
  const [displayText, setDisplayText] = useState<string>('');
  const [isComplete, setIsComplete] = useState<boolean>(false);

  useEffect(() => {
    if (type === 'typewriter') {
      let currentIndex = 0;
      setDisplayText('');
      
      const timeout = setTimeout(() => {
        const interval = setInterval(() => {
          if (currentIndex < text.length) {
            setDisplayText(prevText => prevText + text[currentIndex]);
            currentIndex++;
          } else {
            clearInterval(interval);
            setIsComplete(true);
          }
        }, duration);
        
        return () => clearInterval(interval);
      }, delay);
      
      return () => clearTimeout(timeout);
    } else {
      setDisplayText(text);
      const timeout = setTimeout(() => {
        setIsComplete(true);
      }, delay + (type === 'letter-by-letter' ? text.length * duration : text.split(' ').length * duration));
      
      return () => clearTimeout(timeout);
    }
  }, [text, type, duration, delay]);

  const renderText = () => {
    switch (type) {
      case 'letter-by-letter':
        return (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            className="inline-block"
          >
            {displayText.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.3,
                  delay: delay / 1000 + index * (duration / 1000),
                  ease: 'easeOut'
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.div>
        );
        
      case 'word-by-word':
        return (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            className="inline-block"
          >
            {displayText.split(' ').map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4,
                  delay: delay / 1000 + index * (duration / 1000),
                  ease: 'easeOut'
                }}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        );
        
      case 'gradient':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              delay: delay / 1000,
              ease: 'easeOut'
            }}
            className={`text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}
          >
            {displayText}
          </motion.div>
        );
        
      case 'typewriter':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: delay / 1000 }}
            className="inline-block relative"
          >
            {displayText}
            {!isComplete && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ 
                  repeat: Infinity,
                  duration: 0.8
                }}
                className="ml-1 inline-block w-2 h-full bg-current"
              ></motion.span>
            )}
          </motion.div>
        );
        
      default:
        return displayText;
    }
  };

  const CustomTag = ({ className, children }: { className?: string, children: React.ReactNode }) => {
    const Tag = tag as keyof JSX.IntrinsicElements;
    return <Tag className={className}>{children}</Tag>;
  };

  return (
    <CustomTag className={className}>
      {renderText()}
    </CustomTag>
  );
};

export default AnimatedText;
