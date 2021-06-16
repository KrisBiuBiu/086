import React, { Component } from 'react';
import { Row, Col, Input } from 'antd';
import QuillEditor from "./QuillEditor.js";

class Editor extends Component {
  onChange = (a, b, c) => {
    console.log(a, b, c);
  }


  render() {
    return (
      <>
        <div style={{ marginTop: "10px" }}>
          <Row style={{ margin: "15px 0px" }} gutter={8}>
            <Col span={24}>
              <Input placeholder="请输入标题" />
            </Col>
            <Col span={24} style={{ marginTop: "50px", background: "#fff" }}>
              <QuillEditor />
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