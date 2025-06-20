'use client';

import { useTheme } from '@/context/ThemeContext';
import { orbits, projects, solarElements } from '@/data/portfolio-data';
import styles from '@/styles/ProjectCircle.module.css';
import { motion, useAnimation } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import DecorativeElement from './SolarSystem/DecorativeElement';
import OrbitingProject from './SolarSystem/OrbitingProject';

const ProjectCircle = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [orbitRotation, setOrbitRotation] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const controls = useAnimation();
  const isMobile = useCallback(() => window.innerWidth <= 768, []);
  const [isMobileView, setIsMobileView] = useState(false);
  const [projectRadius, setProjectRadius] = useState(220);
  const [activeTheme, setActiveThemeState] = useState('');
  const { setActiveTheme } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileView(isMobile);
      setProjectRadius(isMobile ? 160 : 220);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (autoRotate && !hoveredProject && !selectedProject) {
      const interval = setInterval(() => {
        setOrbitRotation(prev => (prev + (isMobileView ? 0.1 : 0.2)) % 360);
      }, isMobileView ? 100 : 50);
      return () => clearInterval(interval);
    }
  }, [autoRotate, hoveredProject, selectedProject, isMobileView]);

  const handleProjectClick = async (url: string, id: number) => {
    setSelectedProject(id);
    await controls.start({
      scale: [1, 1.1, 1],
      transition: { duration: 0.3 }
    });
    window.open(url, '_blank', 'noopener,noreferrer');
    setSelectedProject(null);
  };

  const calculatePosition = (index: number, total: number, radius: number) => {
    const angle = (360 / total) * index + orbitRotation;
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    
    return { x, y, rotation: 0 };
  };

  return (
    <div className={`project-circle-container ${isMobileView ? 'scale-75 -mt-20' : ''}`}>
      {/* Orbit Rings */}
      {Object.entries(orbits).map(([orbitClass, radius]) => (
        <div key={orbitClass} className={`orbit-ring ${orbitClass}`} style={{
          width: `${radius * (isMobileView ? 1.5 : 2)}px`,
          height: `${radius * (isMobileView ? 1.5 : 2)}px`,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          border: '1px solid rgba(234, 88, 12, 0.15)',
          pointerEvents: 'none'
        }}>
          <motion.div
            className="ring-effect"
            animate={{ rotate: orbitClass.includes('inner') ? -360 : 360 }}
            transition={{
              duration: orbitClass.includes('inner') ? (isMobileView ? 90 : 60) : 
                       orbitClass.includes('middle') ? (isMobileView ? 120 : 80) : 
                       (isMobileView ? 150 : 100),
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      ))}

      {/* Solar Elements */}
      <div className="solar-system">
        {solarElements.map((element, index) => {
          const radius = orbits[element.orbitClass] * (isMobileView ? 0.75 : 1);
          const position = calculatePosition(index, solarElements.length, radius);
          
          return (
            <DecorativeElement
              key={element.id}
              element={element}
              position={position}
              isMobileView={isMobileView}
            />
          );
        })}
      </div>

      {/* Project Cards */}
      <div
        className={styles['orbit-container-rotate']}
        style={{
          width: isMobileView ? 320 : 440,
          height: isMobileView ? 320 : 440,
        }}
      >
        <div className={styles['orbit-container']}>
          {projects.map((project, index) => {
            const position = calculatePosition(index, projects.length, projectRadius);
            return (
              <OrbitingProject
                key={project.id}
                project={project}
                position={position}
                isMobileView={isMobileView}
                isSelected={selectedProject === project.id}
                handleProjectClick={handleProjectClick}
                setHoveredProject={setHoveredProject}
              />
            );
          })}
        </div>
      </div>

      {/* Central Hub */}
      <motion.div 
        className="central-hub"
        animate={{ rotate: 360 }}
        transition={{ 
          duration: isMobileView ? 45 : 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        style={{
          width: isMobileView ? '100px' : '150px',
          height: isMobileView ? '100px' : '150px',
          left: `calc(50% - ${isMobileView ? '50px' : '75px'})`,
          top: `calc(50% - ${isMobileView ? '50px' : '75px'})`,
        }}
        onHoverStart={() => !isMobileView && setAutoRotate(false)}
        onHoverEnd={() => !isMobileView && setAutoRotate(true)}
      >
        <motion.div 
          className="hub-inner"
          style={{
            width: isMobileView ? '90px' : '135px',
            height: isMobileView ? '90px' : '135px',
          }}
        >
          <div className="hub-content">
            <div className="hub-text-container">
              <h2 className="hub-text" style={{ fontSize: isMobileView ? '0.75rem' : '0.85rem' }}>
                PORTFOLIO
              </h2>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Constellation Effect */}
      <div className="constellation">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="star"
            initial={{ scale: Math.random() * 0.5 + 0.5 }}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.2, 1, 0.2]
            }}
            transition={{ 
              duration: Math.random() * 2 + 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div
        className="sun"
        onMouseEnter={() => setAutoRotate(false)}
        onMouseLeave={() => setAutoRotate(true)}
      />
    </div>
  );
};

export default ProjectCircle;