import React, { useState, useEffect } from 'react';

const PaperPage = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    try {
      setLoading(true);
      // Replace with your API endpoint
      const response = await fetch('/api/papers');
      if (!response.ok) throw new Error('Failed to fetch papers');
      const data = await response.json();
      setPapers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading papers...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="paper-page">
      <h1>Papers</h1>
      <div className="papers-container">
        {papers.length > 0 ? (
          papers.map((paper) => (
            <div key={paper.id} className="paper-card">
              <h2>{paper.title}</h2>
              <p>{paper.description}</p>
            </div>
          ))
        ) : (
          <p>No papers found.</p>
        )}
      </div>
    </div>
  );
};

export default PaperPage;
