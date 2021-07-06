import React, { Component } from 'react';
import { Row, Col, Tag, Avatar, Form, Input, Button, Checkbox, Select, Tabs, Upload, Card } from 'antd';
import PlateCategoryTags from './Component/PlateCategoryTags';
import { makeHttpQuery, makeHttpRequest } from '../../utils/fn';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import cookies from '../../utils/cookies';

class PlateSetting extends Component {
  constructor() {
    super();
    this.state = {
      plateName: "", // pass 密码登录；code 验证码登录
      plateDescription: "",
      plateIconBase64Url: "",
      plateList: []
    };
  }

  async componentDidMount() {
    // this.setState({ tid: this.props.match.params.id });
    await this.getThreadInfo()
  }

  getThreadInfo = async () => {
    const res = await makeHttpRequest("get", "/api/plates", {});
    console.log(res)
    this.setState({ plateList: res.data.list })
    // this.setState({ thread: res.data.thread })
    // console.log(res)
  }

  handleInputChange = (event, type) => {
    this.setState({ [type]: event.target.value })
  }

  handleSelectChange = (event, type) => {
    this.setState({ [type]: event.target.value })
  }

  addNewThread = async () => {
    const { plateName, plateDescription } = this.state;
    console.log(plateName, plateDescription)
    const res = await makeHttpQuery("/plate/create", { name: plateName, description: plateDescription });
    console.log(res)
  }

  createNewPlate = async () => {
    const { plateName, plateDescription, plateIconBase64Url } = this.state;
    const res = await makeHttpRequest("post", "/api/plate", {
      name: plateName,
      description: plateDescription,
      base64Url: plateIconBase64Url
    });
    console.log(res)
  }

  handleUploadPlateIcon = (info) => {
    const reader = new FileReader();
    reader.readAsDataURL(info);
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        this.setState({ plateIconBase64Url: reader.result })
        reject(false)
      }
    })
  }

  render() {
    const { plateName, plateDescription, plateIconBase64Url, plateList } = this.state;
    const uploadPlateIconProps = {
      name: "avatar",
      listType: "picture-card",
      showUploadList: false,
      className: "avatar-uploader",
      beforeUpload: (info) => this.handleUploadPlateIcon(info)
    };
    const uploadButton = (
      <div>
        {<PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <div>
          {/* 功能切换 */}
          <div>
            <Tabs defaultActiveKey="1" centered>
              <Tabs.TabPane tab="板块列表" key="1">
                {/* 板块列表 */}
                <div style={{ marginTop: "20px" }}>
                  <Row>
                    {
                      plateList.map((plate) => {
                        return (
                          <Col span={6}>

                            <Card
                              hoverable
                              style={{ width: 240 }}
                              bodyStyle={{ padding: "10px" }}
                            >
                              <div style={{ display: "flex" }}>
                                <div style={{ flex: 3, marginRight: "10px" }}>
                                  <img style={{ width: "100%" }} src={`http://localhost:5001/plate/icon/${plate.pid}`} />
                                </div>
                                <div style={{ flex: 5 }}>
                                  <p style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {plate.name}
                                  </p>
                                  <p style={{ fontSize: "10px", textAlign: "center" }}>
                                    {plate.description}
                                  </p>
                                </div>
                              </div>
                            </Card>
                          </Col>
                        )
                      })
                    }
                  </Row>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="板块设置" key="2">
                {/* 板块分类 */}
                <div style={{ background: "#fff", padding: "20px" }}>
                  <PlateCategoryTags />
                </div>
                {/* 添加板块 */}
                <div style={{ background: "#fff", padding: "20px", marginTop: "20px" }}>
                  <Row style={{ margin: "5px 0px" }} gutter={[8, 24]}>
                    <Col span={12}>
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
                        <ImgCrop rotate>
                          <Upload
                            {...uploadPlateIconProps}
                          >
                            {plateIconBase64Url ? <img src={plateIconBase64Url} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                          </Upload>
                        </ImgCrop>
                      </Col>
                    </Col>
                    <Col span={24}>
                      <Button type="primary" onClick={this.createNewPlate}>
                        提交
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </>
    );
  }
}

PlateSetting.propTypes = {

};

export default PlateSetting;