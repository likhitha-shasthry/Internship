import React, { useState } from 'react';

function InteractiveExample({ example }) {
  // State to track which questions have their answers revealed
  const [revealedState, setRevealedState] = useState({});

  const toggleReveal = (index) => {
    setRevealedState(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const renderGiven = () => {
    if (!example.given) return null;
    const givenText = typeof example.given === 'string' 
      ? example.given 
      : JSON.stringify(example.given);
    
    return (
      <p style={{ marginBottom: '0.5rem' }}>
        <strong>Given:</strong> {givenText}
      </p>
    );
  };

  return (
    <div className="example-box">
      <div className="example-header">
        Example {example.number}: {example.title}
      </div>
      
      {renderGiven()}
      
      {example.questions?.map((q, idx) => {
        const isRevealed = !!revealedState[idx];
        
        return (
          <div key={idx} style={{ marginTop: '1rem' }}>
            <p><strong>Q:</strong> {q.question}</p>
            <button 
              className="reveal-btn"
              onClick={() => toggleReveal(idx)}
            >
              {isRevealed ? 'Hide Answer' : 'Show Answer'}
            </button>
            
            {isRevealed && (
              <div className="answer-box">
                <strong>A:</strong> {q.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default InteractiveExample;
