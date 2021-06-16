import React, { Component } from 'react';
import { Tooltip, Button } from 'antd';
import { Link } from "react-router-dom";
import { CaretUpOutlined, FormOutlined } from "@ant-design/icons";

class Floating extends Component {

  render() {
    return (
      <>
        <div id="scrolltop" style={{ marginLeft: "-25px", position: "fixed", right: "5%", top: "60.5%", display: "block" }}>
          <Tooltip title="Back To Top">
            <Button shape="circle" icon={<CaretUpOutlined />} onClick={() => window.scrollTo(0, 0)} />
          </Tooltip>
          <br />
          <Tooltip title="Back To Top">
            <Link to="/editor" >
              <Button shape="circle" icon={<FormOutlined />} />
            </Link>
          </Tooltip>
        </div>
      </>
    );
  }
}

Floating.propTypes = {

};

export default Floating;