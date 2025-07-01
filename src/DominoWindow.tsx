import React, { useState, useRef, useCallback } from 'react';
import './DominoWindow.css';
import { DominoScene } from './assets';

interface Position {
  x: number;
  y: number;
}

interface DominoWindowProps {
  onClose?: () => void;
}

const DominoWindow: React.FC<DominoWindowProps> = ({ onClose }) => {
  const [position, setPosition] = useState<Position>({ x: 20, y: 50 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const dragOffset = useRef<Position>({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  const lastPosition = useRef<Position>({ x: 20, y: 50 });
  const velocity = useRef<Position>({ x: 0, y: 0 });
  const lastMoveTime = useRef<number>(0);

  const getBoundaryConstraints = useCallback(() => {
    if (!windowRef.current) return { maxX: 0, maxY: 0 };
    
    const maxX = window.innerWidth - windowRef.current.offsetWidth;
    const maxY = window.innerHeight - windowRef.current.offsetHeight;
    
    return { maxX, maxY };
  }, []);

  const applySmoothedConstraints = useCallback((newX: number, newY: number) => {
    const { maxX, maxY } = getBoundaryConstraints();
    
    // Apply smooth resistance near boundaries
    const boundary = 80; // pixels from edge where resistance starts
    const resistance = 0.15; // resistance factor (reduced for smoother feel)
    
    let constrainedX = newX;
    let constrainedY = newY;
    
    // X-axis constraints with smooth resistance
    if (newX < 0) {
      constrainedX = newX > -boundary ? newX * resistance : -boundary * resistance;
    } else if (newX > maxX) {
      const overshoot = newX - maxX;
      constrainedX = overshoot < boundary ? maxX + (overshoot * resistance) : maxX + (boundary * resistance);
    }
    
    // Y-axis constraints with smooth resistance
    if (newY < 0) {
      constrainedY = newY > -boundary ? newY * resistance : -boundary * resistance;
    } else if (newY > maxY) {
      const overshoot = newY - maxY;
      constrainedY = overshoot < boundary ? maxY + (overshoot * resistance) : maxY + (boundary * resistance);
    }
    
    return { x: constrainedX, y: constrainedY };
  }, [getBoundaryConstraints]);

  const snapToConstraints = useCallback((pos: Position) => {
    const { maxX, maxY } = getBoundaryConstraints();
    
    return {
      x: Math.max(0, Math.min(pos.x, maxX)),
      y: Math.max(0, Math.min(pos.y, maxY))
    };
  }, [getBoundaryConstraints]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!windowRef.current) return;
    
    setIsDragging(true);
    const rect = windowRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    lastMoveTime.current = Date.now();
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !windowRef.current) return;
    
    const now = Date.now();
    const deltaTime = now - lastMoveTime.current;
    
    const newX = e.clientX - dragOffset.current.x;
    const newY = e.clientY - dragOffset.current.y;
    
    // Calculate velocity for momentum
    if (deltaTime > 0) {
      velocity.current = {
        x: (newX - lastPosition.current.x) / deltaTime,
        y: (newY - lastPosition.current.y) / deltaTime
      };
    }
    
    const smoothedPosition = applySmoothedConstraints(newX, newY);
    
    setPosition(smoothedPosition);
    lastPosition.current = smoothedPosition;
    lastMoveTime.current = now;
  }, [isDragging, applySmoothedConstraints]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    
    // Snap back to valid constraints with smooth animation
    setTimeout(() => {
      setPosition(prevPos => {
        const snappedPosition = snapToConstraints(prevPos);
        return snappedPosition;
      });
    }, 50);
  }, [snapToConstraints]);

  // Add global mouse event listeners
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <div
      ref={windowRef}
      className={`outer-shell ${isDragging ? 'dragging' : 'smooth-transition'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {/* Title Bar */}
      <div 
        className="title-bar"
        onMouseDown={handleMouseDown}
      >
        <span className="title-text">Domino</span>
        <div className="window-controls">
          <div 
            className="close-btn"
            onClick={handleClose}
          >
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="content-area">
        <DominoScene width="100%" height="100%" />
      </div>
    </div>
  );
};

export default DominoWindow; 