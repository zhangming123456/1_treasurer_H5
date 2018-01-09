'use strict'
import Vue from 'vue'
import config from '../../libs/config'
import axios from 'axios'
import util from '../../libs/util'
import querystring from '../../tools/querystring'
import cookie from 'js-cookie'
import store from '../index'

class RequestParams {
  constructor (state, data, signa) {
    try {
      let params = {
        token: state.token
      }
      let query = {
        signtime: Date.parse(new Date()) / 1000,
        appId: state.query.appId
      }
      let sendData = {}
      if (state.token && state.token.length > 0) {
        Object.assign(query, data)
        params.signature = util.sign(state.secretkey, query)
        Object.assign(sendData, params, query)
      } else if (signa) {
        Object.assign(sendData, data)
      }
      this.params = sendData
    } catch (error) {
      this.params = {}
    }
  }

  post (type) {
    let that = this
    console.log(that.params)
    const p = axios.post(config[type], util.queryString.stringify(that.params))
    p.then(
      (rsp) => {
        if (rsp.data.code == 5010) {
          store.dispatch('logOut')
          Vue.$vux.toast.text(rsp.data.message)
        }
      }
    )
    return p
  }
}

const ApiService_data = {
  loginInfo: {},
  secretkey: '261ad12f08f13811298e2b50f803deab',
  token: '',
  resId: '',
  shiroUserId: '',
  query: {
    appId: 'eb86f42f6504bfefe069e85a204c9734'
  },
  qrcodeImg: '',
  wxScanQRcodeData: {},
  findResUserData: {},
  findResUserListData: [],
  ChinaAddressData: {
    'province_list': [],
    'city_list': [],
    'county_list': []
  },
  DicList: {
    'cater_industry': [],
    'cooking_type': []
  },
  findRoleListData: [], // 员工列表
  resModularList: [], // 应用列表
  MobileMsgListData: [], // 短信记录列表
  findQRTableDtoListData: [], // 桌台列表
  isBindOrderQRCode: {},// 是否绑定店铺信息
}

let ApiService = {
  state: util.deepClone(ApiService_data),
  mutations: {
    async ['ApiService.toLogin'] (state, payload) {
      // state.loginInfo = {
      //   // 'nike_name': '1号掌柜66',
      //   // 'resName': '1号掌柜有限公司',
      //   // 'companyId': '000000005c2536d5015c2e169195061d',
      //   // 'phoneNumber': '18812345678',
      //   // 'nowDateTime': 1513409501190,
      //   // 'companyName': '珍乐科技',
      //   // 'shiroUserId': '000000005c2536d5015c2e169196061e',
      //   // 'resId': '000000005c2536d5015c2e169199061f',
      //   // 'token': '55fcdccdda67df10240e8bd2e6a1a875',
      //   // 'type': '1',
      // }
      Object.assign(state, util.deepClone(ApiService_data))
      state.loginInfo = payload.data
      if (state.loginInfo.phoneNumber) {
        state.loginInfo.mobile = state.loginInfo.phoneNumber
      }
      state.token = state.loginInfo.token || ''
      state.shiroUserId = state.loginInfo.shiroUserId || ''
      state.resId = state.loginInfo.resId || ''
      state.mobile = state.loginInfo.mobile || ''
      cookie.set('token', state.token, {
        expires: 1 / 24
      })
      cookie.set('shiroUserId', state.shiroUserId, {
        expires: 1 / 24
      })
      cookie.set('resId', state.resId, {
        expires: 1 / 24
      })
      cookie.set('mobile', state.mobile, {
        expires: 1 / 24
      })
    },
    async ['ApiService.wxScanQRcode'] (state, payload) {
      state.wxScanQRcodeData = payload.data
    },
    async ['ApiService.findResUser'] (state, payload) {
      state.findResUserData = payload.data
      let data = {
        'shiroUserId': state.shiroUserId || '',
        'resId': payload.data.resId || '',
        'type': payload.data.type || ''
      }
      state.resId = data.resId || ''
      cookie.set('resId', state.resId, {
        expires: 1 / 24
      })
      state.qrcodeImg = querystring.stringify(data)
      cookie.set('qrcodeImg', state.qrcodeImg, {
        expires: 1 / 24
      })
    },
    async ['ApiService.findResUserList'] (state, payload) {
      state.findResUserListData = payload.data
    },
    async ['ApiService.ChinaAddressData.province_list'] (state, payload) {
      let arr = [], data = payload.data
      for (let v of data) {
        arr.push({name: v.name, value: v.id, parent: v.pid, status: true})
      }
      state.ChinaAddressData.province_list = arr
    },
    async ['ApiService.ChinaAddressData.city_list'] (state, payload) {
      let arr = [], data = payload.data
      for (let v of data) {
        arr.push({name: v.name, value: v.id, parent: v.pid, status: true})
      }
      state.ChinaAddressData.city_list = arr
    },
    async ['ApiService.ChinaAddressData.county_list'] (state, payload) {
      let arr = [], data = payload.data
      for (let v of data) {
        arr.push({name: v.name, value: v.id, parent: v.pid, status: true})
      }
      state.ChinaAddressData.county_list = arr
    },
    async ['ApiService.DicList.cater_industry'] (state, payload) {
      let arr = [], data = payload.data
      for (let [i, v] of data.entries()) {
        arr.push({name: v.value, index: i, value: v.id, parent: v.code, status: true})
      }
      state.DicList.cater_industry = arr
    },
    async ['ApiService.DicList.cooking_type'] (state, payload) {
      let arr = [], data = payload.data
      for (let [i, v] of data.entries()) {
        arr.push({name: v.value, index: i, value: v.id, parent: v.code, status: true})
      }
      state.DicList.cooking_type = arr
    },
    async ['ApiService.findRoleList'] (state, payload) {
      let arr = [], data = payload.data
      for (let [i, v] of data.entries()) {
        arr.push({name: v.name, index: i, value: v.id})
      }
      state.findRoleListData[0] = arr
    },
    async ['ApiService.getResModularList'] (state, payload) {
      let arr = [], data = payload.data
      state.resModularList = data
    },
    async ['ApiService.getMobileMsgList'] (state, payload) {
      let arr = [], data = payload.data
      state.MobileMsgListData = data
    },
    async ['ApiService.findQRTableDtoList'] (state, payload) {
      let arr = [], data = payload.data
      state.findQRTableDtoListData = data
    },
    async ['ApiService.isBindRestaurantQRcode'] (state, payload) {
      let arr = [], data = payload.data
      state.isBindOrderQRCode = data
    },
  },
  actions: {
    /**
     * 登入
     * @param commit
     * @param state
     * @param dispatch
     * @param data mobile：手机号  password：密码
     * @returns {Promise<*>}
     * @constructor
     */
    async ['ApiService.toLogin'] ({commit, state, dispatch}, data = {}) {
      const type = 'toLogin'
      const p = new RequestParams(state, data, true).post(type)
      try {
        p.then(
          (rsp) => {
            if (2000 == rsp.data.code && util.isEmptyValue(rsp.data.value)) {
              console.log(rsp.data.value, type)
              commit({type: `ApiService.${type}`, data: rsp.data.value})
            }
          },
          (rsp) => {

          }
        )
      } catch (e) {
        console.warn(`调用${type}赋值失败`)
      }
      return p
    },
    /**
     * 获取登入
     * @param commit
     * @param state
     * @param dispatch
     * @param data mobile：手机号  password：密码
     * @returns {Promise<*>}
     * @constructor
     */
    async ['ApiService.getToLogin'] ({commit, state, dispatch}, data = {}) {
      const p = new Promise((resolve, reject) => {
        try {
          const [token, shiroUserId, resId, mobile, secretKey] = [
            cookie.get('token') || state.token,
            cookie.get('shiroUserId') || state.shiroUserId,
            cookie.get('resId') || state.resId,
            cookie.get('mobile') || state.mobile,
            cookie.get('secretKey')
          ]
          if (token && shiroUserId && mobile) {
            commit({type: `ApiService.toLogin`, data: {token, shiroUserId, resId, mobile}})
            resolve()
          } else if (util.trim(secretKey) && false) {
            const _secretKey = querystring.parse(secretKey)
            let data = {
              mobile: _secretKey[0],
              password: _secretKey[1],
              newPwd: _secretKey[2]
            }
            if (data.mobile && data.password && data.newPwd) {
              dispatch('ApiService.toLogin', data).then(
                (rsp) => {
                  if (rsp.data.code == 2000) {
                    resolve()
                  } else {
                    cookie.remove('secretKey')
                    reject()
                  }
                },
                () => {
                  reject()
                }
              )
            } else {
              reject()
            }
          } else {
            reject()
          }
        } catch (e) {
          reject()
        }
      })
      return p
    },
    /**
     * 公众号验签
     * @param commit
     * @param state
     * @param dispatch
     * @param data url：安全域名
     * @returns {Promise<*>}
     * @constructor
     */
    async ['ApiService.wxScanQRcode'] ({commit, state, dispatch}, data = {}) {
      const type = 'wxScanQRcode'
      const p = new RequestParams(state, data).post(type)
      try {
        p.then(
          (rsp) => {
            if (2000 == rsp.data.code && util.isEmptyValue(rsp.data.value)) {
              console.log(rsp.data.value, type)
              commit({type: `ApiService.${type}`, data: rsp.data.value})
            }
          },
          (rsp) => {

          }
        )
      } catch (e) {
        console.warn(`调用${type}赋值失败`)
      }
      return p
    },
    /**
     * 查询用户信息
     * @param commit
     * @param state
     * @param dispatch
     * @param data resId：店铺id shiroUserId：用户id
     * @returns {Promise<*>}
     * @constructor
     */
    async ['ApiService.findResUser'] ({commit, state, dispatch}, data = {}) {
      let type = 'findResUser',
        isList = 0, isGet = false
      if (data.config) {
        if (1 === data.config.isList) {
          isList = data.config.isList
        } else if (1 === data.config.isGet) {
          isGet = data.config.isGet
        }
      }
      delete data.config
      const p = new RequestParams(state, data).post(type)
      try {
        p.then(
          (rsp) => {
            let data = rsp.data.value
            if (util.isJsonString(data)) {
              data = JSON.parse(data)
            }
            if (!isGet) {
              if (isList) {
                if (2000 == rsp.data.code && util.isEmptyValue(data)) {
                  console.log(data, type)
                  commit({type: `ApiService.${type}List`, data: data})
                }
              } else {
                if (2000 == rsp.data.code && util.isEmptyValue(data) && data[0] && util.isEmptyValue(data[0])) {
                  console.log(data[0], type)
                  commit({type: `ApiService.${type}`, data: data[0]})
                } else {
                  commit({type: `ApiService.${type}`, data: {}})
                }
              }
            } else {
              console.log(data, type)
            }
          },
          (rsp) => {

          }
        )
      } catch (e) {
        console.warn(`调用${type}赋值失败`)
      }
      return p
    },
    /**
     * 更新用户信息
     * @param commit
     * @param state
     * @param dispatch
     * @param data resId：店铺id id：用户id trueName:昵称 sex：性别
     * @returns {Promise<*>}
     * @constructor
     */
    async ['ApiService.updateShiroUser'] ({commit, state, dispatch}, data = {}) {
      const type = 'updateShiroUser'
      const p = new RequestParams(state, data).post(type)
      try {
        p.then(
          (rsp) => {

          },
          (rsp) => {

          }
        )
      } catch (e) {
        console.warn(`调用${type}赋值失败`)
      }
      return p
    },
    /**
     * 查询是否绑定店铺
     * @param commit
     * @param state
     * @param dispatch
     * @param data shiroUserId：用户id
     * @returns {Promise<*>}
     * @constructor
     */
    async ['ApiService.judgmentShop'] ({commit, state, dispatch}, data = {}) {
      const type = 'judgmentShop'
      const p = new RequestParams(state, data).post(type)
      try {
        p.then(
          (rsp) => {

          },
          (rsp) => {

          }
        )
      } catch (e) {
        console.warn(`调用${type}赋值失败`)
      }
      return p
    },
    /**
     * 创建店铺
     * @param commit
     * @param state
     * @param dispatch
     * @param data
     *     shiroUserId:用户id
     *     trueName：店铺名称
     *     mobile：门店电话
     *     provinceCity：门店地址.
     *     addRess：详细地址
     *     businessType:门店类型 //0连锁//1单店
     *     业态: {
     *          typeOfOperation: 分类 0：堂食 1：快餐
     *          typeOfCooking：菜系
     *      }
     * @returns {Promise<*>}
     * @constructor
     */
    async ['ApiService.createRestaurant'] ({commit, state, dispatch}, data = {}) {
      const type = 'createRestaurant'
      const p = new RequestParams(state, data).post(type)
      try {
        p.then(
          (rsp) => {
            let data = rsp.data.value
            if (util.isJsonString(data)) {
              data = JSON.parse(data)
            }
            if (2000 == rsp.data.code && util.isEmptyValue(data) && data[0] && util.isEmptyValue(data[0])) {
              console.log(data[0], type)
              // commit({type: `ApiService.${type}`, data: data[0]})
            }
          },
          (rsp) => {

          }
        )
      } catch (e) {
        console.warn(`调用${type}赋值失败`)
      }
      return p
    },
    /**
     * 三级联动 - 省
     * @param commit
     * @param state
     * @param dispatch
     * @param data
     * @returns {Promise<*>}
     * @constructor
     */
    async ['ApiService.getAllProvince'] ({commit, state, dispatch}, data = {}) {
      let type = 'getAllProvince'
      const p = new RequestParams(state, data).post(type)
      type = 'ChinaAddressData.province_list'
      try {
        p.then(
          (rsp) => {
            let data = rsp.data.value
            if (util.isJsonString(data)) {
              data = JSON.parse(data)
            }
            if (2000 == rsp.data.code && util.isEmptyValue(data) && data[0] && util.isEmptyValue(data[0])) {
              console.log(data, type)
              commit({type: `ApiService.${type}`, data: data})
            }
          },
          (rsp) => {

          }
        )
      } catch (e) {
        console.warn(`调用${type}赋值失败`)
      }
      return p
    },
    /**
     * 三级联动 - 市/区
     * @param commit
     * @param state
     * @param dispatch
     * @param data {pid：}
     * @returns {Promise<*>}
     * @constructor
     */
    async ['ApiService.getRegionByPid'] ({commit, state, dispatch}, data = {}) {
      let type = 'getRegionByPid',
        addressType = 'city_list'
      if (data.config) {
        if (1 === data.config.addressType || 'county_list' === data.config.addressType) {
          addressType = 'county_list'
        }
      }
      delete data.config
      const p = new RequestParams(state, data).post(type)
      type = `ChinaAddressData.${addressType}`
      try {
        p.then(
          (rsp) => {
            let data = rsp.data.value
            if (util.isJsonString(data)) {
              data = JSON.parse(data)
            }
            if (2000 == rsp.data.code && util.isEmptyValue(data) && data[0] && util.isEmptyValue(data[0])) {
              console.log(data, type)
              commit({type: `ApiService.${type}`, data: data})
            }
          },
          (rsp) => {

          }
        )
      } catch (e) {
        console.warn(`调用${type}赋值失败`)
      }
      return p
    },
    /**
     * 获取业态下拉菜单
     * @param commit
     * @param state
     * @param dispatch
     * @param data {parentCode：0:cater_industry 1: cooking_type}
     * @returns {Promise<*>}
     * @constructor
     */
    async ['ApiService.getDicList'] ({commit, state, dispatch}, data = {}) {
      let type = 'getDicList'
      data.parentCode = 'cater_industry'
      if (data.config) {
        if (1 === data.config.type || 'cooking_type' === data.config.type) {
          data.parentCode = 'cooking_type'
        }
      }
      delete data.config
      const p = new RequestParams(state, data).post(type)
      type = `DicList.${data.parentCode}`
      try {
        p.then(
          (rsp) => {
            let data = rsp.data.value
            if (util.isJsonString(data)) {
              data = JSON.parse(data)
            }
            if (2000 == rsp.data.code && util.isEmptyValue(data) && data[0] && util.isEmptyValue(data[0])) {
              console.log(data, type)
              commit({type: `ApiService.${type}`, data: data})
            }
          },
          (rsp) => {

          }
        )
      } catch (e) {
        console.warn(`调用${type}赋值失败`)
      }
      return p
    },
    /**
     * 删除员工
     * @param commit
     * @param state
     * @param dispatch
     * @param data {id}
     * @returns {Promise<*>}
     * @constructor
     */
    async ['ApiService.deleteResUser'] ({commit, state, dispatch}, data = {}) {
      let type = 'deleteResUser'
      const p = new RequestParams(state, data).post(type)
      try {
        p.then(
          (rsp) => {
            let data = rsp.data.value
            if (util.isJsonString(data)) {
              data = JSON.parse(data)
            }
            if (2000 == rsp.data.code && util.isEmptyValue(data)) {
              console.log(data, type)
              // commit({type: `ApiService.${type}`, data: data})
            }
          },
          (rsp) => {

          }
        )
      } catch (e) {
        console.warn(`调用${type}赋值失败`)
      }
      return p
    },
    /**
     * 更新员工
     * @param commit
     * @param state
     * @param dispatch
     * @param data
     *    private String shiro_user_id;// TER_SHIRO_USER 表的id
     *    private String nick_name;// 真实姓名
     *    private String mobile;// 手机号
     *    private String workNo;// 工号
     *    private String res_name;// 店铺名称
     *    private String role_id;// 角色id
     *    private Double minMaling;
     *    private Double maxMaling;
     *    private Double minDiscount;
     *    private Double maxDiscount;
     *    private Integer checkout;//反结账
     *    private Integer refund;//是否退款
     * @returns {Promise<*>}
     * @constructor
     */
    async ['ApiService.updateOrSaveResUser'] ({commit, state, dispatch}, data = {}) {
      let type = 'updateOrSaveResUser'
      const p = new RequestParams(state, data).post(type)
      try {
        p.then(
          (rsp) => {
            let data = rsp.data.value
            if (util.isJsonString(data)) {
              data = JSON.parse(data)
            }
            if (2000 == rsp.data.code && util.isEmptyValue(data)) {
              console.log(data, type)
              // commit({type: `ApiService.${type}`, data: data})
            }
          },
          (rsp) => {

          }
        )
      } catch (e) {
        console.warn(`调用${type}赋值失败`)
      }
      return p
    },
    /**
     * 更新员工状态
     * @param commit
     * @param state
     * @param dispatch
     * @param data
     *    private String shiroUserId ;// 用户ID
     *    private String resId;// 店铺ID
     *    private Integer status;//0正常  1锁定  2待审核
     * @returns {Promise<*>}
     * @constructor
     */
    async ['ApiService.updateResUser'] ({commit, state, dispatch}, data = {}) {
      let type = 'updateResUser'
      const p = new RequestParams(state, data).post(type)
      try {
        p.then(
          (rsp) => {
            let data = rsp.data.value
            if (util.isJsonString(data)) {
              data = JSON.parse(data)
            }
            if (2000 == rsp.data.code && util.isEmptyValue(data)) {
              console.log(data, type)
              // commit({type: `ApiService.${type}`, data: data})
            }
          },
          (rsp) => {

          }
        )
      } catch (e) {
        console.warn(`调用${type}赋值失败`)
      }
      return p
    },
    /**
     * 绑定员工
     * @param commit
     * @param state
     * @param dispatch
     * @param data
     *    private String shiro_user_id;// TER_SHIRO_USER 表的id
     *    private String nick_name;// 真实姓名
     *    private String mobile;// 手机号
     *    private String workNo;// 工号
     *    private String res_name;// 店铺名称
     *    private String role_id;// 角色id
     *    private Double minMaling;
     *    private Double maxMaling;
     *    private Double minDiscount;
     *    private Double maxDiscount;
     *    private Integer checkout;//反结账
     *    private Integer refund;//是否退款
     * @returns {Promise<*>}
     * @constructor
     */
    async ['ApiService.bindResUser'] ({commit, state, dispatch}, data = {}) {
      let type = 'bindResUser'
      const p = new RequestParams(state, data).post(type)
      try {
        p.then(
          (rsp) => {
            let data = rsp.data.value
            if (util.isJsonString(data)) {
              data = JSON.parse(data)
            }
            if (2000 == rsp.data.code && util.isEmptyValue(data)) {
              console.log(data, type)
              // commit({type: `ApiService.${type}`, data: data})
            }
          },
          (rsp) => {

          }
        )
      } catch (e) {
        console.warn(`调用${type}赋值失败`)
      }
      return p
    },
    /**
     * 查询餐厅角色
     * @param commit
     * @param state
     * @param dispatch
     * @param data {resId}
     * @returns {Promise<*>}
     * @constructor
     */
    async ['ApiService.findRoleList'] ({commit, state, dispatch}, data = {}) {
      let type = 'findRoleList'
      const p = new RequestParams(state, data).post(type)
      try {
        p.then(
          (rsp) => {
            let data = rsp.data.value
            if (util.isJsonString(data)) {
              data = JSON.parse(data)
            }
            if (2000 == rsp.data.code && util.isEmptyValue(data)) {
              console.log(data, type + '_________________-')
              commit({type: `ApiService.${type}`, data: data})
            }
          },
          (rsp) => {

          }
        )
      } catch (e) {
        console.warn(`调用${type}赋值失败`)
      }
      return p
    },
    /**
     * 我的应用列表
     * @param commit
     * @param state
     * @param dispatch
     * @param data {resId}
     * @returns {Promise<*>}
     * @constructor
     */
    async ['ApiService.getResModularList'] ({commit, state, dispatch}, data = {}) {
      let type = 'getResModularList'
      const p = new RequestParams(state, data).post(type)
      try {
        p.then(
          (rsp) => {
            let data = rsp.data.value
            if (util.isJsonString(data)) {
              data = JSON.parse(data)
            }
            if (2000 == rsp.data.code && util.isEmptyValue(data)) {
              console.log(data, type + '_________________-')
              commit({type: `ApiService.${type}`, data: data})
            }
          },
          (rsp) => {

          }
        )
      } catch (e) {
        console.warn(`调用${type}赋值失败`)
      }
      return p
    },
    /**
     * 短信记录
     * @param commit
     * @param state
     * @param dispatch
     * @param data {shirouserId：resId}
     * @returns {Promise<*>}
     * @constructor
     */
    async ['ApiService.getMobileMsgList'] ({commit, state, dispatch}, data = {}) {
      let type = 'getMobileMsgList'
      const p = new RequestParams(state, data).post(type)
      try {
        p.then(
          (rsp) => {
            let data = rsp.data.value
            if (util.isJsonString(data)) {
              data = JSON.parse(data)
            }
            if (2000 == rsp.data.code && util.isEmptyValue(data)) {
              console.log(data, type + '_________________-')
              commit({type: `ApiService.${type}`, data: data})
            }
          },
          (rsp) => {

          }
        )
      } catch (e) {
        console.warn(`调用${type}赋值失败`)
      }
      return p
    },
    /**
     * 获取验证码
     * @param commit
     * @param state
     * @param dispatch
     * @param data {"mobile": mobile, msgTemp: "SMS_DEFAULT_CONTENT"},
     * @returns {Promise<*>}
     * @constructor
     */
    async ['ApiService.getSmsCode'] ({commit, state, dispatch}, data = {}) {
      let type = 'getSmsCode'
      Object.assign(data, {
        msgTemp: 'SMS_DEFAULT_CONTENT'
      })
      const p = new RequestParams(state, data, true).post(type)
      try {
        p.then(
          (rsp) => {
            let data = rsp.data.value
            if (util.isJsonString(data)) {
              data = JSON.parse(data)
            }
            if (2000 == rsp.data.code && util.isEmptyValue(data)) {
              console.log(data, type + '_________________-')
            }
          },
          (rsp) => {

          }
        )
      } catch (e) {
        console.warn(`调用${type}赋值失败`)
      }
      return p
    },
    /**
     * 检测手机号码是否注册
     * @param commit
     * @param state
     * @param dispatch
     * @param data {"mobile": mobile},
     * @returns {Promise<*>}
     * @constructor
     */
    async ['ApiService.checkMobile'] ({commit, state, dispatch}, data = {}) {
      let type = 'checkMobile'
      const p = new RequestParams(state, data, true).post(type)
      try {
        p.then(
          (rsp) => {
            let data = rsp.data.value
            if (util.isJsonString(data)) {
              data = JSON.parse(data)
            }
            if (2000 == rsp.data.code && util.isEmptyValue(data)) {
              console.log(data, type + '_________________-')
            }
          },
          (rsp) => {

          }
        )
      } catch (e) {
        console.warn(`调用${type}赋值失败`)
      }
      return p
    },
    /**
     * 注册
     * @param commit
     * @param state
     * @param dispatch
     * @param data {mobile、verfyCode、password},
     * @returns {Promise<*>}
     * @constructor
     */
    async ['ApiService.register'] ({commit, state, dispatch}, data = {}) {
      let type = 'register'
      const p = new RequestParams(state, data, true).post(type)
      try {
        p.then(
          (rsp) => {
            let data = rsp.data.value
            if (util.isJsonString(data)) {
              data = JSON.parse(data)
            }
            if (2000 == rsp.data.code && util.isEmptyValue(data)) {
              console.log(data, type + '_________________-')
            }
          },
          (rsp) => {

          }
        )
      } catch (e) {
        console.warn(`调用${type}赋值失败`)
      }
      return p
    },
    /**
     * 修改密码
     * @param commit
     * @param state
     * @param dispatch
     * @param data {mobile、password,newPwd},
     * @returns {Promise<*>}
     * @constructor
     */
    async ['ApiService.updatePassword'] ({commit, state, dispatch}, data = {}) {
      let type = 'updatePassword'
      const p = new RequestParams(state, data).post(type)
      try {
        p.then(
          (rsp) => {
            let data = rsp.data.value
            if (util.isJsonString(data)) {
              data = JSON.parse(data)
            }
            if (2000 == rsp.data.code && rsp.data.returnStatus) {
              console.log(data, type + '_________________-')
              commit({type: `ApiService.toLogin`, data: {}})
            }
          },
          (rsp) => {

          }
        )
      } catch (e) {
        console.warn(`调用${type}赋值失败`)
      }
      return p
    },
    /**
     * 重置密码
     * @param commit
     * @param state
     * @param dispatch
     * @param data {mobile、password,newPwd},
     * @returns {Promise<*>}
     * @constructor
     */
    async ['ApiService.resetPassword'] ({commit, state, dispatch}, data = {}) {
      let type = 'resetPassword'
      Object.assign(data, {
        msgTemp: 'SMS_DEFAULT_CONTENT'
      })
      const p = new RequestParams(state, data, true).post(type)
      try {
        p.then(
          (rsp) => {
            let data = rsp.data.value
            if (util.isJsonString(data)) {
              data = JSON.parse(data)
            }
            if (2000 == rsp.data.code && rsp.data.returnStatus) {
              console.log(data, type + '_________________-')
              commit({type: `ApiService.toLogin`, data: {}})
            }
          },
          (rsp) => {

          }
        )
      } catch (e) {
        console.warn(`调用${type}赋值失败`)
      }
      return p
    },
    /**
     * 获取桌台列表
     * @param commit
     * @param state
     * @param dispatch
     * @param data {resId},
     * @returns {Promise<*>}
     * @constructor
     */
    async ['ApiService.findQRTableDtoList'] ({commit, state, dispatch}, data = {}) {
      let type = 'findQRTableDtoList'
      const p = new RequestParams(state, data, true).post(type)
      try {
        p.then(
          (rsp) => {
            let data = rsp.data.value
            if (util.isJsonString(data)) {
              data = JSON.parse(data)
            }
            if (2000 == rsp.data.code && util.isEmptyValue(data)) {
              console.log(data, type + '_________________-')
              commit({type: `ApiService.${type}`, data})
            }
          },
          (rsp) => {

          }
        )
      } catch (e) {
        console.warn(`调用${type}赋值失败`)
      }
      return p
    },
    /**
     * 是否绑定店铺
     * @param commit
     * @param state
     * @param dispatch
     * @param data {resId},
     * @returns {Promise<*>}
     * @constructor
     */
    async ['ApiService.isBindRestaurantQRcode'] ({commit, state, dispatch}, data = {}) {
      let type = 'isBindRestaurantQRcode'
      const p = new RequestParams(state, data, true).post(type)
      try {
        p.then(
          (rsp) => {
            let data = rsp.data.value
            if (util.isJsonString(data)) {
              data = JSON.parse(data)
            }
            if (2000 == rsp.data.code && util.isEmptyValue(data)) {
              console.log(data, type + '_________________-')
              commit({type: `ApiService.${type}`, data})
            } else {
              commit({type: `ApiService.${type}`, data: {}})
            }
          },
          (rsp) => {

          }
        )
      } catch (e) {
        console.warn(`调用${type}赋值失败`)
      }
      return p
    },
    /**
     * 解绑二维码-桌台或店铺
     * @param commit
     * @param state
     * @param dispatch
     * @param data,
     *        resId:
     *        id:
     *        handleId:
     *        tableId:?
     *        type:?
     * @returns {Promise<*>}
     * @constructor
     */
    async ['ApiService.unBoundQRcode'] ({commit, state, dispatch}, data = {}) {
      let type = 'unBoundQRcode'
      let orderType = data.type, resId = data.resId
      const p = new RequestParams(state, data).post(type)
      try {
        p.then(
          (rsp) => {
            let data = rsp.data.value
            if (util.isJsonString(data)) {
              data = JSON.parse(data)
            }
            if (2000 == rsp.data.code) {
              if (orderType == 1) {
                dispatch('ApiService.isBindRestaurantQRcode', {resId})
              } else {
                dispatch('ApiService.findQRTableDtoList', {resId})
              }
            }
          },
          (rsp) => {

          }
        )
      } catch (e) {
        console.warn(`调用${type}赋值失败`)
      }
      return p
    },
    /**
     * 绑定二维码-桌台或店铺
     * @param commit
     * @param state
     * @param dispatch
     * @param data,
     *        resId:
     *        id:
     *        handleId:
     *        tableId:?
     *        type:?
     * @returns {Promise<*>}
     * @constructor
     */
    async ['ApiService.bindQRcode'] ({commit, state, dispatch}, data = {}) {
      let type = 'bindQRcode'
      let orderType = data.type, resId = data.resId
      const p = new RequestParams(state, data).post(type)
      try {
        p.then(
          (rsp) => {
            let data = rsp.data.value
            if (util.isJsonString(data)) {
              data = JSON.parse(data)
            }
            if (2000 == rsp.data.code) {
              if (orderType == 1) {
                dispatch('ApiService.isBindRestaurantQRcode', {resId})
              } else {
                dispatch('ApiService.findQRTableDtoList', {resId})
              }
            }
          },
          (rsp) => {

          }
        )
      } catch (e) {
        console.warn(`调用${type}赋值失败`)
      }
      return p
    },
  }
}
export default ApiService
