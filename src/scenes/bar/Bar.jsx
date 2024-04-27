import { Box } from '@mui/material'
import React from 'react'
import Header from "../../Components/header/Header";
import BarChart from "../../Components/BarChart";

const Bar = () => {
  return (
    <Box m="20px">
       <Header
        title="Yurt İstatistikleri"
        subtitle="Yurdun, Doluluk ve Cinsiyet Dağılımı istatistikleri aşağıda görüntülenmektedir"
      />
      <Box height="75vh">
       <BarChart/>
      </Box>
    </Box>
  )
}

export default Bar