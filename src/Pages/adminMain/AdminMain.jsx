import React from "react";
import AdminNav from "../../Components/adminNav/AdminNav";
import { Outlet } from "react-router-dom";
import { Col, Row } from "reactstrap";
import "../adminMain/adminMain.css";

const AdminMain = () => {
  return (
    <div className="">
      <Row noGutters>
      {/* <AdminNav /> */}


      <Col className="adminhome">
        <h4 className=" mt-5 mx-0">Admin Home Page</h4>
      </Col>
      </Row>
    </div>
  );
};

export default AdminMain;
