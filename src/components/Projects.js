import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { FaGithub, FaExternalLinkAlt, FaCode, FaRocket, FaUsers, FaCog, FaDesktop, FaMicrochip } from 'react-icons/fa';

const ProjectsContainer = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #0a0a0a 50%, #16213e 100%);
  position: relative;
  overflow: hidden;
`;

const ProjectsContent = styled.div`
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

const FilterTabs = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterTab = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border: 2px solid rgba(99, 102, 241, 0.3);
  background: transparent;
  color: #94a3b8;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &.active {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    border-color: transparent;
  }

  &:hover:not(.active) {
    border-color: #6366f1;
    color: #6366f1;
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px) scale(1.02);
    background: rgba(99, 102, 241, 0.1);
    border-color: rgba(99, 102, 241, 0.3);
    box-shadow: 0 25px 50px rgba(99, 102, 241, 0.2);
  }
`;

const ProjectImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
`;

const ProjectOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ProjectCard}:hover & {
    opacity: 1;
  }
`;

const ConfidentialityMessage = styled(motion.div)`
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 12px;
  padding: 15px 20px;
  color: #ffffff;
  font-size: 0.9rem;
  text-align: center;
  line-height: 1.4;
  max-width: 280px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 12px 16px;
    max-width: 250px;
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const ProjectFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
`;

const Feature = styled.li`
  color: #94a3b8;
  margin-bottom: 0.25rem;
  padding-left: 1.5rem;
  position: relative;
  font-size: 0.85rem;

  &::before {
    content: '▶';
    position: absolute;
    left: 0;
    color: #6366f1;
    font-size: 0.7rem;
  }
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TechTag = styled.span`
  background: rgba(99, 102, 241, 0.2);
  color: #6366f1;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid rgba(99, 102, 241, 0.3);
`;

const ProjectStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Stat = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #6366f1;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: #94a3b8;
`;


const Projects = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const [activeFilter, setActiveFilter] = useState('all');

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


  const filters = ['all', 'frontend', 'fullstack'];

  const projects = [
    {
      id: 1,
      title: 'Vetrina Project',
      description: 'Spearheaded frontend development using React.js, Redux, and REST APIs, improving registration efficiency by 20%.',
      features: [
        'Built modular, reusable UI components',
        'Enhanced maintainability by 30%',
        'Optimized API response handling with caching',
        'Reduced load times by 15%'
      ],
      tech: ['React.js', 'Redux', 'REST APIs', 'Django'],
      category: 'frontend',
      icon: FaCode,
      stats: { efficiency: '20%', maintainability: '30%' },
      github: '#',
      live: '#'
    },
    {
      id: 2,
      title: 'Hostel Management System',
      description: 'Led a 5-member Agile team to develop role-based dashboards using React.js and Material-UI.',
      features: [
        'Role-based dashboards',
        'Integrated 100+ REST APIs',
        '10+ role-specific features',
        'JWT-based authentication'
      ],
      tech: ['React.js', 'Material-UI', 'JWT', 'Agile'],
      category: 'fullstack',
      icon: FaUsers,
      stats: { efficiency: '40%', apis: '100+' },
      github: '#',
      live: '#'
    },
    {
      id: 3,
      title: 'Elephant Tank Innovation Platform',
      description: 'Contributed to an innovation platform supporting 10K+ student registrations and 4K+ submissions.',
      features: [
        '10K+ student registrations',
        '4K+ submissions',
        '200+ AI evaluations',
        '500+ API integrations'
      ],
      tech: ['React.js', 'Django', 'AI', 'AWS'],
      category: 'fullstack',
      icon: FaRocket,
      stats: { users: '10K+', apis: '500+' },
      github: '#',
      live: '#'
    },
    {
      id: 4,
      title: 'WeightBridge Project',
      description: 'Built automated vehicle weight calculation system integrating weighbridge machines and camera OCR.',
      features: [
        'Automated weight calculation',
        'Camera OCR integration',
        'AI-powered number plate recognition',
        'Reduced manual errors by 90%'
      ],
      tech: ['Django', 'OCR', 'AI', 'Camera'],
      category: 'fullstack',
      icon: FaCog,
      stats: { accuracy: '90%', automation: '100%' },
      github: '#',
      live: '#'
    },
    {
      id: 5,
      title: 'BlinkCloneXperience',
      description: 'Developed a Blinkit UI/UX clone web application using React.js, focusing on seamless design and responsiveness.',
      features: [
        'Seamless UI/UX design',
        'Fully responsive',
        'Optimized performance',
        'Modern React patterns'
      ],
      tech: ['React.js', 'HTML5', 'CSS3', 'JavaScript'],
      category: 'frontend',
      icon: FaCode,
      stats: { performance: '95%', responsive: '100%' },
      github: '#',
      live: '#'
    },
    {
      id: 6,
      title: 'Cricket Tournament Management',
      description: 'Developing a sports management platform with match creation, player tracking, and digital records.',
      features: [
        'Match creation system',
        'Player tracking',
        'Digital records',
        'Live score updates with WebSockets'
      ],
      tech: ['React.js', 'WebSockets', 'Real-time', 'Sports'],
      category: 'fullstack',
      icon: FaRocket,
      stats: { realtime: '100%', features: '10+' },
      github: '#',
      live: '#'
    },
    {
      id: 7,
      title: 'Pune Startup Expo',
      description: 'Organized a startup expo with 800+ attendees, evaluating 500+ projects, shortlisting 30, and securing 20 funded projects.',
      features: [
        '800+ attendees',
        '500+ projects evaluated',
        '30 shortlisted projects',
        '20 funded projects',
        'AI-assisted evaluation modules'
      ],
      tech: ['React.js', 'Django', 'AI', 'PostgreSQL'],
      category: 'fullstack',
      icon: FaRocket,
      stats: { attendees: '800+', projects: '500+' },
      github: '#',
      live: '#'
    },
    {
      id: 8,
      title: 'Management as a Service (MaaS)',
      description: 'Directed a 5-member team to build a task assignment system, improving productivity tracking by 30%.',
      features: [
        'Task assignment system',
        'Productivity tracking',
        '20+ digital learning resources',
        'Bi-weekly release cycle',
        '1K+ concurrent users'
      ],
      tech: ['Django', 'REST Framework', 'Microservices', 'Agile'],
      category: 'fullstack',
      icon: FaUsers,
      stats: { productivity: '30%', users: '1K+' },
      github: '#',
      live: '#'
    },
    {
      id: 9,
      title: 'Performance Management Service (PMS)',
      description: 'Delivered PMS solution for Vetrina, integrating 50+ REST APIs to optimize KPI tracking and reporting.',
      features: [
        'KPI tracking and reporting',
        '50+ REST APIs integrated',
        'Chart.js/D3.js dashboards',
        'Real-time business insights'
      ],
      tech: ['React.js', 'Django', 'Chart.js', 'D3.js'],
      category: 'fullstack',
      icon: FaCode,
      stats: { apis: '50+', insights: 'Real-time' },
      github: '#',
      live: '#'
    },
    {
      id: 10,
      title: 'DiGi Campus',
      description: 'Contributing to full-stack development with React.js frontend and Django backend, supporting 8 user roles and 80+ modules.',
      features: [
        '8 user roles support',
        '80+ modules',
        'Jest and PyTest testing',
        '40% deployment reliability',
        'Agile Scrum methodology'
      ],
      tech: ['React.js', 'Django', 'Jest', 'PyTest'],
      category: 'fullstack',
      icon: FaUsers,
      stats: { roles: '8', modules: '80+' },
      github: '#',
      live: '#'
    }
  ];

  const filteredProjects = projects.filter(project => 
    activeFilter === 'all' || project.category === activeFilter
  );

  return (
    <ProjectsContainer id="projects" ref={ref}>
      <ProjectsContent>
        <SectionHeader>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <SectionTitle variants={itemVariants}>
              Projects
            </SectionTitle>
            <SectionSubtitle variants={itemVariants}>
              My Recent Work & Achievements
            </SectionSubtitle>
          </motion.div>
        </SectionHeader>

        <FilterTabs
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {filters.map((filter) => (
            <FilterTab
              key={filter}
              className={activeFilter === filter ? 'active' : ''}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </FilterTab>
          ))}
        </FilterTabs>

        <ProjectsGrid
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ProjectImage>
                <project.icon />
                <ProjectOverlay>
                  <ConfidentialityMessage>
                    Due to confidentiality, project links are not shared publicly. 
                    If you're interested, please connect and we'll showcase all our projects.
                  </ConfidentialityMessage>
                </ProjectOverlay>
              </ProjectImage>

              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>

                <ProjectFeatures>
                  {project.features.slice(0, 3).map((feature, index) => (
                    <Feature key={index}>{feature}</Feature>
                  ))}
                </ProjectFeatures>

                <ProjectTech>
                  {project.tech.map((tech, index) => (
                    <TechTag key={index}>{tech}</TechTag>
                  ))}
                </ProjectTech>

                <ProjectStats>
                  {Object.entries(project.stats).map(([key, value], index) => (
                    <Stat key={index}>
                      <StatNumber>{value}</StatNumber>
                      <StatLabel>{key}</StatLabel>
                    </Stat>
                  ))}
                </ProjectStats>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </ProjectsContent>
    </ProjectsContainer>
  );
};

export default Projects;
