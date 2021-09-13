import React, { Component } from 'react';
import { Row, Col } from 'antd';
import HomeCarousel from './HomeCarousel';
import LeftTopThread from './LeftTopThread';
import RightRecommendedColumn from './RightRecommendedColumn';

class Home extends Component {
  onChange = (a, b, c) => {
    console.log(a, b, c);
  }

  render() {
    return (
      <>
        <div style={{ marginTop: '10px' }}>
          <Row style={{ margin: '5px 0px' }} gutter={8}>
            <Col span={24}>
              <HomeCarousel />
            </Col>
          </Row>
          <Row style={{ margin: '5px 0px' }} gutter={8}>
            {/* left */}
            <Col span={16}>
              <Row>
                <Col span={24}>
                  <LeftTopThread />
                </Col>
              </Row>
            </Col>
            {/* right */}
            <Col span={8}>
              <Row>
                <Col span={24}>
                  <RightRecommendedColumn />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

Home.propTypes = {

};

export default Home;
