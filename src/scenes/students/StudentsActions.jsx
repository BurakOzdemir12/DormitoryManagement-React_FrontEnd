import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import { Delete, Edit, Preview } from "@mui/icons-material";
const StudentsActions = ({params}) => {
  return (
    <Box margin={0}>
      <Tooltip title='Güncelle'>
        <IconButton onClick={() => {}}>
          
          <Edit />{" "}
        </IconButton>
      </Tooltip>
      <Tooltip title='Sil'>
        <IconButton onClick={() => {}}>
          {" "}
          <Delete  sx={{}}/>{" "}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default StudentsActions;
