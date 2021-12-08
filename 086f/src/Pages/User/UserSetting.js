import React, { Component } from 'react';
import {
  Row, Col, Input, Button, Tabs,
} from 'antd';
import { makeHttpQuery } from '../../utils/fn';
import AccountSetting from '../../Components/User/AccountSetting';

class UserSetting extends Component {
  constructor() {
    super();
    this.state = {
      plateName: '', // pass 密码登录；code 验证码登录
      plateDescription: '',
    };
  }

  onChange = (a, b, c) => {
    console.log(a, b, c);
  }

  handleInputChange = (event, type) => {
    this.setState({ [type]: event.target.value });
  }

  addNewThread = async () => {
    const { plateName, plateDescription } = this.state;
    console.log(plateName, plateDescription);
    const res = await makeHttpQuery('/plate/create', { name: plateName, description: plateDescription });
    console.log(res);
  }

  render() {
    const { plateName, plateDescription } = this.state;
    return (
      <>
        <div style={{ marginTop: '10px', background: '#fff' }}>
          <Row style={{ padding: '20px' }} gutter={8}>
            <Col span={24}>
              <Tabs defaultActiveKey="1" tabPosition="left" style={{ width: '100%' }}>
                <Tabs.TabPane tab="基本设置" key="1">
                  <AccountSetting />
                </Tabs.TabPane>
                <Tabs.TabPane tab="安全设置" key="2">
                  Content of Tab Pane 2
                </Tabs.TabPane>
                <Tabs.TabPane tab="账号绑定" key="3">
                  Content of Tab Pane 3
                </Tabs.TabPane>
                <Tabs.TabPane tab="新消息通知" key="4">
                  Content of Tab Pane 3
                </Tabs.TabPane>
              </Tabs>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

UserSetting.propTypes = {

};

export default UserSetting;
