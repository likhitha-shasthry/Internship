import React, { useState, useEffect } from 'react';
import './Terminology.css';

const Terminology = () => {
  const [terms, setTerms] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('keyTerms');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/writing-block.json');
        const data = await response.json();
        
        // Flatten all topics from sections into a single array
        const extractedTerms = [];
        const sections = data.course.chapter.sections || [];
        
        sections.forEach(section => {
          if (section.topics && Array.isArray(section.topics)) {
            section.topics.forEach(topic => {
              extractedTerms.push({
                id: `${section.id || section.number}-${topic.title}`,
                sectionNumber: section.number || '',
                sectionTitle: section.title || '',
                title: topic.title || '',
                definition: topic.definition || '',
                content: topic.content || '',
                description: topic.description || '',
                formula: topic.formula || '',
                symbol: topic.symbol || '',
                unit: topic.unit || '',
                examples: topic.examples || [],
                condition: topic.condition || '',
                result: topic.result || '',
                importantPoint: topic.importantPoint || '',
                variables: topic.variables || null,
              });
            });
          }
        });
        
        setTerms(extractedTerms);
        if (extractedTerms.length > 0) {
          setSelectedTerm(extractedTerms[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading terminology data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return <div className="terminology-loading">Loading terminology...</div>;
  }

  return (
    <div className="terminology-wrapper">
      {/* Back to Dashboard */}
      <div className="term-top-row">
        <button className="term-back-btn">← Back to Dashboard</button>
      </div>

      {/* Page Header */}
      <div className="term-header">
        <h1 className="term-title">Physics Lexicon</h1>
        <p className="term-subtitle">Explore the foundations of Waves with key terms.</p>
      </div>

      {/* Filter Tabs */}
      <div className="term-filters">
        <button 
          className={`term-filter-btn ${activeTab === 'keyTerms' ? 'active' : ''}`}
          onClick={() => setActiveTab('keyTerms')}
        >
          Key Terms
        </button>
        <button 
          className={`term-filter-btn ${activeTab === 'waveSections' ? 'active' : ''}`}
          onClick={() => setActiveTab('waveSections')}
        >
          Wave Sections
        </button>
        <button 
          className={`term-filter-btn ${activeTab === 'quizTime' ? 'active' : ''}`}
          onClick={() => setActiveTab('quizTime')}
        >
          Quiz Time
        </button>
      </div>

      {/* Main Two-Column Layout */}
      <div className="term-main">
        {/* Left: Term List */}
        <div className="term-list">
          {terms.map((term) => (
            <button
              key={term.id}
              className={`term-list-item ${selectedTerm?.id === term.id ? 'active' : ''}`}
              onClick={() => setSelectedTerm(term)}
              aria-selected={selectedTerm?.id === term.id}
            >
              <span className="term-list-title">{term.title}</span>
              {term.sectionNumber && (
                <span className="term-list-section">{term.sectionNumber}</span>
              )}
            </button>
          ))}
        </div>

        {/* Right: Term Detail */}
        <div className="term-detail">
          {selectedTerm && (
            <>
              {selectedTerm.sectionNumber && (
                <div className="term-section-label">
                  {selectedTerm.sectionNumber}
                  <span className="term-section-title">{selectedTerm.sectionTitle}</span>
                </div>
              )}

              <h2 className="term-detail-title">{selectedTerm.title}</h2>

              {selectedTerm.symbol && (
                <div className="term-field">
                  <span className="term-field-label">Symbol:</span>
                  <span className="term-field-value symbol-value">{selectedTerm.symbol}</span>
                </div>
              )}

              {selectedTerm.formula && (
                <div className="term-field">
                  <span className="term-field-label">Formula:</span>
                  <span className="term-field-value formula-value">{selectedTerm.formula}</span>
                </div>
              )}

              {selectedTerm.unit && (
                <div className="term-field">
                  <span className="term-field-label">Unit:</span>
                  <span className="term-field-value">{selectedTerm.unit}</span>
                </div>
              )}

              {selectedTerm.definition && (
                <div className="term-field term-definition">
                  <span className="term-field-label">Definition:</span>
                  <p className="term-field-value">{selectedTerm.definition}</p>
                </div>
              )}

              {selectedTerm.content && !selectedTerm.definition && (
                <div className="term-field">
                  <p className="term-field-value">{selectedTerm.content}</p>
                </div>
              )}
              {selectedTerm.description && !selectedTerm.definition && (
                <div className="term-field">
                  <p className="term-field-value">{selectedTerm.description}</p>
                </div>
              )}

              {selectedTerm.condition && (
                <div className="term-field">
                  <span className="term-field-label">Condition:</span>
                  <span className="term-field-value">{selectedTerm.condition}</span>
                </div>
              )}
              {selectedTerm.result && (
                <div className="term-field">
                  <span className="term-field-label">Result:</span>
                  <span className="term-field-value">{selectedTerm.result}</span>
                </div>
              )}

              {selectedTerm.importantPoint && (
                <div className="term-quick-memory">
                  <div className="term-quick-memory-header">💡 Quick Memory</div>
                  <p className="term-quick-memory-content">{selectedTerm.importantPoint}</p>
                </div>
              )}

              {selectedTerm.examples && selectedTerm.examples.length > 0 && (
                <div className="term-examples">
                  <h4 className="term-examples-title">Examples</h4>
                  <ul className="term-examples-list">
                    {selectedTerm.examples.map((example, idx) => (
                      <li key={idx} className="term-example-item">{example}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedTerm.variables && typeof selectedTerm.variables === 'object' && (
                <div className="term-variables">
                  <h4 className="term-variables-title">Variables</h4>
                  <dl className="term-variables-list">
                    {Object.entries(selectedTerm.variables).map(([key, value]) => (
                      <div key={key} className="term-variable-item">
                        <dt className="term-variable-symbol">{key}</dt>
                        <dd className="term-variable-definition">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Terminology;