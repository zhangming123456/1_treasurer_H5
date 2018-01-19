<template>
  <div :class="name" class="azm-fixed">
    <iframe ref="iframe" :src="'../old/userAccount.html?hash='+hash" @load="loaded"></iframe>
  </div>
</template>

<script>
  import { XButton } from 'vux'
  import { mapState } from 'vuex'
  // import XButton from '../../components/x-button/index'

  export default {
    components: {XButton},
    data () {
      return {
        name: 'user-account',
        msg: 'Hello World!',
        transferObj: {
          isTabbar: false,
          tabbarLink: 'user-account',
          navBarHide: true
        },
        iframe: '',
        hash: ''
      }
    },
    computed: {
      ...mapState({
        shiroUserId: state => state.ApiService.shiroUserId,
        resId: state => state.ApiService.resId
      })
    },
    created () {
      this.$emit('transfer', this.transferObj)
      this.$store.commit('setNavigationBarTitle', {title: '我的账户'})
      this.hash = this.$azm.config.Hash
    },
    methods: {
      getIframe () {
        console.log(this.$refs.iframe.contentWindow)
      },
      loaded () {
        // this.$refs.iframe.contentWindow.serverAddress = '/'
        let that = this
        setTimeout(function () {
          that.$refs.iframe.contentWindow.wx = that.$wechat
        }, 1000)
        console.log(arguments, '-----------------', this)
      }
    }
  }
</script>

<style lang='less'>
  .user-account {
  }
</style>

<style scoped lang='less'>
  .user-account {
    iframe {
      border: none;
      width: 100%;
      height: 100%;
    }
  }
</style>
