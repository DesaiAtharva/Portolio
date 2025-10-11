import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { 
  FaReact, 
  FaJs, 
  FaHtml5, 
  FaCss3Alt, 
  FaNodeJs, 
  FaPython, 
  FaGitAlt, 
  FaGithub,
  FaDocker,
  FaAws,
  FaFigma,
  FaMobile,
  FaDatabase,
  FaCode,
  FaRocket,
  FaUsers
} from 'react-icons/fa';

const SkillsContainer = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  position: relative;
  overflow: hidden;
`;

const SkillsContent = styled.div`
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

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const SkillCategory = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(99, 102, 241, 0.1);
    border-color: rgba(99, 102, 241, 0.3);
    box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CategoryIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
`;

const SkillsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
`;

const SkillItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(99, 102, 241, 0.2);
    border-color: rgba(99, 102, 241, 0.5);
    transform: translateY(-2px);
  }
`;

const SkillIcon = styled.div`
  font-size: 2rem;
  color: #6366f1;
  margin-bottom: 0.5rem;
`;

const SkillName = styled.div`
  font-size: 0.9rem;
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const SkillLevel = styled.div`
  font-size: 0.8rem;
  color: #8b5cf6;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 0.5rem;
`;

const Progress = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  border-radius: 2px;
`;

const StatsSection = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(99, 102, 241, 0.1);
    border-color: rgba(99, 102, 241, 0.3);
  }
`;

const StatIcon = styled.div`
  font-size: 3rem;
  color: #6366f1;
  margin-bottom: 1rem;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #94a3b8;
  font-weight: 500;
`;


const Skills = () => {
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


  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: FaCode,
      skills: [
        { name: 'React.js', level: 95, icon: FaReact },
        { name: 'JavaScript', level: 90, icon: FaJs },
        { name: 'Next.js', level: 85, icon: FaRocket },
        { name: 'HTML5', level: 95, icon: FaHtml5 },
        { name: 'CSS3', level: 90, icon: FaCss3Alt },
        { name: 'Material-UI', level: 80, icon: FaCode }
      ]
    },
    {
      title: 'Backend Development',
      icon: FaDatabase,
      skills: [
        { name: 'Django', level: 85, icon: FaPython },
        { name: 'Node.js', level: 80, icon: FaNodeJs },
        { name: 'REST APIs', level: 90, icon: FaCode },
        { name: 'MySQL', level: 75, icon: FaDatabase },
        { name: 'PostgreSQL', level: 70, icon: FaDatabase }
      ]
    },
    {
      title: 'Tools & Technologies',
      icon: FaRocket,
      skills: [
        { name: 'Git', level: 90, icon: FaGitAlt },
        { name: 'GitHub', level: 95, icon: FaGithub },
        { name: 'Docker', level: 60, icon: FaDocker },
        { name: 'AWS', level: 70, icon: FaAws },
        { name: 'Figma', level: 75, icon: FaFigma },
        { name: 'FlutterFlow', level: 80, icon: FaMobile }
      ]
    }
  ];

  const stats = [
    { icon: FaCode, number: '10+', label: 'Projects Completed' },
    { icon: FaRocket, number: '1+', label: 'Years Experience' },
    { icon: FaDatabase, number: '50+', label: 'REST APIs Built' },
    { icon: FaDatabase, number: '1000+', label: 'APIs Integrated' }
  ];

  return (
    <SkillsContainer id="skills" ref={ref}>
      <SkillsContent>
        <SectionHeader>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <SectionTitle variants={itemVariants}>
              Fullstack Skills & Expertise
            </SectionTitle>
            <SectionSubtitle variants={itemVariants}>
              Frontend & Backend Technologies I Work With
            </SectionSubtitle>
          </motion.div>
        </SectionHeader>

        <SkillsGrid>
          {skillCategories.map((category, categoryIndex) => (
            <SkillCategory
              key={categoryIndex}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CategoryTitle>
                <CategoryIcon>
                  <category.icon />
                </CategoryIcon>
                {category.title}
              </CategoryTitle>

              <SkillsList>
                {category.skills.map((skill, skillIndex) => (
                  <SkillItem
                    key={skillIndex}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SkillIcon>
                      <skill.icon />
                    </SkillIcon>
                    <SkillName>{skill.name}</SkillName>
                    <SkillLevel>{skill.level}%</SkillLevel>
                    <ProgressBar>
                      <Progress
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                      />
                    </ProgressBar>
                  </SkillItem>
                ))}
              </SkillsList>
            </SkillCategory>
          ))}
        </SkillsGrid>

        <StatsSection
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <StatIcon>
                <stat.icon />
              </StatIcon>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsSection>
      </SkillsContent>
    </SkillsContainer>
  );
};

export default Skills;
