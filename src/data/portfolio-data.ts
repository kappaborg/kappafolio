export type OrbitClass = 'orbit-inner-1' | 'orbit-inner-2' | 'orbit-middle-1' | 'orbit-middle-2' | 'orbit-outer-1' | 'orbit-outer-2';

export interface Project {
  id: number;
  imageUrl: string;
  url: string;
  theme: string;
}

export interface SolarElement {
  id: string;
  orbitClass: OrbitClass;
  rotationDuration: number;
  startAngle: number;
  color: string;
  size: number;
}

export const projects: Project[] = [
  {
    id: 1,
    imageUrl: '/images/projects/Ip.png',
    url: 'https://ip-location-mapper-fin.vercel.app/',
    theme: 'God Eye'
  },
  {
    id: 2,
    imageUrl: '/images/projects/QuantumLogo.png',
    url: 'https://kappaborg.github.io/quantum-memory-compiler/',
    theme: 'Quantum Lab'
  },
  {
    id: 3,
    imageUrl: '/images/projects/Bosnia.png',
    url: 'https://bosnian-translation.vercel.app/',
    theme: 'Bosnia Learner'
  }
];

export const orbits: Record<OrbitClass, number> = {
  'orbit-inner-1': 160,
  'orbit-inner-2': 185,
  'orbit-middle-1': 210,
  'orbit-middle-2': 235,
  'orbit-outer-1': 260,
  'orbit-outer-2': 285
};

export const solarElements: SolarElement[] = [
  // Inner Orbit
  { id: 'mercury', orbitClass: 'orbit-inner-1', rotationDuration: 28, startAngle: 45, color: '#c2c2c2', size: 0.6 },
  { id: 'venus', orbitClass: 'orbit-inner-1', rotationDuration: 35, startAngle: 180, color: '#f4d03f', size: 0.8 },
  { id: 'ceres', orbitClass: 'orbit-inner-2', rotationDuration: 42, startAngle: 90, color: '#a1887f', size: 0.55 },
  { id: 'vesta', orbitClass: 'orbit-inner-2', rotationDuration: 50, startAngle: 270, color: '#8d6e63', size: 0.5 },
  
  // Middle Orbit
  { id: 'earth', orbitClass: 'orbit-middle-1', rotationDuration: 60, startAngle: 0, color: '#3a82f7', size: 1 },
  { id: 'mars', orbitClass: 'orbit-middle-1', rotationDuration: 68, startAngle: 120, color: '#e57373', size: 0.7 },
  { id: 'pallas', orbitClass: 'orbit-middle-1', rotationDuration: 75, startAngle: 240, color: '#90a4ae', size: 0.45 },
  { id: 'jupiter', orbitClass: 'orbit-middle-2', rotationDuration: 85, startAngle: 60, color: '#ffa726', size: 1.2 },
  { id: 'saturn', orbitClass: 'orbit-middle-2', rotationDuration: 95, startAngle: 180, color: '#ffee58', size: 1.1 },
  { id: 'hygiea', orbitClass: 'orbit-middle-2', rotationDuration: 105, startAngle: 300, color: '#78909c', size: 0.4 },

  // Outer Orbit
  { id: 'uranus', orbitClass: 'orbit-outer-1', rotationDuration: 120, startAngle: 30, color: '#81d4fa', size: 0.9 },
  { id: 'neptune', orbitClass: 'orbit-outer-1', rotationDuration: 130, startAngle: 150, color: '#5c6bc0', size: 0.85 },
  { id: 'pluto', orbitClass: 'orbit-outer-1', rotationDuration: 140, startAngle: 270, color: '#90a4ae', size: 0.5 },
  { id: 'eris', orbitClass: 'orbit-outer-2', rotationDuration: 155, startAngle: 90, color: '#b39ddb', size: 0.65 },
  { id: 'haumea', orbitClass: 'orbit-outer-2', rotationDuration: 170, startAngle: 210, color: '#fff176', size: 0.62 },
  { id: 'makemake', orbitClass: 'orbit-outer-2', rotationDuration: 185, startAngle: 330, color: '#80cbc4', size: 0.58 },
]; 