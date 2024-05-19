import React, { useContext, useState } from "react";
import "../nav/navbar.css";
import {
  Col,
  Collapse,
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Row,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// logo/style
import { CgProfile } from "react-icons/cg";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {
  Box,
  Button,
  Container,
  Grid,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import emulogo from "../images/logoo.png";
import "../nav/navbar.css";
import { styled, alpha } from "@mui/material/styles";
//react eklentiler
import axios from "axios";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";
import { ColorModeContext, tokens } from "../../theme";
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function Navi(args,{user}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const cookies = new Cookies();

  //Login Logout buttons

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    const token = cookies.get("jwt_auth");

    const fetchUserData = async () => {
      try {
        if (token) {
          const decoded = jwtDecode(token);
          const userId = decoded ? decoded.id : null;

          const res = await axios.get(
            `http://localhost:8800/emu_students/${userId}`
          );

          setUserData(res.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [cookies]); // Fetch user data when cookies change

  //Logout
  const handleLogout = async () => {
    try {
      // localStorage.removeItem("token");

      cookies.remove("jwt_auth");

      setUserData(null);
      navigate("/login");
      
      window.location.reload();
    } catch (error) {
      console.error("There was an error logging out!", error);
    }
    handleClose();
  };

  return (
    <Box className="navlinks fluid mt-0">
      <hr />
      <Row noGutters>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <Container>
            <Grid
              container
              sx={{
                alignItems: "center",
              }}
            >
              <Grid
                className="firstGrid"
                item
                xxl={6}
                xl={5}
                lg={6}
                md={6}
                sm={12}
                xs={12}
                display={"flex"}
              >
                <NavbarBrand className="mx-0 brand" href="/home">
                  <img
                    className="logo"
                    height={110}
                    width={220}
                    src={emulogo}
                    alt=""
                  />
                </NavbarBrand>
                <Typography
                  sx={{
                    
                    color: colors.blueAccent[1000],
                    fontSize: { xs: 20, sm: 25, md: 30, lg: 30, xl: 35 },
                    fontWeight: "bold",
                  }}
                >
                  Doğu Akdeniz <br /> Üniversitesi
                </Typography>
              </Grid>
              <Grid
                className="secondGrid"
                item
                xxl={6}
                xl={7}
                lg={6}
                md={6}
                sm={12}
                xs={12}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 20, sm: 25, md: 30, lg: 30, xl: 35 },
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Yurtlar ve Kafeteryalar Müdürlüğü
                </Typography>
              </Grid>
            </Grid>
          </Container>
          <Navbar
            className="navbar"
            fixed="fixed"
            expand="xl"
            {...args}
            backgroundColor={colors.primary[400]}
          >
            <NavbarToggler
              className="Ntoggler"
              onClick={toggle}
              style={{
                
                color: "black",
                borderColor: "black",
                backgroundColor: "aliceblue",
              }}
            />

            <Collapse isOpen={isOpen} navbar >
              <Nav
                className="nav mt-1 mx-auto"
                navbar
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  backgroundColor: colors.blueAccent[800],
                }}
              >
                <NavItem className="mx-4 py-2">
                  <Link
                  to="/home"
                    style={{ color: colors.grey[100] }}
                    className="navlink"
                    
                  >
                    Ana Sayfa
                  </Link>
                </NavItem>
                <NavItem className="mx-4 py-2">
                  <Link
                  to="/dorms"
                    style={{ color: colors.grey[100] }}
                    className="navlink"
                    
                  >
                    Yurtlar
                  </Link>
                </NavItem>
                <NavItem className="mx-4 py-2">
                  <Link
                  to="https://www.emu.edu.tr/akademiktakvim"
                    style={{ color: colors.grey[100] }}
                    className="navlink"
                  >
                    Akademik Takvim
                  </Link>
                </NavItem>
                {userData ? ( // If user is logged in
                  <NavItem
                    style={{ color: colors.grey[100] }}
                    className=" mx-5 py-2 profile"
                  >
                    <span
                      style={{ cursor: "pointer" }}
                      className="navlink"
                      id="demo-customized-button"
                      aria-controls={open ? "demo-customized-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      variant="contained"
                      disableElevation
                      onClick={handleClick}
                      // endIcon={<KeyboardArrowDownIcon />}
                    >
                      <CgProfile className="mx-2" style={{ fontSize: 40 }} />
                      {userData.firstName} {""} {userData.lastName}
                    </span>
                    <StyledMenu
                      id="demo-customized-menu"
                      MenuListProps={{
                        "aria-labelledby": "demo-customized-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose} disableRipple>
                        Profil
                      </MenuItem>
                      <MenuItem onClick={handleLogout} disableRipple>
                        <LogoutOutlinedIcon />
                        Çıkış Yap
                      </MenuItem>
                    </StyledMenu>
                  </NavItem>
                  
                ) : (
                  // If user is not logged in
                  <NavItem className=" mx-5 py-2 profile">
                    <Link
                    to="/login"
                      style={{ color: colors.grey[100] }}
                      className="navlink"
                    >
                      <CgProfile className="mx-2" style={{ fontSize: 50 }} />
                      Giriş Yap
                    </Link>
                  </NavItem>
                )}
              </Nav>
            </Collapse>
          </Navbar>
        </Col>
      </Row>
      <Outlet />
    </Box>
  );
}

export default Navi;
