import React, { useState, useEffect } from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

interface AnimatedTextProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  type?: 'typewriter' | 'letter-by-letter' | 'word-by-word' | 'gradient';
  delay?: number;
  duration?: number;
  gradient?: string;
  repeat?: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  tag = 'h1',
  type = 'letter-by-letter',
  delay = 0,
  duration = 50,
  gradient = 'from-purple-400 to-blue-500',
  repeat = false,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: !repeat,
  });

  useEffect(() => {
    if (!isIntersecting) {
      if (repeat) setDisplayText('');
      return;
    }

    let timeout: NodeJS.Timeout;
    let index = 0;

    if (type === 'typewriter' || type === 'letter-by-letter') {
      const typeText = () => {
        if (index < text.length) {
          setDisplayText((prev) => prev + text.charAt(index));
          index++;
          timeout = setTimeout(typeText, duration);
        }
      };

      timeout = setTimeout(() => {
        setDisplayText('');
        typeText();
      }, delay);
    } else if (type === 'word-by-word') {
      const words = text.split(' ');
      
      const typeWord = () => {
        if (index < words.length) {
          setDisplayText((prev) => prev + (index > 0 ? ' ' : '') + words[index]);
          index++;
          timeout = setTimeout(typeWord, duration * 5);
        }
      };

      timeout = setTimeout(() => {
        setDisplayText('');
        typeWord();
      }, delay);
    } else {
      // For gradient type, just set the full text
      timeout = setTimeout(() => {
        setDisplayText(text);
      }, delay);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isIntersecting, text, type, delay, duration, repeat]);

  const renderContent = () => {
    if (type === 'gradient' && displayText) {
      return (
        <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
          {displayText}
        </span>
      );
    }
    return displayText;
  };

  const Tag = tag;
  
  return (
    <div ref={ref}>
      <Tag className={className}>{renderContent()}</Tag>
    </div>
  );
};

export default AnimatedText;
