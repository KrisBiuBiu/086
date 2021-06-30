import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'antd';
import { makeHttpQuery } from '../../utils/fn';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

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

  setCropper = (instance) => {
    console.log(instance)
  }

  render () {
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
              <Cropper
                style={{ width: "300", height: "200" }}
                aspectRatio={1}
                zoomTo={2}
                initialAspectRatio={1}
                preview=".uploadCrop"
                viewMode={1}
                guides={true}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false}
                src={'http://localhost:5001/statics/19.gif'}
                ref={cropper => { this.cropper = cropper }}
                onInitialized={(instance) => {
                  this.setCropper(instance);
                }}
              />
            </Col>
            <Col span={24}>

              <div style={{ width: "50%", float: "right" }} >
                <h1>Preview</h1>
                <div
                  className="uploadCrop"
                  style={{ width: "100%", float: "left", height: "300px" }}
                />
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

Manage.propTypes = {

};

export default Manage;