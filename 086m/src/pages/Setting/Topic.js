import React, { Component } from 'react';
import { Row, Col, Input, Button, Tabs, Upload, Card, Collapse, Modal, Table, Tag } from 'antd';
import { makeHttpRequest } from '../../utils/fn';
import { PlusOutlined, CaretRightOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import {
  Link,
} from 'react-router-dom';

class Topic extends Component {
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

  async componentDidMount() {
    await this.getCategories()
  }

  getCategories = async () => {
    const res = await makeHttpRequest("get", "/api/categories", {});
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

  openAddTopicModal = (text, record) => {
    this.setState({ addTopicModalVisible: true, currentCid: record.categoryId })
  }

  closeAddTopicModal = () => {
    this.setState({ addTopicModalVisible: false })
  }

  createCategory = async () => {
    const { categoryName } = this.state;
    if (!categoryName) return;
    const res = await makeHttpRequest("post", "/api/category", { name: categoryName });
    if (!res) return;
    this.closeAddCategoryModal();
    this.getCategories()
  }

  createNewTopic = async () => {
    const { topicName, topicDescription, topicIconBase64Url, currentCid } = this.state;
    await makeHttpRequest("post", "/api/topic", {
      name: topicName,
      description: topicDescription,
      base64Url: topicIconBase64Url,
      categoryId: parseInt(currentCid)
    });
    this.getCategories()
  }

  renderCategoriesTable = () => {
    const { categoryList } = this.state;
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: '话题',
        key: 'topicArr',
        dataIndex: 'topicArr',
        render: topicArr => (
          <>
            {topicArr.map(topic => {
              return (
                <Link to={`/setting/topicDefault/${topic.topicId}`} style={{ cursor: "pointer" }}>
                  <Tag color={topic.color} key={topic.name}>
                    {topic.name.toUpperCase()}
                  </Tag>
                </Link>
              );
            })}
          </>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Button type="link" onClick={() => this.openAddTopicModal(text, record)}>
            ADD
          </Button>
        ),
      },
    ];

    return (
      <Table columns={columns} dataSource={categoryList} />
    )

  }

  render() {
    const { topicName, topicDescription, topicIconBase64Url, categoryList, addCategoryModalVisible, addTopicModalVisible, categoryName } = this.state;
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
            <Button onClick={this.openAddCategoryModal}>添加分类</Button>
            {
              this.renderCategoriesTable()
            }

          </div>
          <Modal
            title="添加分类"
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
          <Modal
            title="添加话题"
            visible={addTopicModalVisible}
            onOk={this.createNewTopic}
            onCancel={this.closeAddTopicModal}
            okText="提交"
            cancelText="取消"
          >
            <Row gutter={[8, 24]}>
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
              <Col span={24} style={{ textAlign: "center" }}>
                <ImgCrop rotate>
                  <Upload
                    {...uploadPlateIconProps}
                  >
                    {topicIconBase64Url ? <img src={topicIconBase64Url} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                  </Upload>
                </ImgCrop>
              </Col>
            </Row>
          </Modal>
        </div>
      </>
    );
  }
}

Topic.propTypes = {

};

export default Topic;