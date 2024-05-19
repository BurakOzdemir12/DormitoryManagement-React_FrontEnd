import React, { useEffect, useState } from "react";
import { Box, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../Components/header/Header";
import StudentsActions from "./StudentsActions";
import axios from "axios";
import { Link } from "react-router-dom";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
const Students = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
  //Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/students/${id}`);
      setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0 },
    {
      field: "firstName",
      headerName: "İsim",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "Soyisim",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "studentNo",
      headerName: "Student No",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "passaportNo",
      headerName: "Pasaport No",
      headerAlign: "left",
      type: "text",

      align: "left",
    },
    {
      field: "phoneNumb",
      headerName: "Phone Number",
      flex: 0.7,
    },
    {
      field: "mail",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "İşlemler",
      type: "actions",
      width: 150,
      renderCell: (params) => (
        <>
          <div key={params.row.id}>
            <Tooltip title="Güncelle">
              <Link to={`/updateStudent/${params.row.id}`}>
                <IconButton type="button" onClick={() => {}}>
                  <Edit />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Sil">
              <IconButton onClick={() => handleDelete(params.row.id)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </div>
        </>
      ),
    },
    // {
    //   field: "statu",
    //   headerName: "Kayıt Durumu ",
    //   flex: 1,
    //   renderCell: ({ row: { access } }) => {
    //     return (
    //       <Box
    //         m="0"
    //         p="5px"
    //         display="flex"
    //         justifyContent="center"
    //         backgroundColor={
    //           access === "admin"
    //             ? colors.greenAccent[600]
    //             : access === "manager"
    //             ? colors.greenAccent[700]
    //             : colors.greenAccent[700]
    //         }
    //         borderRadius="4px"
    //       >
    //         {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
    //         {access === "manager" && <SecurityOutlinedIcon />}
    //         {access === "user" && <LockOpenOutlinedIcon />}
    //         <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
    //           {access}
    //         </Typography>
    //       </Box>
    //     );
    //   },
    // },
  ];

  return (
    <Box m="20px" sx={{ width: "100%", m: "0" }}>
      <Header
        title="Öğrenci Listesi"
        subtitle=" Yurtta Barınan Öğrencilerin Bilgileri Aşağıda Görüntülenmektedir."
      />
      <Box
        margin="0"
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-main": {
            margin: 0,
            m: "0",
          },
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderBottom: "none",
            backgroundColor: colors.blueAccent[700],
          },

          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={students}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default Students;
