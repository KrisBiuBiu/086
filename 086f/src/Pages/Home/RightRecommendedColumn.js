import React, { Component } from 'react';
import { Card, List } from 'antd';

class RightRecommendedColumn extends Component {
  onChange = (a, b, c) => {
    console.log(a, b, c);
  }

  render() {
    const data = [
      {
        title: 'Title 1',
      },
      {
        title: 'Title 2',
      },
      {
        title: 'Title 3',
      },
      {
        title: 'Title 4',
      },
      {
        title: 'Title 5',
      },
      {
        title: 'Title 6',
      },
    ];
    return (

      <div>
        <Card size="small" title="Recommended column" style={{ width: '100%' }}>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 3,
              xxl: 3,
            }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Card>Card content</Card>
              </List.Item>
            )}
          />
        </Card>
      </div>
    );
  }
}

RightRecommendedColumn.propTypes = {

};

export default RightRecommendedColumn;
