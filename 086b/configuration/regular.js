let regular = {};

regular.mobileReg = /^1[3456789]\d{9}$/; // 11位手机号码
regular.smsCodeReg = /^\d{6}$/; // 6位数字验证码

module.exports = regular;

