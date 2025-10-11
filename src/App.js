import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Components
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import ParticleBackground from './components/ParticleBackground';
import ScrollToTop from './components/ScrollToTop';

// 3D Scene Component
const Scene3D = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -3 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Environment preset="night" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
};

// Styled Components
const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  overflow-x: hidden;
`;

const MainContent = styled.main`
  position: relative;
  z-index: 10;
`;

function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AppContainer>
      <Suspense fallback={<div>Loading...</div>}>
        <Scene3D />
      </Suspense>
      <ParticleBackground />
      <Navigation />
      <MainContent>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </MainContent>
      <Footer />
      <ScrollToTop />
    </AppContainer>
  );
}

export default App;
