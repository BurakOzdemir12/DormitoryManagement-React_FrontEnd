import React, { useState } from "react";
import DormsCard from "../../Components/dormsCard/DormsCard";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import PropTypes from "prop-types";
import Slider from "@mui/material/Slider";
import { Link } from "react-router-dom";

const Dorms = ({ search }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceSliderValue, setPriceSliderValue] = useState(10000); // Slider değeri

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePriceSliderChange = (event, newValue) => {
    setPriceSliderValue(newValue);
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box mx={5} width={"75%"}>
          <Typography variant="h2"  gutterBottom>Fiyata Göre Listele</Typography>
          <Slider
          sx={{color:colors.blueAccent[100]}}
            min={1}
            max={10000}
            value={priceSliderValue}
            onChange={handlePriceSliderChange}
            valueLabelDisplay="on"
            aria-label="price slider"
            
          />
        </Box>
        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            '@media (min-width: 768px)': {
              display: "block",
              
            },
          }}
        >
          <Button
            sx={{
              m: 1,
              mx: 2.5,
              mt: 1,
              borderRadius: 5,
              fontSize: 22,
              fontWeight: "bolder",
              color: colors.grey[100],
              background: colors.greenAccent[900],
            }}
            onClick={() => handleCategoryChange("DAÜ Yurtları")}
          >
            {" "}
            DAÜ Yurtları
          </Button>
          <Button
            sx={{
              m: 1,
              mx: 2.5,
              mt: 1,
              borderRadius: 5,
              fontSize: 22,
              fontWeight: "bolder",
              color: colors.grey[100],
              background: colors.greenAccent[900],
            }}
            onClick={() => handleCategoryChange("Y.İ.D. ve Diğer Yurtlar")}
          >
            {" "}
            Y.İ.D. ve Diğer Yurtlar
          </Button>
          <Button
            sx={{
              m: 1,
              mx: 2.5,
              mt: 1,
              borderRadius: 5,
              fontSize: 22,
              fontWeight: "bolder",
              color: colors.grey[100],
              background: colors.greenAccent[900],
            }}
            onClick={() => handleCategoryChange("")}
          >
            {" "}
            Tüm Yurtlar
          </Button>
          
        </Box>
        <Typography  mt={2} mb={0}>T.C. Kredi ve Yurtlar Kurumu Yurdu yurt ücret ve imkanları için lütfen<Link to={"http://www.kyk.gov.tr/"}> http://www.kyk.gov.tr</Link> adresini ziyaret ediniz.</Typography>
      </Box>

      <Box m={5}>
        <DormsCard
          search={search}
          selectedCategory={selectedCategory}
          priceSliderValue={priceSliderValue}
        />
      </Box>
    </Box>
  );
};

Dorms.propTypes = {
  search: PropTypes.string.isRequired,
};

export default Dorms;
