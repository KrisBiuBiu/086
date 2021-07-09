import React, { Component } from 'react';
import { Row, Col, Tag, Avatar } from 'antd';
import { makeHttpQuery, makeHttpRequest } from '../../utils/fn';

class PlateCard extends Component {
  constructor() {
    super();
    this.state = {
      plateInfo: {}
    };
  }

  async componentDidMount() {
    this.setState({ plateInfo: this.props.plateInfo });
  }

  getPlateInfo = async (pid) => {
    const res = await makeHttpRequest("get", `/plate/info/${pid}`, { pid });
    this.setState({ plateInfo: res.data.info });
  }

  render() {
    const { plateInfo } = this.state;
    console.log(plateInfo)
    return (
      <>
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
      </>
    );
  }
}

PlateCard.propTypes = {

};

export default PlateCard;