import React, { Component } from 'react';
import { Row, Col, Input, Button, Tag } from 'antd';
import { makeHttpQuery } from '../../utils/fn.js';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
const { CheckableTag } = Tag;

class AvaUpload extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      content: "",
      selectedPlates: [],
      plates: []
    };
  }

  // async componentDidMount() {
  //   await this.getAllPlates()
  // }


  setCropper = (instance) => {
    console.log(instance)
  }

  render() {
    const { title, content, plates, selectedPlates } = this.state;
    return (
      <>
        {/* <Cropper
          style={{ width: "100px", height: "100px" }}
          aspectRatio={1}
          preview=".uploadCrop"
          guides={false}
          src={'http://localhost:5001/statics/3.jpg'}
          ref={cropper => { this.cropper = cropper }}
          onInitialized={(instance) => {
            this.setCropper(instance);
          }}
        /> */}
        {/* https://codesandbox.io/s/lively-frost-giqn7
https://github.com/fengyuanchen/cropperjs */}
        <Cropper
          style={{ height: 300, width: 300 }}
          src={'http://localhost:5001/statics/3.jpg'}
          ref={cropper => (this.cropper = cropper)}
          // Cropper.js options
          viewMode={300}
          // zoomable={false}
          zoomTo={0.1}
          background={false} // 背景色
          aspectRatio={1} // 固定为1:1  可以自己设置比例, 默认情况为自由比例
          guides={false}
          preview=".uploadCrop"
        />

        <div style={{ width: "50%", float: "right" }} >
          <h1>Preview</h1>
          <div
            className="uploadCrop"
            style={{ width: "100%", float: "left", height: "300px" }}
          />
        </div>
      </>
    );
  }
}

AvaUpload.propTypes = {

};

export default AvaUpload;