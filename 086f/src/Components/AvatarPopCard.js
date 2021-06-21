import React, { Component } from 'react';
import { Card, Avatar } from 'antd';
import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons'

class AvatarPopCard extends Component {
  constructor() {
    super();
    this.state = {
      text: ""
    };
  }

  render() {
    const {
      text
    } = this.state;
    return (
      <>
        <Card
          style={{ width: 300 }}
          cover={
            <img
              alt="example"
              src="https://i.guancha.cn/bbs/2021/06/21/20210621135515777?imageView2/2/w/500/format/jpg"
            />
          }
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Card.Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title="Card title"
            description="This is the description"
          />
        </Card>
      </>
    );
  }
}

AvatarPopCard.propTypes = {

};

export default AvatarPopCard;