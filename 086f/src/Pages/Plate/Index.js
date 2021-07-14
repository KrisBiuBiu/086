import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";
import moment from "moment";
import { Row, Col, Input, Button, List, Popover, Avatar, Card, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined, EyeOutlined } from '@ant-design/icons';
import { makeHttpQuery, makeHttpRequest, removeHTMLTagsSubString } from '../../utils/fn';
import PlateCard from './PlateCard';

class Plate extends Component {
  constructor() {
    super();
    this.state = {
      pid: "", // pass 密码登录；code 验证码登录
      plateDescription: "",
      plateInfo: {},
      plateThreads: [],
      plateCategory: []
    };
  }

  async componentDidMount() {
    this.setState({
      pid: this.props.match.params.pid
    })
    await this.getPlateInfo(this.props.match.params.pid);
    await this.getPlateThread(this.props.match.params.pid);
    await this.getPlateCategory();
  }

  onChange = (a, b, c) => {
    console.log(a, b, c);
  }

  getPlateInfo = async (pid) => {
    const res = await makeHttpRequest("get", `/plate/info/${pid}`, { pid });
    this.setState({ plateInfo: res.data.info });
  }

  getPlateThread = async (pid) => {
    const res = await makeHttpRequest("get", `/plate/threads/${pid}`, {});
    this.setState({ plateThreads: res.data.list })
  }

  getPlateCategory = async () => {
    const res = await makeHttpRequest("get", `/plate/categorys`, {});
    this.setState({ plateCategory: res.data.list });
  }

  handleInputChange = (event, type) => {
    this.setState({ [type]: event.target.value })
  }

  addNewThread = async () => {
    const { plateName, plateDescription } = this.state;
    const res = await makeHttpQuery("/plate/create", { name: plateName, description: plateDescription });
  }

  render() {
    const { plateName, plateDescription, plateInfo, plateThreads, plateCategory } = this.state;
    const IconText = ({ icon, text }) => (
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    );
    return (
      <>
        <div style={{ marginTop: "10px" }}>
          <Row style={{ padding: "20px" }} gutter={[8]}>
            <Col span={4}>
              <Row gutter={[0, 8]}>
                {
                  plateCategory.map((category) => {
                    return (

                      <Card size="small" title={category.name} style={{ width: "100%" }}>
                        <List
                          itemLayout="vertical"
                          size="small"
                          grid={{ gutter: 8, column: 1 }}
                          dataSource={category.plateArr}
                          renderItem={plate => (
                            <List.Item>
                              <Card
                                style={{ width: "100%" }}
                                bodyStyle={{ padding: "0px" }}
                                bordered={false}
                              >
                                <Link to={`/plate/${plate.pid}`}>
                                  {plate.name}
                                </Link>
                              </Card>
                            </List.Item>
                          )
                          }
                        />
                      </Card >
                    )
                  })
                }
              </Row>
            </Col>
            <Col span={20}>
              <Row gutter={[0, 8]}>
                <Col span={24} style={{ background: "#fff" }}>
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: 2, marginRight: "10px" }}>
                      <img style={{ width: "50px" }} src={`http://localhost:5001/plate/icon/${plateInfo.pid}`} />
                    </div>
                    <div style={{ flex: 7 }}>
                      <p style={{ marginBottom: "2px" }}>
                        <div style={{ display: "flex", }}>
                          <div style={{ flex: 5, fontWeight: "bold", }}>
                            {plateInfo.name}
                          </div>
                          <div style={{ flex: 3, textAlign: "end" }}>
                            贴数：66500
                          </div>
                        </div>

                      </p>
                      <p style={{ fontSize: "10px", marginBottom: "2px", color: "#afafaf" }}>
                        {plateInfo.description}
                      </p>
                      <p style={{ fontSize: "10px", marginBottom: "2px" }}>
                        <div style={{ display: "flex" }}>
                          <div style={{ flex: 5 }}>
                            <a href="/t/85856" title="HORIBA公司D500型气体质量流量控制器MFC拆解鉴赏">HORIBA公司D500型气体质量流量控制器MFC拆解鉴赏</a>
                          </div>
                          <div style={{ flex: 3, textAlign: "end" }}>
                            <span data-type="nkcTimestamp" data-time="1613736289197" data-time-type="fromNow" title="2021/02/19 20:04:49">4个月17天前</span>
                          </div>
                        </div>
                      </p>
                    </div>
                  </div>
                </Col>
                <Col span={24} style={{ background: "#fff" }}>

                  <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={plateThreads}
                    renderItem={item => (
                      <List.Item
                        key={item.title}
                      // actions={[
                      //   <IconText icon={EyeOutlined} text={item.viewCount} key="list-vertical-star-o" />,
                      //   <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                      // ]}
                      >
                        <List.Item.Meta
                          avatar={
                            <div>
                              <div style={{ float: "left" }}>
                                <Popover placement="bottomLeft" arrowPointAtCenter trigger="click" style={{ padding: 0 }}>
                                  <Avatar style={{ backgroundColor: "#7265e6", verticalAlign: 'middle' }} size={25}>
                                    {"Kris"}
                                  </Avatar>
                                </Popover>
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
                        <div>
                          <Link to={`/thread/${item.tid}`}>
                            <h3 style={{ fontWeight: "600" }}>
                              {item.title}
                            </h3>
                          </Link>
                        </div>
                        <div style={{ display: "flex" }}>
                          {
                            item.cover ? (
                              <div style={{ flex: 1 }}>
                                <img src={`http://localhost:5001/post/threadCover/${item.tid}`} style={{ width: "100%" }}></img>
                              </div>
                            ) : null
                          }
                          <div style={{ flex: 5 }}>

                            <p>
                              {removeHTMLTagsSubString(item.content, 100, true)}
                            </p>
                          </div>
                        </div>
                        <div style={{ display: "flex" }}>
                          <div style={{ flex: 7 }}>
                            <span>
                              <IconText icon={EyeOutlined} text={item.viewCount} key="list-vertical-star-o" />
                            </span>
                          </div>
                          <div style={{ flex: 2, textAlign: "end" }}>
                            {
                              moment(new Date(item.lastTime)).format('MM-DD HH:mm')
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

Plate.propTypes = {

};

export default Plate;