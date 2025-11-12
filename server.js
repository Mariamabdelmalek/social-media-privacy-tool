// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const session = require('express-session');

app.use(session({
  secret: 'MySuperSecretKey', // change this to something secure
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production'} // set to true if using HTTPS
}));

// ===============================
// ✅ Instagram OAuth (Business Login)
// ===============================

// Step 1: Redirect user to Facebook OAuth dialog for Instagram login
const redirectUri = encodeURIComponent(process.env.INSTAGRAM_REDIRECT_URI);
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
    req.session.access_token = access_token;
    

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

app.get('/api/scan/posts', async (req, res) => {
  const accessToken = req.session.access_token;

  if (!accessToken) {
    return res.status(401).json({ error: 'User not authenticated. Please log in with Instagram.' });
  }

  try {
    // Step 1: Get Instagram user ID
    const userResponse = await axios.get(`https://graph.facebook.com/v19.0/me?fields=id&access_token=${accessToken}`);
    const userId = userResponse.data.id;

    // Step 2: Get connected Instagram Business Account
    const igAccountResponse = await axios.get(`https://graph.facebook.com/v19.0/${userId}?fields=instagram_business_account&access_token=${accessToken}`);
    const igUserId = igAccountResponse.data.instagram_business_account?.id;

    if (!igUserId) {
      return res.status(400).json({ error: 'No Instagram Business Account connected.' });
    }

    // Step 3: Fetch media posts
    const mediaResponse = await axios.get(`https://graph.facebook.com/v19.0/${igUserId}/media?fields=id,caption,media_type,media_url,timestamp&access_token=${accessToken}`);
    const posts = mediaResponse.data.data;

    // Step 4: Analyze each post
    const report = posts.map(post => {
      const risks = [];

      // Caption analysis
      if (post.caption) {
        if (post.caption.match(/home|address|phone|location|birthday|email/i)) {
          risks.push('Caption may contain personal information');
        }
        if (post.caption.match(/politics|mental health|religion|sexuality/i)) {
          risks.push('Caption may reveal sensitive opinions');
        }
      }

      // Timestamp analysis
      const postedAtNight = new Date(post.timestamp).getHours() >= 22;
      if (postedAtNight) {
        risks.push('Post made late at night — may indicate emotional vulnerability');
      }

      return {
        id: post.id,
        caption: post.caption || '',
        media_type: post.media_type,
        media_url: post.media_url,
        timestamp: post.timestamp,
        risks,
        risk_level: risks.length === 0 ? 'Low' : risks.length === 1 ? 'Medium' : 'High'
      };
    });

    res.json({ report });
  } catch (error) {
    console.error('Post scan error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to scan Instagram posts', details: error.response?.data || error.message });
  }
});

// ===============================
// ✅ Server Config
// ===============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
