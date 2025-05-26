import React, { useState } from 'react';

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  gradient?: string;
  hoverGradient?: string;
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  shadow?: boolean;
  glow?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  animateOnHover?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  onClick,
  className = '',
  gradient = 'from-purple-600 to-blue-500',
  hoverGradient = 'from-purple-700 to-blue-600',
  size = 'md',
  rounded = 'md',
  shadow = true,
  glow = false,
  disabled = false,
  type = 'button',
  fullWidth = false,
  animateOnHover = true,
  href,
  target,
  rel,
  ariaLabel,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  // Rounded classes
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };
  
  // Base classes
  const baseClasses = `
    inline-flex items-center justify-center font-medium transition-all duration-300
    ${sizeClasses[size]}
    ${roundedClasses[rounded]}
    ${shadow ? 'shadow-md hover:shadow-lg' : ''}
    ${glow ? `hover:shadow-lg hover:shadow-${gradient.split('-')[1]}-400/50` : ''}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;
  
  // Gradient classes
  const gradientClasses = `
    bg-gradient-to-r ${isHovered && animateOnHover ? hoverGradient : gradient}
    hover:bg-gradient-to-r hover:${hoverGradient}
    text-white
  `;
  
  // Animation classes
  const animationClasses = animateOnHover
    ? 'transform hover:-translate-y-0.5 active:translate-y-0'
    : '';
  
  // Handle mouse events
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
  // Render as link if href is provided
  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={`${baseClasses} ${gradientClasses} ${animationClasses}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      >
        {children}
      </a>
    );
  }
  
  // Render as button
  return (
    <button
      type={type}
      className={`${baseClasses} ${gradientClasses} ${animationClasses}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default GradientButton;
