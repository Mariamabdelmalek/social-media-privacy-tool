// src\pages\Scan.js
import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import axios from 'axios';
import {
Chart as ChartJS,
ArcElement,
Tooltip,
Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import '../App.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

const PLATFORM_OPTIONS = [
{ id: 'facebook', label: 'Facebook' },
{ id: 'instagram', label: 'Instagram' },
{ id: 'twitter', label: 'Twitter' },
{ id: 'linkedin', label: 'LinkedIn' },
{ id: 'tiktok', label: 'TikTok' }
];

const SCAN_API = process.env.NODE_ENV === 'development'
? 'http://localhost:5000/api/scan'
: 'https://social-media-privacy-tool.vercel.app/api/scan';

const Scan = () => {
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const [privacyScore, setPrivacyScore] = useState(null);
const [exposedData, setExposedData] = useState([]);
const [recommendations, setRecommendations] = useState([]);
const [chartData, setChartData] = useState(null);
const [selectedPlatforms, setSelectedPlatforms] = useState([]);

const instagramButtonRef = useRef(null);
const [searchParams] = useSearchParams();
const navigate = useNavigate();
const code = searchParams.get('code');
const [instagramUser, setInstagramUser] = useState(null);
useEffect(() => {
const storedUser = localStorage.getItem('instagram_user');
if (storedUser) {
  setInstagramUser(JSON.parse(storedUser));
}
}, []);

useEffect(() => {
  if (code) {
    handleInstagramResponse(code);
    navigate('/scan', { replace: true });
  }
}, [code, navigate]);

const handleInstagramResponse = async (authCode) => {
  try {
    const res = await fetch(`/api/instagram/callback?code=${authCode}`);
    const data = await res.json();

    if (data.access_token) {
      console.log('✅ Instagram login successful:', data);
      
      // ✅ Save token and user info in localStorage
    localStorage.setItem('instagram_access_token', data.access_token);
    localStorage.setItem('instagram_user', JSON.stringify(data.instagram_user));
    
    } else {
      console.error('❌ Instagram login failed:', data);
    }
  } catch (err) {
    console.error('Error during Instagram OAuth:', err);
  }
};

const togglePlatform = (platformId) => {
  setError('');
  setSelectedPlatforms(prev => {
    const updated = prev.includes(platformId)
      ? prev.filter(p => p !== platformId)
      : [...prev, platformId];
    if (platformId === 'instagram' && !prev.includes('instagram')) {
      setTimeout(() => {
        instagramButtonRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    return updated;
  });
};

const handleScan = async () => {
  if (selectedPlatforms.length === 0) {
    setError('Please select at least one platform to scan.');
    setLoading(false);
    return;
  }

  setLoading(true);
  setError('');
  setPrivacyScore(null);
  setExposedData([]);
  setRecommendations([]);
  setChartData(null);

  try {
    const response = await axios.post(SCAN_API, {
      platforms: selectedPlatforms
    });

    const data = response.data;
    setPrivacyScore(data.privacyScore);
    setExposedData(data.exposedData);
    setRecommendations(data.recommendations);

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
    <p>Select which accounts you’d like to analyze:</p>

    <div className="platform-list">
      {PLATFORM_OPTIONS.map(platform => (
        <div className="platform-card" key={platform.id}>
          {platform.id === 'instagram' && <FaInstagram size={32} />}
          {platform.id === 'facebook' && <FaFacebook size={32} />}
          {platform.id === 'twitter' && <FaTwitter size={32} />}
          {platform.id === 'linkedin' && <FaLinkedin size={32} />}
          {platform.id === 'tiktok' && <SiTiktok size={32} />}
          <label>
            <input
              type="checkbox"
              value={platform.id}
              checked={selectedPlatforms.includes(platform.id)}
              onChange={() => togglePlatform(platform.id)}
            />
            {platform.label}
          </label>

          {platform.id === 'instagram' && (
            <div ref={instagramButtonRef}>
              <button
                onClick={() => {
                  const clientId = '1350290880087499';
                  const redirectUri = process.env.NODE_ENV === 'development'
                    ? 'http://localhost:3000/auth/instagram/callback'
                    : 'https://social-media-privacy-tool.vercel.app/auth/instagram/callback';

                  const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;
                  window.location.href = authUrl;
                }}
              >
                Connect Instagram
              </button>
            </div>
          )}

          {platform.id === 'facebook' && (
            <button onClick={() => window.location.href = 'http://localhost:5000/auth/facebook'}>
              Connect Facebook
            </button>
          )}
          {platform.id === 'twitter' && (
            <button onClick={() => window.location.href = 'http://localhost:5000/auth/twitter'}>
              Connect Twitter
            </button>
          )}
          {platform.id === 'linkedin' && (
            <button onClick={() => window.location.href = 'http://localhost:5000/auth/linkedin'}>
              Connect LinkedIn
            </button>
          )}
          {platform.id === 'tiktok' && (
            <button onClick={() => window.location.href = 'http://localhost:5000/auth/tiktok'}>
              Connect TikTok
            </button>
          )}
        </div>
      ))}
    </div>

    {error && <p className="error-text">{error}</p>}

    <button onClick={handleScan} disabled={loading}>
      {loading ? 'Scanning...' : 'Start Scan'}
    </button>
      {instagramUser && (
<div className="instagram-profile">
  <h3>Logged in as: {instagramUser.name || instagramUser.username}</h3>
  {instagramUser.profile_picture_url && (
    <img
      src={instagramUser.profile_picture_url}
      alt="Instagram profile"
      style={{ width: '80px', borderRadius: '50%' }}
    />
  )}
</div>
)}
<button onClick={() => {
localStorage.removeItem('instagram_access_token');
localStorage.removeItem('instagram_user');
setInstagramUser(null);
}}>
Logout Instagram
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
