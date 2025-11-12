// src\components\InstagramReport.js
// src/App.scss 
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function InstagramReport() {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get('/api/scan/posts');
        setReport(response.data.report);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch report');
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) return <p>🔍 Scanning posts for privacy risks...</p>;
  if (error) return <p>❌ Error: {error}</p>;

  return (
    <div className="instagram-report">
      <h2>📊 Instagram Privacy Scan Report</h2>
      {report.length === 0 ? (
        <p>No posts found or no risks detected.</p>
      ) : (
        report.map(post => (
          <div key={post.id} className={`post-card ${post.risk_level.toLowerCase()}`}>
            <img src={post.media_url} alt="Instagram media" width="200" />
            <p><strong>Caption:</strong> {post.caption}</p>
            <p><strong>Posted:</strong> {new Date(post.timestamp).toLocaleString()}</p>
            <p><strong>Risk Level:</strong> {post.risk_level}</p>
            <ul>
              {post.risks.map((risk, index) => (
                <li key={index}>⚠️ {risk}</li>
              ))}
            </ul>
            <p><strong>Recommendation:</strong> {post.recommendation}</p>
          </div>
        ))
      )}
    </div>
  );
}
