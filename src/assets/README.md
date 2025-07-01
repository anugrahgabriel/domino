# 3D Assets

React Three Fiber components recreated from Spline assets for the Domino game.

## Components

### `Ball`
A sphere component for the rolling ball in domino physics.

**Props:**
- `position?: [number, number, number]` - 3D position (default: [0, 0, 0])
- `scale?: number` - Uniform scale (default: 1)
- `color?: string` - Material color (default: '#4285f4')
- `radius?: number` - Sphere radius (default: 0.5)

**Example:**
```tsx
<Ball position={[0, 1, 0]} color="#ff6b6b" radius={0.5} />
```

### `Box`
A rectangular box component for domino pieces.

**Props:**
- `position?: [number, number, number]` - 3D position (default: [0, 0, 0])
- `rotation?: [number, number, number]` - 3D rotation in radians (default: [0, 0, 0])
- `scale?: number` - Uniform scale (default: 1)
- `color?: string` - Material color (default: '#4285f4')
- `dimensions?: [number, number, number]` - Box dimensions [width, height, depth] (default: [0.2, 1, 0.5])

**Example:**
```tsx
<Box position={[1, 0.5, 0]} dimensions={[0.2, 1, 0.5]} color="#4285f4" />
```

### `Lighting`
Reusable lighting setup with directional and hemisphere lights.

**Props:**
- `intensity?: number` - Directional light intensity (default: 0.7)
- `ambientIntensity?: number` - Hemisphere light intensity (default: 3.99)

### `DominoScene`
Complete scene with lighting, camera controls, and demo objects.

**Props:**
- `width?: string` - Canvas width (default: '100%')
- `height?: string` - Canvas height (default: '400px')
- `showDemo?: boolean` - Show demo objects (default: true)

**Example:**
```tsx
<DominoScene width="800px" height="600px" showDemo={true} />
```

## Usage

```tsx
import { Ball, Box, Lighting, DominoScene } from './assets';

// Use individual components within a Canvas
<Canvas>
  <Lighting />
  <Ball position={[0, 1, 0]} />
  <Box position={[1, 0.5, 0]} />
</Canvas>

// Or use the complete scene
<DominoScene />
``` 