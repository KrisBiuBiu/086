import React, { Component } from 'react';
import { Layout } from 'antd';

class Footer extends Component {
  render () {
    return (
      <>
        <Layout.Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Layout.Footer>
      </>
    );
  }
}

Footer.propTypes = {

};

export default Footer;