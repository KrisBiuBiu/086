import React, { Component } from 'react';
import { Row, Col, Tag, Avatar } from 'antd';
import { makeHttpQuery } from '../../utils/fn';

class Thread extends Component {
  constructor() {
    super();
    this.state = {
      thread: {}
    };
  }

  async componentDidMount() {
    this.setState({ tid: this.props.match.params.id });
    await this.getThreadInfo(this.props.match.params.id)
  }

  getThreadInfo = async (tid) => {
    const res = await makeHttpQuery("/post/oneThread", { tid });
    this.setState({ thread: res.data.thread })
    console.log(res)
  }

  render() {
    const { thread } = this.state;
    return (
      <>
        <div style={{ marginTop: "10px", background: "#fff" }}>
          <Row style={{ padding: "20px" }} gutter={[8, 24]}>
            <Col span={24}>
              <Tag color="magenta">magenta</Tag>
              <Tag color="red">red</Tag>
              <Tag color="volcano">volcano</Tag>
            </Col>
            <Col span={24}>
              <h1 style={{ marginBottom: "0", textAlign: "center" }}>{thread.title}</h1>
            </Col>
            <Col span={24}>
              <div>
                <div style={{ float: "left" }}>
                  <Avatar style={{ backgroundColor: "#7265e6", verticalAlign: 'middle' }} size={40}>
                    {"Kris"}
                  </Avatar>
                </div>
                <div style={{ marginLeft: "50px", position: "relative" }}>
                  <h3 style={{ height: "20px", marginBottom: "0" }}>
                    Kris
                  </h3>
                  <p style={{ fontSize: "12px", marginBottom: "0" }}>
                    This is Description
                  </p>
                </div>
              </div>
            </Col>
            <Col span={24}>
              <div key="2" dangerouslySetInnerHTML={{ __html: thread.content ? thread.content : "" }} />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

Thread.propTypes = {

};

export default Thread;