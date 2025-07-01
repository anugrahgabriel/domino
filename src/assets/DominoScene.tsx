import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import { Physics, useBox } from '@react-three/cannon';
import Lighting from './Lighting';
import Ball from './Ball';
import Box from './Box';

// Thick Physics Ground component
const Ground = () => {
  const [ref] = useBox(() => ({
    position: [0, -1, 0], // Position so top surface is at y=0
    args: [40, 2, 40], // width, height (thickness), depth
    material: {
      friction: 0.6,
      restitution: 0.1,
    },
    type: 'Static' // Ground doesn't move
  }));

  return (
    <mesh ref={ref as any} receiveShadow castShadow>
      <boxGeometry args={[40, 2, 40]} />
      <meshStandardMaterial color="#d0d0d0" />
    </mesh>
  );
};

interface DominoSceneProps {
  width?: string;
  height?: string;
  showDemo?: boolean;
}

const DominoScene: React.FC<DominoSceneProps> = ({ 
  width = '100%', 
  height = '400px',
  showDemo = true 
}) => {
  return (
    <div style={{ width, height }}>
      <Canvas
        shadows
        style={{ background: '#f2f2fb' }}
      >
        {/* Background color - exact Spline setting */}
        <color attach="background" args={['#f2f2fb']} />
        
        {/* Orthographic Camera - angled top-down view */}
        <OrthographicCamera 
          makeDefault={true} 
          far={10000} 
          near={-50000}
          position={[-2, 4, 3]}
          zoom={10}
        />
        
        {/* Lighting setup */}
        <Lighting />
        
        {/* Camera controls */}
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
        />
        
        {/* Stable Physics World for Domino Behavior */}
        <Physics 
          gravity={[0, -9.81, 0]}
          defaultContactMaterial={{
            friction: 0.5,
            restitution: 0.2,
          }}
          iterations={5}
          tolerance={0.01}
        >
          {/* Physics Ground */}
          <Ground />
          
          {/* Demo objects */}
          {showDemo && (
            <>
              {/* Controllable Ball with WASD and Physics */}
              <Ball 
                position={[-2, 1.8, 0]} 
                color="#AE9920"
                radius={0.5}
                controllable={true}
                speed={8}
              />
              
              {/* Physics-enabled Domino pieces */}
              <Box 
                position={[0, 1.0, 0]} 
                color="#4285f4"
                dimensions={[0.3, 2.0, 1.4]}
              />
              <Box 
                position={[1.4, 1.0, 0]} 
                color="#4285f4"
                dimensions={[0.3, 2.0, 1.4]}
              />
              <Box 
                position={[2.8, 1.0, 0]} 
                color="#4285f4"
                dimensions={[0.3, 2.0, 1.4]}
              />
              <Box 
                position={[4.2, 1.0, 0]} 
                color="#4285f4"
                dimensions={[0.3, 2.0, 1.4]}
              />
              <Box 
                position={[5.6, 1.0, 0]} 
                color="#4285f4"
                dimensions={[0.3, 2.0, 1.4]}
              />
              <Box 
                position={[7.0, 1.0, 0]} 
                color="#4285f4"
                dimensions={[0.3, 2.0, 1.4]}
              />
              <Box 
                position={[8.4, 1.0, 0]} 
                color="#4285f4"
                dimensions={[0.3, 2.0, 1.4]}
              />
            </>
          )}
        </Physics>
      </Canvas>
    </div>
  );
};

export default DominoScene; 