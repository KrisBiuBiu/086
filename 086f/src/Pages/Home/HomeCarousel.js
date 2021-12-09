import React, { Component } from 'react';
import {
  Row, Col, Carousel, Card,
} from 'antd';

class HomeCarousel extends Component {
  onChange = (a, b, c) => {
    console.log(a, b, c);
  }

  render () {
    const contentStyle = {
      height: '260px',
      color: '#fff',
      lineHeight: '260px',
      textAlign: 'center',
      background: '#364d79',
    };
    return (
      <Card bodyStyle={{ padding: '10px' }} className="box-shadow-panel">
        <Row gutter={8}>
          <Col span={12}>
            <div>
              <Carousel afterChange={this.onChange}>
                <div>
                  <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                  <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                  <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                  <h3 style={contentStyle}>4</h3>
                </div>
              </Carousel>
            </div>
          </Col>
          <Col span={12}>
            <div>
              <Carousel afterChange={this.onChange}>
                <div>
                  <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                  <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                  <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                  <h3 style={contentStyle}>4</h3>
                </div>
              </Carousel>
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}

HomeCarousel.propTypes = {

};

export default HomeCarousel;
