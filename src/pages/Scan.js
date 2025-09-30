// src\pages\Scan.js

import React, { useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import '../App.scss';




const PLATFORM_OPTIONS = [
  { id: 'facebook', label: 'Facebook' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'twitter', label: 'Twitter' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'tiktok', label: 'TikTok' }
];

const Scan = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [privacyScore, setPrivacyScore] = useState(null);
  const [exposedData, setExposedData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);


   const togglePlatform = (platformId) => {
    setError('');
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const handleScan = async () => {
    setLoading(true);
    setError('');
    setPrivacyScore(null);
    setExposedData([]);
    setRecommendations([]);
    setChartData(null);


    try {


       
      setPrivacyScore(data.privacyScore);
      setExposedData(data.exposedData);
      setRecommendations(data.recommendations); 
      const { data } = await axios.get('/api/scan');
      setPrivacyScore(data.privacyScore);
      setExposedData(data.exposedData);
      setRecommendations(data.recommendations);
      
      
      // Expecting API to return something like:
      // { labels: [...], datasets: [...] }
      setChartData({
        labels: data.chart.labels,
        datasets: [
          {
            data: data.chart.datasets.data,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }
        ]
      });
    } catch (err) {
      setError('Scan failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scan-container">
      <h1>Scan Your Social Media Privacy</h1>
      <p>Click below to scan your account for exposed personal data.</p>
      <p>Select which accounts you’d like to analyze:</p>

      <div className="platform-selection">
        {PLATFORM_OPTIONS.map(({ id, label }) => (
          <label key={id} className="platform-option">
            <input
              type="checkbox"
              value={id}
              checked={selectedPlatforms.includes(id)}
              onChange={() => togglePlatform(id)}
            />
            {label}
          </label>
        ))}
      </div>

      {error && <p className="error-text">{error}</p>}

      <button
        className="scan-button"
        onClick={handleScan}
        disabled={loading}
      >
        {loading ? 'Scanning...' : 'Start Scan'}
      </button>

      {privacyScore && (
        <div className="scan-results">
          <h2>Your Privacy Score: {privacyScore}</h2>

          {chartData && (
            <div className="chart-wrapper">
              <Pie data={chartData} />
            </div>
          )}

          <div className="results-section">
            <h3>Exposed Data</h3>
            <ul>
              {exposedData.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="results-section">
            <h3>Recommendations</h3>
            <ul>
              {recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scan;
