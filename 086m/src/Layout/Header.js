import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";
import { Layout, Menu, Button, Modal, Popover, List } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import logo from '../logo.svg'
import cookies from '../utils/cookies';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      modalVisiable: false,
    };
  }

  render() {
    const { modalVisiable } = this.state;
    const token = cookies.get("token");
    return (
      <>
        <Layout.Header className="site-layout-header-background" style={{ padding: 0, position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="header-menu-right">
            <Button type="text" style={{ padding: "5px 10px", margin: "15px 0", color: "#fff" }}>登录/注册</Button>
          </div>
        </Layout.Header>
      </>
    );
  }
}

Header.propTypes = {

};

export default Header;