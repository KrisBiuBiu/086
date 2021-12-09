import React, { Component } from 'react';
import { Row, Col, Input, Button, Tabs, Upload, Card, Collapse, Modal, } from 'antd';
import { makeHttpRequest } from '../../utils/fn';
import { PlusOutlined, CaretRightOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

class PlateSetting extends Component {
  constructor() {
    super();
    this.state = {
      topicName: "", // pass 密码登录；code 验证码登录
      topicDescription: "",
      topicIconBase64Url: "",
      categoryList: [],
      addCategoryModalVisible: false,
      categoryName: "",
      currentCid: ""
    };
  }

  async componentDidMount () {
    await this.getCategories()
  }

  getCategories = async () => {
    const res = await makeHttpRequest("get", "/api/categories", {});
    console.log(res)
    this.setState({ categoryList: res.data.categories });
    const { categories } = res.data;
    if (categories.length > 0) {
      this.setState({ currentCid: categories[0].categoryId })
    }
  }

  handleInputChange = (event, type) => {
    this.setState({ [type]: event.target.value })
  }

  handleSelectChange = (event, type) => {
    this.setState({ [type]: event.target.value })
  }

  createNewTopic = async () => {
    const { topicName, topicDescription, topicIconBase64Url, currentCid } = this.state;
    const res = await makeHttpRequest("post", "/api/topic", {
      name: topicName,
      description: topicDescription,
      base64Url: topicIconBase64Url,
      categoryId: parseInt(currentCid)
    });
    console.log(res)
  }

  handleUploadPlateIcon = (info) => {
    const reader = new FileReader();
    reader.readAsDataURL(info);
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        this.setState({ topicIconBase64Url: reader.result })
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
    const res = await makeHttpRequest("post", "/api/category", { name: categoryName });
    if (!res) return;
    this.closeAddCategoryModal();
  }

  render () {
    const { topicName, topicDescription, topicIconBase64Url, categoryList, addCategoryModalVisible, categoryName } = this.state;
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
            <Tabs onChange={this.handleTabsChange}
              tabBarExtraContent={<Button onClick={this.openAddCategoryModal}>添加分类</Button>}>
              {
                categoryList.map((category) => {
                  return (

                    <Tabs.TabPane tab={category.name} key={category.categoryId}>
                      {/* 板块设置 */}
                      <div >
                        <Collapse
                          defaultActiveKey={['1']}
                          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                          expandIconPosition="right"
                          accordion
                        >
                          <Collapse.Panel header="添加板块" key={`collapse-panel-${category.categoryId}`} >
                            <Row gutter={[8, 24]}>
                              <Col span={8} style={{ margin: "auto" }}>
                                <Col span={24}>
                                  <div>
                                    名称：
                                  </div>
                                  <Input value={topicName} onChange={(event) => this.handleInputChange(event, "topicName")} />
                                </Col>
                                <Col span={24}>
                                  <div>
                                    介绍：
                                  </div>
                                  <Input value={topicDescription} onChange={(event) => this.handleInputChange(event, "topicDescription")} />
                                </Col>
                              </Col>
                              <Col span={8} style={{ margin: "auto" }}>
                                <Col span={24} style={{ textAlign: "center" }}>
                                  <ImgCrop rotate>
                                    <Upload
                                      {...uploadPlateIconProps}
                                    >
                                      {topicIconBase64Url ? <img src={topicIconBase64Url} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                    </Upload>
                                  </ImgCrop>
                                </Col>
                              </Col>
                              <Col span={8}>
                                <Button type="primary" onClick={this.createNewTopic} style={{ position: "absolute", bottom: "0px" }}>
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
                            category.topicArr.map((topic) => {
                              return (
                                <Col xs={24} sm={12} md={10} lg={8} xl={6} key={`col-card-${topic.topicId}`}>
                                  <Card
                                    hoverable
                                    style={{ width: 240 }}
                                    title={topic.name}
                                    bodyStyle={{ padding: "10px" }}
                                    headStyle={{ padding: "0px 10px" }}
                                    key={`card-${topic.topicId}`}
                                    className="topic-card"
                                  >
                                    <div style={{ display: "flex" }}>
                                      <div style={{}}>
                                        <img style={{ width: "100%" }} src={`http://localhost:5001/topic/icon/${topic.topicId}`} alt="123" />
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