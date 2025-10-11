import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text, Html } from '@react-three/drei';
import * as THREE from 'three';

const CodeVisualization = ({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0], isMobile = false }) => {
  const groupRef = useRef();
  const [currentCodeIndex, setCurrentCodeIndex] = useState(0);
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Code snippets to cycle through
  const codeSnippets = [
    `// React Component
const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);
  
  return (
    <div className="portfolio">
      {projects.map(project => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
};`,
    `# Django API View
from rest_framework.views import APIView
from rest_framework.response import Response

class ProjectAPIView(APIView):
    def get(self, request):
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)`,
    `// JavaScript Function
const optimizePerformance = (data) => {
  return data
    .filter(item => item.active)
    .map(item => ({
      ...item,
      score: calculateScore(item)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
};

const calculateScore = (item) => {
  return item.views * 0.7 + item.likes * 0.3;
};`,
    `# Python Data Processing
import pandas as pd
import numpy as np

def analyze_user_data(df):
    # Clean and process data
    df = df.dropna()
    df['engagement_score'] = (
        df['clicks'] * 0.4 + 
        df['time_spent'] * 0.6
    )
    
    # Group by category
    category_stats = df.groupby('category').agg({
        'engagement_score': ['mean', 'std'],
        'user_id': 'count'
    })
    
    return category_stats.round(2)`
  ];

  // Typing animation effect
  useEffect(() => {
    if (!isTyping) return;
    
    const currentSnippet = codeSnippets[currentCodeIndex];
    let charIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (charIndex < currentSnippet.length) {
        setDisplayedCode(currentSnippet.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setDisplayedCode('');
          setCurrentCodeIndex((prev) => (prev + 1) % codeSnippets.length);
        }, 2000);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [currentCodeIndex, isTyping]);

  // Floating animation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 0.3) * 0.1;
      groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.05;
    }
  });

  // Materials for code elements
  const screenMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#0a0a0a',
    roughness: 0.1,
    metalness: 0.0,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
    transmission: 0.0,
    thickness: 0.0,
    ior: 1.5,
    sheen: 0.0,
  }), []);

  const frameMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#1f2937',
    roughness: 0.3,
    metalness: 0.2,
    clearcoat: 0.5,
    clearcoatRoughness: 0.2,
    transmission: 0.0,
    thickness: 0.0,
    ior: 1.4,
    sheen: 0.1,
    sheenColor: '#1f2937',
    sheenRoughness: 0.8,
  }), []);

  const iconMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#6366f1',
    roughness: 0.2,
    metalness: 0.1,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
    transmission: 0.0,
    thickness: 0.0,
    ior: 1.5,
    sheen: 0.2,
    sheenColor: '#6366f1',
    sheenRoughness: 0.5,
  }), []);

  // Responsive dimensions
  const screenWidth = isMobile ? 3.0 : 4.5;
  const screenHeight = isMobile ? 2.1 : 3.2;
  const frameWidth = isMobile ? 3.1 : 4.6;
  const frameHeight = isMobile ? 2.2 : 3.3;

  return (
    <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
      {/* Main Code Editor Screen - Responsive */}
      <Box args={[screenWidth, screenHeight, 0.1]} position={[0, 0, 0]}>
        <primitive object={screenMaterial} />
      </Box>
      
      {/* Screen Frame - Responsive */}
      <Box args={[frameWidth, frameHeight, 0.15]} position={[0, 0, -0.05]}>
        <primitive object={frameMaterial} />
      </Box>

      {/* Code Display - Made Even Bigger */}
      <Html
        position={[0, 0, 0.06]}
        transform
        occlude
        distanceFactor={1}
        style={{
          width: isMobile ? '450px' : '700px',
          height: isMobile ? '320px' : '500px',
          background: 'transparent',
          pointerEvents: 'none',
        }}
      >
        <div style={{
          fontFamily: 'Monaco, Consolas, "Courier New", monospace',
          fontSize: isMobile ? '12px' : '16px',
          lineHeight: '1.6',
          color: '#00ff00',
          background: 'rgba(0, 0, 0, 0.8)',
          padding: isMobile ? '20px' : '30px',
          borderRadius: '8px',
          border: '1px solid #333',
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textShadow: '0 0 10px #00ff00',
        }}>
          {displayedCode}
          <span style={{ 
            animation: 'blink 1s infinite',
            color: '#00ff00',
            fontWeight: 'bold'
          }}>|</span>
        </div>
      </Html>

      {/* Floating Tech Icons - Made Even Bigger and Repositioned */}
      <group position={[0, 0, 0.2]}>
        {/* React Icon */}
        <Box args={isMobile ? [0.3, 0.3, 0.08] : [0.5, 0.5, 0.1]} position={isMobile ? [-1.5, 1.2, 0] : [-2.0, 1.5, 0]} rotation={[0, Math.PI / 4, 0]}>
          <primitive object={iconMaterial} />
        </Box>
        <Text
          position={isMobile ? [-1.5, 0.8, 0.1] : [-2.0, 1.0, 0.1]}
          fontSize={isMobile ? 0.1 : 0.15}
          color="#61dafb"
          anchorX="center"
          anchorY="middle"
        >
          React
        </Text>

        {/* JavaScript Icon */}
        <Box args={isMobile ? [0.3, 0.3, 0.08] : [0.5, 0.5, 0.1]} position={isMobile ? [1.5, 1.2, 0] : [2.0, 1.5, 0]} rotation={[0, -Math.PI / 4, 0]}>
          <primitive object={iconMaterial} />
        </Box>
        <Text
          position={isMobile ? [1.5, 0.8, 0.1] : [2.0, 1.0, 0.1]}
          fontSize={isMobile ? 0.1 : 0.15}
          color="#f7df1e"
          anchorX="center"
          anchorY="middle"
        >
          JS
        </Text>

        {/* Python Icon */}
        <Box args={isMobile ? [0.3, 0.3, 0.08] : [0.5, 0.5, 0.1]} position={isMobile ? [-1.5, -1.2, 0] : [-2.0, -1.5, 0]} rotation={[0, Math.PI / 6, 0]}>
          <primitive object={iconMaterial} />
        </Box>
        <Text
          position={isMobile ? [-1.5, -1.6, 0.1] : [-2.0, -2.0, 0.1]}
          fontSize={isMobile ? 0.1 : 0.15}
          color="#3776ab"
          anchorX="center"
          anchorY="middle"
        >
          Python
        </Text>

        {/* Django Icon - Made Even Bigger with New Vibrant Color */}
        <Box args={isMobile ? [0.4, 0.4, 0.1] : [0.7, 0.7, 0.12]} position={isMobile ? [1.5, -1.2, 0] : [2.0, -1.5, 0]} rotation={[0, -Math.PI / 6, 0]}>
          <primitive object={iconMaterial} />
        </Box>
        <Text
          position={isMobile ? [1.5, -1.6, 0.1] : [2.0, -2.0, 0.1]}
          fontSize={isMobile ? 0.12 : 0.18}
          color="#00ff41"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          Django
        </Text>
      </group>

      {/* Floating Code Symbols - Made Even Bigger */}
      <group position={[0, 0, 0.3]}>
        <Text
          position={[-1.5, 0.4, 0]}
          fontSize={0.25}
          color="#6366f1"
          anchorX="center"
          anchorY="middle"
        >
          {'{'}
        </Text>
        <Text
          position={[1.5, 0.4, 0]}
          fontSize={0.25}
          color="#6366f1"
          anchorX="center"
          anchorY="middle"
        >
          {'}'}
        </Text>
        <Text
          position={[-0.8, -0.5, 0]}
          fontSize={0.2}
          color="#8b5cf6"
          anchorX="center"
          anchorY="middle"
        >
          {'</>'}
        </Text>
        <Text
          position={[0.8, -0.5, 0]}
          fontSize={0.2}
          color="#8b5cf6"
          anchorX="center"
          anchorY="middle"
        >
          {'</>'}
        </Text>
        {/* Additional Django-specific symbol with new vibrant color */}
        <Text
          position={[0, -1.0, 0]}
          fontSize={0.22}
          color="#00ff41"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {'Django'}
        </Text>
      </group>
    </group>
  );
};

export default CodeVisualization;
