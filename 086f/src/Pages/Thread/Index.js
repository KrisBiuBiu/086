import React, { Component } from 'react';
import { Row, Col, Tag, Avatar, Button, message, List, Space } from 'antd';
import { makeHttpQuery, makeHttpRequest, removeHTMLTagsSubString } from '../../utils/fn';
import {
  EyeOutlined, CommentOutlined, HeartOutlined, LikeOutlined, DislikeOutlined, ShareAltOutlined, StarOutlined
} from '@ant-design/icons';
import PostEditor from './PostEditor';
import moment from 'moment';

class Thread extends Component {
  constructor() {
    super();
    this.state = {
      thread: {},
      postContent: "",
      comments: []
    };
  }

  async componentDidMount() {
    this.setState({ tid: this.props.match.params.id });
    await this.getThreadInfo(this.props.match.params.id)
    await this.getComments(this.props.match.params.id)
  }

  getThreadInfo = async (tid) => {
    const res = await makeHttpRequest("get", `/post/thread/${tid}`, { tid });
    this.setState({ thread: res.data.thread })
  }

  getComments = async (tid) => {
    const res = await makeHttpRequest("get", `/post/thread/${tid}/comments`, {});
    this.setState({ comments: res.data.comments })
  }

  editorInputChange = (type, inputText) => {
    this.setState({ [type]: inputText });
  }

  postOneComment = async () => {
    const { postContent } = this.state;
    console.log(postContent)
    if (!postContent || postContent.length < 5) {
      message.warning("请最少输入五个字符", 3);
      return;
    }
    const res = await makeHttpQuery("/post/comment", {
      content: postContent,
      tid: this.props.match.params.id
    });
    await this.getThreadInfo(this.props.match.params.id);
    await this.getComments(this.props.match.params.id)
  }

  render() {
    const { thread,
      postContent, comments } = this.state;
    const IconText = ({ icon, text }) => (
      <Space size={2}>
        {React.createElement(icon)}
        {text}
      </Space>
    );
    return (
      <>
        <div style={{ marginTop: "10px" }}>
          <Row style={{ padding: "20px" }} gutter={[8]}>
            <Col span={18}>
              <Row style={{ padding: "20px", background: "#fff", boxShadow: "0 0 3px rgb(0 0 0 / 10%)" }} gutter={[8, 24]}>
                <Row gutter={[8, 24]} style={{ width: "100%" }}>
                  <Col span={12}>
                    <Tag color="magenta">magenta</Tag>
                    <Tag color="red">red</Tag>
                    <Tag color="volcano">volcano</Tag>
                  </Col>
                  <Col span={12} style={{ textAlign: "end" }}>
                    <div style={{ display: "inline-block" }}>
                      <IconText icon={EyeOutlined} text={"564"} />
                    </div>
                    <div style={{ display: "inline-block", marginLeft: "10px" }}>
                      <IconText icon={CommentOutlined} text={"23"} />
                    </div>
                  </Col>
                </Row>
                <Col span={24}>
                  <h1 style={{ marginBottom: "0", textAlign: "center" }}>{thread.title}</h1>
                </Col>
                <Col span={24} style={{ textAlign: "center" }}>

                  <Space align="center">
                    <Avatar style={{ backgroundColor: "#7265e6", verticalAlign: 'middle' }} size={25}>
                      {"Kris"}
                    </Avatar>
                    <div>
                      Kris
                    </div>
                    <span>
                      发表于
                    </span>
                    <span>
                      2021-11-03
                    </span>
                  </Space>
                </Col>
                {/* <Col span={24}>
                  <div>
                    <div style={{ float: "left" }}>
                      <Avatar style={{ backgroundColor: "#7265e6", verticalAlign: 'middle' }} size={35}>
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
                </Col> */}
                <Col span={24}>
                  <div key="2" dangerouslySetInnerHTML={{ __html: thread.content ? thread.content : "" }} />
                </Col>
                <Col span={24} style={{ textAlign: "end" }}>
                  <Space size={16}>
                    <div>
                      <Button
                        // shape="circle"
                        type="primary"
                        icon={<LikeOutlined />}
                        css={
                          {
                            backgroundColor: "#325438",
                            borderColor: "#325438",
                            "&:hover": {
                              backgroundColor: "#325438",
                              borderColor: "#325438"
                            }
                          }
                        }
                      />
                    </div>
                    <div>
                      <IconText icon={LikeOutlined} text={"6"} />
                    </div>
                    <div>
                      <IconText icon={StarOutlined} text={"收藏"} />
                    </div>
                    <div>
                      <IconText icon={ShareAltOutlined} text={"分享"} />
                    </div>
                  </Space>
                </Col>
              </Row>
              <Row style={{ marginTop: "20px", padding: "20px", background: "#fff" }} gutter={[8, 24]}>
                <Col span={24}>
                  <PostEditor
                    inputFunc={this.editorInputChange}
                    inputType="postContent"
                    renderText={postContent} />
                </Col>
                <Col>
                  <Button onClick={this.postOneComment}>
                    发表
                  </Button>
                </Col>
              </Row>
              <Row style={{ marginTop: "20px", padding: "20px", background: "#fff" }} gutter={[8, 24]}>
                全部评论{comments.length}条
              </Row>
              <Row style={{ marginTop: "20px", padding: "20px", background: "#fff" }} gutter={[8, 24]} className="comment-list">

                <List
                  itemLayout="vertical"
                  size="large"
                  style={{ width: "100%" }}
                  dataSource={comments}
                  renderItem={comment => (
                    <List.Item
                      key={`comment-${comment.commentId}`}
                    >
                      <List.Item.Meta
                        avatar={
                          <div>
                            <div style={{ float: "left" }}>
                              <Avatar style={{ backgroundColor: "#7265e6", verticalAlign: 'middle' }} size={25}>
                                {"Kris"}
                              </Avatar>
                            </div>
                            <div style={{ marginLeft: "30px", position: "relative" }}>
                              <h4 style={{ height: "20px", marginBottom: "0", lineHeight: "25px" }}>
                                Kris
                              </h4>
                            </div>
                          </div>
                        }
                        style={{ marginBottom: "10px" }}
                      />
                      <div style={{ display: "flex", paddingLeft: "30px" }}>
                        <div style={{ width: "100%" }} dangerouslySetInnerHTML={{ __html: comment.content ? comment.content : "" }}>
                        </div>
                      </div>
                      <div style={{ display: "flex" }} className="comment-item-button-area">
                        <div style={{ flex: 2 }}>
                          {
                            moment(new Date(comment.createTime)).format('MM-DD HH:mm')
                          }
                        </div>
                        <div style={{ flex: 7, textAlign: "end" }}>
                          <span>
                            {/* <IconText icon={EyeOutlined} text={6} key="list-vertical-star-o" /> */}
                          </span>
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              </Row>
            </Col>
            <Col span={6}>
              <div style={{ width: "100%", background: "#e0e0e0" }}>
                12345
              </div>
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