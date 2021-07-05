import React, { Component } from 'react';
import { Row, Col, Tag, Avatar, Form, Input, Button, Checkbox } from 'antd';
import { makeHttpQuery, makeHttpRequest } from '../../utils/fn';

class Plate extends Component {
  constructor() {
    super();
    this.state = {
      plateName: "", // pass 密码登录；code 验证码登录
      plateDescription: ""
    };
  }

  async componentDidMount() {
    // this.setState({ tid: this.props.match.params.id });
    await this.getThreadInfo()
  }

  getThreadInfo = async () => {
    const res = await makeHttpRequest("get", "/api/plates", {});
    console.log(res)
    // this.setState({ thread: res.data.thread })
    // console.log(res)
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
    return (
      <>
        <div>
          {/* 添加板块 */}
          <div style={{ background: "#fff", padding: "20px" }}>
            <Row style={{ margin: "5px 0px" }} gutter={[8, 24]}>
              <Col span={24}>
                <div>
                  名称：
                </div>
                <Input value={plateName} onChange={(event) => this.handleInputChange(event, "plateName")} />
              </Col>
              <Col span={24}>
                <div>
                  介绍：
                </div>
                <Input value={plateDescription} onChange={(event) => this.handleInputChange(event, "plateDescription")} />
              </Col>
              <Col span={24}>
                <Button type="primary" onClick={this.addNewThread}>
                  提交
                </Button>
              </Col>
            </Row>
          </div>
          {/* 板块列表 */}
          <div style={{ background: "#fff", marginTop: "20px" }}>

            <Row>
              132456
            </Row>
          </div>
        </div>
      </>
    );
  }
}

Plate.propTypes = {

};

export default Plate;