import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'antd';
import QuillEditor from "./QuillEditor.js";

class Editor extends Component {
  onChange = (a, b, c) => {
    console.log(a, b, c);
  }


  render() {
    return (
      <>
        <div style={{ marginTop: "10px", background: "#fff" }}>
          <Row style={{ padding: "20px" }} gutter={8}>
            <Col span={24}>
              <div>
                标题：
              </div>
              <Input placeholder="请输入标题" />
            </Col>
            <Col span={24} style={{ marginTop: "20px" }}>
              <div>
                内容：
              </div>
              <QuillEditor />
            </Col>
            <Col span={24} style={{ marginTop: "20px", textAlign: "end" }}>
              <Button type="primary" style={{ background: "#325437", color: "#fff", borderColor: "#325437" }} shape="round">
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