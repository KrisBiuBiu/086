import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";
import { Layout, Menu } from 'antd';

class Header extends Component {

  render () {
    return (
      <>
        <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/">Home</Link></Menu.Item>
            <Menu.Item key="2">
              <Link to="/about">About</Link></Menu.Item>
            <Menu.Item key="3">
              <Link to="/dashboard">Dashboard</Link></Menu.Item>
          </Menu>
        </Layout.Header>
      </>
    );
  }
}

Header.propTypes = {

};

export default Header;