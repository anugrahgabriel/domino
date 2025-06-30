import React from 'react';
import DominoWindow from './DominoWindow';
import './App.css';

const App: React.FC = () => {
  const handleClose = () => {
    console.log('Window closed');
  };

  return (
    <div className="App">
      <DominoWindow onClose={handleClose} />
    </div>
  );
};

export default App; 