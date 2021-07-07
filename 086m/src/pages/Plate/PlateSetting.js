import React, { Component } from 'react';
import { Row, Col, Input, Button, Tabs, Upload, Card, Collapse, Modal, } from 'antd';
import { makeHttpRequest } from '../../utils/fn';
import { PlusOutlined, CaretRightOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

class PlateSetting extends Component {
  constructor() {
    super();
    this.state = {
      plateName: "", // pass 密码登录；code 验证码登录
      plateDescription: "",
      plateIconBase64Url: "",
      plateCategoryList: [],
      addCategoryModalVisible: false,
      categoryName: "",
      currentCid: ""
    };
  }

  async componentDidMount() {
    await this.getPlateCategory()
  }

  getPlateCategory = async () => {
    const res = await makeHttpRequest("get", "/api/plate/categorys", {});
    this.setState({ plateCategoryList: res.data.list });
    const { list } = res.data;
    if (list.length > 0) {
      this.setState({ currentCid: list[0].cid })
    }
  }

  handleInputChange = (event, type) => {
    this.setState({ [type]: event.target.value })
  }

  handleSelectChange = (event, type) => {
    this.setState({ [type]: event.target.value })
  }

  createNewPlate = async () => {
    const { plateName, plateDescription, plateIconBase64Url, currentCid } = this.state;
    const res = await makeHttpRequest("post", "/api/plate", {
      name: plateName,
      description: plateDescription,
      base64Url: plateIconBase64Url,
      cid: parseInt(currentCid)
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

  handleTabsChange = (event) => {
    this.setState({ currentCid: event })
  }

  openAddCategoryModal = () => {
    this.setState({ addCategoryModalVisible: true })
  }

  closeAddCategoryModal = () => {
    this.setState({ addCategoryModalVisible: false })
  }

  createCategory = async () => {
    const { categoryName } = this.state;
    if (!categoryName) return;
    console.log(categoryName)
    const res = await makeHttpRequest("post", "/api/plate/category", { name: categoryName });
    if (!res) return;
    this.closeAddCategoryModal();
  }

  render() {
    const { plateName, plateDescription, plateIconBase64Url, plateCategoryList, addCategoryModalVisible, categoryName } = this.state;
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
            <Tabs onChange={this.handleTabsChange} tabBarExtraContent={<Button onClick={this.openAddCategoryModal}>添加分类</Button>}>
              {
                plateCategoryList.map((category) => {
                  return (

                    <Tabs.TabPane tab={category.name} key={category.cid}>
                      {/* 板块设置 */}
                      <div >
                        <Collapse
                          defaultActiveKey={['1']}
                          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                          expandIconPosition="right"
                          accordion
                        >
                          <Collapse.Panel header="添加板块" key={`collapse-panel-${category.cid}`} >
                            <Row gutter={[8, 24]}>
                              <Col span={8} style={{ margin: "auto" }}>
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
                              </Col>
                              <Col span={8} style={{ margin: "auto" }}>
                                <Col span={24} style={{ textAlign: "center" }}>
                                  <ImgCrop rotate>
                                    <Upload
                                      {...uploadPlateIconProps}
                                    >
                                      {plateIconBase64Url ? <img src={plateIconBase64Url} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                    </Upload>
                                  </ImgCrop>
                                </Col>
                              </Col>
                              <Col span={8}>
                                <Button type="primary" onClick={this.createNewPlate} style={{ position: "absolute", bottom: "0px" }}>
                                  提交
                                </Button>
                              </Col>
                            </Row>
                          </Collapse.Panel>
                          <Collapse.Panel header="修改分类" key="2" >
                            <p>text</p>
                          </Collapse.Panel>
                        </Collapse>
                      </div>
                      {/* 板块列表 */}
                      <div style={{ marginTop: "20px" }}>
                        <Row>
                          {
                            category.plateArr.map((plate) => {
                              return (
                                <Col span={6} key={`col-card-${plate.pid}`}>
                                  <Card
                                    hoverable
                                    style={{ width: 240 }}
                                    bodyStyle={{ padding: "10px" }}
                                    key={`card-${plate.pid}`}
                                  >
                                    <div style={{ display: "flex" }}>
                                      <div style={{ flex: 3, marginRight: "10px" }}>
                                        <img style={{ width: "100%" }} src={`http://localhost:5001/plate/icon/${plate.pid}`} alt="123" />
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
                  )
                })
              }
            </Tabs>
          </div>
          <Modal
            title="Modal"
            visible={addCategoryModalVisible}
            onOk={this.createCategory}
            onCancel={this.closeAddCategoryModal}
            okText="提交"
            cancelText="取消"
          >
            <div>
              名称：
            </div>
            <Input value={categoryName} onChange={(event) => this.handleInputChange(event, "categoryName")} />
          </Modal>
        </div>
      </>
    );
  }
}

PlateSetting.propTypes = {

};

export default PlateSetting;