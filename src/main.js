import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import config from './libs/config'
import util from './libs/util'

Vue.use(VueRouter)

require('es6-promise').polyfill()

import {
  DatetimePlugin,
  CloseDialogsPlugin,
  ConfigPlugin,
  BusPlugin,
  LocalePlugin,
  DevicePlugin,
  ToastPlugin,
  AlertPlugin,
  ConfirmPlugin,
  LoadingPlugin,
  WechatPlugin,
  AjaxPlugin,
  AppPlugin,
  querystring,
  md5
} from 'vux'

import cookie from 'js-cookie'

(function (document) {
  /* 长宽占位 rem算法, 根据root的rem来计算各元素相对rem, 默认html 375/5 = 75px */
  function placeholderPic () {
    let w = document.documentElement.offsetWidth
    let h = document.documentElement.offsetHeight
    var app = document.querySelector('body')
    app.style.minHeight = h + 'px'
    document.documentElement.style.fontSize = w / 5 + 'px'
  }

  placeholderPic()
  window.onresize = function () {
    placeholderPic()
  }
}(document))
Vue.use(LocalePlugin)

// // global VUX config
Vue.use(ConfigPlugin, {
  $layout: 'VIEW_BOX' // global config for VUX, since v2.5.12
})

// plugins
Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
Vue.use(BusPlugin)
Vue.use(DatetimePlugin)

import store from './store/index'
import { ImagePreview } from 'vant/lib/index'

// 过滤器
import { dateFormat } from 'libs/filter'

Vue.filter('dateFormat', dateFormat)

Vue.prototype.$vant = {
  ImagePreview
}
Vue.prototype.$azm = {
  config,
  util,
  querystring,
  md5,
  cookie
}
// test
if (process.env.platform === 'app') {
  Vue.use(AppPlugin, store)
}

const FastClick = require('fastclick')
FastClick.attach(document.body)

// The following line will be replaced with by vux-loader with routes in ./demo_list.json
const routes = []
const wx = Vue.wechat

const router = new VueRouter({
  routes
})
Vue.use(CloseDialogsPlugin, router)

sync(store, router)

// 简单的历史管理
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('historyLog_router', querystring.stringify({'/': 0}))
router.beforeEach(function (to, from, next) {
  store.commit('initNavBar')
  store.commit('updateLoadingStatus', {isLoading: true})
  let historyLogRouter = querystring.parse(history.getItem('historyLog_router'))
  const toIndex = historyLogRouter[to.path]
  const fromIndex = historyLogRouter[from.path]
  // console.log(historyLogRouter, to.path, from.path)
  if (toIndex) {
    if ('/me-shop-success' === to.path && '/me-staff-info' === from.path) {
      router.push({path: '/me-fill-info-success'})
    }

    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      store.commit('updateDirection', {direction: 'reverse'})
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    historyLogRouter[to.path] = historyCount
    to.path !== '/' && history.setItem('historyLog_router', querystring.stringify(historyLogRouter))
    store.commit('updateDirection', {direction: 'forward'})
  }
  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  if (!/^\/login/.test(to.path)) {
    store.dispatch('ApiService.getToLogin').then(
      () => {
        /**
         * -------------------------- 微信jssdk ----------------------
         */
        if (Vue.$device.isWechat) {
          let url = config.host + '/H5',
            debug = true
          if (process.env.NODE_ENV === 'production') {
            url = window.location.href.split('#')[0]
            debug = false
          }
          store.dispatch('wxRegister', {wx, url, debug})
        }
      },
      () => {
        if (!/^\/login/.test(to.path)) {
          router.push({path: '/login'})
        }
        cookie.remove('token')
        cookie.remove('shiroUserId')
        cookie.remove('resId')
        cookie.remove('mobile')
      }
    )
  }
  store.commit('updateLoadingStatus', {isLoading: false})
  if (process.env.NODE_ENV === 'production') {
    ga && ga('set', 'page', to.fullPath)
    ga && ga('send', 'pageview')
  }
})
import VueScroll from 'vue-scroll'
import VueScroller from 'vue-scroller'

Vue.use(VueScroll)
Vue.use(VueScroller)
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
