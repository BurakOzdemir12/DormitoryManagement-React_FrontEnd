import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../theme";
import { NavbarBrand } from "reactstrap";
import emulogo from "../images/logoo.png";
import { Link } from "react-router-dom";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';const Footer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box sx={{ background: colors.blueAccent[800] }}>
      <Grid
        mt={5}
        mb={5}
        container
        display={"inline-flex"}
        height={"auto"}
        width={"100%"}
      >
        <Grid m={0} item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Box width={"100%"} display={""} textAlign={"center"}>
            <Link to={"/home"} style={{ textDecoration: "none" }}>
              <NavbarBrand className=" ">
                <img
                  className="logo"
                  height={130}
                  width={240}
                  src={emulogo}
                  alt=""
                />
              </NavbarBrand>
              <Typography
                letterSpacing={1.2}
                color={colors.grey[100]}
                display={"block"}
              >
                Doğu Akedniz Üniversitesi{" "}
                <Typography>
                  {" "}
                  Yurtlar ve Kafeteryalar Müdürlüğü <br />
                  Gazimağusa, Kuzey Kıbrıs
                  <br />
                  Mersin 10, Turkey
                </Typography>
              </Typography>
            </Link>
          </Box>
        </Grid>
        <Grid
          textAlign={"center"}
          item
          xs={6}
          sm={12}
          md={4}
          lg={3}
          xl={3}
          xxl={3}
        >
          <Box
            sx={{
              textDecoration: "none",
              marginTop: "5%",
              letterSpacing: 1.2,
            }}
            width={"100%"}
          >
            <ul className="list-unstyled ">
              <Link
                to={"/about"}
                style={{ color: colors.grey[100], textDecoration: "none" }}
              >
                <li style={{ fontSize: 22, fontWeight: 600, marginTop: 0 }}>
                <ArrowForwardIosOutlinedIcon/>  Hakkımızda
                </li>
              </Link>
              <Link
                to={"/dorms"}
                style={{ color: colors.grey[100], textDecoration: "none" }}
              >
                <li style={{ fontSize: 22, fontWeight: 600, marginTop: 10 }}>
                <ArrowForwardIosOutlinedIcon/> Yurtlar
                </li>
              </Link>
              <Link
                to={"/rules"}
                style={{ color: colors.grey[100], textDecoration: "none" }}
              >
                <li style={{ fontSize: 22, fontWeight: 600, marginTop: 10 }}>
                <ArrowForwardIosOutlinedIcon/>  Kurallar
                </li>
              </Link>
              <Link
                to={"/campuslife"}
                style={{ color: colors.grey[100], textDecoration: "none" }}
              >
                {" "}
                <li style={{ fontSize: 22, fontWeight: 600, marginTop: 10 }}>
                <ArrowForwardIosOutlinedIcon/>  Kampüste Yaşam
                </li>
              </Link>
            </ul>
          </Box>
        </Grid>
        <Grid item xs={6} sm={12} md={4} lg={3} xl={3} xxl={3}>
          <Box
            sx={{
              textAlign: "center",
              textDecoration: "none",
              marginTop: "5%",
              letterSpacing: 1.2,
            }}
            width={"100%"}
          >
            <ul className="list-unstyled ">
              <Link
                to={"https://www.emu.edu.tr/tr"}
                style={{ color: colors.grey[100], textDecoration: "none" }}
              >
                <li style={{ fontSize: 22, fontWeight: 600, marginTop: 20 }}>
                <ArrowForwardIosOutlinedIcon/>  DAÜ Anasayfa
                </li>
              </Link>
              <Link
                to={"https://www.emu.edu.tr/haberler-etkinlikler-duyurular"}
                style={{ color: colors.grey[100], textDecoration: "none" }}
              >
                <li style={{ fontSize: 22, fontWeight: 600, marginTop: 20 }}>
                <ArrowForwardIosOutlinedIcon/>  DAÜ Haberler/ <br />
                  Etkinlikler
                </li>
              </Link>
              <Link
                to={"https://www.emu.edu.tr/akademiktakvim"}
                style={{ color: colors.grey[100], textDecoration: "none" }}
              >
                {" "}
                <li style={{ fontSize: 22, fontWeight: 600, marginTop: 20 }}>
                  <ArrowForwardIosOutlinedIcon/> Akademik Takvim
                </li>
              </Link>
            </ul>
          </Box>
        </Grid>
        <Grid item xs={6} sm={12} md={4} lg={2} xl={2} xxl={2}>
          <Box
            sx={{
              alignContent: "center",
              textAlign: "center",
              textDecoration: "none",
              marginTop: "0%",
              letterSpacing: 1.2,
            }}
            width={"100%"}
          >
            <ul className="list-unstyled ">
              <Link to={"https://websites.emu.edu.tr/tr"} style={{ color: colors.grey[100], textDecoration: "none" }}>
                <li style={{ fontSize: 22, fontWeight: 600, marginTop: 20 }}>
                <ArrowForwardIosOutlinedIcon/>  DAÜ WEB SİTELERİ
                </li>
              </Link>
            </ul>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
