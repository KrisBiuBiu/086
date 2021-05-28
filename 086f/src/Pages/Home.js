import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";
import { Row, Col, Carousel, Card } from 'antd';

class Home extends Component {
  onChange = (a, b, c) => {
    console.log(a, b, c);
  }


  render () {
    const contentStyle = {
      height: '160px',
      color: '#fff',
      lineHeight: '160px',
      textAlign: 'center',
      background: '#364d79',
    };
    return (
      <>
        <div style={{ marginTop: "10px" }}>

          <Row>
            <Col span={24}>
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
            </Col>
          </Row>
          <Row>
            {/* left */}
            <Col span={16}>
              <Row>
                <Col span={24}>
                  <Card size="small" title="Small size card" extra={<span>More</span>} style={{ width: "100%" }}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                  </Card>
                </Col>
              </Row>
            </Col>
            {/* right */}
            <Col span={8}>col-12</Col>
          </Row>
        </div>
      </>
    );
  }
}

Home.propTypes = {

};

export default Home;