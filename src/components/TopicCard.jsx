import React from 'react';

function TopicCard({ topic }) {
  const contentText = topic.content || topic.definition || '';

  return (
    <div className="skill-card">
      <h3 className="card-title">{topic.title}</h3>
      <div className="card-content">
        {contentText}
        
        {topic.formula && (
          <div className="formula-box">
            {topic.formula}
          </div>
        )}

        {topic.examples && topic.examples.length > 0 && (
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
            {topic.examples.map((ex, idx) => (
              <li key={idx}>{ex}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TopicCard;
