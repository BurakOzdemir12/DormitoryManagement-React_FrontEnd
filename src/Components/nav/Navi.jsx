import React, { useState } from "react";
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
import { Button, Menu, MenuItem } from "@mui/material";
import emulogo from "../images/logoo.png";
import "../nav/navbar.css";
import { styled, alpha } from "@mui/material/styles";
//react eklentiler
import axios from "axios";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

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

function Navi(args) {
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
    // const token = localStorage.getItem("token");

    const fetchOneStudent = async () => {
      try {
        const tokendata = localStorage.getItem("token");
        const decoded = tokendata ? jwtDecode(tokendata) : null;
        const userId = decoded ? decoded.id : null;
        console.log(" user id", userId);

        const res = await axios.get(
          `http://localhost:8800/emu_students/${userId}`
        );

        setUserData(res.data);
      } catch (error) {
        console.error("There was an error fetching the user data!", error);
      }
    };
    fetchOneStudent();
  }, []);
  //Logout
  const handleLogout = async () => {
    try {
      
      localStorage.removeItem("token");
      setUserData(null);
      navigate("/login");
    } catch (error) {
      console.error("There was an error logging out!", error);
    }
    handleClose();
  };

  return (
    <div className="navlinks fluid ">
      <Row noGutters>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <Navbar className="navbar" fixed="fixed" expand="xl" {...args}>
            <NavbarBrand className="mx-5 brand" href="/home">
              <img
                className="logo"
                height={110}
                width={220}
                src={emulogo}
                alt=""
              />
            </NavbarBrand>
            <NavbarToggler
              className=""
              onClick={toggle}
              style={{
                color: "black",
                borderColor: "black",
                backgroundColor: "aliceblue",
              }}
            />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="nav mt-4 mx-auto" navbar>
                <NavItem className="mx-4 py-2">
                  <a className="navlink" href="/home">
                    Ana Sayfa
                  </a>
                </NavItem>
                <NavItem className="mx-4 py-2">
                  <a className="navlink" href="/dorms">
                    Yurtlar
                  </a>
                </NavItem>
                <NavItem className="mx-4 py-2">
                  <a
                    className="navlink"
                    href="https://www.emu.edu.tr/akademiktakvim"
                  >
                    Akademik Takvim
                  </a>
                </NavItem>
                {userData ? ( // If user is logged in
                  <NavItem className="mx-5 py-2 profile">
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
                      <MenuItem  onClick={handleLogout} disableRipple>
                      <LogoutOutlinedIcon/>Çıkış Yap
                      </MenuItem>
                    </StyledMenu>
                  </NavItem>
                ) : (
                  // If user is not logged in
                  <NavItem className="mx-5 py-2 profile">
                    <a className="navlink" href="/login">
                      <CgProfile className="mx-2" style={{ fontSize: 50 }} />
                      Giriş Yap
                    </a>
                  </NavItem>
                )}
              </Nav>
            </Collapse>
          </Navbar>
        </Col>
      </Row>
      <Outlet />
    </div>
  );
}

export default Navi;
