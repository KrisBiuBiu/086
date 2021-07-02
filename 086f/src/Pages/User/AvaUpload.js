import React, { Component } from 'react';
import { Row, Col, Button, Avatar, Upload, message } from 'antd';
import "cropperjs/dist/cropper.css";
import ImgCrop from 'antd-img-crop';
import cookies from '../../utils/cookies';

class AvaUpload extends Component {
  constructor() {
    super();
    this.state = {
      avaUploading: false,
      avaSrc: ""
    };
  }

  // async componentDidMount() {
  //   await this.getAllPlates()
  // }


  setCropper = (instance) => {
    console.log(instance)
  }


  handleUploadFileList = (info) => {
    if (info.file.size > 3 * 1024 * 1024) {
      message.error('File too large. The importer does not handle files over 20MB at this moment. Please use the standard large file method to record this crash dump.', 5);
      return;
    }
    this.setState({ avaUploading: true });
    if (info.file.status === "done") {
      this.setState({ avaUploading: false });
      if (info.file.response.status === 'success') {
        this.setState({ avaSrc: info.file.response.msg })
      }
    } else if (info.file.status === "error") {
      this.setState({ avaUploading: false });
    }
  }

  render() {
    const { avaUploading, avaSrc } = this.state;
    const uploadAvatorProps = {
      name: "file",
      action: `http://${window.location.hostname}:5001/user/uploadAvator`,
      headers: {
        authorization: `${cookies.get('token')}`,
      },
      showUploadList: false,
      accept: `
      image/apng,
      image/bmp,
      image/jpeg,
      image/jpg,
      image/pjpeg,
      image/png,`,
      onChange: (info) => this.handleUploadFileList(info),
    };
    return (
      <>
        <Row>
          <Col span={12}>
            {
              avaSrc && avaSrc.length !== 0 ? (
                <>
                  {
                    <img src={`http://${window.location.hostname}:5001/user/avator/${avaSrc}?v=${Math.random()}`} style={{ width: "200px", height: "200px", borderRadius: "100px" }} />
                  }
                </>
              ) : (
                <Avatar style={{ backgroundColor: "#7265e6", verticalAlign: 'middle' }} size={200}>
                  {"Kris"}
                </Avatar>
              )
            }
          </Col>
          <Col span={12} style={{ display: "flex" }}>
            <div style={{ marginTop: "auto" }}>
              <ImgCrop
                grid
                modalTitle={"编辑头像"}
                modalOk={"保存"}
                modalCancel={"取消"}
              >
                <Upload
                  {...uploadAvatorProps}
                >
                  <Button type="primary" loading={avaUploading}> 上传头像</Button>
                </Upload>
              </ImgCrop>
            </div>
          </Col>
        </Row>
        {/* <Cropper
          style={{ height: 200, width: 200 }}
          src={'http://localhost:5001/statics/6.jpg'}
          ref={cropper => (this.cropper = cropper)}
          initialAspectRatio={1}
          viewMode={2}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          zoomTo={0}
          background={false}
          aspectRatio={1}
          guides={true}
          preview=".uploadCrop"
        />

        <div style={{ width: "50%", float: "right" }} >
          <h1>Preview</h1>
          <div
            className="uploadCrop"
            style={{ width: "100%", float: "left", height: "300px" }}
          />
        </div> */}
      </>
    );
  }
}

AvaUpload.propTypes = {

};

export default AvaUpload;