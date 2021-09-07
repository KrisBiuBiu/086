const regular = {};

// 11位手机号码
regular.mobileReg = /^1[3456789]\d{9}$/

// 6位数字验证码
regular.smsCodeReg = /^\d{6}$/

export default regular;