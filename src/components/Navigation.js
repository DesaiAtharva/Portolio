import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { FaBars, FaTimes, FaHome, FaUser, FaBriefcase, FaCode, FaEnvelope } from 'react-icons/fa';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  @media (max-width: 1024px) {
    padding: 0.8rem 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.8rem;
  }

  @media (max-width: 320px) {
    padding: 0.4rem 0.5rem;
  }
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.div)`
  font-size: 1.8rem;
  font-weight: 900;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Space Grotesk', sans-serif;
  cursor: pointer;

  @media (max-width: 1024px) {
    font-size: 1.6rem;
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }

  @media (max-width: 320px) {
    font-size: 1rem;
  }
`;

const NavLinks = styled(motion.div)`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  padding: 0.5rem 0;
  transition: color 0.3s ease;

  &:hover {
    color: #6366f1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  &.active {
    color: #6366f1;
    
    &::after {
      width: 100%;
    }
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  z-index: 1001;

  @media (max-width: 480px) {
    width: 280px;
    padding: 1.5rem;
  }

  @media (max-width: 320px) {
    width: 260px;
    padding: 1rem;
  }
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

const MobileMenuLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const MobileNavLink = styled(motion.a)`
  color: #ffffff;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(99, 102, 241, 0.1);
    color: #6366f1;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home', icon: FaHome },
    { name: 'About', href: '#about', icon: FaUser },
    { name: 'Experience', href: '#experience', icon: FaBriefcase },
    { name: 'Projects', href: '#projects', icon: FaCode },
    { name: 'Contact', href: '#contact', icon: FaEnvelope },
  ];

  const handleNavClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <NavContainer
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: isScrolled 
            ? 'rgba(10, 10, 10, 0.95)' 
            : 'rgba(10, 10, 10, 0.8)',
        }}
      >
        <NavContent>
          <Logo
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick('#home')}
          >
            AD
          </Logo>

          <NavLinks>
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                href={item.href}
                className={activeSection === item.href.slice(1) ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </NavLink>
            ))}
          </NavLinks>

          <MobileMenuButton
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </NavContent>
      </NavContainer>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileMenu
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <MobileMenuHeader>
                <Logo>Atharva Desai</Logo>
                <MobileMenuButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes />
                </MobileMenuButton>
              </MobileMenuHeader>

              <MobileMenuLinks>
                {navItems.map((item) => (
                  <MobileNavLink
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon />
                    {item.name}
                  </MobileNavLink>
                ))}
              </MobileMenuLinks>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
