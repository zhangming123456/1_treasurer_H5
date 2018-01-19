<template>
  <div :class="name" class="azm-fixed">
    <iframe ref="iframe" :src="'../old/pages/table/new_table.html?hash='+hash" @load="loaded"></iframe>
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
        name: 'bound-table',
        msg: 'Hello World!',
        transferObj: {
          isTabbar: false,
          tabbarLink: 'bound-table',
          navBarHide: true
        },
        hash: ''
      }
    },
    computed: {
      ...mapState({
        shiroUserId: state => state.ApiService.shiroUserId,
        resId: state => state.ApiService.resId,
      })
    },
    created () {
      this.$emit('transfer', this.transferObj)
      this.$store.commit('setNavigationBarTitle', {title: '绑定桌台'})
      this.hash = this.$azm.config.Hash
    },
    methods: {
      getIframe () {
        this.$refs.iframe.contentWindow.wx = this.$wechat
        console.log(this.$refs.iframe.contentWindow.wx)
      },
      loaded () {
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
  .bound-table {
  }
</style>

<style scoped lang='less'>
  .bound-table {
    iframe {
      border: none;
      width: 100%;
      height: 100%;
    }
  }
</style>
