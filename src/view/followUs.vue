<template>
  <div :class='name'>
    <qrcode value="https://u.wechat.com/MEsww62KjAF9TMjecL5BbE0" type="img" :size="200"></qrcode>
    <p>1号掌柜智慧餐饮公众号</p>
    <p>长按识别或扫码关注公众号，然后登录商户中心</p>
  </div>
</template>

<script>
  import { XButton, Qrcode } from 'vux'
  import { mapState } from 'vuex'

  export default {

    components: {
      XButton,
      Qrcode
    },
    data () {
      return {
        name: 'follow-us',
        msg: 'Hello World!',
        transferObj: {
          isTabbar: false,
          tabbarLink: 'follow-us',
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
      this.$store.commit('setNavigationBarTitle', {title: '关注公众号'})
      this.hash = this.$azm.config.Hash
    },
    methods: {}
  }
</script>

<style scoped>
  .follow-us {
  }
</style>
<style scoped lang='less'>
  .follow-us {
    text-align: center;
    padding: 75px 25px 0;
    p {
      margin-top: 10px;
      margin-bottom: 45px;
      font-size: 13px;
      color: #789292;
    }
  }
</style>
