import React, { useState, useRef, useCallback } from 'react';
import './DominoWindow.css';

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

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!windowRef.current) return;
    
    setIsDragging(true);
    const rect = windowRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !windowRef.current) return;
    
    const newX = e.clientX - dragOffset.current.x;
    const newY = e.clientY - dragOffset.current.y;
    
    // Constrain to viewport
    const maxX = window.innerWidth - windowRef.current.offsetWidth;
    const maxY = window.innerHeight - windowRef.current.offsetHeight;
    
    const constrainedX = Math.max(0, Math.min(newX, maxX));
    const constrainedY = Math.max(0, Math.min(newY, maxY));
    
    setPosition({ x: constrainedX, y: constrainedY });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

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
      className="outer-shell"
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
            ×
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="content-area">
        {/* You can add Domino-related UI here */}
      </div>
    </div>
  );
};

export default DominoWindow; 