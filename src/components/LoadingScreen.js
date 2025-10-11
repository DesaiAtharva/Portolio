import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Logo = styled(motion.div)`
  font-size: 4rem;
  font-weight: 900;
  background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 2rem;
  font-family: 'Space Grotesk', sans-serif;
`;

const LoadingBar = styled.div`
  width: 300px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const LoadingProgress = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);
  border-radius: 2px;
`;

const LoadingText = styled(motion.div)`
  font-size: 1.2rem;
  color: #ffffff;
  font-weight: 500;
  margin-bottom: 2rem;
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Dot = styled(motion.div)`
  width: 12px;
  height: 12px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 50%;
`;

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  const loadingMessages = [
    'Initializing...',
    'Loading 3D Assets...',
    'Preparing Portfolio...',
    'Almost Ready...',
    'Welcome!'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        const currentIndex = loadingMessages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 600);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <LoadingContainer>
      <Logo
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        AD
      </Logo>
      
      <LoadingText
        key={loadingText}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {loadingText}
      </LoadingText>

      <LoadingBar>
        <LoadingProgress
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </LoadingBar>

      <LoadingDots>
        {[0, 1, 2].map((index) => (
          <Dot
            key={index}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2,
            }}
          />
        ))}
      </LoadingDots>
    </LoadingContainer>
  );
};

export default LoadingScreen;
