import React, { Component } from 'react';
import { Row, Col, Input, Button, Collapse } from 'antd';
import { makeHttpQuery } from '../../utils/fn';
import { CaretRightOutlined } from "@ant-design/icons";

class AccountSetting extends Component {
  constructor() {
    super();
    this.state = {
      username: "", // pass 密码登录；code 验证码登录
      description: ""
    };
  }

  // getUserInfo = async() => {
  //   await makeHttpQuery("/user", {})
  // }

  onChange = (a, b, c) => {
    console.log(a, b, c);
  }

  handleInputChange = (event, type) => {
    this.setState({ [type]: event.target.value })
  }

  updateInfo = async () => {
    const { username, description } = this.state;
    const res = await makeHttpQuery("/user/updateInfo", { username, description });
    console.log(res)
  }

  render() {
    const { username, description } = this.state;
    return (
      <>
        <div style={{ marginTop: "5px" }}>
          <h3>基本设置</h3>
          <Row style={{ margin: "5px 0px" }} gutter={48}>
            <Col span={12} style={{ paddingLeft: 0 }}>
              <Row gutter={[8, 24]}>
                <Col span={24}>
                  <div>
                    昵称：
                  </div>
                  <Input onChange={(event) => this.handleInputChange(event, "username")} value={username} />
                </Col>
                <Col span={24}>
                  <div>
                    个人简介：
                  </div>
                  <Input.TextArea rows={4} showCount maxLength={100} placeholder="个人简介" value={description} onChange={(event) => this.handleInputChange(event, "description")} />
                </Col>
                <Col span={24}>
                  <Button type="primary" onClick={this.updateInfo}>更新个人信息</Button>
                </Col>
              </Row>
            </Col>
            {/* <Col span={12} style={{ paddingRight: 0 }}>
              <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
              >
                <Collapse.Panel header="昵称" key="1" className="site-collapse-custom-panel">
                  <p>{text}</p>
                </Collapse.Panel>
                <Collapse.Panel header="头像" key="2" className="site-collapse-custom-panel">
                  <p>{text}</p>
                </Collapse.Panel>
                <Collapse.Panel header="密码" key="3" className="site-collapse-custom-panel">
                  <p>{text}</p>
                </Collapse.Panel>
              </Collapse>
            </Col> */}
          </Row>
        </div>
      </>
    );
  }
}

AccountSetting.propTypes = {

};

export default AccountSetting;