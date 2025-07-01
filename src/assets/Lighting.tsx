import React from 'react';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';

// Extend the JSX namespace for Three.js elements
extend({ DirectionalLight: THREE.DirectionalLight, HemisphereLight: THREE.HemisphereLight });

interface LightingProps {
  intensity?: number;
  ambientIntensity?: number;
}

const Lighting: React.FC<LightingProps> = ({ 
  intensity = 0.7, 
  ambientIntensity = 3.99 
}) => {
  return (
    <>
      {/* Directional Light - exact Spline settings */}
      <directionalLight
        name="Directional Light"
        castShadow
        intensity={intensity}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={-10000}
        shadow-camera-far={100000}
        shadow-camera-left={-2000}
        shadow-camera-right={2000}
        shadow-camera-top={2000}
        shadow-camera-bottom={-2000}
        position={[-406.13, 461.69, 237.69]}
      />
      
      {/* Hemisphere Light - exact Spline settings */}
      <hemisphereLight 
        name="Default Ambient Light"
        intensity={ambientIntensity} 
        color="#707070" 
      />
    </>
  );
};

export default Lighting; 