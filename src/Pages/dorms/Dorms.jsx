import React from "react";
import roomimage1 from "../../Components/images/dorms/roomphoto1.jpg";
import DormsCard from "../../Components/dormsCard/DormsCard";
import { Box } from "@mui/material";
import { Col, Row } from "reactstrap";

const Dorms = () => {
  return (
    <Box>
      <Box m={5}  >
        
        <DormsCard />
      </Box>
    </Box>
  );
};

export default Dorms;
