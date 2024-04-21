import React from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { DataGrid ,GridToolbar} from "@mui/x-data-grid";

import { tokens } from "../../theme";
import { mockDataStudents } from "../../data/mockData";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../Components/header/Header";
const Students = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "studentNo",
      headerName: "Öğrenci No",
      width: 100,
      type: "number",
      headerAlign: "left",
      align: "left",
      // flex: 1,
    },
    {
      field: "name",
      headerName: "Ad",
      flex: 1,
      cellClassName: "name-column--cell",
      width: 100,
    },
    {
      field: "surName",
      headerName: "Soyad",
      cellClassName: "name-column--cell",
      width: 100,
    },
    {
      field: "age",
      headerName: "Yaş",
      type: "number",
      headerAlign: "left",
      align: "left",
      width: 100,
    },
    { field: "emuEmail", headerName: "mail", 
    width: 100, },
    {
      field: "phone",
      headerName: "telefon",
      type: "number",
      headerAlign: "left",
      align: "left",
      width: 100,
    },
    {
      field: "access",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];
  return (
    <Box m="20px">
      <Header
        title="Öğrenci Listesi"
        subtitle=" Yurtta Barınan Öğrencilerin Bilgileri Aşağıda Görüntülenmektedir."
      />
      <Box m="40px 0 0 0"  height="75vh"
      sx={{
        width: '100%',
        "& .MuiDataGrid-root":{
          border:"none",
      },
      "& .MuiDataGrid-cell":{
        borderBottom:"none"
      },
      "& .name-column--cell":{
        color:colors.greenAccent[300]
      },
      "& .MuiDataGrid-columnHeaders":{
        backgroundColor:colors.blueAccent[700],
        borderBottom:"none"
      },
      "& .MuiDataGrid-virtualScroller":{
        backgroundColor:colors.primary[400]
      },
      "& .MuiDataGrid-footerContainer":{
        borderBottom:"none",
        backgroundColor:colors.blueAccent[700]
      },


      "& .MuiDataGrid-toolbarContainer .MuiButton-text":{
        color:`${colors.grey[100]} !important`
      },
    }}
      >
        <DataGrid  rows={mockDataStudents} columns={columns} slots={{toolbar:GridToolbar}} />
      </Box>

      
    </Box>
  );
};

export default Students;
