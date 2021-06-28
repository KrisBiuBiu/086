import React, { Component } from 'react';
import { Row, Col, Input, Button, Collapse } from 'antd';
import { makeHttpQuery } from '../../utils/fn';
import { CaretRightOutlined } from "@ant-design/icons";

class AccountSetting extends Component {
  constructor() {
    super();
    this.state = {
      plateName: "", // pass 密码登录；code 验证码登录
      plateDescription: ""
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

  addNewThread = async () => {
    const { plateName, plateDescription } = this.state;
    console.log(plateName, plateDescription)
    const res = await makeHttpQuery("/plate/create", { name: plateName, description: plateDescription });
    console.log(res)
  }

  render() {
    const { plateName, plateDescription } = this.state;
    console.log("test rrr");
    const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
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
                  <Input placeholder="请输入标题" onChange={(event) => this.handleInputChange(event, "title")} />
                </Col>
                <Col span={24}>
                  <div>
                    个人简介：
                  </div>
                  <Input.TextArea rows={4} showCount maxLength={100} placeholder="请输入标题" />
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