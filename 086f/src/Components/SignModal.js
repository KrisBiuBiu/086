import React, { Component } from 'react';
import {
  Button, Input, Select, Row, Col, Tooltip, Divider, message,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {
  makeHttpQuery, makeHttpRequest,
} from '../utils/fn';
import cookies from '../utils/cookies';
import regular from '../configuration/regular';
import antdIcon from '../configuration/antdIcon';

class SignModal extends Component {
  constructor() {
    super();
    this.state = {
      signInMethod: 'code', // pass 密码登录；code 验证码登录
      mobile: '',
      password: '',
      smsCode: '',
      count: 60,
      liked: true,
    };
  }

  changeSignInMethod = (method) => {
    this.setState({ signInMethod: method });
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
      message.error('请输入正确的手机号码', 3);
      return;
    }
    await makeHttpRequest('post', '/sign/smsCode', { mobile });
    this.smsCodeCountDown();
  };

  userLoginWithPassWord = async () => {
    const { mobile, password } = this.state;
    const res = await makeHttpQuery('/sign/login', { mobile });
    const date = new Date();
    date.setTime(date.getTime() + (48 * 60 * 60 * 1000));
    cookies.set('token', res.data.token, { path: '/', expires: date });
    window.location.replace('/');
  }

  userLoginWithSmsCode = async () => {
    const { mobile, smsCode } = this.state;
    if (!mobile || !regular.mobileReg.test(mobile)) {
      message.error('请输入正确的手机号码', 3);
      return;
    }
    if (!smsCode || !regular.smsCodeReg.test(smsCode)) {
      message.error('请输入正确的6位数字验证码', 3);
      return;
    }
    const res = await makeHttpRequest('post', '/sign/loginWithSmsCode', { mobile, smsCode });
    const date = new Date();
    date.setTime(date.getTime() + (48 * 60 * 60 * 1000));
    cookies.set('token', res.data.token, { path: '/', expires: date });
    window.location.replace('/');
  }

  userRegister = async () => {
    const { mobile } = this.state;
    const res = await makeHttpQuery('/sign/register', { mobile });
    console.log(res);
  }

  handleInputChange = (event, type) => {
    this.setState({ [type]: event.target.value });
  }

  render() {
    const {
      signInMethod,
      mobile,
      password,
    } = this.state;
    return (
      <>
        <div>
          <Row>
            <>
              <Col
                span={24}
                style={{ marginBottom: '30px', margin: "30px 0", textAlign: "center", fontSize: "24px", fontWeight: "bold", color: "#0d4f8c" }}
              >
                极速登录/注册
              </Col>
              <Col
                span={24}
                style={{ marginBottom: '30px' }}
              >
                <Input.Group compact>
                  <Input
                    style={{ width: '100%' }}
                    prefix={
                      <>
                        <antdIcon.MobileOutlined />
                        <Select
                          defaultValue="+86"
                          size="small"
                          bordered={false}
                        >
                          <Select.Option value="+86">+86</Select.Option>
                          <Select.Option value="+1">+1</Select.Option>
                        </Select>
                      </>
                    }
                    placeholder="输入手机号"
                    value={mobile}
                    onChange={(event) => this.handleInputChange(event, 'mobile')}
                  />
                </Input.Group>
              </Col>
              <Col
                span={24}
                style={{ marginBottom: '5px' }}
              >
                {
                  signInMethod === 'pass' ? (
                    <Input.Password
                      placeholder="密码"
                      prefix={<antdIcon.UnlockOutlined />}
                      value={password}
                      onChange={(event) => this.handleInputChange(event, 'password')}
                    />
                  ) : (
                    <Row>
                      <Col span={24}>
                        <Input
                          style={{ width: '100%', paddingRight: "4px" }}
                          prefix={<antdIcon.SafetyOutlined />}
                          suffix={
                            <Button
                              style={{ width: '100%', borderRadius: "2px", border: "unset", background: "#eee" }}
                              onClick={() => this.sendSmsCode()}
                              disabled={!this.state.liked}
                              size="small"
                            // type="text"
                            >
                              {
                                this.state.liked
                                  ? '获取验证码'
                                  : `${this.state.count} 秒后重发`
                              }
                            </Button>
                          }
                          placeholder="短信验证码"
                          onChange={(event) => this.handleInputChange(event, 'smsCode')}
                          maxLength={6}
                        />
                      </Col>
                      {/* <Col
                        span={8}
                        style={{ textAlign: 'end' }}
                      >
                        <Button
                          style={{ width: '100%' }}
                          onClick={() => this.sendSmsCode()}
                          disabled={!this.state.liked}
                        >
                          {
                            this.state.liked
                              ? '获取验证码'
                              : `${this.state.count} 秒后重发`
                          }
                        </Button>
                      </Col> */}
                    </Row>
                  )
                }
              </Col>
              <Col span={24}>
                {
                  signInMethod === 'pass' ? (
                    <Button
                      type="link"
                      style={{
                        margin: '10px 0',
                        padding: '0',
                      }}
                      onClick={() => this.changeSignInMethod('code')}
                    >
                      极速登录/注册
                    </Button>
                  ) : (
                    <Button
                      type="link"
                      style={{
                        margin: '10px 0',
                        padding: '0',
                      }}
                      onClick={() => this.changeSignInMethod('pass')}
                    >
                      密码登录
                    </Button>
                  )
                }
              </Col>
              <Col
                span={24}
                style={{ marginBottom: '60px' }}
              >
                {
                  signInMethod === 'pass' ? (
                    <Button
                      type="primary"
                      style={{ width: '100%' }}
                      size="large"
                      shape="round"
                      onClick={() => this.userLoginWithPassWord()}
                    >
                      登录
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      style={{ width: '100%' }}
                      size="large"
                      shape="round"
                      onClick={() => this.userLoginWithSmsCode()}
                    >
                      登录
                    </Button>
                  )
                }
              </Col>
              <Col
                span={24}
                style={{
                  textAlign: 'center',
                  marginBottom: '30px',
                }}
              >
                <Tooltip title="search">
                  <Button
                    shape="circle"
                    icon={<SearchOutlined />}
                  />
                </Tooltip>
                <Tooltip title="search">
                  <Button
                    shape="circle"
                    icon={<SearchOutlined />}
                  />
                </Tooltip>
              </Col>
              <Col
                span={24}
                style={{ textAlign: 'center' }}
              >
                <Button type="link">找回密码</Button>
                <Divider type="vertical" />
                <Button type="link">遇到问题</Button>
              </Col>
            </>
          </Row>
        </div>
      </>
    );
  }
}

SignModal.propTypes = {

};

export default SignModal;
