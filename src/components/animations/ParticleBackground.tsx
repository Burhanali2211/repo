import React, { useEffect, useRef, useState } from 'react';
// Performance-optimized interactive particle background with configurable parameters

interface ParticleBackgroundProps {
  particleCount?: number;
  connectParticles?: boolean;
  connectDistance?: number;
  particleSpeed?: number;
  maxFPS?: number;
}

interface Particle {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  size: number;
  color: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  particleCount = 30,
  connectParticles = true,
  connectDistance = 100,
  particleSpeed = 0.3,
  maxFPS = 30
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationFrameId = useRef<number>(0);
  const lastUpdateTime = useRef<number>(0);
  const frameInterval = 1000 / maxFPS; // Milliseconds between frames

  // Initialize particles
  const initParticles = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    setDimensions({ width, height });
    canvas.width = width;
    canvas.height = height;
    
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 3 + 1;
      const x = Math.random() * width;
      const y = Math.random() * height;
      const directionX = (Math.random() * 2 - 1) * particleSpeed;
      const directionY = (Math.random() * 2 - 1) * particleSpeed;
      const color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`;
      
      newParticles.push({
        x,
        y,
        directionX,
        directionY,
        size,
        color
      });
    }
    
    setParticles(newParticles);
  };

  // Update particle positions
  const updateParticles = () => {
    return particles.map(particle => {
      let { x, y, directionX, directionY, size, color } = particle;
      
      // Bounce off edges
      if (x + size > dimensions.width || x - size < 0) {
        directionX = -directionX;
      }
      
      if (y + size > dimensions.height || y - size < 0) {
        directionY = -directionY;
      }
      
      // Update position
      x += directionX;
      y += directionY;
      
      return { ...particle, x, y, directionX, directionY };
    });
  };

  // Draw particles and connections
  const draw = (timestamp: number) => {
    if (!canvasRef.current) return;
    
    // Limit frame rate
    if (timestamp - lastUpdateTime.current < frameInterval) {
      animationFrameId.current = requestAnimationFrame(draw);
      return;
    }
    
    lastUpdateTime.current = timestamp;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);
    
    // Update and draw particles
    const updatedParticles = updateParticles();
    
    updatedParticles.forEach(particle => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
      
      // Draw connections
      if (connectParticles) {
        updatedParticles.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / connectDistance})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      }
    });
    
    setParticles(updatedParticles);
    animationFrameId.current = requestAnimationFrame(draw);
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setDimensions({ width, height });
      canvasRef.current.width = width;
      canvasRef.current.height = height;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize and start animation
  useEffect(() => {
    initParticles();
    
    animationFrameId.current = requestAnimationFrame(draw);
    
    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [particleCount, connectParticles, connectDistance, particleSpeed, maxFPS]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;