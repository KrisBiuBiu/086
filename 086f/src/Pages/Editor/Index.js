import React, { Component } from 'react';
import { Row, Col, Input, Button, Tag } from 'antd';
import QuillEditor from "./QuillEditor.js";
import { makeHttpQuery } from '../../utils/fn.js';
const { CheckableTag } = Tag;

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      content: "",
      selectedPlates: [],
      plates: []
    };
  }

  async componentDidMount () {
    await this.getAllPlates()
  }

  onChange = (a, b, c) => {
    console.log(a, b, c);
  }

  postThread = async () => {
    const { title, content } = this.state;
    await makeHttpQuery("/post/thread", { title, content });
  }

  getAllPlates = async () => {
    const res = await makeHttpQuery("/plate/plates", {});
    this.setState({ plates: res.data.list })
  }

  handleInputChange = (event, type) => {
    console.log(event.target.value)
    this.setState({ [type]: event.target.value })
  }

  editorInputChange = (type, inputText) => {
    this.setState({ [type]: inputText });
  }

  handlePlateChange (tag, checked) {
    const { selectedPlates } = this.state;
    const nextSelectedPlates = checked ? [...selectedPlates, tag] : selectedPlates.filter(t => t !== tag);
    this.setState({ selectedPlates: nextSelectedPlates });
  }

  render () {
    const { title, content, plates, selectedPlates } = this.state;
    return (
      <>
        <div style={{ marginTop: "10px", background: "#fff" }}>
          <Row style={{ padding: "20px" }} gutter={8}>
            <Col span={24}>
              <div>
                标题：
              </div>
              <Input placeholder="请输入标题" onChange={(event) => this.handleInputChange(event, "title")} value={title} />
            </Col>
            <Col span={24} style={{ marginTop: "20px" }}>
              <div>
                板块：
              </div>
              {plates.map(tag => (
                <CheckableTag
                  key={tag.pid}
                  checked={selectedPlates.indexOf(tag.pid) > -1}
                  onChange={checked => this.handlePlateChange(tag.pid, checked)}
                >
                  {tag.name}
                </CheckableTag>
              ))}
            </Col>
            <Col span={24} style={{ marginTop: "20px" }}>
              <div>
                内容：
              </div>
              <QuillEditor
                inputFunc={this.editorInputChange}
                inputType="content"
                renderText={content}
              />
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