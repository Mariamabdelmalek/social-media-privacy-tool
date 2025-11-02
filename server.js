// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// ===============================
// ✅ Instagram OAuth (Business Login)
// ===============================

// Step 1: Redirect user to Facebook OAuth dialog for Instagram login
app.get('/auth/instagram', (req, res) => {
  const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${process.env.INSTAGRAM_APP_ID}&redirect_uri=${process.env.INSTAGRAM_REDIRECT_URI}&scope=instagram_basic,pages_show_list&response_type=code`;
  console.log('Redirecting to:', authUrl);
  res.redirect(authUrl);
});

// Step 2: Callback from Instagram/Facebook OAuth
app.get('/auth/instagram/callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('Error: Missing authorization code.');
  }

  try {
    // Exchange the code for an access token
    const tokenResponse = await axios.get(
      `https://graph.facebook.com/v19.0/oauth/access_token`,
      {
        params: {
          client_id: process.env.INSTAGRAM_APP_ID,
          client_secret: process.env.INSTAGRAM_APP_SECRET,
          redirect_uri: process.env.INSTAGRAM_REDIRECT_URI,
          code: code,
        },
      }
    );

    const { access_token } = tokenResponse.data;

    // Get user's connected Instagram Business Accounts
    const accountsResponse = await axios.get(
      `https://graph.facebook.com/v19.0/me/accounts?access_token=${access_token}`
    );

    // Optional: if connected to Instagram, fetch basic profile info
    const instagramResponse = await axios.get(
      `https://graph.facebook.com/v19.0/me?fields=id,name&access_token=${access_token}`
    );

    res.json({
      message: '✅ Instagram Business login successful!',
      instagram_user: instagramResponse.data,
      facebook_pages: accountsResponse.data.data || [],
      access_token,
    });
  } catch (error) {
    console.error('OAuth Error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to complete Instagram OAuth flow',
      details: error.response?.data || error.message,
    });
  }
});

// ===============================
// ✅ Privacy Scan API (Your Existing Logic)
// ===============================

app.post('/api/scan', (req, res) => {
  const { platforms } = req.body;

  if (!platforms || platforms.length === 0) {
    return res.status(400).json({ error: 'No platforms selected' });
  }

  const exposedData = [];
  const recommendations = [];

  platforms.forEach((platform) => {
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
    datasets: { data: [40, 35, 25] },
  };

  res.json({
    privacyScore: score,
    exposedData,
    recommendations,
    chart,
  });
});

// ===============================
// ✅ Server Config
// ===============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
