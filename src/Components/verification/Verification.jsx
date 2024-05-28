import { Alert, Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import VerificationInput from "react-verification-input";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Verification = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { username } = location.state; // username'i buradan alın
  const [verificationCode, setVerificationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const handleVerification = async ({ resetForm }) => {
    try {
      const response = await axios.post("http://localhost:8800/verify", {
        username,
        verificationCode,
      });
      console.log(response.data);
      if (response.data) {
        setShowSuccessAlert(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
          navigate("/login", { replace: true }); 
        }, 2500);
      } else {
        
        resetForm();

        setShowErrorAlert(true);
        setTimeout(() => {
          setShowErrorAlert(false);
        }, 2500);
      }
    } catch (error) {
      console.error("Doğrulama hatası:", error);
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 5000);
    }
  };

  return (
    <Box m={4}>
      <Box display="block" textAlign="center">
        <Typography variant="h3" gutterBottom>
          Onaylama Kodunu Giriniz
        </Typography>
        <VerificationInput
          onChange={setVerificationCode}
          length={6}
          placeholder=""
        />
        {showSuccessAlert && (
          <Alert
            variant="filled"
            sx={{
              position: "fixed",
              bottom: 20,
              right: 20,
              fontSize: 25,
              gridColumn: "span 4",
              width: "30%",
            }}
            severity="success"
          >
            Doğrulama başarılı! Giriş Sayfasına Yönlendiriliyorsunuz...
          </Alert>
        )}
        {showErrorAlert && (
          <Alert
            variant="filled"
            sx={{
              position: "fixed",
              bottom: 20,
              right: 20,
              fontSize: 25,
              gridColumn: "span 4",
              width: "30%",
            }}
            severity="error"
          >
            Doğrulama başarısız! Lütfen tekrar deneyiniz.
          </Alert>
        )}
        {errorMessage && (
          <Typography color="error" variant="body1" mt={2}>
            {errorMessage}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleVerification}
          mt={2}
        >
          Onayla
        </Button>
      </Box>
    </Box>
  );
};

export default Verification;
