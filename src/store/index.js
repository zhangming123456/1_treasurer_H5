/**
 * Created by Aaronzm on 2017/7/2 0002.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import ApiService from './api/ApiService'
import util from '../libs/util'
import config from '../libs/config'
import cookie from 'js-cookie'

Vue.use(Vuex)

var NAR_BAR = {
  leftText: '返回',
  rightText: '',
  clickLeft: null,
  clickRight: null
}

/** i18n **/
let store = new Vuex.Store({
  modules: {
    ApiService
  }
})
store.registerModule('vux', {
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: 'forward',
    title: '首页',
    navBarBtn: {
      leftText: '返回',
      rightText: '',
      clickLeft: null,
      clickRight: null
    },
    isWxRegister: false
  },
  mutations: {
    updateDemoPosition (state, payload) {
      state.demoScrollTop = payload.top
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    },
    setNavigationBarTitle (state, payload) {
      state.title = payload.title
      if (Vue.$device.isWechat) {
        document.querySelector('title').innerHTML = payload.title
      }
    },
    initNavBar (state, payload) {
      state.navBarBtn = util.deepClone(NAR_BAR)
    },
    setNavBar (state, payload) {
      state.navBarBtn = Object.assign({}, NAR_BAR, payload)
    },
  },
  actions: {
    updateDemoPosition ({commit, state, dispatch, rootState}, top) {
      commit({type: 'updateDemoPosition', top: top})
    },
    wxRegister ({commit, state, dispatch, rootState}, payload) {
      if (state.isWxRegister) {
        return
      }
      let wx = payload.wx,
        url = payload.url,
        debug = payload.debug
      wx.ready(() => {
        let menuShare = {
          title: '1号掌柜', // 分享标题
          desc: '珍乐旗下的智慧餐饮系统品牌，作为中国领先的互联网餐饮系统。',
          link: 'http://vip.zhenler.com/H5/dist/index.html',
          imgUrl: 'http://www.zhenler.com/images/favicon.ico',
          success: function () {
            Vue.$vux.toast.text('分享成功')
          },
          cancel: function () {
            Vue.$vux.toast.text('分享失败')
          }
        }
        // 分享给朋友
        wx.onMenuShareAppMessage(menuShare)
        // 分享到朋友圈
        wx.onMenuShareTimeline(menuShare)
        // 分享到QQ
        wx.onMenuShareQQ(menuShare)
        // 分享到腾讯微博
        wx.onMenuShareWeibo(menuShare)
        // 分享到QQ空间
        wx.onMenuShareQZone(menuShare)
      })
      const jsApiList = [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onVoiceRecordEnd',
        'playVoice',
        'onVoicePlayEnd',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard'
      ]
      state.isWxRegister = true
      dispatch('ApiService.wxScanQRcode', {url}).then(
        (rsp) => {
          if (2000 == rsp.code && util.isEmptyValue(rsp.value)) {
            let data = rsp.value
            wx.config({
              debug,
              appId: data.appId,
              timestamp: data.timestamp,
              nonceStr: data.nonceStr,
              signature: data.signature,
              jsApiList
            })
          } else {
            state.isWxRegister = false
          }
        },
        (rsp) => {
          state.isWxRegister = false
        }
      )
    },
    logOut ({commit, state, dispatch, rootState}, payload) {
      rootState.ApiService.token = ''
      rootState.ApiService.shiroUserId = ''
      rootState.ApiService.resId = ''
      rootState.ApiService.mobile = ''
      cookie.remove('token')
      cookie.remove('shiroUserId')
      cookie.remove('resId')
      cookie.remove('mobile')
    },
  }
})
export default store
