import React, { useState } from "react";
import roomimage1 from "../../Components/images/dorms/roomphoto1.jpg";
import DormsCard from "../../Components/dormsCard/DormsCard";
import { Box, Button,  Tooltip, Typography, styled, useTheme } from "@mui/material";
import { Col, Row } from "reactstrap";
import { tokens } from "../../theme";
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';

const Dorms = ({ search }) => {
  function ValueLabelComponent(props) {
    const { children, value } = props;
  
    return (
      <Tooltip enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }
  
  ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    value: PropTypes.number.isRequired,
  };
  const AirbnbSlider = styled(Slider)(({ theme }) => ({
    color: '#3a8589',
    height: 3,
    padding: '13px 0',
    '& .MuiSlider-thumb': {
      height: 27,
      width: 27,
      backgroundColor: '#fff',
      border: '1px solid currentColor',
      '&:hover': {
        boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
      },
      '& .airbnb-bar': {
        height: 9,
        width: 1,
        backgroundColor: 'currentColor',
        marginLeft: 1,
        marginRight: 1,
      },
    },
    '& .MuiSlider-track': {
      height: 3,
    },
    '& .MuiSlider-rail': {
      color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
      opacity: theme.palette.mode === 'dark' ? undefined : 1,
      height: 3,
    },
  }));
  
  function AirbnbThumbComponent(props) {
    const { children, ...other } = props;
    return (
      <SliderThumb {...other}>
        {children}
        <span className="airbnb-bar" />
        <span className="airbnb-bar" />
        <span className="airbnb-bar" />
      </SliderThumb>
    );
  }
  
  AirbnbThumbComponent.propTypes = {
    children: PropTypes.node,
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([20, 40]); // Varsayılan fiyat aralığı


  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };
  return (
    <Box>
      <Box>
        <Box sx={{ textAlign: "center" }}>
          <Box>
        <Typography gutterBottom>Fiyata Göre Listele</Typography>
      <AirbnbSlider
      sx={{width:"75%"}}
        slots={{ thumb: AirbnbThumbComponent }}
        getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
        value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
        min={0}
          max={100}
      />
      </Box>
          <Button
            sx={{
              m: 1,
              mx: 3,
              mt: 1,
              borderRadius: 5,
              fontSize: 22,
              fontWeight:"bolder",
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
              mx: 3,
              mt: 1,
              borderRadius: 5,
              fontSize: 22,
              fontWeight:"bolder",
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
              mx: 3,
              mt: 1,
              borderRadius: 5,
              fontSize: 22,
              fontWeight:"bolder",
              color: colors.grey[100],
              background: colors.greenAccent[900],
            }}
            onClick={() => handleCategoryChange("")}
          >
            {" "}
            Tüm Yurtlar
          </Button>
        </Box>
      </Box>
      <Box m={5}>
        <DormsCard search={search} selectedCategory={selectedCategory} />
      </Box>
    </Box>
  );
};
Dorms.propTypes = {
  search: PropTypes.string.isRequired,
};
export default Dorms;
