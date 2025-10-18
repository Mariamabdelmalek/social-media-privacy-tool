require('dotenv').config();
const axios = require('axios'); 
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.post('/api/scan', (req, res) => {
  const { platforms } = req.body;
    if (!platforms || platforms.length === 0) {
    return res.status(400).json({ error: 'No platforms selected' });
  }

  // Simulate scan logic
  const exposedData = [];
  const recommendations = [];

  platforms.forEach(platform => {
    if (platform === 'facebook') {
      exposedData.push('Public profile includes full name and location');
      recommendations.push('Limit profile visibility to friends only');
    }
    if (platform === 'instagram') {
      exposedData.push('Photos contain GPS metadata');
      recommendations.push('Disable location tagging on posts');
    }
    if (platform === 'twitter') {
      exposedData.push('Tweets reveal personal opinions and location');
      recommendations.push('Review tweet history for sensitive content');
    }
    if (platform === 'linkedin') {
      exposedData.push('Work history and contact info are public');
      recommendations.push('Hide contact details from public view');
    }
    if (platform === 'tiktok') {
      exposedData.push('Videos tagged with location and personal info');
      recommendations.push('Enable privacy mode for video uploads');
    }
  });

 
  const score = ['A', 'B+', 'B', 'C'][Math.floor(Math.random() * 4)];

 
  const chart = {
    labels: ['Identity Exposure', 'Location Exposure', 'Visual Content'],
    datasets: {
      data: [40, 35, 25]
    }
  };

  res.json({
    privacyScore: score,
    exposedData,
    recommendations,
    chart
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});