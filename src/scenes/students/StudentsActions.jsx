import { Box, IconButton,  Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Delete, Edit, Preview } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";
const StudentsActions = ({params}) => {

  const [students, setStudents] = useState([]);
  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const res = await axios.get("http://localhost:8800/students");
        setStudents(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllStudents();
  }, []);

  const handleDelete = async (id)=>{
    try {
      await axios.delete(`http://localhost:8800/students/${id}`)
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }
  return (<>
    {students.map((student)=>(

    <Box margin={0}>

      <div>

      <Link   to={`/form/${student.id}`}>
      <Tooltip title='Güncelle'>
        <IconButton type="button"  onClick={() => {}}>
          
          <Edit />{" "}
        </IconButton>
      </Tooltip>
      </Link>
      <Tooltip title='Sil'>
        <IconButton onClick={() => handleDelete(student.id)}>
          {" "}
          <Delete  sx={{}}/>{" "}
        </IconButton>
      </Tooltip>
      
      </div>

    </Box>
      ))}
</>
  );
};

export default StudentsActions;
