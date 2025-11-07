// src\pages\InstagramCallback.js
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InstagramCallback = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
       const backendUrl =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:5000'
          : 'https://social-media-privacy-tool.vercel.app';
          
      axios.get(`${backendUrl}/api/auth/instagram/callback?code=${code}`)
        .then(res => {
          console.log('Login success:', res.data);
          navigate('/scan'); 
        })
        .catch(err => {
          console.error('Login failed:', err);
        });
    }
  }, []);

  return <p>Processing Instagram login...</p>;
};

export default InstagramCallback;