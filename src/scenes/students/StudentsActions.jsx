import { Box, IconButton,  Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Delete, Edit, Preview } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";
const StudentsActions = ({id}) => {

  const [students, setStudents] = useState([]);
  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const res = await axios.get("http://localhost:8800/students");
        setStudents(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllStudents();
  }, []);
  return (

    <Box margin={0}>
      
      <Link   to={`form/${id}`}>
      <Tooltip title='Güncelle'>
        <IconButton type="button"  onClick={() => {}}>
          
          <Edit />{" "}
        </IconButton>
      </Tooltip>
      </Link>
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
