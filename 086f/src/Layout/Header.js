import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import {
  Layout, Menu, Button, Modal, Popover, List,
} from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import SignModal from '../Components/SignModal';
import logo from '../logo.svg';
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
      modalVisiable: false,
    });
  }

  handleOk = () => {
    this.setState({
      modalVisiable: true,
    });
  }

  turnToUserHomePage = () => {
    window.location.replace('/user-homepage');
  }

  turnToUserSetting = () => {
    window.location.replace('/user-setting');
  }

  signOut = () => {
    console.log('signout');
    cookies.remove('token', { path: '/' });
    window.location.replace('/');
  }

  renderAvatorDropDown = () => {
    const data = [
      {
        text: '个人主页', img: <UserOutlined />,
        fn: this.turnToUserHomePage
      },
      {
        text: '账号设置', img: <SettingOutlined />,
        fn: this.turnToUserSetting
      },
      {
        text: '退出', img: <LogoutOutlined />,
        fn: this.signOut
      },
    ];
    return (
      <List
        size="small"
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Button
              type="text"
              icon={item.img}
              onClick={item.fn}
            >
              {item.text}
            </Button>
          </List.Item>
        )}
      />
    );
  }

  render() {
    const { modalVisiable } = this.state;
    const token = cookies.get('token');
    return (
      <>
        <Layout.Header
          className="cj-layout-header"
        >
          <div className="logo">
            <Link to={`/`}>
              <img
                src={logo}
                alt={logo}
                className="logo-icon"
              />
            </Link>
            <Link to={`/`}>
              <span
                className="logo-title">
                测试
              </span>
            </Link>
          </div>
          <div className="header-menu-right">
            {
              token ? (
                <Popover
                  placement="bottomRight"
                  content={this.renderAvatorDropDown}
                  trigger="click"
                >
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<UserOutlined />}
                  />
                </Popover>
              ) : (
                <>
                  <Button
                    type="text"
                    style={{
                      padding: '5px 10px',
                      // margin: '15px 0',
                      color: '#000',
                    }}
                    onClick={this.handleOk}
                  >
                    登录/注册
                  </Button>
                </>
              )
            }
          </div>
          <ul
            className="header-menu">
            <li>
              <Link to="/">首页</Link></li>
            <li>
              <Link to="/latest">最新</Link></li>
            <li>
              <Link to="/manage">Manage</Link></li>
          </ul>
        </Layout.Header>
        <div>
          <Modal
            title=""
            width="380px"
            visible={modalVisiable}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
          >
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
