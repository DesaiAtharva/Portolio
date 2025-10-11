import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
// import { Typed } from 'react-typed';
import styled from 'styled-components';
import CodeVisualization from './Avatar3D';

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0 2rem;
  overflow: hidden;

  @media (max-width: 1024px) {
    padding: 0 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 0 1rem;
    min-height: 90vh;
    padding-top: 80px;
  }

  @media (max-width: 480px) {
    padding: 0 0.8rem;
    min-height: 85vh;
    padding-top: 70px;
  }

  @media (max-width: 320px) {
    padding: 0 0.5rem;
    min-height: 80vh;
    padding-top: 60px;
  }
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  z-index: 2;

  @media (max-width: 1024px) {
    gap: 3rem;
    max-width: 1000px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
    max-width: 600px;
    margin-top: 1rem;
  }

  @media (max-width: 480px) {
    gap: 1.5rem;
    max-width: 100%;
    margin-top: 0.5rem;
  }

  @media (max-width: 320px) {
    gap: 1rem;
    margin-top: 0.5rem;
  }
`;

const TextContent = styled.div`
  z-index: 20;
  position: relative;
  width: 100%;

  @media (max-width: 768px) {
    text-align: center;
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    padding: 0 0.5rem;
  }

  @media (max-width: 320px) {
    padding: 0 0.3rem;
  }
`;

const Greeting = styled(motion.div)`
  font-size: 1.2rem;
  color: #8b5cf6;
  font-weight: 600;
  margin-bottom: 1rem;
  font-family: 'Space Grotesk', sans-serif;

  @media (max-width: 1024px) {
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 0.6rem;
  }

  @media (max-width: 320px) {
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }
`;

const Name = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff, #e2e8f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Space Grotesk', sans-serif;

  @media (max-width: 1024px) {
    font-size: 3.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 2.2rem;
    margin-bottom: 0.6rem;
    line-height: 1.2;
  }

  @media (max-width: 320px) {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }
`;

const Title = styled(motion.div)`
  font-size: 1.5rem;
  color: #6366f1;
  font-weight: 600;
  margin-bottom: 2rem;
  min-height: 2rem;

  @media (max-width: 1024px) {
    font-size: 1.4rem;
    margin-bottom: 1.8rem;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    min-height: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 1.2rem;
    min-height: 1.6rem;
  }

  @media (max-width: 320px) {
    font-size: 1rem;
    margin-bottom: 1rem;
    min-height: 1.4rem;
  }
`;

const AnimatedTitle = styled(motion.div)`
  display: inline-block;
  animation: pulse 2s ease-in-out infinite;
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.05);
    }
  }
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 500px;

  @media (max-width: 1024px) {
    font-size: 1.05rem;
    max-width: 450px;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 100%;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 1.2rem;
    line-height: 1.4;
    padding: 0 0.5rem;
  }

  @media (max-width: 320px) {
    font-size: 0.85rem;
    margin-bottom: 1rem;
    line-height: 1.3;
    padding: 0 0.3rem;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    gap: 0.8rem;
  }

  @media (max-width: 768px) {
    justify-content: center;
    gap: 0.6rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  @media (max-width: 320px) {
    gap: 0.4rem;
  }
`;

const Button = styled(motion.a)`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  font-size: 1rem;

  &.primary {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    border: none;
  }

  &.secondary {
    background: transparent;
    color: #6366f1;
    border: 2px solid #6366f1;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
  }

  @media (max-width: 1024px) {
    padding: 11px 22px;
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 12px 24px;
    font-size: 0.85rem;
    width: 100%;
    max-width: 280px;
    text-align: center;
  }

  @media (max-width: 320px) {
    padding: 10px 20px;
    font-size: 0.8rem;
    max-width: 250px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const AvatarContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  width: 100%;

  @media (max-width: 1024px) {
    height: 450px;
  }

  @media (max-width: 768px) {
    height: 350px;
    margin-top: 2rem;
  }

  @media (max-width: 480px) {
    height: 280px;
    margin-top: 1.5rem;
  }

  @media (max-width: 320px) {
    height: 220px;
    margin-top: 1rem;
  }
`;


const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #8b5cf6;
  font-size: 0.9rem;
  font-weight: 500;
  z-index: 2;

  @media (max-width: 1024px) {
    bottom: 1.5rem;
    font-size: 0.85rem;
  }

  @media (max-width: 768px) {
    bottom: 1rem;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    bottom: 0.8rem;
    font-size: 0.75rem;
  }

  @media (max-width: 320px) {
    bottom: 0.5rem;
    font-size: 0.7rem;
  }
`;

const ScrollArrow = styled(motion.div)`
  width: 2px;
  height: 30px;
  background: linear-gradient(to bottom, #6366f1, transparent);
  margin-top: 0.5rem;

  @media (max-width: 1024px) {
    height: 25px;
    margin-top: 0.4rem;
  }

  @media (max-width: 768px) {
    height: 20px;
    margin-top: 0.3rem;
  }

  @media (max-width: 480px) {
    height: 18px;
    margin-top: 0.2rem;
  }

  @media (max-width: 320px) {
    height: 15px;
    margin-top: 0.1rem;
  }
`;

const Hero = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };


  return (
    <HeroContainer ref={ref}>
      <HeroContent>
        <TextContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <Greeting variants={itemVariants}>
              👋 Hello, I'm
            </Greeting>
            
            <Name variants={itemVariants}>
              Atharva Desai
            </Name>
            
            <Title variants={itemVariants}>
              <AnimatedTitle>
                Fullstack Developer
              </AnimatedTitle>
            </Title>
            
            <Description variants={itemVariants}>
              Results-driven Fullstack Developer with strong expertise in React.js, JavaScript (ES6+), 
              Django, and modern web development practices. Passionate about creating scalable, maintainable 
              applications with a focus on performance optimization and clean architecture.
            </Description>
            
            <ButtonGroup variants={itemVariants}>
              <Button
                className="primary"
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </Button>
              <Button
                className="secondary"
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </Button>
            </ButtonGroup>
          </motion.div>
        </TextContent>

        <AvatarContainer>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            style={{ width: '100%', height: '100%' }}
            shadows
          >
            {/* Enhanced Lighting for Realistic Avatar */}
            <ambientLight intensity={0.4} />
            <directionalLight 
              position={[5, 5, 5]} 
              intensity={1.2} 
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <pointLight position={[3, 3, 3]} intensity={0.8} color="#ffffff" />
            <pointLight position={[-3, 2, 2]} intensity={0.6} color="#6366f1" />
            <pointLight position={[0, -2, 3]} intensity={0.4} color="#8b5cf6" />
            <hemisphereLight 
              skyColor="#87CEEB" 
              groundColor="#fdbcb4" 
              intensity={0.3} 
            />
            <CodeVisualization 
              position={[0, -0.5, 0]} 
              scale={1.2} 
              isMobile={window.innerWidth <= 768}
            />
        </Canvas>
      </AvatarContainer>
      </HeroContent>

      <ScrollIndicator
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        Scroll Down
        <ScrollArrow
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </ScrollIndicator>
    </HeroContainer>
  );
};

export default Hero;
