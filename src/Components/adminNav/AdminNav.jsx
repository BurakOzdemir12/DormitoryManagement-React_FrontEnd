import React, { useState } from 'react';
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
  CalendarOutlined
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
// const items = [
//   getItem('Option 1', '1', <PieChartOutlined  />),
//   getItem('Option 2', '2', <DesktopOutlined />),
//   getItem('Option 3', '3', <ContainerOutlined />),
//   getItem('Navigation One', 'sub1', <MailOutlined />, [
//     getItem('Option 5', '5'),
//     getItem('Option 6', '6'),
//     getItem('Option 7', '7'),
//     getItem('Option 8', '8'),
//   ]),
//   getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
//     getItem('Option 9', '9'),
//     getItem('Option 10', '10'),
//     getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
//   ]),
// ];
const AdminNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
<div className="">

    <div
      style={{ marginLeft:0,
        width: 256,
      }}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 1,
          marginTop:1,
          width:50,
          height:50,
          textAlign:'center',
          backgroundColor:"black",
          opacity:0.75
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        // defaultSelectedKeys={['1']}
        // defaultOpenKeys={['sub1']}
        mode="inline"
        style={{height:"100%"}}
        theme="dark"
        inlineCollapsed={collapsed}
        // items={items}
      >
        <MenuItem key="home" icon={<HomeOutlined/>} >Ana Sayfa</MenuItem>
        <MenuItem key="students" icon={<UserOutlined />} >Öğrenci Listesi</MenuItem>
        <MenuItem key="roomProps" icon={<MenuFoldOutlined/>} >Ana Sayfa</MenuItem>
        <MenuItem key="Rezervations" icon={<CalendarOutlined/>} >Rezervasyonlar</MenuItem>
        <MenuItem key="dormProps" icon={<SettingOutlined />} >Yurt Özellikleri</MenuItem>
      </Menu>
    </div>
</div>

  );
};
export default AdminNav;