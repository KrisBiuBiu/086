import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';
const { SubMenu } = Menu;

class Sider extends Component {
  state = {
    collapsed: false,
  };
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render () {
    const { collapsed } = this.state;
    return (
      <>

        <Layout.Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="12" icon={<UserOutlined />} >
              <Link to="/plateSetting">Plate Setting</Link>
            </Menu.Item>
            <SubMenu key="setting" icon={<SettingOutlined />} title="Setting">
              <Menu.Item key="topic">
                <Link to="/setting/topic">Topic</Link>
              </Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Layout.Sider>
      </>
    );
  }
}

Sider.propTypes = {

};

export default Sider;