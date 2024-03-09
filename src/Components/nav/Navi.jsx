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

import emulogo from "../images/logoo.png";
import "../nav/navbar.css"

// eklentiler
import { CgProfile } from "react-icons/cg";

function Navi(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  // let lastScroll = 0;
  // window.addEventListener("scroll", () => {
  //   const currentScroll = window.scrollY;

  /*   if (currentScroll <= 0) {
      body.classList.remove("scroll-up");
    }
    if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
      body.classList.remove("scroll-up");
      body.classList.add("scroll-down");
    }
    if (currentScroll < lastScroll && body.classList.contains("scroll-down")) {
      body.classList.remove("scroll-down");
      body.classList.add("scroll-up");
    }
    if (currentScroll === currentScroll) {
      body.classList.add("scrolled-up");
    } if(currentScroll!==0) {
      body.classList.remove("scrolled-up");
    }
    lastScroll = currentScroll;
  });
  
  */

  return (
    <div className="navlinks fluid ">
      <Row noGutters>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <Navbar className="navbar" fixed="fixed" expand="xl" {...args}>
            <NavbarBrand className="mx-5 brand" href="/home">
              <img className="logo" height={110} width={220} src={emulogo} alt=""/>
            </NavbarBrand>
            <NavbarToggler className="" onClick={toggle} style={{color:"black",borderColor:"black",backgroundColor:"aliceblue"}}/>
            <Collapse isOpen={isOpen} navbar>
              <Nav className="nav mt-4 mx-auto" navbar >
            <NavItem className="mx-4 py-2">
                <a className="navlink" href="/anasayfa">
                  Ana Sayfa
                </a>
            </NavItem>
            <NavItem className="mx-4 py-2">
                <a className="navlink" href="/yurtlar">
                  Yurtlar
                </a>
            </NavItem>
            <NavItem className="mx-4 py-2">
                <a className="navlink" href="/akademik">
                  Akademik Takvim
                </a>
            </NavItem>
            <NavItem className="mx-5 py-2 profile"  >
                <a className="navlink " href="/login">
                <CgProfile className="mx-2 " style={{fontSize:50}}  />
 Ogrenci Adi / login 
                </a>
            </NavItem>
            
              </Nav>
            </Collapse>
          </Navbar>
        </Col>
      </Row>
    </div>
  );
}

export default Navi;
