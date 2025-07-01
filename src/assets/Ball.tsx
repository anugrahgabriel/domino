import React, { useRef, useEffect, useMemo } from 'react';
import { Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';

interface BallProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  radius?: number;
  controllable?: boolean;
  speed?: number;
}

const Ball: React.FC<BallProps> = ({ 
  position = [0, 0, 0], 
  scale = 1, 
  color = '#AE9920',
  radius = 0.5,
  controllable = false,
  speed = 4 // Smoother movement speed
}) => {
  const keysPressed = useRef<Set<string>>(new Set());
  const currentVelocity = useRef<Vector3>(new Vector3(0, 0, 0));
  const targetVelocity = useRef<Vector3>(new Vector3(0, 0, 0));

  // Position ball center to hit boxes at upper edge for better domino tipping (box height = 2.0, hit at 1.6)
  const ballHeight = 1.6;
  const adjustedPosition = useMemo((): [number, number, number] => 
    [position[0], ballHeight, position[2]], 
    [position, ballHeight]
  );

  // Physics body with settings from the image
  const [ref, api] = useSphere(() => ({
    mass: controllable ? 0 : 1, // Mass 0 when controllable (kinematic for zero gravity), otherwise 1
    position: adjustedPosition,
    type: controllable ? 'Kinematic' : 'Dynamic',
    material: {
      friction: 2, // Increased friction for more resistance
      restitution: 1, // Bounce: 1
      contactEquationStiffness: 1e6,
      contactEquationRelaxation: 0.1, // Damping: 0.10
    },
    linearDamping: 0.4, // Higher damping for more friction-like effect
    angularDamping: 0.2,
    fixedRotation: false, // Rotation X,Y,Z enabled
  }));

  // Handle keyboard input for WASD controls
  useEffect(() => {
    if (!controllable) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      keysPressed.current.add(event.key.toLowerCase());
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      keysPressed.current.delete(event.key.toLowerCase());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [controllable]);

  // Smooth velocity-based movement with high friction
  useFrame(() => {
    if (!controllable) return;

    // Set target velocity based on input
    targetVelocity.current.set(0, 0, 0);

    // W = FRONT (negative Z direction)
    if (keysPressed.current.has('w')) targetVelocity.current.z = -speed;
    // S = BACK (positive Z direction)  
    if (keysPressed.current.has('s')) targetVelocity.current.z = speed;
    // A = LEFT (negative X direction)
    if (keysPressed.current.has('a')) targetVelocity.current.x = -speed;
    // D = RIGHT (positive X direction)
    if (keysPressed.current.has('d')) targetVelocity.current.x = speed;

    // Smooth interpolation toward target velocity with gradual acceleration
    const lerpFactor = 0.15; // Lower for more gradual, smooth acceleration
    currentVelocity.current.lerp(targetVelocity.current, lerpFactor);

    // Apply strong friction when no keys are pressed
    if (keysPressed.current.size === 0) {
      currentVelocity.current.multiplyScalar(0.8); // Smoother friction decay
    }

    // Apply the smooth velocity, keeping Y locked to maintain height
    api.velocity.set(
      currentVelocity.current.x, 
      0, // Keep Y velocity at 0 for floating effect
      currentVelocity.current.z
    );
  });

  // Set initial properties
  useEffect(() => {
    if (controllable) {
      api.mass.set(0); // Kinematic body for zero gravity
      api.position.set(adjustedPosition[0], adjustedPosition[1], adjustedPosition[2]);
    } else {
      api.mass.set(1); // Dynamic body with gravity
    }
  }, [api, controllable, adjustedPosition]);

  return (
    <mesh
      ref={ref as any}
      scale={scale}
      castShadow
      receiveShadow
      name="Ball"
    >
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial 
        color={color}
        roughness={0.2}
        metalness={0.0}
        emissive={0x000000}
      />
    </mesh>
  );
};

export default Ball; 