import React, { Component } from 'react';
import { Button, Input, Select, Row, Col, Tooltip, Divider, message } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import {
  makeHttpQuery, makeHttpRequest,
} from '../utils/fn';
import cookies from '../utils/cookies';
import regular from '../configuration/regular';

class SignModal extends Component {
  constructor() {
    super();
    this.state = {
      signInMethod: "code", // pass 密码登录；code 验证码登录
      modalType: "login",
      mobile: "",
      password: "",
      smsCode: "",
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

  smsCodeCountDown() {
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
      setTimeout(this.smsCodeCountDown.bind(this), 1000);
    }
  }

  sendSmsCode = async () => {
    const { liked, mobile } = this.state;
    if (!liked) {
      return;
    }
    if (!regular.mobileReg.test(mobile)) {
      message.error("请输入正确的手机号码", 3);
      return;
    }
    await makeHttpRequest("post", `/sign/smsCode`, { mobile });
    this.smsCodeCountDown();
  };

  userLoginWithPassWord = async () => {
    const { mobile, password } = this.state;
    const res = await makeHttpQuery("/sign/login", { mobile });
    const date = new Date();
    date.setTime(date.getTime() + (48 * 60 * 60 * 1000));
    cookies.set('token', res.data.token, { path: '/', expires: date });
    window.location.replace("/")
  }

  userLoginWithSmsCode = async () => {
    const { mobile, smsCode } = this.state;
    if (!mobile || !regular.mobileReg.test(mobile)) {
      message.error("请输入正确的手机号码", 3)
      return;
    }
    if (!smsCode || !regular.smsCodeReg.test(smsCode)) {
      message.error("请输入正确的6位数字验证码", 3);
      return;
    }
    const res = await makeHttpRequest("post", "/sign/loginWithSmsCode", { mobile, smsCode });
    const date = new Date();
    date.setTime(date.getTime() + (48 * 60 * 60 * 1000));
    cookies.set('token', res.data.token, { path: '/', expires: date });
    window.location.replace("/")
  }

  userRegister = async () => {
    const { mobile } = this.state;
    const res = await makeHttpQuery("/sign/register", { mobile });
    console.log(res)
  }

  handleInputChange = (event, type) => {
    this.setState({ [type]: event.target.value })
  }

  render() {
    const {
      signInMethod,
      modalType,
      mobile,
      password
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
                      <Input style={{ width: '70%' }} placeholder="手机号" value={mobile} onChange={(event) => this.handleInputChange(event, "mobile")} />
                    </Input.Group>
                  </Col>
                  <Col span={24} style={{ marginBottom: "5px" }}>
                    {
                      signInMethod === "pass" ? (
                        <Input.Password placeholder="密码" value={password} onChange={(event) => this.handleInputChange(event, "password")} />
                      ) : (
                        <Row>
                          <Col span={12}>
                            <Input style={{ width: '100%' }}
                              placeholder="验证码"
                              onChange={(event) => this.handleInputChange(event, "smsCode")} maxLength={6} />
                          </Col>
                          <Col span={12} style={{ textAlign: "end" }}>
                            <Button style={{ width: "70%" }} onClick={() => this.sendSmsCode()} disabled={!this.state.liked}>
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
                    {
                      signInMethod === "pass" ? (

                        <Button type="primary" style={{ width: "100%" }} onClick={() => this.userLoginWithPassWord()}>登录</Button>
                      ) : (

                        <Button type="primary" style={{ width: "100%" }} onClick={() => this.userLoginWithSmsCode()}>登录</Button>
                      )
                    }
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
                            <Button style={{ width: "70%" }} onClick={() => this.sendSmsCode()} disabled={!this.state.liked}>
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
                    <Button type="primary" style={{ width: "100%" }} onClick={() => this.userRegister()}>注册</Button>
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