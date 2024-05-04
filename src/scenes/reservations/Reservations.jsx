import { Box, useMediaQuery } from "@mui/system";
import React from "react";
import Header from "../../Components/header/Header";
import { Grid, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import ReservationCard from "../../Components/ReservationCard";

const Reservations = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:1024px)");

  return (
    <Box m={2}>
      <Header
        title="REZERVASYONLAR"
        subtitle={"Öğrencilerden Gelen Rezervasyon İstekleri "}
      />
      
       <ReservationCard/>
      </Box>
  );
};

export default Reservations;
