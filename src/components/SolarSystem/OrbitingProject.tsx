'use client';

import { useTheme } from '@/context/ThemeContext';
import { Project } from '@/data/portfolio-data';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface OrbitingProjectProps {
    project: Project;
    position: { x: number; y: number };
    isMobileView: boolean;
    isSelected: boolean;
    handleProjectClick: (url: string, id: number) => void;
    setHoveredProject: (id: number | null) => void;
}

const OrbitingProject = ({
    project,
    position,
    isMobileView,
    isSelected,
    handleProjectClick,
    setHoveredProject
}: OrbitingProjectProps) => {
    const { setActiveTheme } = useTheme();

    return (
        <motion.div
            key={project.id}
            className="project-planet"
            style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: isMobileView ? '70px' : '90px',
                height: isMobileView ? '70px' : '90px',
                transformOrigin: 'center center',
                zIndex: 10,
                willChange: 'transform',
            }}
            animate={{
                x: position.x,
                y: position.y,
                scale: isSelected ? 1.1 : 1,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onHoverStart={() => {
                if (!isMobileView) {
                    setHoveredProject(project.id);
                    setActiveTheme(project.theme);
                }
            }}
            onHoverEnd={() => {
                if (!isMobileView) {
                    setHoveredProject(null);
                    setActiveTheme('default');
                }
            }}
            onClick={() => handleProjectClick(project.url, project.id)}
            role="button"
            aria-label={`View project: ${project.theme}`}
            tabIndex={0}
            onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleProjectClick(project.url, project.id);
                }
            }}
        >
            <motion.div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-lg border-2 border-orange-500/50 overflow-hidden"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
            >
                <Image
                    src={project.imageUrl}
                    alt={`${project.theme} project thumbnail`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                />
            </motion.div>
        </motion.div>
    );
};

export default OrbitingProject; 