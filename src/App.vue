<template>
  <div id="app">
    <loading v-model="isLoading"></loading>
    <van-nav-bar fixed class="navBar" :title="navBarTitle" v-if="!transferObj.isTabbar && !transferObj.navBarHide"
                 left-text="返回"
                 :right-text="navBarBtn.rightText"
                 left-arrow
                 @click-left="onClickLeft"
                 @click-right="onClickRight"></van-nav-bar>
    <div class="navBar" v-if="!transferObj.isTabbar && !transferObj.navBarHide"></div>
    <router-view @transfer='transferFun'></router-view>
    <tabbar v-if="transferObj.isTabbar&&false">
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
  import VanNavBar from 'vant/packages/nav-bar/index'
  import TouchRipple from 'vue-touch-ripple/src/component'

  export default {
    components: {
      TouchRipple,
      VanNavBar,
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
          backgroundColor: '#FFF',
          navBarHide: false
        }
      }
    },
    computed: {
      ...mapState({
        isLoading: state => state.vux.isLoading,
        navBarTitle: state => state.vux.title,
        navBarBtn: state => state.vux.navBarBtn,
      })
    },
    created () {

    },
    methods: {
      transferFun (a) {
        this.transferObj = a
      },
      onScroll (e) {
        console.log(e)
      },
      routerLink (path, params) {
        this.$router.push({path, query: params})
      },
      onClickLeft () {
        if (this.navBarBtn.clickLeft) {
          this.navBarBtn.clickLeft()
        } else {
          this.$router.go(-1)
        }
      },
      onClickRight () {
        if (this.navBarBtn.clickRight) {
          this.navBarBtn.clickRight()
        } else {

        }
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
  @import '~vue-touch-ripple/component.css';

  body {
    position: relative;
    > div {
      position: relative;
    }

  }

  .vux-confirm .weui-dialog {
    position: fixed !important;
  }

  #app {
    width: 100%;
    height: 100%;
    .navBar {
      z-index: 1000;
      height: 46px;
      line-height: 46px;
    }
    .vux-loading {
      z-index: 1000;
    }
    .weui-tabbar {
      position: fixed;
    }
  }
</style>
