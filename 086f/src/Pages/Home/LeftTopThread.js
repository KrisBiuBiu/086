import React, { Component } from 'react';
import { Card, List, Avatar, Space, Popover } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined, EyeOutlined } from '@ant-design/icons';
import AvatarPopCard from '../../Components/AvatarPopCard'
import { makeHttpQuery, removeHTMLTagsSubString } from '../../utils/fn';
import {
  Link
} from "react-router-dom";

class LeftTopThread extends Component {
  constructor() {
    super();
    this.state = {
      topThreadList: [],
    };
  }

  async componentDidMount() {
    await this.getTopThreadList()
  }

  getTopThreadList = async () => {
    const res = await makeHttpQuery("/post/topThreadList", {});
    this.setState({ topThreadList: res.data.list })
  }

  onChange = (a, b, c) => {
    console.log(a, b, c);
  }

  render() {
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
    const { topThreadList } = this.state;

    const IconText = ({ icon, text }) => (
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    );

    console.log(topThreadList)

    return (
      <div>
        <Card size="small" title="Top Thread card" extra={<span>More</span>} style={{ width: "100%" }}>
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
        </Card>
      </div>
    );
  }
}

LeftTopThread.propTypes = {

};

export default LeftTopThread;