import React, { useEffect } from 'react';
import { useBox } from '@react-three/cannon';

interface BoxProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: string;
  dimensions?: [number, number, number]; // width, height, depth
}

const Box: React.FC<BoxProps> = ({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  scale = 1, 
  color = '#4285f4',
  dimensions = [0.3, 2.0, 1.4] // Made slightly wider (0.3 instead of 0.2) for better stability
}) => {
  
  // Adjust position for higher center of mass (more top-heavy)
  const adjustedPosition: [number, number, number] = [
    position[0], 
    position[1] + 0.1, // Slightly higher for top-heavy effect
    position[2]
  ];

  // Enhanced physics body for easy falling domino behavior
  const [ref, api] = useBox(() => ({
    mass: 1.0, // Lighter mass for easier tipping
    position: adjustedPosition,
    rotation: rotation,
    args: dimensions, // Box dimensions
    material: {
      friction: 0.1, // Very low friction for easier sliding/tipping
      restitution: 0.3, // Higher bounce for more dynamic movement
    },
    linearDamping: 0.01, // Very low damping for free movement
    angularDamping: 0.05, // Very low angular damping for easy rotation
    fixedRotation: false, // Rotation X,Y,Z enabled
    type: 'Dynamic'
  }));

  // Set initial mass and properties for easy falling domino physics
  useEffect(() => {
    api.mass.set(1.0); // Light mass for easy tipping
  }, [api]);

  return (
    <mesh
      ref={ref as any}
      scale={scale}
      castShadow
      receiveShadow
      name="Box"
    >
      <boxGeometry args={dimensions} />
      <meshStandardMaterial 
        color={color}
        roughness={0.6}
        metalness={0.1}
      />
    </mesh>
  );
};

export default Box; 