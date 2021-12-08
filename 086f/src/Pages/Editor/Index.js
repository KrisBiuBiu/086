import React, { Component } from 'react';
import {
  Row, Col, Input, Button, Tag, Upload, message,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import { DeleteFilled } from '@ant-design/icons';
import QuillEditor from './QuillEditor.js';
import { makeHttpQuery } from '../../utils/fn.js';

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      content: '',
      selectedTopics: [],
      topics: [],
      threadCoverBase64Url: '',
    };
  }

  async componentDidMount () {
    await this.getAllTopics();
  }

  postThread = async () => {
    const {
      title, content, selectedTopics, threadCoverBase64Url,
    } = this.state;
    if (title.length < 5) {
      message.warning('标题不得少于5个字');
      return;
    }

    if (content.replace(/<[^>]+>/g, '').length < 10) {
      message.warning('正文不得少于10个字');
      return;
    }

    if (selectedTopics.length > 2) {
      message.warning('板块选择不得多于2个');
      return;
    }

    if (selectedTopics.length === 0) {
      message.warning('请至少选择1个板块');
      return;
    }

    await makeHttpQuery('/post/thread', {
      title, content, selectedTopics, threadCover: threadCoverBase64Url,
    });
  }

  getAllTopics = async () => {
    const res = await makeHttpQuery('/topic/topics', {});
    this.setState({ topics: res.data.list });
  }

  handleInputChange = (event, type) => {
    this.setState({ [type]: event.target.value });
  }

  editorInputChange = (type, inputText) => {
    this.setState({ [type]: inputText });
  }

  handleTopicChange (tag, checked) {
    const { selectedTopics } = this.state;
    const nextSelectedTopics = checked ? [...selectedTopics, tag] : selectedTopics.filter((t) => t !== tag);
    this.setState({ selectedTopics: nextSelectedTopics });
  }

  handleUploadTopicIcon = (info) => {
    const reader = new FileReader();
    reader.readAsDataURL(info);
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        this.setState({ threadCoverBase64Url: reader.result });
        reject(false);
      };
    });
  }

  cleanThreadCover = () => {
    this.setState({ threadCoverBase64Url: '' });
  }

  render () {
    const {
      title, content, topics, selectedTopics, threadCoverBase64Url,
    } = this.state;
    const uploadThreadCoverProps = {
      name: 'avatar',
      listType: 'picture-card',
      showUploadList: false,
      className: 'avatar-uploader',
      beforeUpload: (info) => this.handleUploadTopicIcon(info),
    };
    const cropProps = {
      aspect: 4 / 3,
      grid: true,
      fillColor: '#e0e0e0',
    };
    const uploadButton = (
      <div>
        <div style={{ fontSize: '20px' }}>上传封面</div>
      </div>
    );
    return (
      <>
        <div style={{ marginTop: '10px', background: '#fff' }}>
          <Row style={{ padding: '20px' }} gutter={8}>
            <Col span={24}>
              <h4 className="editorTitle">
                标题 (最少5个字)：
              </h4>
              <Input placeholder="请输入标题" onChange={(event) => this.handleInputChange(event, 'title')} value={title} />
            </Col>
            <Col span={24} style={{ marginTop: '20px' }}>
              <h4 className="editorTitle">
                正文 (最少10个字)：
              </h4>
              <QuillEditor
                inputFunc={this.editorInputChange}
                inputType="content"
                renderText={content}
              />
            </Col>
            <Col span={24} style={{ marginTop: '20px' }}>
              <h4 className="editorTitle">
                板块 (请至少选择1个板块， 最多2个)：
              </h4>
              <div>
                {topics.map((tag) => (
                  <Tag.CheckableTag
                    key={tag.topicId}
                    checked={selectedTopics.indexOf(tag.topicId) > -1}
                    onChange={(checked) => this.handleTopicChange(tag.topicId, checked)}
                    style={{ border: '1px solid #000' }}
                  >
                    {tag.name}
                  </Tag.CheckableTag>
                ))}
              </div>
            </Col>
            <Col span={24} style={{ marginTop: '20px' }}>
              <h4 className="editorTitle">
                封面图：
              </h4>
              <div style={{ display: 'flex' }} className="threadCover">
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
            <Col span={24} style={{ marginTop: '20px', textAlign: 'end' }}>
              <Button type="primary" style={{ background: '#325437', color: '#fff', borderColor: '#325437' }} shape="round" onClick={this.postThread}>
                发布
              </Button>
              <Button style={{ marginLeft: '20px' }}>
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
