import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa';

const ExperienceContainer = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #16213e 0%, #0a0a0a 50%, #1a1a2e 100%);
  position: relative;
  overflow: hidden;
`;

const ExperienceContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
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
  font-weight: 600;
`;

const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, #6366f1, #8b5cf6, #ec4899);
    transform: translateX(-50%);

    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;

  &:nth-child(odd) {
    flex-direction: row;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      margin-left: 2rem;
    }
  }

  &:nth-child(even) {
    flex-direction: row-reverse;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      margin-left: 2rem;
    }
  }
`;

const TimelineMarker = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 50%;
  border: 4px solid #0a0a0a;
  z-index: 2;

  @media (max-width: 768px) {
    left: 20px;
    transform: translate(-50%, -50%);
  }
`;

const ExperienceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  width: 45%;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(99, 102, 241, 0.1);
    border-color: rgba(99, 102, 241, 0.3);
    box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    width: 0;
    height: 0;
    border: 15px solid transparent;
    transform: translateY(-50%);

    @media (max-width: 768px) {
      display: none;
    }
  }

  &:nth-child(odd) &::before {
    right: -30px;
    border-left-color: rgba(255, 255, 255, 0.1);
  }

  &:nth-child(even) &::before {
    left: -30px;
    border-right-color: rgba(255, 255, 255, 0.1);
  }
`;

const CompanyHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const CompanyIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
`;

const CompanyInfo = styled.div`
  flex: 1;
`;

const CompanyName = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.25rem;
`;

const Position = styled.p`
  font-size: 1rem;
  color: #6366f1;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Duration = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #8b5cf6;
  margin-bottom: 1rem;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #94a3b8;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const Achievements = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Achievement = styled.li`
  color: #94a3b8;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;

  &::before {
    content: '▶';
    position: absolute;
    left: 0;
    color: #6366f1;
    font-size: 0.8rem;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const TechTag = styled.span`
  background: rgba(99, 102, 241, 0.2);
  color: #6366f1;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(99, 102, 241, 0.3);
`;


const Experience = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };


  const experiences = [
    {
      company: 'The DetaTech Labs Pvt. Ltd',
      position: 'Software Developer — React.js — Django — REST APIs',
      duration: 'August 2024 – Present',
      location: 'Pune, India',
      icon: FaBriefcase,
      description: 'Spearheading frontend development using React.js, Redux, and REST APIs, improving registration efficiency by 20%.',
      achievements: [
        'Built modular, reusable UI components, enhancing maintainability by 30%',
        'Delivered complete frontend UI integration and partial backend development',
        'Optimized API response handling with caching, reducing load times by 15%',
        'Followed Agile methodology and Git-based CI/CD workflows'
      ],
      techStack: ['React.js', 'Redux', 'Django', 'REST APIs', 'Agile', 'Git']
    },
    {
      company: 'AccioJob',
      position: 'MERN Stack Developer',
      duration: 'April 2023 – Feb 2024',
      location: 'Pune, India',
      icon: FaBriefcase,
      description: 'Earned certifications in HTML, CSS, JavaScript, and React.js. Built fully functional, responsive e-commerce site.',
      achievements: [
        'Earned certifications in HTML, CSS, JavaScript, and React.js',
        'Built a fully functional, responsive e-commerce site using MERN stack',
        'Developed skills in modern web development practices'
      ],
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Node.js', 'MongoDB']
    }
  ];

  return (
    <ExperienceContainer id="experience" ref={ref}>
      <ExperienceContent>
        <SectionHeader>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <SectionTitle variants={itemVariants}>
              Experience
            </SectionTitle>
            <SectionSubtitle variants={itemVariants}>
              My Professional Journey
            </SectionSubtitle>
          </motion.div>
        </SectionHeader>

        <Timeline>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {experiences.map((exp, index) => (
              <TimelineItem key={index} variants={itemVariants}>
                <TimelineMarker />
                <ExperienceCard
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CompanyHeader>
                    <CompanyIcon>
                      <exp.icon />
                    </CompanyIcon>
                    <CompanyInfo>
                      <CompanyName>{exp.company}</CompanyName>
                      <Position>{exp.position}</Position>
                    </CompanyInfo>
                  </CompanyHeader>

                  <Duration>
                    <FaCalendarAlt />
                    {exp.duration}
                  </Duration>

                  <Location>
                    <FaMapMarkerAlt />
                    {exp.location}
                  </Location>

                  <Description>{exp.description}</Description>

                  <Achievements>
                    {exp.achievements.map((achievement, idx) => (
                      <Achievement key={idx}>{achievement}</Achievement>
                    ))}
                  </Achievements>

                  <TechStack>
                    {exp.techStack.map((tech, idx) => (
                      <TechTag key={idx}>{tech}</TechTag>
                    ))}
                  </TechStack>
                </ExperienceCard>
              </TimelineItem>
            ))}
          </motion.div>
        </Timeline>
      </ExperienceContent>
    </ExperienceContainer>
  );
};

export default Experience;
