module.exports = {
  isPhone_Mobile: /^0(\d){2,3}-?(\d){7,8}$|^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/, // 验证手机号码与电话号码
  isPhone_str: `^0d{2,3}-?d{7,8}$`, // 验证电话号码
  isPhone: /^0d{2,3}-?d{7,8}$/, // 验证电话号码
  isMobile_str: `^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$`, // 验证手机号码
  isMobile: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/, // 验证手机号码
}
