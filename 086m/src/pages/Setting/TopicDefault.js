import React, { Component } from 'react';
import { Row, Col, Input, Button, Tabs, Upload, Card, Collapse, Modal, message } from 'antd';
import { makeHttpRequest } from '../../utils/fn';
import { PlusOutlined, CaretRightOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { HexColorPicker } from 'react-colorful';

class TopicDefault extends Component {
  constructor() {
    super();
    this.state = {
      topicInfo: {},
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
    console.log(this.props.match.params.topicId)
    await this.getTopicConfiguration()
  }

  getTopicConfiguration = async () => {
    const res = await makeHttpRequest("get", `/topic/info/${this.props.match.params.topicId}`, { topicId: this.props.match.params.topicId });
    this.setState({ topicInfo: res.data.info });
  }

  handleTopicInfoInputChange = (event, type) => {
    const { topicInfo } = this.state;
    const topicInfoTmp = JSON.parse(JSON.stringify(topicInfo));
    topicInfoTmp[type] = event.target.value;
    this.setState({ topicInfo: topicInfoTmp })
  }

  handleColorPickerChange = (color) => {
    console.log(color)
    const { topicInfo } = this.state;
    const topicInfoTmp = JSON.parse(JSON.stringify(topicInfo));
    topicInfoTmp.color = color;
    this.setState({ topicInfo: topicInfoTmp })
  }

  saveTopicConfiguration = async () => {
    const { topicInfo, topicIconBase64Url } = this.state;
    const res = await makeHttpRequest("post", "/topic/saveTopic", {
      topicId: topicInfo.topicId,
      topicInfo,
      topicIconBase64Url
    });
    console.log(res)
    message.success('修改成功');
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
    const { topicInfo, topicIconBase64Url } = this.state;
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
        <div style={{ marginTop: '10px', background: '#fff' }}>
          <Row style={{ padding: '20px' }} gutter={[8, 32]}>
            <Col span={24}>
              <h4 className="editorTitle">
                名称 (最少5个字)：
              </h4>
              <Input placeholder="请输入名称" onChange={(event) => this.handleTopicInfoInputChange(event, 'name')} value={topicInfo.name} />
            </Col>
            <Col span={24}>
              <h4 className="editorTitle">
                描述 (最少5个字)：
              </h4>
              <Input placeholder="请输入描述" onChange={(event) => this.handleTopicInfoInputChange(event, 'description')} value={topicInfo.description} />
            </Col>
            <Col span={24}>
              <h4 className="editorTitle" style={{ display: "flex" }}>
                <div>
                  颜色：
                </div>
                <div style={{ height: "20px", width: "20px", backgroundColor: `${topicInfo.color}`, borderRadius: "5px" }}></div>
              </h4>
              <Input
                placeholder="请输入描述"
                onChange={(event) => this.handleTopicInfoInputChange(event, 'color')}
                value={topicInfo.color}
                style={{ width: "200px", marginBottom: "10px", color: `${topicInfo.color}` }}
              />
              <HexColorPicker color={topicInfo.color} onChange={(event) => this.handleColorPickerChange(event)} />
            </Col>
            <Col span={24}>
              <h4 className="editorTitle">
                图标 (最少5个字)：
              </h4>

              <div className="topicIconCover">

                <ImgCrop rotate>
                  <Upload
                    {...uploadPlateIconProps}
                  >
                    {topicIconBase64Url ? <img src={topicIconBase64Url} alt="avatar" style={{ width: '100%' }} /> : <img src={`http://localhost:5001/topic/icon/${topicInfo.topicId}`} alt="avatar" style={{ width: '100%' }} />}
                  </Upload>
                </ImgCrop>
              </div>
            </Col>
            <Col span={24} style={{ marginTop: '20px', textAlign: 'end' }}>
              <Button type="primary" style={{ background: '#325437', color: '#fff', borderColor: '#325437' }} shape="round" onClick={this.saveTopicConfiguration}>
                保存修改
              </Button>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

TopicDefault.propTypes = {

};

export default TopicDefault;