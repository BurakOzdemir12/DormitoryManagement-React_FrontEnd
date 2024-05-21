import React, { useEffect } from "react";
import { useState } from "react";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarHeader,
  SidebarContentProps,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, colors, useTheme } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import BarOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import RoomPreferencesOutlinedIcon from "@mui/icons-material/RoomPreferencesOutlined";
import AddHomeWorkOutlinedIcon from "@mui/icons-material/AddHomeWorkOutlined";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import longson from "../../Components/images/longson.jpg";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

const SideBarr = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const cookies = new Cookies();
  const dormIdFromCookie = cookies.get("jwt_auth");
  const dormIdData = dormIdFromCookie ? jwtDecode(dormIdFromCookie) : null;

  const Item = ({ title, to, icon, selected, setSelected }) => {
    // const theme = useTheme;
    // const colors = tokens(theme.palette.mode);
    return (
      <MenuItem
        active={selected === title}
        onClick={() => setSelected(title)}
        icon={icon}
        style={{ color: colors.grey[100] }}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    );
  };

  return (
    <Box
      sx={{
        marginTop: 0,
        height: "100%",
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
          height: 910,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar  collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* {USER} */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={longson}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Yönetici
                </Typography>
                <Typography>Admin</Typography>
              </Box>
            </Box>
          )}
          {/* MENU ITEMS */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Ana Sayfa"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Öğrenci İşlemleri
            </Typography>
            <Item
              title="Öğrenci Listesi"
              to="/students"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Öğrenci Ekle"
              to="/form"
              icon={<GroupAddIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Rezervasyonlar"
              to="/reservations"
              icon={<CalendarOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Yurt İşlemleri
            </Typography>
            <Item
              title="Oda İşlemleri"
              to="/room"
              icon={<AddHomeWorkOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Yurt Özellikleri"
              to={`/dormprops/${dormIdData.dormId}`}
              icon={<RoomPreferencesOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Yorumlar"
              to="/comments"
              icon={<ChatOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="İstatistikler"
              to="/statistics"
              icon={<AssessmentOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default SideBarr;
