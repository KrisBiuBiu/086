import React, { Component } from 'react';
import { Button, Input, Select, Row, Col, Tooltip, Divider } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import {
  makeHttpQuery,
} from '../utils/fn';

class SignModal extends Component {
  constructor() {
    super();
    this.state = {
      signInMethod: "code", // pass 密码登录；code 验证码登录
      modalType: "login",
      count: 60,
      liked: true,
    };
  }

  changeSignInMethod = (method) => {
    this.setState({ signInMethod: method })
  }

  changeModalType = (type) => {
    this.setState({ modalType: type })
  }

  verificationCodeCountDown() {
    const { count } = this.state;
    if (count === 1) {
      this.setState({
        count: 60,
        liked: true,
      });
    } else {
      this.setState({
        count: count - 1,
        liked: false,
      });
      setTimeout(this.verificationCodeCountDown.bind(this), 1000);
    }
  }

  sendVerificationCode = () => {
    const { liked } = this.state;
    if (!liked) {
      return;
    }
    this.verificationCodeCountDown();
  };

  userLogin = async () => {
    console.log("denglu");
    const res = await makeHttpQuery("/sign/login", {});
    console.log(res)
  }

  render() {
    const {
      signInMethod,
      modalType
    } = this.state;
    return (
      <>
        <div>
          <Row>
            {
              modalType === "login" ? (
                <>
                  <Col span={24} style={{ marginBottom: "30px" }}>
                    <Input.Group compact>
                      <Select defaultValue="+86" style={{ width: "30%" }}>
                        <Select.Option value="+86">+86</Select.Option>
                        <Select.Option value="+1">+1</Select.Option>
                      </Select>
                      <Input style={{ width: '70%' }} placeholder="手机号" />
                    </Input.Group>
                  </Col>
                  <Col span={24} style={{ marginBottom: "5px" }}>
                    {
                      signInMethod === "pass" ? (
                        <Input.Password placeholder="密码" />
                      ) : (
                        <Row>
                          <Col span={12}>
                            <Input style={{ width: '100%' }} placeholder="验证码" />
                          </Col>
                          <Col span={12} style={{ textAlign: "end" }}>
                            <Button style={{ width: "70%" }} onClick={() => this.sendVerificationCode()} disabled={!this.state.liked}>
                              {
                                this.state.liked
                                  ? '获取验证码'
                                  : `${this.state.count} 秒后重发`
                              }
                            </Button>
                          </Col>
                        </Row>
                      )
                    }
                  </Col>
                  <Col span={24}>
                    {
                      signInMethod === "pass" ? (
                        <Button type="link" style={{ margin: "5px 0", padding: "0" }} onClick={() => this.changeSignInMethod("code")}>验证码登录</Button>
                      ) : (
                        <Button type="link" style={{ margin: "5px 0", padding: "0" }} onClick={() => this.changeSignInMethod("pass")}>密码登录</Button>
                      )
                    }
                  </Col>
                  <Col span={24} style={{ marginBottom: "60px" }}>
                    <Button type="primary" style={{ width: "100%" }} onClick={() => this.userLogin()}>登陆</Button>
                  </Col>
                  <Col span={24} style={{ textAlign: "center", marginBottom: "30px" }}>
                    <Tooltip title="search">
                      <Button shape="circle" icon={<SearchOutlined />} />
                    </Tooltip>
                    <Tooltip title="search">
                      <Button shape="circle" icon={<SearchOutlined />} />
                    </Tooltip>
                  </Col>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <Button type="link">找回密码</Button>
                    <Divider type="vertical" />
                    <Button type="link">邮箱登录</Button>
                    <Divider type="vertical" />
                    <Button type="link" onClick={() => this.changeModalType("register")}>快速注册</Button>
                    <Divider type="vertical" />
                    <Button type="link">遇到问题</Button>
                  </Col>
                </>
              ) : (
                <>
                  <Col span={24} style={{ marginBottom: "30px" }}>
                    <Input.Group compact>
                      <Select defaultValue="+86" style={{ width: "30%" }}>
                        <Select.Option value="+86">+86</Select.Option>
                        <Select.Option value="+1">+1</Select.Option>
                      </Select>
                      <Input style={{ width: '70%' }} placeholder="手机号" />
                    </Input.Group>
                  </Col>
                  <Col span={24} style={{ marginBottom: "5px" }}>
                    {
                      signInMethod === "pass" ? (
                        <Input.Password placeholder="密码" />
                      ) : (
                        <Row>
                          <Col span={12}>
                            <Input style={{ width: '100%' }} placeholder="验证码" />
                          </Col>
                          <Col span={12} style={{ textAlign: "end" }}>
                            <Button style={{ width: "70%" }} onClick={() => this.sendVerificationCode()} disabled={!this.state.liked}>
                              {
                                this.state.liked
                                  ? '获取验证码'
                                  : `${this.state.count} 秒后重发`
                              }
                            </Button>
                          </Col>
                        </Row>
                      )
                    }
                  </Col>
                  <Col span={24} style={{ marginBottom: "60px" }}>
                    <Button type="primary" style={{ width: "100%" }}>注册</Button>
                  </Col>
                  <Col span={24} style={{ textAlign: "center", marginBottom: "30px" }}>
                    <Tooltip title="search">
                      <Button shape="circle" icon={<SearchOutlined />} />
                    </Tooltip>
                    <Tooltip title="search">
                      <Button shape="circle" icon={<SearchOutlined />} />
                    </Tooltip>
                  </Col>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <Button type="link" onClick={() => this.changeModalType("login")}>直接登录</Button>
                    <Divider type="vertical" />
                    <Button type="link">遇到问题</Button>
                  </Col>
                </>
              )
            }
          </Row>
        </div>
      </>
    );
  }
}

SignModal.propTypes = {

};

export default SignModal;