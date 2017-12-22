<template>
  <div id="app">
    <loading v-model="isLoading"></loading>
    <router-view @transfer='transferFun'></router-view>
    <tabbar v-if="transferObj.isTabbar">
      <tabbar-item :selected="transferObj.tabbarLink === 'home'" link="/">
        <img slot="icon" src="../assets/icon/nav_form.png">
        <img slot="icon-active" src="../assets/icon/nav_form_active.png">
        <span slot="label">报表</span>
      </tabbar-item>
      <tabbar-item :selected="transferObj.tabbarLink === 'order'" link="/order">
        <img slot="icon" src="../assets/icon/nav_order.png">
        <img slot="icon-active" src="../assets/icon/nav_order_active.png">
        <span slot="label">点餐</span>
      </tabbar-item>
      <tabbar-item :selected="transferObj.tabbarLink === 'report'" link="/report">
        <img slot="icon" src="../assets/icon/nav_report.png">
        <img slot="icon-active" src="../assets/icon/nav_report_active.png">
        <span slot="label">订单</span>
      </tabbar-item>
      <tabbar-item :selected="transferObj.tabbarLink === 'me'" link="/me">
        <img slot="icon" src="../assets/icon/nav_me.png">
        <img slot="icon-active" src="../assets/icon/nav_me_active.png">
        <span slot="label">我</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import { Tabbar, TabbarItem, Loading } from 'vux'
  import { mapState } from 'vuex'
  import util from 'libs/util'

  export default {
    components: {
      Tabbar,
      TabbarItem,
      Loading
    },
    data () {
      return {
        name: 'app',
        data: {},
        transferObj: {
          isTabbar: false,
          tabbarLink: 'home',
          backgroundColor: '#FFF'
        }
      }
    },
    computed: {
      ...mapState({
        isLoading: state => state.vux.isLoading
      })
    },
    created () {
      let wx = this.$wechat,
        store = this.$store,
        config = this.azm_config
      console.log(this, '---------')
      this.$store.commit('ApiService.toLogin')
      if (util.isEmptyValue(this.$store.state.ApiService.loginInfo)) {
        /**
         * -------------------------- 微信分享 ----------------------
         * 请不要直接复制下面代码
         */
        if (util.is_wechat_client()) {
          wx.ready(() => {
            wx.onMenuShareAppMessage({
              title: 'VUX', // 分享标题
              desc: '基于 WeUI 和 Vue 的移动端 UI 组件库',
              link: 'https://vux.li?x-page=wechat_share_message',
              imgUrl: 'https://static.vux.li/logo_520.png'
            })

            wx.onMenuShareTimeline({
              title: 'VUX', // 分享标题
              desc: '基于 WeUI 和 Vue 的移动端 UI 组件库',
              link: 'https://vux.li?x-page=wechat_share_timeline',
              imgUrl: 'https://static.vux.li/logo_520.png'
            })
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
          let url = window.location.href.split('#')[0],
            debug = false
          if (process.env.NODE_ENV !== 'production') {
            url = config.host + '/H5'
            debug = true
          }
          store.dispatch('ApiService.wxScanQRcode', {url}).then(
            (rsp) => {
              if (2000 == rsp.data.code && util.isEmptyValue(rsp.data.value)) {
                let data = rsp.data.value
                wx.config({
                  debug,
                  appId: data.appId,
                  timestamp: data.timestamp,
                  nonceStr: data.nonceStr,
                  signature: data.signature,
                  jsApiList
                })
              }
            },
            (rsp) => {

            }
          )
        }
      } else {
        this.$vux.alert.show({
          title: '提示',
          content: '用户未登录',
          onShow () {
//            _this.$router.go('baidu.com')
          },
          onHide () {
//            _this.$router.go(-1) // 没有token值 用户未登录跳回上一个页面
          }
        })
      }
    },
    methods: {
      transferFun (a) {
        this.transferObj = a
      }
    }
  }
</script>
<style lang='less'>
  @import '../static/libs/css/reset.css';
  @import '../static/libs/css/common.less';
  @import './styles/iconfont/iconfont.css';
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/close.less';
  @import '~vant/lib/vant-css/index.css';

  #app {
    width: 100%;
    height: 100%;
    .weui-tabbar {
      position: fixed;
    }
  }
</style>
