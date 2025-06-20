'use client';

import { SolarElement } from '@/data/portfolio-data';
import { motion } from 'framer-motion';

interface DecorativeElementProps {
    element: SolarElement;
    position: { x: number; y: number };
    isMobileView: boolean;
}

const DecorativeElement = ({ element, position, isMobileView }: DecorativeElementProps) => {
    return (
        <motion.div
            key={element.id}
            className={`planet ${element.id}`}
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: `${20 * element.size * (isMobileView ? 0.75 : 1)}px`,
                height: `${20 * element.size * (isMobileView ? 0.75 : 1)}px`,
                background: `radial-gradient(circle at 30% 30%, ${element.color}, ${element.color}88)`,
                boxShadow: `0 0 15px ${element.color}44`,
                borderRadius: '50%',
                zIndex: 5,
                willChange: 'transform',
            }}
            animate={{
                x: position.x,
                y: position.y,
                rotate: [0, 360],
            }}
            transition={{
                rotate: {
                    duration: element.rotationDuration * (isMobileView ? 1.5 : 1),
                    repeat: Infinity,
                    ease: "linear"
                },
                x: { type: "spring", stiffness: 100, damping: 30 },
                y: { type: "spring", stiffness: 100, damping: 30 }
            }}
        />
    );
};

export default DecorativeElement; 