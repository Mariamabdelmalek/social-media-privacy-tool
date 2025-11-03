// src\pages\InstagramCallback.js
import { useEffect } from 'react';
import axios from 'axios';

const InstagramCallback = () => {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      axios.get(`http://localhost:5000/auth/instagram/callback?code=${code}`)
        .then(res => {
          console.log('Login success:', res.data);
          // Optionally store token or redirect
        })
        .catch(err => {
          console.error('Login failed:', err);
        });
    }
  }, []);

  return <p>Processing Instagram login...</p>;
};

export default InstagramCallback;