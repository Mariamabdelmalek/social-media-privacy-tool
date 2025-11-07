export default async function handler(req, res) {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ error: 'Missing authorization code.' });
  }

  try {
    const tokenResponse = await fetch('https://graph.facebook.com/v19.0/oauth/access_token?' + new URLSearchParams({
      client_id: process.env.INSTAGRAM_APP_ID,
      client_secret: process.env.INSTAGRAM_APP_SECRET,
      redirect_uri: process.env.INSTAGRAM_REDIRECT_URI,
      code,
    }), {
      method: 'GET',
    });

    const tokenData = await tokenResponse.json();
    const access_token = tokenData.access_token;

    if (!access_token) {
      return res.status(500).json({ error: 'Failed to retrieve access token', details: tokenData });
    }

    const pagesResponse = await fetch(`https://graph.facebook.com/v19.0/me/accounts?access_token=${access_token}`);
    const pagesData = await pagesResponse.json();

    const userResponse = await fetch(`https://graph.facebook.com/v19.0/me?fields=id,name&access_token=${access_token}`);
    const userData = await userResponse.json();

    return res.status(200).json({
      message: '✅ Instagram Business login successful!',
      instagram_user: userData,
      facebook_pages: pagesData.data || [],
      access_token,
    });
  } catch (error) {
    console.error('OAuth Error:', error);
    return res.status(500).json({
      error: 'Failed to complete Instagram OAuth flow',
      details: error.message,
    });
  }
}
