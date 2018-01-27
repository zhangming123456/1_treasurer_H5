'use strict'

/**
 * 配置文件
 */
// var host = 'http://192.168.134.254:8080/zhenler-server'
var host = 'http://192.168.134.2:8082'
// var host = 'http://192.168.134.108:8080/zhenler-server'
// var host = 'https://vip.zhenler.com/api';// 发布环境
// var host = 'http://vip.zhenler.com'// 开发环境
var Hash = '1'
// var host = 'http://119.23.132.192/zhenler-server/api';// 测试环境
var isVerifyApi = [
  '/followUs',
]
if (process.env.NODE_ENV === 'production') {
  host = 'https://vip.zhenler.com'
  Hash = +new Date()
} else {
  var arr = [
    '/userinfo-perfect',
    '/registerSuccess',
    '/bindShop',
  ]
  for (var i = 0; i < arr.length; i++) {
    isVerifyApi.push(arr[i])
  }
}

var config = {
  // 下面的地址配合云端 Server 工作
  host,
  Hash,
  isVerifyApi (path) {
    if (/^\/login/.test(path)) {
      return true
    } else {
      for (var i = 0; i < isVerifyApi.length; i++) {
        if (isVerifyApi[i] === path) {
          return true
        }
      }
    }
  },

  version: '1.1.0122',

  // 图片服务器地址
  imageUrl: `http://f.zhenler.com`,

  // 登录地址，用于建立会话
  loginUrl: `https://${host}/login`,

  // 测试的请求地址，用于测试会话
  requestUrl: `https://${host}/testRequest`,

  // 用code换取openId
  openIdUrl: `https://${host}/openid`,

  // 测试的信道服务接口
  tunnelUrl: `https://${host}/tunnel`,

  // 生成支付订单的接口
  paymentUrl: `https://${host}/payment`,

  // 发送模板消息接口
  templateMessageUrl: `https://${host}/templateMessage`,

  // 上传文件接口
  uploadFileUrl: `https://${host}/upload`,

  // 下载示例图片接口
  downloadExampleUrl: `https://${host}/static/weapp.jpg`,

  // jssdk授权
  wxScanQRcode: `${host}/api/wxScanQRcode/scan`,
  // 登入
  toLogin: `${host}/api/user/toLogin`,
  // 查询用户信息
  findResUser: `${host}/api/resUser/findResUser`,
  // 更新用户信息
  updateShiroUser: `${host}/api/user/updateShiroUser`,
  // 查询是否绑定店铺
  judgmentShop: `${host}/api/restaurant/judgmentShop`,
  // 创建店铺
  createRestaurant: `${host}/api/restaurant/createRestaurant`,
  // 三级联动 - 省
  getAllProvince: `${host}/api/region/getAllProvince`,
  // 三级联动 - 市/区
  getRegionByPid: `${host}/api/region/getRegionByPid`,
  // 获取业态下拉
  getDicList: `${host}/api/dic/getDicList`,
  // 删除员工
  deleteResUser: `${host}/api/resUser/deleteResUser`,
  // 更新员工
  updateOrSaveResUser: `${host}/api/resUser/updateOrSaveResUser`,
  // 更新员工状态
  updateResUser: `${host}/api/resUser/updateResUser`,
  // 查询餐厅角色
  findRoleList: `${host}/api/role/findRoleList`,
  // 绑定员工
  bindResUser: `${host}/api/resUser/bindResUser`,
  // 我的应用列表
  getResModularList: `${host}/api/resmodular/getResModularList`,
  // 短信使用记录
  getMobileMsgList: `${host}/api/mobileMsg/getMobileMsgList`,
  // 获取验证码
  getSmsCode: `${host}/api/sms/getSmsCode`,
  // 获取注册验证码-new
  getSmsCodeForRegister: `${host}/api/sms/getSmsCodeForRegister`,
  // 获取重置验证码-new
  getSmsCodeForResetPassword: `${host}/api/sms/getSmsCodeForResetPassword`,
  // 校验验证码
  checkSmsCodeByMobile: `${host}/api/sms/checkSmsCodeByMobile`,
  // 注册
  userRegister: `${host}/api/user/userRegister`,
  // 校验手机号是否注册过
  checkMobile: `${host}/api/user/checkMobile`,
  // 更新密码
  updatePassword: `${host}/api/user/updatePassword`,
  // 重置密码
  resetPassword: `${host}/api/user/resetPassword`,
  // 获取桌台列表
  findQRTableDtoList: `${host}/api/table/findQRTableDtoList`,
  // 是否绑定店铺
  isBindRestaurantQRcode: `${host}/api/qrtable/isBindRestaurantQRcode`,
  // 解绑二维码-桌台或店铺
  unBoundQRcode: `${host}/api/qrtable/unBoundQRcode`,
  // 绑定二维码-桌台或店铺
  bindQRcode: `${host}/api/qrtable/bindQRcode`,
}
module.exports = config
