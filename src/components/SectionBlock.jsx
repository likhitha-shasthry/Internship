import React from 'react';
import TopicCard from './TopicCard';
import InteractiveExample from './InteractiveExample';

function SectionBlock({ section }) {
  return (
    <div className="section-block" id={section.slug}>
      <h2 className="section-title">
        <span>{section.number}</span> {section.title}
      </h2>
      
      <div className="cards-grid">
        {section.topics?.map((topic, idx) => (
          <TopicCard key={topic.id || idx} topic={topic} />
        ))}
      </div>

      {section.example && (
        <InteractiveExample example={section.example} />
      )}
    </div>
  );
}

export default SectionBlock;
