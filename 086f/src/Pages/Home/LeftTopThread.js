import React, { Component } from 'react';
import { Card, List, Avatar, Space, Popover } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import AvatarPopCard from '../../Components/AvatarPopCard'

class LeftTopThread extends Component {
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

    const IconText = ({ icon, text }) => (
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    );

    return (
      <div>
        <Card size="small" title="Top Thread card" extra={<span>More</span>} style={{ width: "100%" }}>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={listData}
            renderItem={item => (
              <List.Item
                key={item.title}
                actions={[
                  <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                  <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                  <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                ]}
                extra={
                  <img
                    width={272}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                }
              >
                <List.Item.Meta
                  avatar={
                    <Popover placement="bottomLeft" content={<AvatarPopCard />} arrowPointAtCenter trigger="click" style={{ padding: 0 }}>
                      <Avatar src={item.avatar} />
                    </Popover>
                  }
                  title={<a href={item.href}>{item.title}</a>}
                  description={item.description}
                />
                {item.content}
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