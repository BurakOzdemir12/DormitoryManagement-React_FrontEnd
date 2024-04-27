import { Box } from '@mui/material'
import React from 'react'
import Header from "../../Components/header/Header";
import PieChart from "../../Components/PieChart";

const Pie = () => {
  return (
    <Box m="20px">
       <Header
        title="Yurt Doluluk Oranı"
       //  subtitle="Yurdun Doluluk oranı"
      />
      <Box height="75vh">
       <PieChart/>
      </Box>
    </Box>
  )
}

export default Pie