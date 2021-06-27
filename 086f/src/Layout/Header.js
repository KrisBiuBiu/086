import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";
import { Layout, Menu, Button, Modal } from 'antd';
import SignModal from "../Components/SignModal";
import logo from '../logo.svg'
import cookies from '../utils/cookies';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      modalVisiable: false,
    };
  }
  handleCancel = () => {
    this.setState({
      modalVisiable: false
    })
  }
  handleOk = () => {
    this.setState({
      modalVisiable: true
    })
  }
  signOut = () => {
    console.log("signout");
    cookies.remove("token", { path: "/" })
    window.location.replace("/")
  }
  render () {
    const { modalVisiable } = this.state;
    const token = cookies.get("token");
    return (
      <>
        <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo">
            <img src={logo} style={{ verticalAlign: "top" }} alt={logo}></img>
          </div>
          <div className="header-menu-right">
            {
              token ? (
                <Button type="text" style={{ padding: "5px 10px", margin: "15px 0", color: "#fff" }} onClick={this.signOut}>Sign Out</Button>
              ) : (
                <>
                  <Button type="text" style={{ padding: "5px 10px", margin: "15px 0", color: "#fff" }} onClick={this.handleOk}>Sign In</Button>
                  <Button type="text" style={{ padding: "5px 10px", margin: "15px 0", color: "#fff" }}>Sign Up</Button>
                </>
              )
            }
          </div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/">Home</Link></Menu.Item>
            <Menu.Item key="2">
              <Link to="/about">About</Link></Menu.Item>
            <Menu.Item key="3">
              <Link to="/manage">Manage</Link></Menu.Item>
          </Menu>
        </Layout.Header>
        <div>
          <Modal title="Basic Modal" visible={modalVisiable} onOk={this.handleOk} onCancel={this.handleCancel}>
            <SignModal />
          </Modal>
        </div>
      </>
    );
  }
}

Header.propTypes = {

};

export default Header;