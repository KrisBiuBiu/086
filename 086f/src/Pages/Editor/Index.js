import React, { Component } from 'react';
import { Row, Col, Input, Button, Tag, Upload, message } from 'antd';
import QuillEditor from "./QuillEditor.js";
import { makeHttpQuery } from '../../utils/fn.js';
import ImgCrop from 'antd-img-crop';
import { DeleteFilled } from '@ant-design/icons';

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      content: "",
      selectedPlates: [],
      plates: [],
      threadCoverBase64Url: ""
    };
  }

  async componentDidMount() {
    await this.getAllPlates()
  }

  postThread = async () => {
    const { title, content, selectedPlates, threadCoverBase64Url } = this.state;
    if (title.length < 5) {
      message.warning("标题不得少于5个字");
      return;
    }

    if (content.replace(/<[^>]+>/g, "").length < 10) {
      message.warning("正文不得少于10个字");
      return;
    }

    if (selectedPlates.length > 2) {
      message.warning("板块选择不得多于2个");
      return;
    }

    if (selectedPlates.length === 0) {
      message.warning("请至少选择1个板块");
      return;
    }

    await makeHttpQuery("/post/thread", { title, content, selectedPlates, threadCover: threadCoverBase64Url });
  }

  getAllPlates = async () => {
    const res = await makeHttpQuery("/plate/plates", {});
    this.setState({ plates: res.data.list })
  }

  handleInputChange = (event, type) => {
    this.setState({ [type]: event.target.value })
  }

  editorInputChange = (type, inputText) => {
    this.setState({ [type]: inputText });
  }

  handlePlateChange(tag, checked) {
    const { selectedPlates } = this.state;
    const nextSelectedPlates = checked ? [...selectedPlates, tag] : selectedPlates.filter(t => t !== tag);
    this.setState({ selectedPlates: nextSelectedPlates });
  }

  handleUploadPlateIcon = (info) => {
    const reader = new FileReader();
    reader.readAsDataURL(info);
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        this.setState({ threadCoverBase64Url: reader.result })
        reject(false)
      }
    })
  }

  cleanThreadCover = () => {
    this.setState({ threadCoverBase64Url: "" })
  }

  render() {
    const { title, content, plates, selectedPlates, threadCoverBase64Url } = this.state;
    const uploadThreadCoverProps = {
      name: "avatar",
      listType: "picture-card",
      showUploadList: false,
      className: "avatar-uploader",
      beforeUpload: (info) => this.handleUploadPlateIcon(info),
    };
    const cropProps = {
      aspect: 4 / 3,
      grid: true,
      fillColor: "#e0e0e0"
    };
    const uploadButton = (
      <div>
        <div style={{ fontSize: "20px" }}>上传封面</div>
      </div>
    );
    return (
      <>
        <div style={{ marginTop: "10px", background: "#fff" }}>
          <Row style={{ padding: "20px" }} gutter={8}>
            <Col span={24}>
              <h4 className="editorTitle">
                标题 (最少5个字)：
              </h4>
              <Input placeholder="请输入标题" onChange={(event) => this.handleInputChange(event, "title")} value={title} />
            </Col>
            <Col span={24} style={{ marginTop: "20px" }}>
              <h4 className="editorTitle">
                正文 (最少10个字)：
              </h4>
              <QuillEditor
                inputFunc={this.editorInputChange}
                inputType="content"
                renderText={content}
              />
            </Col>
            <Col span={24} style={{ marginTop: "20px" }}>
              <h4 className="editorTitle">
                板块 (请至少选择1个板块， 最多2个)：
              </h4>
              <div>
                {plates.map(tag => (
                  <Tag.CheckableTag
                    key={tag.pid}
                    checked={selectedPlates.indexOf(tag.pid) > -1}
                    onChange={checked => this.handlePlateChange(tag.pid, checked)}
                    style={{ border: "1px solid #000" }}
                  >
                    {tag.name}
                  </Tag.CheckableTag>
                ))}
              </div>
            </Col>
            <Col span={24} style={{ marginTop: "20px" }}>
              <h4 className="editorTitle">
                封面图：
              </h4>
              <div style={{ display: "flex" }} className="threadCover">
                <ImgCrop {...cropProps}>
                  <Upload
                    {...uploadThreadCoverProps}
                  >
                    {threadCoverBase64Url ? <img src={threadCoverBase64Url} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                  </Upload>
                </ImgCrop>
                {
                  threadCoverBase64Url.length > 0 ? (
                    <Button icon={<DeleteFilled />} size="small" onClick={this.cleanThreadCover} />
                  ) : (
                    null
                  )
                }
              </div>
            </Col>
            <Col span={24} style={{ marginTop: "20px", textAlign: "end" }}>
              <Button type="primary" style={{ background: "#325437", color: "#fff", borderColor: "#325437" }} shape="round" onClick={this.postThread}>
                发布
              </Button>
              <Button style={{ marginLeft: "20px" }}>
                保存
              </Button>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

Editor.propTypes = {

};

export default Editor;