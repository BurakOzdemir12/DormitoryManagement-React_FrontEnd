import React, { useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  CalendarOutlined,
  HomeFilled,
  UploadOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, theme, Button, Menu, Drawer, Space, Switch } from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import "../adminNav/adminNav.css";
import { Outlet } from "react-router-dom";
import {
  CardImgOverlay,
  Col,
  Collapse,
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Row,
} from "reactstrap";
import { CgProfile } from "react-icons/cg";
import SideNav from "../layout/SideNav";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const AdminNav = () => {
  const { Header, Sider, Content } = Layout;

  const [theme, setTheme] = useState("dark");
  const changeTheme = (value) => {
    setTheme(value ? "dark" : "light");
  };
  //drawer

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const [size, setSize] = useState();
  const showDrawer = () => {
    setOpen(true);
    // setSize('large');
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  const onClose = () => {
    setOpen(false);
  };
  //
  if (window.innerWidth >= 1024) {
  }

  return (
    <>
      <Layout className=" " style={{}}>
        
        <Drawer
          theme={theme}
          // size={size}
          placement={placement}
          width={250}
          onClose={onClose}
          open={open}
          extra={
            <Space>
              <Button onClick={onClose}>Kapat</Button>
              {/* <Button type="primary" onClick={onClose}>
            OK
          </Button> */}
            </Space>
          }
        >
          <Switch
            checked={theme === "dark"}
            onChange={changeTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
            className="mb-5 mx-5"
          />

          <Sider className="sider " style={{}}>
            <div className="demo-logo-vertical " />
            <Menu theme={theme}>
              <MenuItem>
                <HomeOutlined className="mx-2 " />
                Ana Sayfa
              </MenuItem>
              <MenuItem>
                <HomeOutlined className="mx-2 " />
                Ana Sayfa
              </MenuItem>
              <MenuItem>
                <HomeOutlined className="mx-2 " />
                Ana Sayfa
              </MenuItem>
              <MenuItem>
                <HomeOutlined className="mx-2 " />
                Ana Sayfa
              </MenuItem>
            </Menu>
          </Sider>
        </Drawer>

        <Layout className="">
        <Header
        className="TopHeader mb-2"
          style={{
            
            backgroundColor: "white",
            
          }}
        >
          <Button
          type="primary"
          icon={<MenuUnfoldOutlined />}
          onClick={showDrawer}
          // onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 54,
            height: 54,
          }}
        />
        </Header>
        {/* <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: "",
            borderRadius:"s"
          }}
        >
          Content
        </Content> */}
      </Layout>

        {/* <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        width={250}
        theme="light"
        className={`sider-primary ant-layout-sider-primary ${
          sidenavType === "#fff" ? "active-route" : ""
        }`}
        style={{ background: sidenavType }}
      >
        <SideNav color={sidenavColor} />
      </Sider> */}
      </Layout>
    </>
  );
};
export default AdminNav;
