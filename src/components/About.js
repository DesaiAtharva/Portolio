import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { FaCode, FaRocket, FaUsers, FaLightbulb, FaGraduationCap, FaAward, FaReact, FaPython } from 'react-icons/fa';

const AboutContainer = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  position: relative;
  overflow: hidden;
`;

const AboutContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const TextSection = styled.div`
  z-index: 2;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Space Grotesk', sans-serif;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #8b5cf6;
  margin-bottom: 2rem;
  font-weight: 600;
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  color: #94a3b8;
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const HighlightText = styled.span`
  color: #6366f1;
  font-weight: 600;
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin: 2rem 0;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(99, 102, 241, 0.1);
    border-color: rgba(99, 102, 241, 0.3);
  }
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 900;
  color: #6366f1;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #94a3b8;
  font-weight: 500;
`;

const VisualSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
`;

const SkillsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 400px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SkillCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px) scale(1.05);
    background: rgba(99, 102, 241, 0.1);
    border-color: rgba(99, 102, 241, 0.3);
    box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
  }
`;

const SkillIcon = styled.div`
  font-size: 2rem;
  color: #6366f1;
  margin-bottom: 1rem;
`;

const SkillName = styled.div`
  font-size: 0.9rem;
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const SkillLevel = styled.div`
  font-size: 0.8rem;
  color: #8b5cf6;
`;


const About = () => {
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


  const skills = [
    { name: 'React.js', level: 'Expert', icon: FaReact },
    { name: 'Django / FastAPI', level: 'Expert', icon: FaPython },
    { name: 'RAG Pipelines', level: 'Expert', icon: FaRocket },
    { name: 'Agentic AI / LLMs', level: 'Advanced', icon: FaCode },
    { name: 'Next.js / Redux', level: 'Advanced', icon: FaReact },
    { name: 'Team Leadership', level: 'Expert', icon: FaUsers },
  ];

  const stats = [
    { number: '10+', label: 'Projects Completed' },
    { number: '2+', label: 'Years Experience' },
    { number: '99.9%', label: 'Uptime Achieved' },
    { number: '50+', label: 'REST APIs Built' },
  ];

  return (
    <AboutContainer id="about" ref={ref}>
      <AboutContent>
        <TextSection>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <SectionTitle variants={itemVariants}>
              About Me
            </SectionTitle>
            
            <SectionSubtitle variants={itemVariants}>
              Full Stack + AI Engineer & System Architect
            </SectionSubtitle>
            
            <Description variants={itemVariants}>
              I'm a <HighlightText>results-driven Full Stack + AI Engineer</HighlightText> with 2 years of experience 
              building production-grade applications across municipal/government and enterprise systems. 
              Specialized in architecting intelligent RAG pipelines, Agentic AI architectures, real-time dashboards, 
              and automated data processing pipelines with a strong focus on clean architecture, security, and performance.
            </Description>
            
            <Description variants={itemVariants}>
              With extensive hands-on experience in <HighlightText>Agile environments</HighlightText> and <HighlightText>multi-department integrations</HighlightText>, 
              I design systems that combine robust backends with responsive, highly polished user interfaces. I've built <HighlightText>50+ REST APIs</HighlightText>, 
              integrated <HighlightText>1000+ APIs</HighlightText>, and maintained <HighlightText>99.9% uptime</HighlightText> on complex productions.
            </Description>

            <StatsGrid variants={itemVariants}>
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <StatNumber>{stat.number}</StatNumber>
                  <StatLabel>{stat.label}</StatLabel>
                </StatCard>
              ))}
            </StatsGrid>
          </motion.div>
        </TextSection>

        <VisualSection>
          <SkillsContainer
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {skills.map((skill, index) => (
              <SkillCard
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <SkillIcon>
                  <skill.icon />
                </SkillIcon>
                <SkillName>{skill.name}</SkillName>
                <SkillLevel>{skill.level}</SkillLevel>
              </SkillCard>
            ))}
          </SkillsContainer>
        </VisualSection>
      </AboutContent>
    </AboutContainer>
  );
};

export default About;
