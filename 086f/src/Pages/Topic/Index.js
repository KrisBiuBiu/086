import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import moment from 'moment';
import {
  Row, Col, Input, Button, List, Popover, Avatar, Card, Space,
} from 'antd';
import {
  MessageOutlined, LikeOutlined, StarOutlined, EyeOutlined,
} from '@ant-design/icons';
import { makeHttpQuery, makeHttpRequest, removeHTMLTagsSubString } from '../../utils/fn';
import TopicCard from './TopicCard';

class Topic extends Component {
  constructor() {
    super();
    this.state = {
      topicId: '', // pass 密码登录；code 验证码登录
      topicDescription: '',
      topicInfo: {},
      topicThreads: [],
      topicCategory: [],
    };
  }

  async componentDidMount () {
    this.setState({
      topicId: this.props.match.params.topicId,
    });
    await this.getTopicInfo(this.props.match.params.topicId);
    await this.getTopicThread(this.props.match.params.topicId);
    await this.getTopicCategory();
  }

  onChange = (a, b, c) => {
    console.log(a, b, c);
  }

  getTopicInfo = async (topicId) => {
    const res = await makeHttpRequest('get', `/topic/info/${topicId}`, { topicId });
    this.setState({ topicInfo: res.data.info });
  }

  getTopicThread = async (topicId) => {
    const res = await makeHttpRequest('get', `/topic/threads/${topicId}`, {});
    this.setState({ topicThreads: res.data.list });
  }

  getTopicCategory = async () => {
    const res = await makeHttpRequest('get', '/topic/categories', {});
    this.setState({ topicCategory: res.data.categories });
  }

  handleInputChange = (event, type) => {
    this.setState({ [type]: event.target.value });
  }

  addNewThread = async () => {
    const { topicName, topicDescription } = this.state;
    const res = await makeHttpQuery('/topic/create', { name: topicName, description: topicDescription });
  }

  render () {
    const {
      topicName, topicDescription, topicInfo, topicThreads, topicCategory,
    } = this.state;
    const IconText = ({ icon, text }) => (
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    );
    return (
      <>
        <div style={{ marginTop: '10px' }}>
          <Row style={{ padding: '20px' }} gutter={[24, 24]}>
            <Col span={4}>

              <Row style={{ boxShadow: "0 0 3px rgb(0 0 0 / 10%)", background: "#fff" }} gutter={[8, 24]}>
                <div className="plate-left-side-panel">
                  <div>
                    板块列表
                  </div>
                  <div className="plate-left-side-list">
                    <div className="plate-left-side-option">
                      <div className="plate-left-side-option-icon"><StarOutlined /></div>
                      <div className="plate-left-side-option-title">爱睡觉的</div>
                      <div className="plate-left-side-option-right">→</div>
                    </div>
                    <div className="plate-left-side-option">
                      <div className="plate-left-side-option-icon"><StarOutlined /></div>
                      <div className="plate-left-side-option-title">撒酒疯和</div>
                      <div className="plate-left-side-option-right">→</div>
                    </div>
                    <div className="plate-left-side-option">
                      <div className="plate-left-side-option-icon"><StarOutlined /></div>
                      <div className="plate-left-side-option-title">而我和夫人</div>
                      <div className="plate-left-side-option-right">→</div>
                    </div>
                    <div className="plate-left-side-option">
                      <div className="plate-left-side-option-icon"><StarOutlined /></div>
                      <div className="plate-left-side-option-title">吗tryn</div>
                      <div className="plate-left-side-option-right">→</div>
                    </div>
                    <div className="plate-left-side-option">
                      <div className="plate-left-side-option-icon"><StarOutlined /></div>
                      <div className="plate-left-side-option-title">而无人机</div>
                      <div className="plate-left-side-option-right">→</div>
                    </div>
                    <div className="plate-left-side-option">
                      <div className="plate-left-side-option-icon"><StarOutlined /></div>
                      <div className="plate-left-side-option-title">温热我是独立开发</div>
                      <div className="plate-left-side-option-right">→</div>
                    </div>
                    <div className="plate-left-side-option">
                      <div className="plate-left-side-option-icon"><StarOutlined /></div>
                      <div className="plate-left-side-option-title">吗恩别人</div>
                      <div className="plate-left-side-option-right">→</div>
                    </div>
                    <div className="plate-left-side-option">
                      <div className="plate-left-side-option-icon"><StarOutlined /></div>
                      <div className="plate-left-side-option-title">你特别热</div>
                      <div className="plate-left-side-option-right">→</div>
                    </div>
                  </div>
                </div>
              </Row>
              {/* <Row gutter={[0, 8]}>
                {
                  topicCategory.map((category) => (

                    <Card size="small" title={category.name} style={{ width: '100%' }}>
                      <List
                        itemLayout="vertical"
                        size="small"
                        grid={{ gutter: 8, column: 1 }}
                        dataSource={category.topicArr}
                        renderItem={(topic) => (
                          <List.Item>
                            <Card
                              style={{ width: '100%' }}
                              bodyStyle={{ padding: '0px' }}
                              bordered={false}
                            >
                              <Link to={`/topic/${topic.topicId}`}>
                                {topic.name}
                              </Link>
                            </Card>
                          </List.Item>
                        )}
                      />
                    </Card>
                  ))
                }
              </Row> */}
            </Col>
            <Col span={20}>
              <Row gutter={[0, 8]}>
                <Col span={24} style={{ background: '#fff' }}>
                  <div style={{ display: 'flex' }}>
                    <div style={{ flex: 2, marginRight: '10px' }}>
                      <img style={{ width: '50px' }} src={`http://localhost:5001/topic/icon/${topicInfo.topicId}`} />
                    </div>
                    <div style={{ flex: 7 }}>
                      <p style={{ marginBottom: '2px' }}>
                        <div style={{ display: 'flex' }}>
                          <div style={{ flex: 5, fontWeight: 'bold' }}>
                            {topicInfo.name}
                          </div>
                          <div style={{ flex: 3, textAlign: 'end' }}>
                            贴数：66500
                          </div>
                        </div>

                      </p>
                      <p style={{ fontSize: '10px', marginBottom: '2px', color: '#afafaf' }}>
                        {topicInfo.description}
                      </p>
                      <p style={{ fontSize: '10px', marginBottom: '2px' }}>
                        <div style={{ display: 'flex' }}>
                          <div style={{ flex: 5 }}>
                            <a href="/t/85856" title="HORIBA公司D500型气体质量流量控制器MFC拆解鉴赏">HORIBA公司D500型气体质量流量控制器MFC拆解鉴赏</a>
                          </div>
                          <div style={{ flex: 3, textAlign: 'end' }}>
                            <span data-type="nkcTimestamp" data-time="1613736289197" data-time-type="fromNow" title="2021/02/19 20:04:49">4个月17天前</span>
                          </div>
                        </div>
                      </p>
                    </div>
                  </div>
                </Col>
                <Col span={24} style={{ background: '#fff' }}>

                  <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={topicThreads}
                    renderItem={(thread) => (
                      <List.Item
                        key={thread.title}
                      >
                        <List.Item.Meta
                          avatar={(
                            <div>
                              <div style={{ float: 'left' }}>
                                <Popover placement="bottomLeft" arrowPointAtCenter trigger="click" style={{ padding: 0 }}>
                                  <Avatar style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }} size={25}>
                                    Kris
                                  </Avatar>
                                </Popover>
                              </div>
                              <div style={{ marginLeft: '30px', position: 'relative' }}>
                                <h4 style={{ height: '20px', marginBottom: '0', lineHeight: '25px' }}>
                                  Kris
                                </h4>
                              </div>
                            </div>
                          )}
                          style={{ marginBottom: '10px' }}
                        />
                        <div>
                          <Link to={`/thread/${thread.threadId}`}>
                            <h3 style={{ fontWeight: '600' }}>
                              {thread.title}
                            </h3>
                          </Link>
                        </div>
                        <div style={{ display: 'flex' }}>
                          {
                            thread.cover ? (
                              <div style={{ flex: 1 }}>
                                <img src={`http://localhost:5001/post/threadCover/${thread.threadId}`} style={{ width: '100%' }} />
                              </div>
                            ) : null
                          }
                          <div style={{ flex: 5 }}>

                            <p>
                              {removeHTMLTagsSubString(thread.content, 100, true)}
                            </p>
                          </div>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <div style={{ flex: 7 }}>
                            <span>
                              <IconText icon={EyeOutlined} text={thread.viewCount} key="list-vertical-star-o" />
                            </span>
                          </div>
                          <div style={{ flex: 2, textAlign: 'end' }}>
                            {
                              moment(new Date(thread.lastTime)).format('MM-DD HH:mm')
                            }
                          </div>
                        </div>
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

Topic.propTypes = {

};

export default Topic;
