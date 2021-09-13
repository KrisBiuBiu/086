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

  turnToUserInfo = () => {
    window.location.replace('/user');
  }

  signOut = () => {
    console.log('signout');
    cookies.remove('token', { path: '/' });
    window.location.replace('/');
  }

  renderAvatorDropDown = () => {
    const data = [
      { text: '个人主页', img: <UserOutlined />, fn: this.turnToUserInfo },
      {
        text: '账号设置', img: <SettingOutlined />,
      },
      { text: '退出', img: <LogoutOutlined />, fn: this.signOut },
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
          style={{
            position: 'fixed',
            zIndex: 1,
            width: '100%',
          }}
        >
          <div className="logo">
            <img
              src={logo}
              style={{ verticalAlign: 'top' }}
              alt={logo}
            />
          </div>
          <div className="header-menu-right">
            {
              token ? (
                // onClick={this.signOut}
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
                      margin: '15px 0',
                      color: '#fff',
                    }}
                    onClick={this.handleOk}
                  >
                    登录/注册
                  </Button>
                </>
              )
            }
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
          >
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/about">About</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/manage">Manage</Link>
            </Menu.Item>
          </Menu>
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
