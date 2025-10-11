import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const ParticleContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  pointer-events: none;
`;

const Particle = styled.div`
  position: absolute;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 50%;
  pointer-events: none;
  animation: float ${props => props.duration}s linear infinite;
  
  @keyframes float {
    0% {
      transform: translateY(100vh) translateX(0) scale(0);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100px) translateX(${props => props.drift}px) scale(1);
      opacity: 0;
    }
  }
`;

const ParticleBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const createParticle = () => {
      if (!containerRef.current) return;

      const particle = document.createElement('div');
      const size = Math.random() * 4 + 1;
      const duration = Math.random() * 10 + 10;
      const drift = (Math.random() - 0.5) * 200;
      const left = Math.random() * 100;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${left}%`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particle.style.background = `linear-gradient(135deg, 
        ${['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4'][Math.floor(Math.random() * 4)]}, 
        ${['#8b5cf6', '#ec4899', '#06b6d4', '#6366f1'][Math.floor(Math.random() * 4)]}
      )`;
      particle.style.opacity = '0.3';
      particle.style.borderRadius = '50%';
      particle.style.position = 'absolute';
      particle.style.pointerEvents = 'none';
      particle.style.animation = `float ${duration}s linear infinite`;
      particle.style.animationDelay = `${Math.random() * 5}s`;

      containerRef.current.appendChild(particle);

      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, duration * 1000);
    };

    // Create particles periodically
    const interval = setInterval(createParticle, 800);

    return () => clearInterval(interval);
  }, []);

  return <ParticleContainer ref={containerRef} />;
};

export default ParticleBackground;
