import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';

const VerifyEmail = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyEmail = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      
      try {
        const response = await axios.get(`http://localhost:8800/verify-email?token=${token}`);
        
        if (response.data === "Email doğrulama başarılı, şimdi giriş yapabilirsiniz.") {
              

          setSuccess(true);
          setTimeout(() => {
            navigate('/login', { replace: true });
          }, 3000);
        }
      } catch (error) {
        console.error("Doğrulama hatası:", error);
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };
    verifyEmail();
  }, [location, navigate]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      {loading ? (
        <CircularProgress />
      ) : (
        success ? (
          <Alert severity="success">İşleminiz tamamlanıyor, lütfen bekleyiniz...</Alert>
        ) : (
          <Alert severity="error">Doğrulama hatası, lütfen tekrar deneyiniz.</Alert>
        )
      )}
    </Box>
  );
};

export default VerifyEmail;
