/**
 * 小程序配置文件
 */
// var host = 'http://192.168.134.254:8080/zhenler-server/api'
// var host = "http://192.168.134.2:8082/api";
// var host = 'http://192.168.134.116:8080/zhenler-server/api';
// var host = 'https://vip.zhenler.com/api';// 发布环境
var host = 'http://vip.zhenler.com'// 开发环境
// var host = 'http://119.23.132.192/zhenler-server/api';// 测试环境

if (process.env.NODE_ENV === 'production') {
  host = ''
}

var config = {
  // 下面的地址配合云端 Server 工作
  host,

  version: '1.0.1212',

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
  // 更新用户信息
  judgmentShop: `${host}/api/restaurant/judgmentShop`,
  // 创建店铺
  createRestaurant: `${host}/api/restaurant/createRestaurant`,
  // 三级联动 - 省
  getAllProvince: `${host}/api/region/getAllProvince`,
  // 三级联动 - 市/区
  getRegionByPid: `${host}/api/region/getRegionByPid`
}
module.exports = config
