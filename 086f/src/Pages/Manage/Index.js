import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'antd';
import { makeHttpQuery } from '../../utils/fn';
import AvaUpload from './AvaUpload';

class Manage extends Component {
  constructor() {
    super();
    this.state = {
      plateName: "", // pass 密码登录；code 验证码登录
      plateDescription: ""
    };
  }
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
    return (
      <>
        <div style={{ marginTop: "10px" }}>
          <Row style={{ margin: "5px 0px" }} gutter={8}>
            <Col span={8}>
              <Row>
                <Col span={24}>
                  <Input value={plateName} onChange={(event) => this.handleInputChange(event, "plateName")} />
                </Col>
                <Col span={24}>
                  <Input value={plateDescription} onChange={(event) => this.handleInputChange(event, "plateDescription")} />
                </Col>
                <Col span={24}>
                  <Button type="primary" style={{ background: "#325437", color: "#fff", borderColor: "#325437" }} shape="round" onClick={this.addNewThread}>
                    提交
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col span={16}>
              <AvaUpload />
            </Col>
            {/* <Col span={24}>

              <div style={{ width: "50%", float: "right" }} >
                <h1>Preview</h1>
                <div
                  className="uploadCrop"
                  style={{ width: "100%", float: "left", height: "300px" }}
                />
              </div>
            </Col> */}
          </Row>
        </div>
      </>
    );
  }
}

Manage.propTypes = {

};

export default Manage;