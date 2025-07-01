import React from 'react';
import DominoWindow from './DominoWindow';
import './App.css';

const App: React.FC = () => {
  const handleClose = () => {
    console.log('Window closed');
  };

  return (
    <div className="App">
      {/* Debug info */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        background: 'rgba(255,255,255,0.9)', 
        padding: '10px',
        zIndex: 9999,
        fontSize: '12px',
        fontFamily: 'monospace'
      }}>
        Screen: {window.innerWidth}×{window.innerHeight}
        <br />
        App loaded: {new Date().toLocaleTimeString()}
      </div>
      
      <DominoWindow onClose={handleClose} />
    </div>
  );
};

export default App; 