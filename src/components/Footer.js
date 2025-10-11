import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 4rem 2rem 2rem;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 2rem 1rem 1rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;

  &:first-child {
    text-align: left;
  }

  @media (max-width: 768px) {
    text-align: center;
    gap: 0.8rem;
  }

  @media (max-width: 480px) {
    gap: 0.6rem;
  }
`;

const FooterTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 0.6rem;
  }
`;

const FooterText = styled.p`
  color: #94a3b8;
  line-height: 1.6;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    line-height: 1.4;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 480px) {
    gap: 0.4rem;
  }
`;

const FooterLink = styled(motion.a)`
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: #6366f1;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1.2rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
    margin-bottom: 1rem;
  }
`;

const SocialLink = styled(motion.a)`
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6366f1;
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(99, 102, 241, 0.1);
    border-color: rgba(99, 102, 241, 0.3);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 2rem;

  @media (max-width: 1024px) {
    gap: 1.5rem;
    padding-top: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1rem;
    padding-top: 1.2rem;
  }

  @media (max-width: 480px) {
    gap: 0.8rem;
    padding-top: 1rem;
  }

  @media (max-width: 320px) {
    gap: 0.6rem;
    padding-top: 0.8rem;
  }
`;

const Copyright = styled.p`
  color: #94a3b8;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-self: start;

  @media (max-width: 1024px) {
    font-size: 0.85rem;
  }

  @media (max-width: 768px) {
    justify-self: center;
    font-size: 0.8rem;
    gap: 0.4rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    gap: 0.3rem;
    flex-direction: column;
    text-align: center;
  }

  @media (max-width: 320px) {
    font-size: 0.7rem;
    gap: 0.2rem;
  }
`;



const Footer = () => {
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


  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/atharva--desai/', label: 'LinkedIn' },
    { icon: FaEnvelope, href: 'mailto:desaiatharva20@gmail.com', label: 'Email' }
  ];

  return (
    <FooterContainer>
      <FooterContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <FooterTop>
            <FooterSection variants={itemVariants}>
              <FooterTitle>Atharva Desai</FooterTitle>
              <FooterText>
                Results-driven Fullstack Developer with strong expertise in React.js, 
                JavaScript, Django, and modern web development practices. Passionate about 
                creating scalable, maintainable applications.
              </FooterText>
            </FooterSection>

            <FooterSection variants={itemVariants}>
              <FooterTitle>Quick Links</FooterTitle>
              <FooterLinks>
                {quickLinks.map((link, index) => (
                  <FooterLink
                    key={index}
                    href={link.href}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.name}
                  </FooterLink>
                ))}
              </FooterLinks>
            </FooterSection>

            <FooterSection variants={itemVariants}>
              <FooterTitle>Contact Info</FooterTitle>
              <FooterText>
                <strong>Email:</strong> desaiatharva20@gmail.com<br />
                <strong>Phone:</strong> (+91) 9860874908<br />
                <strong>Location:</strong> Pune, Maharashtra, India
              </FooterText>
            </FooterSection>
          </FooterTop>

          <SocialLinks variants={itemVariants}>
            {socialLinks.map((social, index) => (
              <SocialLink
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon />
              </SocialLink>
            ))}
          </SocialLinks>

          <FooterBottom variants={itemVariants}>
            <Copyright>
              © 2024 Atharva Desai. All rights reserved.
            </Copyright>
            
          </FooterBottom>
        </motion.div>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
