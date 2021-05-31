import React, { Component } from 'react';
import { Tooltip, Button } from 'antd';
import { CaretUpOutlined, FormOutlined } from "@ant-design/icons";

class Floating extends Component {

  render () {
    return (
      <>
        <div id="scrolltop" style={{ marginLeft: "-25px", position: "fixed", right: "10%", top: "60.5%", display: "block" }} onClick={() => window.scrollTo(0, 0)}>
          <Tooltip title="Back To Top">
            <Button shape="circle" icon={<CaretUpOutlined />} />
          </Tooltip>
          <br />
          <Tooltip title="Back To Top">
            <Button shape="circle" icon={<FormOutlined />} />
          </Tooltip>
        </div>
      </>
    );
  }
}

Floating.propTypes = {

};

export default Floating;