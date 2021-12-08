import React, { Component } from 'react';
import {
  Card, List, Avatar, Space, Popover,
} from 'antd';
import {
  MessageOutlined, LikeOutlined, StarOutlined, EyeOutlined,
} from '@ant-design/icons';
import {
  Link,
} from 'react-router-dom';
import AvatarPopCard from '../../Components/AvatarPopCard';
import { makeHttpQuery, removeHTMLTagsSubString, makeHttpRequest } from '../../utils/fn';

class LeftTopThread extends Component {
  constructor() {
    super();
    this.state = {
      categoryList: [],
    };
  }

  async componentDidMount () {
    await this.getCategoryList();
  }

  getCategoryList = async () => {
    const res = await makeHttpRequest('get', '/topic/categories', {});
    this.setState({ categoryList: res.data.categories });
  }

  onChange = (a, b, c) => {
    console.log(a, b, c);
  }

  render () {
    const listData = [];
    for (let i = 0; i < 6; i++) {
      listData.push({
        href: 'https://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
          'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
          'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      });
    }
    const { categoryList } = this.state;

    const IconText = ({ icon, text }) => (
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    );

    return (
      <div>
        {
          categoryList.map((category) => (
            <Card size="small" title={category.name} extra={<span>More</span>} style={{ width: '100%' }}>
              <List
                itemLayout="vertical"
                size="large"
                grid={{ gutter: 16, column: 2 }}
                dataSource={category.topicArr}
                renderItem={(topic) => (
                  <List.Item>
                    <Card
                      style={{ width: '100%' }}
                      bodyStyle={{ padding: '10px' }}
                      bordered={false}
                    >
                      <div style={{ display: 'flex' }}>
                        <div style={{ flex: 2, marginRight: '10px' }}>
                          <img style={{ width: '100%' }} src={`http://localhost:5001/topic/icon/${topic.topicId}`} />
                        </div>
                        <div style={{ flex: 7 }}>
                          <p style={{ marginBottom: '2px' }}>
                            <div style={{ display: 'flex' }}>
                              <div style={{ flex: 5, fontWeight: 'bold' }}>
                                <Link to={`/topic/${topic.topicId}`}>
                                  {topic.name}
                                </Link>
                              </div>
                              <div style={{ flex: 3, textAlign: 'end' }}>
                                贴数：66500
                              </div>
                            </div>

                          </p>
                          <p style={{ fontSize: '10px', marginBottom: '2px', color: '#afafaf' }}>
                            {topic.description}
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
                    </Card>
                  </List.Item>
                )}
              />
            </Card>
          ))
        }
      </div>
    );
  }
}

LeftTopThread.propTypes = {

};

export default LeftTopThread;

{ /* <Card size="small" title="Top Thread card" extra={<span>More</span>} style={{ width: "100%" }}>
<List
  itemLayout="vertical"
  size="large"
  dataSource={topThreadList}
  renderItem={item => (
    <List.Item
      key={item.title}
      actions={[
        <IconText icon={EyeOutlined} text={item.viewCount} key="list-vertical-star-o" />,
        <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
      ]}
    >
      <List.Item.Meta
        avatar={
          <div>
            <div style={{ float: "left" }}>
              <Popover placement="bottomLeft" content={<AvatarPopCard />} arrowPointAtCenter trigger="click" style={{ padding: 0 }}>
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
      <p>
        {removeHTMLTagsSubString(item.content, 100, true)}
      </p>
    </List.Item>
  )}
/>
</Card> */ }
